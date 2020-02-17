class Line::BotController < ApplicationController
  require 'line/bot'

  protect_from_forgery :except => [:callback]

  def client
    @client ||= Line::Bot::Client.new { |config|
      config.channel_secret = ENV["LINE_CHANNEL_SECRET"]
      config.channel_token = ENV["LINE_CHANNEL_TOKEN"]
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
          if Chat::Intent.find_by({phrase: event.message['text']}).present?
            if Chat::Intent.find_by({phrase: event.message['text']}).suggest.present?
              client.reply_message(event['replyToken'], button(event))
            elsif Chat::Intent.find_by({phrase: event.message['text']}).response.present?
              client.reply_message(event['replyToken'], {
                    "type": "text",
                    "text": Chat::Intent.find_by({phrase: event.message['text']}).response.gsub(%r{</?[^>]+?>},'')
                })
            end
          end
        end
      end
    }
    head :ok
  end

  private

  def button(event)
    actions = []
    Chat::Intent.find_by({phrase: event.message['text']}).suggest.each do |suggest|
      actions << {
          "type": "message",
          "label": suggest,
          "text": suggest
      }
    end
    @template = {
        "type": "template",
        "altText": "this is a buttons template",
        "template": {
            "type": "buttons",
            "actions": actions,
            "text": "以下から選択してください。"
        }
    }
    @template
  end
end