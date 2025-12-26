export default function ColorCheck({
  theme,
  setTheme,
  activeThemeLabel,
  ThemeToggle,
  Swatch,
  BoltIcon,
  SparkleIcon,
  ShieldIcon,
  PaletteIcon,
}) {
  return (
    <div className="container">
      <header className="stack" style={{ marginBottom: "1.5rem" }}>
        <div
          className="row"
          style={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <div>
            <h1 style={{ margin: 0, color: "var(--text-strong)" }}>
              learn-idi.at
            </h1>
            <p style={{ margin: "0.25rem 0 0", color: "var(--muted)" }}>
              Theme preview — active: <strong>{activeThemeLabel}</strong>
            </p>
          </div>

          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>

        <hr className="hr" />
      </header>

      <main className="stack">
        {/* Card */}
        <section className="card" id="resources">
          <h2 style={{ marginTop: 0 }}>Resource Card</h2>
          <p style={{ marginTop: 0, color: "var(--text-subtle)" }}>
            Surface, borders, shadow, link color + primary soft tokens.
          </p>

          <div className="row">
            <div className="notice info" style={{ flex: "1 1 240px" }}>
              <strong>Info</strong>
              <div style={{ color: "var(--muted)", marginTop: "0.25rem" }}>
                Links use <code>--link</code> &amp; <code>--link-hover</code>.
              </div>
              <div style={{ marginTop: "0.6rem" }}>
                <a
                  href="https://learn.microsoft.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Microsoft Learn →
                </a>
              </div>
            </div>

            <div className="notice success" style={{ flex: "1 1 240px" }}>
              <strong>Success</strong>
              <div style={{ color: "var(--muted)", marginTop: "0.25rem" }}>
                Accent soft background + border via derived tokens.
              </div>
            </div>

            <div className="notice warn" style={{ flex: "1 1 240px" }}>
              <strong>Warning</strong>
              <div style={{ color: "var(--muted)", marginTop: "0.25rem" }}>
                Warning soft background for “exam soon” vibes 😄
              </div>
            </div>
          </div>

          <div className="row" style={{ marginTop: "1rem" }}>
            <button className="btn btnPrimary">
              <BoltIcon />
              Primary Action
            </button>
            <button className="btn btnGhost">
              <SparkleIcon />
              Secondary
            </button>
            <input
              className="input"
              placeholder="Search resources…"
              style={{ maxWidth: 320 }}
            />
          </div>
        </section>

        {/* Token swatches */}
        <section className="card">
          <h2 style={{ marginTop: 0 }}>Quick Token Swatches</h2>
          <div className="row">
            <Swatch name="bg" varName="--bg" />
            <Swatch name="surface" varName="--surface" />
            <Swatch name="border" varName="--border" />
            <Swatch name="text" varName="--text" />
            <Swatch name="primary" varName="--primary" />
            <Swatch name="primary-soft" varName="--primary-soft" />
            <Swatch name="accent" varName="--accent" />
            <Swatch name="info" varName="--info" />
            <Swatch name="warning" varName="--warning" />
            <Swatch name="danger" varName="--danger" />
          </div>
        </section>

        {/* Code snippet preview */}
        <section className="card" id="snippets">
          <h2 style={{ marginTop: 0 }}>Code Snippet Preview</h2>
          <p style={{ marginTop: 0, color: "var(--muted)" }}>
            Lightweight syntax accents to preview your code area styling.
          </p>

          <pre className="code" aria-label="code preview">
            <code>
              <span className="c">// Example: simple React component</span>
              {"\n"}
              <span className="k">export default function</span>{" "}
              <span className="f">Badge</span>() {"{"}
              {"\n"}
              {"  "}
              <span className="k">return</span> {"("}
              {"\n"}
              {"    "}
              {"<"}
              <span className="t">span</span> className=
              {<span className="s">"badge"</span>}
              {">"}
              Theme: {activeThemeLabel}
              {"</"}
              <span className="t">span</span>
              {">"}
              {"\n"}
              {"  "}
              {");"}
              {"\n"}
              {"}"}
              {"\n"}
            </code>
          </pre>

          <div className="row" style={{ marginTop: "1rem" }}>
            <div className="notice danger" style={{ flex: "1 1 260px" }}>
              <strong>
                <ShieldIcon /> Edge case check
              </strong>
              <div style={{ color: "var(--muted)", marginTop: "0.25rem" }}>
                Make sure danger/warn/info are readable across surfaces.
              </div>
            </div>

            <div
              className="notice"
              style={{
                flex: "1 1 260px",
                background: "var(--primary-soft)",
                borderColor: "var(--primary-soft-border)",
              }}
            >
              <strong>
                <PaletteIcon /> Primary soft
              </strong>
              <div style={{ color: "var(--muted)", marginTop: "0.25rem" }}>
                Great for selected filters / active tabs / subtle callouts.
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer
        style={{
          marginTop: "2rem",
          color: "var(--muted)",
          fontSize: "0.9rem",
        }}
      >
        Tip: Add more themes later by defining only HEX base tokens; keep derived
        tokens consistent with OKLab mixing.
      </footer>
    </div>
  );
}