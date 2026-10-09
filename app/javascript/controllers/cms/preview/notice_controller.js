import { Controller } from "@hotwired/stimulus";

// const speed = "normal";
const holdInMillis = 1800;

export default class extends Controller {
  #timerId = undefined;

  connect() {
    // なんちゃって CustomElement
    // 独自のメソッドを定義することで、CustomElement っぽく操作できるようにする
    this.element.showNotice = (message) => this.showNotice(message);
    this.element.hideNotice = () => this.hideNotice();

    console.log(`[${this.identifier}]`, "connected");
  }

  #handleSlideInDownEnd = () => this.#noticeShown();

  showNotice(message) {
    this.hideNotice();

    this.element.innerHTML = message;
    this.element.classList.remove("hide");
    this.element.classList.add("animate__animated", "animate__flash");
    this.element.addEventListener('animationend', this.#handleSlideInDownEnd, { once: true });
  };

  hideNotice() {
    if (this.#timerId) {
      clearTimeout(this.#timerId);
      this.#timerId = undefined;
    }
    this.element.removeEventListener('animationend', this.#handleSlideInDownEnd);
    this.element.classList.add("hide");
    this.element.classList.remove("animate__animated", "animate__flash");
    // this.element.innerHTML = "";
  };

  #noticeShown() {
    this.#timerId = setTimeout(() => {
      this.#timerId = undefined;
      this.hideNotice();
    }, holdInMillis);
  };
}
