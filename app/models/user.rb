class User
  include SS::Document

  seqid :id
  field :name, type: String
  field :email, type: String
end
