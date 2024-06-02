from config import app, api, db
from flask_restful import Resource

from models.instruments import Instrument

class Instruments(Resource):
    def get(self):
        print('instruments get ran')
        instruments = [instrument.to_dict() for instrument in Instrument.query.all()]
        return instruments, 200