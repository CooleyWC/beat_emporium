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
        
    def patch(self, id):
        data = request.get_json()
        if data:
            try:
                instrument = Instrument.query.filter(Instrument.id==id).first()

                for attr in data:
                    if attr != 'rentals' and attr != 'reviews':
                        setattr(instrument, attr, data.get(attr))
                
                db.session.add(instrument)
                db.session.commit()

                instrument_dict = instrument.to_dict()
                return instrument_dict, 200
            except:
                error = {'error': 'there was an error updating this instrument'}
                return error, 422
        else:
            error = {'error': 'there was a problem accessing this instrument in the db'}
            return error, 400