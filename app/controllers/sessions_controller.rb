class SessionsController < ApplicationController
  before_action :authorize

  skip_before_action :authorize, only: [:create]

  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: {errors: ["Not authorized"]}, status: :unauthorized
    end
  end

  def destroy
    if session[:user_id]
      session.delete :user_id
      render json: {}
    else 
      render json: {errors: ["You must be logged in first"]}, status: :unauthorized
    end
  end

  private

  def authorize
    render json: {errors: ["Not authorized"]}, status: :unauthorized unless session.include? :user_id
  end
  
end
