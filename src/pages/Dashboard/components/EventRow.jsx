import styles from "./EventRow.module.css";
import { timeSlotForWeekday, formatDate } from "../../../utils/time";

export default function EventRow({ e, isToday = false }) {
  const badge = kindBadge(e.kind, styles);
  const slot = e.kind === "session" ? timeSlotForWeekday(e.weekday) : null;

  return (
    <article
      className={`${styles.row} ${isToday ? styles.todayEvent : ""}`}
      data-row={isToday ? "today" : undefined}
    >
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


function kindBadge(kind, styles) {
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
