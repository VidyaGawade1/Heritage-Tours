import { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
     const response = await axios.get(
  "https://heritagetoursapp.duckdns.org/api/users"
);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-users">
      <h1>Registered Users</h1>

      <div className="admin-users-table-wrap">
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Gender</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-users">
                  No registered users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td data-label="ID">{user.id}</td>
                  <td data-label="Name">{user.fullName || "Not added"}</td>
                  <td data-label="Email">{user.email || "Not added"}</td>
                  <td data-label="City">{user.city || "Not added"}</td>
                  <td data-label="Gender">{user.gender || "Not added"}</td>
                  <td data-label="Phone">{user.phone || "Not added"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
