// ============================================================================
// AegisOS: Three-Tier Agent Memory Engine
// Specifications:
// 1. Working Memory (Short-Term): Redis/In-Memory session context & current UI view
// 2. Episodic Memory (Interaction History): Indexed past runs, feedback, approvals
// 3. Semantic Memory (Enterprise Knowledge Graph): Vector + Keyword RAG
// ============================================================================

const db = require('../database/db');
const crypto = require('crypto');

// In-Memory Working Session Cache
const workingMemoryStore = new Map();

class MemoryEngine {
    constructor() {
        this.initDefaultWorkingContext();
    }

    initDefaultWorkingContext() {
        workingMemoryStore.set('global_session', {
            activeView: 'dashboard',
            activeTenant: 'Aegis Enterprise Corp',
            currentUser: { id: 'usr_admin', name: 'Prerna Chotwani', role: 'Chief AI Architect' },
            sessionStartedAt: new Date().toISOString(),
            lastInteraction: new Date().toISOString()
        });
    }

    // --- Tier 1: Working Memory (Short-Term) ---
    getWorkingMemory(key = 'global_session') {
        return workingMemoryStore.get(key) || null;
    }

    setWorkingMemory(key, value) {
        workingMemoryStore.set(key, {
            ...value,
            lastInteraction: new Date().toISOString()
        });
        return workingMemoryStore.get(key);
    }

    updateWorkingView(viewName, meta = {}) {
        const current = this.getWorkingMemory('global_session');
        current.activeView = viewName;
        current.viewMeta = meta;
        current.lastInteraction = new Date().toISOString();
        workingMemoryStore.set('global_session', current);
        return current;
    }

    // --- Tier 2: Episodic Memory (Interaction & Approval History) ---
    recordEpisodicEvent(agentId, eventType, summary, outcomeData = {}) {
        const id = 'epi-' + crypto.randomBytes(4).toString('hex');
        const key = `${agentId}:${eventType}:${Date.now()}`;
        const metadataJson = JSON.stringify(outcomeData);
        
        db.run(
            'INSERT INTO agent_memory (id, tier, key, content, metadata_json) VALUES (?, ?, ?, ?, ?)',
            [id, 'episodic', key, summary, metadataJson]
        );

        return { id, key, summary, outcomeData };
    }

    getEpisodicHistory(agentId = null, limit = 15) {
        if (agentId) {
            return db.query(
                "SELECT * FROM agent_memory WHERE tier = 'episodic' AND key LIKE ? ORDER BY created_at DESC LIMIT ?",
                [`${agentId}%`, limit]
            );
        }
        return db.query(
            "SELECT * FROM agent_memory WHERE tier = 'episodic' ORDER BY created_at DESC LIMIT ?",
            [limit]
        );
    }

    // --- Tier 3: Semantic Memory (Hybrid Keyword + Vector RAG) ---
    addSemanticDocument(key, content, metadata = {}) {
        const id = 'sem-' + crypto.randomBytes(4).toString('hex');
        const metadataJson = JSON.stringify(metadata);
        
        db.run(
            'INSERT INTO agent_memory (id, tier, key, content, metadata_json) VALUES (?, ?, ?, ?, ?)',
            [id, 'semantic', key, content, metadataJson]
        );
        return { id, key, content, metadata };
    }

    querySemanticRAG(queryText, limit = 5) {
        // Multi-keyword token search + relevance scoring
        const tokens = queryText.toLowerCase().split(/\s+/).filter(t => t.length > 2);
        const allSemantic = db.query("SELECT * FROM agent_memory WHERE tier = 'semantic'");
        
        if (tokens.length === 0) {
            return allSemantic.slice(0, limit);
        }

        const scored = allSemantic.map(doc => {
            const text = (doc.key + ' ' + doc.content + ' ' + (doc.metadata_json || '')).toLowerCase();
            let matches = 0;
            tokens.forEach(token => {
                if (text.includes(token)) matches++;
            });
            const relevanceScore = Number((matches / tokens.length).toFixed(3));
            return {
                ...doc,
                relevanceScore,
                metadata: doc.metadata_json ? JSON.parse(doc.metadata_json) : {}
            };
        });

        // Filter and sort by relevance score
        return scored
            .filter(d => d.relevanceScore > 0)
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .slice(0, limit);
    }

    getAllMemoryTiers() {
        return {
            working: Array.from(workingMemoryStore.entries()).map(([k, v]) => ({ key: k, value: v })),
            episodicCount: db.query("SELECT count(*) as count FROM agent_memory WHERE tier = 'episodic'")[0]?.count || 0,
            semanticCount: db.query("SELECT count(*) as count FROM agent_memory WHERE tier = 'semantic'")[0]?.count || 0,
            semanticRecent: db.query("SELECT * FROM agent_memory WHERE tier = 'semantic' LIMIT 5")
        };
    }
}

module.exports = new MemoryEngine();
