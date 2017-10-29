// $(function() {
//   var $fileInput = $('.file-upload input[type=file]');
//   $fileInput.on('dragenter', function() {
//     $(this).closest('.file-upload').addClass('active')
//   });
//   $fileInput.on('drop', function() {
//     $(this).closest('.file-upload').removeClass('active')
//   });
//   $fileInput.on('dragleave', function() {
//     $(this).closest('.file-upload').removeClass('active')
//   });
//   $fileInput.on('change', function() {
//     var html = '';
//     $.each(this.files, function() {
//       html += '<div class="file">' + this.name + '</div>';
//     });
//     $(this).siblings('p:first').html(html);
//   });
// });
$(function() {
  var SS_FileEditModal = function(el, metaPath) {
    this.$el = $(el);
    this.metaPath = metaPath;

    this.$a = this.$el.find('a');

    var pThis = this;

    this.$a.colorbox({
      fixed: true,
      inline:true,
      width: "90%",
      height: "90%",
      closeButton: false,
      onOpen: function() {  },
      onLoad: function() {  },
      onComplete: function() {
        pThis.loadMeta();
      },
      onCleanup: function() {  },
      onClosed: function() {  }
    });

    this.$el.find('.addon-view').hide();

    this.$el.find('button[name=save]').on('click', function() {
      if (pThis.onSave) {
        pThis.onSave(pThis.collectAttributes());
      }
      pThis.close();
    });
    this.$el.find('button[name=cancel]').on('click', function() { pThis.close(); });
  };

  SS_FileEditModal.prototype = {
    open_with: function(file, onSave) {
      this.file = file;
      this.onSave = onSave;
      this.$el.find('.addon-view').hide();
      this.$a.click();
    },
    loadMeta: function() {
      var data = {};
      data.name = this.file.name;
      data.size = this.file.size;
      data.content_type = this.file.type;
      data.last_modified = this.file.lastModified;

      $.ajax({
        type: 'POST',
        url: this.metaPath,
        data: data,
        success: function(data) {
          $('input[name=name]').val(data.attributes.name);
          $('input[name=filename]').val(data.attributes.filename);
          if (data.attributes.is_image) {
            $('select[name=resizing]').show();
          } else {
            $('select[name=resizing]').hide();
          }

          $('#cboxLoadedContent .addon-view').show();
        },
        error: function(req, status, error) {
          console.log('error');
          console.log(error);
        }
      });
    },
    collectAttributes: function() {
      var data = {};
      data.name = $('input[name=name]').val();
      data.filename = $('input[name=filename]').val();
      data.resizing = $('select[name=resizing]').val();
      return data;
    },
    close: function() {
      if (! this.file) {
        return;
      }

      $.colorbox.close();
      this.file = null;
      this.onSave = null;
    }
  };

  SS_FileDnd = function(el, createPath, metaPath) {
    this.$el = $(el);
    this.$el.addClass('file-upload');
    this.dragEnterCount = 0;
    this.createPath = createPath;
    this.modal = new SS_FileEditModal(this.$el.find('#modal-edit'), metaPath);
    this.bindEvents();
  };

  SS_FileDnd.prototype = {
    bindEvents: function() {
      var pThis = this;
      this.$el.on('dragenter', function(ev) { pThis.onDragEnter(ev); });
      this.$el.on('dragover', function(ev) { pThis.onDragOver(ev); });
      this.$el.on('drop', function(ev) { pThis.onDrop(ev); });
      this.$el.on('dragleave', function(ev) { pThis.onDragLeave(ev); });
      this.$el.on('dragenter', '*', function(ev) { pThis.onDragEnter(ev); });
      this.$el.on('dragover', '*', function(ev) { pThis.onDragOver(ev); });
      this.$el.on('drop', '*', function(ev) { pThis.onDrop(ev); });
      this.$el.on('dragleave', '*', function(ev) { pThis.onDragLeave(ev); });
      this.$el.find('[name="file-upload-btn"]').on('click', function() {
        pThis.$el.find('[type=file]').click();
      });
      this.$el.find('[type=file]').on('change', function() {
        pThis.uploadFiles(this.files);
        this.value = '';
      });
    },
    onDragEnter: function(ev) {
      if (this.dragEnterCount == 0) {
        this.$el.addClass('active');
      }
      this.dragEnterCount++;
    },
    onDragOver: function(ev) { ev.preventDefault(); },
    onDragLeave: function(ev) {
      if (this.dragEnterCount > 0) {
        this.dragEnterCount--;
      }
      if (this.dragEnterCount <= 0) {
        this.$el.removeClass('active');
      }
    },
    onDrop: function(ev) {
      ev.preventDefault();
      this.$el.removeClass('active');
      this.dragEnterCount = 0;
      this.uploadFiles(ev.originalEvent.dataTransfer.files);
    },
    uploadFiles: function(files) {
      var pThis = this;
      var file = files[0];
      console.log(file);
      this.modal.open_with(file, function(data) {
        var token = $('meta[name="csrf-token"]').attr('content');

        var formData = new FormData();
        formData.append('authenticity_token', token);
        formData.append('item[name]', data.name);
        formData.append('item[filename]', data.filename);
        formData.append('item[resizing]', data.resizing);
        formData.append('item[in_file]', file);

        var request = new XMLHttpRequest();
        request.upload.addEventListener('progress', function(ev) { console.log(ev.loaded); console.log(ev.total); }, false);
        request.onload = function (ev) {
          if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200 || request.status === 201) {
              var data = JSON.parse(request.responseText);
              pThis.appendUploadedFile(data);
            } else {
              console.log('error');
              console.log(request.status);
            }
          }
        };
        request.open('POST', pThis.createPath);
        request.send(formData);
      });
    },
    appendUploadedFile: function(data) {
      var $root = $('<label class="dnd-file" for="item__file_ids_' + data._id + '"/>');

      var $selected = $('<span class="cell selected"/>');
      $selected.html('<input type="checkbox" name="item[file_ids][]" id="item_file_ids_' + data._id + '" value="' + data._id + '">');

      var $icon = $('<span class="cell icon"/>');
      if (data.isImage) {
        $icon.html('<img alt="' + data.name + '" src="' + data.thumb_url + '">');
      } else {
        $icon.html('<i class="material-icons">&#xE24D;</i><br><span class="ext icon-' + data.extname +'">' + data.extname + '</span>');
      }

      var $filename = $('<span class="cell filename"/>');
      $filename.html(data.humanized_name);

      var $ctrl = $('<span class="cell ctrl"/>');
      $ctrl.html('<button name="edit" type="button" class="btn">編集</button>\n<button name="paste" type="button" class="btn">貼り付け</button>\n<button name="delete" type="button" class="btn">削除</button>');

      $root.append($selected).append($icon).append($filename).append($ctrl);
      this.$el.find('.dnd-files').append($root);
    }
  };
});
