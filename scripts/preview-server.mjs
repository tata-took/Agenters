import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { startStaticServer } from './utils/static-server.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const buildDir = path.join(projectRoot, 'build');
const port = Number(process.env.PORT ?? 4173);

await startStaticServer({
  directories: [buildDir],
  fallback: path.join(buildDir, 'index.html'),
  port,
});

console.log('preview モードで配信中');
