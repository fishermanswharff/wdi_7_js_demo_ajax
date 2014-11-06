require 'json'
require 'pry'

# store users in memory
users = [
  {:id => 1, :name => 'Dan'},
  {:id => 2, :name => 'Ella'},
  {:id => 3, :name => 'Ava'},
  {:id => 4, :name => 'Jason'}
]

before do
  # set content type to JSON
  content_type :json

  # allow CORS requests
  headers 'Access-Control-Allow-Origin' => '*',
    'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
    'Access-Control-Allow-Headers' => 'Content-Type'
end

# handle 500 errors
error 500 do
  'Something went wrong!'
end

# added so preflight requests succeed
options '*' do
  200
end

get '/users' do
  users.to_json
end

get '/users/:id' do 
  users[params[:id].to_i - 1].to_json
  users.to_json
end

post '/users' do
  user = JSON.parse(request.env['rack.input'].read)
  
  # convert string keys to symbols
  Hash[user.map{|(k,v)| [k.to_sym,v]}]
  
  users << user

  response['Location'] = "/users/#{user['id']}"
  response.body = user.to_json
  response.status = 201
end

delete '/users/:id' do
  # binding.pry
  
  users.delete_if { |user| user[:id].to_i == params[:id].to_i}

  204
end

get '/broken' do
  500
end
