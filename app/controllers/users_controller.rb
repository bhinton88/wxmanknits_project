class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :handle_invalid_data
  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found

  before_action :find_user, :authorize

  skip_before_action :find_user, :authorize, only: [:create]

  def create
    user = User.create!(user_params)
    # then we need to create a session for the new user
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def show
    if @user
      render json: @user, status: :created
    else
      render json: {errors: ["Please Login first"]}, status: :unauthorized
    end
  end

  #  want functionality to be able to update information about our current user
  def update
    @user.update!(user_params)
    render json: @user, status: :created
  end

  #  want functionality to be able to delete our profile if we so choose
  def destroy
    @user.destroy
    head :no_content
  end

  def cloud_name_and_upload_present
    cloudinary_info = {cloud_name: Rails.application.credentials.cloudinary_cloud_name, upload_preset: Rails.application.credentials.cloudinary_upload_preset}
    render json: cloudinary_info
  end


  private
  
  #  we want to make sure that we are only allowing the current signed in user to do certain things
  def find_user
    @user = User.find_by(id: session[:user_id])
  end

  def user_params
    params.permit(:username, :password, :password_confirmation, :full_name, :address, :city, :state, :zip_code, :email, :admin_rights)
  end

  def handle_invalid_data(invalid)
    render json: {errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def handle_record_not_found
    render json: {errors: ["User not found"]}, status: :not_found
  end

  def authorize
    render json: {errors: ["Not authorized"]}, status: :unauthorized unless session.include? :user_id
  end
end
