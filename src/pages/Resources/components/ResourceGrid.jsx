import styles from "./ResourceGrid.module.css";
import ResourceCard from "./ResourceCard";

export default function ResourceGrid({ resources, categoryLabelsDE, activeCategory, activeTags }) {
  if (!resources || resources.length === 0) {
    return (
      <div className={styles.empty}>
        Keine Ressourcen passen zu den aktuellen Filtern.
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {resources.map((r) => (
        <ResourceCard
          key={r.id}
          resource={r}
          categoryLabelsDE={categoryLabelsDE}
          activeCategory={activeCategory}
          activeTags={activeTags}
        />
      ))}
    </div>
  );
}
