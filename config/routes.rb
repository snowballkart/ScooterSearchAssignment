Rails.application.routes.draw do
  resources :scooters
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
  	namespace :v1 do
  		resources :scooters
  	end
  end
end
