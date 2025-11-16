import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { startStaticServer } from './utils/static-server.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const port = Number(process.env.PORT ?? 5173);

const tsc = spawn('tsc', ['-w', '--preserveWatchOutput'], {
  stdio: 'inherit',
  cwd: projectRoot,
});

const server = await startStaticServer({
  directories: [
    path.join(projectRoot, 'public'),
    path.join(projectRoot, 'build'),
    path.join(projectRoot, 'config'),
    path.join(projectRoot, 'data'),
  ],
  fallback: path.join(projectRoot, 'public', 'index.html'),
  port,
});

const shutdown = () => {
  server.close(() => {
    process.exit(0);
  });
  tsc.kill('SIGINT');
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

console.log('TypeScript watchを開始しました');
