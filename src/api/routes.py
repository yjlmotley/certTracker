"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Course
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# the following route is only for example purposes --------------------------------------------------------------------
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
# ---------------------------------------------------------------------------------------------------------------------

@api.route('/courses', methods=['GET'])
def get_courses():
    try:
        courses = Course.query.all()
        return jsonify([course.serialize() for course in courses]), 200 # OK status code
    except Exception as e:
        return jsonify({"error": str(e)}), 500 # Internal Server Error

# Route to add a new course (assuming data is sent in JSON format)
@api.route('/courses', methods=['POST'])
def add_course():
    course_data = request.get_json()

    # Basic validation check
    if not course_data:
        return jsonify({"error": "Missing course data"}), 400 # Bad Request status code


    new_course = Course(
        is_completed=course_data['is_completed'],
        number=course_data['number'],
        name=course_data['name'],
        exp_starting_date=course_data['exp_starting_date'],
        start_date=course_data['start_date'],        
        due_date=course_data['due_date'],
        expiration_date=course_data['expiration_date'],        
        exp_timeframe=course_data['exp_timeframe'],        
        other_details=course_data['other_details']        
    )

    db.session.add(new_course)
    db.session.commit()
    
    return jsonify(new_course.serialize()), 201 # Created status code

@api.route('/courses/<int:course_id>', methods=['PUT'])
def update_course(course_id):
    course_data = request.get_json()
    course = Course.query.get(course_id)
    if not course:
        return jsonify({'error': 'Course not found'}), 404

    course.is_completed = course_data['is_completed']
    course.number = course_data['number']
    course.name = course_data['name']
    course.exp_starting_date = course_data['exp_starting_date']
    course.start_date = course_data['start_date']
    course.due_date = course_data['due_date']
    course.expiration_date = course_data['expiration_date']
    course.exp_timeframe = course_data['exp_timeframe']
    course.other_details = course_data['other_details']

    db.session.commit()
    return jsonify(course.serialize()), 200  # OK status code


# Route to delete a course by ID (assuming course ID is in the URL)
@api.route('/courses/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    course = Course.query.get(course_id) 
    if not course:
        return jsonify({'error': 'Course not found'}), 404

    db.session.delete(course)
    db.session.commit()
    return jsonify({'msg': 'Course deleted'}), 204 # No Content status code