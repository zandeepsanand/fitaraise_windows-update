// api.js
import axios from 'axios';
import {BASE_URL} from '@env';

const api = axios.create({
  baseURL: BASE_URL, // Replace with your API URL
});

// Define a function to set the token
export const setAuthToken = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};




export default api;
