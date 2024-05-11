from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id=db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String, nullable=False)
    email=db.Column(db.String, nullable=False)
    location=db.Column(db.String)

    # _password_hash = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'<User {self.id}: {self.username}'