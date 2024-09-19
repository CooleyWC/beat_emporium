from config import app, api, db
from flask_restful import Resource
from flask import request
from datetime import datetime, date, timedelta
from dateutil import parser

from models.rentals import Rental
from models.instruments import Instrument

class Rentals(Resource):
  def get(self):
    rentals = [rental.to_dict() for rental in Rental.query.all()]
    return rentals, 200
  
  def post(self):

    data=request.get_json()

    if isinstance(data, dict):
      data = [data]

    rentals_return = []
    
    for rental in data:
    
      try:
        start_obj = ''
        return_obj = ''
        created_obj = ''

        for attr in rental:

          if attr == 'start_date':
            start_str = parser.parse(rental.get(attr))
            start_obj=start_str
          elif attr == 'return_date':
            return_str = parser.parse(rental.get(attr))
            return_obj=return_str
          elif attr == 'created_at':
            created_str=parser.parse(rental.get(attr))
            created_obj=created_str
        
        rental_to_save = Rental(
          user_id = rental.get('user_id'),
          instrument_id = rental.get('instrument_id'),
          created_at = created_obj,
          start_date = start_obj,
          return_date = return_obj,
        )

        db.session.add(rental_to_save)
        db.session.commit()

        rentals_return.append(rental_to_save.to_dict())
      except:
        error = {'error': 'there was a problem creating the rental(s)'}
        return error, 422
    return rentals_return, 200
