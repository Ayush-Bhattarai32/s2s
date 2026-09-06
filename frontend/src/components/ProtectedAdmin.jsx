import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedAdmin({ children }) {
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setChecking(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/admin/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          localStorage.removeItem("adminToken");
          setAuthorized(false);
          setChecking(false);
          return;
        }

        setAuthorized(true);
        setChecking(false);
      })
      .catch((error) => {
        console.error("Token verification error:", error);
        setAuthorized(false);
        setChecking(false);
      });
  }, []);

  if (checking) {
    return <div>Checking admin access...</div>;
  }

  if (!authorized) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default ProtectedAdmin;