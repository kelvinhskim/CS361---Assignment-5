"""
This module contains functions for user registration and login functionality.
"""

from data_store import add_user, get_user
import re


def register_user(email, username, password):
    """
    Registers a new user with an email, username, and password.

    Parameters:
        - email (str): The user's email address, used for login
        - username (str): The desired username for the user
        - password (str): The password chosen by the user.

    Returns:
        - str: Confirmation message or an error message if registration fails.
    """

    # Loop to allow multiple attempts until a valid password is entered
    while True:
        # Check if the email is already registered
        if get_user(email):
            return "Error: Email already registered."

        # Validate password criteria
        error_messages = []
        if len(password) < 8:
            error_messages.append("Password must be at least 8 characters.")
        if not re.search(r"[A-Z]", password):
            error_messages.append("Password must contain at least one uppercase letter.")
        if not re.search(r"[a-z]", password):
            error_messages.append("Password must contain at least one lowercase letter.")
        if not re.search(r"\d", password):
            error_messages.append("Password must contain at least one number.")

        # If there are errors, display all password requirements and prompt for re-entry
        if error_messages:
            print("Password does not meet the following requirements:")
            for message in error_messages:
                print("- " + message)
            password = input("Please re-enter a valid password: ")
        else:
            # All criteria are met; register the user
            add_user(email, username, password)
            return "User registered successfully."


def login_user(email, password):
    """
    Logs in an existing user by validating email and password.

    Parameters:
        - email (str): The user's email address.
        - password (str): The user's password.

    Returns:
        - str: Login success or failure message.
    """
    while True:
        user = get_user(email)
        if user and user['password'] == password:
            return user  # Return user dictionary on success
        return "Error: Invalid email or password."
