import { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

const BOOKINGS_API_URL = "http://localhost:8088/api/bookings";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = bookings.filter((booking) => {
    const searchValue = searchTerm.toLowerCase();

    return [
      booking.fullName,
      booking.email,
      booking.phone,
      booking.destination,
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchValue);
  });

  const deleteBooking = async (id) => {
    if (window.confirm("Delete this booking?")) {
      try {
        await axios.delete(`${BOOKINGS_API_URL}/${id}`);

        alert("Booking deleted successfully");

        fetchBookings();
      } catch (error) {
        console.error(error);
        alert("Failed to delete booking");
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(BOOKINGS_API_URL);
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  return (
    <div className="bookings-container">
      <h2 className="bookings-title">All Bookings</h2>

      <div className="bookings-toolbar">
        <input
          type="search"
          value={searchTerm}
          placeholder="Search bookings..."
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <div className="bookings-table-wrap">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Destination</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-bookings">
                  {searchTerm ? "No matching bookings found." : "No bookings found."}
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td data-label="Name">{booking.fullName}</td>
                  <td data-label="Email">{booking.email}</td>
                  <td data-label="Phone">{booking.phone}</td>
                  <td data-label="Destination">{booking.destination}</td>
                  <td data-label="Actions">
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => deleteBooking(booking.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bookings;
