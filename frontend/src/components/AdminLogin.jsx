
import { useState } from "react";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Invalid username or password.");
        return;
      }

     
localStorage.setItem("adminToken", data.token);
window.location.href = "/admin/dashboard";


    } catch (error) {
      console.error("Login error:", error);
      setMessage(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

return (
  <section className="admin-login-section">
    <div className="admin-login-card">

      <div className="admin-login-header">
        <div className="admin-login-icon">
          <i className="fas fa-user-shield"></i>
        </div>

        <h1>Admin Login</h1>

        <p>
          Login to access the S2S Admin Dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit} className="admin-login-form">

        <div className="admin-login-group">
          <label htmlFor="adminUsername">
            Username
          </label>

          <div className="admin-input-wrapper">
            <i className="fas fa-user"></i>

            <input
              id="adminUsername"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
        </div>

        <div className="admin-login-group">
          <label htmlFor="adminPassword">
            Password
          </label>

          <div className="admin-input-wrapper">
            <i className="fas fa-lock"></i>

            <input
              id="adminPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="admin-login-button"
          disabled={loading}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Logging in...
            </>
          ) : (
            <>
              <i className="fas fa-sign-in-alt"></i>
              Login
            </>
          )}
        </button>

        {message && (
          <p className="admin-login-message">
            <i className="fas fa-exclamation-circle"></i>
            {message}
          </p>
        )}

      </form>

      <div className="admin-login-footer">
        <i className="fas fa-lock"></i>
        Secure Admin Access
      </div>

    </div>
  </section>
);


}

export default AdminLogin;
