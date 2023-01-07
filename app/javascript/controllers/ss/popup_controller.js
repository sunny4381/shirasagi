import { Controller } from "@hotwired/stimulus"
import axios from 'axios'
import tippy from 'tippy.js';

let initialized = false

const DEFAULT_TIPPY_OPTIONS = {
  allowHTML: true,
  interactive: true,
  maxWidth: 'min(680px,90vw)',
  theme: 'light-border ss-popup',
  trigger: 'click',
}

function initializeOnce() {
  if (initialized) {
    return;
  }

  initialized = true;
}

export default class extends Controller {
  static values = {
    html: String,
    inline: Boolean,
    overflow: Boolean,
    ref: String,
    theme: String,
    placement: String
  }

  initialize() {
    initializeOnce();
  }

  connect() {
    this.element.addEventListener("click", (ev) => { this.#createPopup(); ev.preventDefault(); return false })
  }

  #createPopup() {
    if (this.element._tippy) {
      // already created
      return
    }

    const content = this.#getPopupContent()
    if (!content) {
      // empty content
      return
    }

    var tippyOptions = this.#getTippyOptions(content)
    tippy(this.element, tippyOptions)

    this.element._ss ||= {}
    this.element._ss.popup = this
    this.show();
  }

  #getTippyOptions(content) {
    const tippyOptions = Object.assign({ ...DEFAULT_TIPPY_OPTIONS }, { content: content })
    if (this.themeValue) {
      tippyOptions["theme"] = this.themeValue
    }
    if (this.overflowValue) {
      tippyOptions["popperOptions"] = { modifiers: { preventOverflow: { escapeWithReference: true } } }
    }
    if (this.placementValue) {
      tippyOptions["placement"] = this.placementValue
    }
    return tippyOptions
  }

  #getPopupContent() {
    if (this.inlineValue) {
      if (this.htmlValue) {
        return this.htmlValue
      }
      if (this.refValue) {
        return this.element.querySelector(this.refValue) || document.querySelector(this.refValue)
      }

      return
    }

    const url = this.refValue || this.element.href || this.element.dataset.ref
    if (!url) {
      return
    }
    if (url.startsWith("#")) {
      return document.getElementById(url.substring(1))
    } else {
      axios.get(url)
        .then((response) => { this.updatePopupContent(response.data) })
        .catch((error) => { this.showError(error) })

      return SS.loading
    }
  }

  // updatePopupContent(content) {
  //   const instance = this.element._tippy
  //   instance.setContent(content)
  //   instance.setProps(this.#getTippyOptions())
  // }
  updatePopupContent(content) {
    if (this.element._tippy) {
      this.element._tippy.destroy()
      this.element._tippy = null
    }

    var tippyOptions = this.#getTippyOptions(content)
    tippy(this.element, tippyOptions)
    this.show()
  }

  showError(_error) {
    if (this.element._tippy) {
      this.element._tippy.setContent("[==Error==]")
    }
  }

  show() {
    if (this.element._tippy) {
      this.element._tippy.show()
    }
  }

  disconnect() {
  }
}
