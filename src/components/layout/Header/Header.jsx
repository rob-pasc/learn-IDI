import ThemeToggle from "./components/ThemeToggle";
import Navbar from "./components/Navbar";
import styles from "./Header.module.css";

export default function Header({ theme, setTheme, themes }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className="u-row">
          <a href="/">
            <img src="/public/learn-idi_header.svg" alt="" height="52px" width="52px" />
          </a>
          <Navbar />
        </div>
      
        <ThemeToggle theme={theme} setTheme={setTheme} themes={themes} />
      </div>
    </header> 
  );
}



