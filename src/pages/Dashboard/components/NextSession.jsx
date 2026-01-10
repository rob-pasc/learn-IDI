import { useEffect, useMemo, useState } from "react";
import styles from "./NextSession.module.css";
import { timeSlotForWeekday, sessionEndDateTime, isoToday, daysUntil, formatDate } from "../../../utils/time";

export default function NextSession() {
  const [sem1, setSem1] = useState(null);
  const [sem2, setSem2] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/data/timetable_sem1.json").then((r) => r.json()),
      fetch("/data/timetable_sem2.json").then((r) => r.json()),
    ])
      .then(([a, b]) => {
        setSem1(a);
        setSem2(b);
      })
      .catch(() => setError("Nächste Einheit konnte nicht geladen werden."));
  }, []);

  const todayIso = useMemo(() => isoToday(), []);

  const next = useMemo(() => {
    if (!sem1 || !sem2) return null;

    const all = [...(sem1.events ?? []), ...(sem2.events ?? [])]
      .filter((e) => isRelevantEvent(e))
      .sort((a, b) => a.date.localeCompare(b.date));

    const now = new Date();

    for (const e of all) {
      // Exams: treat as "whole day" (still show if date is today or later)
      if (e.kind !== "session") {
        if (e.date >= todayIso) return e;
        continue;
      }

      // Sessions: use end-time to decide if it's still upcoming
      const end = sessionEndDateTime(e);
      if (!end) {
        // fallback: if we can't compute time, keep old behavior
        if (e.date >= todayIso) return e;
        continue;
      }

      // If session hasn't ended yet, it's still the next one
      if (end.getTime() > now.getTime()) return e;
    }

    return null;
  }, [sem1, sem2, todayIso]);


  if (error) {
    return <div className={styles.notice}>{error}</div>;
  }

  if (!sem1 || !sem2) {
    return <div className={styles.notice}>Lade nächste Einheit…</div>;
  }

  if (!next) {
    return (
      <section className={styles.card}>
        <header className={styles.header}>
          <div>
            <h2 className={styles.h2}>Nächste Einheit</h2>
            <p className={styles.subtle}>Keine zukünftigen Einträge gefunden.</p>
          </div>
        </header>
      </section>
    );
  }

  const badge = kindBadge(next.kind);
  const when = formatDate(next.date);
  const isToday = next.date === todayIso;
  const slot = next.kind === "session" ? timeSlotForWeekday(next.weekday) : null;

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.h2}>Nächste Einheit</h2>
          <p className={styles.subtle}>
            Schnelle Übersicht • basiert auf deinem Timetable
          </p>
        </div>

        <span className={`${styles.kindBadge} ${badge.className}`}>
          {badge.label}
        </span>
      </header>

      <div className={styles.body}>
        <div className={styles.topLine}>
          <div className={styles.titleWrap}>
            <div className={styles.title}>{next.title}</div>

                <div className={styles.meta}>
                <span className={styles.metaPill}>
                    {isToday ? "⏱️ Heute" : "📅 " + when}
                </span>

                {slot ? <span className={styles.metaPill}>⏰ {slot}</span> : null}

                <span className={styles.metaPillMuted}>
                    {next.weekday ?? "—"}
                </span>

                {next.location ? (
                    <span className={styles.metaPill}>
                    {locationIcon(next.location)} {next.location}
                    </span>
                ) : (
                    <span className={styles.metaPillMuted}>Ort: —</span>
                )}
                </div>

          </div>

          <div className={styles.rightCol}>
            <div className={styles.countdownLabel}>In</div>
            <div className={styles.countdownValue}>
              {isToday ? "0 Tagen (also heute)" : daysUntil(todayIso, next.date)}
            </div>
          </div>
        </div>

        <div className={styles.tagsRow}>
          {(next.tags ?? []).slice(0, 6).map((t) => (
            <span key={t} className={styles.tag}>
              #{t}
            </span>
          ))}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => {
              const el = document.getElementById("timetable");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            Zum Timetable ↓
          </button>

          <button
            type="button"
            className={styles.btnGhost}
            onClick={() => {
              navigator.clipboard?.writeText(summaryLine(next));
            }}
            title="Zusammenfassung kopieren"
          >
            Copy Summary
          </button>
        </div>
      </div>
    </section>
  );
}

function isRelevantEvent(e) {
  // show sessions + exams; hide holidays/breaks in "next session"
  return e?.kind === "session" || e?.kind === "exam";
}

function kindBadge(kind) {
  switch (kind) {
    case "exam":
      return { label: "Prüfung", className: styles.badgeWarning };
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

function summaryLine(e) {
  const date = formatDate(e.date);
  const loc = e.location ? ` • ${e.location}` : "";
  return `${e.title} • ${date} (${e.weekday ?? "—"})${loc}`;
}
