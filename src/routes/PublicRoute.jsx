import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // hook qui retourne si user est connecté

export default function PublicRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
