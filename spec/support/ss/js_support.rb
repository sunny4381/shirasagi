module SS
  module JsSupport
    module Hooks
      def self.extended(obj)
        # callback は登録の逆順に呼ばれるので、先に non_unique_id! を登録する
        Capybara::Session.set_callback :visit, :after do |session|
          SS::JsSupport.non_unique_id!(session)
        end
        Capybara::Session.set_callback :visit, :after do |session|
          SS::JsSupport.wait_for_js_ready(session)
        rescue => _e
          # csv や pdf などに遷移した場合、WAIT_FOR_JS_READY_SCRIPT は失敗し例外を発生させるが、無視する
        end

        show_warning = ENV.fetch("JQMIGRATE_WARNING", nil)
        return unless show_warning

        obj.after(:example) do
          warnings = jquery_migrate_warnings
          if warnings.present?
            puts
            "[JQMIGRATE] #{self.inspect}".try do |msg|
              Rails.logger.warn msg
              puts msg
            end
            warnings.each do |warning|
              "[JQMIGRATE][WARNING] #{warning}".try do |msg|
                Rails.logger.warn msg
                puts msg
              end
            end
          end
        end
      end
    end

    mattr_accessor :is_within_cbox

    module_function

    HOOK_EVENT_COMPLETION = <<~SCRIPT.freeze
      (function(promiseId, eventNames, selector) {
        var defer = $.Deferred();
        var $eventTarget = $(selector || document);
        eventNames.forEach((eventName) => $eventTarget.one(eventName, function() { defer.resolve(true); }));
        window.SS[promiseId] = defer.promise();
      })(...arguments)
    SCRIPT

    WAIT_EVENT_COMPLETION = <<~SCRIPT.freeze
      (function(promiseId, resolve) {
        var promise = window.SS[promiseId];
        if (!promise) {
          resolve(false);
          return;
        }

        delete window.SS[promiseId];
        promise.done(function(result) { resolve(result); });
      })(...arguments)
    SCRIPT

    ENSURE_ADDON_OPENED = <<~SCRIPT.freeze
      (function(addonId, resolve) {
        var $addon = $(addonId);
        if (! $addon[0]) {
          resolve(false);
          return;
        }

        if ($addon.hasClass("hide")) {
          resolve(false);
          return;
        }

        if (! $addon.hasClass("body-closed")) {
          resolve(true);
          return;
        }

        $addon.one("ss:addonShown", function() { resolve(true); });
        $addon.find(".toggle-head").trigger("click");
      })(...arguments)
    SCRIPT

    WAIT_CKEDITOR_READY_SCRIPT = <<~SCRIPT.freeze
      (function(element, resolve) {
        var ckeditor = $(element).ckeditor().editor;
        if (!ckeditor) {
          console.log("ckeditor is not available");
          resolve(false);
          return;
        }
        if (ckeditor.status === "ready") {
          console.log("ckeditor is ready");
          resolve(true);
          return;
        }

        ckeditor.once("instanceReady", function() {
          console.log("ckeditor gets ready");
          setTimeout(function() { resolve(true); }, 0);
        });
      })(...arguments)
    SCRIPT

    WAIT_ALL_CKEDITORS_READY_SCRIPT = <<~SCRIPT.freeze
      (function(resolve) {
        if (! ("CKEDITOR" in window)) {
          resolve(true);
          return;
        }

        var promises = [];
        Object.values(CKEDITOR.instances).forEach(function(ckeditor) {
          if (ckeditor.status === "ready") {
            console.log("ckeditor is ready");
            promises.push(Promise.resolve(true));
            return;
          }

          var promise = new Promise((resolutionFunc, rejectionFunc) => {
            ckeditor.once("instanceReady", function() {
              console.log("ckeditor gets ready");
              resolutionFunc(true);
            });
          });
          promises.push(promise);
        });

        Promise.all(promises).then(function() { setTimeout(function() { resolve(true); }, 0); });
      })(...arguments)
    SCRIPT

    FILL_CKEDITOR_SCRIPT = <<~SCRIPT.freeze
      (function(element, text, resolve) {
        var ckeditor = CKEDITOR.instances[element.id];
        if (!ckeditor) {
          resolve(false);
          return;
        }

        var callback = function() {
          setTimeout(function() {
            resolve(true);
          }, 0);
        };

        ckeditor.setData(text, { callback: callback });
      })(...arguments)
    SCRIPT

    HOOK_CKEDITOR_EVENT_COMPLETION = <<~SCRIPT.freeze
      (function(promiseId, element, eventName) {
        var ckeditor = $(element).ckeditor().editor;
        var defer = $.Deferred();
        ckeditor.once(eventName, function(ev) { defer.resolve(true); ev.removeListener(); });
        window.SS[promiseId] = defer.promise();
      })(...arguments)
    SCRIPT

    IMAGE_ELEMENT_INFO = <<~SCRIPT.freeze
      (function(element, resolve) {
        if (! element.decode) {
          resolve({ error: "not a HTMLImageElement" });
          return;
        }
        element.decode().then(() => {
          resolve({
            width: element.width,
            height: element.height,
            naturalWidth: element.naturalWidth,
            naturalHeight: element.naturalHeight,
            currentSrc: element.currentSrc,
          });
        }).catch((error) => {
          resolve({ error: error.toString() });
          return true;
        });
      })(...arguments)
    SCRIPT

    WAIT_FOR_JS_READY_SCRIPT = <<~SCRIPT.freeze
      (function(resolve) {
        if ("SS" in window) {
          SS.ready(function() { resolve(true); });
          return;
        }

        if (document.readyState === "complete") {
          // document が読み込まれているのに SS が存在しない場合、現在のところリカバリ方法が不明
          resolve(false);
          return;
        }

        window.addEventListener("load", function() {
          if ("SS" in window) {
            SS.ready(function() { resolve(true); });
          } else {
            resolve(false);
          }
        });
      })(...arguments)
    SCRIPT

    FILL_DATETIME_SCRIPT = <<~SCRIPT.freeze
      (function(element, value, resolve) {
        var setter = function() {
          var pickerInstance = SS_DateTimePicker.instance(element);
          pickerInstance.momentValue(value ? moment(value) : null);

          $(element).datetimepicker("validate");
          resolve(true);
        }

        var pickerInstance = SS_DateTimePicker.instance(element);
        if (pickerInstance && pickerInstance.initialized) {
          setter();
        } else {
          $(element).one("ss:generate", setter);
        }
      })(...arguments)
    SCRIPT

    JS_SELECT_SCRIPT = <<~SCRIPT.freeze
      (function(element, valueText) {
        const optionIndex = Array.from(element.options).findIndex(option => option.text === valueText);
        element.selectedIndex = optionIndex;
      })(...arguments)
    SCRIPT

    WAIT_FOR_FORM_RESTORED = <<~SCRIPT.freeze
      (function(element, resolve) {
        if (element.dataset.ssAutoSaveState) {
          resolve(element.dataset.ssAutoSaveState === "restored");
          return;
        }

        element.addEventListener("ss:restored", () => {
          resolve(element.dataset.ssAutoSaveState === "restored");
        }, { once: true });
      })(...arguments)
    SCRIPT

    WAIT_FOR_TURBO_FRAME_SCRIPT = <<~SCRIPT.freeze
      (function(element, resolve) {
        const isCompleted = function(el) {
          return el.hasAttribute("complete");
        }

        const el = $(element)[0];
        if (isCompleted(el)) {
          resolve(true);
          return;
        }
        el.addEventListener("turbo:frame-load", () => resolve(true), { once: true });
      })(...arguments)
    SCRIPT

    WAIT_FOR_ALL_TURBO_FRAMES_SCRIPT = <<~SCRIPT.freeze
      (function(resolve) {
        const isLazy = function(el) {
          const loadingAttr = el.getAttribute("loading");
          return loadingAttr && loadingAttr === "lazy";
        }
        const hasSrc = function(el) {
          return el.hasAttribute("src");
        }
        const isCompleted = function(el) {
          return el.hasAttribute("complete");
        }

        const promises = [];
        document.querySelectorAll("turbo-frame").forEach((el) => {
          if (isLazy(el) || !hasSrc(el) || isCompleted(el)) {
            return;
          }

          const promise = new Promise((resolutionFunc, rejectionFunc) => {
            el.addEventListener("turbo:frame-load", () => resolutionFunc(true), { once: true });
          });
          promises.push(promise);
        });

        if (promises.length === 0) {
          console.log(`found no frames to wait for load`)
          resolve(true);
          return;
        }

        console.log(`found ${promises.length} frames to wait for load`)
        Promise.all(promises).then(() => resolve(true));
      })(...arguments)
    SCRIPT

    WAIT_FOR_TREE_RENDER_SCRIPT = <<~SCRIPT.freeze
      (function(element, resolve) {
        var el = $(element)[0];
        if (el.hasAttribute("data-ss-tree") && el.dataset.ssTree === "completed") {
          resolve(true);
          return;
        }
        el.addEventListener("ss:tree-render", () => resolve(true), { once: true });
      })(...arguments)
    SCRIPT

    WAIT_FOR_ALL_AJAX_PARTS_SCRIPT = <<~SCRIPT.freeze
      (function(resolve) {
        SS.ready(function() {
          if (SS.partCountToLoad === 0) {
            console.log("there are no ajax parts to load");
            resolve(true);
            return;
          }

          $(document).on("ss:ajaxPartComplete", function() {
            console.log("a ajax part is loaded");
            if (SS.partCountToLoad === 0) {
              resolve(true);
            }
          });
        });
      })(...arguments)
    SCRIPT

    WAIT_COLOR_PICKER_READY_SCRIPT = <<~SCRIPT.freeze
      (function(element, resolve) {
        var ariaBusy = $(element).attr("aria-busy");
        if (ariaBusy === "false") {
          console.log("color picker is ready");
          resolve(true);
          return;
        }

        ckeditor.once("ss:colorPickerReady", function() {
          console.log("color picker gets ready");
          setTimeout(function() { resolve(true); }, 0);
        });
      })(...arguments)
    SCRIPT

    WAIT_ALL_COLOR_PICKERS_READY_SCRIPT = <<~SCRIPT.freeze
      (function(resolve) {
        const waitForColorPickerReady = function(element, resolve) {
          var ariaBusy = $(element).attr("aria-busy");
          if (ariaBusy === "false") {
            console.log("color picker is ready");
            resolve(true);
            return;
          }

          ckeditor.once("ss:colorPickerReady", function() {
            console.log("color picker gets ready");
            setTimeout(function() { resolve(true); }, 0);
          });
        };

        const promises = [];
        document.querySelectorAll(".js-color").forEach((element) => {
          const promise = new Promise((resolveInner) => waitForColorPickerReady(element, resolveInner));
          promises.push(promise);
        });
        if (promises.length === 0) {
          resolve(true);
          return;
        }

        Promise.all(promises).then(() => resolve(true));
      })(...arguments)
    SCRIPT

    WAIT_FOR_ALL_THEMES_READY_SCRIPT = <<~SCRIPT.freeze
      (function(resolve) {
        const waitForThemeReady = (element, resolve) => {
          if (element.hasAttribute("aria-busy") && element.getAttribute("aria-busy") === "false") {
            console.log("theme is ready");
            resolve(true);
            return;
          }

          element.addEventListener("ss:ready", () => {
            console.log("theme gets ready");
            resolve(true);
          })
        };

        const promises = [];
        document.querySelectorAll('#ss-theme,[data-tool="ss-theme"]').forEach((element) => {
          const promise = new Promise((resolveInner) => waitForThemeReady(element, resolveInner));
          promises.push(promise);
        });

        if (promises.length === 0) {
          console.log("there are no themes");
          resolve(true);
          return;
        }

        Promise.all(promises).then(() => resolve(true));
      })(...arguments)
    SCRIPT

    BOUNDING_CLIENT_RECT_SCRIPT = <<~SCRIPT.freeze
      (function(selector) {
        const element = document.querySelector(selector);
        if (!element) {
          return {};
        }

        const rect = element.getBoundingClientRect();
        if (!rect) {
          return {};
        }

        return {
          x: rect.x, y: rect.y, width: rect.width, height: rect.height,
          top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left
        };
      })(...arguments)
    SCRIPT

    CANVAS_TO_PNG_SCRIPT = <<~SCRIPT.freeze
      (function(element) {
        return element.toDataURL("image/png");
      })(...arguments)
    SCRIPT

    def wait_timeout
      Capybara.default_max_wait_time
    end

    def ajax_timeout
      @ajax_timeout ||= (ENV["CAPYBARA_AJAX_WAIT_TIME"] || 20).to_i
    end

    def ajax_timeout=(timeout)
      @ajax_timeout = timeout
    end

    # fill_in(locator = nil, with:, currently_with: nil, fill_options: {}, **find_options)
    def fill_in(locator = nil, with:, currently_with: nil, fill_options: {}, **find_options)
      el = super
      (el.value.to_s.strip == with.to_s.strip) ? el : native_fill_in(locator, with: with)
    end

    def fill_in_code_mirror(locator, **options)
      with = options.delete(:with)
      options[:visible] = :all

      wait_for_js_ready

      element = find(:fillable_field, locator, **options)
      page.execute_script("$(arguments[0]).data('editor').setValue(arguments[1])", element, with)
    end

    def native_fill_in(locator = nil, with:)
      el = find(:fillable_field, locator).set('').click
      with.to_s.chars.each { |c| el.native.send_keys(c) }
      el
    rescue Selenium::WebDriver::Error::WebDriverError => e
      puts_console_logs
      Rails.logger.info { "#{e.class} (#{e.message})" }
      el
    end

    def finished_all_ajax_requests?
      active = page.evaluate_script('jQuery.active') rescue nil
      active.nil? || active.zero?
    end

    def wait_for_selector(*args)
      Timeout.timeout(wait_timeout) do
        sleep 1 until page.has_selector?(*args)
      end
      yield if block_given?
    end

    def within_cbox(&block)
      wait_for_js_ready
      have_css(page.document.find("#cboxClose"), text: "close")
      if block
        save = JsSupport.is_within_cbox
        JsSupport.is_within_cbox = true
        begin
          element = page.document.find("#cboxContent")
          within(element, &block)
        ensure
          JsSupport.is_within_cbox = save
        end
      end
    end
    # old(obsolete) method
    alias wait_for_cbox within_cbox

    def open_dialog(locator)
      wait_for_cbox_opened { click_on locator }
    end

    def within_dialog(&block)
      element = page.document.first(".ss-dialog")
      page.within_element(element, &block)
    end

    def colorbox_opened?
      opacity = page.evaluate_script("$('#cboxOverlay').css('opacity')")
      opacity.nil? ? true : (opacity.to_f >= 0.9)
    end

    def colorbox_closed?
      opacity = page.evaluate_script("$('#cboxOverlay').css('opacity')")
      opacity.nil? ? true : opacity.to_f.zero?
    end

    def datetimepicker_value(locator, **options)
      date = options.delete(:date)
      options[:visible] = :all

      element = find(:fillable_field, locator, **options)
      value = page.evaluate_script("$(arguments[0]).data('xdsoft_datetimepicker').getValue().toJSON()", element)
      format = date ? I18n.t("date.formats.picker") : I18n.t("time.formats.picker")
      Time.zone.parse(value).strftime(format)
    end

    def wait_for_page_load
      page.document.synchronize do
        current_path
        true
      end
      wait_for_js_ready
    end

    def save_full_screenshot(**opts)
      width = page.execute_script(
        "return Math.max(document.body.scrollWidth, document.body.offsetWidth, document.documentElement.clientWidth, " \
        "document.documentElement.scrollWidth, document.documentElement.offsetWidth);")
      height = page.execute_script(
        "return Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, " \
        "document.documentElement.scrollHeight, document.documentElement.offsetHeight);")
      window = Capybara.current_session.driver.browser.manage.window
      window.resize_to(width + 100, height + 100)
      filename = opts[:filename].presence || "#{Rails.root}/tmp/screenshots-#{Time.zone.now.to_f}.png"
      page.save_screenshot(filename)
      puts "screenshot: #{filename}"
    rescue
    end

    def jquery_migrate_warnings
      page.evaluate_script("jQuery.migrateWarnings") rescue nil
    end

    def jquery_migrate_reset
      page.execute_script("jQuery.migrateReset();")
    end

    def capture_console_logs(session = nil)
      case Capybara.javascript_driver
      when :firefox
        # currently not supported on firefox
        []
      else
        session ||= page
        session.driver.browser.logs.get(:browser).collect(&:message)
      end
    rescue => _e
      []
    end

    def puts_console_logs
      logs = capture_console_logs
      return if logs.blank?

      puts
      puts "==== console.log (#{caller(1, 1).try(:first)}) ===="
      puts logs
      puts
    end

    def enable_js_debug
      page.execute_script("SS.debug = true;")
    rescue => _e
    end

    def disable_js_debug
      page.execute_script("SS.debug = false;")
    rescue => _e
    end

    def non_unique_id!(session = nil)
      session ||= page
      console_messages = capture_console_logs(session)
      if console_messages && console_messages.any? { |message| message.include?("non-unique id") }
        raise "there are non-unique elements"
      end
    end

    def wait_for_event_fired(*event_names, selector: nil)
      wait_for_js_ready

      promise_id = "promise_#{unique_id}"
      page.execute_script(HOOK_EVENT_COMPLETION, promise_id, event_names, selector)

      # do operations which fire events
      ret = yield

      result = page.evaluate_async_script(WAIT_EVENT_COMPLETION, promise_id)
      expect(result).to be_truthy

      ret
    end
    alias wait_event_to_fire wait_for_event_fired

    #
    # Usage:
    #   wait_for_cbox_opened do
    #     # do operations to open a colorbox
    #     click_on I18n.t("ss.buttons.upload")
    #   end
    #
    def wait_for_cbox_opened(&block)
      wait_for_js_ready
      wait_for_event_fired("cbox_complete", "ss:dialog:opened", &block)
      wait_for_js_ready
    end
    alias wait_cbox_open wait_for_cbox_opened

    #
    # Usage:
    #   wait_for_cbox_closed do
    #     # do operations to close a colorbox
    #     click_on user.name
    #   end
    #
    def wait_for_cbox_closed(&block)
      wait_for_js_ready
      save = JsSupport.is_within_cbox
      JsSupport.is_within_cbox = true
      wait_for_event_fired("cbox_closed", "ss:dialog:closed", &block)
    ensure
      JsSupport.is_within_cbox = save
    end
    alias wait_cbox_close wait_for_cbox_closed

    #
    # Usage:
    #   ensure_addon_opened("#addon-contact-agents-addons-page")
    #
    def ensure_addon_opened(addon_id)
      wait_for_js_ready
      result = page.evaluate_async_script(ENSURE_ADDON_OPENED, addon_id)
      expect(result).to be_truthy
      true
    end

    #
    # Usage
    #   wait_for_ckeditor_ready find(:fillable_field, "item[html]")
    #
    def wait_for_ckeditor_ready(element)
      wait_for_js_ready
      page.evaluate_async_script(WAIT_CKEDITOR_READY_SCRIPT, element)
    end
    alias wait_ckeditor_ready wait_for_ckeditor_ready

    #
    # Usage
    #   wait_all_ckeditors_ready
    #
    def wait_for_all_ckeditors_ready
      wait_for_js_ready
      page.evaluate_async_script(WAIT_ALL_CKEDITORS_READY_SCRIPT)
    end
    alias wait_all_ckeditors_ready wait_for_all_ckeditors_ready

    # CKEditor に html を設定する
    #
    # CKEditor の setData メソッドを用いて HTML を設定する。
    # CKEditor の setData メソッドは非同期のため、HTML 設定直後にアクセシビリティのチェックや携帯データサイズチェックを実行すると、
    # setData 完了前（つまり空）の HTML でチェックを実行していまし、正しくチェックができない場合がある。
    #
    # そこで、本メソッドでは setData の完了まで待機する。
    #
    # 参照: https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#method-setData
    def fill_in_ckeditor(locator, **options)
      with = options.delete(:with)
      options[:visible] = :all
      element = find(:fillable_field, locator, **options)

      ret = wait_for_ckeditor_ready(element)
      expect(ret).to be_truthy
      ret = page.evaluate_async_script(FILL_CKEDITOR_SCRIPT, element, with)
      expect(ret).to be_truthy
    end

    def fill_in_datetime(locator, **options)
      wait_for_js_ready

      element = find(:fillable_field, locator, visible: :all)
      with = options.delete(:with)
      with = with.in_time_zone.iso8601 if with.present?

      # must use evaluate_async_script because 'resolved' is required in FILL_DATETIME_SCRIPT
      # page.evaluate_script(FILL_DATETIME_SCRIPT, element, with)
      result = page.evaluate_async_script(FILL_DATETIME_SCRIPT, element, with)
      expect(result).to be_truthy
    rescue Selenium::WebDriver::Error::WebDriverError => e
      # 履歴などの画面で日付型に入力すると、即、画面遷移するものがある。
      # そのようなもので stale element reference エラーが発生する場合がある。
      # もう少しスマートに stale element reference エラーの発生を防ぐことができたらよかったが、
      # そのような方法は簡単には見つからないので rescue で防ぐ
      puts_console_logs
      Rails.logger.info { "#{e.class} (#{e.message})" }
    end

    alias fill_in_date fill_in_datetime

    #
    # Usage:
    #   wait_for_ckeditor_event "item[html]", "afterInsertHtml" do
    #     # do operations to cause "afterInsertHtml" event on "item[html]"
    #     click_on I18n.t("sns.thumb_paste")
    #   end
    #
    def wait_for_ckeditor_event(locator, event_name)
      element = find(:fillable_field, locator)

      ret = wait_for_ckeditor_ready(element)
      expect(ret).to be_truthy

      promise_id = "promise_#{unique_id}"
      page.execute_script(HOOK_CKEDITOR_EVENT_COMPLETION, promise_id, element, event_name)

      # do operations which fire events
      ret = yield

      result = page.evaluate_async_script(WAIT_EVENT_COMPLETION, promise_id)
      expect(result).to be_truthy

      ret
    end

    def image_element_info(element)
      result = page.evaluate_async_script(IMAGE_ELEMENT_INFO, element)
      expect(result).to be_present
      expect(result).to be_a(Hash)

      result.symbolize_keys!
      expect(result[:error]).to be_blank

      result
    end

    # document.readyState が 'loading' になるのを待機する。
    #
    # switch_to_window や within_window で別ウインドウに切り替えた直後、document.readyState が 'uninitialized' となっている場合がある。
    # この場合、window.addEventListener, window.setTimeout, document.addEventListener などを呼び出すとエラー "Document was unloaded"
    # が発生する。
    #
    # JS コードで待機できれば良いのだが、setTimeout が使用できないので Ruby コードで待機する。
    def wait_for_document_loading
      Timeout.timeout(wait_timeout) do
        loop do
          ready_state = page.evaluate_script("document.readyState")
          break if ready_state.present? && ready_state != 'uninitialized'

          sleep 0.1
        end
      end
    end

    def wait_for_js_ready(session = nil, &block)
      return unless page.driver.is_a?(Capybara::Selenium::Driver)

      session ||= page
      unless session.evaluate_async_script(WAIT_FOR_JS_READY_SCRIPT)
        puts_console_logs
        raise "unable to be js ready"
      end

      yield if block
    rescue Selenium::WebDriver::Error::WebDriverError => e
      puts_console_logs
      Rails.logger.info { "#{e.class} (#{e.message})" }
    end
    alias wait_for_ajax wait_for_js_ready

    def click_on(locator = nil, **options)
      if JsSupport.is_within_cbox
        click_on_cbox(locator, **options)
      else
        page.click_on(locator, **options)
      end
    end

    def click_on_cbox(locator, **options)
      case Capybara.javascript_driver
      when :firefox
        # firefox で colorbox 上の <a> をクリックすると、ElementNotInteractableError が発生する
        # JS でクリックしてこのエラーを回避する
        # see: https://github.com/teamcapybara/capybara/blob/3.38.0/lib/capybara/node/actions.rb#L25-L28
        js_click find(:link_or_button, locator, **options)
      else
        page.click_on(locator, **options)
      end
    end

    def js_click(element)
      wait_for_js_ready
      page.execute_script("arguments[0].click()", element)
    end

    def js_dispatch_generic_event(element, event_name)
      wait_for_js_ready
      page.execute_script("arguments[0].dispatchEvent(new Event(arguments[1]))", element, event_name)
      wait_for_js_ready
    end

    def js_dispatch_focus_event(element, event_name)
      wait_for_js_ready
      page.execute_script("arguments[0].dispatchEvent(new FocusEvent(arguments[1]))", element, event_name)
      wait_for_js_ready
    end

    def fill_in_address(locator, with:)
      wait_for_js_ready
      wait_for_event_fired("ss:addressCommitted") do
        fill_in locator, with: with
        js_dispatch_focus_event find(:fillable_field, locator), 'blur'
      end
    end

    def js_select(value, from:, **options)
      wait_for_js_ready
      element = find(:select, from, **options)
      page.execute_script(JS_SELECT_SCRIPT, element, value)
      js_dispatch_generic_event(element, "change")
    end

    def wait_for_form_restored(element = nil)
      element ||= first("form#item-form")
      result = page.evaluate_async_script(WAIT_FOR_FORM_RESTORED, element)
      expect(result).to be_truthy

      wait_for_js_ready
      result
    end

    def wait_for_turbo_frame(element)
      result = page.evaluate_async_script(WAIT_FOR_TURBO_FRAME_SCRIPT, element)
      expect(result).to be_truthy
    end

    def wait_for_all_turbo_frames
      wait_for_js_ready
      result = page.evaluate_async_script(WAIT_FOR_ALL_TURBO_FRAMES_SCRIPT)
      expect(result).to be_truthy
    end

    def wait_for_tree_render(element)
      result = page.evaluate_async_script(WAIT_FOR_TREE_RENDER_SCRIPT, element)
      expect(result).to be_truthy
    end

    def clear_notice
      page.execute_script("SS.clearNotice();")
    end

    def enable_confirm_unloading
      page.execute_script('SS.disableConfirmUnloading = false;')
    end

    def wait_for_all_ajax_parts
      result = page.evaluate_async_script(WAIT_FOR_ALL_AJAX_PARTS_SCRIPT)
      expect(result).to be_truthy
    end

    def wait_for_color_picker_ready(element)
      wait_for_js_ready
      page.evaluate_async_script(WAIT_COLOR_PICKER_READY_SCRIPT, element)
    end

    def wait_for_all_color_pickers_ready
      wait_for_js_ready
      page.evaluate_async_script(WAIT_ALL_COLOR_PICKERS_READY_SCRIPT)
    end

    def fill_in_color(locator, with:, visible: :all)
      element = find(:fillable_field, locator, visible: visible)

      ret = wait_for_color_picker_ready(element)
      expect(ret).to be_truthy

      fill_in locator, with: with.to_s + "\n"
    end

    def ss_upload_file(*file_paths, addon: "#addon-cms-agents-addons-file")
      if SS.file_upload_dialog == :v1
        ss_upload_file_v1(*file_paths, addon: addon)
      else
        ss_upload_file_v2(*file_paths, addon: addon)
      end
    end

    def ss_upload_file_v1(*file_paths, addon: "#addon-cms-agents-addons-file")
      within addon do
        wait_for_cbox_opened do
          click_on I18n.t("ss.buttons.upload")
        end
      end
      within_cbox do
        attach_file "item[in_files][]", file_paths
        wait_for_cbox_closed do
          click_on I18n.t("ss.buttons.attach")
        end
      end
      within addon do
        expect(page).to have_css(".file-view", text: ::File.basename(file_paths.first))
      end
    end

    def ss_upload_file_v2(*file_paths, addon: "#addon-cms-agents-addons-file")
      within addon do
        wait_for_cbox_opened do
          click_on I18n.t("ss.buttons.upload")
        end
      end
      within_dialog do
        wait_event_to_fire "ss:tempFile:addedWaitingList" do
          attach_file "in_files", file_paths
        end
      end
      wait_for_cbox_closed do
        within_dialog do
          within "form" do
            click_on I18n.t("ss.buttons.upload")
          end
        end
      end
      within addon do
        expect(page).to have_css(".file-view", text: ::File.basename(file_paths.first, ".*"))
      end
    end

    def ss_select_file(file, addon: "#addon-cms-agents-addons-file")
      if SS.file_upload_dialog == :v1
        ss_select_file_v1(file, addon: addon)
      else
        ss_select_file_v2(file, addon: addon)
      end
    end

    def ss_select_file_v1(file, addon: "#addon-cms-agents-addons-file")
      within addon do
        wait_for_cbox_opened do
          click_on I18n.t("ss.buttons.upload")
        end
      end
      within_cbox do
        expect(page).to have_css(".file-view[data-file-id='#{file.id}']", text: file.name)
        wait_for_cbox_closed do
          click_on file.name
        end
      end
      within addon do
        expect(page).to have_css(".file-view[data-file-id='#{file.id}']", text: file.name)
      end
    end

    def ss_select_file_v2(file, addon: "#addon-cms-agents-addons-file")
      within addon do
        wait_for_cbox_opened do
          click_on I18n.t("ss.buttons.select_from_list")
        end
      end
      within_dialog do
        expect(page).to have_css(".file-view[data-file-id='#{file.id}']", text: file.name)
        wait_for_cbox_closed do
          click_on file.name
        end
      end
      within addon do
        expect(page).to have_css(".file-view[data-file-id='#{file.id}']", text: file.name)
      end
    end

    def upload_to_ss_file_field(locator, path)
      if SS.file_upload_dialog == :v1
        upload_to_ss_file_field_v1(locator, path)
      else
        upload_to_ss_file_field_v2(locator, path)
      end
    end

    def upload_to_ss_file_field_v1(locator, path)
      field_element = find(:field, locator, visible: false, type: :hidden)
      container_element = field_element.ancestor(".ss-file-field")
      within container_element do
        wait_for_cbox_opened do
          # click_on I18n.t("ss.buttons.upload")
          first(".btn-file-upload").click
        end
      end
      within_cbox do
        attach_file "item[in_files][]", path
        wait_for_cbox_closed { click_on I18n.t("ss.buttons.attach") }
      end
      within container_element do
        expect(page).to have_css(".humanized-name", text: ::File.basename(path, ".*"))
      end
    end

    def upload_to_ss_file_field_v2(locator, path)
      field_element = find(:field, locator, visible: false, type: :hidden)
      container_element = field_element.ancestor(".ss-file-field-v2")
      within container_element do
        wait_for_cbox_opened do
          click_on I18n.t("ss.buttons.upload")
        end
      end
      within_dialog do
        wait_event_to_fire "ss:tempFile:addedWaitingList" do
          attach_file "in_files", path
        end
      end
      wait_for_cbox_closed do
        within_dialog do
          within "form" do
            click_on I18n.t("ss.buttons.upload")
          end
        end
      end
      within container_element do
        expect(page).to have_css(".humanized-name", text: ::File.basename(path, ".*"))
      end
    end

    def attach_to_ss_file_field(locator, ss_file)
      if SS.file_upload_dialog == :v1
        attach_to_ss_file_field_v1(locator, ss_file)
      else
        attach_to_ss_file_field_v2(locator, ss_file)
      end
    end

    def attach_to_ss_file_field_v1(locator, ss_file)
      field_element = find(:field, locator, visible: false, type: :hidden)
      container_element = field_element.ancestor(".ss-file-field")
      within container_element do
        wait_for_cbox_opened { first(".btn-file-upload").click }
      end
      within_cbox do
        expect(page).to have_css(".file-view", text: ss_file.name)
        wait_for_cbox_closed { click_on ss_file.name }
      end
      within container_element do
        expect(page).to have_css(".humanized-name", text: ::File.basename(ss_file.name, ".*"))
      end
    end

    def attach_to_ss_file_field_v2(locator, ss_file)
      field_element = find(:field, locator, visible: false, type: :hidden)
      container_element = field_element.ancestor(".ss-file-field-v2")
      within container_element do
        wait_for_cbox_opened do
          click_on I18n.t("ss.buttons.upload")
        end
      end
      wait_for_event_fired "turbo:frame-load" do
        within_dialog do
          within ".cms-tabs" do
            click_on I18n.t("ss.buttons.select_from_list")
          end
        end
      end
      within_dialog do
        expect(page).to have_css(".file-view", text: ss_file.name)
        wait_for_cbox_closed { click_on ss_file.name }
      end
      within container_element do
        expect(page).to have_css(".humanized-name", text: ::File.basename(ss_file.name, ".*"))
      end
    end

    def ss_drop_file(locator, file_path)
      file_input = unique_id
      page.execute_script <<~SCRIPT
        (function() {
          const fileInputElement = document.createElement("input");
          fileInputElement.name = `#{file_input}`;
          fileInputElement.type = "file";
          document.body.appendChild(fileInputElement);
        })(...arguments)
      SCRIPT

      element = page.document.first("body")
      page.within_element(element) do
        attach_file file_input, file_path
      end

      script = <<~SCRIPT
        (function(dropTargetElement) {
          const fileInputElement = document.querySelector(`[name="#{file_input}"]`);

          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(fileInputElement.files[0]);

          const dropEvent = new DragEvent("drop", { dataTransfer });
          dropTargetElement.dispatchEvent(dropEvent);
        })(...arguments)
      SCRIPT
      page.execute_script script, first(locator)
    end

    def wait_for_all_themes_ready
      result = page.evaluate_async_script(WAIT_FOR_ALL_THEMES_READY_SCRIPT)
      expect(result).to be_truthy
    end

    def bounding_client_rect(selector)
      page.evaluate_script(BOUNDING_CLIENT_RECT_SCRIPT, selector)
    end

    def canvas_to_png(element)
      page.evaluate_script(CANVAS_TO_PNG_SCRIPT, element)
    end
  end
end

# monkey patch to capybara/session
module Capybara
  class Session
    include ActiveSupport::Callbacks

    define_callbacks :visit

    def visit_with_shirasagi(*args, **options)
      run_callbacks :visit do
        visit_without_shirasagi(*args, **options)
      end
    end

    alias visit_without_shirasagi visit
    alias visit visit_with_shirasagi
  end
end

RSpec.configuration.extend(SS::JsSupport::Hooks, js: true)
RSpec.configuration.include(SS::JsSupport, js: true)
