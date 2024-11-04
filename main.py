"""
Main script to run the Pet Care Management App.
This program allows users to register, log in, create pet profiles, and schedule vet appointments.
"""

from datetime import datetime
import re
from user import register_user, login_user
from pet import create_pet_profile
from appointment import schedule_appointment
from data_store import get_user_pets


def main():
    while True:
        print("\nWelcome to the Pet Care Management App\n")
        print("Please select an option:")
        print("1. Register a new account")
        print("2. Login to your account")
        print("3. Exit")

        choice = input("Enter your choice (1, 2, or 3): ")

        if choice == '1':
            email = input("Enter email to register: ")
            username = input("Enter username: ")
            password = input("Enter password: ")
            print(register_user(email, username, password))

        elif choice == '2':
            email = input("Enter email to login: ")
            password = input("Enter password: ")
            login_result = login_user(email, password)

            # Check if login was successful
            if isinstance(login_result, dict):  # login_result returns user data on success
                print(f"Login successful!")
                user_dashboard(email, login_result['username'])  # Pass email and username
            else:
                print(login_result)

        elif choice == '3':
            print()
            print("Thank you for using the Pet Care Management App!")
            break
        else:
            print("Invalid choice. Please enter 1, 2, or 3.")


def register_account():
    """
    Handles user registration, ensuring password meets the required criteria.
    """
    email = input("Enter email to register: ")
    username = input("Enter username: ")

    while True:
        password = input("Enter password: ")
        result = register_user(email, username, password)
        print(result)
        if "Error" not in result:
            break


def user_dashboard(email, username):
    print(f"\nWelcome, {username}!")
    while True:
        print("\nDashboard")
        print("1. Add Pet Profile")
        print("2. Schedule Appointment")
        print("3. Logout")

        choice = input("Enter your choice (1, 2, or 3): ")

        if choice == '1':
            pet_name = input("Enter pet name: ")
            breed = input("Enter breed: ")
            age = input("Enter age: ")
            weight = input("Enter weight: ")
            print(create_pet_profile(email, pet_name, breed, age, weight))

        elif choice == '2':
            while True:
                pet_name = input("Enter pet name for the appointment: ")
                user_pets = get_user_pets(email)

                # Check if the pet name exists in the user's pets
                if not any(pet['name'] == pet_name for pet in user_pets):
                    print("Error: Pet name not found. Please re-enter the correct pet name.")
                    continue

                date = get_valid_date("Enter appointment date (YYYY-MM-DD): ")
                time = get_valid_time("Enter appointment time (HH:MM AM/PM): ")
                vet_name = input("Enter vet's name: ")
                print(schedule_appointment(email, pet_name, date, time, vet_name))
                break  # Exit loop once the appointment is scheduled successfully

        elif choice == '3':
            print("\nYou have successfully logged out. We look forward to assisting you again soon!")
            break
        else:
            print("Invalid choice. Please enter 1, 2, or 3.")


def get_valid_date(prompt):
    """
    Repeatedly prompts the user for a date until a valid date (YYYY-MM-DD) is provided.
    """
    while True:
        date_input = input(prompt)
        try:
            date = datetime.strptime(date_input, "%Y-%m-%d").date()
            if date < datetime.now().date():
                print("Error: Date cannot be in the past. Please enter a future date.")
            else:
                return date_input
        except ValueError:
            print("Invalid date format. Please enter in YYYY-MM-DD format.")


def get_valid_time(prompt):
    """
    Repeatedly prompts the user for a time until a valid time (HH:MM AM/PM) is provided.
    """
    time_format = r"(1[0-2]|0[1-9]):([0-5][0-9]) ([AP][M])"
    while True:
        time_input = input(prompt)
        if re.fullmatch(time_format, time_input):
            return time_input
        else:
            print("Invalid time format. Please enter in HH:MM AM/PM format (e.g., 10:00 AM).")


def add_pet_profile(email):
    """
    Allows user to add a new pet profile associated with their account.
    """
    pet_name = input("Enter pet name: ")
    breed = input("Enter breed: ")
    age = input("Enter age: ")
    weight = input("Enter weight: ")
    print(create_pet_profile(email, pet_name, breed, age, weight))


def schedule_appointment_prompt(email):
    """
    Prompts user to schedule a vet appointment for a specific pet.
    """
    pet_name = input("Enter pet name for the appointment: ")
    date = input("Enter appointment date (e.g., 2024-11-01): ")
    time = input("Enter appointment time (e.g., 10:00 AM): ")
    vet_name = input("Enter vet's name: ")
    print(schedule_appointment(email, pet_name, date, time, vet_name))


if __name__ == "__main__":
    main()
