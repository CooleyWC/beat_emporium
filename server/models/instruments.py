from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from config import db

class Instrument(db.Model, SerializerMixin):
    __tablename__ = 'instruments'

    serialize_rules = ('-users', '-rentals.instrument','-reviews.instrument',)

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    brand=db.Column(db.String, nullable=False)
    model=db.Column(db.String, nullable=False)
    size=db.Column(db.String, nullable=False)
    color=db.Column(db.String, nullable=False)
    description=db.Column(db.String, nullable=False)
    image=db.Column(db.String, nullable=False)

    for_rent=db.Column(db.Boolean)
    rent_price=db.Column(db.Integer, nullable=False)
    sale_price=db.Column(db.Integer, nullable=False)
    in_stock=db.Column(db.Boolean)

    reviews = db.relationship('Review', back_populates='instrument', cascade='all, delete-orphan')
    rentals = db.relationship('Rental', back_populates='instrument', cascade='all, delete-orphan')
    users = db.relationship('User', secondary='rentals', back_populates='instruments')

    @validates('name')
    def validate_name(self, key, name):
        if isinstance(name, str) and (2 <=len(name) <=25):
            return name
        else:
            raise ValueError('name must be a string between 2 and 25 characters')

    
