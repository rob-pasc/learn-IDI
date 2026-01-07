import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./styles/global.css";
import "./styles/themes/vscode-dark.css";
import "./styles/themes/pastel.css";
import "./styles/themes/forest.css";
import "./styles/themes/coffee.css";
import "./styles/themes/ocean.css";

// import ColorCheck from "./components/debug/ColorCheck";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Docs from "./pages/Docs";
import NotFound from "./pages/NotFound";

import { SunIcon, MoonStarsIcon, LeafIcon, CoffeeIcon, WaveIcon } from "./components/Icons";


const THEMES = [
  { id: "pastel", label: "Pastel (Light)", Icon: SunIcon },
  { id: "vscode-dark", label: "VS Code-like (Dark)", Icon: MoonStarsIcon },
  { id: "forest", label: "Forest", Icon: LeafIcon },
  { id: "coffee", label: "Coffee", Icon: CoffeeIcon },
  { id: "ocean", label: "Ocean", Icon: WaveIcon },
];

export default function App() {
  const [theme, setTheme] = useState("vscode-dark");

  // load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved && THEMES.some((t) => t.id === saved)) {
      setTheme(saved);
    } else {
      setTheme("vscode-dark");  // default
    }
  }, []);

  // apply + persist
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // const activeThemeLabel = useMemo(
  //   () => THEMES.find((t) => t.id === theme)?.label ?? theme,
  //   [theme]
  // );

  return (
    <Routes>
      <Route element={<Layout theme={theme} setTheme={setTheme} themes={THEMES} />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}





