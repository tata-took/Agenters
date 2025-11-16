import { spawnSync } from 'node:child_process';
import { rm, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { copyDir } from './utils/fs.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const buildDir = path.join(projectRoot, 'build');

await rm(buildDir, { recursive: true, force: true });
await mkdir(buildDir, { recursive: true });

const result = spawnSync('tsc', { stdio: 'inherit', cwd: projectRoot });
if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

await copyDir(path.join(projectRoot, 'public'), buildDir);
await copyDir(path.join(projectRoot, 'config'), path.join(buildDir, 'config'));
await copyDir(path.join(projectRoot, 'data'), path.join(buildDir, 'data'));

console.log('build 完了');
