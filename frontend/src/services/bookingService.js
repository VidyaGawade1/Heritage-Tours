import axios from "axios";
const API_URL =
  "http://heritage-backend-env.eba-ktrdzivs.us-east-1.elasticbeanstalk.com/api/bookings";

export const saveBooking = async (bookingData) => {
  const response = await axios.post(API_URL, bookingData);
  return response.data;
};