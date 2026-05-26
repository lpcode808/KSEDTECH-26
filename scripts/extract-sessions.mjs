import fs from "node:fs";

const sourcePath = "scraped/sessions.html";
const outputPath = "scraped/sessions.json";

const html = fs.readFileSync(sourcePath, "utf8");
const tableMatch = html.match(/<table[^>]*id=["']tablepress-11["'][\s\S]*?<\/table>/i);

if (!tableMatch) {
  throw new Error(`Could not find TablePress sessions table in ${sourcePath}`);
}

const tableHtml = tableMatch[0];
const rowMatches = [...tableHtml.matchAll(/<tr\b[^>]*class=["'][^"']*row-(\d+)[^"']*["'][^>]*>([\s\S]*?)<\/tr>/gi)]
  .filter(([, rowNumber]) => Number(rowNumber) > 1);

const decodeEntities = (value) => value
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
  .replace(/&nbsp;/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'")
  .replace(/&rsquo;/g, "’")
  .replace(/&lsquo;/g, "‘")
  .replace(/&rdquo;/g, "”")
  .replace(/&ldquo;/g, "“")
  .replace(/&ndash;/g, "–")
  .replace(/&mdash;/g, "—");

const htmlToLines = (value) => decodeEntities(value
  .replace(/<br\s*\/?>/gi, "\n")
  .replace(/<\/p>/gi, "\n")
  .replace(/<img\b[^>]*>/gi, "")
  .replace(/<[^>]+>/g, "")
  .replace(/\r/g, ""))
  .split("\n")
  .map((line) => line.replace(/\s+/g, " ").trim())
  .filter(Boolean);

const slugify = (value) => value
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const sessions = rowMatches.map(([, rowNumber, rowHtml]) => {
  const cells = [...rowHtml.matchAll(/<td\b[^>]*class=["'][^"']*column-(\d+)[^"']*["'][^>]*>([\s\S]*?)<\/td>/gi)]
    .sort((a, b) => Number(a[1]) - Number(b[1]))
    .map((match) => match[2]);

  const presenterLines = htmlToLines(cells[0] || "");
  const strandLines = htmlToLines(cells[1] || "");
  const titleMatch = (cells[2] || "").match(/<strong>([\s\S]*?)<\/strong>/i);
  const title = titleMatch ? htmlToLines(titleMatch[1]).join(" ") : "";
  const description = htmlToLines((cells[2] || "").replace(/^[\s\S]*?<\/strong>\s*<br\s*\/?>/i, "")).join(" ");
  const strands = strandLines
    .flatMap((line) => line.split(/,\s*/))
    .map((line) => line.replace(/^CONNECT:\s*/i, "").trim())
    .filter(Boolean);

  return {
    sourceRow: Number(rowNumber),
    id: `session-${String(Number(rowNumber) - 1).padStart(2, "0")}-${slugify(title).slice(0, 44)}`,
    title,
    presenters: presenterLines,
    strands,
    description,
  };
});

if (sessions.length !== 55) {
  throw new Error(`Expected 55 sessions, found ${sessions.length}`);
}

fs.writeFileSync(outputPath, `${JSON.stringify(sessions, null, 2)}\n`);
console.log(`Wrote ${sessions.length} sessions to ${outputPath}`);
