// CMS 公開画面では application.js に変えて compat.js が読み込まれる。
//= require promise-polyfill/dist/polyfill.js
//= require moment/moment.js
//= require_self

(function () {
  if (window.moment) {
    // application.js がロードされている場合（プレビューの場合）、application.js に任せる
    console.info("stop applying compact because application.js is loading.");
    return
  }

  var isDocumentReady = function() {
    return document.readyState === "interactive" || document.readyState === "complete"
  };

  var isJQueryReady = function () {
    return ("jQuery" in window) && jQuery.isReady;
  };

  var setReady = function() {
    if (isDocumentReady() && isJQueryReady()) {
      SS.doneReady();
      return;
    }

    setTimeout(setReady, 11);
  }

  setTimeout(setReady, 11);
})();
