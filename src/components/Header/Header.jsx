// import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations.js";
// import { Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import css from "./Header.module.css";
import Navigation from "../Navigation/Navigation.jsx";

export default function Header() {
  // const [open, setOpen] = useState(false);
  const username = useSelector((state) => state.auth.user?.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("username", username);

  const firstLetter = username ? username.charAt(0) : "";

  const handleLogout = async () => {
    const res = await dispatch(logout());
    if (res.error) {
      toast.error(res.payload);
    } else {
      toast.success("Logged out!");
      navigate("/login");
    }
  };

  // const navItems = [
  //   { path: "/recommended", label: "Recommended" },
  //   { path: "/library", label: "My Library" },
  // ];

  return (
    <header className={css.headerBox}>
      <NavLink to="/recommended">
        <img
          src="../../../public/assets/images/logo.png"
          alt="READ JOURNEY"
          className={css.img}
        />
      </NavLink>

      <Navigation />

      <div className={css.userBox}>
        <div className={css.userInfo}>
          <p className={css.firstLetter}>{firstLetter}</p>
          <p>{username}</p>
        </div>
        <button onClick={handleLogout} className={css.logoutBtn}>
          Log out
        </button>
      </div>
    </header>
  );
}
