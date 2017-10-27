class SS::TempFileSerializer < ActiveModel::Serializer
  attributes :_id, :created, :updated, :user_id, :geo_location, :model, :state, :name, :filename, :size
  attributes :content_type, :site_id, :url, :path, :image?, :thumb_url, :humanized_name, :extname
end
