$(function() {
  var $fileInput = $('.file-upload input[type=file]');
  $fileInput.on('dragenter', function() {
    $(this).closest('.file-upload').addClass('active')
  });
  $fileInput.on('drop', function() {
    $(this).closest('.file-upload').removeClass('active')
  });
  $fileInput.on('dragleave', function() {
    $(this).closest('.file-upload').removeClass('active')
  });
  $fileInput.on('change', function() {
    var html = '';
    $.each(this.files, function() {
      html += '<div class="file">' + this.name + '</div>';
    });
    $(this).siblings('p:first').html(html);
  });
});
