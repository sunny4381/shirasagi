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
                # if phrase(event).suggest.count > 4
                client.reply_message(event['replyToken'], suggests(event))
                # else
                #   client.reply_message(event['replyToken'], suggest(event))
                # end
              elsif phrase(event).link.present?
                client.reply_message(event['replyToken'], links(event))
              elsif phrase(event).response.present?
                client.reply_message(event['replyToken'], res(event))
              end
            end
          rescue
            answer(event)
          end
        end
      end
    }
    head :ok
  end

  private

  def phrase(event)
    Chat::Intent.find_by({phrase: event.message['text']})
  end

  def text(event)
    if phrase(event).suggest.present? && phrase(event).response.present?
      phrase(event).response.gsub(%r{</?[^>]+?>},'')
    else
      Chat::Node::Bot.first.response_template.gsub(%r{</?[^>]+?>},'')
    end
  end

  # def suggest(event)
  #   actions = []
  #   phrase(event).suggest.each do |suggest|
  #     actions << {
  #         "type": "message",
  #         "label": suggest,
  #         "text": suggest
  #     }
  #   end
  #   template =
  #       {
  #           "type": "template",
  #           "altText": "this is a buttons template",
  #           "template": {
  #               "type": "buttons",
  #               "actions": actions,
  #               "text": text(event)
  #           }
  #       }
  #   template << site_search(event) if phrase(event).site_search == 'enabled'
  #   template << question if phrase(event).question == 'enabled'
  #   template
  # end

  # def link(event)
  #   labels = phrase(event).response.scan(/<a(?: .+?)?>.*?<\/a>/)
  #   actions = []
  #   labels.zip(phrase(event).link).each do |label, link|
  #     actions << {
  #         "type": "uri",
  #         "label": label.gsub(%r{</?[^>]+?>},''),
  #         "uri": link
  #     }
  #   end
  #   template = []
  #   text = phrase(event).response.scan(/<p(?: .+?)?>.*?<\/p>/)
  #   template <<
  #       {
  #           "type": "template",
  #           "altText": "this is a buttons template",
  #           "template": {
  #               "type": "buttons",
  #               "actions": actions,
  #               "text": text.join("").gsub(%r{</?[^>]+?>},'')
  #           }
  #       }
  #   template << site_search(event) if phrase(event).site_search == 'enabled'
  #   template << question if phrase(event).question == 'enabled'
  #   template
  # end

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
    if event.message['text'].eql?('yes')
      client.reply_message(event['replyToken'], {
          "type": "text",
          "text": Chat::Node::Bot.first.chat_success.gsub(%r{</?[^>]+?>},'')
      })
    elsif event.message['text'].eql?('no')
      client.reply_message(event['replyToken'], {
          "type": "text",
          "text": Chat::Node::Bot.first.chat_retry.gsub(%r{</?[^>]+?>},'')
      })
    else
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
            "text": Chat::Node::Bot.first.question.gsub(%r{</?[^>]+?>},''),
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
                    "uri": "https://" + Cms::Site.find(site).domains[0] + url
                }
            ]
        }
    }
    template
  end

  def no_match
    {
        "type": "text",
        "text": Chat::Node::Bot.first.exception_text.gsub(%r{</?[^>]+?>},'')
    }
  end

  def suggests(event)
    suggests = phrase(event).suggest
    actions = suggests.each_slice(4).to_a

    ary = []
    array = []
    actions.each do |action|
      action.each do |suggest|
        array << {
            "type": "message",
            "label": suggest,
            "text": suggest
        }
      end
      ary << array
      array = []
    end

    templates = []
    ary.each do |action|
      template =
          {
              "type": "template",
              "altText": "this is a buttons template",
              "template": {
                  "type": "buttons",
                  "actions": action,
                  "text": text(event)
              }
          }
      templates << template
    end
    templates << site_search(event) if phrase(event).site_search == 'enabled'
    templates << question if phrase(event).question == 'enabled'
    templates
  end

  def links(event)
    labels = phrase(event).response.scan(/<a(?: .+?)?>.*?<\/a>/)
    actions = labels.each_slice(4).to_a
    ary = []
    array = []
    actions.each do |action|
      action.zip(phrase(event).link).each do |label, link|
        array << {
            "type": "uri",
            "label": label.gsub(%r{</?[^>]+?>},''),
            "uri": link
        }
      end
      ary << array
      array = []
    end

    templates = []
    text = phrase(event).response.scan(/<p(?: .+?)?>.*?<\/p>/)
    ary.each do |action|
      template =
          {
              "type": "template",
              "altText": "this is a buttons template",
              "template": {
                  "type": "buttons",
                  "actions": action,
                  "text": text.join("").gsub(%r{</?[^>]+?>},'')
              }
          }
      templates << template
    end
    templates << site_search(event) if phrase(event).site_search == 'enabled'
    templates << question if phrase(event).question == 'enabled'
    templates
  end
end