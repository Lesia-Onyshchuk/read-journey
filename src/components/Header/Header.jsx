import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations.js";
import { Menu, X } from "lucide-react";
import toast from "react-hot-toast";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await dispatch(logout());
    if (res.error) {
      toast.error(res.payload);
    } else {
      toast.success("Logged out!");
      navigate("/login");
    }
  };

  const navItems = [
    { path: "/recommended", label: "Recommended" },
    { path: "/library", label: "My Library" },
  ];

  return (
    <header className="w-full shadow-md bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/recommended" className="text-xl font-bold text-blue-600">
          📚 ReadJourney
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `hover:text-blue-600 ${
                  isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User bar (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <span className="text-gray-700">👤 {user?.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Log out
          </button>
        </div>

        {/* Burger menu button (mobile) */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden bg-gray-100 px-4 py-3 flex flex-col gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `hover:text-blue-600 ${
                  isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <div className="flex items-center justify-between mt-4">
            <span className="text-gray-700">👤 {user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
