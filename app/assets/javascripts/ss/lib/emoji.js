this.SS_Emoji = (function () {
  function SS_Emoji() {
  }

  SS_Emoji.palettes = {
    "表情と人": ["😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚","😋","😛","😝","😜","🧐","🤓","😎","🤩","🥳","😏","😒","😞","😔","😟","😕","🙁","😣","😖","😫","😩","🥺","😢","😭","😤","😠","😡","😳","🥵","🥶","😱","😨","😰","😥","😓","🤗","🤔","🤭","🤥","😶","😐","😑","😬","🙄","😯","😦","😧","😮","😲","😴","🤤","😪","😵","🤐","🥴","🤢","🤧","😷","🤒","🤕","🤑","🤠","💕","💗","💓","💞","💘","💖","💝","💔","💙","💜","💛","💚","🎉","🎊","📣","💤","💢","💭","💬","💯","💮","🎶","🎵","❗","❓","⭕","❌","😈","👿","👹","👺","🤡","💩","👻","💀","👽","👾","🤖","🎃","😺","😸","😹","😻","😼","😽","😿","😾","👐","🙌","👏","🤝","👍","👎","👊","✊","🤛","🤜","🤞","🤘","👌","👈","👉","👆","👇","✋","🤚","🖐","🖖","👋","🤙","💪","🙏","🦶","🦵","💄","💋","👄","🦷","👅","👂","👃","👣","👁","👀","👤","👥","👶","👧","🧒","👦","👩","🧑","👨","🧔","👵","🧓","👴","👲","👳","🧕","👮","👷","💂","🕵","🤵","👰","👸","🤴","🦸","🦹","🤶","🎅","🧚","👼","🤰","🙇","💁","🙅","🙆","🙋","🤦","🤷","🙎","🙍","💇","💆","🧖","💅","🤳","💃","🕺","👯","🚶","🏃","🕴","💏","💑","👪","🧥","🥼","👚","👕","👖","👔","👗","👙","👘","🥿","👠","👡","👢","👞","👟","🥾","🧦","🧤","🧣","🎩","🧢","👒","🎓","⛑","👑","💍","👝","👛","👜","💼","🎒","👓","🕶","🥽","🌂"],
    "動物と自然": ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐽","🐸","🐵","🙈","🙉","🙊","🐒","🐔","🐧","🐦","🐤","🐣","🐥","🦆","🦅","🦉","🦇","🐺","🐗","🐴","🦄","🐝","🐛","🦋","🐌","🐞","🐜","🦟","🦗","🕷","🕸","🦂","🐢","🐍","🦎","🦖","🦕","🐙","🦑","🦐","🦞","🦀","🐡","🐠","🐟","🐬","🐳","🐋","🦈","🐊","🐅","🐆","🦓","🦍","🐘","🦛","🦏","🐪","🐫","🦒","🦘","🐃","🐂","🐄","🐎","🐖","🐏","🐑","🦙","🐐","🦌","🐕","🐩","🐈","🐓","🦃","🦚","🦜","🦢","🕊","🐇","🦝","🦡","🐁","🐀","🐿","🦔","🐾","🐉","🐲","🌵","🎄","🌲","🌳","🌴","🌱","🌿","☘","🍀","🎍","🎋","🍃","🍂","🍁","🍄","🐚","🌾","💐","🌷","🌹","🥀","🌺","🌸","🌼","🌻","🌞","🌝","🌛","🌜","🌚","🌕","🌖","🌗","🌘","🌑","🌒","🌓","🌔","🌙","🌎","🌍","🌏","💫","⭐","🌟","✨","⚡","💥","🔥","🌪","🌈","🌤","⛅","🌥","🌦","🌧","⛈","🌩","🌨","⛄","🌬","💨","💧","💦","☔","🌊","🌫","🌀"],
    "食べ物": ["🍏","🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🍈","🍒","🍑","🥭","🍍","🥥","🥝","🍅","🍆","🥑","🥦","🥬","🥒","🌶","🌽","🥕","🥔","🍠","🥐","🥯","🍞","🥖","🥨","🧀","🥚","🍳","🥞","🥓","🥩","🍗","🍖","🦴","🌭","🍔","🍟","🍕","🥪","🥙","🌮","🌯","🥗","🥘","🥫","🍝","🍜","🍲","🍛","🍣","🍱","🥟","🍤","🍙","🍚","🍘","🍥","🥠","🥮","🍢","🍡","🍧","🍨","🍦","🥧","🧁","🍰","🎂","🍮","🍭","🍬","🍫","🍿","🍩","🍪","🌰","🥜","🍯","🥛","🍼","☕","🍵","🥤","🍶","🍺","🍻","🥂","🍷","🥃","🍸","🍹","🍾","🥄","🍴","🍽","🥣","🥡","🥢","🧂"],
    "スポーツと文化": ["⚽","🏀","🏈","🎾","🏐","🏉","🎱","🏓","🏸","🏒","🏑","🏏","🥅","⛳","🏹","🎣","🥊","🥋","🎽","⛸","🎿","🏋","⛷","🏂","🤼","🤸","⛹","🤺","🤾","🏌","🏇","🏄","🏊","🤽","🚣","🚴","🏆","🥇","🥈","🥉","🏅","🎖","🏵","🎗","🎫","🎟","🎪","🤹","🎭","🎨","🎬","🎤","🎧","🎼","🎹","🥁","🎷","🎺","🎸","🎻","🎲","🎯","🎳","🎮","🎰","🎴","🀄"],
    "乗り物と旅行": ["🚗","🚕","🚙","🚌","🚎","🏎","🚓","🚑","🚒","🚐","🚚","🚛","🚜","🚲","🛵","🏍","🚨","🚔","🚍","🚘","🚖","🚠","🚟","🚃","🚋","🚞","🚝","🚄","🚅","🚈","🚂","🚆","🚇","🚊","🚉","🚀","🚁","⛵","🚤","⛴","🚢","⛽","🚧","🚥","🚏","🗺","🗿","🗽","🗼","🏰","🏯","🏟","🎡","🎢","🎠","⛲","⛱","🏖","🏝","🏜","🌋","⛰","🏔","🗻","🏕","⛺","🏠","🏡","🏘","🏚","🏗","🏭","🏢","🏬","🏣","🏤","🏥","🏦","🏨","🏪","🏫","🏩","💒","🏛","⛪","🕌","🕍","🕋","⛩","🗾","🎑","🏞","🌅","🌄","🌠","🎇","🎆","🌇","🌆","🏙","🌃","🌌","🌉","🌁","🎌"],
    "その他": ["⌚","💻","🖥","🖨","🕹","💿","🎙","📷","🎞","🎥","📺","📞","🎛","🎚","🕰","⏲","⏱","⏰","⌛","⏳","🕧","🕦","🕥","🕤","🕣","🕢","🕡","🕠","🕙","🕘","🕗","🕖","🕕","🕔","🕓","🕒","🕑","🕐","🕟","🕞","🕝","🕜","🕛","🕚","💡","🕯","🔦","💰","💎","🔧","🔨","🛠","⛏","🔩","⛓","🔫","🔪","🚬","🏺","🔮","💈","🔭","🔬","🕳","💊","💉","🌡","🧻","🚽","🚿","🛁","🛀","🛎","🔑","🗝","🛏","🛌","🧸","🛍","🛒","🎁","🎈","📛","🔱","🔰","🎏","🎀","🎎","🏮","🎐","📩","💌","📭","📬","📮","📅","📂","📙","📘","📗","📕","📚","📖","🔖","🏷","🔗","📎","🖇","📐","📏","📌","📍","🖊","🖋","🖌","🖍","📝","🔎","🔍","🔏","🔐","🔒","🔓","🔕","🔔","🔉","🔈","🔇","💣","🏴","🏳","🏁","🚩","✅","❎","📴","📳","🏧","🔯","💟","🛐","♿","🚾","🚼","🚻","🚺","🚹","🔤","🔣","🔢","🔡","🔠","🔄","🔃","🔂","🔁","🔀","⏯","⏮","⏭","🔽","🔼","⏬","⏫","⏪","⏩","⏺","⏹","⏸","🎦","🚮","⬜","⬛","⚫","⚪","🔹","🔸","🔷","🔶","🔵","🔴","🔳","🔲","◾","◽","🔻","🔺","🔙","🔘","🛑","🚸","⛔","🚫","🚷","🚳","🚭","📵","🔞","🌐"]
  };

  SS_Emoji.render = function () {
    $(".js-emoji").each(function () {
      var $inputer = $(this);
      var $opener = $('<a href="" class="open-emoji-picker btn">絵文字</a>');
      var $picker = $('<div class="emoji-picker" style="display: none;"></div>');
      var $actions = $('<div class="actions"></div>');
      var $palettes = $('<div class="palettes"></div>');
      var $closer = $('<span class="material-icons md-18 close-emoji-picker">close</span>');
      var selectionStart = null;

      if ($inputer.hasClass("js-inline")) {
        $opener.addClass("inline");
      } else {
        $opener.addClass("block");
      }

      $actions.append($closer);
      $.each(SS_Emoji.palettes, function (category, emojis) {
        var $tab = $('<a class="emoji-tab">' + category + '</a>');
        var $palette = $('<div class="emoji-palette"></div>');

        $tab.attr("data-category", category);
        $palette.attr("data-category", category);

        $palette.hide();
        $actions.append($tab);
        $palettes.append($palette);

        $(emojis).each(function (_i) {
          var item = $('<div class="emoji-item">').text(this);
          $(item).on("click", function(){
            var text = $inputer.val();
            var before = text.substr(0, selectionStart);
            var after = text.substr(selectionStart, text.length);
            $inputer.val(before + $(this).text() + after);
            return false;
          });
          $palette.append(item);
        });
      });

      $palettes.find(".emoji-palette:first").show();
      $actions.find(".emoji-tab:first").addClass("active");

      $picker.append($actions);
      $picker.append($palettes);

      $inputer.after($opener);
      $opener.after($picker);

      // events
      $inputer.on("focusout", function(ev) {
        selectionStart = ev.target.selectionStart;
      });

      $opener.on("click", function() {
        $(".emoji-picker").hide();
        $picker.show();

        var handler = function(e) {
          if (!$(e.target).closest(".emoji-picker").length && !$(e.target).is($inputer)) {
            $picker.hide();
            $("body").unbind('click', handler);
            return false;
          }
        };
        $("body").on("click", handler);
        return false;
      });

      $closer.on("click", function() {
        $(this).closest(".emoji-picker").hide();
        return false;
      });

      $actions.find(".emoji-tab").on("click", function() {
        $actions.find(".emoji-tab").removeClass("active");
        $(this).addClass("active");
        $palettes.find(".emoji-palette").hide();
        $palettes.find('.emoji-palette[data-category="' + $(this).data("category") + '"]').show();
        return false;
      });
    });
  };

  return SS_Emoji;

})();

