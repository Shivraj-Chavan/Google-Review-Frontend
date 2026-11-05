import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

// const api = axios.create({ baseURL: 'http://69.62.84.113:5012/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('loop_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('loop_token');
      localStorage.removeItem('loop_user');
      if (!window.location.pathname.startsWith('/admin/login') && !window.location.pathname.startsWith('/review/')) {
        window.location.href = '/';
      }
    }
    return Promise.reject(err);
  }
);

export const getErrorMessage = (err) =>
  err.response?.data?.message || 'Something went wrong. Please try again.';

export default api;
