from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from config import db

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id=db.Column(db.Integer, primary_key=True)

    user_id=db.Column(db.Integer, db.ForeignKey('users.id'))
    instrument_id=db.Column(db.Integer, db.ForeignKey('instruments.id'))
    rental_id=db.Column(db.Integer, db.ForeignKey('rentals.id'))
    
    created_at=db.Column(db.DateTime)

    users = db.relationship('User', back_populates='reviews')
    rentals = db.relationship('Rental', back_populates='review')
    instruments = db.relationship('Instrument', back_populates='reviews')
    

