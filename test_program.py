import requests
import json
import sys

# Define the microservice endpoint
BASE_URL = 'http://localhost:5000/send-notification'

def test_valid_request():
    """
    Sends a valid request to the microservice and prints the response.
    """
    try:
        valid_data = {
            "user_id": "123",  # Changed to numeric user_id to match validation requirements
            "appointment": {
                "date": "2024-12-01",  # Future date
                "time": "10:00",       # Valid 24-hour format time
                "vet_name": "Dr. Jane Doe"  # Valid vet_name
            }
        }
        print("Testing valid request...")
        response = requests.post(BASE_URL, json=valid_data, timeout=5)
        if response.status_code == 200:
            print(f"Status Code: {response.status_code}")
            print("Response:", response.json())
        else:
            print(f"Error: Received status code {response.status_code}")
            print("Response:", response.json())
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the server. Is it running?")
    except requests.exceptions.Timeout:
        print("Error: Request timed out")
    except requests.exceptions.RequestException as e:
        print(f"Error making request: {e}")
    except json.JSONDecodeError:
        print("Error: Received invalid JSON response")

def test_server_connection():
    """
    Tests if the server is running and accessible.
    """
    try:
        print("Testing server connection...")
        response = requests.get(BASE_URL.replace('/send-notification', '/'), timeout=5)
        if response.status_code == 200:
            print("Server is running!")
            return True
        else:
            print(f"Server returned status code: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the server. Is it running?")
        return False
    except requests.exceptions.RequestException as e:
        print(f"Server connection error: {e}")
        return False

if __name__ == "__main__":
    print("Starting test program...")
    
    # First check if server is running
    if not test_server_connection():
        print("Exiting due to server connection failure")
        sys.exit(1)
    
    print("\nRunning tests...")
    test_valid_request()
    