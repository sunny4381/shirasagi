import { Controller } from "@hotwired/stimulus"
import axios from 'axios'
import { Grid } from 'ag-grid-community'
import ejs from 'ejs/ejs'
import tippy from 'tippy.js';
import i18next from 'i18next'

function getCsrfToken() {
  const csrfTokenEl = document.querySelector("[name='csrf-token']")
  if (csrfTokenEl) {
    return csrfTokenEl.content
  }
}

function dateTimeFormatter(params) {
  if (!params.value) {
    return;
  }

  return SS.formatTime(params.value, "picker")
}

const TAP_MENU_CELL_TEMPLATE = `
  <span>
    <button name="btn-tap-menu" type="button" data-id="<%= value %>"><i class="material-icons md-13">more_vert</i></button>
    <span><%= value %></span>
  </span>
`

const TAP_MENU_DROPDOWN_TEMPLATE = `
  <ul class="node-menu">
    <li><a class="node-menu-item" href="<%= endPoint.replace(".json", "") %>/redirect?to=<%= value %>&mode=open"><%= i18next.t("ss.links.open") %></a></li>
    <li><a class="node-menu-item" href="<%= endPoint.replace(".json", "") %>/redirect?to=<%= value %>&mode=conf"><%= i18next.t("ss.config") %></a></li>
    <li><hr class="node-menu-divider"></li>
    <li><a class="node-menu-item" target="_blank", rel="noopener" href="<%= endPoint.replace(".json", "") %>/redirect?to=<%= value %>&mode=view_public"><%= i18next.t("ss.links.view_site") %></a></li>
    <li><a class="node-menu-item" target="_blank", rel="noopener" href="<%= endPoint.replace(".json", "") %>/redirect?to=<%= value %>&mode=pc_preview"><%= i18next.t("ss.links.pc_preview") %></a></li>
    <li><a class="node-menu-item cms-preview-sp" target="_blank", rel="noopener" href="<%= endPoint.replace(".json", "") %>/redirect?to=<%= value %>&mode=sp_preview"><%= i18next.t("ss.links.sp_preview") %></a></li>
    <% if (mobileEnabled) { %>
    <li><a class="node-menu-item cms-preview-mb" target="_blank", rel="noopener" href="<%= endPoint.replace(".json", "") %>/redirect?to=<%= value %>&mode=mobile_preview"><%= i18next.t("ss.links.mobile_preview") %></a></li>
    <% } %>
  </ul>
`

function tapMenuRenderer(controller) {
  class TapMenuRenderer {
    init(params) {
      const div = document.createElement("div")
      div.innerHTML = ejs.render(TAP_MENU_CELL_TEMPLATE, { value: params.value, endPoint: controller.endPointValue })

      this.eGui = div
    }

    getGui() {
      return this.eGui
    }

    refresh(_params) {
      return false;
    }
  }

  return TapMenuRenderer
}

export default class extends Controller {
  static values = {
    endPoint: String,
    mobileEnabled: Boolean
  }

  initialize() {
    // console.log("nodes#initialize")
    this.modified = false
    this.modifiedMap = new Map()
  }

  connect() {
    this.tableEl = this.element.querySelector(`.${this.identifier}-table`);

    this.autoSizeBtn = this.element.querySelector("[name='auto-size']")
    if (this.autoSizeBtn) {
      this.autoSizeBtn.addEventListener("click", () => this.autoSize())
      this.autoSizeBtn.disabled = true
    }

    this.element.addEventListener("click", (ev) => {
      if (ev.target.name === "btn-tap-menu") {
        this.openTapMenu(ev.target)
      }
      const tapMenuBtn = ev.target.closest("[name='btn-tap-menu']")
      if (tapMenuBtn) {
        this.openTapMenu(tapMenuBtn)
      }
    })

    axios.get(this.endPointValue)
      .then((response) => this.load(response))
  }

  load(response) {
    if (!this.grid) {
      this.tableEl.innerHTML = ''
      this.gridOptions = response.data
      this.decorateValueFormatters(this.gridOptions)
      this.grid = new Grid(this.tableEl, this.gridOptions)

      this.gridOptions.api.addEventListener("cellValueChanged", (ev) => { this.onCellValueChanged(ev) })
      // this.gridOptions.api.addEventListener("cellEditRequest", (ev) => { console.log("cellEditRequest") })
      // this.gridOptions.api.addEventListener("cellEditingStarted", (ev) => { console.log("cellEditingStarted") })
      // this.gridOptions.api.addEventListener("cellEditingStopped", (ev) => { console.log("cellEditingStopped") })
      // this.gridOptions.api.addEventListener("rowEditingStarted", (ev) => { console.log("rowEditingStarted") })
      // this.gridOptions.api.addEventListener("rowEditingStopped", (ev) => { console.log("rowEditingStopped") })
    } else {
      this.gridOptions.api.setRowData(response.data)
    }

    if (this.autoSizeBtn) {
      this.autoSizeBtn.disabled = false
    }
  }

  decorateValueFormatters(gridOptions) {
    gridOptions.columnDefs[0].cellRenderer = tapMenuRenderer(this)
    gridOptions.columnDefs.forEach((columnDef) => {
      if (columnDef.valueFormatter === "dateTimeFormatter") {
        columnDef.valueFormatter = dateTimeFormatter
      }

      if (columnDef.children) {
        columnDef.children.forEach((childColumnDef) => {
          if (childColumnDef.valueFormatter === "dateTimeFormatter") {
            childColumnDef.valueFormatter = dateTimeFormatter
          }
        })
      }
    })
  }

  autoSize() {
    if (!this.gridOptions) {
      return;
    }

    const allColumnIds = [];
    this.gridOptions.columnApi.getColumns().forEach((column) => {
      allColumnIds.push(column.getId());
    });

    this.gridOptions.columnApi.autoSizeColumns(allColumnIds, false);
  }

  onCellValueChanged(ev) {
    const itemId = ev.data._id
    const fieldName = ev.colDef.field
    const newValue = ev.newValue
    if (!itemId || !fieldName) {
      return
    }

    this.modified = true

    let fieldMap = this.modifiedMap.get(itemId)
    if (!fieldMap) {
      fieldMap = new Map()
      this.modifiedMap.set(itemId, fieldMap)
    }
    fieldMap.set(fieldName, newValue)

    const footerEl = this.element.querySelector(".footer")
    if (footerEl) {
      footerEl.classList.remove("hide")
    }
  }

  openTapMenu(tapMenuBtn) {
    const content = ejs.render(TAP_MENU_DROPDOWN_TEMPLATE, { value: tapMenuBtn.dataset.id, endPoint: this.endPointValue, mobileEnabled: this.mobileEnabledValue })

    let instance = tapMenuBtn._tippy
    if (!instance) {
      instance = tippy(tapMenuBtn, { content: content, allowHTML: true, interactive: true, trigger: 'click', appendTo: this.element, arrow: false, theme: 'light-border ss-popup' })
    }
    instance.show()
  }

  save(ev) {
    if (!this.modified) {
      alert("not modified")
      return;
    }
    const token = getCsrfToken()
    if (! token) {
      return;
    }

    ev.target.disabled = true

    const data = []
    this.modifiedMap.forEach((modifiedFiledSet, itemId) => {
      const modifiedRecord = { _id: itemId }
      modifiedFiledSet.forEach((value, fieldName) => {
        modifiedRecord[fieldName] = value
      })
      data.push(modifiedRecord)
    })

    axios.post(this.endPointValue, { item: data }, { headers: { 'X-CSRF-Token': token } })
      .then((_response) => { console.log("success"); ev.target.disabled = false })
      .catch((_error) => { console.log("error"); ev.target.disabled = false })
  }

  disconnect() {
    // console.log("nodes#disconnect")
  }
}
