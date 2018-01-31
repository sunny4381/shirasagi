Gws_Chat_Post = function (el, options) {
  this.$el = $(el);
  this.options = options;
  this.$postsElement = this.$el.find('.posts');
};

Gws_Chat_Post.prototype.render = function() {
  var _this = this;

  this.$el.on('click', 'button[name=edit]', function(ev) {
    ev.preventDefault();
    _this.edit($(this), $(this).closest('.post').data('item-id'));
  });

  this.$el.on('click', 'button[name=delete]', function(ev) {
    ev.preventDefault();
    _this.delete($(this), $(this).closest('.post').data('item-id'));
  });

  this.$el.on('click', 'form#item-form button[name=attach-file]', function(ev) {
    ev.preventDefault();
    _this.attachFile($(this));
  });

  this.$el.on('click', 'form#item-form button[name=submit]', function(ev) {
    ev.preventDefault();
    _this.submitMessage($(this));
  });

  this.$el.on('click', 'form#item-form button[name=submit]', function(ev) {
    ev.preventDefault();
    _this.submitMessage($(this));
  });

  this.$el.on('click', '.btn-more', function(ev) {
    ev.preventDefault();
    _this.getMore($(this));
  });

  $(window).resize(function() {
    _this.setPostsHeight()
  });

  this.setPostsHeight();
  this.initPostsScrollTop();
};

Gws_Chat_Post.prototype.initPostsScrollTop = function() {
  var elem = this.$postsElement[0];
  elem.scrollTop = elem.scrollHeight;
};

Gws_Chat_Post.prototype.setPostsHeight = function() {
  var screenHeight = $(window).height();
  var pos = this.$el.position();
  var listHeadHeight = this.$el.find('.list-head').outerHeight(true);
  var formHeight = this.$el.find('form#item-form').outerHeight(true);
  var margin = 20;
  var minHeight = 100;

  var height = screenHeight - pos.top - listHeadHeight - formHeight - margin;
  if (height < minHeight) {
    height = minHeight;
  }

  var _this = this;
  this.keepScrollTop(function() {
    _this.$postsElement.css('height', height + 'px');
  });
};

Gws_Chat_Post.prototype.edit = function($button, itemId) {
  location.href = this.options.editUrl.replace(':item_id', itemId);
};

Gws_Chat_Post.prototype.delete = function($button, itemId) {
  location.href = this.options.deleteUrl.replace(':item_id', itemId);
};

Gws_Chat_Post.prototype.attachFile = function() {
  if (! this.$inputFile) {
    var _this = this;
    this.$inputFile = $('<input />', { type: 'file', name: 'attachment' });
    this.$inputFile.on('change', function(ev) {
      ev.preventDefault();
      _this.submitFile();
    });
  }

  this.$inputFile.click();
};

Gws_Chat_Post.prototype.submitMessage = function() {
  var formData = new FormData();
  formData.append('authenticity_token', $('meta[name="csrf-token"]').attr('content'));
  formData.append('post[text]', this.$el.find('form#item-form textarea').val());

  var _this = this;
  var request = new XMLHttpRequest();
  request.open('POST', this.options.createUrl);
  request.onload = function(ev) {
    if (request.status == 200) {
      _this.refresh();
    } else {
      _this.showError();
    }
  };
  request.send(formData);
};

Gws_Chat_Post.prototype.submitFile = function() {
  var formData = new FormData();
  formData.append('authenticity_token', $('meta[name="csrf-token"]').attr('content'));
  formData.append('post[in_file]', this.$inputFile[0].files[0]);

  var _this = this;
  var request = new XMLHttpRequest();
  request.open('POST', this.options.createUrl);
  request.onload = function(ev) {
    if (request.status == 200) {
      _this.refresh();
    } else {
      _this.showError();
    }
  };
  request.send(formData);
};

Gws_Chat_Post.prototype.refresh = function() {
  location.reload();
};

Gws_Chat_Post.prototype.showError = function() {
  console.log('ERROR!!!');
};

Gws_Chat_Post.prototype.getMore = function($button) {
  var _this = this;
  $.ajax({
    type: 'GET',
    url: this.options.indexUrl,
    dataType: 'html',
    cache: false,
    data: { page: $button.data('page') },
    success: function(data) { _this.renderMore(data) },
    error: function(xhr, status, error) { _this.showError(); },
    complete: function() {}
  });
};

Gws_Chat_Post.prototype.renderMore = function(partialHtml) {
  var $partialHtml = $(partialHtml);
  var $posts = $partialHtml.find('.posts');

  var _this = this;
  this.keepScrollTop(function() {
    _this.$el.find('.more').replaceWith($posts.html());
  });
};

Gws_Chat_Post.prototype.keepScrollTop = function(callback) {
  var elem = this.$postsElement[0];
  var offsetFromBottom = elem.scrollHeight - elem.scrollTop;

  callback();

  elem.scrollTop = elem.scrollHeight - offsetFromBottom;
};
