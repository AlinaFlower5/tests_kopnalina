import { useUser } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { token } = useUser();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}
