import axios from 'axios';

const API_URL = 'http://localhost:3004/api/v1/tasks';

export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


