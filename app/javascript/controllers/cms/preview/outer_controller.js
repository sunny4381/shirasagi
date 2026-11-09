import {Controller} from "@hotwired/stimulus"
import {FrameElement} from "@hotwired/turbo"
import StimulusInitializer from "../../../initializers/stimulus_initializer"

function shadowFrameController(superClass) {
  return class extends superClass {
    constructor(element) {
      super(element)

      // 以下が Monkey Patch
      const rootNode = element.getRootNode()
      this.linkInterceptor.start = function() {
        this.element.addEventListener("click", this.clickBubbled);
        document.addEventListener("turbo:click", this.linkClicked);
        document.addEventListener("turbo:before-visit", this.willVisit);
        if (rootNode !== document) {
          // Shadow DOM 内の場合、Shadow Root にもイベントリスナーを登録する
          rootNode.addEventListener("turbo:click", this.linkClicked);
          rootNode.addEventListener("turbo:before-visit", this.willVisit);
        }
      }
      this.linkInterceptor.stop = function() {
        this.element.removeEventListener("click", this.clickBubbled);
        document.removeEventListener("turbo:click", this.linkClicked);
        document.removeEventListener("turbo:before-visit", this.willVisit);
        if (rootNode !== document) {
          rootNode.removeEventListener("turbo:click", this.linkClicked);
          rootNode.removeEventListener("turbo:before-visit", this.willVisit);
        }
      }
    }
  }
}

export default class extends Controller {
  #originalFrameController
  #myFrameController

  connect() {
    const previewRoot = this.element.shadowRoot.querySelector("#ss-preview-shadow-root")
    if (previewRoot) {
      const stimulusInitializer = new StimulusInitializer(previewRoot)
      stimulusInitializer.initialize().then(() => stimulusInitializer.afterInitialize())
    }

    // Turbo の内部クラス FrameController にモンキーパッチをあて Shadow DOM 内で動作するように細工する
    // サイクル箇所は Turbo の内部クラス LinkInterceptor
    // LinkInterceptor の start と stop にモンキーパッチをあて Shadow Root にイベントリスナーを登録する
    this.#originalFrameController = FrameElement.delegateConstructor
    this.#myFrameController = shadowFrameController(this.#originalFrameController)
    FrameElement.delegateConstructor = shadowFrameController(this.#myFrameController)

    console.log(`[${this.identifier}]`, "connected")
  }

  disconnect() {
    FrameElement.delegateConstructor = this.#originalFrameController
  }
}
