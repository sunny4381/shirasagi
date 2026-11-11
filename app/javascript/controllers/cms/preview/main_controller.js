import { Controller } from "@hotwired/stimulus";
import moment from "moment/moment"
import { csrfToken, dispatchEvent } from "../../../ss/tool";

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
  static targets = [ "option", "overlay", "notice", "formPalette", "previewDate" ];

  _option = {};
  _inplaceMode = false;
  _layouts = [];
  _parts = [];
  _editLock = undefined;
  _updateDisabled = false;
  // _formPalette = undefined;

  optionTargetConnected(element) {
    this._option = JSON.parse(element.innerHTML);
  }

  connect() {
    this._editLock = new EditLock(this, {
      lockPath: this._option.lockPath, refreshLockInterval: this._option.refreshLockInterval
    });

    // this.#initializePart();
    // this.#initializeLayout();
    // this.#initializePage();
    // this.#initializeColumn();

    // var formEnd = document.getElementById("ss-preview-form-end");
    // if (formEnd) {
    //   this._formPalette = FormPalette.createBefore(this, formEnd);
    // }

    if (this._option.notice) {
      this.showNotice(this._option.notice);
    }

    console.log(`[${this.identifier}]`, "connected");
  }

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
