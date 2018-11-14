SS::Application.routes.draw do

  Entry::Initializer

  content "entry" do
    resources :pages
  end
end
