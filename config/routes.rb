Rails.application.routes.draw do
  devise_for :users
  get 'static_pages/index'
  root 'static_pages#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :reviews
  get 'movies/:tmdb_id', to: 'movies#show', as: :movies
  get 'series/:tmdb_id', to: 'series#show', as: :series

  resources :users, only: [:show]
  resources :relationships, only: [:create, :destroy]
  resources :upvotes, only: [:create, :destroy]

  get '/timeline', to: 'static_pages#timeline'
  get 'user/timeline', to: 'users#timeline'
end
