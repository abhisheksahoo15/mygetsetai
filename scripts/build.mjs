import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const nextBin = join(root, "node_modules", "next", "dist", "bin", "next");

const result = spawnSync(process.execPath, [nextBin, "build"], {
  cwd: root,
  env: {
    ...process.env,
    NEXT_DISABLE_TURBOPACK: "1",
  },
  stdio: "inherit",
});

process.exit(result.status ?? 1);
