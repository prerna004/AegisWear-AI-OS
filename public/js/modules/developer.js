// ============================================================================
// Developer & Extensibility Gateway (Pastel Claymorphic Edition)
// Authentic Setproduct Claymorphism - Zero Emojis - Vector SVG Iconography
// ============================================================================

const DeveloperModule = {
    async render(container) {
        let tools = [
            { name: 'mcp::enrich_lead', riskLevel: 1, description: 'Enriches prospective boutique details' },
            { name: 'mcp::calculate_cpq_margin', riskLevel: 3, description: 'Calculates bulk margin floor (>35%)' },
            { name: 'mcp::ocr_receipt_image', riskLevel: 2, description: 'Extracts line items from supplier bills' }
        ];
        let spec = {};

        try {
            const [mcpToolsRes, openApiRes] = await Promise.all([
                fetch('/api/mcp/tools').then(r => r.json()).catch(() => null),
                fetch('/api/openapi.json').then(r => r.json()).catch(() => null)
            ]);

            if (mcpToolsRes && Array.isArray(mcpToolsRes.tools) && mcpToolsRes.tools.length > 0) {
                tools = mcpToolsRes.tools;
            }
            if (openApiRes && typeof openApiRes === 'object') {
                spec = openApiRes;
            }
        } catch (e) {
            console.warn('DeveloperModule fetch failed, using fallback:', e);
        }

        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:20px;">
                <!-- Simple Explainer Banner -->
                <div class="simple-guide-banner">
                    <div class="simple-guide-icon" style="background:var(--clay-butter);">
                        ${Icons.get('code', 24, 'var(--text-on-butter)')}
                    </div>
                    <div>
                        <div style="font-size:15px; font-weight:800; color:var(--text-primary);">Developer Gateway: Build Over AegisOS</div>
                        <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
                            Open REST endpoints, interactive OpenAPI 3.1 Swagger docs, JSON-RPC 2.0 Model Context Protocol (MCP) server, and multi-language SDKs.
                        </div>
                    </div>
                </div>

                <!-- Action Bar -->
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <a href="/docs" target="_blank" class="clay-btn clay-btn-white" style="text-decoration:none;">
                        ${Icons.get('fileText', 16, 'var(--clay-coral)')}
                        <span>Interactive Swagger Explorer</span>
                    </a>
                    <button class="clay-btn clay-btn-coral" onclick="DeveloperModule.dispatchTestWebhook()">
                        ${Icons.get('zap', 16, '#FFFFFF')}
                        <span>Dispatch Test Webhook</span>
                    </button>
                </div>

                <!-- 3 Key Info Cards -->
                <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:14px;">
                    <div class="clay-card" style="padding:18px; background:var(--clay-surface);">
                        <div style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">API Gateway Root</div>
                        <div style="font-size:13px; font-weight:700; color:var(--text-primary); margin-top:6px; font-family:var(--font-mono); overflow:hidden; text-overflow:ellipsis;">
                            ${window.location.origin}/api
                        </div>
                        <div style="font-size:11px; color:#10B981; font-weight:700; margin-top:4px;">OpenAPI 3.1 Standard Compliant</div>
                    </div>
                    <div class="clay-card" style="padding:18px; background:var(--clay-surface);">
                        <div style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">API Authorization Key</div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px;">
                            <code style="font-size:12px; color:var(--clay-coral); font-weight:700;">agy_sec_9942a7...</code>
                            <button class="clay-btn clay-btn-white" style="padding:4px 10px; font-size:11px;" onclick="HitlManager.showToast('API key copied to clipboard', 'mint')">Copy</button>
                        </div>
                        <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">Bearer token authentication header</div>
                    </div>
                    <div class="clay-card" style="padding:18px; background:var(--clay-surface);">
                        <div style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Registered MCP Tools</div>
                        <div style="font-size:20px; font-weight:800; color:var(--clay-mint-dark); margin-top:6px; font-family:var(--font-mono);">${tools.length} Tools Ready</div>
                        <div style="font-size:11px; color:var(--text-secondary); margin-top:4px;">JSON-RPC 2.0 Standard</div>
                    </div>
                </div>

                <!-- Interactive MCP Playground -->
                <div class="clay-card" style="padding:24px; background:var(--clay-surface);">
                    <div style="margin-bottom:14px;">
                        <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Model Context Protocol (MCP) Live Console</h3>
                        <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Execute live tool calls against the agent orchestration fabric.</p>
                    </div>

                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
                        <div>
                            <label style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Select Tool Target:</label>
                            <select id="mcp-tool-select" class="clay-input" onchange="DeveloperModule.handleToolSelect()" style="width:100%; margin-top:6px; font-family:var(--font-mono); border:1px solid #CBD5E1;">
                                ${tools.map(t => `<option value="${t.name}">${t.name} (Risk Level ${t.riskLevel})</option>`).join('')}
                            </select>
                            <div style="margin-top:12px;">
                                <label style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Parameters (JSON Payload):</label>
                                <textarea id="mcp-args-input" class="clay-input" rows="5" style="width:100%; margin-top:6px; font-family:var(--font-mono); border:1px solid #CBD5E1;"></textarea>
                            </div>
                            <button class="clay-btn clay-btn-coral" style="margin-top:12px;" onclick="DeveloperModule.executeMcpCall()">
                                Execute Tool Call
                            </button>
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Response Output:</label>
                            <pre id="mcp-output-box" class="clay-card" style="height:190px; background:#F8FAFC; padding:16px; font-size:12px; color:var(--text-primary); overflow-y:auto; margin-top:6px; font-family:var(--font-mono); line-height:1.5;">// Click "Execute Tool Call" to view raw JSON-RPC response</pre>
                        </div>
                    </div>
                </div>

                <!-- Client SDKs -->
                <div class="clay-card" style="padding:24px; background:var(--clay-surface);">
                    <div style="margin-bottom:14px;">
                        <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Client SDK Integrations</h3>
                        <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Production-ready snippets for cURL, TypeScript, and Python.</p>
                    </div>

                    <div style="display:flex; gap:10px; margin-bottom:12px;">
                        <button class="clay-btn clay-btn-coral" style="font-size:12px; padding:6px 16px;" onclick="DeveloperModule.switchSnippet('curl', this)">cURL</button>
                        <button class="clay-btn clay-btn-white" style="font-size:12px; padding:6px 16px;" onclick="DeveloperModule.switchSnippet('node', this)">Node.js / TypeScript</button>
                        <button class="clay-btn clay-btn-white" style="font-size:12px; padding:6px 16px;" onclick="DeveloperModule.switchSnippet('python', this)">Python</button>
                    </div>
                    <pre id="code-snippet-box" class="clay-card" style="background:#0F172A; padding:20px; font-size:12px; color:#E2E8F0; overflow-x:auto; line-height:1.6; font-family:var(--font-mono); border-radius:18px;"></pre>
                </div>
            </div>
        `;

        this.handleToolSelect();
        this.switchSnippet('curl');
    },

    handleToolSelect() {
        const select = document.getElementById('mcp-tool-select');
        const argsInput = document.getElementById('mcp-args-input');
        if (!select || !argsInput) return;

        const val = select.value;
        if (val.includes('enrich_lead')) {
            argsInput.value = JSON.stringify({ company: 'Aether Dynamics Robotics' }, null, 2);
        } else if (val.includes('calculate_cpq_margin')) {
            argsInput.value = JSON.stringify({ amount: 480000, discountPercent: 12.0 }, null, 2);
        } else if (val.includes('search_kb_rag')) {
            argsInput.value = JSON.stringify({ query: 'discount approval policy', limit: 2 }, null, 2);
        } else if (val.includes('translate_nl_to_sql')) {
            argsInput.value = JSON.stringify({ question: 'Show deals by stage and sum amount' }, null, 2);
        } else {
            argsInput.value = JSON.stringify({ param: 'sample' }, null, 2);
        }
    },

    async executeMcpCall() {
        const select = document.getElementById('mcp-tool-select');
        const argsInput = document.getElementById('mcp-args-input');
        const outputBox = document.getElementById('mcp-output-box');
        if (!select || !argsInput || !outputBox) return;

        outputBox.textContent = 'Calling tool...';
        try {
            const args = JSON.parse(argsInput.value);
            const res = await fetch('/api/mcp/call', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ toolName: select.value, arguments: args })
            });
            const data = await res.json();
            outputBox.textContent = JSON.stringify(data, null, 2);
        } catch (e) {
            outputBox.textContent = `Error: ${e.message}`;
        }
    },

    switchSnippet(lang, btn) {
        if (btn) {
            btn.parentElement.querySelectorAll('button').forEach(b => {
                b.className = 'clay-btn clay-btn-white';
            });
            btn.className = 'clay-btn clay-btn-coral';
        }

        const box = document.getElementById('code-snippet-box');
        if (!box) return;

        const host = window.location.origin;

        if (lang === 'curl') {
            box.textContent = `curl -X POST "${host}/api/agents/invoke" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer agy_sec_9942a7..." \\
  -d '{
    "agentId": "agent-lead-enrichment",
    "prompt": "Enrich Elena Dynamics Robotics and calculate ICP fit score"
  }'`;
        } else if (lang === 'node') {
            box.textContent = `// AegisOS TypeScript Client SDK
import { AegisClient } from '@aegis-os/sdk';

const client = new AegisClient({
  baseUrl: '${host}',
  apiKey: process.env.AEGIS_API_KEY
});

// Invoke Autonomous Agent with Level 3 Guardrails
const result = await client.agents.invoke({
  agentId: 'agent-deal-desk',
  prompt: 'Calculate CPQ quote for Nordic Logistics with 12% discount',
  context: { amount: 480000, discountPercent: 12.0 }
});

console.log('Reasoning:', result.reasoningTrace);
console.log('Requires HITL Sign-off:', result.requiresHitl);`;
        } else if (lang === 'python') {
            box.textContent = `# AegisOS Python Client SDK
import os
import requests

AEGIS_HOST = "${host}"
API_KEY = os.getenv("AEGIS_API_KEY", "agy_sec_9942a7...")

response = requests.post(
    f"{AEGIS_HOST}/api/agents/invoke",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json={
        "agentId": "agent-data-scientist",
        "prompt": "Show deals by stage and sum amount"
    }
)

data = response.json()
print("Generated SQL:", data["executionResult"]["generatedSql"])
print("Chart Data:", data["executionResult"]["data"])`;
        }
    },

    async dispatchTestWebhook() {
        try {
            const res = await fetch('/api/webhooks/dispatch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event: 'deal.closed_won',
                    payload: { dealId: 'deal-501', client: 'Nordic Streetwear Boutique', amount: 48000 }
                })
            });
            const data = await res.json();
            HitlManager.showToast(`Webhook event dispatched (${data.routingLatencyMs}ms)`, 'mint');
        } catch (e) {
            HitlManager.showToast('Webhook dispatch failed', 'coral');
        }
    }
};

window.DeveloperModule = DeveloperModule;
