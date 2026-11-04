import {Controller} from "@hotwired/stimulus";
import StimulusInitializer from "../../../initializers/stimulus_initializer"

export default class extends Controller {
  connect() {
    const previewRoot = this.element.shadowRoot.querySelector("#ss-preview-shadow-root")
    if (previewRoot) {
      const stimulusInitializer = new StimulusInitializer(previewRoot)
      stimulusInitializer.initialize().then(() => stimulusInitializer.afterInitialize())
    }
    console.log(`[${this.identifier}]`, "connected")
  }
}
