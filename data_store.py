"""
This module provides a simple in-memory data storage for users, pets, and appointments.
"""

# Dictionaries for storing data
users = {}
pets = {}
appointments = {}


def add_user(email, username, password):
    users[email] = {'username': username, 'password': password}


def get_user(email):
    return users.get(email)


def add_pet(owner_email, pet_info):
    if owner_email not in pets:
        pets[owner_email] = []
    pets[owner_email].append(pet_info)


def add_appointment(owner_email, appointment_info):
    if owner_email not in appointments:
        appointments[owner_email] = []
    appointments[owner_email].append(appointment_info)


# Add a function to retrieve pets for a user
def get_user_pets(owner_email):
    """
    Retrieve the list of pets for a specific user.
    """
    return pets.get(owner_email, [])
