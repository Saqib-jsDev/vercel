import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3035/', // <-- change this to your backend port
  timeout: 5000,
  headers: {
        'Content-Type': 'application/json',
  },
});

export default api;