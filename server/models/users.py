from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-_password_hash','-rentals.user', '-reviews.user', '-reviews.instrument', '-reviews.user_id', '-instruments.users', '-instruments.reviews',)

    id=db.Column(db.Integer, primary_key=True)
    first_name=db.Column(db.String, nullable=False)
    last_name=db.Column(db.String, nullable=False)
    email=db.Column(db.String, nullable=False)
    location=db.Column(db.String)

    _password_hash = db.Column(db.String, nullable=False)

    rentals = db.relationship('Rental', back_populates='user', cascade='all, delete-orphan')
    reviews = db.relationship('Review', back_populates='user')
    instruments = db.relationship('Instrument', secondary='rentals', back_populates='users')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('password is not viewable')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash=bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def __repr__(self):
        return f'<User {self.id}: {self.username}'