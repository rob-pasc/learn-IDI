import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import THEMES from "./themeData";

import "./styles/global.css";
import "./styles/themes/vscode-dark.css";
import "./styles/themes/pastel.css";
import "./styles/themes/forest.css";
import "./styles/themes/coffee.css";
import "./styles/themes/ocean.css";

// import ColorCheck from "./components/debug/ColorCheck";
import Layout from "./Layout";

function Home() { return <h1>Home</h1>; }
function Profile() { 
  return <a target="_blank" href="https://fhvorarlberg-my.sharepoint.com/:u:/g/personal/korp_fhv_at/IQBfyQ81H4j2TqJpZ4jGTPX2AaD1Xnax-70XyoYWAfu-ZmE?e=UBzBhq" download >Download</a>
}
function NotFound() { return <h1>404</h1>; }

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
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}





