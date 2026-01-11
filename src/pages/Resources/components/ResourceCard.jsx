import styles from "./ResourceCard.module.css";
import CategoryChip from "./CategoryChip";
import TagChip from "./TagChip";

export default function ResourceCard({ resource, categoryLabelsDE, activeCategory, activeTags }) {
  const { title, icon, note, url, category, tags } = resource;

  const displayUrl = prettifyUrl(url);

  return (
    <a
      className={styles.card}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
    >
      <div className={styles.top}>
        <div className={styles.iconWrap} aria-hidden="true">
          {icon ? (
            <img className={styles.icon} src={icon} alt="" loading="lazy" />
          ) : (
            <div className={styles.iconFallback}>🔗</div>
          )}
        </div>

        <div className={styles.headerText}>
          <div className={styles.title}>{title}</div>
          <div className={styles.note}>{note}</div>
        </div>
      </div>

      <div className={styles.urlRow}>
        <span className={styles.urlLabel}>Link:</span>
        <span className={styles.url}>{displayUrl}</span>
        <span className={styles.openHint}>↗</span>
      </div>

      <div className={styles.chips}>
        <CategoryChip
          label={categoryLabelsDE?.[category] ?? category}
          active={activeCategory !== "all" && activeCategory === category}
          onClick={(e) => e.preventDefault()}
          displayOnly
        />

        {(tags ?? []).slice(0, 6).map((t) => (
          <TagChip
            key={t}
            label={t}
            active={activeTags?.has?.(t)}
            onClick={(e) => e.preventDefault()}
            displayOnly
          />
        ))}
      </div>
    </a>
  );
}

function prettifyUrl(url) {
  try {
    const u = new URL(url);
    const path = u.pathname === "/" ? "" : u.pathname;
    const shortPath = path.length > 26 ? path.slice(0, 26) + "…" : path;
    return `${u.hostname}${shortPath}`;
  } catch {
    return url;
  }
}
