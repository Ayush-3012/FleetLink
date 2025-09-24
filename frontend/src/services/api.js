import axios from "axios";

export const addVehicle = (data) => {
  axios.post(`${import.meta.env.VITE_API_ROUTES}/vehicles`, data);
};

export const getAvailableVehicles = (params) => {
  return axios.get(`${import.meta.env.VITE_API_ROUTES}/vehicles/available`, {
    params,
  });
};

export const createBooking = (data) => {
  axios.post(`${import.meta.env.VITE_API_ROUTES}/bookings`, data);
};
