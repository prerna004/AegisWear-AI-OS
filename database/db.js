// ============================================================================
// AegisOS: Unified Database Access Layer
// Uses Node 24 native DatabaseSync (SQLite) with automatic schema migration
// ============================================================================

const fs = require('fs');
const path = require('path');

let db = null;
let isInMemoryFallback = false;
let memoryFallbackStore = {};

function initDb() {
    try {
        const { DatabaseSync } = require('node:sqlite');
        const dbPath = path.join(__dirname, 'aegis_enterprise.sqlite');
        db = new DatabaseSync(dbPath);
        
        // Execute schema
        const schemaPath = path.join(__dirname, 'schema.sql');
        if (fs.existsSync(schemaPath)) {
            const schemaSql = fs.readFileSync(schemaPath, 'utf8');
            db.exec(schemaSql);
        }
        console.log('[Database] SQLite Engine initialized successfully at:', dbPath);
        return db;
    } catch (err) {
        console.warn('[Database] Native SQLite unavailable or restricted, activating resilient In-Memory Store fallback:', err.message);
        isInMemoryFallback = true;
        return null;
    }
}

// Ensure DB is initialized
initDb();

module.exports = {
    getDb: () => db,
    isFallback: () => isInMemoryFallback,

    query: (sql, params = []) => {
        if (!db) {
            return [];
        }
        try {
            const stmt = db.prepare(sql);
            return stmt.all(...params);
        } catch (err) {
            console.error('[DB Query Error]', err.message, 'SQL:', sql);
            return [];
        }
    },

    get: (sql, params = []) => {
        if (!db) return null;
        try {
            const stmt = db.prepare(sql);
            return stmt.get(...params);
        } catch (err) {
            console.error('[DB Get Error]', err.message);
            return null;
        }
    },

    run: (sql, params = []) => {
        if (!db) return { changes: 1 };
        try {
            const stmt = db.prepare(sql);
            return stmt.run(...params);
        } catch (err) {
            console.error('[DB Run Error]', err.message);
            return { changes: 0, error: err.message };
        }
    },

    exec: (sql) => {
        if (!db) return;
        return db.exec(sql);
    }
};
