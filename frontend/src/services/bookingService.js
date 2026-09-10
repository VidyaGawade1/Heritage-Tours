import axios from "axios";

const API_URL = "http://localhost:8088/api/bookings";

export const saveBooking = async (bookingData) => {
  const response = await axios.post(API_URL, bookingData);
  return response.data;
};