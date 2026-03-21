import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../services/api";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    api.get("/admin/me")
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return isAuth ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;