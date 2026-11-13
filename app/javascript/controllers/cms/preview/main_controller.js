import { Controller } from "@hotwired/stimulus";
import moment from "moment/moment"
import { csrfToken, dispatchEvent } from "../../../ss/tool";

const PREVIEW_TOOL_HEIGHT = 70;

function appendParams(form, name, params) {
  if (params.length <= 0) {
    form.append($("<input/>", {
      name: `${name}[]`,
      value: "",
      type: "hidden"
    }));
  }

  for (let key in params) {
    let value = params[key];
    if (key.match(/^\d+$/)) {
      key = "";
    }

    if (typeof value === 'object') {
      appendParams(form, `${name}[${key}]`, value);
    } else {
      form.append($("<input/>", {
        name: `${name}[${key}]`,
        value: value,
        type: "hidden"
      }));
    }
  }
}

function openNewWindow(path) {
  var a = document.createElement("a");
  a.href = path;
  a.target = "_blank";
  a.rel = "noopener";
  a.click();
}


class EditLock {

  #bound = false;

  constructor(container, { lockPath, refreshLockInterval }) {
    this.container = container;
    this.lockPath = lockPath;
    this.refreshLockInterval = refreshLockInterval || 2 * 60 * 1000;
    this.timerId = null;
  }

  async acquire() {
    if (!this.lockPath) {
      return Promise.resolve();
    }

    const response = await fetch(this.lockPath, {
      method: "POST",
      headers: { "X-CSRF-Token": csrfToken(), 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      this.bindBeforeUnloadOnce();
    } else {
      try {
        const responseJSON = await response.json();
        if (responseJSON) {
          this.container.showNotice(responseJSON.join("\n"));
        }
      } catch(_error) {
        this.container.showNotice("error");
      }
    }
  }


  release() {
    if (!this.lockPath) {
      return;
    }

    const data = new FormData();
    data.append("authenticity_token", csrfToken());
    data.append("_method", "delete");
    navigator.sendBeacon(this.lockPath, data)
  }

  startRefreshLoop(failed) {
    if (this.timerId) {
      // loop was already started
      return;
    }

    this.timerId = setTimeout(() => {
      this.acquire().fail(failed);
      this.startRefreshLoop();
    }, this.refreshLockInterval);
  }

  stopRefreshLoop() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = null;
  }

  #beforeUnloadHandler = () => this.release();

  bindBeforeUnloadOnce() {
    if (this.#bound) {
      return;
    }

    window.addEventListener("beforeunload", this.#beforeUnloadHandler);
    this.#bound = true;
  }
}

export default class extends Controller {
  static targets = [ "option", "overlay", "notice", "formPalette", "previewDate", "layoutEdit" ];

  _option = {};
  _inplaceMode = false;
  _layouts = [];
  _parts = [];
  _editLock = undefined;
  _updateDisabled = false;
  // _formPalette = undefined;

  constructor() {
    super(...arguments)

    // カスタム要素っぽくふるまいたいので、プロパティを生やす
    Object.defineProperty(this.element, "inplaceMode", {
      get: () => this._inplaceMode
    });
  }

  optionTargetConnected(element) {
    this._option = JSON.parse(element.innerHTML);
  }

  connect() {
    this._editLock = new EditLock(this, {
      lockPath: this._option.lockPath, refreshLockInterval: this._option.refreshLockInterval
    });

    const init = () => {
      this.#initializePart();
      this.#initializeLayout();
      // this.#initializePage();
      // this.#initializeColumn();

      // var formEnd = document.getElementById("ss-preview-form-end");
      // if (formEnd) {
      //   this._formPalette = FormPalette.createBefore(this, formEnd);
      // }

      if (this._option.notice) {
        this.showNotice(this._option.notice);
      }

      this.element.dataset.state = "complete";
      this.element.setAttribute("aria-busy", "false");
      this.dispatch("load");
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init(); // すでに完了している場合は即時実行
    }

    console.log(`[${this.identifier}]`, "connected");
  }

  get #partGroup() {
    if (this._partGroup) {
      return this._partGroup;
    }

    this._partGroup = this.element.querySelector(".ss-preview-part-group");
    return this._partGroup;
  }

  get #partListSelect() {
    if (this._partListSelect) {
      return this._partListSelect;
    }
    if (!this.#partGroup) {
      return;
    }

    this._partListSelect = this.#partGroup.querySelector(".ss-preview-part-list");
    return this._partListSelect;
  }

  #initializePart() {
    if (!this.#partGroup) {
      return;
    }

    this._parts = [];
    document.querySelectorAll(".ss-preview-part").forEach((el) => {
      const partId = el.dataset.partId;
      if (!partId) {
        return;
      }
      this._parts.push({
        el: el, id: partId, name: el.dataset.partName,
        filename: el.dataset.partFilename, path: el.dataset.partPath
      });
    });


    if (this._parts.length === 0) {
      this.#partGroup.classList.add("ss-preview-hide");
      return;
    }

    this._parts.forEach((item) => {
      const optionElement = document.createElement("option");
      optionElement.value = item.id;
      optionElement.textContent = item.name;
      this.#partListSelect.appendChild(optionElement);
    });

    this.#partListSelect.addEventListener("change", this.#handleChangePartList)

    this.#partGroup.classList.remove("ss-preview-hide");
  };

  #initializeLayout() {
    const body = document.body;
    const layoutId = body.dataset.layoutId;
    const layouts = []
    if (layoutId) {
      layouts.push({
        id: layoutId, name: body.dataset.layoutName,
        filename: body.dataset.layoutFilename, path: body.dataset.layoutPath
      });
    }

    if (layouts.length === 0) {
      this.layoutEditTarget.closest(".ss-preview-btn-group").classList.add("ss-preview-hide");
      return;
    }

    this.layoutEditTarget.href = layouts[0].path;
    this.layoutEditTarget.closest(".ss-preview-btn-group").classList.remove("ss-preview-hide");
  }

  #handleChangePartList = (_ev) => {
    if (!this.#partListSelect.value) {
      this.overlayTarget.hideOverlay();
      return;
    }

    var part = this.#findPartById(this.#partListSelect.value);
    if (! part) {
      this.overlayTarget.hideOverlay();
      return;
    }

    this.overlayTarget.showOverlayForPart(part.el);
    this.#scrollToPart(part.el);
  }

  #findPartById(partId) {
    if (! partId) {
      return null;
    }

    if ((typeof partId) === "number") {
      partId = String(partId);
    }

    return this._parts.find((part) => part.id === partId);
  };

  #scrollToPart(element) {
    const rect = element.getBoundingClientRect();
    let scrollTop = rect.top - PREVIEW_TOOL_HEIGHT;
    if (scrollTop < 0) {
      scrollTop = 0;
    }

    window.scrollTo({ top: scrollTop, behavior: "smooth" });
  };

  showNotice(message) {
    if (!this.hasNoticeTarget) {
      return;
    }

    this.noticeTarget.showNotice(message);
  }

  async toggleInplace() {
    console.log(`[${this.identifier}]`, "toggleInplace");

    var before = this._inplaceMode;
    try {
      await this.#toggleInplaceMode();
    } finally {
      if (before === this._inplaceMode) {
        // nothing to do
      } else if (!window.history.pushState) {
        // nothing to do
      } else {
        if (this._inplaceMode) {
          window.history.pushState(null, null, window.location.pathname + "#inplace");
        } else {
          window.history.pushState(null, null, window.location.pathname);
        }

        setTimeout(function () {
          dispatchEvent(this.element, "ss:inplaceModeChanged");
        }, 11);
      }
    }
  }

  async #toggleInplaceMode() {
    if (this._inplaceMode) {
      return this.#stopInplaceMode();
    } else {
      return this.#startInplaceMode();
    }
  }

  async #startInplaceMode() {
    if (!this._option.userInplaceEdit) {
      return Promise.resolve();
    }
    if (this._inplaceMode) {
      // already in inplace mode
      return Promise.resolve();
    }

    await this._editLock.acquire()

    this._inplaceMode = true;

    var button = this.element.querySelector(".ss-preview-btn-toggle-inplace");
    button.classList.add("ss-preview-active");

    this.element.querySelectorAll(".ss-preview-notice").forEach((el) => el.classList.add("ss-preview-hide"));
    if (this.hasFormPaletteTarget) {
      this.formPaletteTarget.showPalette();
    }

    // $("a[href]").each(function() {
    //   var $a = $(this);
    //   var href = $a.attr("href");
    //   if (!href) {
    //     return;
    //   }
    //   if (!href.startsWith("/")) {
    //     return;
    //   }
    //   if (href.includes("#")) {
    //     return;
    //   }
    //
    //   $a.attr("href", href + "#inplace");
    // });

    this._editLock.startRefreshLoop(() => { this.#stopInplaceMode(true); });
    window.location.hash = "#inplace";
  }

  async #stopInplaceMode(dontCareLock) {
    if (!this._inplaceMode) {
      // already exited from inplace mode
      return Promise.resolve();
    }

    var afterReleased = () => {
      this._editLock.stopRefreshLoop();

      var button = this.element.querySelector(".ss-preview-btn-toggle-inplace");
      button.classList.remove("ss-preview-active");
      this._overlay.hide();
      if (this.hasFormPaletteTarget) {
        this.formPaletteTarget.hidePalette();
      }

      // $("a[href]").each(function () {
      //   var $a = $(this);
      //   var href = $a.attr("href");
      //   if (!href) {
      //     return;
      //   }
      //   if (!href.startsWith("/")) {
      //     return;
      //   }
      //
      //   $a.attr("href", href.replace("#inplace", ""));
      // });

      this._inplaceMode = false;
      window.location.hash = "";
    };

    if (dontCareLock) {
      afterReleased();
      return;
    }

    this._editLock.release();
    afterReleased();
  }

  transferToPage(ev) {
    const formData = ev.detail?.formData
    if (!formData) {
      return
    }

    const ids = formData.getAll("ids[]")
    console.log(`[${this.identifier}]`, "transferToPage", ids);
    if (!ids || ids.length === 0 || !ids[0]) {
      return;
    }

    const selected = JSON.parse(ids[0]);
    let url = this._option.previewPath.replace(":path", selected.filename);
    if (window.location.hash === "#inplace") {
      url += "#inplace";
    }
    window.location.href = url;
  }

  createNewPageInOtherNode(ev) {
    const formData = ev.detail?.formData
    if (!formData) {
      return
    }

    const ids = formData.getAll("ids[]")
    if (!ids || ids.length === 0 || !ids[0]) {
      return;
    }

    const selected = JSON.parse(ids[0]);
    window.open(this._option.redirectorPath.newPage.replace(":nodeId", selected.id));
  }

  previewPc() {
    const date = this.#dateForPreview();
    if (! date) {
      return;
    }

    const path = this._option.previewPathTemplate.pc.replace("$YYYYMMDDHHmmss", date);
    if (this._option.request_path && this._option.form_item) {
      this.#submitFormPreview(path, this._option.form_item);
    } else {
      location.href = path;
    }
  };

  #dateForPreview() {
    const dateStr = this.previewDateTarget.value;
    if (! dateStr) {
      return;
    }

    return moment(dateStr).format("YYYYMMDDHHmmss");
  };

  #submitFormPreview(path, formItem) {
    const token = csrfToken();
    const form = $("<form>").attr("method", "post").attr("action", path);

    appendParams(form, "preview_item", formItem);
    form.append($("<input/>", { name: "authenticity_token", value: token, type: "hidden"}));
    form.appendTo("body");
    form[0].requestSubmit();
  };
}
