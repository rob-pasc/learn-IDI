// import styles from "./ThemeToggle.module.css";

// export default function ThemeToggle({ theme, setTheme, themes }) {
//   return (
//     <div
//       className={styles.container}
//       role="group"
//       aria-label="Theme selector"
//     >
//       {themes.map((t) => {
//         const active = t.id === theme;

//         return (      /* TODO: extra Button component! */
//           <button
//             key={t.id}
//             type="button"
//             aria-label={t.label}
//             title={t.label}
//             onClick={() => setTheme(t.id)}
//             aria-pressed={active}
//             className={`${styles.button} ${active ? styles.active : ""}`}
//           >
//             {t.Icon ? <t.Icon /> : "🎨"}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

import Button from "../../../ui/Button"; // Adjust import path based on folder structure
import styles from "./ThemeToggle.module.css"; // You might still need container styles

export default function ThemeToggle({ theme, setTheme, themes }) {
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