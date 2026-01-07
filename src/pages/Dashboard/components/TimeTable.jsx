import { useEffect, useMemo, useState } from "react";
import styles from "./TimeTable.module.css";

export default function TimeTable() {
  const [semester, setSemester] = useState("Sem1");
  const [sem1, setSem1] = useState(null);
  const [sem2, setSem2] = useState(null);
  const [error, setError] = useState("");

  // month key like "YYYY-MM"
  const [monthKey, setMonthKey] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("/data/timetable_sem1.json").then((r) => r.json()),
      fetch("/data/timetable_sem2.json").then((r) => r.json()),
    ])
      .then(([a, b]) => {
        setSem1(a);
        setSem2(b);
      })
      .catch(() => setError("Timetable konnte nicht geladen werden."));
  }, []);

  const data = semester === "Sem1" ? sem1 : sem2;

  const eventsSorted = useMemo(() => {
    if (!data?.events) return [];
    return [...data.events].sort((x, y) => x.date.localeCompare(y.date));
  }, [data]);

  const months = useMemo(() => {
    const set = new Set();
    for (const e of eventsSorted) set.add(e.date.slice(0, 7));
    return Array.from(set).sort(); // YYYY-MM sorted
  }, [eventsSorted]);

  // Choose default month: current month if present, else first available.
  useEffect(() => {
    if (months.length === 0) {
      setMonthKey(null);
      return;
    }

    const todayKey = todayMonthKey();
    if (!monthKey || !months.includes(monthKey)) {
      setMonthKey(months.includes(todayKey) ? todayKey : months[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [semester, months.join("|")]);

  const monthIndex = useMemo(() => {
    if (!monthKey) return -1;
    return months.indexOf(monthKey);
  }, [months, monthKey]);

  const monthEvents = useMemo(() => {
    if (!monthKey) return [];
    return eventsSorted.filter((e) => e.date.startsWith(monthKey));
  }, [eventsSorted, monthKey]);

  if (error) {
    return <div className={styles.notice}>{error}</div>;
  }

  if (!sem1 || !sem2) {
    return <div className={styles.notice}>Lade Timetable…</div>;
  }

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.h2}>Timetable</h2>
          <p className={styles.subtle}>
            {data.title} • {eventsSorted.length} Einträge
          </p>
        </div>

        <div className={styles.toggle}>
          <button
            type="button"
            onClick={() => setSemester("Sem1")}
            aria-pressed={semester === "Sem1"}
            className={`${styles.toggleBtn} ${
              semester === "Sem1" ? styles.toggleBtnActive : ""
            }`}
          >
            Sem 1
          </button>
          <button
            type="button"
            onClick={() => setSemester("Sem2")}
            aria-pressed={semester === "Sem2"}
            className={`${styles.toggleBtn} ${
              semester === "Sem2" ? styles.toggleBtnActive : ""
            }`}
          >
            Sem 2
          </button>
        </div>
      </header>

      <div className={styles.body}>
        {eventsSorted.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyTitle}>Noch keine Einträge</div>
            <div className={styles.emptyText}>
              Füge Termine in <code>public/data/timetable_sem2.json</code> hinzu.
            </div>
          </div>
        ) : (
          <>
            {/* Month navigation */}
            <div className={styles.monthNav}>
              <button
                type="button"
                className={styles.navBtn}
                onClick={() => setMonthKey(months[monthIndex - 1])}
                disabled={monthIndex <= 0}
                aria-label="Vorheriger Monat"
                title="Vorheriger Monat"
              >
                ←
              </button>

              <div className={styles.monthPill} aria-label="Aktueller Monat">
                {monthKey ? formatMonth(monthKey) : "—"}
              </div>

              <button
                type="button"
                className={styles.navBtn}
                onClick={() => setMonthKey(months[monthIndex + 1])}
                disabled={monthIndex === -1 || monthIndex >= months.length - 1}
                aria-label="Nächster Monat"
                title="Nächster Monat"
              >
                →
              </button>
            </div>

            {/* Month content */}
            <div className={styles.list}>
              {monthEvents.map((e) => (
                <EventRow key={e.id} e={e} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function EventRow({ e }) {
  const badge = kindBadge(e.kind);

  return (
    <article className={styles.row}>
      <div className={styles.dateCol}>
        <div className={styles.dateMain}>{formatDate(e.date)}</div>
        <div className={styles.dateSub}>{e.weekday}</div>
      </div>

      <div className={styles.mainCol}>
        <div className={styles.titleLine}>
          <span className={styles.title}>{e.title}</span>
          <span className={`${styles.kindBadge} ${badge.className}`}>
            {badge.label}
          </span>
        </div>

        <div className={styles.metaLine}>
          {e.location ? (
            <span className={styles.metaPill}>
              {locationIcon(e.location)} {e.location}
            </span>
          ) : (
            <span className={`${styles.metaPill} ${styles.metaPillMuted}`}>
              —
            </span>
          )}

          <span className={styles.tagsWrap}>
            {(e.tags ?? []).slice(0, 4).map((t) => (
              <span key={t} className={styles.tag}>
                #{t}
              </span>
            ))}
          </span>
        </div>
      </div>
    </article>
  );
}

function kindBadge(kind) {
  switch (kind) {
    case "exam":
      return { label: "Prüfung", className: styles.badgeWarning };
    case "holiday":
      return { label: "Feiertag", className: styles.badgeInfo };
    case "break":
      return { label: "Ferien", className: styles.badgeInfoSoft };
    default:
      return { label: "Einheit", className: styles.badgePrimarySoft };
  }
}

function locationIcon(loc) {
  const s = loc.toLowerCase();
  if (s.includes("hybrid")) return "🧩";
  if (s.includes("teams") || s.includes("online")) return "🌐";
  if (s.includes("fhv")) return "🏫";
  return "📍";
}

function formatDate(iso) {
  // iso: YYYY-MM-DD
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

function formatMonth(yyyyMm) {
  const [y, m] = yyyyMm.split("-");
  const names = [
    "Jänner",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];
  const idx = Number(m) - 1;
  return `${names[idx] ?? m} ${y}`;
}

function todayMonthKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}
