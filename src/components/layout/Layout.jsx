import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout({ theme, setTheme, themes }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header theme={theme} setTheme={setTheme} themes={themes} />
      <main style={{ flex: 1, padding: 20 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
