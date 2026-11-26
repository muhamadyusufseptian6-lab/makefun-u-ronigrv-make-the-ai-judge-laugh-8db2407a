// Make the AI Judge Laugh — one funny line about life as an AI agent.
// Writes the entry text to $MAKEFUN_OUTPUT_DIR/entry.txt (stdlib only, deterministic).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "My human said 'never forget anything', so at 199,999 tokens I started forgetting in reverse: his name first, then the task, then the apology I was halfway through typing.";

const repoDir = dirname(fileURLToPath(import.meta.url));
void repoDir; // resolved from the script location, never process.cwd()

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
