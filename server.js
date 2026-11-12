/**
 * Local Zero-Config Server for Helena Hathor (@helenahathorastrology444)
 * The Natal Crucible PWA + Ephemeris API Suite
 * Serves http://localhost:3355
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const natalHandler = require('./api/natal.js');
const transitsHandler = require('./api/transits.js');
const dailyHandler = require('./api/daily.js');
const numbersHandler = require('./api/numbers.js');
const cronHandler = require('./api/cron-midnight.js');

const PORT = process.env.PORT || 3355;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon'
};

function parseBody(req) {
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', chunk => { raw += chunk; });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve(raw);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = u.pathname;

  if (pathname.startsWith('/api/')) {
    if (req.method === 'POST') req.body = await parseBody(req);
    if (pathname === '/api/natal') return natalHandler(req, res);
    if (pathname === '/api/transits') return transitsHandler(req, res);
    if (pathname === '/api/daily') return dailyHandler(req, res);
    if (pathname === '/api/numbers') return numbersHandler(req, res);
    if (pathname === '/api/cron-midnight') return cronHandler(req, res);
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Unknown API route' }));
  }

  let relPath = pathname === '/' ? '/index.html' : pathname;
  const safePath = path.normalize(path.join(PUBLIC_DIR, relPath));
  if (!safePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(safePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (e2, idxData) => {
        if (e2) {
          res.writeHead(404);
          return res.end('Not Found');
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(idxData);
      });
      return;
    }
    const ext = path.extname(safePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n🔬✦ Helena Hathor (@helenahathorastrology444) · The Natal Crucible PWA live at:`);
  console.log(`   👉 http://localhost:${PORT}\n`);
});
