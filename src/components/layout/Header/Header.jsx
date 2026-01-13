import ThemeToggle from "./components/ThemeToggle";
import Navbar from "./components/Navbar";
import styles from "./Header.module.css";

export default function Header({ theme, setTheme, themes }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Navbar />
        <ThemeToggle theme={theme} setTheme={setTheme} themes={themes} />
      </div>
    </header>
  );
}



