import { createServer } from 'node:http';
import { stat, readFile } from 'node:fs/promises';
import path from 'node:path';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
};

const resolveFile = async (directories, relativePath) => {
  for (const dir of directories) {
    const filePath = path.join(dir, relativePath);
    try {
      const fileStat = await stat(filePath);
      if (fileStat.isFile()) {
        return filePath;
      }
    } catch (error) {
      // ignore
    }
  }
  return null;
};

export const startStaticServer = async ({ directories, fallback, port }) => {
  const server = createServer(async (req, res) => {
    if (!req.url) {
      res.statusCode = 400;
      res.end('Bad Request');
      return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = decodeURIComponent(url.pathname);
    const cleanPath = path.normalize(pathname).replace(/^\.\/+/, '');
    const targetPath = cleanPath === '/' ? 'index.html' : cleanPath.replace(/^\//, '');

    const filePath = await resolveFile(directories, targetPath);
    const finalPath = filePath ?? fallback;

    try {
      const buffer = await readFile(finalPath);
      const ext = path.extname(finalPath);
      res.setHeader('Content-Type', MIME_TYPES[ext] ?? 'application/octet-stream');
      res.setHeader('Cache-Control', 'no-store');
      res.writeHead(filePath ? 200 : 200);
      res.end(buffer);
    } catch (error) {
      res.statusCode = 404;
      res.end('Not Found');
    }
  });

  await new Promise((resolve) => server.listen(port, resolve));
  console.log(`ローカルサーバー: http://localhost:${port}`);
  return server;
};
