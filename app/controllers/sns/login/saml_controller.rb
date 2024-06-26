class Sns::Login::SamlController < ApplicationController
  include Sns::BaseFilter
  include Sns::LoginFilter

  skip_before_action :verify_authenticity_token, raise: false, only: :consume
  skip_before_action :logged_in?
  before_action :set_item

  model Sys::Auth::Saml

  private

  def set_item
    @item ||= @model.find_by(filename: params[:id])
  end

  def settings
    @settings ||= OneLogin::RubySaml::Settings.new.tap do |settings|
      settings.assertion_consumer_service_url = sns_login_saml_url(id: @item.filename).sub(/\/init$/, "/consume")
      settings.issuer = sns_login_saml_url(id: @item.filename).sub(/\/init$/, "")

      settings.idp_entity_id = @item.entity_id
      settings.name_identifier_format = @item.name_id_format
      settings.idp_sso_target_url = @item.sso_url
      settings.idp_slo_target_url = @item.slo_url
      settings.idp_cert = SS::Crypto.decrypt(@item.x509_cert)
      settings.idp_cert_fingerprint = @item.fingerprint
      settings.force_authn = true if @item.force_authn?
      if @item.authn_context
        settings.authn_context = @model::AUTHN_CONTEXT_MAP[@item.authn_context] || @model::DEFAULT_AUTHN_CONTEXT
      else
        settings.authn_context = @model::DEFAULT_AUTHN_CONTEXT
      end
    end
  end

  def authorize_failure
    Rails.logger.debug("authorize failure")
    raise "403"
  end

  public

  def init
    @request_url ||= ::Addressable::URI.parse(request.url)

    request = OneLogin::RubySaml::Authrequest.new

    # "ref" is a path to redirect after user is successfully logged in
    ref = params[:ref].try { |ref| ref.to_s }
    if ref.present?
      ref = ::Addressable::URI.join(@request_url, ref) rescue nil
    end
    ref = normalize_url(ref) if ref.present?
    if ref.present?
      ref = nil unless trusted_url?(ref)
    end
    ref = ref.to_s if ref.present?

    # "login_path" is a path to redirect after user is logged out
    login_path = params[:login_path].try { |path| path.to_s }
    if login_path.present?
      login_path = ::Addressable::URI.join(@request_url, login_path) rescue nil
    end
    login_path = normalize_url(login_path) if login_path.present?
    if login_path.present?
      login_path = nil unless trusted_url?(login_path)
    end
    login_path = login_path.to_s if login_path.present?

    sso_token = SS::SSOToken.create_token!(ref: ref, login_path: login_path)
    redirect_to(request.create(settings, RelayState: sso_token.token, ForceAuthn: "true"))
  end

  def consume
    state = params[:RelayState]
    raise "404" if state.blank?

    sso_token = SS::SSOToken.where(token: state).first
    raise "404" if sso_token.blank?

    sso_token.destroy
    raise "404" unless sso_token.available?

    response = OneLogin::RubySaml::Response.new(params[:SAMLResponse])
    response.settings = settings

    if !response.is_valid?
      Rails.logger.warn("Failed to validate SAMLResponse:\n  #{response.errors.join("\n  ")}") rescue nil
      render_login nil, nil, alert: response.status_message.presence
      return
    end

    user = SS::User.uid_or_email(response.nameid).and_enabled.and_unlocked.first
    if user.blank?
      Rails.logger.info("#{response.nameid}: user not found")
      render_login nil, nil
      return
    end

    # "ref" is a path to redirect after user is successfully logged in
    params[:ref] = sso_token.ref
    # "login_path" is a path to redirect after user is logged out
    render_login user, nil, session: true, login_path: sso_token.login_path || sns_login_path
  end

  def metadata
    meta = OneLogin::RubySaml::Metadata.new
    render :xml => meta.generate(settings), content_type: "application/samlmetadata+xml"
  end
end
