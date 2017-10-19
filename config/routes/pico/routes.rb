SS::Application.routes.draw do
  Pico::Initializer

  get '.p:site/', to: 'pico/portal#index', as: :pico_portal
end
