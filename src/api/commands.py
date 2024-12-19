import click
import json
from datetime import datetime
from api.models import db, User, Course, Certification

def setup_commands(app):
    @app.cli.command("export-db")
    @click.argument("filename", default="database_backup.json")
    def export_database(filename):
        """Export all database data to a JSON file"""
        try:
            # Get all data from database
            users = User.query.all()
            courses = Course.query.all()
            certifications = Certification.query.all()

            # Create manual serialization for users to include password
            users_serialized = [{
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "username": user.username,
                "email": user.email,
                "password": user.password,  # Include password
                "last_active": user.last_active
            } for user in users]
            # users_serialized = [user.serialize() for user in users]

            # Create data dictionary
            data = {
                # "users": [user.serialize() for user in users],
                "users": users_serialized, # Use our custom serialization
                "courses": [course.serialize() for course in courses],
                "certifications": [cert.serialize() for cert in certifications]
            }

            # Convert datetime objects to string format
            for user in data["users"]:
                if user["last_active"]:
                    user["last_active"] = user["last_active"].isoformat()

            # Write to JSON file
            with open(filename, 'w') as f:
                json.dump(data, f, indent=4, default=str)
            
            print(f"Database successfully exported to {filename}")
        
        except Exception as e:
            print(f"Error exporting database: {str(e)}")

    @app.cli.command("import-db")
    @click.argument("filename", default="database_backup.json")
    @click.option("--clear", is_flag=True, help="Clear existing data before import")
    def import_database(filename, clear):
        """Import database data from a JSON file"""
        try:
            # Read JSON file
            with open(filename, 'r') as f:
                data = json.load(f)

            if clear:
                # Clear existing data
                Certification.query.delete()
                Course.query.delete()
                User.query.delete()
                db.session.commit()

            user_mapping = {} # To store old_id -> new_id mapping

            # Import users first
            for user_data in data.get("users", []):
                # Convert string back to datetime for last_active
                if user_data.get("last_active"):
                    user_data["last_active"] = datetime.fromisoformat(user_data["last_active"])
                
                # Store the old ID before creating new user
                old_id = user_data["id"]

                user = User(
                    first_name=user_data["first_name"],
                    last_name=user_data["last_name"],
                    username=user_data["username"],
                    email=user_data["email"],
                    password=user_data["password"],
                    last_active=user_data.get("last_active")
                )
                db.session.add(user)
                db.session.flush()  # This assigns the new ID
                user_mapping[old_id] = user.id  # Map old ID to new ID
            db.session.commit()

            # Import courses
            for course_data in data.get("courses", []):
                # Update the user_id to the new mapped ID
                old_user_id = course_data["user_id"]
                new_user_id = user_mapping.get(old_user_id)

                if new_user_id is None:
                    print(f"Warning: Could not find mapping for user_id {old_user_id}, skipping course {course_data['name']}")
                    continue

                # Convert string dates to date objects
                date_fields = ["exp_starting_date", "start_date", "due_date", "expiration_date"]
                for field in date_fields:
                    if course_data.get(field):
                        course_data[field] = datetime.strptime(course_data[field], "%Y-%m-%d").date()

                course = Course(
                    name=course_data["name"],
                    user_id=new_user_id,  # Use the new user_id instead of course_data["user_id"]
                    order=course_data["order"],
                    is_completed=course_data["is_completed"],
                    number=course_data["number"],
                    exp_starting_date=course_data.get("exp_starting_date"),
                    start_date=course_data.get("start_date"),
                    due_date=course_data.get("due_date"),
                    expiration_date=course_data.get("expiration_date"),
                    exp_timeframe=course_data.get("exp_timeframe"),
                    other_details=course_data.get("other_details")
                )
                db.session.add(course)
            db.session.commit()

            # Import certifications
            for cert_data in data.get("certifications", []):
                # Update the user_id to the new mapped ID
                old_user_id = cert_data["user_id"]
                new_user_id = user_mapping.get(old_user_id)
                
                if new_user_id is None:
                    print(f"Warning: Could not find mapping for user_id {old_user_id}, skipping certification {cert_data['name']}")
                    continue

                # Convert string dates to date objects
                for field in date_fields:
                    if cert_data.get(field):
                        cert_data[field] = datetime.strptime(cert_data[field], "%Y-%m-%d").date()

                certification = Certification(
                    name=cert_data["name"],
                    user_id=new_user_id,  # Use the new user_id instead of cert_data["user_id"]
                    order=cert_data["order"],
                    is_completed=cert_data["is_completed"],
                    number=cert_data["number"],
                    exp_starting_date=cert_data.get("exp_starting_date"),
                    start_date=cert_data.get("start_date"),
                    due_date=cert_data.get("due_date"),
                    expiration_date=cert_data.get("expiration_date"),
                    exp_timeframe=cert_data.get("exp_timeframe"),
                    other_details=cert_data.get("other_details")
                )
                db.session.add(certification)
            db.session.commit()

            print(f"Database successfully imported from {filename}")
        
        except Exception as e:
            db.session.rollback()
            print(f"Error importing database: {str(e)}")