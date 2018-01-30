Gws_Chat_Post = function (el, options) {
  this.$el = $(el);
  this.options = options;
};

Gws_Chat_Post.prototype.render = function() {
  var _this = this;

  this.$el.find('button[name=edit]').on('click', function(ev) {
    ev.preventDefault();
    _this.edit($(this), $(this).closest('.post').data('item-id'));
  });

  this.$el.find('button[name=delete]').on('click', function(ev) {
    ev.preventDefault();
    _this.delete($(this), $(this).closest('.post').data('item-id'));
  });

  this.$el.find('form#item-form button[name=attach-file]').on('click', function(ev) {
    ev.preventDefault();
    _this.attachFile($(this));
  });

  this.$el.find('form#item-form button[name=submit]').on('click', function(ev) {
    ev.preventDefault();
    _this.submitMessage($(this));
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
