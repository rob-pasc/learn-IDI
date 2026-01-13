import { NavLink } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import Navbar from "./components/Navbar";
import styles from "./Header.module.css";

export default function Header({ theme, setTheme, themes }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className="u-row">
          <NavLink to="/" end>
            <img src="/learn-idi.svg" alt="learn-IDI icon" height="56px" width="56px" />
          </NavLink>
          <Navbar />
        </div>
      
        <ThemeToggle theme={theme} setTheme={setTheme} themes={themes} />
      </div>
    </header> 
  );
}