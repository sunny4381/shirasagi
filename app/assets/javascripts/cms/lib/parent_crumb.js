Cms_ParentCrumb = (function () {
  function Cms_ParentCrumb(el, options) {
    this.$el = $(el);
    this.options = options || {};
    this.blankText = this.$el.find("select[name='parent-crumb-category']").first().text();
    this.template = this.$el.find("#parent-crumb-template").html();

    var self = this;

    this.$el.on("mousedown", "select[name='parent-crumb-category']", function() {
      self.loadParentCrumb(this);
      return true;
    });

    this.$el.on("change", "select[name='parent-crumb-category']", function() {
      self.setCrumbByCategory(this);
    });

    this.$el.on("click", ".parent-crumb-add", function() {
      self.addCrumb(this);
      return false;
    });

    this.$el.on("click", ".parent-crumb-delete", function() {
      self.deleteCrumb(this);
      return false;
    });
  }

  Cms_ParentCrumb.maxParentCrumbs = 10;

  Cms_ParentCrumb.prototype.getMax = function() {
    return this.options.max || Cms_ParentCrumb.maxParentCrumbs;
  };

  Cms_ParentCrumb.prototype.loadParentCrumb = function(target) {
    var $select = $(target);
    if ($select.data('initialized')) {
      return;
    }

    $select.html('<option value="">' + this.blankText + '</option>');

    $("input[type=checkbox][name$='[category_ids][]']:checked").each(function() {
      var $checkbox = $(this);
      var value = $checkbox.data("url");
      var label = $checkbox.parent().text();
      $select.append($("<option>").val(value).text(label));
    });

    $select.data('initialized', true);
  };

  Cms_ParentCrumb.prototype.addCrumb = function(target) {
    this.$el.find(".parent-crumbs").append(this.template.replace(/#url/, ""));
    if (this.$el.find(".parent-crumb").length >= this.getMax()) {
      this.$el.find(".parent-crumb-btns").addClass("hide");
    }
  };

  Cms_ParentCrumb.prototype.deleteCrumb = function(target) {
    $(this).closest(".parent-crumb").remove();
    if (this.$el.find(".parent-crumb").length < this.getMax()) {
      this.$el.find(".parent-crumb-btns").removeClass("hide");
    }
  };

  Cms_ParentCrumb.prototype.setCrumbByCategory = function(target) {
    var $select = $(target);
    var value = $select.val();
    if (! value) {
      return;
    }

    $select.closest(".parent-crumb").find("input[name='item[parent_crumb_urls][]']").val(value);
  };

  return Cms_ParentCrumb;

})();
