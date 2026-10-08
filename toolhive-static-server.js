// ToolHive static server: serves the out/ static export on http://localhost:3000
// Pure Node built-ins only, no dependencies. Keep pure ASCII.
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'out');
const PORT = 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.wasm': 'application/wasm',
  '.map': 'application/json'
};

const server = http.createServer((req, res) => {
  try {
    let urlPath;
    try {
      urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    } catch (e) {
      res.writeHead(400); res.end('Bad request'); return;
    }
    let filePath = path.normalize(path.join(ROOT, urlPath));
    if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
      res.writeHead(403); res.end('Forbidden'); return;
    }
    let stat = null;
    try { stat = fs.statSync(filePath); } catch (e) { /* missing */ }
    if (stat && stat.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
      try { stat = fs.statSync(filePath); } catch (e) { stat = null; }
    }
    if (!stat) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const headers = {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'
    };
    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(res);
  } catch (err) {
    try { res.writeHead(500); res.end('Internal error'); } catch (e) { /* ignore */ }
  }
});

server.on('error', (err) => {
  console.error('[ToolHive] server error: ' + err.message);
  process.exit(1);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('[ToolHive] static server on http://localhost:3000 (root: ' + ROOT + ')');
});
