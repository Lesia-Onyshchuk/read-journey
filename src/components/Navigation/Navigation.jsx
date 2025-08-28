import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <div className={css.navBox}>
      <NavLink className={buildLinkClass} to="/recommended">
        Home
      </NavLink>
      <NavLink className={buildLinkClass} to="/library">
        My library
      </NavLink>
    </div>
  );
};

export default Navigation;
