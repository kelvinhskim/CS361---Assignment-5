import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Appointment.css';

const Appointment = ({ user, setAppointments }) => {
  const [petName, setPetName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [vetName, setVetName] = useState('');
  const [notes, setNotes] = useState(''); // New state for notes
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!petName || !appointmentDate || !appointmentTime || !vetName) {
      setMessage('All fields are required.');
      return;
    }

    try {
      // Add the appointment
      const response = await axios.post('http://localhost:3003/appointments', {
        userId: user.id,
        petName,
        appointmentDate,
        appointmentTime,
        vetName,
        notes, // Include notes in the request
      });
      console.log('Appointment added:', response.data);
      
      setMessage('Appointment added successfully!');
      setAppointments((prev) => [...prev, response.data.appointment]);

      // Trigger a notification
      await axios.post('http://localhost:3001/notifications', {
        user_id: user.id,
        message: `Reminder: Appointment with ${vetName} for ${petName} on ${appointmentDate} at ${appointmentTime}. Purpose: ${notes || 'Not specified'}.`,
        date: appointmentDate,
      });

      console.log('Notification created successfully!');

      // Clear form fields
      setPetName('');
      setAppointmentDate('');
      setAppointmentTime('');
      setVetName('');
      setNotes(''); // Clear notes field
    } catch (error) {
      setMessage('Failed to add appointment or notification.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="appointment-container">
      <h2>Add an Appointment</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pet Name:</label>
          <input
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Appointment Date:</label>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Appointment Time:</label>
          <input
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Vet Name:</label>
          <input
            type="text"
            value={vetName}
            onChange={(e) => setVetName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Purpose of Visit (Notes):</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="E.g., Vaccination, Check-up, etc."
          />
        </div>
        <button type="submit">Add Appointment</button>
      </form>
    </div>
  );
};

export default Appointment;
