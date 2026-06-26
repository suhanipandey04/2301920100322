


import axios from 'axios';


const API = axios.create({ baseURL: 'http://localhost:5000/api' });


API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);


export const fetchNotifications = () => API.get('/notifications');
export const createNotification = (data) => API.post('/notifications', data);
export const markNotificationRead = (id) => API.patch(`/notifications/${id}/read`);
export const deleteNotification = (id) => API.delete(`/notifications/${id}`);

