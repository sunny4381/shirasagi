class User
  include SS::Document

  seqid :id
  field :name, type: String
  field :email, type: String

  has_many :microposts, class_name: "Micropost"
end
