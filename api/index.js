// ============================================================================
// AegisOS: Vercel Serverless Function API Entrypoint
// Handles all /api/* requests with seamless SQLite / in-memory DB fallback
// ============================================================================

const url = require('url');
const { handleApiRequest } = require('./routes');
require('../database/db');

module.exports = (req, res) => {
    const parsedUrl = new url.URL(req.url, `https://${req.headers.host || 'localhost'}`);
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
};
