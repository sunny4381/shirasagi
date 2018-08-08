class Micropost
  include SS::Document

  seqid :id
  field :content, type: String
  belongs_to :user, class_name: "User"

  validates :content, length: { maximum: 140 }
end
