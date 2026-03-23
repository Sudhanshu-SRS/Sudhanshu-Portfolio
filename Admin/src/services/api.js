import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 🔥 ONLY THIS IS NEEDED
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔥 ONLY refresh if NOT login/verify route
    const isAuthRoute = originalRequest.url.includes("/admin/login") ||
                        originalRequest.url.includes("/admin/verify-otp");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${BASE_URL}/admin/refresh-token`,
          {},
          { withCredentials: true }
        );

        return api(originalRequest);

      } catch (refreshError) {
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;