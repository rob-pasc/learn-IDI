import styles from "./MaterialsGrid.module.css";
import MaterialCard from "./MaterialCard";

export default function MaterialsGrid({ items, onPreview }) {
  if (!items || items.length === 0) {
    return (
      <div className={styles.empty}>
        Keine Dateien gefunden. (Tipp: Filter zurücksetzen)
      </div>
    );
  }

  return (
    <section className={styles.grid}>
      {items.map((it) => (
        <MaterialCard key={it.id} item={it} onPreview={onPreview} />
      ))}
    </section>
  );
}
