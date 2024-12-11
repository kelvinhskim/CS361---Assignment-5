import axios from 'axios';

const API_URL = 'http://localhost:3003/api/v1/appointments';

export const fetchAppointments = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
