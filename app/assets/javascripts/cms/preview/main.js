//= require ss/lib/addon/temp_file
//= require cms/lib/form
//= require cms/lib/template_form

SS_Preview = (function () {
  function SS_Preview(el) {
    this.el = el;
    this.inplaceMode = false;
    this.layouts = [];
    this.parts = [];
  }

  SS_Preview.libs = {};
  // SS_Preview.jquery_css_path = null;
  // SS_Preview.jquery_js_path = null;

  SS_Preview.preview_path = "";

  SS_Preview.mobile_path = "/mobile";

  SS_Preview.request_path = null;

  SS_Preview.form_item = null;

  SS_Preview.overlayPadding = 5;
  SS_Preview.previewToolHeight = 70;

  SS_Preview.inplace_form_path = { page: null, column: null };

  SS_Preview.instance = null;

  SS_Preview.minFrameSize = { width: 600, height: 240 };

  SS_Preview.render = function () {
    if (SS_Preview.instance) {
      return;
    }

    SS_Preview.instance = new SS_Preview("#ss-preview");

    SS_Preview.loadJQuery(function() {
      var countDownLatch = 2;
      var lazyInitialize = function() {
        countDownLatch -= 1;
        if (countDownLatch == 0) {
          SS_Preview.instance.initialize();
        }
      };

      SS_Preview.loadDatetimePicker(lazyInitialize);
      SS_Preview.loadColorbox(lazyInitialize);
    });
  };

  SS_Preview.loadJQuery = function (callback) {
    if (window.jQuery) {
      callback();
      return;
    }

    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = SS_Preview.libs.jquery.css;

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = SS_Preview.libs.jquery.js;

    if (script.readyState) {
      // IE
    } else {
      script.onload = function () {
        callback();
      }
    }

    document.getElementsByTagName("head")[0].appendChild(link);
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  SS_Preview.loadDatetimePicker = function (callback) {
    if ($.datetimepicker) {
      if (callback) {
        callback();
      }
      return;
    }

    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = SS_Preview.libs.datetimePicker.css;

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = SS_Preview.libs.datetimePicker.js;

    if (script.readyState) {
      // IE
    } else {
      if (callback) {
        script.onload = function () {
          callback();
        }
      }
    }

    document.getElementsByTagName("head")[0].appendChild(link);
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  SS_Preview.loadColorbox = function (callback) {
    if ($.colorbox) {
      if (callback) {
        callback();
      }
      return;
    }

    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = SS_Preview.libs.colorbox.css;

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = SS_Preview.libs.colorbox.js;

    if (script.readyState) {
      // IE
    } else {
      if (callback) {
        script.onload = function () {
          callback();
        }
      }
    }

    document.getElementsByTagName("head")[0].appendChild(link);
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  SS_Preview.prototype.initialize = function() {
    this.$el = $(this.el);
    this.$datePicker = this.$el.find(".ss-preview-date");
    this.$datePicker.datetimepicker({
      lang: "ja",
      roundTime: "ceil",
      step: 30,
      closeOnDateSelect: true
    });

    var self = this;

    this.initializePart();
    this.initializeLayout();
    this.initializePage();
    this.initializeColumn();
    this.initializeOverlay();

    this.$el.on("click", ".ss-preview-btn-toggle-inplace", function () {
      self.toggleInplaceMode();
    });

    $(document).on("click", ".ss-preview-btn-open-path", function () {
      var path = $(this).data("path");
      if (path) {
        window.open(path, "_blank")
      }
    });

    this.$el.on("click", ".ss-preview-btn-pc", function () {
      self.previewPc();
    });

    this.$el.on("click", ".ss-preview-btn-mobile", function () {
      self.previewMobile();
    });

    if (SS_Preview.request_path) {
      $('body a [href="#"]').val("onclick", "return false;");
    }
  };

  SS_Preview.prototype.initializeLayout = function() {
    var $body = $("body");
    if ($body.data("layout-id")) {
      this.layouts = [{
        id: $body.data("layout-id"), name: $body.data("layout-name"),
        filename: $body.data("layout-filename"), path: $body.data("layout-path")
      }];
    }

    var button = this.$el.find(".ss-preview-btn-edit-layout");
    if (! this.layouts || this.layouts.length === 0) {
      button.closest(".ss-preview-btn-group").addClass("ss-preview-hide");
      return;
    }

    button.closest(".ss-preview-btn-group").removeClass("ss-preview-hide");

    var path = this.layouts[0].path;
    button.on('click', function() {
      window.open(path, '_blank');
    });
  };

  SS_Preview.prototype.initializePage = function() {
    var self = this;
    $(document).on("mouseover", ".ss-preview-page", function() {
      if (self.inplaceMode) {
        self.showOverlayForPage($(this));
      }
    });
  };

  SS_Preview.prototype.showOverlayForPage = function($page) {
    var rect = $page[0].getBoundingClientRect();
    if (! rect) {
      return;
    }

    // use native DOM Element instead of using jquery because I think jquery used by SHIRASAGI has some bugs.
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    var top = Math.floor(rect.top + scrollTop) - SS_Preview.overlayPadding;
    var left = Math.floor(rect.left + scrollLeft) - SS_Preview.overlayPadding;
    var width = rect.width + SS_Preview.overlayPadding * 2;
    var height = rect.height + SS_Preview.overlayPadding * 2;

    this.$overlay[0].style.top = top + "px";
    this.$overlay[0].style.left = left + "px";
    this.$overlay[0].style.width = width + "px";
    this.$overlay[0].style.height = height + "px";

    this.$overlay.data("mode", "page");
    this.$overlay.data("id", $page.data("page-id"));
    this.$overlay.find(".ss-preview-part-name").text("").addClass("ss-preview-hide");
    this.$overlay.removeClass("ss-preview-hide");
  };

  SS_Preview.prototype.adjustColorBoxSize = function(frame) {
    var width = frame.contentWindow.document.body.scrollWidth;
    var height = frame.contentWindow.document.body.scrollHeight;

    if (width < SS_Preview.minFrameSize.width) {
      width = SS_Preview.minFrameSize.width;
    }
    if (height < SS_Preview.minFrameSize.height) {
      height = SS_Preview.minFrameSize.height;
    }

    var maxWidth = Math.floor(window.innerWidth * 0.9);
    var maxHeight = Math.floor(window.innerHeight * 0.9);
    if (width > maxWidth) {
      width = maxWidth;
    }
    if (height > maxHeight) {
      height = maxHeight;
    }

    $.colorbox.resize({ width: width, height: height });
  };

  SS_Preview.prototype.initializeFrame = function(frame) {
    var itemForm = frame.contentWindow.document.querySelector("#item-form");
    if (! itemForm) {
      // iframe is not loaded completely
      return;
    }

    this.adjustColorBoxSize(frame);

    var self = this;
    self.saveIfNoAlerts = false;
    self.ignoreAlertsAndSave = false;

    itemForm.addEventListener("click", function(ev) {
      var el = ev.target;

      if (el.tagName === "BUTTON" && el.classList.contains("btn-cancel")) {
        $.colorbox.close();
      }

      if (el.tagName === "INPUT" && el.name === "save_if_no_alerts") {
        self.saveIfNoAlerts = true;
      }

      if (el.tagName === "INPUT" && el.name === "ignore_alerts_and_save") {
        self.ignoreAlertsAndSave = true;
      }

      return true;
    });

    itemForm.onsubmit = function(ev) {
      var formData = new FormData(itemForm);
      if (self.saveIfNoAlerts) {
        formData.append("save_if_no_alerts", "button");
      }
      if (self.ignoreAlertsAndSave) {
        formData.append("ignore_alerts_and_save", "button");
      }

      var action = itemForm.getAttribute("action");
      var method = itemForm.getAttribute("method") || "POST";
      $.ajax({
        url: action,
        type: method,
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function(_html) {
          $.colorbox.close();
          location.reload();
        },
        error: function(xhr, status, error) {
          var $html = $(xhr.responseText);
          var $itemForm = $html.find("#item-form");

          itemForm.innerHTML = $itemForm.html();
          self.adjustColorBoxSize(frame);
        }
      });

      self.saveIfNoAlerts = false;
      self.ignoreAlertsAndSave = false;

      ev.preventDefault();
      return false;
    };
  };

  SS_Preview.prototype.openDialogInFrame = function(url) {
    var self = this;

    // open edit form in iframe
    $.colorbox({
      href: url,
      iframe: true,
      fixed: true,
      width: SS_Preview.minFrameSize.width,
      height: SS_Preview.minFrameSize.height,
      opacity: 0.15,
      overlayClose: false,
      escKey: false,
      arrowKey: false,
      closeButton: false,
      onComplete: function() {
        var frame = $("#cboxLoadedContent iframe")[0];
        frame.onload = function() {
          self.initializeFrame(frame);
        };
      }
    });
  };

  SS_Preview.prototype.openPageEdit = function(pageId) {
    // open page(body) edit form in iframe
    var url = SS_Preview.inplace_form_path.page.replace(":id", pageId);
    this.openDialogInFrame(url);
  };

  SS_Preview.prototype.initializePart = function() {
    var self = this;
    this.parts = [];
    $(document).find(".ss-preview-part").each(function() {
      var $this = $(this);
      if (! $this.data("part-id")) {
        return;
      }
      self.parts.push({
        el: $this, id: $this.data("part-id"), name: $this.data("part-name"),
        filename: $this.data("part-filename"), path: $this.data("part-path")
      });
    });


    if (!this.parts || this.parts.length == 0) {
      this.$el.find(".ss-preview-part-group").addClass("ss-preview-hide");
      return;
    }

    var list = this.$el.find(".ss-preview-part-list")
    var options = list.html();
    $.each(this.parts, function(index, item) {
      options += "<option value=\"" + item.id + "\">" + item.name + "</option>"
    });

    var self = this;
    list.html(options).on('change', function() {
      self.changePart($(this));
    });

    this.$el.on("click", ".ss-preview-btn-edit-part", function() {
      self.openPartEdit(list.val());
    });

    this.$el.find(".ss-preview-part-group").removeClass("ss-preview-hide");

    $(document).on("mouseover", ".ss-preview-part", function() {
      if (self.inplaceMode) {
        self.showOverlayForPart($(this));
      }
    });
  };

  SS_Preview.prototype.findPartById = function(partId) {
    if (! partId) {
      return null;
    }

    if ($.type(partId) === "string") {
      partId = parseInt(partId);
    }

    var founds = $.grep(this.parts, function(part, index) { return part.id === partId });
    if (! founds || founds.length === 0) {
      return null;
    }

    return founds[0];
  };

  SS_Preview.prototype.initializeColumn = function() {
    var self = this;
    $(document).on("mouseover", ".ss-preview-column", function() {
      if (self.inplaceMode) {
        self.showOverlayForColumn($(this));
      }
    });
  };

  SS_Preview.prototype.showOverlayForColumn = function($column) {
    var rect = $column[0].getBoundingClientRect();
    if (! rect) {
      return;
    }

    // use native DOM Element instead of using jquery because I think jquery used by SHIRASAGI has some bugs.
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    var top = Math.floor(rect.top + scrollTop) - SS_Preview.overlayPadding;
    var left = Math.floor(rect.left + scrollLeft) - SS_Preview.overlayPadding;
    var width = rect.width + SS_Preview.overlayPadding * 2;
    var height = rect.height + SS_Preview.overlayPadding * 2;

    this.$overlay[0].style.top = top + "px";
    this.$overlay[0].style.left = left + "px";
    this.$overlay[0].style.width = width + "px";
    this.$overlay[0].style.height = height + "px";

    this.$overlay.data("mode", "column");
    this.$overlay.data("id", { pageId: $column.data("page-id"), columnId: $column.data("column-id") });
    this.$overlay.find(".ss-preview-part-name").text($column.data("column-name")).removeClass("ss-preview-hide");
    this.$overlay.removeClass("ss-preview-hide");
  };

  SS_Preview.prototype.openColumnEdit = function(columnId) {
    // open column edit form in iframe
    var url = SS_Preview.inplace_form_path.column.replace(":pageId", columnId.pageId).replace(":id", columnId.columnId);
    this.openDialogInFrame(url);
  };

  SS_Preview.prototype.initializeOverlay = function() {
    var overlay = this.$overlay = $("#ss-preview-overlay");
    var self = this;
    this.$overlay.on("click", ".ss-preview-btn-edit-inplace", function() {
      self.editInplace(overlay);
    });

    $(document).on('click', function(e) {
      if (! $(e.target).closest('#ss-preview-overlay').length) {
        self.hideOverlay();
      }
    });
  };

  SS_Preview.prototype.editInplace = function(overlay) {
    var mode = overlay.data("mode");
    if (mode === "part") {
      this.openPartEdit(overlay.data("id"));
    } else if (mode === "page") {
      this.openPageEdit(overlay.data("id"));
    } else if (mode === "column") {
      this.openColumnEdit(overlay.data("id"));
    }
  };

  SS_Preview.prototype.previewPc = function() {
    var date = this.dateForPreview();
    if (! date) {
      return;
    }

    var path = SS_Preview.request_path || location.pathname;
    path = path.replace(RegExp("\\/preview\\d*(" + SS_Preview.mobile_path + "|" + SS_Preview.preview_path + ")?"), "/preview" + date + SS_Preview.preview_path) + location.search;
    if (SS_Preview.request_path) {
      this.submitFormPreview(path, SS_Preview.form_item);
    } else {
      location.href = path;
    }
  };

  SS_Preview.prototype.previewMobile = function() {
    var date = this.dateForPreview();
    if (! date) {
      return;
    }

    var path = SS_Preview.request_path || location.pathname;
    path = path.replace(RegExp("\\/preview\\d*(" + SS_Preview.mobile_path + "|" + SS_Preview.preview_path + ")?"), "/preview" + date + SS_Preview.mobile_path) + location.search;
    if (SS_Preview.request_path) {
      this.submitFormPreview(path, SS_Preview.form_item);
    } else {
      location.href = path;
    }
  };

  SS_Preview.prototype.dateForPreview = function() {
    var date = this.$datePicker.val();
    if (!date) {
      return;
    }
    return date.replace(/[^\d]/g, "");
  };

  SS_Preview.prototype.submitFormPreview = function (path, form_item) {
    var token = $('meta[name="csrf-token"]').attr('content');
    var form = $("<form>").attr("method", "post").attr("action", path);

    SS_Preview.appendParams(form, "preview_item", form_item);
    form.append($("<input/>", { name: "authenticity_token", value: token, type: "hidden"}));
    form.appendTo("body");
    form.submit();
  };

  SS_Preview.prototype.changePart = function($el) {
    var part = this.findPartById($el.val());
    if (! part) {
      this.hideOverlay();
      return;
    }

    this.showOverlayForPart(part.el);
    this.scrollToPart(part.el);
  };

  SS_Preview.prototype.hideOverlay = function() {
    this.$overlay.addClass("ss-preview-hide");
  };

  SS_Preview.prototype.showOverlayForPart = function($part) {
    var part = this.findPartById($part.data("part-id"));
    if (! part) {
      return;
    }

    var rect = $part[0].getBoundingClientRect();
    if (! rect) {
      return;
    }

    // use native DOM Element instead of using jquery because I think jquery used by SHIRASAGI has some bugs.
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    var top = Math.floor(rect.top + scrollTop) - SS_Preview.overlayPadding;
    var left = Math.floor(rect.left + scrollLeft) - SS_Preview.overlayPadding;
    var width = rect.width + SS_Preview.overlayPadding * 2;
    var height = rect.height + SS_Preview.overlayPadding * 2;

    this.$overlay[0].style.top = top + "px";
    this.$overlay[0].style.left = left + "px";
    this.$overlay[0].style.width = width + "px";
    this.$overlay[0].style.height = height + "px";

    this.$overlay.data("mode", "part");
    this.$overlay.data("id", part.id);
    this.$overlay.find(".ss-preview-part-name").text(part.name).removeClass("ss-preview-hide");
    this.$overlay.removeClass("ss-preview-hide");
  };

  SS_Preview.prototype.scrollToPart = function($part) {
    var offset = this.$overlay.offset();
    var scrollTop = offset.top - SS_Preview.previewToolHeight;
    if (scrollTop < 0) {
      scrollTop = 0;
    }

    window.scrollTo({ top: scrollTop, behavior: "smooth" });
  };

  SS_Preview.prototype.openPartEdit = function(partId) {
    var part = this.findPartById(partId);
    if (! part) {
      return;
    }

    window.open(part.path, "_blank");
  };

  //
  // Inplace Edit
  //

  SS_Preview.prototype.toggleInplaceMode = function() {
    var button = this.$el.find(".ss-preview-btn-toggle-inplace");

    this.inplaceMode = !this.inplaceMode;
    if (this.inplaceMode) {
      button.addClass("ss-preview-active");
      $("#ss-preview-notice").addClass("ss-preview-hide");
    } else {
      button.removeClass("ss-preview-active");
      this.hideOverlay();
    }
  };

  //
  //
  //

  SS_Preview.prototype.showError = function(errorJson) {
    var messages = [];
    $.each(errorJson, function() {
      messages.push("<li>" + this + "</li>");
    });

    $("#ss-preview-error-explanation ul").html(messages.join());
    $("#ss-preview-error-explanation").removeClass("ss-preview-hide");
    $("#ss-preview-messages").removeClass("ss-preview-hide");
  };

  SS_Preview.prototype.clearError = function() {
    $("#ss-preview-error-explanation ul").html("");
    $("#ss-preview-error-explanation").addClass("ss-preview-hide");
    $("#ss-preview-messages").addClass("ss-preview-hide");
  };

  SS_Preview.appendParams = function (form, name, params) {
    var k, results, v;
    if (params.length <= 0) {
      form.append($("<input/>", {
        name: name + "[]",
        value: "",
        type: "hidden"
      }));
    }
    results = [];
    for (k in params) {
      v = params[k];
      if (k.match(/^\d+$/)) {
        k = "";
      }
      if (typeof v === 'object') {
        results.push(SS_Preview.appendParams(form, name + "[" + k + "]", v));
      } else {
        results.push(form.append($("<input/>", {
          name: name + "[" + k + "]",
          value: v,
          type: "hidden"
        })));
      }
    }
    return results;
  };

  return SS_Preview;

})();

