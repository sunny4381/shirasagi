module Service::BaseFilter
  extend ActiveSupport::Concern
  include Service::AuthFilter
  include SS::LayoutFilter

  included do
    cattr_accessor(:user_class) { Service::Account }
    cattr_accessor :model_class
    before_action :set_model
    before_action :set_ss_assets
    before_action :logged_in?
    before_action :set_crumbs
    rescue_from RuntimeError, with: :rescue_action
    layout "service/base"
    navi_view "service/main/navi"
  end

  module ClassMethods
    private

    def model(cls)
      self.model_class = cls if cls
    end
  end

  def stylesheets
    @stylesheets || []
  end

  def stylesheet(path, **options)
    @stylesheets ||= []
    return if @stylesheets.any? { |maybe_array| maybe_array.is_a?(Array) ? maybe_array[0] == path : maybe_array == path }

    if options.present?
      @stylesheets << [ path, options ]
    else
      @stylesheets << path
    end
  end

  def javascripts
    @javascripts || []
  end

  def javascript(path, **options)
    @javascripts ||= []
    return if @javascripts.any? { |maybe_array| maybe_array.is_a?(Array) ? maybe_array[0] == path : maybe_array == path }

    if options.present?
      @javascripts << [ path, options ]
    else
      @javascripts << path
    end
  end

  private

  def set_model
    @model = self.class.model_class
  end

  def set_crumbs
    # extend
  end

  def set_ss_assets
    if SS.config.ss.stylesheets.present?
      SS.config.ss.stylesheets.each { |path, options| options ? stylesheet(path, **options.symbolize_keys) : stylesheet(path) }
    end
    if SS.config.ss.javascripts.present?
      SS.config.ss.javascripts.each { |path, options| options ? javascript(path, **options.symbolize_keys) : javascript(path) }
    end
    stylesheet("/colorbox.css")
  end

  def logged_in?
    if @cur_user
      set_last_logged_in
      return @cur_user
    end

    @cur_user = SS.current_user = get_user_by_session
    SS.change_locale_and_timezone(SS.current_user)
    if @cur_user
      set_last_logged_in
      return @cur_user
    end

    unset_user

    respond_to do |format|
      format.html { redirect_to service_login_path }
      format.json { render json: :error, status: :unauthorized }
    end
  end

  def set_user(user, **opts)
    if opts[:session]
      reset_session if SS.config.sns.logged_in_reset_session
      session[:service_account] = {
        "user_id" => user.id,
        "remote_addr" => remote_addr,
        "user_agent" => request.user_agent,
        "last_logged_in" => Time.zone.now.to_i
      }
      if opts[:password].present?
        session[:service_account]["password"] = SS::Crypto.encrypt(opts[:password])
      end
    end
    redirect_to service_main_path if opts[:redirect]
    @cur_user = SS.current_user = user
    SS.change_locale_and_timezone(SS.current_user)
  end

  def rescue_action(exception)
    if exception.to_s.numeric?
      status = exception.to_s.to_i
      file = error_html_file(status)
      return ss_send_file(file, status: status, type: Fs.content_type(file), disposition: :inline)
    end
    raise exception
  end

  def error_html_file(status)
    file = "#{Rails.public_path}/.error_pages/#{status}.html"
    Fs.exist?(file) ? file : "#{Rails.public_path}/.error_pages/500.html"
  end
end
