import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import Appointment from './Appointment';
import PetProfiles from './PetProfiles';
import RoutineTask from './RoutineTask';
import Register from './Register';
import Login from './Login';
import MyPet from './MyPet';
import Notification from './Notification';
import axios from 'axios';
import '../styles/App.css';

const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [routineTasks, setRoutineTasks] = useState([]);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    console.log('Logged In User:', loggedInUser);
  }, [loggedInUser]);

  useEffect(() => {
    if (loggedInUser) {
      axios
        .get(`http://localhost:3003/appointments?userId=${loggedInUser.id}`)
        .then((response) => setAppointments(response.data))
        .catch((error) => console.error('Error fetching appointments:', error));
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (loggedInUser) {
      axios
        .get(`http://localhost:3004/routine-tasks?userId=${loggedInUser.id}`)
        .then((response) => setRoutineTasks(response.data))
        .catch((error) => console.error('Error fetching routine tasks:', error));
    }
  }, [loggedInUser]);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage user={loggedInUser} />} />
          <Route
            path="/appointments"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Appointment
                  user={loggedInUser}
                  setAppointments={setAppointments}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/pet-profiles"
            element={<PetProfiles user={loggedInUser} />}
          />
          <Route
            path="/routine-tasks"
            element={<RoutineTask routineTasks={routineTasks} />}
          />
          <Route
            path="/notifications"
            element={<Notification user={loggedInUser} />}
          />
          <Route
            path="/register"
            element={
              <Register
                setWelcomeMessage={setWelcomeMessage} // Pass function as prop
                setLoggedInUser={setLoggedInUser}
                setIsLoggedIn={setIsLoggedIn}
                setRegisteredUsers={setRegisteredUsers} // Pass the function as a prop
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
              registeredUsers={registeredUsers} // Pass registeredUsers as a prop
              setLoggedInUser={setLoggedInUser}
              setIsLoggedIn={setIsLoggedIn}
              setWelcomeMessage={setWelcomeMessage}
              />
            }
          />
          <Route
            path="/my-pet"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <MyPet user={loggedInUser} appointments={appointments} />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;