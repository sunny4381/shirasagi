class Micropost
  include SS::Document

  seqid :id
  field :content, type: String
  field :user_id, type: Integer
end
