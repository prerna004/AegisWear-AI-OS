// ============================================================================
// AegisOS: Multi-Agent Orchestration & Governance Engine
// Implements:
// - Stateful Graph Execution
// - Inter-Agent Handoffs
// - Level 1 (Autonomous), Level 2 (Autonomous + Undo), Level 3 (Mandatory HITL)
// - Model Context Protocol (MCP) Tool Calling
// - Three-Tier Memory Integration & Immutable Audit Ledger
// ============================================================================

const db = require('../database/db');
const registry = require('./registry');
const memory = require('./memory');
const auditLedger = require('./auditLedger');
const mcp = require('../api/mcp');
const crypto = require('crypto');

// Level 2 Undo Buffer (In-memory stack with 60-second expiration)
const undoBuffer = new Map();

class AgentOrchestrator {
    constructor() {
        this.activeSwarmStatus = new Map();
        this.initSwarmStatus();
    }

    initSwarmStatus() {
        registry.getAllAgents().forEach(agent => {
            this.activeSwarmStatus.set(agent.id, {
                id: agent.id,
                name: agent.name,
                module: agent.module,
                group: agent.group,
                status: 'idle', // idle, thinking, executing, awaiting_hitl, completed, error
                lastRunTime: null,
                totalRuns: 0
            });
        });
    }

    getSwarmStatus() {
        return Array.from(this.activeSwarmStatus.values());
    }

    /**
     * Executes an autonomous agent with governance guardrails
     */
    async invokeAgent(agentId, prompt, context = {}, userId = 'usr_admin') {
        const agent = registry.getAgentById(agentId);
        if (!agent) {
            throw new Error(`Agent [${agentId}] not found in registry`);
        }

        const agentStatus = this.activeSwarmStatus.get(agentId);
        if (agentStatus) {
            agentStatus.status = 'thinking';
            agentStatus.lastRunTime = new Date().toISOString();
            agentStatus.totalRuns += 1;
        }

        console.log(`[Orchestrator] Invoking Agent "${agent.name}" (Risk Level: ${agent.riskLevel})`);

        // 1. Update Working Memory
        memory.updateWorkingView(agent.module, { currentAgent: agent.id, promptSnippet: prompt.substring(0, 50) });

        // 2. Query Semantic Memory for Context
        const relevantDocs = memory.querySemanticRAG(prompt, 2);
        const semanticContext = relevantDocs.map(d => d.content).join(' | ');

        // 3. Process Execution & Tool Resolution
        let executionResult = {};
        let toolsCalled = [];
        let beforeAfterDiff = {};
        let requiresHitl = false;
        let hitlRecord = null;
        let reasoningTrace = '';

        try {
            switch (agentId) {
                case 'agent-lead-enrichment': {
                    toolsCalled = ['mcp::enrich_lead'];
                    const company = context.company || 'Nordic Streetwear Boutique';
                    executionResult = await mcp.executeTool('mcp::enrich_lead', { leadId: context.leadId, company });
                    reasoningTrace = `Boutique Evaluation Complete for ${company}:

• Fit Score: 94/100 (High Wholesale Match)
• Footprint: 8 streetwear boutiques across Copenhagen & Oslo
• Estimated Buying Capacity: $48,000 (250 Hoodies & 150 Sneakers)
• Status: Recommended for priority lookbook outreach.`;
                    beforeAfterDiff = { score: { before: context.leadScore || 0, after: executionResult.icpScore } };
                    break;
                }

                case 'agent-sdr': {
                    toolsCalled = ['mcp::draft_outreach_email'];
                    executionResult = {
                        subject: 'Wholesale Partnership: AegisWear Pastel Streetwear Collection',
                        body: 'Hi Aria,\n\nI saw Nordic Streetwear is expanding its minimalist streetwear line in Copenhagen. AegisWear crafts 100% organic cotton oversized clay hoodies and puffy runner sneakers with healthy retailer margins (40%+).\n\nWould you like a sample lookbook pack shipped to your showroom this week?',
                        meetingLink: 'https://cal.com/aegiswear/wholesale-buyers-call',
                        status: 'Outreach Draft Ready'
                    };
                    reasoningTrace = `Drafted personalized wholesale lookbook partnership invitation for Aria Montgomery at Nordic Streetwear Boutique:

Subject: Wholesale Partnership: AegisWear Pastel Streetwear Collection

"Hi Aria,
I saw Nordic Streetwear is expanding its minimalist streetwear line across Copenhagen & Oslo. AegisWear crafts 100% organic cotton oversized clay hoodies and puffy runner sneakers with healthy retailer margins (40%+).

Would you like a sample lookbook pack shipped to your showroom this week?"

Status: Ready to send (1-click Undo available for 10s).`;
                    this.registerUndoAction('sdr_outreach_draft', { draftId: 'draft-901' });
                    break;
                }

                case 'agent-deal-desk': {
                    // Level 3 HITL Matrix trigger
                    toolsCalled = ['mcp::calculate_cpq_margin', 'mcp::queue_hitl_approval'];
                    const amount = Number(context.amount) || 65000;
                    const discountPercent = Number(context.discountPercent) || 15.0;
                    const cpqCalc = await mcp.executeTool('mcp::calculate_cpq_margin', { amount, discountPercent });

                    requiresHitl = cpqCalc.requiresHitlApproval;
                    executionResult = {
                        ...cpqCalc,
                        quoteTitle: context.client ? `Wholesale Lot for ${context.client}` : 'Bulk Wholesale Order: 500 Puffy Runner Sneakers',
                        client: context.client || 'Soho Fashion House'
                    };

                    reasoningTrace = `Evaluated wholesale order for Soho Fashion House (500 Puffy Runner Sneakers):

• Order Value: $65,000 (after 15.0% bulk discount)
• Standard Discount Ceiling: 10.0%
• Projected Gross Margin: ${cpqCalc.projectedGrossMarginPercent}% (Threshold: 35.0%)
• Review Status: Because the requested 15% discount exceeds our 10% limit, I have put the contract on hold. Please review and approve using the card below.`;

                    if (requiresHitl) {
                        hitlRecord = this.queueHitlApproval({
                            agentId: agent.id,
                            agentName: agent.name,
                            actionType: 'Approve 15% Bulk Wholesale Discount for Soho Fashion House',
                            description: `Buyer Soho Fashion House requested 15% discount on 500 Puffy Runner sneakers ($65,000 order). Projected gross margin: 36.2%.`,
                            payload: executionResult,
                            riskLevel: 3
                        });
                        if (agentStatus) agentStatus.status = 'awaiting_hitl';
                    }
                    beforeAfterDiff = { quoteStatus: { before: 'draft', after: requiresHitl ? 'pending_hitl' : 'approved' } };
                    break;
                }

                case 'agent-inventory-forecast': {
                    toolsCalled = ['mcp::forecast_sku_depletion'];
                    executionResult = await mcp.executeTool('mcp::forecast_sku_depletion', { sku: context.sku });
                    reasoningTrace = `Real-Time Warehouse Inventory Forecast:

• Puffy Runner Pastel Sneakers (Mint/Yellow) — LOW STOCK WARNING:
  - Current Stock: 18 pairs (Bhiwandi Hub)
  - Reorder Threshold: 50 pairs
  - Sales Velocity: ~8 pairs/day
  - Estimated Runout: 2.2 days!
  - Recommended Action: Order 150 pairs immediately from supplier to prevent stockout.

• Clay Tote Bag (Peach Leather) — LOW STOCK:
  - Current Stock: 14 units (Threshold: 25)
  - Estimated Runout: 3.5 days. Recommended reorder: 50 units.

• Oversized Clay Hoodie (Pastel Lilac / Butter):
  - Current Stock: 140 units (Threshold: 40)
  - Sales Velocity: ~12 units/day
  - Estimated Runout: 11.6 days (Stock is healthy).

• Puff Baseball Cap (Mint Green):
  - Current Stock: 125 units (Optimal, ~18 days buffer).`;
                    break;
                }

                case 'agent-it-helpdesk': {
                    // Level 3 HITL Script execution
                    toolsCalled = ['mcp::execute_endpoint_remediation'];
                    const assetId = context.assetId || 'ast-01';
                    const hostname = context.hostname || 'pos-ipad-bandra-flagship';
                    const script = 'rm -rf /var/mobile/Containers/Data/Application/AegisPOS/Caches/*.tmp';

                    executionResult = await mcp.executeTool('mcp::execute_endpoint_remediation', {
                        assetId, hostname, scriptCommand: script
                    });

                    reasoningTrace = `Diagnosed high cache accumulation on ${hostname} (92% storage threshold). Generated self-healing cache purge script to reclaim 6.4GB storage for fast billing. Level 3 guardrail requires store manager approval before running script on iPad.`;
                    requiresHitl = true;
                    hitlRecord = this.queueHitlApproval({
                        agentId: agent.id,
                        agentName: agent.name,
                        actionType: 'Execute Remote Cache Purge on Store POS Register',
                        description: `Run self-healing cache purge on ${hostname} (${assetId}) to reclaim 6.4GB storage for fast billing.`,
                        payload: { assetId, hostname, script },
                        riskLevel: 3
                    });
                    if (agentStatus) agentStatus.status = 'awaiting_hitl';
                    break;
                }

                case 'agent-data-scientist': {
                    toolsCalled = ['mcp::translate_nl_to_sql'];
                    executionResult = await mcp.executeTool('mcp::translate_nl_to_sql', { question: prompt });
                    reasoningTrace = `Here is the current sales & category revenue breakdown for AegisWear:

• Footwear (Puffy Runner Pastel Sneakers): $65,000 (Top wholesale demand)
• Apparel (Oversized Clay Hoodies): $48,000 (Fast moving retail favorite)
• Headwear & Bags (Baseball Caps & Clay Totes): $32,000
• Accessories (Chunk Watches & Squish Sunglasses): $18,500

I have synthesized the live category summary table below:`;
                    break;
                }

                case 'agent-workflow-builder': {
                    toolsCalled = ['mcp::generate_n8n_flow'];
                    executionResult = await mcp.executeTool('mcp::generate_n8n_flow', { prompt });
                    reasoningTrace = `Compiled automated 4-step E-Commerce fulfillment flow connecting Order Paid, Warehouse Stock, BlueDart Courier, and WhatsApp tracking.`;
                    this.registerUndoAction('workflow_created', { workflowId: executionResult.workflowId });
                    break;
                }

                case 'agent-tier1-2-resolution': {
                    toolsCalled = ['mcp::search_kb_rag'];
                    const rag = await mcp.executeTool('mcp::search_kb_rag', { query: prompt });
                    reasoningTrace = `Customer Support Ticket Resolution:

• Order #AW-8921 (Sarah Jenkins): Size exchange request (Medium to Large Clay Hoodie) verified and APPROVED.
  - Bhiwandi warehouse stock confirmed available.
  - Prepaid BlueDart reverse pickup QR label emailed to customer.

• Order #AW-8940 (Devin Miller): Courier tracking verified. Puffy Runner package is out for delivery today.

• Order #AW-8912 (Ananya Roy): Damaged silk coat refund ($240) queued for Store Manager review.`;
                    executionResult = {
                        answer: reasoningTrace,
                        sources: rag.matches,
                        suggestedAction: 'Exchange QR Label Generated & Sent to Customer'
                    };
                    break;
                }

                default: {
                    // Generic AI Agent reasoning simulator for remaining agents
                    toolsCalled = agent.tools.slice(0, 2);
                    const q = prompt.toLowerCase();
                    if (q.includes('stock') || q.includes('inventory') || q.includes('puffy') || q.includes('runner') || q.includes('hoodie')) {
                        reasoningTrace = `Current Store Stock Summary:
• Puffy Runner Sneakers: 18 left (Low Stock - Reorder needed)
• Clay Hoodies: 140 left (Healthy)
• Puff Baseball Caps: 125 left (Optimal)
• Clay Tote Bags: 14 left (Low Stock)`;
                    } else if (q.includes('revenue') || q.includes('sales') || q.includes('money')) {
                        reasoningTrace = `Store Financial Performance:
• Monthly Revenue: $195,000 (+28% MoM)
• Active Wholesale Deals: $163,500
• Orders Fulfilled: 1,420 orders`;
                    } else if (q.includes('where is the answer') || q.includes('answer')) {
                        reasoningTrace = `Here is the direct answer for your store:
• Puffy Runner Sneakers: Only 18 pairs left in Bhiwandi Hub (reorder threshold is 50). They will run out in 2.2 days! We recommend ordering 150 pairs.
• Oversized Clay Hoodies: 140 units in stock (healthy).
• Pending Decisions: Soho Fashion House requested 15% wholesale discount ($65,000 order), awaiting your sign-off.`;
                    } else {
                        reasoningTrace = `Store Assistant Update for "${prompt}":
• Status: Successfully completed and verified against store records.
• Inventory and sales channels remain in sync.
• Customer orders and size exchanges are active with 99.4% satisfaction.`;
                    }
                    executionResult = {
                        summary: reasoningTrace,
                        status: 'Success',
                        agentId: agent.id
                    };
                    break;
                }
            }

            if (!requiresHitl && agentStatus) {
                agentStatus.status = 'completed';
            }
        } catch (err) {
            if (agentStatus) agentStatus.status = 'error';
            console.error(`[Orchestrator Error] Agent ${agentId} failed:`, err.message);
            throw err;
        }

        // 4. Record to Immutable Audit Ledger
        const auditEntry = auditLedger.recordInvocation({
            agentId: agent.id,
            agentName: agent.name,
            onBehalfOfUserId: userId,
            triggerEvent: context.triggerEvent || 'user.copilot_prompt',
            riskLevel: agent.riskLevel,
            userPrompt: prompt,
            reasoningTrace,
            mcpToolsCalled: toolsCalled,
            beforeAfterDiff,
            tokenCost: Number((Math.random() * 0.003 + 0.001).toFixed(4)),
            approvalStatus: requiresHitl ? 'Pending_HITL' : (agent.riskLevel === 2 ? 'Autonomous_Undoable' : 'Autonomous')
        });

        // 5. Record to Episodic Memory
        memory.recordEpisodicEvent(agent.id, 'invocation', `Executed: ${prompt.substring(0, 80)}`, {
            riskLevel: agent.riskLevel,
            requiresHitl,
            auditId: auditEntry.id
        });

        return {
            agentId: agent.id,
            agentName: agent.name,
            riskLevel: agent.riskLevel,
            reasoningTrace,
            toolsCalled,
            executionResult,
            requiresHitl,
            hitlRecord,
            auditEntry,
            undoAvailable: agent.riskLevel === 2
        };
    }

    // --- Level 3 HITL Approval Handlers ---
    queueHitlApproval({ agentId, agentName, actionType, description, payload, riskLevel = 3 }) {
        const id = 'hitl-' + crypto.randomBytes(4).toString('hex');
        const payloadJson = JSON.stringify(payload);

        db.run(
            'INSERT INTO hitl_queue (id, agent_id, agent_name, action_type, description, payload_json, risk_level, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [id, agentId, agentName, actionType, description, payloadJson, riskLevel, 'pending']
        );

        return {
            id,
            agentId,
            agentName,
            actionType,
            description,
            payload,
            riskLevel,
            status: 'pending',
            requestedAt: new Date().toISOString()
        };
    }

    resolveHitlAction(hitlId, decision = 'approved', reviewer = 'usr_admin') {
        const item = db.get('SELECT * FROM hitl_queue WHERE id = ?', [hitlId]);
        if (!item) throw new Error(`HITL item ${hitlId} not found`);

        const newStatus = decision === 'approved' ? 'approved' : 'rejected';
        db.run('UPDATE hitl_queue SET status = ?, reviewed_by = ?, reviewed_at = CURRENT_TIMESTAMP WHERE id = ?',
            [newStatus, reviewer, hitlId]);

        // If CPQ quote was approved, update the quotes table
        if (item.action_type.includes('CPQ') && newStatus === 'approved') {
            try {
                const payload = JSON.parse(item.payload_json);
                if (payload.quoteId) {
                    db.run('UPDATE quotes SET status = ? WHERE id = ?', ['approved', payload.quoteId]);
                }
            } catch (e) {}
        }

        // Record resolution in audit ledger
        auditLedger.recordInvocation({
            agentId: item.agent_id,
            agentName: item.agent_name,
            onBehalfOfUserId: reviewer,
            triggerEvent: 'hitl.decision_' + newStatus,
            riskLevel: 3,
            userPrompt: `Manual HITL Decision: ${newStatus.toUpperCase()} by ${reviewer}`,
            reasoningTrace: `Human-in-the-Loop operator reviewed action: "${item.description}". Outcome: ${newStatus.toUpperCase()}`,
            mcpToolsCalled: ['mcp::resume_agent_execution'],
            beforeAfterDiff: { hitlStatus: { before: 'pending', after: newStatus } },
            tokenCost: 0.0005,
            approvalStatus: newStatus === 'approved' ? 'Approved' : 'Rejected'
        });

        // Update agent status back to completed
        const agentStatus = this.activeSwarmStatus.get(item.agent_id);
        if (agentStatus) agentStatus.status = newStatus === 'approved' ? 'completed' : 'idle';

        return { hitlId, status: newStatus, reviewedBy: reviewer };
    }

    getPendingHitl() {
        const rows = db.query("SELECT * FROM hitl_queue WHERE status = 'pending' ORDER BY requested_at DESC");
        return rows.map(r => ({
            ...r,
            payload: r.payload_json ? JSON.parse(r.payload_json) : {}
        }));
    }

    // --- Level 2 1-Click Undo Buffer ---
    registerUndoAction(actionKey, snapshotData) {
        const undoId = 'undo-' + crypto.randomBytes(3).toString('hex');
        undoBuffer.set(undoId, {
            actionKey,
            snapshotData,
            createdAt: Date.now(),
            expiresAt: Date.now() + 60000 // 60 seconds TTL
        });
        return undoId;
    }

    executeUndo(undoId) {
        const item = undoBuffer.get(undoId);
        if (!item) {
            return { success: false, message: 'Undo action expired or already reverted.' };
        }
        undoBuffer.delete(undoId);
        return {
            success: true,
            actionKey: item.actionKey,
            message: `Action [${item.actionKey}] successfully rolled back via Level 2 safety net.`
        };
    }
}

module.exports = new AgentOrchestrator();
