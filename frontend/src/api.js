import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.100.16:5000',
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default api;
