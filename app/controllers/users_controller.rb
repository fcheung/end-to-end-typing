class UsersController < ApplicationController
  before_action :set_user, only: %i[ show ]

  # GET /users
  def index
    users = User.all.order(:name).paginate(page: params[:page], per_page: params[:per_page])

    @data = {
      users: users.map {|user| user.slice(:id, :name)},
      pagination: {
        total_entries: users.total_entries,
        current_page: users.current_page,
        per_page: users.per_page
      }
    }

    respond_to do |format|
      format.html {}
      format.json do
        render json: @data
      end
    end
  end

  # GET /users/1
  def show
    render json: {user: @user.slice(:id, :name, :email, :date_of_birth)}
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end
end
