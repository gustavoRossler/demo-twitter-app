import axios from "axios";

const client = axios.create({
  baseURL: 'http://localhost:3007/api'
});

// Add a request interceptor
client.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

client.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error?.response?.status === 401) {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location = "/login";
    }
  }
  return Promise.reject(error);
});

export default client;