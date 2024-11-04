"""
This module provides functionality for scheduling vet appointments for pets.
"""

from data_store import add_appointment


def schedule_appointment(owner_email, pet_name, date, time, vet_name):
    """
    Schedules a vet appointment for a specific pet.

    Parameters:
        - owner_email (str): Email of the pet owner.
        - pet_name (str): Name of the pet.
        - date (str): Date of the appointment.
        - time (str): Time of the appointment.
        - vet_name (str): Name of the vet.

    Returns:
        - str: Confirmation message for scheduled appointment.
    """
    while True:
        # Check if user email is valid
        if not owner_email:
            print("Error: User not found.")
            continue  # continue to prompt if email is missing

        # Appointment details
        appointment = {
            'pet_name': pet_name,
            'date': date,
            'time': time,
            'vet_name': vet_name
        }
        add_appointment(owner_email, appointment)
        return f"Appointment scheduled for {pet_name} on {date} at {time} with {vet_name}."
