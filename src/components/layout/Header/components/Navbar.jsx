import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" end>Dashboard</NavLink>
      <NavLink to="/docs">Unterlagen</NavLink>
      <NavLink to="/resources">Ressourcen</NavLink>
    </nav>
  );  
}