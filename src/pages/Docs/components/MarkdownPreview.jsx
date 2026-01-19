import { useMemo, useState } from "react";
import styles from "./MarkdownPreview.module.css";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownPreview({ markdown }) {
  const [mode, setMode] = useState("rendered"); // rendered | code

  const content = useMemo(() => markdown ?? "", [markdown]);

  
  return (
    <section className={styles.wrap}>
      <div className={styles.modeRow}>
        <button
          type="button"
          className={`${styles.modeBtn} ${mode === "rendered" ? styles.active : ""}`}
          onClick={() => setMode("rendered")}
        >
          Gerendert
        </button>
        <button
          type="button"
          className={`${styles.modeBtn} ${mode === "code" ? styles.active : ""}`}
          onClick={() => setMode("code")}
        >
          Code
        </button>
      </div>

      {mode === "code" ? (
        <pre className={styles.pre}>
          <code>{content}</code>
        </pre>
      ) : (
        <div className={styles.markdown}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      )}
    </section>
  );
}
