// ============================================================================
// AegisOS: Automated Enterprise Verification Test Suite
// Verifies all core architectural subsystems:
// 1. 26-Agent Registry & Zoho One Replacement Matrix
// 2. Swarm Telemetry & Orchestrator Execution State Machine
// 3. Level 1 Autonomous Execution (Lead Enrichment)
// 4. Level 2 Autonomous + 1-Click Undo Buffer
// 5. Level 3 Mandatory HITL Enforcement (Deal Desk CPQ & Endpoint Script)
// 6. HITL Resolution & Audit State Persistence
// 7. Model Context Protocol (MCP) Standard Server Tools
// 8. Three-Tier Memory Architecture (Working, Episodic, Semantic RAG)
// 9. Immutable Agent Audit Ledger & SHA-256 Prompt Hashing
// 10. Database Fabric across all 9 Module Groups (A through I)
// 11. REST API Gateway & OpenAPI 3.1 Spec Routing
// ============================================================================

const test = require('node:test');
const assert = require('node:assert');
const url = require('node:url');

const db = require('../database/db');
const registry = require('../agents/registry');
const orchestrator = require('../agents/orchestrator');
const memory = require('../agents/memory');
const auditLedger = require('../agents/auditLedger');
const mcp = require('../api/mcp');
const { handleApiRequest } = require('../api/routes');

// Helper to simulate REST request against handleApiRequest without network sockets
function simulateApiCall(pathname, method = 'GET', body = null, searchParams = {}) {
    return new Promise((resolve) => {
        const parsedUrl = new url.URL(`http://localhost:3000${pathname}`);
        for (const [k, v] of Object.entries(searchParams)) {
            parsedUrl.searchParams.set(k, v);
        }

        const req = {
            method,
            headers: { 'content-type': 'application/json' }
        };

        let responseHeaders = {};
        let responseStatusCode = 200;
        let responseBuffer = '';

        const res = {
            writeHead: (statusCode, headers) => {
                responseStatusCode = statusCode;
                responseHeaders = headers;
            },
            end: (data) => {
                responseBuffer = data || '';
                try {
                    resolve({
                        status: responseStatusCode,
                        headers: responseHeaders,
                        body: JSON.parse(responseBuffer)
                    });
                } catch (e) {
                    resolve({
                        status: responseStatusCode,
                        headers: responseHeaders,
                        raw: responseBuffer
                    });
                }
            }
        };

        handleApiRequest(req, res, parsedUrl, body);
    });
}

test('1. 26-Agent Master Registry Validation', () => {
    const agents = registry.getAllAgents();
    assert.strictEqual(agents.length, 26, 'Must contain exactly 26 specialized enterprise agents');

    // Check Module Group representations
    const groups = new Set(agents.map(a => a.group));
    assert.deepStrictEqual(Array.from(groups).sort(), ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'], 'Must cover all 9 module groups A through I');

    // Verify Deal Desk CPQ has Level 3 HITL guardrail
    const dealDesk = registry.getAgentById('agent-deal-desk');
    assert.ok(dealDesk);
    assert.strictEqual(dealDesk.riskLevel, 3, 'Deal desk must be Level 3 HITL');

    // Verify Autonomous IT Helpdesk has Level 3 HITL guardrail
    const itHelpdesk = registry.getAgentById('agent-it-helpdesk');
    assert.ok(itHelpdesk);
    assert.strictEqual(itHelpdesk.riskLevel, 3, 'IT Helpdesk endpoint script execution must be Level 3 HITL');
});

test('2. Real-time Swarm Telemetry & Initial States', () => {
    const swarm = orchestrator.getSwarmStatus();
    assert.strictEqual(swarm.length, 26);
    assert.ok(swarm.every(s => s.id && s.name && s.module));
});

test('3. Level 1 Autonomous Execution (Lead Enrichment)', async () => {
    const result = await orchestrator.invokeAgent('agent-lead-enrichment', 'Enrich Aether Dynamics Robotics', {
        company: 'Aether Dynamics Robotics'
    });

    assert.strictEqual(result.agentId, 'agent-lead-enrichment');
    assert.strictEqual(result.riskLevel, 1);
    assert.strictEqual(result.requiresHitl, false);
    assert.ok(result.executionResult.icpScore > 80);
    assert.ok(result.reasoningTrace.includes('Aether Dynamics'));
    assert.ok(result.auditEntry.id.startsWith('aud-'));
});

test('4. Level 2 Autonomous Execution + 1-Click Undo Buffer', async () => {
    const result = await orchestrator.invokeAgent('agent-sdr', 'Draft SDR outreach for Apex BioSystems', {
        company: 'Apex BioSystems Ltd'
    });

    assert.strictEqual(result.agentId, 'agent-sdr');
    assert.strictEqual(result.riskLevel, 2);
    assert.strictEqual(result.undoAvailable, true);
    assert.ok(result.executionResult.subject);
    assert.ok(result.executionResult.meetingLink.includes('cal.com'));

    // Test undo execution
    const undoId = orchestrator.registerUndoAction('sdr_outreach', { test: true });
    const undoResult = orchestrator.executeUndo(undoId);
    assert.strictEqual(undoResult.success, true);
});

test('5. Level 3 Mandatory HITL Enforcement & Interactive Approval Flow', async () => {
    const result = await orchestrator.invokeAgent('agent-deal-desk', 'Check Deal Desk margin for $480,000 Nordic quote with 12% discount', {
        client: 'Nordic Logistics Global',
        amount: 480000,
        discountPercent: 12.0
    });

    assert.strictEqual(result.agentId, 'agent-deal-desk');
    assert.strictEqual(result.riskLevel, 3);
    assert.strictEqual(result.requiresHitl, true);
    assert.ok(result.hitlRecord, 'Must generate pending HITL approval record');
    assert.strictEqual(result.hitlRecord.status, 'pending');

    // Verify item is present in pending queue
    const pendingList = orchestrator.getPendingHitl();
    const queued = pendingList.find(i => i.id === result.hitlRecord.id);
    assert.ok(queued, 'Item must be in pending HITL queue');

    // Resolve the approval
    const resolveOutcome = orchestrator.resolveHitlAction(result.hitlRecord.id, 'approved', 'usr_admin');
    assert.strictEqual(resolveOutcome.status, 'approved');

    // Verify it is no longer pending
    const updatedPending = orchestrator.getPendingHitl();
    assert.strictEqual(updatedPending.some(i => i.id === result.hitlRecord.id), false);
});

test('6. Model Context Protocol (MCP) Standard Server', async () => {
    const tools = mcp.getTools();
    assert.ok(tools.length >= 8);
    assert.ok(tools.some(t => t.name === 'mcp::enrich_lead'));
    assert.ok(tools.some(t => t.name === 'mcp::translate_nl_to_sql'));

    // Test NL-to-SQL tool call
    const sqlOutput = await mcp.executeTool('mcp::translate_nl_to_sql', {
        question: 'Show revenue breakdown by deal pipeline stages'
    });
    assert.ok(sqlOutput.generatedSql.includes('SELECT'));
    assert.ok(Array.isArray(sqlOutput.data));
    assert.ok(sqlOutput.data.length > 0);
});

test('7. Three-Tier Memory Architecture', () => {
    // Tier 1: Working Memory
    const working = memory.getWorkingMemory('global_session');
    assert.ok(working);
    assert.strictEqual(working.activeTenant, 'Aegis Enterprise Corp');

    // Tier 2: Episodic Memory
    const episodic = memory.getEpisodicHistory();
    assert.ok(Array.isArray(episodic));
    assert.ok(episodic.length > 0);

    // Tier 3: Semantic RAG
    const ragMatches = memory.querySemanticRAG('travel discount expense policy');
    assert.ok(ragMatches.length > 0);
    assert.ok(ragMatches[0].content);
});

test('8. Immutable Agent Audit Ledger', () => {
    const logs = auditLedger.getRecentLogs(5);
    assert.ok(logs.length > 0);
    const log = logs[0];
    assert.ok(log.id.startsWith('aud-'));
    assert.ok(log.prompt_hash);
    assert.ok(log.reasoning_trace);
    assert.ok(log.mcp_tools_called);

    const stats = auditLedger.getAuditStats();
    assert.ok(stats.totalInvocations > 0);
    assert.ok(stats.totalTokenCostUsd >= 0);
});

test('9. Unified Relational Database Fabric (Groups A through I)', () => {
    assert.ok(db.query('SELECT count(*) as count FROM leads')[0].count > 0, 'Leads table populated');
    assert.ok(db.query('SELECT count(*) as count FROM deals')[0].count > 0, 'Deals table populated');
    assert.ok(db.query('SELECT count(*) as count FROM campaigns')[0].count > 0, 'Campaigns table populated');
    assert.ok(db.query('SELECT count(*) as count FROM tickets')[0].count > 0, 'Tickets table populated');
    assert.ok(db.query('SELECT count(*) as count FROM invoices')[0].count > 0, 'Invoices table populated');
    assert.ok(db.query('SELECT count(*) as count FROM inventory')[0].count > 0, 'Inventory table populated');
    assert.ok(db.query('SELECT count(*) as count FROM employees')[0].count > 0, 'Employees table populated');
    assert.ok(db.query('SELECT count(*) as count FROM tasks')[0].count > 0, 'Tasks table populated');
    assert.ok(db.query('SELECT count(*) as count FROM it_assets')[0].count > 0, 'IT Assets table populated');
    assert.ok(db.query('SELECT count(*) as count FROM workflows')[0].count > 0, 'Workflows table populated');
});

test('10. REST API Router & OpenAPI 3.1 Spec Routing', async () => {
    // Test OpenAPI JSON
    const openApiRes = await simulateApiCall('/api/openapi.json');
    assert.strictEqual(openApiRes.status, 200);
    assert.strictEqual(openApiRes.body.openapi, '3.1.0');

    // Test Agents Registry via REST
    const regRes = await simulateApiCall('/api/agents/registry');
    assert.strictEqual(regRes.status, 200);
    assert.strictEqual(regRes.body.totalAgents, 26);

    // Test BI Metrics via REST
    const biRes = await simulateApiCall('/api/bi/metrics');
    assert.strictEqual(biRes.status, 200);
    assert.ok(biRes.body.systemHealthP95Ms);

    // Test Webhook Dispatch via REST
    const hookRes = await simulateApiCall('/api/webhooks/dispatch', 'POST', {
        event: 'deal.closed_won',
        payload: { dealId: 'deal-501', amount: 240000 }
    });
    assert.strictEqual(hookRes.status, 200);
    assert.strictEqual(hookRes.body.status, 'dispatched');
});
