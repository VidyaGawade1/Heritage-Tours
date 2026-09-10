import { Navigate } from "react-router-dom";
import "../css/Profile.css";

const getStoredJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export default function Profile() {
  const user = getStoredJson("loggedInUser", null);
  const bookings = getStoredJson("userBookings", []);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="profile-page">
      <section className="profile-hero">
        <div className="profile-avatar">
          {(user.fullName || user.email || "U").charAt(0).toUpperCase()}
        </div>

        <div>
          <p>Welcome Back</p>
          <h1>{user.fullName || "Traveller"}</h1>
          <span>{user.email}</span>
        </div>
      </section>

      <section className="profile-section">
        <div className="profile-heading">
          <div>
            <p>Your Account</p>
            <h2>Personal Information</h2>
          </div>
        </div>

        <div className="profile-info-card">
          <div>
            <span>Full Name</span>
            <strong>{user.fullName || "Not added"}</strong>
          </div>

          <div>
            <span>Email</span>
            <strong>{user.email || "Not added"}</strong>
          </div>

          <div>
            <span>Phone</span>
            <strong>{user.phone || "Not added"}</strong>
          </div>

          <div>
            <span>Age</span>
            <strong>{user.age || "Not added"}</strong>
          </div>

          <div>
            <span>Gender</span>
            <strong>{user.gender || "Not added"}</strong>
          </div>

          <div>
            <span>Address</span>
            <strong>{user.address || "Not added"}</strong>
          </div>

          <div>
            <span>City</span>
            <strong>{user.city || "Not added"}</strong>
          </div>

          <div>
            <span>State</span>
            <strong>{user.state || "Not added"}</strong>
          </div>

          <div>
            <span>Pincode</span>
            <strong>{user.pincode || "Not added"}</strong>
          </div>
        </div>
      </section>

      <section className="profile-section">
        <div className="profile-heading">
          <div>
            <p>Your Trips</p>
            <h2>Booking Details</h2>
          </div>

          <span>{bookings.length} bookings</span>
        </div>

        {bookings.length === 0 ? (
          <div className="profile-empty">No booking details added yet.</div>
        ) : (
          <div className="profile-bookings">
            {bookings.map((booking) => (
              <article className="profile-booking-card" key={booking.id}>
                <div>
                  <span>Destination</span>
                  <strong>{booking.destination}</strong>
                </div>

                <div>
                  <span>Name</span>
                  <strong>{booking.fullName}</strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>{booking.email}</strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>{booking.phone}</strong>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
