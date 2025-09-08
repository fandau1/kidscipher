import fs from 'fs';
import path from 'path';

export function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function getAllSVGFiles(dir) {
  let files = [];
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files = files.concat(getAllSVGFiles(fullPath));
    } else if (file.endsWith('.svg')) {
      files.push(fullPath);
    }
  });
  return files;
}
