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
          begin
            if Chat::Intent.find_by({phrase: event.message['text']}).present?
              if Chat::Intent.find_by({phrase: event.message['text']}).suggest.present?
                client.reply_message(event['replyToken'], button(event))
              elsif Chat::Intent.find_by({phrase: event.message['text']}).link.present?
                client.reply_message(event['replyToken'], link(event))
              elsif Chat::Intent.find_by({phrase: event.message['text']}).response.present?
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

  def button(event)
    actions = []
    Chat::Intent.find_by({phrase: event.message['text']}).suggest.each do |suggest|
      actions << {
          "type": "message",
          "label": suggest,
          "text": suggest
      }
    end
    template = repeat(event),
        {
            "type": "template",
            "altText": "this is a buttons template",
            "template": {
                "type": "buttons",
                "actions": actions,
                "text": Chat::Node::Bot.first.response_template.gsub(%r{</?[^>]+?>},'') || Chat::Intent.find_by({phrase: event.message['text']}).response.gsub(%r{</?[^>]+?>},'')
            }
        }
    template << question(event) if Chat::Intent.find_by({phrase: event.message['text']}).question == 'enabled'
    template
  end

  def link(event)
    labels = Chat::Intent.find_by({phrase: event.message['text']}).response.scan(/<a(?: .+?)?>.*?<\/a>/)
    actions = []
    labels.zip(Chat::Intent.find_by({phrase: event.message['text']}).link).each do |label, link|
      actions << {
          "type": "uri",
          "label": label.gsub(%r{</?[^>]+?>},''),
          "uri": link
      }
    end
    text = Chat::Intent.find_by({phrase: event.message['text']}).response.scan(/<p(?: .+?)?>.*?<\/p>/)
    template = repeat(event),
        {
            "type": "template",
            "altText": "this is a buttons template",
            "template": {
                "type": "buttons",
                "actions": actions,
                "text": text.join("").gsub(%r{</?[^>]+?>},'')
            }
        }
    template << question(event) if Chat::Intent.find_by({phrase: event.message['text']}).question == 'enabled'
    template
  end

  def repeat(event)
    {
        type: 'text',
        text: "#{event.message['text']}ですね。"
    }
  end

  def question(event)
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

  def answer(event)
    if event.message['text'].eql?('yes')
      client.reply_message(event['replyToken'], {
          "type": "text",
          "text": Chat::Node::Bot.first.chat_success.gsub(%r{</?[^>]+?>},'')
      })
    elsif event.message['text'].eql?('no')
      client.reply_message(event['replyToken'], {
          "type": "text",
          "text": Chat::Node::Bot.first.chat_retry.gsub(%r{</?[^>]+?>},'') + "https://demo.ss-proj.org/inquiry/"})
    else
      client.reply_message(event['replyToken'], {
          "type": "text",
          "text": Chat::Node::Bot.first.exception_text.gsub(%r{</?[^>]+?>},'')
      })
    end
  end

  def res(event)
    template = repeat(event),
        {
            "type": "text",
            "text": Chat::Intent.find_by({phrase: event.message['text']}).response.gsub(%r{</?[^>]+?>},'')
        }
    template << question(event) if Chat::Intent.find_by({phrase: event.message['text']}).question == 'enabled'
    template
  end
end