from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Boolean, func
from datetime import date, datetime


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    last_active = db.Column(db.DateTime(), nullable=True)

    courses = db.relationship('Course', backref='user', lazy=True, cascade='all, delete-orphan')
    certifications = db.relationship('Certification', backref='user', lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "last_active": self.last_active
        }

class Course(db.Model):
    __tablename__ = "courses"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    is_completed = db.Column(db.Boolean(), nullable=False, default=False)
    number = db.Column(db.String(20), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    order = db.Column(db.Integer, nullable=False, default=0)
    exp_starting_date= db.Column(db.Date, nullable=True)
    start_date= db.Column(db.Date, nullable=True)
    due_date= db.Column(db.Date, nullable=True)
    expiration_date=db.Column(db.Date, nullable=True)
    exp_timeframe= db.Column(db.String(50), nullable=True)
    other_details= db.Column(db.String(5000), nullable=True)

    def __init__(self, name, order=None, is_completed=False, number=None, exp_starting_date=None, start_date=None, due_date=None, expiration_date=None, exp_timeframe=None, other_details=None):
        self.name = name
        self.is_completed = is_completed
        self.number = number
        self.exp_starting_date = exp_starting_date
        self.start_date = start_date
        self.due_date = due_date
        self.expiration_date = expiration_date
        self.exp_timeframe = exp_timeframe
        self.other_details = other_details
        # Logic to auto-set order if not provided
        if order is None:
            # self.order = Course.query.count() + 1
            max_order = db.session.query(func.max(Course.order)).scalar()
            self.order = (max_order or 0) + 1
        else: 
            self.order = order

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
            "other_details": self.other_details,
            "order": self.order,
            # Serialize related user info
            "user_id": self.user.id if self.user else None,
            "user_first_name": self.user.first_name if self.user else None,
            "user_last_name": self.user.last_name if self.user else None
        }

class Certification(db.Model):
    __tablename__ = 'certifications'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    is_completed = db.Column(db.Boolean(), nullable=False, default=False)
    number = db.Column(db.String(20), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    order = db.Column(db.Integer, nullable=False, default=0)
    exp_starting_date= db.Column(db.Date, nullable=True)
    start_date= db.Column(db.Date, nullable=True)
    due_date= db.Column(db.Date, nullable=True)
    expiration_date=db.Column(db.Date, nullable=True)
    exp_timeframe= db.Column(db.String(50), nullable=True)
    other_details= db.Column(db.String(5000), nullable=True)

    def __init__(self, name, order=None, is_completed=False, number=None, exp_starting_date=None, start_date=None, due_date=None, expiration_date=None, exp_timeframe=None, other_details=None):
        self.name = name
        self.is_completed = is_completed
        self.number = number
        self.exp_starting_date = exp_starting_date
        self.start_date = start_date
        self.due_date = due_date
        self.expiration_date = expiration_date
        self.exp_timeframe = exp_timeframe
        self.other_details = other_details
        # Logic to auto-set order if not provided
        if order is None:
            # self.order = Certification.query.count() + 1
            max_order = db.session.query(func.max(Certification.order)).scalar()
            self.order = (max_order or 0) + 1
        else: 
            self.order = order

    def __repr__(self):
        return f'<Certification {self.number}: {self.name}>'

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
            "other_details": self.other_details,
            "order": self.order,
            # Serialize related user info
            "user_id": self.user.id if self.user else None,
            "user_first_name": self.user.first_name if self.user else None,
            "user_last_name": self.user.last_name if self.user else None
        }
