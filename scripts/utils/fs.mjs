import { mkdir, readdir, stat, copyFile } from 'node:fs/promises';
import path from 'node:path';

export const copyDir = async (src, dest) => {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      await copyFile(srcPath, destPath);
    } else if (entry.isSymbolicLink()) {
      const target = await stat(srcPath);
      if (target.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await copyFile(srcPath, destPath);
      }
    }
  }
};
