import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Crucial for sending HTTP-only cookies
});

// Response Interceptor for auto-refreshing tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If not authorized and we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh token using the http-only refresh cookie
        await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/refresh-token`, 
          {}, 
          { withCredentials: true }
        );
        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, they must log in again
        window.location.href = '/login'; 
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
