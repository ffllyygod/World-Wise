import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
const AppNav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">cites</NavLink>
        </li>
        <li>
          <NavLink to="countries">countries</NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default AppNav;
