from config import app, api, db
from models.users import User
from models.rentals import Rental
from models.reviews import Review
from models.instruments import Instrument

if __name__ == "__main__":
  app.run(port=5555, debug=True)
