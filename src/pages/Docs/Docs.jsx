import { useEffect, useMemo, useState } from "react";
import styles from "./Docs.module.css";

import CourseTabs from "./components/CourseTabs";
import MaterialsToolbar from "./components/MaterialsToolbar";
import MaterialsGrid from "./components/MaterialsGrid";
import PreviewModal from "./components/PreviewModal";

export default function MaterialsPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const [showLoading, setShowLoading] = useState(false);

  const [activeCourseId, setActiveCourseId] = useState(null);

  const [query, setQuery] = useState("");
  const [typeFilters, setTypeFilters] = useState(() => new Set()); // empty = all
  const [sortBy, setSortBy] = useState("newest"); // newest | oldest | az

  const [previewItem, setPreviewItem] = useState(null);

  useEffect(() => {
    fetch("/data/materials.index.json")
      .then((r) => {
        if (!r.ok) throw new Error("failed to load materials.index.json");
        return r.json();
      })
      .then((json) => setData(json))
      .catch(() => setError("Unterlagen konnten nicht geladen werden."));
  }, []);

  useEffect(() => {
    // wait 200ms before showing loading text
    let timer;
    if (!data) {
      timer = setTimeout(() => setShowLoading(true), 200);
    }
    return () => clearTimeout(timer);
  }, [data]);

  const courses = useMemo(() => {
    const list = Array.isArray(data?.courses) ? data.courses : [];
    return list;
  }, [data]);

  const items = useMemo(() => {
    const list = Array.isArray(data?.items) ? data.items : [];
    return list;
  }, [data]);

  const courseItemsMap = useMemo(() => {
    const map = new Map();
    for (const c of courses) map.set(c.id, []);
    for (const it of items) {
      if (!map.has(it.courseId)) map.set(it.courseId, []);
      map.get(it.courseId).push(it);
    }
    // keep the default sort from index (newest first), but we’ll sort again for UI anyway
    return map;
  }, [courses, items]);

  // Choose default course:
  // - first course that has items, else first course in list.
  useEffect(() => {
    if (!courses.length) return;
    if (activeCourseId && courses.some((c) => c.id === activeCourseId)) return;

    const firstWithItems =
      courses.find((c) => (courseItemsMap.get(c.id) ?? []).length > 0) ?? courses[0];

    setActiveCourseId(firstWithItems?.id ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses.map((c) => c.id).join("|"), items.length]);

  const activeCourse = useMemo(() => {
    if (!activeCourseId) return null;
    return courses.find((c) => c.id === activeCourseId) ?? null;
  }, [courses, activeCourseId]);

  const baseList = useMemo(() => {
    if (!activeCourseId) return [];
    return courseItemsMap.get(activeCourseId) ?? [];
  }, [activeCourseId, courseItemsMap]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = baseList.filter((it) => {
      // Type filter
      if (typeFilters.size > 0) {
        const matchesType = typeFilters.has(it.type);
        // Prüfen, ob nach PDF gefiltert wird UND ob das Item ein PDF besitzt
        const matchesPdfVariant = typeFilters.has("pdf") && !!it.paths?.pdf;

        if (!matchesType && !matchesPdfVariant) return false;
      }

      // Search
      if (!q) return true;
      const hay = [it.title, it.type, ...(it.tags ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });

    // Sorting
    list = [...list].sort((a, b) => {
      if (sortBy === "az") return String(a.title ?? "").localeCompare(String(b.title ?? ""));
      if (sortBy === "oldest") return (a.mtimeMs ?? 0) - (b.mtimeMs ?? 0);
      // newest
      return (b.mtimeMs ?? 0) - (a.mtimeMs ?? 0);
    });

    return list;
  }, [baseList, query, typeFilters, sortBy]);

  const countsByType = useMemo(() => {
    const c = { md: 0, sql: 0, zip: 0, pdf: 0 };
    for (const it of baseList) {
      // 1. Zähle das Item zu seinem Haupt-Typ (z.B. 'md' oder 'sql')
      if (c[it.type] !== undefined) c[it.type] += 1;

      // 2. SPEZIALFALL: Wenn das Item nicht vom Typ 'pdf' ist, aber 
      //    trotzdem einen PDF-Pfad besitzt (z.B. Cheatsheets), 
      //    dann erhöhe auch den PDF-Zähler.
      if (it.type !== 'pdf' && it.paths?.pdf) {
        c.pdf += 1;
      }
    }
    return c;
  }, [baseList]);

  function toggleType(type) {
    setTypeFilters((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  }

  function clearFilters() {
    setQuery("");
    setTypeFilters(new Set());
    setSortBy("newest");
  }

  if (error) return <div className={styles.notice}>{error}</div>;
  
  if (!data) {
    return showLoading ? <div className={styles.notice}>Lade Dokumente...</div> : null;
  }

  return (
    <div className="u-container u-stack">
      <header className={styles.header}>
        <div>
          <h1 className={styles.h1}>Unterlagen</h1>
          <p className={styles.subtle}>
            Dateien pro Lehrveranstaltung – Preview für <code>.md</code> und{" "}
            <code>.sql</code>, Downloads für alles.
          </p>
        </div>
      </header>

      <CourseTabs
        courses={courses}
        activeCourseId={activeCourseId}
        setActiveCourseId={setActiveCourseId}
        courseItemsMap={courseItemsMap}
      />

      <MaterialsToolbar
        course={activeCourse}
        query={query}
        setQuery={setQuery}
        typeFilters={typeFilters}
        toggleType={toggleType}
        countsByType={countsByType}
        sortBy={sortBy}
        setSortBy={setSortBy}
        clearFilters={clearFilters}
        resultsCount={filtered.length}
      />

      <MaterialsGrid
        items={filtered}
        onPreview={(item) => setPreviewItem(item)}
      />

      {previewItem && (
        <PreviewModal
          item={previewItem}
          onClose={() => setPreviewItem(null)}
        />
      )}
    </div>
  );
}
