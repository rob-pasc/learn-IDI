import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

export default function Layout({ theme, setTheme, themes }) {
  return (
    <div className={styles.layout}>
      <Header theme={theme} setTheme={setTheme} themes={themes} />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
