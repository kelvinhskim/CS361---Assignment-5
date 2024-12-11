import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/RoutineTask.css';

const RoutineTask = ({ user }) => {
  const [routineTasks, setRoutineTasks] = useState([]);

  useEffect(() => {
    const fetchRoutineTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3004/routine-tasks');
        console.log('Fetched Routine Tasks:', response.data);
        setRoutineTasks(response.data);
      } catch (error) {
        console.error('Error fetching routine tasks:', error.message);
      }
    };
  
    fetchRoutineTasks();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Converts UTC to local time for display
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3004/routine-tasks/${id}`);
      setRoutineTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      console.log(`Deleted routine task with ID: ${id}`);
    } catch (error) {
      console.error('Error deleting routine task:', error.message);
    }
  };
  
  return (
    <div className="routine-task-container">
      <h1>Routine Tasks</h1>
      {routineTasks.length === 0 ? (
        <p>No routine tasks available.</p>
      ) : (
        <div>
          {routineTasks.map((task) => (
            <div key={task._id} className="routine-task-item">
              <p>Pet Name: {task.petName}</p>
              <p>Last Appointment: {new Date(task.lastAppointmentDate).toLocaleDateString()}</p>
              <p>Next Check-Up: {new Date(task.nextCheckupDate).toLocaleDateString()}</p>
              <button onClick={() => handleDelete(task._id)} className="delete-button">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoutineTask;
