import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  initialize() {
  }

  connect() {
    this.element.addEventListener("click", (ev) => {
      if (ev.target.dataset && ev.target.dataset.route) {
        this.#changeRoute(ev.target.dataset.route)
        ev.preventDefault()
        return false
      }
    })
  }

  #changeRoute(route) {
    const form = this.element.closest("form")
    if (!form) {
      return;
    }

    const routeInput = document.createElement('input')
    routeInput.name = "new_route"
    routeInput.type = "hidden"
    routeInput.value = route

    form.appendChild(routeInput)
    // form.submit()
    form.querySelector('[type="submit"]').click()
  }
}
