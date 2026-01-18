import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <small>© {new Date().getFullYear()}</small>
    </footer>
  );
}
