import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Proxy in vite config will handle this
});

export default api;
