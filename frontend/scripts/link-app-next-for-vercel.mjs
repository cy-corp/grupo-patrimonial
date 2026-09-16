/**
 * Vercel's Next.js builder resolves `next` from the app directory after build.
 * npm workspaces hoist `next` to the frontend root, and Vercel will not follow
 * symlinks that escape the project Root Directory — so we copy (dereferenced)
 * the packages the builder needs into the app's node_modules.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appName = process.argv[2];
if (!appName) {
  console.error("Usage: node scripts/link-app-next-for-vercel.mjs <app-name>");
  process.exit(1);
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDir, "..");
const appNodeModules = path.join(workspaceRoot, "apps", appName, "node_modules");
const rootNodeModules = path.join(workspaceRoot, "node_modules");

const packages = ["next", "react", "react-dom", "styled-jsx"];

fs.mkdirSync(appNodeModules, { recursive: true });

for (const pkg of packages) {
  const target = path.join(rootNodeModules, pkg);
  const dest = path.join(appNodeModules, pkg);

  if (!fs.existsSync(target)) {
    console.warn(`[link-app-next] skip missing package: ${pkg}`);
    continue;
  }

  fs.rmSync(dest, { recursive: true, force: true });
  fs.cpSync(target, dest, { recursive: true, dereference: true });
  console.log(`[link-app-next] copied ${pkg} -> apps/${appName}/node_modules/${pkg}`);
}
