// ============================================================================
// AegisOS: AI-Native Agentic Enterprise Operating System
// Full-Stack Node.js Production Server & API Gateway
// Compatible with Render, Docker, Kubernetes, and Local Execution
// ============================================================================

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const { handleApiRequest } = require('./api/routes');
require('./database/db'); // Initialize DB & Schema

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// MIME types for static assets
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    const parsedUrl = new url.URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = parsedUrl.pathname;

    // 1. Route API requests
    if (pathname.startsWith('/api/')) {
        let bodyBuffer = '';
        req.on('data', chunk => {
            bodyBuffer += chunk;
        });
        req.on('end', () => {
            let body = null;
            if (bodyBuffer) {
                try {
                    body = JSON.parse(bodyBuffer);
                } catch (e) {
                    body = {};
                }
            }
            handleApiRequest(req, res, parsedUrl, body);
        });
        return;
    }

    // 2. Interactive Swagger / OpenAPI Documentation at /docs
    if (pathname === '/docs' || pathname === '/api/docs') {
        const swaggerHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AegisOS Enterprise API & MCP Explorer</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.9.0/swagger-ui.css">
    <style>
        body { margin: 0; background: #0b0f17; }
        .swagger-ui { filter: invert(88%) hue-rotate(180deg); }
        .swagger-ui .topbar { display: none; }
    </style>
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.9.0/swagger-ui-bundle.js"></script>
    <script>
        SwaggerUIBundle({
            url: '/api/openapi.json',
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [SwaggerUIBundle.presets.apis],
            layout: "BaseLayout"
        });
    </script>
</body>
</html>`;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(swaggerHtml);
        return;
    }

    // 3. Serve Static Files from public directory
    let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
    
    // Check if file exists, else fallback to index.html (SPA routing)
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            filePath = path.join(PUBLIC_DIR, 'index.html');
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        fs.readFile(filePath, (readErr, content) => {
            if (readErr) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error: Failed to read asset');
                return;
            }
            res.writeHead(200, {
                'Content-Type': contentType,
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            });
            res.end(content);
        });
    });
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\n[AegisOS] Notice: Port ${PORT} is already in use by another running process.`);
        console.log(`🌐 If AegisOS is already running, access it directly at: http://localhost:${PORT}`);
        console.log(`💡 To free port ${PORT} in PowerShell, run:\n   Stop-Process -Id (Get-NetTCPConnection -LocalPort ${PORT}).OwningProcess -Force\n`);
        process.exit(1);
    } else {
        console.error('[AegisOS Server Error]', err);
        process.exit(1);
    }
});

server.listen(PORT, () => {
    console.log('================================================================');
    console.log('⚡ AegisOS: AI-Native Agentic Enterprise Operating System Live');
    console.log(`🌐 Local Web Portal:      http://localhost:${PORT}`);
    console.log(`📚 OpenAPI 3.1 Spec:      http://localhost:${PORT}/api/openapi.json`);
    console.log(`📖 Interactive API Docs:  http://localhost:${PORT}/docs`);
    console.log(`🤖 Model Context Protocol: http://localhost:${PORT}/api/mcp/tools`);
    console.log('================================================================');
});
