class Gws::Elasticsearch::Indexer::FaqPostJob < Gws::ApplicationJob
  include Gws::Elasticsearch::Indexer::BoardBase

  self.model = Gws::Faq::Post

  class << self
    def path(*args)
      url_helpers.gws_faq_topic_path(*args)
    end
  end

  def enum_es_docs
    Enumerator.new do |y|
      each_item do |item|
        topic = Gws::Faq::Topic.find(item.topic_id)

        y << self.class.convert_to_doc(self.site, topic, item)
        item.files.each do |file|
          y << self.class.convert_file_to_doc(self.site, topic, item, file)
        end
      end
    end
  end
end
