import axios, { AxiosResponse } from "axios";

const api = axios.create({
  // baseURL: "https://97de-116-58-9-130.ngrok-free.app",
  baseURL: "http://localhost:3001/",

  headers: {
    "ngrok-skip-browser-warning": true,
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && !config.headers?.skipToken) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return {
      ...response,
      success: true,
      statusCode: response.status,
    };
  },
  (error) => {
    return Promise.reject({
      statusCode: error.response?.status || 500,
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    });
  }
);

export default api;
