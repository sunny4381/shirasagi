class Micropost
  include SS::Document

  seqid :id
  field :content, type: String
  belongs_to :user, class_name: "User"

  validates :content, presence: true, length: { maximum: 140 }
  validates :user_id, presence: true
end
