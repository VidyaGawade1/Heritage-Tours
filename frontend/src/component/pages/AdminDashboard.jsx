import { Link, useNavigate } from "react-router-dom";
import "./Admin.css";

export default function AdminDashboard() {

  const navigate = useNavigate();

  return (
    <div className="admin-container">

      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="admin-cards">

        {/* Add New Tour */}
        <div className="admin-card">
          <h3>Add New Tour</h3>

          <Link to="/admin/add-tour">
            <button type="button">
              Add Tour
            </button>
          </Link>
        </div>


        {/* Manage Tours */}
        <div className="admin-card">
          <h3>Manage Tours</h3>

          <Link to="/admin/tours">
            <button type="button">
              View Tours
            </button>
          </Link>
        </div>


        {/* Bookings */}
        <div className="admin-card">
          <h3>Bookings</h3>

          <button
            type="button"
            onClick={() => navigate("/admin/bookings")}
          >
            View Bookings
          </button>
        </div>
        {/* Users */}
        <div className="admin-card">
          <h3>Users</h3>

          <button
            type="button"
            onClick={() => navigate("/admin/users")}
          >
            View Users
          </button>
        </div>

      </div>
    </div>
  );
}
