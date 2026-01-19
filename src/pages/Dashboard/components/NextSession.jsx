import { useEffect, useMemo, useState } from "react";
import Button from "../../../components/ui/Button";
import styles from "./NextSession.module.css";
import { 
  timeSlotForWeekday, 
  sessionEndDateTime, 
  isoToday, 
  formatDate,
  relativeUntilEvent
} from "../../../utils/time";

export default function NextSession() {
  const [sem1, setSem1] = useState(null);
  const [sem2, setSem2] = useState(null);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);


  // auto-hide toast after 2 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

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
      // Sessions: compare against end time (skip if already over)
      if (e.kind === "session") {
        const end = sessionEndDateTime(e);

        // fallback: date-only if we can't compute
        if (!end) {
          if (e.date > todayIso) return e;
          if (e.date === todayIso) return e; // keep old behavior in fallback
          continue;
        }

        if (end.getTime() > now.getTime()) return e;
        continue;
      }

      // Exams: date-only (show if today or later)
      if (e.date >= todayIso) return e;
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
            Schnellübersicht
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

                {renderLocationPills(next.location, styles)}
              </div>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.countdownValue}>
              {relativeUntilEvent(next)}
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
          <Button
            variant="primary"
            onClick={() => {
              const el = document.getElementById("timetable");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            Zum Timetable ↓
          </Button>

          <Button
            variant="ghost"
            onClick={() => {
              navigator.clipboard?.writeText(summaryLine(next));
              setShowToast(true);
            }}
            title="Zusammenfassung kopieren"
          >
            Zusammenfassung
          </Button>
        </div>
      </div>

      {showToast && (
        <div className={styles.toast} role="status">
          <span className={styles.checkIcon}>✓</span>
          In die Zwischenablage kopiert
        </div>
      )}
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

function summaryLine(e) {
  const date = formatDate(e.date);
  const loc = e.location ? ` • ${e.location}` : "";
  return `${e.title} • ${date} (${e.weekday ?? "—"})${loc}`;
}

function renderLocationPills(location, styles) {
  if (!location) return <span className={styles.metaPillMuted}>Ort: —</span>;

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