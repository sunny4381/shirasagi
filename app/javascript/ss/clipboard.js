import i18n from 'i18next'

export default class Clipboard {
  static copy(text, opts = {}) {
    if (!document.queryCommandSupported('copy')) {
      return false;
    }

    try {
      let style = 'position: absolute; overflow: hidden; width: 0; height: 0;';
      style += 'border: none; box-shadow: none; background: transparent; resize: none;';
      const copy = $(`<textarea style='${style}'>${text}</textarea>`);
      $('body').after(copy);
      copy.select();
      document.execCommand('copy');
      copy.remove();
      if (opts["success_alert"]) {
        alert(i18n.t("ss.notice.clipboard_copied"));
      }
      return true;
    } catch (error) {
      console.log(error);
      alert(i18n.t("ss.notice.clipboard_copy_failed"));
      return false;
    }
  }

  static renderCopy() {
    const label = i18n.t("ss.buttons.copy");
    $('.js-clipboard-copy').each(function () {
      const text = $(this).text();
      if (!text) {
        return;
      }

      $(this).append(`<a href="#" class="clipboard-copy-button" data-text="${text}">${label}</a>`);
    });

    $('.clipboard-copy-button').on("click", function () {
      $('.clipboard-copy-button').removeClass('copied');
      if (Clipboard.copy($(this).data('text'))) {
        $(this).addClass('copied');
      }

      return false;
    });
  };
}
