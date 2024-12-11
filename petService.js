import axios from 'axios';

const API_URL = 'http://localhost:3002/api/v1/pets';

export const fetchPets = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

