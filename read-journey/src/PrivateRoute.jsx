import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { token } = useSelector((s) => s.auth);

  if (!token) {
    return <Navigate to="/register" replace />;
  }

  return <Outlet />;
}
