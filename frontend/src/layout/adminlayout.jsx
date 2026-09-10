import { Outlet, useNavigate } from "react-router-dom";
import "../component/pages/Admin.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("selectedTour");
    navigate("/");
  };

  return (
    <div className="admin-layout">
      <div className="admin-header">
        <h2>Heritage Tours Admin Panel</h2>

        <button
          type="button"
          className="admin-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <Outlet />
    </div>
  );
}
