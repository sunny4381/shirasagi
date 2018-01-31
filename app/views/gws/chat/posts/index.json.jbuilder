json.version @cur_room.version
json.created @cur_room.created.to_i
json.updated @cur_room.updated.to_i
json.items(@items) do |item|
  json.id item.id.to_s
  json.text item.text
  item.file.tap do |file|
    if file.present?
      json.file do
        json.name file.name
        json.basename file.basename
        json.is_image file.image? ? true : false
        json.content_type file.content_type
        json.url file.url
        json.extname file.extname
        if file.image?
          json.thumb_url file.thumb.url
        end
      end
    end
  end
  item.user.tap do |user|
    json.user do
      json.id user.id
      json.name user.name
      json.long_name user.long_name
      json.avatar do
        json.url avatar_gws_user_path(id: user)
      end
    end
  end
  json.created item.created.to_i
  json.updated item.updated.to_i
end
