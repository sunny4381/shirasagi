import { Controller } from "@hotwired/stimulus"
import axios from 'axios'
import { Grid } from 'ag-grid-community'

export default class extends Controller {
  static values = {
    endPoint: String
  }

  initialize() {
    // console.log("nodes#initialize")
  }

  connect() {
    console.log({ "nodes#connect": this.endPointValue })
    // console.log({ identifier: this.identifier })
    this.tableEl = this.element.querySelector(`.${this.identifier}-table`);

    axios.get(this.endPointValue)
      .then((response) => this.load(response))
  }

  load(response) {
    if (!this.grid) {
      this.tableEl.innerHTML = ''
      this.grid = new Grid(this.tableEl, response.data);
    }
  }

  disconnect() {
    // console.log("nodes#disconnect")
  }
}
