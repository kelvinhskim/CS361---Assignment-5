from flask import Flask, request, jsonify
from datetime import datetime
import re
import logging

# Initialize Flask app and logging
app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants for validation
REQUIRED_FIELDS = {'date', 'time', 'vet_name'}
VALID_DATE_PATTERN = re.compile(r'^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$')  # YYYY-MM-DD
VALID_TIME_PATTERN = re.compile(r'^([01]\d|2[0-3]):([0-5]\d)$')  # HH:MM (24-hour format)
VALID_VET_NAME_PATTERN = re.compile(r'^[a-zA-Z\s\.\'-]{1,100}$')  # Letters, spaces, periods, hyphens, apostrophes
VALID_USER_ID_PATTERN = re.compile(r'^\d+$')  # Assuming user_id should be numeric
MAX_FIELD_LENGTH = 100

@app.route('/send-notification', methods=['POST'])
def send_notification():
    """
    Handles POST requests for sending notifications.
    Validates input data and returns appropriate responses.

    Returns:
        JSON response with success or error message.
    """
    try:
        data = request.get_json()

        # Validate top-level structure
        if not data or 'user_id' not in data or 'appointment' not in data:
            logger.warning("Invalid request structure")
            return jsonify({"status": "error", "message": "Invalid request structure"}), 400

        # Add user_id validation
        user_id = str(data['user_id'])
        if not VALID_USER_ID_PATTERN.match(user_id):
            logger.warning("Invalid user_id format")
            return jsonify({"status": "error", "message": "Invalid user_id format"}), 400

        appointment = data['appointment']

        # Add length validation for all fields
        for field, value in appointment.items():
            if len(str(value)) > MAX_FIELD_LENGTH:
                logger.warning(f"Field {field} exceeds maximum length")
                return jsonify({"status": "error", "message": f"Field {field} exceeds maximum length of {MAX_FIELD_LENGTH} characters"}), 400

        # Validate required fields in the appointment
        missing_fields = REQUIRED_FIELDS - set(appointment.keys())
        if missing_fields:
            logger.warning(f"Missing fields in appointment: {missing_fields}")
            return jsonify({"status": "error", "message": f"Missing fields: {', '.join(missing_fields)}"}), 400

        # Validate date format
        if not VALID_DATE_PATTERN.match(appointment['date']):
            logger.warning("Invalid date format")
            return jsonify({"status": "error", "message": "Invalid date format. Use YYYY-MM-DD."}), 400

        # Validate time format
        if not VALID_TIME_PATTERN.match(appointment['time']):
            logger.warning("Invalid time format")
            return jsonify({"status": "error", "message": "Invalid time format. Use HH:MM (24-hour format)."}), 400

        # Validate vet_name format
        if not VALID_VET_NAME_PATTERN.match(appointment['vet_name']):
            logger.warning("Invalid vet name format")
            return jsonify({"status": "error", "message": "Vet name must only contain letters, spaces, periods, hyphens, and apostrophes."}), 400

        # Validate that the appointment is in the future
        appointment_datetime = datetime.strptime(f"{appointment['date']} {appointment['time']}", "%Y-%m-%d %H:%M")
        if appointment_datetime <= datetime.utcnow():
            logger.warning("Appointment date and time must be in the future")
            return jsonify({"status": "error", "message": "Appointment must be scheduled in the future."}), 400

        logger.info(f"Notification sent for user {user_id}: {appointment}")
        return jsonify({
            "status": "success", 
            "message": "Notification sent successfully", 
            "appointment_details": appointment
        }), 200

    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return jsonify({"status": "error", "message": "An internal server error occurred"}), 500

@app.route('/', methods=['GET'])
def health_check():
    """
    Health check endpoint to verify the server is running.
    """
    return jsonify({"status": "success", "message": "Server is running"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
