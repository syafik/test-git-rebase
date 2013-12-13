Restaurant::Application.routes.draw do

  resources :items
  resources :foods

  get "dashboard/index"
  root :to => 'dashboard#index'

  devise_for :users
  devise_scope :user do
    post 'login' => 'sessions#create', :as => 'login'
    post 'logout' => 'sessions#destroy', :as => 'logout'
    get 'current_user' => 'sessions#show_current_user', :as => 'show_current_user'
  end

end
