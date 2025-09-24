import axios from "axios";

export const getAllVehicles = () => {
  return axios.get(`${import.meta.env.VITE_API_ROUTES}/vehicles`);
};

export const addVehicle = (data) => {
  return axios.post(`${import.meta.env.VITE_API_ROUTES}/vehicles`, data);
};

export const getAvailableVehicles = (params) => {
  return axios.get(`${import.meta.env.VITE_API_ROUTES}/vehicles/available`, {
    params,
  });
};

export const createBooking = (data) => {
  return axios.post(`${import.meta.env.VITE_API_ROUTES}/bookings`, data);
};

export const getBookings = () => {
  return axios.get(`${import.meta.env.VITE_API_ROUTES}/bookings`);
};

export const cancelBooking = (id) => {
  return axios.delete(`${import.meta.env.VITE_API_ROUTES}/bookings/${id}`);
};
