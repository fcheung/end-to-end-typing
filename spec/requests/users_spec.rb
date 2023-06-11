require 'rails_helper'

RSpec.describe "/users", type: :request do

  #
  # These specs verify that the endpoints return (or embed) data matching their respective schemas. You would also normally validate
  # that the content of the data is correct
  #
  describe "GET /index" do

    before do
      User.create!(name: 'bob', date_of_birth: '1982-04-15', email: 'bob@bob.test')
    end

    context 'as html' do
      it "renders a successful response" do
        get '/users'

        expect(response).to be_successful
        # check that an element on the page exists whose data-props attribute conforms to the schema
        expect(props(response.body, 'div[data-component="users"]')).to match_schema('responses/get_users.yml')
      end
    end

    context 'as json' do
      it 'renders json matching the responses/get_users schema' do

        get '/users', as: :json

        expect(response).to be_successful
        expect(response.body).to match_schema('responses/get_users.yml')
      end
    end
  end


  describe 'GET /show' do
    let(:user) { User.create name: 'bob', date_of_birth: '1982-04-15', email: 'bob@bob.test'}
    it 'renders json matching the responses/get_user schema' do
      get "/users/#{user.id}"

      expect(response).to be_successful
      expect(response.body).to match_schema('responses/get_user.yml')
    end
  end

end
