from config import app, api, db
from flask_restful import Resource
from flask import request

from models.users import User


class Rentals(Resource):
  def get(self):
    users = [user.to_dict() for user in User.query.all()]
    return users, 200
  
  def post(self):
    json=request.json()
    print(json)

