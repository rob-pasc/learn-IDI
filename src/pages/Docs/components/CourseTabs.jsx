import styles from "./CourseTabs.module.css";

export default function CourseTabs({
  courses,
  activeCourseId,
  setActiveCourseId,
  courseItemsMap,
}) {
  return (
    <section className={styles.card}>
      <div className={styles.row}>
        {courses.map((c) => {
          const count = (courseItemsMap.get(c.id) ?? []).length;
          const disabled = count === 0;
          const active = c.id === activeCourseId;

          return (
            <button
              key={c.id}
              type="button"
              className={`${styles.tab} ${active ? styles.active : ""} ${
                disabled ? styles.disabled : ""
              }`}
              onClick={() => {
                if (!disabled) setActiveCourseId(c.id);
              }}
              disabled={disabled}
              title={disabled ? "Noch keine Unterlagen" : c.labelDE}
            >
              <div className={styles.top}>
                <span className={styles.label}>{c.labelDE}</span>
                <span className={styles.badge}>Sem{c.semester}</span>
              </div>

              <div className={styles.bottom}>
                {disabled ? (
                  <span className={styles.comingSoon}>Coming soon</span>
                ) : (
                  <span className={styles.count}>{count} Dateien</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
