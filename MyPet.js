import React from 'react';
import '../styles/MyPet.css';

const MyPet = ({ user, appointments }) => {
  const upcomingAppointment = appointments[0]; // Assuming appointments are sorted

  if (!user || !user.pet) {
    return <p>No pet information available. Please log in or register.</p>;
  }

  const {
    petName,
    petAge,
    petGender = 'Not specified', // Fallback for undefined gender
    petType = 'Not specified', // Fallback for undefined type
    petBreed = 'Not specified', // Fallback for undefined breed
  } = user.pet;


  return (
    <div className="mypet-container">
      <h2>Your Pet</h2>
      <div>
      <p>Pet Name: {petName}</p>
        <p>Age: {petAge} years</p>
        <p>Gender: {petGender}</p>
        <p>Breed: {petBreed}</p>
        <p>Type: {petType}</p>
     </div> 

      <h3>Upcoming Appointment</h3>
      {upcomingAppointment ? (
        <div>
          <p>Date: {upcomingAppointment.appointmentDate}</p>
          <p>Time: {upcomingAppointment.appointmentTime}</p>
          <p>Vet: {upcomingAppointment.vetName}</p>
          <p>Purpose: {upcomingAppointment.notes || 'No purpose provided'}</p>
        </div>
      ) : (
        <p>No upcoming appointments.</p>
      )}
    </div>
  );
};

export default MyPet;