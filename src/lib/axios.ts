import axios, { AxiosError, AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // This ensures cookies are sent with every request
});

api.interceptors.request.use(
  config => {
    // Token is automatically handled by httpOnly cookies
    // No need to manually add Authorization header
    return config;
  },
  error => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // Clear any stored user data
        localStorage.removeItem("user");
        // Use router.push instead of window.location.href to avoid chunk loading issues
        // This will be handled by the component that uses this interceptor
        console.warn("Unauthorized access detected. Please login again.");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
