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
                    <button class="clay-btn clay-btn-white" onclick="DeveloperModule.openSwaggerModal()">
                        ${Icons.get('fileText', 16, 'var(--clay-coral)')}
                        <span>Interactive Swagger Explorer</span>
                    </button>
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
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">API Authorization Key</span>
                            <span class="clay-badge clay-badge-mint" style="font-size:9px; padding:2px 6px;">Sandbox Token (Safe)</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                            <code id="api-key-code" style="font-size:12px; color:var(--clay-coral); font-weight:700; font-family:var(--font-mono);">•••••••••••••••••••••••••</code>
                            <div style="display:flex; gap:6px;">
                                <button class="clay-btn clay-btn-white" style="padding:4px 8px; font-size:11px;" onclick="DeveloperModule.toggleKeyVisibility()" title="Show/Hide Token">
                                    ${Icons.get('eye', 13, 'var(--text-primary)')}
                                </button>
                                <button class="clay-btn clay-btn-white" style="padding:4px 10px; font-size:11px;" onclick="DeveloperModule.copyApiKey()">Copy</button>
                            </div>
                        </div>
                        <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">Zero-risk sandbox dev token for testing store endpoints</div>
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
    },

    apiKeyRevealed: false,
    apiKeyRaw: 'agy_sec_9942a784bb5f128a6c8e9',

    toggleKeyVisibility() {
        this.apiKeyRevealed = !this.apiKeyRevealed;
        const codeEl = document.getElementById('api-key-code');
        if (codeEl) {
            codeEl.textContent = this.apiKeyRevealed ? this.apiKeyRaw : '•••••••••••••••••••••••••';
        }
    },

    copyApiKey() {
        try {
            navigator.clipboard.writeText(this.apiKeyRaw);
        } catch (e) {}
        HitlManager.showToast('Sandbox API token copied to clipboard', 'mint');
    },

    openSwaggerModal() {
        const modal = document.createElement('div');
        modal.className = 'clay-modal-backdrop';
        modal.innerHTML = `
            <div class="clay-card clay-modal-box" style="width:840px; max-width:94vw; max-height:90vh; overflow-y:auto; padding:28px; background:var(--clay-surface);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:40px; height:40px; border-radius:12px; background:var(--clay-lilac); color:var(--text-on-lilac); display:flex; align-items:center; justify-content:center;">
                            ${Icons.get('fileText', 20, 'var(--text-on-lilac)')}
                        </div>
                        <div>
                            <div style="display:flex; align-items:center; gap:8px;">
                                <h3 style="font-size:18px; font-weight:800; color:var(--text-primary);">Interactive Swagger &amp; REST Explorer</h3>
                                <span class="clay-badge clay-badge-mint" style="font-size:9px;">OpenAPI 3.1</span>
                            </div>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Test live AegisOS API Gateway routes directly without leaving the app</p>
                        </div>
                    </div>
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="closeModal(this)" style="width:34px; height:34px;">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>

                <!-- API Spec Action Bar -->
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; padding:12px 16px; background:#F8FAFC; border-radius:14px; border:1px solid rgba(0,0,0,0.06);">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span class="pulse-dot online"></span>
                        <span style="font-size:12px; font-weight:700; color:var(--text-primary);">AegisOS REST Gateway • Node 24 Native API</span>
                    </div>
                    <a href="/api/openapi.json" target="_blank" download="openapi.json" class="clay-btn clay-btn-white" style="font-size:11px; padding:6px 12px; text-decoration:none;">
                        ${Icons.get('code', 13, 'var(--text-primary)')}
                        <span>View Raw JSON Spec</span>
                    </a>
                </div>

                <!-- Core Endpoints List -->
                <div style="display:flex; flex-direction:column; gap:12px;">
                    <!-- Endpoint 1 -->
                    <div class="clay-card" style="padding:16px; background:var(--clay-surface);">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <div style="display:flex; align-items:center; gap:10px;">
                                <span class="clay-badge clay-badge-mint" style="font-weight:800; font-size:10px; padding:4px 8px;">GET</span>
                                <code style="font-size:13px; font-weight:800; color:var(--text-primary); font-family:var(--font-mono);">/api/agents/registry</code>
                            </div>
                            <button class="clay-btn clay-btn-coral" style="font-size:11px; padding:6px 14px;" onclick="DeveloperModule.testRoute('/api/agents/registry', 'GET', 'res-reg')">
                                Execute Call
                            </button>
                        </div>
                        <p style="font-size:11px; color:var(--text-muted); margin-top:6px;">Retrieves complete 26-agent enterprise catalog with risk tiers &amp; MCP bindings.</p>
                        <pre id="res-reg" style="display:none; margin-top:10px; background:#0F172A; color:#7AE8C2; padding:12px; border-radius:10px; font-size:11px; max-height:160px; overflow-y:auto; font-family:var(--font-mono);"></pre>
                    </div>

                    <!-- Endpoint 2 -->
                    <div class="clay-card" style="padding:16px; background:var(--clay-surface);">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <div style="display:flex; align-items:center; gap:10px;">
                                <span class="clay-badge clay-badge-mint" style="font-weight:800; font-size:10px; padding:4px 8px;">GET</span>
                                <code style="font-size:13px; font-weight:800; color:var(--text-primary); font-family:var(--font-mono);">/api/crm/deals</code>
                            </div>
                            <button class="clay-btn clay-btn-coral" style="font-size:11px; padding:6px 14px;" onclick="DeveloperModule.testRoute('/api/crm/deals', 'GET', 'res-deals')">
                                Execute Call
                            </button>
                        </div>
                        <p style="font-size:11px; color:var(--text-muted); margin-top:6px;">Lists partner boutique pipeline, wholesale order values, and gross margin ratios.</p>
                        <pre id="res-deals" style="display:none; margin-top:10px; background:#0F172A; color:#7AE8C2; padding:12px; border-radius:10px; font-size:11px; max-height:160px; overflow-y:auto; font-family:var(--font-mono);"></pre>
                    </div>

                    <!-- Endpoint 3 -->
                    <div class="clay-card" style="padding:16px; background:var(--clay-surface);">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <div style="display:flex; align-items:center; gap:10px;">
                                <span class="clay-badge clay-badge-mint" style="font-weight:800; font-size:10px; padding:4px 8px;">GET</span>
                                <code style="font-size:13px; font-weight:800; color:var(--text-primary); font-family:var(--font-mono);">/api/finance/inventory</code>
                            </div>
                            <button class="clay-btn clay-btn-coral" style="font-size:11px; padding:6px 14px;" onclick="DeveloperModule.testRoute('/api/finance/inventory', 'GET', 'res-inv')">
                                Execute Call
                            </button>
                        </div>
                        <p style="font-size:11px; color:var(--text-muted); margin-top:6px;">Returns real-time stock on hand for hoodies, sneakers, and boutique garments.</p>
                        <pre id="res-inv" style="display:none; margin-top:10px; background:#0F172A; color:#7AE8C2; padding:12px; border-radius:10px; font-size:11px; max-height:160px; overflow-y:auto; font-family:var(--font-mono);"></pre>
                    </div>

                    <!-- Endpoint 4 -->
                    <div class="clay-card" style="padding:16px; background:var(--clay-surface);">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <div style="display:flex; align-items:center; gap:10px;">
                                <span class="clay-badge clay-badge-mint" style="font-weight:800; font-size:10px; padding:4px 8px;">GET</span>
                                <code style="font-size:13px; font-weight:800; color:var(--text-primary); font-family:var(--font-mono);">/api/hitl/pending</code>
                            </div>
                            <button class="clay-btn clay-btn-coral" style="font-size:11px; padding:6px 14px;" onclick="DeveloperModule.testRoute('/api/hitl/pending', 'GET', 'res-hitl')">
                                Execute Call
                            </button>
                        </div>
                        <p style="font-size:11px; color:var(--text-muted); margin-top:6px;">Fetches pending Level 3 Human-In-The-Loop approvals awaiting Boss authorization.</p>
                        <pre id="res-hitl" style="display:none; margin-top:10px; background:#0F172A; color:#7AE8C2; padding:12px; border-radius:10px; font-size:11px; max-height:160px; overflow-y:auto; font-family:var(--font-mono);"></pre>
                    </div>
                </div>

                <div style="margin-top:20px; display:flex; justify-content:flex-end;">
                    <button class="clay-btn clay-btn-white" onclick="closeModal(this)">Close Swagger Explorer</button>
                </div>
            </div>
        `;
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
        document.body.appendChild(modal);
    },

    async testRoute(path, method, targetPreId) {
        const pre = document.getElementById(targetPreId);
        if (!pre) return;
        pre.style.display = 'block';
        pre.textContent = 'Executing request to API Gateway...';
        try {
            const res = await fetch(path);
            const data = await res.json();
            pre.textContent = JSON.stringify(data, null, 2);
            HitlManager.showToast(`Request ${path} completed with 200 OK`, 'mint');
        } catch (e) {
            pre.textContent = `Error: ${e.message}`;
            HitlManager.showToast(`Failed to fetch ${path}`, 'coral');
        }
    }
};

window.DeveloperModule = DeveloperModule;
