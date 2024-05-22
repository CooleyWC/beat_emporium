from config import app, api, db, os
from flask_restful import Resource

from flask import Flask, jsonify, request, make_response, redirect

import stripe

stripe_keys = {
  'secret_key': os.environ['STRIPE_SECRET_KEY'],
  'publishable_key': os.environ['STRIPE_PUBLISHABLE_KEY']
}

stripe.api_key = stripe_keys['secret_key']

PAYMENT_RESULT_URL = 'http://127.0.0.1:5173/payment_result'

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

@app.route('/create_checkout_session', methods=['POST'])
def create_checkout_session():
  session = stripe.checkout.Session.create(
    line_items = [{
      'price_data': {
        'currency': 'usd',
        'product_data': {
          'name': 'T-shirt',
        },
        'unit_amount': 2000,
      },
      'quantity': 1,
    }],
    mode = 'payment',
    ui_mode = 'embedded',
    return_url = PAYMENT_RESULT_URL + '?session_id={CHECKOUT_SESSION_ID}',
  )
  return jsonify(clientSecret=session.client_secret)

@app.route('/session_status', methods=['GET'])
def session_status():
  session = stripe.checkout.Session.retrieve(request.args.get('session_id'))

  return jsonify(status=session.status, customer_email=session.customer_details.email)


api.add_resource(Users, '/api/users')
api.add_resource(Signup, '/api/signup')
api.add_resource(CheckSession, '/api/check_session')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(Instruments, '/api/instruments')

if __name__ == "__main__":
  app.run(port=5555, debug=True)
