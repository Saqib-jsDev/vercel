import axios from 'axios';
export const baseURL= 'http://127.0.0.1:3035';

const api = axios.create({
  baseURL,
  timeout: 5000,
});
export default api;