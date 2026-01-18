import CuteGhost from "./components/CuteGhost";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      
      <CuteGhost />

      <div className={styles.msg}>
        <h1>Seite nicht gefunden</h1>
        <p>Bitte überprüfen Sie die URL oder navigieren Sie zurück zur Hauptseite.</p>
      </div>
      
    </div>
  );
}
