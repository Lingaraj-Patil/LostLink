import axios from 'axios';

const API = axios.create({ baseURL: 'https://lost-link-323.vercel.app/' });

// Lost Items
export const fetchLostItems = () => API.get('/lost');
export const createLostItem = (formData) =>
  API.post('/lost', formData, { headers: { "Content-Type": "multipart/form-data" } });

// Found Items
export const fetchFoundItems = () => API.get('/found');
export const createFoundItem = (formData) =>
  API.post('/found', formData, { headers: { "Content-Type": "multipart/form-data" } });
