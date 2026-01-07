export default function Footer() {
  return (
    <footer style={{ padding: 20, borderTop: "1px solid #ddd" }}>
      <small>© {new Date().getFullYear()}</small>
    </footer>
  );
}
