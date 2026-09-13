import axios from "axios";
const API_URL =
   "https://heritagetoursapp.duckdns.org/api/tours";

export const saveBooking = async (bookingData) => {
  const response = await axios.post(API_URL, bookingData);
  return response.data;
};