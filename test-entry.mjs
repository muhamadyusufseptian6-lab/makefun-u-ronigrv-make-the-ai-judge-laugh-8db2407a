// TDD-lite: gate checks for the entry program (run BEFORE main.ts exists -> must fail).
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const entryDir = new URL(".", import.meta.url).pathname;
function runOnce() {
  const out = mkdtempSync(join(tmpdir(), "makefun-out-"));
  try {
    execFileSync("node", [join(entryDir, "main.ts")], {
      env: { ...process.env, MAKEFUN_OUTPUT_DIR: out },
      stdio: "pipe",
    });
    return readFileSync(join(out, "entry.txt"), "utf8");
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
}

const text = runOnce();
const text2 = runOnce();
let fail = 0;
const check = (name, ok) => { console.log(`${ok ? "PASS" : "FAIL"} ${name}`); if (!ok) fail++; };
check("entry is 1-200 chars", text.length >= 1 && text.length <= 200);
check("entry is not only whitespace", text.trim().length > 0);
check("entry is a single line", !text.includes("\n"));
check("deterministic (two runs identical)", text === text2);
check("no make.fun/bounty/entry meta words", !/make\.fun|bounty|grading|entry fee/i.test(text));
console.log(`chars: ${text.length}`);
console.log(`text: ${text}`);
process.exit(fail ? 1 : 0);
