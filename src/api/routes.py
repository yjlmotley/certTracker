"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Course
from api.send_email import send_email
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import jwt
import os


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)



# ---------------------------------- AUTHENTICATION ROUTES ----------------------------------
# ---------------------------------- AUTHENTICATION ROUTES ----------------------------------

@api.route('/check-availability', methods=['POST'])
def check_availability():
    field = request.json.get('field')
    value = request.json.get('value')

    if field not in ['username', 'email']:
        return jsonify({"error": "Invalid field"}), 400
    
    user = User.query.filter(getattr(User, field) == value).first()

    return jsonify({"isAvailable": user is None}), 200

@api.route('/signup', methods=['POST'])
def sign_up():
    email = request.json.get("email")
    password = request.json.get("password")
    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    username = request.json.get("username")

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400

    new_user = User(
       email = email,
       password = generate_password_hash(password), 
       first_name = first_name,
       last_name = last_name,
       username = username,
    )
    db.session.add(new_user)
    db.session.commit()
    

    response_body = {
        "message": "User successfully created",
        "user": new_user.serialize() 
    }

    return jsonify(response_body), 201

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email")
    password = request.json.get("password")
        
    user = User.query.filter_by(email = email).one_or_none()
    if user is None:
        return jsonify({"message": "Email does not exist"}), 404
    
    if not check_password_hash(user.password, password):
        return jsonify({"message": "Incorrect password"}), 401

     # Update last_active with the current UTC time
    user.last_active = datetime.utcnow()
    db.session.commit()
    
    access_token = create_access_token(
        identity = user.id,
        expires_delta=timedelta(days=7)
    )
    print("Access Token:", access_token)
    return jsonify({
        "token": access_token,
        "user": user.serialize()
    }), 200


@api.route("/forgot-password", methods=["POST"])
def forgot_password(): 
    email=request.json.get("email")

    user = User.query.filter_by(email=email).first()
    if user is None: 
        return jsonify({"message": "email does not exist"}), 400
    
    expiration_time=datetime.utcnow() + timedelta(hours = 1)
    token = jwt.encode({"email": email, "exp": expiration_time}, os.getenv("FLASK_APP_KEY"), algorithm="HS256")

    email_value=f"Click here to reset password.\n{os.getenv('FRONTEND_URL')}/forgot-password?token={token}"
    send_email(email, email_value, "Password Recovery: CertTracker")
    return jsonify({"message": "recovery email sent"}), 200
    


@api.route("/reset-password/<token>", methods=["PUT"])
def reset_password(token):
    data=request.get_json()
    password=data.get("password")

    try:
        decoded_token=jwt.decode(token, os.getenv("FLASK_APP_KEY"), algorithms=["HS256"])
        email=decoded_token.get("email")
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired" }), 400
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 400
    
    user=User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User does not exist"}), 400
    
    user.password=generate_password_hash(password)
    db.session.commit()

    send_email(email, "password successfully reset", "password reset confirmation for Koyo")
    return jsonify({"message": "password reset email sent"}), 200


# ---------------------------------- COURSES ROUTES ----------------------------------
# ---------------------------------- COURSES ROUTES ----------------------------------
@api.route('/courses', methods=['GET'])
def get_courses():
    try:
        courses = Course.query.all()
        return jsonify([course.serialize() for course in courses]), 200 # OK status code
    except Exception as e:
        return jsonify({"error": str(e)}), 500 # Internal Server Error


@api.route('/courses', methods=['POST'])
@jwt_required() # Require JWT token for this route
def add_course():
    course_data = request.get_json()
    # Basic validation check
    if not course_data:
        return jsonify({"error": "Missing course data"}), 400 # Bad Request status code

    # Retrieve the user ID from the JWT token
    current_user = get_jwt_identity()
    if current_user is None:
        return jsonify({"message": "User not authenticated"}), 401

    print("Current User:", current_user)
    print("Current User Type:", type(current_user))

    user = User.query.get(current_user)
    if user is None:
        return jsonify({"message": "user not found"}), 404
    
    token_payload = get_jwt()
    print("Token Payload:", token_payload)

    new_course = Course(
        is_completed=course_data['is_completed'],
        number=course_data['number'],
        name=course_data['name'],
        # don't include the order = (auto calculated in models.py)
        exp_starting_date=course_data['exp_starting_date'],
        start_date=course_data['start_date'],        
        due_date=course_data['due_date'],
        expiration_date=course_data['expiration_date'],        
        exp_timeframe=course_data['exp_timeframe'],        
        other_details=course_data['other_details'],
        user_id=user.id
    )

    db.session.add(new_course)
    db.session.commit()
    
    return jsonify(new_course.serialize()), 201 # Created status code

@api.route('/courses/<int:course_id>', methods=['PUT'])
@jwt_required()
def update_course(course_id):
    course_data = request.get_json()
    course = Course.query.get(course_id)
    if not course:
        return jsonify({'error': 'Course not found'}), 404

    user_id = get_jwt_identity()
    if course.user_id != user_id:
        return jsonify({"error": "You're not authorized to edit this course."}), 401

    course.is_completed = course_data['is_completed']
    course.number = course_data['number']
    course.name = course_data['name']
    course.order = course_data.get('order', course.order)
    course.exp_starting_date = course_data['exp_starting_date']
    course.start_date = course_data['start_date']
    course.due_date = course_data['due_date']
    course.expiration_date = course_data['expiration_date']
    course.exp_timeframe = course_data['exp_timeframe']
    course.other_details = course_data['other_details']

    db.session.commit()
    return jsonify(course.serialize()), 200  # OK status code

@api.route('/courses/reorder', methods=['PUT'])
def reorder_courses():
    courses_order = request.json
    try:
        for course_data in courses_order:
            course = Course.query.get(course_data['id'])
            if course:
                course.order = course_data['order']
        db.session.commit()
        return jsonify({'message': 'Courses reordered successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Route to delete a course by ID (assuming course ID is in the URL)
@api.route('/courses/<int:course_id>', methods=['DELETE'])
@jwt_required()
def delete_course(course_id):
    course = Course.query.get(course_id) 
    if not course:
        return jsonify({'error': 'Course not found'}), 404
    
    user_id = get_jwt_identity()
    if course.user_id != user_id:
        return jsonify({"error": "You're not authorized to delete this course."})

    db.session.delete(course)
    db.session.commit()
    return jsonify({'msg': 'Course deleted'}), 204 # No Content status code 