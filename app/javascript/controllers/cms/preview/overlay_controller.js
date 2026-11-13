import { Controller } from "@hotwired/stimulus";

const OVERLAY_PADDING = 0;

export default class extends Controller {
  static targets = [ "dialog", "name", "edit", "delete", "column" ];

  #mainElement = undefined;

  constructor() {
    super(...arguments);

    // カスタム要素っぽくふるまいたいので、メソッドを生やす
    this.element.showOverlayForPart = (element) => this.#showOverlayForPart(element);
    this.element.hideOverlay = () => this.#hideOverlay();
  }

  connect() {
    this.#mainElement = this.element.closest("#ss-preview-shadow-root");

    document.addEventListener("mouseover", this.#handleMouseOver);

    this.element.dataset.state = "complete";
    this.element.setAttribute("aria-busy", "false");
    this.dispatch("load");

    console.log(`[${this.identifier}]`, "connected");
  }

  disconnect() {
    this.#hideOverlay();

    this.element.dataset.state = "disconnected";
    // this.element.setAttribute("aria-busy", "false");

    document.removeEventListener("mouseover", this.#handleMouseOver)

    console.log(`[${this.identifier}]`, "disconnected");
  }

  #handleMouseOver = (ev) => {
    if (!this.#mainElement.inplaceMode) {
      return;
    }

    if (ev.target.matches(".ss-preview-page") || ev.target.closest(".ss-preview-page")) {
      const pageElement = ev.target.matches(".ss-preview-page") ? ev.target : ev.target.closest(".ss-preview-part");
      this.#showOverlayForPage(pageElement);
    }
    if (ev.target.matches(".ss-preview-part") || ev.target.closest(".ss-preview-part")) {
      const partElement = ev.target.matches(".ss-preview-part") ? ev.target : ev.target.closest(".ss-preview-part");
      this.#showOverlayForPart(partElement);
    }
    if (this.hasColumnTarget) {
      if (ev.target.matches(".ss-preview-column") || ev.target.closest(".ss-preview-column")) {
        const columnElement = ev.target.matches(".ss-preview-column") ? ev.target : ev.target.closest(".ss-preview-part");
        this.#showOverlayForColumn(columnElement);
      }
    }
  }

  #hideOverlay() {
    console.log(`[${this.identifier}]`, "#hideOverlay");
    this.dialogTarget.close();
    this.element.classList.add("ss-preview-hide");
    this.#clearInfo();
  }

  #showOverlayForPage(element) {
    console.log(`[${this.identifier}]`, "#showOverlayForPart", element);
  }

  #showOverlayForPart(element) {
    console.log(`[${this.identifier}]`, "#showOverlayForPart", element);
    const rect = element.getBoundingClientRect();
    this.#moveTo(rect);
    this.#setInfo({ mode: "part", id: element.dataset.partId, name: element.dataset.partName });

    if (this.hasColumnTarget) {
      this.columnTarget.classList.add("ss-preview-hide");
    }
    if (this.hasDeleteTarget) {
      this.deleteTarget.classList.add("ss-preview-hide");
    }

    this.dialogTarget.show();
  }

  #showOverlayForColumn(element) {
    console.log(`[${this.identifier}]`, "#showOverlayForColumn", element);
  }

  #moveTo(rect) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const top = Math.floor(rect.top + scrollTop) - OVERLAY_PADDING;
    const left = Math.floor(rect.left + scrollLeft) - OVERLAY_PADDING;
    const width = rect.width + OVERLAY_PADDING * 2;
    const height = rect.height + OVERLAY_PADDING * 2;

    this.dialogTarget.style.top = top + "px";
    this.dialogTarget.style.left = left + "px";
    this.dialogTarget.style.width = width + "px";
    this.dialogTarget.style.height = height + "px";
  }

  #setInfo(info) {
    this.element.dataset.mode = info.mode;
    this.element.dataset.id = info.id;

    if (info.name) {
      this.nameTarget.textContent = info.name;
      this.nameTarget.classList.remove("ss-preview-hide");
    } else {
      this.nameTarget.textContent = "";
      this.nameTarget.classList.add("ss-preview-hide");
    }
  }

  #clearInfo() {
    delete this.element.dataset.mode;
    delete this.element.dataset.id;
    this.nameTarget.textContent = "";
    this.nameTarget.classList.add("ss-preview-hide");
  }
}
