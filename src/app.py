"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory, send_file, session
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
# from flask_jwt_extended import JWTManager
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from datetime import datetime



ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 7*24*60*60*52
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
JWTManager(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# ---------------------------------- EXPORT/IMPORT DB ROUTES ----------------------------------
# ---------------------------------- EXPORT/IMPORT DB ROUTES ----------------------------------
def is_admin():
    """Helper function to check if current user is admin"""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return user and user.email == os.getenv("ADMIN_EMAIL")

@app.route('/backup-database', methods=['GET'])
@jwt_required()
def backup_database():
    filename = "database_backup.json"
    try:
        # Check if user is admin
        if not is_admin():
            return jsonify({"error": "Unauthorized. Admin access required."}), 403

        # Generate a filename with timestamp
        # timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        # filename = f"database_backup_{timestamp}.json"
        # filename = f"database_backup.json"
        
        # Get the current Flask app instance
        # current_app = app._get_current_object()
        
        # Call our export command programmatically
        # with current_app.app_context():
            # current_app.test_cli_runner().invoke(args=['export-db', filename])
        with app.app_context():
            app.test_cli_runner().invoke(args=['export-db', filename])
        
        # Send the file to the user
        # return send_file(
        #     filename,
        #     mimetype='application/json',
        #     as_attachment=True,
        #     download_name=filename
        # )
        return jsonify({"message": "Database backup successful"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    # finally:
    #     print("filename:", filename)
        # Clean up the file after sending
        # if os.path.exists(filename):
        #     os.remove(filename)

@app.route('/restore-database', methods=['POST'])
@jwt_required()
def restore_database():
    try:
        # Check if user is admin
        if not is_admin():
            return jsonify({"error": "Unauthorized. Admin access required."}), 403

        # if 'file' not in request.files:
        #     return jsonify({"error": "No file provided"}), 400
        
        # file = request.files['file']
        # if file.filename == '':
        #     return jsonify({"error": "No file selected"}), 400
        
        # if not file.filename.endswith('.json'):
        #     return jsonify({"error": "File must be a JSON file"}), 400
        
        # Save the uploaded file temporarily
        # temp_filename = f"temp_restore_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        # file.save(temp_filename)
        
        # Get the current Flask app instance
        # current_app = app._get_current_object()
        
        # Call our import command programmatically
        # with current_app.app_context():
        #     result = current_app.test_cli_runner().invoke(
        #         args=['import-db', temp_filename, '--clear']
        #     )
        
        # if result.exit_code == 0:
        #     return jsonify({"message": "Database restored successfully"}), 200
        # else:
        #     return jsonify({"error": "Failed to restore database", "details": result.output}), 500
            
        # Get the root directory path and backup file path
        root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        backup_path = os.path.join(root_dir, "database_backup.json")
        
        # Check if backup file exists
        if not os.path.exists(backup_path):
            return jsonify({"error": "Backup file not found in root directory"}), 404
        
        # Call our import command programmatically
        with app.app_context():
            result = app.test_cli_runner().invoke(args=['import-db', backup_path, '--clear'])
        
        if result.exit_code == 0:
            return jsonify({"message": "Database restored successfully"}), 200
        else:
            return jsonify({"error": "Failed to restore database", "details": result.output}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    # finally:
        # Clean up the temporary file
        # if os.path.exists(temp_filename):
        #     os.remove(temp_filename)


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
