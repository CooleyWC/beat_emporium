from config import app, api, db
from flask_restful import Resource
from flask import request
from datetime import datetime, date
from dateutil import parser

from models.rentals import Rental

class Rentals(Resource):
  def get(self):
    rentals = [rental.to_dict() for rental in Rental.query.all()]
    return rentals, 200
  
  def post(self):

    # add a check to see if any of the new rentals conflicts with dates in the database

    data=request.get_json()
    rentals_return = []

    if type(data) == list:
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
    else:
      print('another error')

    # fix this below
    if type(data) == dict:
      try:
        for attr in rental:
          if attr == 'start_date':
            start_date_str = rental.get('attr')
            date_format = '%Y,$/m,%d'
            start_date_obj = date.strptime(start_date_str, date_format)
            print(f'start date obj: {start_date_obj}')

          if attr == 'return_date':
            return_date_str = rental.get('attr')
            date_format = '%Y,$/m,%d'
            return_date_obj = date.strptime(return_date_str, date_format)
            print(f'return date obj: {return_date_obj}')
              
          if attr == 'created_at':
            created_at_date_str = rental.get('attr')
            date_format = '%Y,$/m,%d,$H,%M,%S'
            created_at_date_obj = datetime.strptime(created_at_date_str, date_format)
            print(f'created date obj: {created_at_date_obj}')

          rental = Rental(
            user_id = rental.get('user_id'),
            instrument_id = rental.get('instrument_id'),
            created_at = created_at_date_obj,
            start_date = start_date_obj,
            return_date = return_date_obj,
          )

          print(f'rental {rental}')

          db.session.add(rental)
          db.session.commit()

          rentals_return.append(rental.to_dict())
      except:
        error = {'error': 'there was a problem creating the rental(s)'}
        return error, 422
      return rentals_return, 200
    else:
      print('it appears it was not a list or dict')
      


