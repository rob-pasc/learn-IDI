import styles from "./CategoryChip.module.css";

export default function CategoryChip({ label, active, onClick, displayOnly = false }) {
  return (
    <button
      type="button"
      className={`${styles.chip} ${active ? styles.active : ""} ${displayOnly ? styles.displayOnly : ""}`}
      onClick={onClick}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
