from config import app, api, db
from models.users import User
from models.rentals import Rental
from models.reviews import Review
from models.instruments import Instrument
from flask_restful import Resource


class Users(Resource):
  def get(self):
    users = [user.to_dict() for user in User.query.all()]
    return users, 200
  
api.add_resource(Users, '/api/users')

class Rentals(Resource):
  def get(self):
    rentals = [rental.to_dict() for rental in Rental.query.all()]
    return rentals, 200
  
api.add_resource(Rentals, '/api/rentals')

class Instruments(Resource):
  def get(self):
    instruments = [instrument.to_dict() for instrument in Instrument.query.all()]
    return instruments, 200

api.add_resource(Instruments, '/api/instruments')

class Reviews(Resource):
  def get(self):
    reviews = [review.to_dict() for review in Review.query.all()]
    return reviews, 200

api.add_resource(Reviews, '/api/reviews')

if __name__ == "__main__":
  app.run(port=5555, debug=True)
