"""
This module contains functions for creating and managing pet profiles.
"""

from data_store import pets


def create_pet_profile(owner_email, pet_name, breed, age, weight):
    """
    Creates a pet profile under a specific owner's email.

    Parameters:
        - owner_email (str): Email of the pet owner.
        - pet_name (str): Name of the pet.
        - breed (str): Breed of the pet.
        - age (str): Age of the pet.
        - weight (str): Weight of the pet.

    Returns:
        - str: Confirmation message on successful pet profile creation or error if profile exists.
    """
    # Ensure the owner has a pets list in the data store
    if owner_email not in pets:
        pets[owner_email] = []

    pet_profile = {
        'name': pet_name,
        'breed': breed,
        'age': age,
        'weight': weight
    }
    pets[owner_email].append(pet_profile)
    return f"Pet profile for {pet_name} created successfully."


def get_pet_profile(owner_email, pet_name):
    """
    Retrieves a specific pet profile by name for a given owner.

    Parameters:
        - owner_email (str): Email of the pet owner.
        - pet_name (str): Name of the pet.

    Returns:
        - dict or None: Returns the pet profile dictionary if found, otherwise None.
    """
    # Check if owner has pets
    if owner_email not in pets:
        return None

    # Search for the pet by name
    for pet in pets[owner_email]:
        if pet['name'] == pet_name:
            return pet

    return None
