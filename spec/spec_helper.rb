# Don't run always Coverage analysis
# ref. http://docs.travis-ci.com/user/environment-variables/#Default-Environment-Variables
require 'dotenv'
Dotenv.load

ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../config/environment", __dir__)
require 'rails-controller-testing'
require 'rspec/rails'
# require 'rspec/autorun'
require 'rspec/collection_matchers'
require 'rspec/its'
require 'capybara/rspec'
require 'capybara/rails'
require 'factory_bot'
require 'timecop'
require 'support/ss/capybara_support'

# Checks for pending migrations before tests are run.
# If you are not using ActiveRecord, you can remove this line.
ActiveRecord::Migration.check_pending! if defined?(ActiveRecord::Migration)

def ci?
  ENV["CI"] == "true"
end

def travis?
  ci? && ENV["TRAVIS"] == "true"
end

def analyze_coverage?
  ci? || ENV["ANALYZE_COVERAGE"] != "disabled"
end

if analyze_coverage?
  require 'simplecov'
  require 'simplecov-csv'
  require 'simplecov-html'

  formatters = [
    SimpleCov::Formatter::CSVFormatter,
    SimpleCov::Formatter::HTMLFormatter
  ]
  if ci?
    require 'simplecov-lcov'

    # coveralls requires consolidated file "lcov.info"
    SimpleCov::Formatter::LcovFormatter.config do |config|
      config.report_with_single_file = true
      config.lcov_file_name = "lcov.info"
    end

    formatters << SimpleCov::Formatter::LcovFormatter
  end

  SimpleCov.formatter = SimpleCov::Formatter::MultiFormatter.new(formatters)
  SimpleCov.start do
    add_filter 'spec/'
    add_filter 'vendor/bundle'
  end
end

if Module.const_defined?(:WebMock)
  require "webmock/rspec"
  WebMock.allow_net_connect!
end

RSpec.configure do |config|
  # ## Mock Framework
  #
  # If you prefer to use mocha, flexmock or RR, uncomment the appropriate line:
  #
  # config.mock_with :mocha
  # config.mock_with :flexmock
  # config.mock_with :rr

  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  # config.fixture_path = "#{::Rails.root}/spec/fixtures"

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  # config.use_transactional_fixtures = true

  # If true, the base class of anonymous controllers will be inferred
  # automatically. This will be the default behavior in future versions of
  # rspec-rails.
  config.infer_base_class_for_anonymous_controllers = false

  # Run specs in random order to surface order dependencies. If you find an
  # order dependency and want to debug it, you can fix the order by providing
  # the seed, which is printed after each run.
  #     --seed 1234
  #config.order = "random"
  config.order = "defined"
  Kernel.srand config.seed

  config.include Rails.application.routes.url_helpers
  config.include Capybara::DSL
  config.include RSpec::Rails::RailsExampleGroup
  config.include ActiveJob::TestHelper
  config.include ActiveSupport::Testing::TimeHelpers
  config.include FactoryBot::Syntax::Methods
  config.include ViewComponent::TestHelpers, type: :component

  config.add_setting :default_dbscope, default: :context

  driver = ENV['driver'].presence || 'auto'
  if !SS::CapybaraSupport.activate_driver(driver, config)
    config.filter_run_excluding(js: true)
  end

  # fragile specs are ignored when rspec is executing in Travis CI.
  if ci?
    config.filter_run_excluding(fragile: true)
  end

  config.before(:suite) do
    # load all models
    ::Rails.application.eager_load!
    # `rake db:drop`
    ::Mongoid::Clients.default.database.drop
  end

  config.before(:context) do
    FactoryBot.reload
    Capybara.app_host = nil
  end

  config.before(:example, type: :feature) do |example|
    page.reset!
    # puts '# ' + example.metadata[:full_description]
  end

  config.after(:example) do |example|
    Rails.cache.clear if Rails.cache
  end

  config.after(:example, type: :feature) do
    page.reset!
  rescue => e
    # たまに page.reset! でのタイムアウトでテストが失敗するときがある。テスト失敗とならないように rescue する。
    Rails.logger.debug(e.to_s)
  end

  Capybara.configure do |config|
    config.ignore_hidden_elements = false
    # Capybara's default is 2, but it is too short. 60 is a bit long in daily use.
    config.default_max_wait_time = ENV.fetch("CAPYBARA_MAX_WAIT_TIME", 30).to_i

    # to test michecker, it is needed to bind globally to access server within docker container.
    config.server_host = "0.0.0.0"
  end

  ENV.fetch("rspec_retry", ci? ? 3 : nil).tap do |rspec_retry|
    if rspec_retry.numeric? && rspec_retry.to_i > 0
      require 'rspec/retry'

      config.verbose_retry = true
      config.display_try_failure_messages = true
      config.around :each, :js do |example|
        example.run_with_retry retry: rspec_retry.to_i
      end

      # callback to be run between retries
      config.retry_callback = proc do |ex|
        # run some additional clean up task - can be filtered by example metadata
        if ex.metadata[:js]
          Capybara.reset!
        end
      end

      puts "[RSpec] enabled rspec retry"
    end
  end
end

ALPHABETS = ("a".."z").to_a.freeze

def unique_id(size = 5)
  s = ALPHABETS.sample + Random.bytes(size).unpack1("H*")
  s.downcase!
  s
end

def unique_tel
  "99-#{Array.new(4) { rand(0..9 ) }.join}-#{Array.new(4) { rand(0..9 ) }.join}"
end

def unique_domain
  "#{unique_id}.example.jp"
end

def unique_url
  "#{%w(http https).sample}://#{unique_domain}/#{unique_id}/"
end

def unique_email
  "#{unique_id}@example.jp"
end

def unique_color
  @random_color ||= SS::RandomColor.new
  @random_color.next.to_rgb.to_s
end

def i18n_translations(prefix: nil, count: nil, join: nil, sep: nil, length: nil)
  if prefix.present?
    gen_value = proc do
      ret = "#{prefix}#{sep || "-"}#{unique_id}"
      length.numeric? && length > 0 ? ret[0, length] : ret
    end
  else
    gen_value = proc do
      ret = unique_id
      length.numeric? && length > 0 ? ret[0, length] : ret
    end
  end
  translations = {}.with_indifferent_access
  I18n.available_locales.each do |lang|
    if count
      value = Array.new(count) { gen_value.call }
      value = value.join(join) if join
    else
      value = gen_value.call
    end

    translations[lang.to_s] = value
  end
  translations
end

def ss_japanese_text(length: 10, separator: '')
  @japanese_chars ||= begin
    hiragana = ('あ'..'ん').to_a
    katakana = ('ア'..'ン').to_a
    sjis_1st_level_start = "亜".encode("cp932")
    sjis_1st_level_end = "腕".encode("cp932")
    sjis_1st_level = (sjis_1st_level_start..sjis_1st_level_end).to_a
    sjis_1st_level.map! { |k| k.encode("UTF-8", invalid: :replace, undef: :replace, replace: '') }
    sjis_1st_level.reject! { |k| k.blank? }

    hiragana + katakana + sjis_1st_level
  end

  @japanese_chars.sample(length).join(separator)
end

def with_env(hash)
  save = {}
  hash.each do |k, v|
    save[k] = ENV[k] if ENV.key?(k)
    ENV[k] = v
  end

  ret = yield

  hash.each do |k, _|
    if save.key?(k)
      ENV[k] = save[k]
    else
      ENV.delete(k)
    end
  end

  ret
end

def wait_for_notice(text, wait: nil, selector: nil)
  if page.driver.is_a?(Capybara::Selenium::Driver)
    wait_for_js_ready
    options = { text: text }
    options[:wait] = wait if wait
    # CI で次のようなエラーが（たまに）観測される。
    # unknown error: unhandled inspector error: {"code":-32000,"message":"Node with given id does not belong to the document"}
    #
    # おそらく #notice の変化を監視している最中にページ遷移したんだと想像。
    # このようなエラーが発生した場合にリトライするようにしてみる。
    Retriable.retriable(on: [ Selenium::WebDriver::Error::WebDriverError ]) do
      expect(page).to have_css(selector || '#notice', **options)
    end
    page.execute_script("SS.clearNotice();")
    wait_for_js_ready
  else
    expect(page).to have_css('#notice', text: text)
  end
end

def wait_for_error(text, wait: nil, selector: nil)
  if page.driver.is_a?(Capybara::Selenium::Driver)
    wait_for_js_ready
    options = { text: text }
    options[:wait] = wait if wait
    Retriable.retriable(on: [ Selenium::WebDriver::Error::WebDriverError ]) do
      expect(page).to have_css(selector || '#errorExplanation', **options)
    end
    page.execute_script("SS.clearNotice();")
    wait_for_js_ready
  else
    expect(page).to have_css('#errorExplanation', text: text)
  end
end

# ref.
#   https://www.relishapp.com/rspec/rspec-expectations/v/2-5/docs/built-in-matchers/be-within-matcher
#   http://qiita.com/kozy4324/items/9a6530736be7e92954bc
RSpec::Matchers.define :eq_as_time do |expected_time|
  match do |actual_time|
    expect(actual_time.to_f).to be_within(0.001).of(expected_time.to_f)
  end
end
# TODO: Should this code be written here? Another more correctly place?

# Requires supporting ruby files with custom matchers and macros, etc,
# in spec/support/ and its subdirectories.
Dir[Rails.root.join("spec/support/**/*.rb")].sort.each { |f| require f }
