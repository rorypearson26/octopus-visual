import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export function handleAuthentication(token: string) {
  localStorage.setItem("authToken", token);
}

export function getAuthToken() {
  return localStorage.getItem("authToken");
}

export function isAuthenticated() {
  return !!getAuthToken();
}

export function clearAuthentication() {
  localStorage.removeItem("authToken");
}

export default api;
