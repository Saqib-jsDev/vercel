import axios from 'axios';
// export const baseURL= `${import.meta.env.BASE_URL_FOR_CRA}`

const api = axios.create({
  baseURL:"/",
  timeout: 5000,
});
export default api;