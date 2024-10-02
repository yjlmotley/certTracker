from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Boolean
from datetime import date, datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    last_active = db.Column(db.DateTime(), nullable=True)

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "is_active": self.is_active,
            "last_active": self.last_active
        }

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_completed = db.Column(db.Boolean(), nullable=False, default=False)
    number = db.Column(db.String(20), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    exp_starting_date= db.Column(db.Date, nullable=True)
    start_date= db.Column(db.Date, nullable=True)
    due_date= db.Column(db.Date, nullable=True)
    expiration_date=db.Column(db.Date, nullable=True)
    exp_timeframe= db.Column(db.String(50), nullable=True)
    other_details= db.Column(db.String(5000), nullable=True)

    def __repr__(self):
        return f'<Course {self.number}: {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "is_completed": self.is_completed,
            "number": self.number,
            "name": self.name,
            "exp_starting_date": self.exp_starting_date,
            "start_date": self.start_date,
            "due_date": self.due_date,
            "expiration_date": self.expiration_date,
            "exp_timeframe": self.exp_timeframe,
            "other_details": self.other_details
        }

# TODO: Make the Course recursive to the user (if user gets deleted, their courses get deleted as well)
# TODO: Assign the course to the username