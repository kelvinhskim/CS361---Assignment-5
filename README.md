**Appointment Notification Microservice**

**Overview**

This microservice handles appointment notifications by validating input data and providing structured responses. It is designed to be accessed programmatically using HTTP POST requests, allowing users to send requests and receive structured JSON responses.
#
**Communication Contract**

**How to Programmatically Request Data**

To request data from the microservice, you need to send a POST request to the /send-notification endpoint.

**Endpoint**

```
POST http://localhost:5000/send-notification
```

**Request Format**

The request payload must be in JSON format and include:

- user_id (string): A numeric identifier for the user.
- appointment (object):
   - date (string): Appointment date in YYYY-MM-DD format.
   - time (string): Appointment time in 24-hour HH:MM format.
   - vet_name (string): Name of the veterinarian (letters, spaces, periods, hyphens, and apostrophes allowed).

**json Example Request Payload**
```
{
    "user_id": "123",
    "appointment": {
        "date": "2024-12-01",
        "time": "10:00",
        "vet_name": "Dr. Jane Doe"
    }
}
```
**Python Example for Sending Request**
```
import requests

# Microservice endpoint
url = "http://localhost:5000/send-notification"

# Request payload
data = {
    "user_id": "123",
    "appointment": {
        "date": "2024-12-01",
        "time": "10:00",
        "vet_name": "Dr. Jane Doe"
    }
}

# Send POST request
response = requests.post(url, json=data)

#Print the response
print(response.json())
```
#
**How to Programmatically Receive Data**

The microservice will respond with structured JSON data indicating the result of the request. The response will be one of the following formats:


**Successful Response**

If the request is valid, the response will include:
- status: "success"
- message: A confirmation message.
- appointment_details: Echoes the appointment details sent in the request.

**Example Success Response**

{
    "status": "success",
    "message": "Notification sent successfully",
    "appointment_details": {
        "date": "2024-12-01",
        "time": "10:00",
        "vet_name": "Dr. Jane Doe"
    }
}

**Error Response**

If the request is invalid, the response will include:
- status: "error"
- message: A description of the error.

**Example Error Response**

{
    "status": "error",
    "message": "Invalid user_id format"
}

**Example Response Handling in Python**

The following Python code demonstrates how to handle the response:

response = requests.post(url, json=data)

#Check response status

if response.status_code == 200:
    
    # Success
    
    print("Success Response:", response.json())

else:
    
    # Error
    
    print("Error Response:", response.json())

**UML Sequence Diagram**

Below is a UML sequence diagram that explains how requesting and receiving data works between the test program and the microservice:

+------------------+           +-------------------+
|  Test Program    |           |    Microservice   |
+------------------+           +-------------------+
        |                              |
        |  POST /send-notification     |
        |----------------------------->|
        |                              |
        | Validate request data        |
        |------------------------------|
        |                              |
        |  If valid, process request   |
        |  If invalid, return error    |
        |------------------------------|
        |                              |
        |    Response JSON data        |
        |<-----------------------------|
        |                              |

**Notes**

**- Starting the Microservice:**
  - Ensure the microservice is running at http://localhost:5000 before making requests. Start it by running:
    python app.py

**- Validation Rules:**
  - user_id must be numeric.
  - date must follow the YYYY-MM-DD format.
  - time must follow the HH:MM 24-hour format.
  - vet_name can only contain letters, spaces, periods, hyphens, and apostrophes.

**- Error Handling:**
  - Always check for errors in the response and handle them appropriately in your code.


