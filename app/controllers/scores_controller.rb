class ScoresController < ApplicationController

    def index
        scores = Score.all
        render json: scores
    end

    def create
        user = User.find(params[:user_id])
        score = Score.create(score: params[:score], user: user)
        render json: score, status: :created
    end
end
