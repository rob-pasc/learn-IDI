import Button from "../../../components/ui/Button";
import styles from "./MaterialsToolbar.module.css";

export default function MaterialsToolbar({
  course,
  query,
  setQuery,
  typeFilters,
  toggleType,
  countsByType,
  sortBy,
  setSortBy,
  clearFilters,
  resultsCount,
}) {
  const hasFilters =
    query.trim() || typeFilters.size > 0 || sortBy !== "newest";

  return (
    <section className={styles.card}>
      <div className={styles.topRow}>
        <div>
          <div className={styles.titleLine}>
            <span className={styles.title}>{course?.labelDE ?? "—"}</span>
            <span className={styles.miniBadge}>{resultsCount} Treffer</span>
          </div>
          <div className={styles.subtle}>
            Suche & filtere nach Dateityp.
          </div>
        </div>

        <Button
          variant="ghost"
          onClick={clearFilters}
          disabled={!hasFilters}
        >
          Zurücksetzen
        </Button>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <input
            className={styles.search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suchen (Dateiname)…"
            aria-label="Unterlagen suchen"
          />
        </div>

        <div className={styles.typeRow} aria-label="Dateityp Filter">
          <Button 
            variant="chip" 
            active={typeFilters.has("md")} 
            onClick={() => toggleType("md")}
          >
            MD ({countsByType.md ?? 0})
          </Button>

          <Button 
            variant="chip" 
            active={typeFilters.has("sql")} 
            onClick={() => toggleType("sql")}
          >
            SQL ({countsByType.sql ?? 0})
          </Button>

          <Button 
            variant="chip" 
            active={typeFilters.has("zip")} 
            onClick={() => toggleType("zip")}
          >
            ZIP ({countsByType.zip ?? 0})
          </Button>

          <Button 
            variant="chip" 
            active={typeFilters.has("pdf")} 
            onClick={() => toggleType("pdf")}
          >
            PDF ({countsByType.pdf ?? 0})
          </Button>

        </div>

        <div className={styles.sortWrap}>
          <label className={styles.sortLabel} htmlFor="sort">
            Sortierung
          </label>
          <select
            id="sort"
            className={styles.select}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Neueste zuerst</option>
            <option value="oldest">Älteste zuerst</option>
            <option value="az">A–Z</option>
          </select>
        </div>
      </div>
    </section>
  );
}
