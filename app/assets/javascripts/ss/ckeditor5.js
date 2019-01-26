//= require @ckeditor/ckeditor5-build-classic/build/ckeditor.js
//= require @ckeditor/ckeditor5-build-classic/build/translations/ja.js

this.Cms_Editor_CKEditor5 = (function () {
  function Cms_Editor_CKEditor5() {
  }

  Cms_Editor_CKEditor5.render = function (el, options) {
    ClassicEditor
      .create(document.querySelector(el), { language: "ja" })
      .then(function(editor) { Cms_Editor_CKEditor5.editor = editor; })
      .catch(function(err) { console.error( err.stack ); });
  };

  return Cms_Editor_CKEditor5;

})();
