from config import app, api, db
from flask_restful import Resource

from models.users import User
from models.rentals import Rental
from models.reviews import Review
from models.instruments import Instrument

from resources.users import Users
from resources.signup import Signup
from resources.check_session import CheckSession
from resources.login import Login
from resources.logout import Logout
from resources.instruments import Instruments
  




# class Rentals(Resource):
#   def get(self):
#     rentals = [rental.to_dict() for rental in Rental.query.all()]
#     return rentals, 200
  

# class Instruments(Resource):
#   def get(self):
#     instruments = [instrument.to_dict() for instrument in Instrument.query.all()]
#     return instruments, 200


# class Reviews(Resource):
#   def get(self):
#     reviews = [review.to_dict() for review in Review.query.all()]
#     return reviews, 200


api.add_resource(Users, '/api/users')
api.add_resource(Signup, '/api/signup')
api.add_resource(CheckSession, '/api/check_session')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(Instruments, '/api/instruments')
# api.add_resource(Rentals, '/api/rentals')
# api.add_resource(Instruments, '/api/instruments')
# api.add_resource(Reviews, '/api/reviews')

if __name__ == "__main__":
  app.run(port=5555, debug=True)
