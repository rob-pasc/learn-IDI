import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./TimeTable.module.css";
import { 
  timeSlotForWeekday, 
  formatDate, 
  formatMonth,
  isoToday
} from "../../../utils/time";

export default function TimeTable() {
  const [semester, setSemester] = useState("Sem1");
  const [sem1, setSem1] = useState(null);
  const [sem2, setSem2] = useState(null);
  const [error, setError] = useState("");

  // month key like "YYYY-MM"
  const [monthKey, setMonthKey] = useState(null);

  // dropdown state
  const [monthOpen, setMonthOpen] = useState(false);

  // for jump-to-today scrolling
  const listRef = useRef(null);

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

  const todayIso = useMemo(() => isoToday(), []);

  // Choose default month: current month if present, else first available.
  useEffect(() => {
    if (months.length === 0) {
      setMonthKey(null);
      setMonthOpen(false);
      return;
    }

    const todayKey = todayIso.slice(0, 7);

    // if current selection invalid or missing, set sensible default
    if (!monthKey || !months.includes(monthKey)) {
      setMonthKey(months.includes(todayKey) ? todayKey : months[0]);
    }
    // close dropdown when semester changes / data changes
    setMonthOpen(false);
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

  const showTodayMarker = useMemo(() => {
    if (!monthKey) return false;
    if (!todayIso.startsWith(monthKey)) return false;

    const hasEventToday = monthEvents.some((e) => e.date === todayIso);
    return !hasEventToday;
  }, [monthKey, monthEvents, todayIso]);

  const monthItems = useMemo(() => {
    const items = monthEvents.map((e) => ({ kind: "event", event: e }));

    if (showTodayMarker) {
      items.push({ kind: "today", date: todayIso });
    }

    items.sort((a, b) => {
      const da = a.kind === "event" ? a.event.date : a.date;
      const db = b.kind === "event" ? b.event.date : b.date;
      return da.localeCompare(db);
    });

    return items;
  }, [monthEvents, showTodayMarker, todayIso]);

  function handlePrevMonth() {
    if (monthIndex <= 0) return;
    setMonthKey(months[monthIndex - 1]);
    setMonthOpen(false);
  }

  function handleNextMonth() {
    if (monthIndex === -1 || monthIndex >= months.length - 1) return;
    setMonthKey(months[monthIndex + 1]);
    setMonthOpen(false);
  }

  function handleJumpToday() {
    if (!months.length) return;

    const todayKey = todayIso.slice(0, 7);

    // If we have today's month, go there.
    if (months.includes(todayKey)) {
      setMonthKey(todayKey);
      setMonthOpen(false);

      // after render, try to bring today row into view
      requestAnimationFrame(() => {
        const el = listRef.current?.querySelector('[data-row="today"]');
        if (el) el.scrollIntoView({ block: "center", behavior: "smooth" });
      });

      return;
    }

    // Otherwise: jump to the closest month (by string distance since format YYYY-MM is sortable)
    // Choose the first month after today if possible, else the last month before today.
    const after = months.find((m) => m > todayKey);
    setMonthKey(after ?? months[months.length - 1]);
    setMonthOpen(false);
  }

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
              Für dieses Semester sind noch keine Termine im Timetable erfasst.
            </div>
          </div>
        ) : (
          <>
            {/* Month navigation */}
            <div className={styles.monthNav}>
              <button
                type="button"
                className={styles.navBtn}
                onClick={handlePrevMonth}
                disabled={monthIndex <= 0}
                aria-label="Vorheriger Monat"
                title="Vorheriger Monat"
              >
                ←
              </button>

              <div className={styles.monthPicker}>
                <button
                  type="button"
                  className={styles.monthPillBtn}
                  onClick={() => setMonthOpen((v) => !v)}
                  aria-haspopup="listbox"
                  aria-expanded={monthOpen}
                  title="Monat auswählen"
                >
                  {monthKey ? formatMonth(monthKey) : "—"}{" "}
                  <span className={styles.caret}>▾</span>
                </button>

                {monthOpen && (
                  <div className={styles.monthDropdown} role="listbox">
                    {months.map((m) => {
                      const active = m === monthKey;
                      return (
                        <button
                          key={m}
                          type="button"
                          className={`${styles.monthOption} ${
                            active ? styles.monthOptionActive : ""
                          }`}
                          onClick={() => {
                            setMonthKey(m);
                            setMonthOpen(false);
                          }}
                          aria-selected={active}
                        >
                          {formatMonth(m)}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <button
                type="button"
                className={styles.todayBtn}
                onClick={handleJumpToday}
                title="Zum heutigen Datum springen"
              >
                Heute
              </button>

              <button
                type="button"
                className={styles.navBtn}
                onClick={handleNextMonth}
                disabled={monthIndex === -1 || monthIndex >= months.length - 1}
                aria-label="Nächster Monat"
                title="Nächster Monat"
              >
                →
              </button>
            </div>

            {/* Month content */}
            <div className={styles.list} ref={listRef}>
              {monthItems.map((it) => {
                if (it.kind === "today") {
                  return (
                    <article
                      key={`today-${it.date}`}
                      className={`${styles.row} ${styles.todayMarker}`}
                      data-row="today"
                    >
                      <div className={styles.dateCol}>
                        <div className={styles.dateMain}>{formatDate(it.date)}</div>
                        <div className={styles.dateSub}>Heute</div>
                      </div>

                      <div className={styles.mainCol}>
                        <div className={styles.titleLine}>
                          <span className={styles.title}>Heute</span>
                          <span className={`${styles.kindBadge} ${styles.badgeToday}`}>
                            Marker
                          </span>
                        </div>

                        <div className={styles.metaLine}>
                          <span className={styles.metaPill}>📌 Orientierung im Zeitplan</span>
                        </div>
                      </div>
                    </article>
                  );
                }

                const e = it.event;
                const isTodayEvent = e.date === todayIso;

                return <EventRow key={e.id} e={e} isToday={isTodayEvent} />;
              })}
            </div>
          </>
        )}
      </div>

      {/* click-away overlay for dropdown */}
      {monthOpen && (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Dropdown schließen"
          onClick={() => setMonthOpen(false)}
        />
      )}
    </section>
  );
}

function EventRow({ e, isToday = false }) {
  const badge = kindBadge(e.kind);
  const slot = e.kind === "session" ? timeSlotForWeekday(e.weekday) : null;

  return (
    <article className={`${styles.row} ${isToday ? styles.todayEvent : ""}`} data-row={isToday ? "today" : undefined}>
      <div className={styles.dateCol}>
        <div className={styles.dateMain}>{formatDate(e.date)}</div>
        <div className={styles.dateSub}>{e.weekday}</div>
      </div>

      <div className={styles.mainCol}>
        <div className={styles.titleLine}>
          <span className={styles.title}>{e.title}</span>
          <span className={`${styles.kindBadge} ${badge.className}`}>{badge.label}</span>
        </div>

        <div className={styles.metaLine}>
          {slot ? <span className={styles.metaPill}>⏰ {slot}</span> : null}

          {renderLocationPills(e.location, styles)}

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

// function locationIcon(loc) {
//   const s = loc.toLowerCase();
//   if (s.includes("hybrid")) return "🧩";
//   if (s.includes("teams") || s.includes("online")) return "🌐";
//   if (s.includes("fhv")) return "🏫";
//   return "📍";
// }

function renderLocationPills(location, styles) {
  if (!location) {
    return <span className={`${styles.metaPill} ${styles.metaPillMuted}`}>—</span>;
  }

  const s = location.toLowerCase();

  if (s.includes("hybrid")) {
    return (
      <>
        <span className={styles.metaPill}>🌐 online – MS Teams</span>
        <span className={styles.metaPill}>🏫 vor Ort – FHV</span>
      </>
    );
  }

  if (s.includes("teams") || s.includes("online")) {
    return <span className={styles.metaPill}>🌐 online – MS Teams</span>;
  }

  if (s.includes("fhv")) {
    return <span className={styles.metaPill}>🏫 vor Ort – FHV</span>;
  }

  return <span className={styles.metaPill}>📍 {location}</span>;
}
