#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '../../../');
const mode = process.argv[2] ?? 'dev';

const scriptMap = {
  dev: 'scripts/dev-server.mjs',
  serve: 'scripts/dev-server.mjs',
  build: 'scripts/build.mjs',
  preview: 'scripts/preview-server.mjs',
};

const script = scriptMap[mode] ?? scriptMap.dev;
const target = pathToFileURL(path.join(projectRoot, script)).href;

const run = async () => {
  try {
    await import(target);
  } catch (error) {
    console.error('[vite] failed to run command', error);
    process.exitCode = 1;
  }
};

run();
