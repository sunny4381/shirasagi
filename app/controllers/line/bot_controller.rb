class Line::BotController < ApplicationController
  require 'line/bot'

  protect_from_forgery :except => [:callback]

  def client
    @client ||= Line::Bot::Client.new { |config|
      config.channel_secret = Cms::Site.find_by_domain(request_host).line_channel_secret
      config.channel_token = Cms::Site.find_by_domain(request_host).line_channel_access_token
    }
  end

  def callback
    body = request.body.read

    signature = request.env['HTTP_X_LINE_SIGNATURE']
    unless client.validate_signature(body, signature)
      head :bad_request
    end

    events = client.parse_events_from(body)

    events.each { |event|
      case event
      when Line::Bot::Event::Message
        case event.type
        when Line::Bot::Event::MessageType::Text
          begin
            if phrase(event).present?
              if phrase(event).suggest.present?
                client.reply_message(event['replyToken'], suggests(event))
              elsif phrase(event).link.present?
                client.reply_message(event['replyToken'], links(event))
              elsif phrase(event).response.present?
                client.reply_message(event['replyToken'], res(event))
              end
            end
          rescue
            answer(event)
          end
        when Line::Bot::Event::MessageType::Location
          client.reply_message(event['replyToken'], carousel)
        end
      end
    }
    head :ok
  end

  private

  def site_id
    Cms::Site.find_by_domain(request_host).id
  end

  def phrase(event)
    Chat::Intent.find_by({phrase: event.message['text']})
  end

  def res(event)
    template =
        {
            "type": "text",
            "text": phrase(event).response.gsub(%r{</?[^>]+?>},'')
        }
    template << site_search(event) if phrase(event).site_search == 'enabled'
    template << question if phrase(event).question == 'enabled'
    template
  end

  def answer(event)
    begin
      if event.message['text'].eql?('yes')
        client.reply_message(event['replyToken'], {
            "type": "text",
            "text": Chat::Node::Bot.find_by(site_id: site_id).chat_success.gsub(%r{</?[^>]+?>},'')
        })
      elsif event.message['text'].eql?('no')
        client.reply_message(event['replyToken'], {
            "type": "text",
            "text": Chat::Node::Bot.find_by(site_id: site_id).chat_retry.gsub(%r{</?[^>]+?>},'')
        })
      elsif event.message['text'].eql?('近くの施設を探す')
        set_location(event)
      elsif Facility::Node::Page.find_by({name: event.message['text']}).present?
        client.reply_message(event['replyToken'], {
            "type": "location",
            "title": event.message['text'],
            "address": Facility::Node::Page.find_by({name: event.message['text']}).address,
            "latitude": Facility::Map.find_by(name: event.message['text']).map_points[0][:loc][0],
            "longitude": Facility::Map.find_by(name: event.message['text']).map_points[0][:loc][1]
        })
      end
    rescue
      template = []
      template << no_match << site_search(event)
      client.reply_message(event['replyToken'], template)
    end
  end

  def question
    {
        "type": "template",
        "altText": "this is a confirm template",
        "template": {
            "type": "confirm",
            "text": Chat::Node::Bot.find_by(site_id: site_id).question.gsub(%r{</?[^>]+?>},''),
            "actions": [
                {
                    "type": "message",
                    "label": "Yes",
                    "text": "yes"
                },
                {
                    "type": "message",
                    "label": "No",
                    "text": "no"
                }
            ]
        }
    }
  end

  def site_search(event)
    site = Cms::Site.find_by_domain(request_host).id
    site_search_node = Cms::Node::SiteSearch.find_by(site_id: site)
    uri = URI.parse(site_search_node.url)
    uri.query = { s: { keyword: event.message['text'] } }.to_query
    url = uri.try(:to_s)
    template = {
        "type": "template",
        "altText": "this is a buttons template",
        "template": {
            "type": "buttons",
            "text": "サイト内検索結果を開く",
            "actions": [
                {
                    "type": "uri",
                    "label": "サイト内検索結果へ移動",
                    "uri": "https://" + Cms::Site.find(site).domains[1] + url
                }
            ]
        }
    }
    template
  end

  def no_match
    {
        "type": "text",
        "text": Chat::Node::Bot.find_by(site_id: site_id).exception_text.gsub(%r{</?[^>]+?>},'')
    }
  end

  def suggest_text(event, templates)
    if templates.empty?
      if phrase(event).suggest.present? && phrase(event).response.present?
        phrase(event).response.gsub(%r{</?[^>]+?>},'')
      else
        Chat::Node::Bot.find_by(site_id: site_id).response_template.gsub(%r{</?[^>]+?>},'')
      end
    else
      "選択肢#{templates.length + 1}"
    end
  end

  def suggests(event)
    suggests = phrase(event).suggest
    actions = suggests.each_slice(4).to_a
    action_templates = []
    suggest_templates = []
    actions.each do |action|
      action.each do |suggest|
        suggest_templates << {
            "type": "message",
            "label": suggest,
            "text": suggest
        }
      end
      action_templates << suggest_templates
      suggest_templates = []
    end

    templates = []
    action_templates.each do |action|
      template =
          {
              "type": "template",
              "altText": "this is a buttons template",
              "template": {
                  "type": "buttons",
                  "actions": action,
                  "text": suggest_text(event, templates)
              }
          }
      templates << template
    end
    templates << site_search(event) if phrase(event).site_search == 'enabled'
    templates << question if phrase(event).question == 'enabled'
    templates
  end

  def link_text(event, templates)
    if templates.empty?
      if phrase(event).response.scan(/<p(?: .+?)?>.*?<\/p>/).present?
        phrase(event).response.scan(/<p(?: .+?)?>.*?<\/p>/).join("").gsub(%r{</?[^>]+?>},'')
      else
        Chat::Node::Bot.find_by(site_id: site_id).response_template.gsub(%r{</?[^>]+?>},'')
      end
    else
      "選択肢#{templates.length + 1}"
    end
  end

  def links(event)
    labels = phrase(event).response.scan(/<a(?: .+?)?>.*?<\/a>/)
    actions = labels.each_slice(4).to_a
    action_templates = []
    link_templates = []
    actions.each do |action|
      action.zip(phrase(event).link).each do |label, link|
        link_templates << {
            "type": "uri",
            "label": label.gsub(%r{</?[^>]+?>},''),
            "uri": link
        }
      end
      action_templates << link_templates
      link_templates = []
    end

    templates = []
    action_templates.each do |action|
      template =
          {
              "type": "template",
              "altText": "this is a buttons template",
              "template": {
                  "type": "buttons",
                  "actions": action,
                  "text": link_text(event, templates)
              }
          }
      templates << template
    end
    templates << site_search(event) if phrase(event).site_search == 'enabled'
    templates << question if phrase(event).question == 'enabled'
    templates
  end

  def set_location(event)
    client.reply_message(event['replyToken'], {
        "type": "template",
        "altText": "位置検索中",
        "template": {
            "type": "buttons",
            "text": "現在の位置を送信しますか？",
            "actions": [
                {
                    "type": "uri",
                    "label": "位置を送る",
                    "uri": "line://nv/location"
                }
            ]
        }
    })
  end

  def carousel
    facilities =  Facility::Node::Page.order_by(id: "desc").to_a
    columns = []
    domain = Cms::Site.find_by_domain(request_host).domains[1]
    facilities.each do |facility|
      facility_url = Facility::Node::Page.find_by(name: facility.name).url
      column =
          {
              "title": facility.name,
              "text": facility.address,
              "defaultAction": {
                  "type": "uri",
                  "label": "View detail",
                  "uri": "http://example.com/page/123"
              },
              "actions": [
                  {
                      "type": "message",
                      "label": "地図",
                      "text": facility.name
                  },
                  {
                      "type": "uri",
                      "label": "詳細情報",
                      "uri": "https://" + domain + facility_url
                  }
              ]
          }
      columns << column
    end
    template = {
        "type": "template",
        "altText": "this is a carousel template",
        "template": {
            "type": "carousel",
            "columns": columns,
            "imageAspectRatio": "rectangle",
            "imageSize": "cover"
        }
    }
    template
  end
end