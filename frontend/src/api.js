import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Lost Items
export const fetchLostItems = () => API.get('/lost');
export const createLostItem = (formData) =>
  API.post('/lost', formData, { headers: { "Content-Type": "multipart/form-data" } });

// Found Items
export const fetchFoundItems = () => API.get('/found');
export const createFoundItem = (formData) =>
  API.post('/found', formData, { headers: { "Content-Type": "multipart/form-data" } });
