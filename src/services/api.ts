import axios from 'axios';
import router from '@/router';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
        localStorage.removeItem('jwt');
        localStorage.removeItem('roles')
        await router.push({ name: 'Login' });
      }

    return Promise.reject(error);
  }
);

export default api;
