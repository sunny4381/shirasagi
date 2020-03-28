export default class Clipboard {
  static copy(text, opts = {}) {
    if (!document.queryCommandSupported('copy')) {
      return false;
    }

    try {
      let style = 'position: absolute; overflow: hidden; width: 0; height: 0;';
      style += 'border: none; box-shadow: none; background: transparent; resize: none;';

      const copy = document.createElement("textarea");
      copy.style.cssText = style;
      copy.value = text;

      document.body.appendChild(copy);
      copy.select();

      document.execCommand('copy');

      copy.remove();
      if (opts["success_alert"]) {
        alert(ss.t("ss.notice.clipboard_copied"));
      }
      return true;
    } catch (error) {
      console.log(error);
      alert(ss.t("ss.notice.clipboard_copy_failed"));
      return false;
    }
  }

  static renderCopy() {
    const label = ss.t("ss.buttons.copy");
    document.querySelectorAll('.js-clipboard-copy').forEach((element) => {
      const text = element.textContent;
      if (!text) {
        return;
      }

      const anchor = document.createElement("a");
      anchor.href = "#";
      anchor.classList.add("clipboard-copy-button");
      anchor.dataset["text"] = text;
      anchor.textContent = label;

      element.appendChild(anchor);
    });

    document.querySelectorAll('.clipboard-copy-button').forEach(element => {
      element.addEventListener("click", (ev) => {
        Clipboard.onCopy(ev);

        ev.preventDefault();
        return false;
      });
    });
  };

  static onCopy(ev) {
    document.querySelectorAll('.clipboard-copy-button.copied').forEach(element => {
      element.classList.remove("copied")
    });

    if (Clipboard.copy(ev.target.dataset['text'])) {
      ev.target.classList.add('copied');
    }
  }

  static renderClipboardCopy() {
    document.querySelectorAll('.ss-clipboard-copy').forEach(element => {
      element.addEventListener("click", (ev) => {
        const text = element.dataset["clipText"];
        if (text) {
          Clipboard.copy(text, { "success_alert": true });
        }

        ev.preventDefault();
        return false;
      });
    });
  }
}
