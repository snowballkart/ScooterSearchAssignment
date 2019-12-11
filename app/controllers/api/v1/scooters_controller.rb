module Api::V1
	class ScootersController < ApplicationController
		def index
			@scooters = Scooter.all
			render json: @scooters
		end
	end
end


