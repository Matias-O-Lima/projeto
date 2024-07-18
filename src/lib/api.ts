import axios from 'axios';

const API_URL = process.env.API_URL || 'https://fraternidade-api-production.up.railway.app';

const api = axios.create({
  baseURL: API_URL
});

export default api;
