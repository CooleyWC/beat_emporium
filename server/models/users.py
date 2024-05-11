from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id=db.Column(db.Integer, primary_key=True)