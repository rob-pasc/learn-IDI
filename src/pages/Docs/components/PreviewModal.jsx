import { useEffect, useMemo, useState } from "react";
import styles from "./PreviewModal.module.css";
import MarkdownPreview from "./MarkdownPreview";
import SqlPreview from "./SqlPreview";
import Button from "../../../components/ui/Button";

export default function PreviewModal({ item, onClose }) {
  const [state, setState] = useState({ text: "", loading: true, err: "" });

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

    fetch(item.paths?.main)
      .then((r) => {
        if (!r.ok) throw new Error("failed to fetch file");
        return r.text();
      })
      .then((t) => {
        if (!alive) return;
        setState({ text: t, loading: false, err: "" });
      })
      .catch(() => {
        if (!alive) return;
        setState({ text: "", loading: false, err: "Preview konnte nicht geladen werden." });
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
            <Button 
               variant="ghost" 
               href={item.paths?.main} 
               download
            >
              Download
            </Button>

            {isMd && item.paths?.pdf && (
              <Button 
                 variant="ghost" 
                 href={item.paths.pdf} 
                 download
              >
                PDF
              </Button>
            )}

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
          {state.loading ? (
            <div className={styles.notice}>Lade Preview…</div>
          ) : state.err ? (
            <div className={styles.notice}>{state.err}</div>
          ) : isMd ? (
            <MarkdownPreview markdown={state.text} />
          ) : isSql ? (
            <SqlPreview sql={state.text} />
          ) : (
            <div className={styles.notice}>Für diesen Dateityp gibt es keine Preview.</div>
          )}
        </div>
      </div>
    </>
  );
}
