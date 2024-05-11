from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from config import db


class Rental(db.Model, SerializerMixin):
    __tablename__ = 'rentals'

    id=db.Column(db.Integer, primary_key=True)

    user_id=db.Column(db.Integer, db.ForeignKey('users.id'))
    instrument_id=db.Column(db.Integer, db.ForeignKey('instruments.id'))

    created_at=db.Column(db.DateTime)
    start_date=db.Column(db.Date)
    return_date=db.Column(db.Date)

    in_stock=db.Column(db.Boolean)

    def __repr__(self):
        user=self.user.username if self.user else None
        instrument=self.instrument.name if self.instrument else None
        return f'<Rental {user}: {instrument}'