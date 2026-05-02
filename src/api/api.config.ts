import axios from "axios";

export const apiAuth = axios.create({
  baseURL: "http://localhost:8000/api/auth/services",
  timeout: 3000,
});

export const apiResources = axios.create({
  baseURL: "http://localhost:8001/api/resources",
  timeout: 3000,
});
