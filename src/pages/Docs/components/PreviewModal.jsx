import { useEffect, useMemo, useState } from "react";
import styles from "./PreviewModal.module.css";
import MarkdownPreview from "./MarkdownPreview";
import SqlPreview from "./SqlPreview";
import Button from "../../../components/ui/Button";

export default function PreviewModal({ item, onClose }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const isMd = item.type === "md";
  const isSql = item.type === "sql";

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr("");
    setText("");

    fetch(item.paths?.main)
      .then((r) => {
        if (!r.ok) throw new Error("failed to fetch file");
        return r.text();
      })
      .then((t) => {
        if (!alive) return;
        setText(t);
        setLoading(false);
      })
      .catch(() => {
        if (!alive) return;
        setErr("Preview konnte nicht geladen werden.");
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [item]);

  const title = useMemo(() => item.title ?? "Preview", [item]);

  return (
    <>
      <button className={styles.backdrop} onClick={onClose} aria-label="Schließen" />
      <div className={styles.modal} role="dialog" aria-modal="true">
        <header className={styles.header}>
          <div className={styles.headLeft}>
            <div className={styles.kicker}>{item.courseId?.toUpperCase()} • {item.type.toUpperCase()}</div>
            <div className={styles.title} title={title}>{title}</div>
          </div>

          <div className={styles.headRight}>
            {/* <a className={styles.btnGhost} href={item.paths?.main} download>
              Download
            </a> */}
            <Button 
               variant="ghost" 
               href={item.paths?.main} 
               download
            >
              Download
            </Button>
            {/* {isMd && item.paths?.pdf && (
              <a className={styles.btnGhost} href={item.paths.pdf} download>
                PDF
              </a>
            )} */}
            {isMd && item.paths?.pdf && (
              <Button 
                 variant="ghost" 
                 href={item.paths.pdf} 
                 download
              >
                PDF
              </Button>
            )}
            {/* <button className={styles.btnClose} onClick={onClose} type="button">
              ✕
            </button> */}
            <Button 
              variant="icon" 
              onClick={onClose}
              aria-label="Schließen"
            >
              ✕
            </Button>
          </div>
        </header>

        <div className={styles.body}>
          {loading ? (
            <div className={styles.notice}>Lade Preview…</div>
          ) : err ? (
            <div className={styles.notice}>{err}</div>
          ) : isMd ? (
            <MarkdownPreview markdown={text} />
          ) : isSql ? (
            <SqlPreview sql={text} />
          ) : (
            <div className={styles.notice}>Für diesen Dateityp gibt es keine Preview.</div>
          )}
        </div>
      </div>
    </>
  );
}
