import { NavLink } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import Navbar from "./components/Navbar";
import styles from "./Header.module.css";

import { LearnIdiIcon } from "../../Icons.jsx";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className="u-row">
          <NavLink to="/" end>
            <LearnIdiIcon />
          </NavLink>
          <Navbar />
        </div>
      
        <ThemeToggle />
      </div>
    </header> 
  );
}