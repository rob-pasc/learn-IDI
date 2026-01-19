import { useContext } from "react";
import Button from "../../../ui/Button";
import { ThemeContext } from "../../../../App";
import styles from "./ThemeToggle.module.css"; 

export default function ThemeToggle() {
  const { theme, setTheme, themes } = useContext(ThemeContext);

  return (
    <div className={styles.container} role="group" aria-label="Theme selector">
      {themes.map((t) => (
        <Button
          key={t.id}
          variant="icon"
          active={t.id === theme}
          onClick={() => setTheme(t.id)}
          title={t.label}
          aria-label={t.label}
        >
          {t.Icon ? <t.Icon /> : "🎨"}
        </Button>
      ))}
    </div>
  );
}