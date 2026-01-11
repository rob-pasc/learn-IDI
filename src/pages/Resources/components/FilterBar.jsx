import styles from "./FilterBar.module.css";
import TagChip from "./TagChip";
import CategoryChip from "./CategoryChip";

export default function FilterBar({
  query,
  setQuery,
  categories,
  categoryLabelsDE,
  activeCategory,
  setActiveCategory,
  allTags,
  activeTags,
  toggleTag,
  clearFilters,
  resultsCount,
}) {
  const hasActiveFilters = query.trim() || activeCategory !== "all" || activeTags.size > 0;

  return (
    <section className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.searchWrap}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.search}
            placeholder="Suchen (Titel, Beschreibung, Tags, URL)…"
            aria-label="Ressourcen suchen"
          />
          <div className={styles.count}>{resultsCount} Treffer</div>
        </div>

        <button
          type="button"
          className={styles.clearBtn}
          onClick={clearFilters}
          disabled={!hasActiveFilters}
          title="Filter zurücksetzen"
        >
          Zurücksetzen
        </button>
      </div>

      <div className={styles.block}>
        <div className={styles.label}>Kategorien</div>
        <div className={styles.chips}>
          {categories.map((c) => (
            <CategoryChip
              key={c}
              label={categoryLabelsDE?.[c] ?? c}
              active={activeCategory === c}
              onClick={() => setActiveCategory(c)}
            />
          ))}
        </div>
      </div>

      <div className={styles.block}>
        <div className={styles.label}>Tags</div>
        <div className={styles.chips}>
          {allTags.map((t) => (
            <TagChip
              key={t}
              label={t}
              active={activeTags.has(t)}
              onClick={() => toggleTag(t)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
