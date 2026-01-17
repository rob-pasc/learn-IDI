import { useEffect, useMemo } from "react";
import styles from "./SqlPreview.module.css";

import Prism from "prismjs";
import "prismjs/components/prism-sql";

export default function SqlPreview({ sql }) {
  const code = useMemo(() => sql ?? "", [sql]);

  useEffect(() => {
    // highlight after render
    Prism.highlightAll();
  }, [code]);

  return (
    <pre className={styles.pre}>
      <code className="language-sql">{code}</code>
    </pre>
  );
}
