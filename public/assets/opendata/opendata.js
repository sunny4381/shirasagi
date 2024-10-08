////= #require jquery.turbolinks
////= #require turbolinks

//#
//  $(".js-date").datetimepicker { lang: "ja", timepicker: false, format: "Y/m/d" }
//#
$(function () {
  var link, menu, path;
  // $.ajaxSetup
  //   headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  Opendata.render();
  path = location.pathname + "/";
  $("#navi .main-menu a, #navi .sub-menu a").each(function () {
    var menu;
    menu = $(this);
    if (path.indexOf(menu.attr("href")) === 0) {
      return menu.addClass("current");
    }
  });
  // pulldown menu
  if ($(window).width() >= 800) {
    menu = $(".pulldown-menu");
    link = menu.find("a");
    menu.each(function () {
      link.not(".current").hide();
      return link.filter(".current").prependTo(menu).on("click", function () {
        link.not(".current").slideToggle("fast");
        return false;
      });
    });
  }
  Opendata_Tooltips.render();
  Opendata_SearchUI.render();
  Opendata_ListUI.render("table.od-modal");
  return Opendata_HieraricalCheckbox.render();
});

this.Opendata = (function () {
  function Opendata() {
  }

  Opendata.loading = "\u003cimg style=\"vertical-align:middle\" alt=\"loading..\" border=\"0\" width=\"16\" height=\"11\" class=\"ss-base-loading\" src=\"/assets/img/loading.gif\" /\u003e";

  Opendata.render = function (box) {
    var anchorCallback;
    anchorCallback = function () {
      return $("#cboxLoadedContent .ajax-box:not(.cboxElement)").each(function () {
        var elem;
        elem = $(this);
        elem.addClass("cboxElement");
        if (!elem.attr("target") && !elem.data("target")) {
          return elem.colorbox({
            fixed: true,
            width: "90%",
            height: "90%",
            onComplete: anchorCallback
          });
        }
      });
    };
    return $(box).find(".ajax-box:not(.cboxElement)").each(function () {
      var elem;
      elem = $(this);
      if (!elem.attr("target") && !elem.data("target")) {
        return elem.colorbox({
          fixed: true,
          width: "90%",
          height: "90%",
          onComplete: anchorCallback
        });
      }
    });
  };

  Opendata.ajaxForm = function (elem, params) {
    var defaults;
    if (params == null) {
      params = {};
    }
    elem = $(elem);
    defaults = {
      url: elem.attr("action") + ".json",
      dataType: "json",
      success: function () {
      },
      error: function (data, _status) {
        return alert(["== Error =="].concat(data.responseJSON).join("\n"));
      }
    };
    return elem.on("submit", function (e) {
      $(this).ajaxSubmit($.extend(defaults, params));
      return e.preventDefault();
    });
  };

  Opendata.ajax = function (elem, params) {
    if (params == null) {
      params = {};
    }
    return $(elem).on("click", function (e) {
      var defaults, self;
      self = $(this);
      defaults = {
        url: self.attr("href"),
        beforeSend: function () {
          return self.html(Opendata.loading);
        },
        success: function () {
        },
        error: function (_data, _status) {
          return alert("== Error ==");
        }
      };
      $.ajax($.extend(defaults, params));
      e.preventDefault();
      return false;
    });
  };

  Opendata.ajaxDelete = function (elem, params) {
    if (params == null) {
      params = {};
    }
    return $(elem).on("click", function (e) {
      var defaults, self;
      if (!confirm("削除してよろしいですか？")) {
        return false;
      }
      self = $(this);
      defaults = {
        type: "POST",
        data: "_method=delete",
        url: self.attr("href") + ".json",
        dataType: "json",
        beforeSend: function () {
          return self.html(Opendata.loading);
        },
        success: function () {
          if (self.data("remove")) {
            return $(self.data("remove")).remove();
          }
        },
        error: function (data, _status) {
          return alert(["== Error =="].concat(data.responseJSON).join("\n"));
        }
      };
      $.ajax($.extend(defaults, params));
      e.preventDefault();
      return false;
    });
  };

  return Opendata;

})();

this.Opendata_Tooltips = (function () {
  function Opendata_Tooltips() {
  }

  Opendata_Tooltips.render = function () {
    var ttips;
    ttips = $(".tooltip");
    ttips.on("click", function (_ev) {
      var css, cur, hgt, ofs, style;
      $(".tooltip ul").hide();
      cur = $(this);
      hgt = cur.find("ul").outerHeight();
      ofs = cur.offset();
      if (ofs.top - hgt < 0) {
        cur.find("ul").css("bottom", (hgt * (-1) - 15) + "px");
        css = "ul:after {border: 8px solid transparent; border-bottom-color:#fff; bottom:" + (hgt - 5) + "px;}";
        style = $("<style>").append(document.createTextNode(css));
        $(".tooltip ul style").remove();
        cur.find("ul").append(style);
      } else {
        cur.find("ul").css("bottom", "18px");
        css = "ul:after {border: 8px solid transparent; border-top-color:#fff; bottom:-13px;}";
        style = $("<style>").append(document.createTextNode(css));
        $(".tooltip ul style").remove();
        cur.find("ul").append(style);
      }
      return cur.find("ul").show();
    });
    return $(document).on("click", function (ev) {
      if (!ttips.is($(ev.target).closest("div"))) {
        return $(".tooltip ul").hide();
      }
    });
  };

  return Opendata_Tooltips;

})();

this.Opendata_ListUI = (function () {
  function Opendata_ListUI() {
  }

  Opendata_ListUI.render = function (_list) {
    $("table.od-modal tbody tr").each(function () {
      var tbody, tr;
      tr = $(this);
      tbody = tr.parent();
      tr.find(".tap-menu a").each(function () {
        if ($(this).attr("href").slice(-7) === "/delete") {
          return tr.find(".tap-menu").after("<nav class='multiple-menu'><a href='multipleDelete' >すべて削除する</a></nav>");
        }
      });
      tr.find("input[type=checkbox]").each(function () {
        return tr.toggleClass("checked", $(this).prop("checked"));
      });
      tr.find("input[type=checkbox]").on("change", function () {
        var chkbox, chkcnt, i, len, ref;
        tr.toggleClass("checked", $(this).prop("checked"));
        chkcnt = 0;
        ref = $("input[name='ids[]']");
        for (i = 0, len = ref.length; i < len; i++) {
          chkbox = ref[i];
          if (chkbox.checked) {
            chkcnt++;
          }
        }
        $("thead input[type=checkbox]").prop("checked", chkcnt > 0 && $("input[name='ids[]']").length === chkcnt);
        if (!this.checked) {
          return tr.find(".multiple-menu").hide();
        }
      });
      tr.find("input[type=checkbox]").on("mouseover", function (e) {
        if (this.checked) {
          return tr.find(".multiple-menu").css("left", e.pageX + 15).css("top", e.pageY - 5).show();
        }
      });
      tr.on("mouseup", function (e) {
        if (!$(e.target).is('a') && !$(e.target).is("input")) {
          tbody.find("input[type=checkbox]").attr("checked", false);
          tbody.find("tr").removeClass("checked");
          tr.find(".tap-menu").css("left", e.pageX + 2).css("top", e.pageY).show();
          return tr.find("input[type=checkbox]").trigger("click");
        }
      });
      tr.on("mouseleave", function () {
        tr.find(".tap-menu").hide();
        return tr.find(".multiple-menu").hide();
      });
      return tr.find(".multiple-menu a").on("click", function (e) {
        var chkbox, i, len, ref;
        if ($(this).attr("href") === "multipleDelete") {
          e.preventDefault();
          ref = $("input[name='ids[]']");
          for (i = 0, len = ref.length; i < len; i++) {
            chkbox = ref[i];
            if (chkbox.checked) {
              if (Opendata_ListUI.deleteitem(chkbox.value).status !== 200) {
                return;
              }
              chkbox.checked = false;
            }
          }
          return location.reload();
        }
      });
    });
    return $("thead input[type=checkbox]").on("change", function () {
      var chkbox, i, len, ref, results;
      ref = $("input[name='ids[]']");
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        chkbox = ref[i];
        results.push(chkbox.checked = this.checked);
      }
      return results;
    });
  };

  Opendata_ListUI.deleteitem = function (id) {
    return $.ajax({
      type: "post",
      url: location.pathname + "/" + id,
      data: "_method=delete",
      success: function (_msg) {
      },
      error: function (msg, _status) {
        return alert(["== Error =="].concat(msg["statusText"]).join("\n"));
      }
    });
  };

  return Opendata_ListUI;

})();

this.Opendata_SearchUI = (function () {
  function Opendata_SearchUI() {
  }

  Opendata_SearchUI.anchorAjaxBox;

  Opendata_SearchUI.select = function (item) {
    var a, input, tr;
    // create tr element and append to form
    tr = $("<tr>").attr("data-id", item["id"]);
    input = $.colorbox.element().closest("dl").find(".hidden-ids").clone(false);
    input = input.val(item["id"]).removeClass("hidden-ids");
    a = $('<a class="deselect" href="#">削除</a>').on("click", Opendata_SearchUI.deselect);
    tr.append($('<td>').append($(input)).append(item["name"]));
    tr.append($('<td>').append($(a)));
    $.colorbox.element().closest("dl").find(".ajax-selected tbody").prepend(tr);
  };

  Opendata_SearchUI.selectItems = function ($el) {
    if (! $el) {
      $el = $("#ajax-box");
    }
    var self = this;
    $el.find(".items input:checkbox").filter(":checked").each(function () {
      self.select($(this));
    });
    self.anchorAjaxBox.closest("dl").find(".ajax-selected").show();
  };

  Opendata_SearchUI.deselect = function (e) {
    $(this).parents("tr:first").remove();
    return e.preventDefault();
  };

  Opendata_SearchUI.toggleSelectButton = function () {
    if ($("#ajax-box .items input:checkbox").filter(":checked").size() > 0) {
      return $("#ajax-box .select-items").parent("div").show();
    } else {
      return $("#ajax-box .select-items").parent("div").hide();
    }
  };

  Opendata_SearchUI.render = function () {
    var self = this;

    $(".ajax-selected").each(function () {
      $(this).on("click", "a.deselect", self.deselect);
      if ($(this).find("a.deselect").size() === 0) {
        $(this).hide();
      }
    });

    $(document)
      .on("cbox_load", self.onColorBoxLoaded)
      .on("cbox_cleanup", self.onColorBoxCleanedUp);
  };

  Opendata_SearchUI.onColorBoxLoaded = function (_ev) {
    if (!Opendata_SearchUI.anchorAjaxBox) {
      // ファイル選択ダイアログの「編集」ボタンのクリックなどで別のモーダルが表示される場合がある。
      // 別のモーダルからキャンセルなどで戻ってきた際に、元々の anchor を利用したい。
      // そこで、初回表示時の anchor を記憶しておく。
      Opendata_SearchUI.anchorAjaxBox = $.colorbox.element();
    }
  };

  Opendata_SearchUI.onColorBoxCleanedUp = function (_ev) {
    Opendata_SearchUI.anchorAjaxBox = null;
  };

  Opendata_SearchUI.modal = function (options) {
    if (!options) {
      options = {};
    }

    var self = this;
    var colorbox = options.colorbox || $.colorbox;
    var $el = options.$el || $("#ajax-box");

    var isSameWindow = (window == $el[0].ownerDocument.defaultView)
    if (isSameWindow) {
      $el.find("form.search").on("submit", function (ev) {
        var $div = $("<span />", { class: "loading" }).html(SS.loading);
        $el.find("[type=submit]").after($div);

        $(this).ajaxSubmit({
          url: $(this).attr("action"),
          success: function (data) {
            var $data = $("<div />").html(data);
            colorbox.prep($data.contents());
          },
          error: function (_data, _status) {
            $div.html("== Error ==");
          }
        });
        ev.preventDefault();
        return false;
      });
    }
    $el.find(".pagination a").on("click", function (ev) {
      self.selectItems($el);

      if (isSameWindow) {
        $el.find(".pagination").html(SS.loading);

        $.ajax({
          url: $(this).attr("href"),
          type: "GET",
          success: function (data) {
            $el.closest("#cboxLoadedContent").html(data);
          },
          error: function (_data, _status) {
            $el.find(".pagination").html("== Error ==");
          }
        });

        ev.preventDefault();
        return false;
      } else {
        return true;
      }
    });
    var $ajaxSelected = self.anchorAjaxBox.closest("dl").find(".ajax-selected");
    if (!$ajaxSelected.length) {
      $ajaxSelected = self.anchorAjaxBox.parent().find(".ajax-selected");
    }
    $ajaxSelected.find("tr[data-id]").each(function () {
      var id = $(this).data("id");
      var tr = $("#colorbox .items [data-id='" + id + "']");
      tr.find("input[type=checkbox]").remove();
      if ($el.find(".pagination a").size()) {
        tr.find(".select-item,.select-single-item").each(function() {
          var $this = $(this);
          var html = $this.html();

          var disabledHtml = $("<span />", { class: $this.prop("class"), style: 'color: #888' }).html(html);
          $this.replaceWith(disabledHtml);
        });
      } else {
        tr.remove();
      }
    });
    Opendata_ListUI.render("table.od-modal");
    $("#ajax-box a.select-item").on("click", function (e) {
      var id, name;
      id = $(this).closest("[data-id]").attr("data-id");
      name = $(this).text();
      Opendata_SearchUI.select({
        id: id,
        name: name
      });
      $.colorbox.element().closest("dl").find(".ajax-selected").show();
      e.preventDefault();
      return colorbox.close();
    });
    $("#ajax-box .select-items").on("click", function (e) {
      $("#ajax-box .items input:checkbox").filter(":checked").each(function () {
        var id, name;
        id = $(this).closest("[data-id]").attr("data-id");
        name = $(this).closest("[data-id]").find(".select-item").text();
        if (name === "") {
          name = $(this).closest("[data-id]").text();
        }
        return Opendata_SearchUI.select({
          id: id,
          name: name
        });
      });
      $.colorbox.element().closest("dl").find(".ajax-selected").show();
      e.preventDefault();
      return colorbox.close();
    });
    $("#ajax-box .od-modal").on("change", function (_e) {
      return Opendata_SearchUI.toggleSelectButton();
    });
    return Opendata_SearchUI.toggleSelectButton();
  };

  return Opendata_SearchUI;

})();

this.Opendata_HieraricalCheckbox = (function () {
  function Opendata_HieraricalCheckbox() {
  }

  Opendata_HieraricalCheckbox.render = function () {
    return $("label.parent input[type='checkbox']").on("change", function (_e) {
      var checked;
      checked = $(this).is(':checked');
      return $(this).closest('div.parent').find("input[type='checkbox']").prop('checked', checked);
    });
  };

  return Opendata_HieraricalCheckbox;

})();

