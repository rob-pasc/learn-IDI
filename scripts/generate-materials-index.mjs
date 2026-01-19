import { promises as fs } from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const DOWNLOADS_DIR = path.join(PUBLIC_DIR, "downloads");
const OUT_DIR = path.join(PUBLIC_DIR, "data");
const OUT_FILE = path.join(OUT_DIR, "materials.index.json");

const COURSE_CONFIG = {
  web: { semester: 1, labelDE: "Web", order: 1 },
  rdb: { semester: 1, labelDE: "Relationale DB", order: 2 },
  prog: { semester: 2, labelDE: "Programmieren (.NET/C#)", order: 3 },
  nosql: { semester: 2, labelDE: "Nicht-relationale DB", order: 4 },
};

const ALLOWED_EXT = new Set([".zip", ".md", ".pdf", ".sql"]);

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "") // remove extension if present
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 120);
}

function toWebPath(absPath) {
  // Convert absolute path under /public into a web path starting with "/"
  const rel = path.relative(PUBLIC_DIR, absPath);
  return "/" + rel.split(path.sep).join("/");
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function readDirSafe(dir) {
  try {
    return await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

async function main() {
  const generatedAt = new Date().toISOString();

  const courses = Object.entries(COURSE_CONFIG)
    .map(([courseId, meta]) => ({
      id: courseId,
      semester: meta.semester,
      labelDE: meta.labelDE,
      order: meta.order,
      path: `/downloads/${courseId}`,
    }))
    .sort((a, b) => a.order - b.order);

  const items = [];

  for (const courseId of Object.keys(COURSE_CONFIG)) {
    const courseDir = path.join(DOWNLOADS_DIR, courseId);
    const entries = await readDirSafe(courseDir);

    // Collect files in this course dir 
    const files = [];
    for (const ent of entries) {
      if (!ent.isFile()) continue;

      const ext = path.extname(ent.name).toLowerCase();
      if (!ALLOWED_EXT.has(ext)) continue;

      const abs = path.join(courseDir, ent.name);
      const stat = await fs.stat(abs);

      files.push({
        name: ent.name,
        ext,
        abs,
        mtimeMs: stat.mtimeMs,
      });
    }

    // Pair md + pdf when same basename exists
    const byBase = new Map(); // base -> { md?, pdf?, sql?, zip? }
    for (const f of files) {
      const base = f.name.slice(0, -f.ext.length);
      if (!byBase.has(base)) byBase.set(base, {});
      byBase.get(base)[f.ext] = f;
    }

    const { semester } = COURSE_CONFIG[courseId];

    for (const [base, bundle] of byBase.entries()) {
      // If md exists: create md item (with optional pdf)
      if (bundle[".md"]) {
        const md = bundle[".md"];
        const pdf = bundle[".pdf"];

        items.push({
          id: `${courseId}-${slugify(base)}`,
          courseId,
          semester,
          type: "md",
          title: md.name, // keep original filename
          paths: {
            main: toWebPath(md.abs),
            ...(pdf ? { pdf: toWebPath(pdf.abs) } : {}),
          },
          tags: [courseId, `sem${semester}`, "md", ...(pdf ? ["pdf"] : [])],
          mtimeMs: md.mtimeMs,
        });
      } else if (bundle[".pdf"]) {
        // pdf without md: still index it as pdf-only (rare, but safe)
        const pdf = bundle[".pdf"];
        items.push({
          id: `${courseId}-${slugify(base)}-pdf`,
          courseId,
          semester,
          type: "pdf",
          title: pdf.name,
          paths: { main: toWebPath(pdf.abs) },
          tags: [courseId, `sem${semester}`, "pdf"],
          mtimeMs: pdf.mtimeMs,
        });
      }

      // SQL item
      if (bundle[".sql"]) {
        const sql = bundle[".sql"];
        items.push({
          id: `${courseId}-${slugify(base)}-sql`,
          courseId,
          semester,
          type: "sql",
          title: sql.name,
          paths: { main: toWebPath(sql.abs) },
          tags: [courseId, `sem${semester}`, "sql"],
          mtimeMs: sql.mtimeMs,
        });
      }

      // ZIP item
      if (bundle[".zip"]) {
        const zip = bundle[".zip"];
        items.push({
          id: `${courseId}-${slugify(base)}-zip`,
          courseId,
          semester,
          type: "zip",
          title: zip.name,
          paths: { main: toWebPath(zip.abs) },
          tags: [courseId, `sem${semester}`, "zip"],
          mtimeMs: zip.mtimeMs,
        });
      }
    }
  }

  // Sort newest first (nice default)
  items.sort((a, b) => (b.mtimeMs ?? 0) - (a.mtimeMs ?? 0));

  const out = {
    generatedAt,
    courses,
    items,
  };

  await ensureDir(OUT_DIR);
  await fs.writeFile(OUT_FILE, JSON.stringify(out, null, 2), "utf8");

  console.log(`[gen] wrote ${toWebPath(OUT_FILE)} with ${items.length} items`);
}

main().catch((err) => {
  console.error("[gen] failed:", err);
  process.exit(1);
});
