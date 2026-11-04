import Initializer from "../ss/initializer"
import { Application } from "@hotwired/stimulus"
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers"

export default class extends Initializer {
  #element = null

  constructor(element) {
    super()
    this.#element = element
  }

  initialize() {
    return Promise.resolve()
  }

  afterInitialize() {
    const application = new Application(this.#element)
    const ret = application.start()
    const context = require.context("../controllers", true, /\.js$/)
    application.load(definitionsFromContext(context))

    ret.then(() => {
      if (this.#element) {
        console.log(`stimulus is started within ${this.#element}`)
      } else {
        console.log("stimulus is started")
      }
    })

    return ret
  }
}
