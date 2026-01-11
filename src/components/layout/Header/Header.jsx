import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";


export default function Header({ theme, setTheme, themes }) {
  return (
    <header style={{ padding: 20, borderBottom: "1px solid #ddd" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <nav style={{ display: "flex", gap: 12 }}>
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/docs">Unterlagen</NavLink>
          <NavLink to="/resources">Ressourcen</NavLink>
        </nav>

        <div>
          <ThemeToggle theme={theme} setTheme={setTheme} themes={themes} />
        </div>
      </div>
    </header>
  );
}



