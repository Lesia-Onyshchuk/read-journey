import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import { useEffect } from "react";
import { getCurrentUser } from "./redux/auth/operations.js";

export default function PrivateRoute() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser());
    }
  }, [token, dispatch]);

  if (!token) {
    return <Navigate to="/register" replace />;
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
