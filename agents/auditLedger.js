// ============================================================================
// AegisOS: Immutable Agent Audit Ledger
// Records complete telemetry for every autonomous agent execution:
// agent_id, on_behalf_of_user_id, trigger_event, prompt_hash, reasoning_trace,
// mcp_tools_called, before_after_data_diff, token_cost, and approval_status
// ============================================================================

const db = require('../database/db');
const crypto = require('crypto');

class AuditLedger {
    recordInvocation({
        agentId,
        agentName,
        onBehalfOfUserId = 'usr_admin',
        triggerEvent,
        riskLevel = 1,
        userPrompt = '',
        reasoningTrace = '',
        mcpToolsCalled = [],
        beforeAfterDiff = {},
        tokenCost = 0.0015,
        approvalStatus = 'Autonomous'
    }) {
        const id = 'aud-' + crypto.randomBytes(4).toString('hex');
        const promptHash = crypto.createHash('sha256').update(userPrompt || triggerEvent).digest('hex').substring(0, 12);
        const toolsStr = Array.isArray(mcpToolsCalled) ? mcpToolsCalled.join(', ') : String(mcpToolsCalled);
        const diffJson = typeof beforeAfterDiff === 'string' ? beforeAfterDiff : JSON.stringify(beforeAfterDiff);

        db.run(
            `INSERT INTO agent_audit_ledger 
            (id, agent_id, agent_name, on_behalf_of_user_id, trigger_event, risk_level, prompt_hash, reasoning_trace, mcp_tools_called, before_after_diff, token_cost, approval_status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, agentId, agentName, onBehalfOfUserId, triggerEvent, riskLevel, promptHash, reasoningTrace, toolsStr, diffJson, tokenCost, approvalStatus]
        );

        console.log(`[Audit Ledger] Recorded invocation [${id}] for agent "${agentName}" (Risk Level ${riskLevel}, Status: ${approvalStatus})`);

        return {
            id,
            timestamp: new Date().toISOString(),
            agentId,
            agentName,
            onBehalfOfUserId,
            triggerEvent,
            riskLevel,
            promptHash,
            reasoningTrace,
            mcpToolsCalled: toolsStr,
            beforeAfterDiff: diffJson,
            tokenCost,
            approvalStatus
        };
    }

    getRecentLogs(limit = 25, filter = {}) {
        let sql = 'SELECT * FROM agent_audit_ledger';
        const params = [];
        const conditions = [];

        if (filter.agentId) {
            conditions.push('agent_id = ?');
            params.push(filter.agentId);
        }
        if (filter.riskLevel) {
            conditions.push('risk_level = ?');
            params.push(filter.riskLevel);
        }
        if (filter.approvalStatus) {
            conditions.push('approval_status = ?');
            params.push(filter.approvalStatus);
        }

        if (conditions.length > 0) {
            sql += ' WHERE ' + conditions.join(' AND ');
        }

        sql += ' ORDER BY timestamp DESC LIMIT ?';
        params.push(limit);

        return db.query(sql, params);
    }

    getAuditStats() {
        const total = db.query('SELECT count(*) as count FROM agent_audit_ledger')[0]?.count || 0;
        const totalCost = db.query('SELECT sum(token_cost) as cost FROM agent_audit_ledger')[0]?.cost || 0;
        const level3Count = db.query('SELECT count(*) as count FROM agent_audit_ledger WHERE risk_level = 3')[0]?.count || 0;
        const byAgent = db.query('SELECT agent_name, count(*) as count FROM agent_audit_ledger GROUP BY agent_name ORDER BY count DESC LIMIT 5');

        return {
            totalInvocations: total,
            totalTokenCostUsd: Number(totalCost.toFixed(4)),
            level3ProtectedInvocations: level3Count,
            topAgents: byAgent
        };
    }
}

module.exports = new AuditLedger();
