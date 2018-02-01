Gws_Chat_Post = function (el, options) {
  this.$el = $(el);
  this.options = options;
  this.$postsElement = this.$el.find('.posts');
  this.version = this.options.version;
  this.timestamp = Math.floor(Date.now() / 1000);
  this.interval = 5000; // 5 秒
  this.maxInterval = 60000; // 1 分
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

  setTimeout(function() { _this.checkUpdates(); }, this.interval);

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

Gws_Chat_Post.prototype.checkUpdates = function() {
  var _this = this;
  $.ajax({
    type: 'GET',
    url: this.options.checkUpdatesUrl,
    dataType: 'json',
    data: { version: this.version, timestamp: this.timestamp },
    // data: { version: 0, timestamp: 0 },
    success: function(data) {
      _this.renderUpdates(data);
      _this.timestamp = Math.floor(Date.now() / 1000);
      setTimeout(function() { _this.checkUpdates(); }, _this.interval);
    },
    error: function(xhr, status, error) {
      if (xhr.status === 406) {
        // サーバーに送信した timestamp が古すぎた（＝前回チェックしてから相当時間経過している）
        // この場合、新着を取得でいないので、ブラウザをリロードさせる
        if (confirm('新着を取得できません。ブラウザをリロードしてください。')) {
          location.reload();
        }
      } else {
        _this.showError();
        _this.interval = _this.maxInterval;
        setTimeout(function() { _this.checkUpdates(); }, _this.interval);
      }
    }
  });
};

Gws_Chat_Post.prototype.renderUpdates = function(data) {
  if (! data) {
    this.interval *= 2;
    if (this.interval > this.maxInterval) {
      this.interval = this.maxInterval;
    }
    return;
  }

  this.version = data.version;
  this.interval = 5000;

  var _this = this;
  var template = this.$el.find('script#post-template').html();
  $.each(data.items, function(index, item) {
    var selector = '.post[data-item-id=":item_id"]'.replace(':item_id', item.id);
    var $post = _this.$el.find(selector);
    if ($post.length > 0) {
      return;
    }

    var html = template.replace(/:item_id/g, item.id.toString());
    html = html.replace(/:user_name/g, item.user.name);
    html = html.replace(/:avatar_url/g, item.user.avatar.url);
    html = html.replace(/:user_long_name/g, item.user.long_name);
    html = html.replace(/:item_updated/g, _this.formatTime(item.updated));

    var $post = $(html);
    $post.removeClass('template');
    if (_this.options.userId === item.user.id) {
      $post.addClass('mines');
    } else {
      $post.addClass('theirs');
    }

    if (item.text) {
      $post.find('.body').html(item.text.toString().replace(/\r?\n/g, '<br>'));
    }

    if (item.file) {
      var $a = $('<a/>', { href: item.file.url, target: '_blank' });
      if (item.file.is_image) {
        $a.html($('<img/>', { src: item.file.thumb_url, alt: item.file.name }));
      } else {
        $a.append('<i class="material-icons md-15">&#xE2C4;</i>');
        $a.append($('<span />', { class: 'ext icon-' + item.file.extname }).html(item.file.name));
      }

      $post.find('.body').prepend($a);
    }

    _this.$el.find('.posts').append($post);
  });
};

Gws_Chat_Post.prototype.formatTime = function(timestamp) {
  var date = new Date(timestamp * 1000);

  var format = '%Y/%m/%d %H:%M';
  format = format.replace('%Y', date.getFullYear());
  format = format.replace('%m', ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace('%d', ('0' + date.getDate()).slice(-2));
  format = format.replace('%H', ('0' + date.getHours()).slice(-2));
  format = format.replace('%M', ('0' + date.getMinutes()).slice(-2));

  return format;
};
