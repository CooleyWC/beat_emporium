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

    todays_date = datetime.utcnow().strftime('%Y-%m-%d')
    todays_date_str = todays_date + ' 00:00:00'

    data=request.get_json()

    if type(data) == dict:
      data = list(data)
    
    instrument_ids = [instrument['instrument_id'] for instrument in data]
    matching_instrument_rentals = [rental.to_dict() for rental in Rental.query.all() if rental.instrument_id in instrument_ids]
    # maybe end_date instead of start_date below
    matching_rentals = [rental for rental in matching_instrument_rentals if rental['start_date'] > todays_date_str]
    
    stored_rental_dict = {}
    error_dict = {}
    
    # stored rentals
    for rental in matching_rentals:

      date_list = []

      start_attr = rental['start_date']
      end_attr = rental['return_date']

      date_format = '%Y-%m-%d %H:%M:%S'

      start_date_obj = datetime.strptime(start_attr, date_format)
      end_date_obj = datetime.strptime(end_attr, date_format)

      while start_date_obj <= end_date_obj:
        # print('sr-start_date_obj', start_date_obj)
        start_str = str(start_date_obj)
        start_arr = start_str.split(' ')
        start_result = start_arr[0]
        # print('sr-start_result', start_result)

        instrument_id = rental['instrument_id']

        for key, value in stored_rental_dict.items():
          if start_result != value and key==instrument_id:
        
            stored_rental_dict[key].append(start_result)
            start_date_obj += timedelta(days=1)
        
        if instrument_id not in stored_rental_dict:
          date_list.append(start_result)
          start_date_obj += timedelta(days=1)
          stored_rental_dict[rental['instrument_id']] = date_list
    

    # new rentals
    incoming_rentals = [rental for rental in data]
   
    for rental in incoming_rentals:
      date_list = []
      
      start_attr = rental['start_date']
      end_attr = rental['return_date']

      split_start = start_attr.split('T')
      split_end = end_attr.split('T')

      start_str = split_start[0] + ' 00:00:00'
      end_str = split_end[0] + ' 00:00:00'
      
      date_format = '%Y-%m-%d %H:%M:%S'

      start_date_obj = datetime.strptime(start_str, date_format)
      end_date_obj = datetime.strptime(end_str, date_format)

      sub_value_arr = []
   
      if len(stored_rental_dict) != 0:
        
        while start_date_obj <= end_date_obj:
          start_str = str(start_date_obj)
          start_arr = start_str.split(' ')
          start_result = start_arr[0]
          
          for key in stored_rental_dict:
            if rental['instrument_id'] == key:
           
              for value in stored_rental_dict[key]:
             
                if value == start_result:
                  print(f'match: key={key}, \nlist we are looking at={stored_rental_dict[key]}, \nvalue={value}, \nstart={start_result} ')
                  sub_value_arr.append(start_result)
             
              start_date_obj += timedelta(days=1)
              error_dict[key] = sub_value_arr
  
    result = None
    
    for value in error_dict.values():
      if len(value) == 0:
        result = 'No conflicts'
 
      else:
        result = value
        error = {"error": "there or conflicts with the rental dates you entered", "conflicting_dates": error_dict}
   
        return error, 422
  
    # data=request.get_json()
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

          # change these to ifs not elifs
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

  print('another error')
