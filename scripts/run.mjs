#!/usr/bin/env node
// Loads root .env then runs: pnpm <args>
import { spawnSync } from "child_process";

const cmd = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const result = spawnSync(cmd, process.argv.slice(2), {
  stdio: "inherit",
  shell: true,
  env: process.env,
});
process.exit(result.status ?? 0);
