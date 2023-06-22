Rails.application.routes.draw do
  
  resources :payments, only: []
  resources :categories, only: [:index]
  resources :items
  resources :order_items, only: [:create]
  resources :orders, only: [:index]
  resources :users

  get "/me", to: "users#show"

  post "/checkout", to: "checkout#create"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "/data", to: "users#cloud_name_and_upload_present"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
