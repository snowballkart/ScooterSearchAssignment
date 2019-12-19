module Api::V1
	class ScootersController < ApplicationController
		def index
			@scooters = Scooter.all
			render json: @scooters
		end
		def search
			@scooters = Scooter.within(
				params[:distance].to_f/1000,
				:units => :kms,
				:origin => [
					params[:lat],
					params[:lon]
				]
			)
			@scooters = @scooters.by_distance(
				:origin => [
					params[:lat],
					params[:lon]
				]
			).first(params[:numScooters])
			render json: @scooters
		end
	end
end


