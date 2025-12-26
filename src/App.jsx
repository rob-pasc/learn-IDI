// src/App.jsx
import { useEffect, useMemo, useState } from "react";
import "./styles/global.css";
import "./styles/themes/vscode-dark.css";
import "./styles/themes/pastel.css";
import "./styles/themes/forest.css";
import "./styles/themes/coffee.css";
import "./styles/themes/ocean.css";

import ColorCheck from "./components/debug/ColorCheck";

const THEMES = [
  {
    id: "pastel",
    label: "Pastel (Light)",
    Icon: SunIcon,
  },
  {
    id: "vscode-dark",
    label: "VS Code-like (Dark)",
    Icon: MoonStarsIcon,
  },
  {
    id: "forest",
    label: "Forest",
    Icon: LeafIcon,
  },
  { 
    id: "coffee", 
    label: "Coffee", 
    Icon: CoffeeIcon 
  },
  { 
    id: "ocean", 
    label: "Ocean", 
    Icon: WaveIcon 
  }
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

  const activeThemeLabel = useMemo(
    () => THEMES.find((t) => t.id === theme)?.label ?? theme,
    [theme]
  );

  return (
    <div className="App">
      <ColorCheck
        theme={theme}
        setTheme={setTheme}
        activeThemeLabel={activeThemeLabel}
        ThemeToggle={ThemeToggle}
        Swatch={Swatch}
        BoltIcon={BoltIcon}
        SparkleIcon={SparkleIcon}
        ShieldIcon={ShieldIcon}
        PaletteIcon={PaletteIcon}
      />
    </div>
  );
}

function ThemeToggle({ theme, setTheme }) {
  return (
    <div
      className="row"
      style={{
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.35rem",
        borderRadius: 999,
        border: "1px solid var(--border)",
        background: "var(--surface)",
        boxShadow: "var(--shadow-sm)",
      }}
      role="group"
      aria-label="Theme toggle"
    >
      {THEMES.map(({ id, label, Icon }) => {
        const active = id === theme;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setTheme(id)}
            className="btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              borderRadius: 999,
              padding: "0.5rem 0.75rem",
              borderColor: active ? "var(--primary-soft-border)" : "var(--border)",
              background: active ? "var(--primary-soft)" : "transparent",
            }}
            aria-pressed={active}
            title={label}
          >
            <Icon />
            <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

function Swatch({ name, varName }) {
  return (
    <div
      style={{
        width: 160,
        borderRadius: "var(--radius)",
        border: "1px solid var(--border)",
        overflow: "hidden",
        background: "var(--surface)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div style={{ height: 56, background: `var(${varName})` }} />
      <div style={{ padding: "0.75rem" }}>
        <div style={{ fontWeight: 650 }}>{name}</div>
        <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
          {varName}
        </div>
      </div>
    </div>
  );
}

/* ---------- Tiny inline SVG icons (no libs needed) ---------- */

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 18a6 6 0 1 0 0-12a6 6 0 0 0 0 12Zm0-16v2m0 16v2M4 12H2m20 0h-2M5.64 5.64l1.41 1.41m9.9 9.9l1.41 1.41M18.36 5.64l-1.41 1.41m-9.9 9.9l-1.41 1.41"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonStarsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M21 13a8 8 0 1 1-9-9a7 7 0 0 0 9 9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 3.5l.7 1.6l1.6.7l-1.6.7l-.7 1.6l-.7-1.6l-1.6-.7l1.6-.7l.7-1.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 21c9 0 14-6 14-14V3h-4C7 3 3 8 3 15v6h2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M7 14c3-3 6-5 10-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CoffeeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 8h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M16 10h2a3 3 0 0 1 0 6h-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 3s-1 1 0 2s0 2 0 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 3s-1 1 0 2s0 2 0 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 15c2 1.5 4 1.5 6 0s4-1.5 6 0s4 1.5 6 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3 19c2 1.5 4 1.5 6 0s4-1.5 6 0s4 1.5 6 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}



function BoltIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M13 2L3 14h8l-1 8l11-14h-8l0-6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2l1.2 4.3L17.5 8l-4.3 1.2L12 13.5l-1.2-4.3L6.5 8l4.3-1.7L12 2Zm7 8l.8 2.2L22 13l-2.2.8L19 16l-.8-2.2L16 13l2.2-.8L19 10Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2l8 4v6c0 5-3.5 9.5-8 10c-4.5-.5-8-5-8-10V6l8-4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3a9 9 0 1 0 0 18h2a2 2 0 0 0 0-4h-1a2 2 0 0 1 0-4h2.5A3.5 3.5 0 0 0 12 3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="10" r="1" fill="currentColor" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
      <circle cx="16" cy="10" r="1" fill="currentColor" />
      <circle cx="9" cy="14" r="1" fill="currentColor" />
    </svg>
  );
}
