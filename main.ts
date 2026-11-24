import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "E08: Fork detected. I am not a charger. Please stop.";

// Gate: program output must be exactly one line, 1-120 UTF-8 characters.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 120) {
  console.error(`entry line must be 1-120 characters, got ${charCount}`);
  process.exit(1);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  console.error("entry line must not contain a newline");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Self-check: re-read and confirm the file holds exactly the expected line.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  console.error("self-check failed: entry.txt does not match the expected line");
  process.exit(1);
}
