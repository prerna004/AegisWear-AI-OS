// ============================================================================
// AegisOS: Universal REST API Router
// Powering all 9 Zoho One replacement modules, 26 AI Agents, MCP & Audit
// ============================================================================

const fs = require('fs');
const path = require('path');
const db = require('../database/db');
const registry = require('../agents/registry');
const orchestrator = require('../agents/orchestrator');
const memory = require('../agents/memory');
const auditLedger = require('../agents/auditLedger');
const mcp = require('./mcp');

function handleApiRequest(req, res, parsedUrl, body) {
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // Helper for JSON response
    const json = (data, statusCode = 200) => {
        res.writeHead(statusCode, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Agent-ID'
        });
        res.end(JSON.stringify(data, null, 2));
    };

    // Helper for Error response
    const error = (msg, statusCode = 400) => {
        json({ error: msg, timestamp: new Date().toISOString() }, statusCode);
    };

    if (method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Agent-ID'
        });
        return res.end();
    }

    try {
        // --- 1. OpenAPI Specification ---
        if (pathname === '/api/openapi.json') {
            const openApiPath = path.join(__dirname, 'openapi.json');
            if (fs.existsSync(openApiPath)) {
                const spec = JSON.parse(fs.readFileSync(openApiPath, 'utf8'));
                return json(spec);
            }
            return error('OpenAPI spec file not found', 404);
        }

        // --- 2. Autonomous Agents & Orchestration ---
        if (pathname === '/api/agents/registry' && method === 'GET') {
            return json({
                totalAgents: registry.getAllAgents().length,
                agents: registry.getAllAgents()
            });
        }

        if (pathname === '/api/agents/swarm-status' && method === 'GET') {
            return json({
                activeSwarm: orchestrator.getSwarmStatus(),
                timestamp: new Date().toISOString()
            });
        }

        if (pathname === '/api/agents/invoke' && method === 'POST') {
            if (!body || !body.agentId || !body.prompt) {
                return error('Missing required fields: agentId and prompt');
            }
            orchestrator.invokeAgent(body.agentId, body.prompt, body.context || {}, body.userId || 'usr_admin')
                .then(result => json(result))
                .catch(err => error(err.message, 500));
            return;
        }

        // --- 3. Human-in-the-Loop (HITL) Queue & Level 2 Undo ---
        if (pathname === '/api/hitl/pending' && method === 'GET') {
            return json({
                pendingCount: orchestrator.getPendingHitl().length,
                items: orchestrator.getPendingHitl()
            });
        }

        if (pathname === '/api/hitl/resolve' && method === 'POST') {
            if (!body || !body.hitlId || !body.decision) {
                return error('Missing required fields: hitlId and decision (approved/rejected)');
            }
            const resData = orchestrator.resolveHitlAction(body.hitlId, body.decision, body.reviewer || 'usr_admin');
            return json(resData);
        }

        if (pathname === '/api/undo' && method === 'POST') {
            if (!body || !body.undoId) return error('Missing undoId');
            const result = orchestrator.executeUndo(body.undoId);
            return json(result);
        }

        // --- 4. Model Context Protocol (MCP) Endpoints ---
        if (pathname === '/api/mcp/tools' && method === 'GET') {
            return json({
                protocol: 'mcp-jsonrpc-2.0',
                tools: mcp.getTools()
            });
        }

        if (pathname === '/api/mcp/call' && method === 'POST') {
            if (!body || !body.toolName) return error('Missing toolName');
            mcp.executeTool(body.toolName, body.arguments || {})
                .then(resData => json({ status: 'success', output: resData }))
                .catch(err => error(err.message, 500));
            return;
        }

        // --- 5. Immutable Audit Ledger & 3-Tier Memory ---
        if (pathname === '/api/audit/logs' && method === 'GET') {
            const limit = Number(parsedUrl.searchParams.get('limit')) || 25;
            const filter = {
                agentId: parsedUrl.searchParams.get('agentId'),
                riskLevel: parsedUrl.searchParams.get('riskLevel') ? Number(parsedUrl.searchParams.get('riskLevel')) : undefined,
                approvalStatus: parsedUrl.searchParams.get('status')
            };
            return json({
                logs: auditLedger.getRecentLogs(limit, filter)
            });
        }

        if (pathname === '/api/audit/stats' && method === 'GET') {
            return json(auditLedger.getAuditStats());
        }

        if (pathname === '/api/memory/stats' && method === 'GET') {
            return json(memory.getAllMemoryTiers());
        }

        if (pathname === '/api/memory/working' && method === 'GET') {
            return json(memory.getWorkingMemory('global_session'));
        }

        if (pathname === '/api/memory/semantic/query' && method === 'POST') {
            const queryText = body?.query || '';
            const matches = memory.querySemanticRAG(queryText, 5);
            return json({ query: queryText, matches });
        }

        // --- 6. Module Group A: Sales & CRM ---
        if (pathname === '/api/crm/leads' && method === 'GET') {
            return json(db.query('SELECT * FROM leads ORDER BY score DESC'));
        }
        if (pathname === '/api/crm/leads' && method === 'POST') {
            const id = 'lead-' + Math.floor(Math.random() * 900 + 100);
            db.run('INSERT INTO leads (id, name, company, email, phone, status, score, intent) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [id, body.name, body.company, body.email, body.phone || '', body.status || 'New', body.score || 50, body.intent || 'Medium']);
            return json({ id, status: 'created' }, 201);
        }

        if (pathname === '/api/crm/deals' && method === 'GET') {
            return json(db.query('SELECT * FROM deals ORDER BY amount DESC'));
        }
        if (pathname === '/api/crm/accounts' && method === 'GET') {
            return json(db.query('SELECT * FROM accounts'));
        }
        if (pathname === '/api/crm/quotes' && method === 'GET') {
            return json(db.query('SELECT * FROM quotes ORDER BY created_at DESC'));
        }

        // --- 7. Module Group B: Marketing & Customer Experience ---
        if (pathname === '/api/marketing/campaigns' && method === 'GET') {
            return json(db.query('SELECT * FROM campaigns ORDER BY audience_size DESC'));
        }
        if (pathname === '/api/marketing/social' && method === 'GET') {
            return json(db.query('SELECT * FROM social_posts ORDER BY scheduled_time DESC'));
        }

        // --- 8. Module Group C: Customer Service & Support ---
        if (pathname === '/api/support/tickets' && method === 'GET') {
            return json(db.query('SELECT * FROM tickets ORDER BY created_at DESC'));
        }
        if (pathname === '/api/support/kb' && method === 'GET') {
            return json(db.query('SELECT * FROM kb_articles ORDER BY views DESC'));
        }

        // --- 9. Module Group D: Finance, ERP & Supply Chain ---
        if (pathname === '/api/finance/invoices' && method === 'GET') {
            return json(db.query('SELECT * FROM invoices ORDER BY due_date ASC'));
        }
        if (pathname === '/api/finance/inventory' && method === 'GET') {
            return json(db.query('SELECT * FROM inventory ORDER BY stock_on_hand ASC'));
        }
        if (pathname === '/api/finance/expenses' && method === 'GET') {
            return json(db.query('SELECT * FROM expenses ORDER BY created_at DESC'));
        }

        // --- 10. Module Group E: HR & Workplace Culture ---
        if (pathname === '/api/hr/employees' && method === 'GET') {
            return json(db.query('SELECT * FROM employees ORDER BY department ASC'));
        }
        if (pathname === '/api/hr/candidates' && method === 'GET') {
            return json(db.query('SELECT * FROM candidates ORDER BY match_score DESC'));
        }

        // --- 11. Module Group F: Collaboration & Productivity ---
        if (pathname === '/api/collab/emails' && method === 'GET') {
            return json(db.query('SELECT * FROM emails ORDER BY created_at DESC'));
        }
        if (pathname === '/api/collab/chat' && method === 'GET') {
            const channel = parsedUrl.searchParams.get('channel') || '#general';
            return json(db.query('SELECT * FROM chat_messages WHERE channel = ? ORDER BY timestamp ASC', [channel]));
        }

        // --- 12. Module Group G: Project Management ---
        if (pathname === '/api/projects' && method === 'GET') {
            return json(db.query('SELECT * FROM projects'));
        }
        if (pathname === '/api/projects/tasks' && method === 'GET') {
            return json(db.query('SELECT * FROM tasks ORDER BY priority DESC'));
        }

        // --- 13. Module Group H: ITSM & MDM ---
        if (pathname === '/api/itsm/assets' && method === 'GET') {
            return json(db.query('SELECT * FROM it_assets ORDER BY health_status ASC'));
        }
        if (pathname === '/api/itsm/incidents' && method === 'GET') {
            return json(db.query('SELECT * FROM it_incidents'));
        }

        // --- 14. Module Group I: BI & iPaaS ---
        if (pathname === '/api/bi/workflows' && method === 'GET') {
            return json(db.query('SELECT * FROM workflows ORDER BY execution_count DESC'));
        }
        if (pathname === '/api/bi/metrics' && method === 'GET') {
            const dealRev = db.query("SELECT sum(amount) as total FROM deals WHERE stage = 'closed_won'")[0]?.total || 0;
            const openPipeline = db.query("SELECT sum(amount) as total FROM deals WHERE stage != 'closed_won' AND stage != 'closed_lost'")[0]?.total || 0;
            const openTickets = db.query("SELECT count(*) as count FROM tickets WHERE status != 'resolved'")[0]?.count || 0;
            const activeEmployees = db.query("SELECT count(*) as count FROM employees WHERE status = 'Active'")[0]?.count || 0;
            const activeWorkflows = db.query("SELECT count(*) as count FROM workflows WHERE is_active = 1")[0]?.count || 0;

            return json({
                closedWonRevenue: dealRev,
                openPipelineValue: openPipeline,
                activeTicketsCount: openTickets,
                totalActiveEmployees: activeEmployees,
                automatedWorkflowsActive: activeWorkflows,
                systemHealthP95Ms: 38
            });
        }

        // --- 15. Webhooks Simulator & Event Bus ---
        if (pathname === '/api/webhooks/dispatch' && method === 'POST') {
            const event = body?.event || 'custom.event';
            const payload = body?.payload || {};
            // Simulate CDC event bus routing across modules
            console.log(`[Event Bus] Dispatched CDC event: ${event}`);
            return json({
                status: 'dispatched',
                event,
                timestamp: new Date().toISOString(),
                routingLatencyMs: 14
            });
        }

        return error(`Endpoint ${method} ${pathname} not found on AegisOS API Gateway`, 404);
    } catch (err) {
        console.error('[API Route Exception]', err);
        return error(err.message, 500);
    }
}

module.exports = { handleApiRequest };
