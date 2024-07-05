from config import app, api, db
from flask_restful import Resource
from flask import request, session

from models.instruments import Instrument

class InstrumentByID(Resource):
    def get(self, id):
        try:
            instrument = Instrument.query.filter(Instrument.id==id).first()
            instrument_dict = instrument.to_dict()

            return instrument_dict, 200
        except:
            error={'error': 'there was an error accessing this instrument'}
            return error, 400
        
    def delete(self, id):
        try:
            instrument = Instrument.query.filter(Instrument.id==id).first()

            db.session.delete(instrument)
            db.session.commit()

            return {'message': 'this instrument was successfully deleted'}
        except:
            error={'error': 'there was an error deleting this instrument'}
            return error, 422