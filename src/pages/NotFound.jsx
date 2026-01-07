import React from "react";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <svg
        className={styles.svg}
        viewBox="0 0 260 220"
        width="260"
        height="220"
        role="img"
        aria-label="404 Not Found"
      >
        {/* background halo */}
        <g className="nf-halo">
          <circle cx="130" cy="105" r="78" />
        </g>

        {/* floating ghost */}
        <g className="nf-float">
          {/* body */}
          <path
            className="nf-body"
            d="M130 28
               c-34 0-62 28-62 62
               v64
               c0 10 8 18 18 18
               c9 0 15-6 20-12
               c4 6 11 12 20 12
               c9 0 16-6 20-12
               c4 6 11 12 20 12
               c10 0 18-8 18-18
               v-64
               c0-34-28-62-62-62z"
          />

          {/* wavy bottom */}
          {/* <path
            className="nf-wave"
            d="M68 154
               c7 10 15 18 24 18
               c9 0 15-6 20-12
               c4 6 11 12 20 12
               c9 0 16-6 20-12
               c4 6 11 12 20 12
               c9 0 17-8 24-18"
            fill="none"
          /> */}

          {/* eyes */}
          <g className="nf-eyes">
            <circle className="nf-eye" cx="108" cy="98" r="8" />
            <circle className="nf-eye" cx="152" cy="98" r="8" />
            {/* blush */}
            <ellipse className="nf-blush" cx="92" cy="116" rx="10" ry="6" />
            <ellipse className="nf-blush" cx="168" cy="116" rx="10" ry="6" />
          </g>

          {/* tiny mouth */}
          <path
            className="nf-mouth"
            d="M122 122
               q8 8 16 0"
            fill="none"
          />

          {/* 404 text */}
          <g className="nf-text">
            <text x="130" y="206" textAnchor="middle">
              404 — Not Found
            </text>
          </g>
        </g>
      </svg>

      <div className={styles.msg}>
        <h1>Seite nicht gefunden</h1>
        <p>Bitte überprüfen Sie die URL oder navigieren Sie zurück zur Hauptseite.</p>
      </div>
    </div>
  );
}
