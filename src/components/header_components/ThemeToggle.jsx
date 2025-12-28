export default function ThemeToggle({ theme, setTheme, themes }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        padding: "0.35rem",
        borderRadius: 999,
        border: "1px solid var(--border)",
        background: "var(--surface)",
        boxShadow: "var(--shadow-sm)",
      }}
      role="group"
      aria-label="Theme selector"
    >
      {themes.map((t) => {
        const active = t.id === theme;

        return (
          <button
            key={t.id}
            type="button"
            aria-label={t.label}
            title={t.label}
            onClick={() => setTheme(t.id)}
            aria-pressed={active}
            style={{
              width: 38,
              height: 38,
              borderRadius: 999,
              border: active
                ? "1px solid var(--primary-soft-border)"
                : "1px solid var(--border)",
              background: active
                ? "var(--primary-soft)"
                : "transparent",
              color: "var(--text)",
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
              transition: "background 120ms ease, border-color 120ms ease",
            }}
          >
            {t.Icon ? <t.Icon /> : "🎨"}
          </button>
        );
      })}
    </div>
  );
}