import styles from "./ThemeToggle.module.css";

export default function ThemeToggle({ theme, setTheme, themes }) {
  return (
    <div
      className={styles.container}
      role="group"
      aria-label="Theme selector"
    >
      {themes.map((t) => {
        const active = t.id === theme;

        return (      /* TODO: extra Button component! */
          <button
            key={t.id}
            type="button"
            aria-label={t.label}
            title={t.label}
            onClick={() => setTheme(t.id)}
            aria-pressed={active}
            className={`${styles.button} ${active ? styles.active : ""}`}
          >
            {t.Icon ? <t.Icon /> : "🎨"}
          </button>
        );
      })}
    </div>
  );
}
