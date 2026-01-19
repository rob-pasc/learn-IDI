import styles from "./MaterialCard.module.css";
import { PdfIcon } from "../../../components/Icons";

export default function MaterialCard({ item, onPreview }) {
  const title = item.title ?? "—";
  const isPreviewable = item.type === "md" || item.type === "sql";
  const hasPdf = item.type === "md" && !!item.paths?.pdf;

  const meta = parseTitle(title);

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div className={`${styles.typeBadge} ${typeClass(item.type, styles)}`}>
          {item.type.toUpperCase()}
        </div>

        {meta.unit && <div className={styles.unitPill}>{meta.unit}</div>}
        {meta.dateDE && <div className={styles.datePill}>{meta.dateDE}</div>}
      </div>

      <div className={styles.title} title={title}>
        {title}
      </div>

      <div className={styles.subRow}>
        {hasPdf ? (
          <span className={styles.pdfHint}>PDF verfügbar</span>
        ) : (
          <span className={styles.hint}>
            {item.type === "zip"
              ? "Nur Download"
              : item.type === "pdf"
              ? "PDF Download"
              : "Preview & Download"}
          </span>
        )}
      </div>

      <div className={styles.actions}>
        {isPreviewable ? (
          <button
            type="button"
            className={styles.btnGhost}
            onClick={() => onPreview(item)}
          >
            Preview
          </button>
        ) : (
          <button type="button" className={styles.btnGhost} disabled>
            Preview
          </button>
        )}

        <a
          className={styles.btnPrimary}
          href={item.paths?.main}
          download
          title="Download"
        >
          Download
        </a>

        {hasPdf && (
          <a
            className={styles.btnGhost}
            href={item.paths.pdf}
            download
            title="PDF Download"
          >
            <PdfIcon />
          </a>
        )}
      </div>
    </article>
  );
}

function typeClass(type, styles) {
  switch (type) {
    case "md":
      return styles.md;
    case "sql":
      return styles.sql;
    case "zip":
      return styles.zip;
    case "pdf":
      return styles.pdf;
    default:
      return "";
  }
}

function parseTitle(filename) {
  // Example: Einheit-01_30-09-2025.zip
  const m = /Einheit-(\d+)[^0-9]*([0-3]\d)-([01]\d)-(\d{4})/i.exec(filename);
  if (!m) return { unit: null, dateDE: null };
  const unit = `Einheit ${String(Number(m[1])).padStart(2, "0")}`;
  const dateDE = `${m[2]}.${m[3]}.${m[4]}`;
  return { unit, dateDE };
}
