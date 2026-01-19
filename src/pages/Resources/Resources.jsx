import { useEffect, useMemo, useState } from "react";
import styles from "./Resources.module.css";
import FilterBar from "./components/FilterBar";
import ResourceGrid from "./components/ResourceGrid";

const CATEGORY_LABELS_DE = {
  all: "Alle",
  general: "Allgemein",
  web: "Web",
  sql: "Relationale DB",
  csharp: "Programmieren (C#/.NET)",
  nosql: "Nicht-relationale DB",
  tools: "Tools",
};

export default function ResourcesPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const [showLoading, setShowLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTags, setActiveTags] = useState(new Set());


  useEffect(() => {
    fetch("/data/resources.json")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load resources.json");
        return r.json();
      })
      .then((json) => setData(json))
      .catch(() => setError("Ressourcen konnten nicht geladen werden."));
  }, []);

  useEffect(() => {
    // wait 200ms before showing loading text
    let timer;
    if (!data) {
      timer = setTimeout(() => setShowLoading(true), 200);
    }
    return () => clearTimeout(timer);
  }, [data]);


  const resources = useMemo(() => {
    const list = Array.isArray(data?.resources) ? data.resources : Array.isArray(data) ? data : [];
    return list;
  }, [data]);

  const categories = useMemo(() => {
    // we show: "all" + any categories found in data (sorted)
    const set = new Set(resources.map((r) => r.category).filter(Boolean));
    const arr = Array.from(set).sort();
    return ["all", ...arr];
  }, [resources]);

  const allTags = useMemo(() => {
    const set = new Set();
    for (const r of resources) {
      for (const t of r.tags ?? []) set.add(String(t));
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [resources]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return resources
      .filter((r) => {
        // category
        if (activeCategory !== "all" && r.category !== activeCategory) return false;

        // tags (multi-select AND: resource must include all selected tags)
        if (activeTags.size > 0) {
          const rt = new Set((r.tags ?? []).map(String));
          for (const t of activeTags) {
            if (!rt.has(t)) return false;
          }
        }

        // search
        if (!q) return true;
        const hay = [
          r.title,
          r.note,
          r.url,
          ...(r.tags ?? []),
          r.category,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return hay.includes(q);
      })
      // Sorting: pinned first, then title
      .sort((a, b) => {
        const ap = !!a.pinned;
        const bp = !!b.pinned;
        if (ap !== bp) return ap ? -1 : 1;
        return String(a.title ?? "").localeCompare(String(b.title ?? ""));
      });
  }, [resources, query, activeCategory, activeTags]);

  const pinned = useMemo(() => filtered.filter((r) => r.pinned), [filtered]);
  const rest = useMemo(() => filtered.filter((r) => !r.pinned), [filtered]);


  function toggleTag(tag) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  function clearFilters() {
    setQuery("");
    setActiveCategory("all");
    setActiveTags(new Set());
  }


  if (error) {
    return <div className={styles.notice}>{error}</div>;
  }

  if (!data) {
    return showLoading ? <div className={styles.notice}>Lade Ressourcen…</div> : null;
  }

  
  return (
    <div className="u-container">
      <main className={styles.page}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.h1}>Ressourcen</h1>
            <p className={styles.subtle}>
              Praktische externe Ressourcen, die beim Lernen helfen. Suche, filtere nach Kategorie oder Tags.
            </p>
          </div>
        </header>

        <FilterBar
          query={query}
          setQuery={setQuery}
          categories={categories}
          categoryLabelsDE={CATEGORY_LABELS_DE}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          allTags={allTags}
          activeTags={activeTags}
          toggleTag={toggleTag}
          clearFilters={clearFilters}
          resultsCount={filtered.length}
        />

        {pinned.length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionTitle}>Besonders nützlich</div>
            <ResourceGrid
              resources={pinned}
              categoryLabelsDE={CATEGORY_LABELS_DE}
              activeCategory={activeCategory}
              activeTags={activeTags}
            />
          </section>
        )}

        <section className={styles.section}>
          <div className={styles.sectionTitle}>Alle Ressourcen</div>
          <ResourceGrid
            resources={rest}
            categoryLabelsDE={CATEGORY_LABELS_DE}
            activeCategory={activeCategory}
            activeTags={activeTags}
          />
        </section>
      </main>
    </div>
  );
}
