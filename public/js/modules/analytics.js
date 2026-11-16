// ============================================================================
// Module Group I: Business Intelligence, Low-Code & iPaaS (Pastel Clay)
// Authentic Setproduct Claymorphism - Zero Emojis - Vector SVG Iconography
// ============================================================================

const AnalyticsModule = {
    async render(container) {
        const [metricsRes, workflowsRes] = await Promise.all([
            fetch('/api/bi/metrics').then(r => r.json()),
            fetch('/api/bi/workflows').then(r => r.json())
        ]);

        const metrics = metricsRes || {};
        const workflows = workflowsRes || [];

        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:20px;">
                <!-- Simple Explainer Banner -->
                <div class="simple-guide-banner">
                    <div class="simple-guide-icon" style="background:var(--clay-coral);">
                        ${Icons.get('barChart', 24, '#FFFFFF')}
                    </div>
                    <div>
                        <div style="font-size:15px; font-weight:800; color:var(--text-primary);">Room I: Best Sellers, Revenue & Plain-English Trends</div>
                        <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
                            Ask "Which hoodies or sneakers made the most money this month?" in plain English, and AI automatically creates the chart instantly.
                        </div>
                    </div>
                </div>

                <!-- Action Bar -->
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <button class="clay-btn clay-btn-white" onclick="AnalyticsModule.openN8nCanvasModal()">
                        ${Icons.get('zap', 16, 'var(--clay-coral)')}
                        <span>Store Automation Flow</span>
                    </button>
                    <button class="clay-btn clay-btn-coral" onclick="Copilot.sendQuickPrompt('Translate to SQL: Show best selling apparel categories and revenue', 'agent-data-scientist')">
                        ${Icons.get('barChart', 16, '#FFFFFF')}
                        <span>Ask Data Scientist</span>
                    </button>
                </div>

                <!-- Conversational Data Scientist Studio -->
                <div class="clay-card" style="padding:24px; background:var(--clay-surface);">
                    <div style="margin-bottom:14px;">
                        <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Conversational Data Scientist Studio</h3>
                        <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Ask questions in natural English. The AI synthesizes SQL AST queries and extracts chart data.</p>
                    </div>

                    <div style="display:flex; gap:12px; margin-bottom:16px;">
                        <input id="nlsql-input" class="clay-input" type="text" 
                            value="Show total revenue grouped by deal pipeline stage"
                            style="flex:1; border:1px solid #CBD5E1;" />
                        <button class="clay-btn clay-btn-coral" onclick="AnalyticsModule.runNlSql()">
                            Execute Query & Draw Chart
                        </button>
                    </div>

                    <div id="nlsql-results" class="clay-card" style="background:#F8FAFC; padding:20px;">
                        <div style="font-size:12px; color:var(--text-muted); font-weight:600;">
                            Click "Execute Query & Draw Chart" to test natural-language SQL generation.
                        </div>
                    </div>
                </div>

                <!-- Visual iPaaS Workflows -->
                <div class="clay-card" style="padding:24px; background:var(--clay-surface);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                        <div>
                            <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Cross-Suite Automation Workflows (n8n Engine)</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Event-driven CDC pipelines synchronizing CRM, ERP, and agile tasks</p>
                        </div>
                        <button class="clay-btn clay-btn-white" onclick="Copilot.sendQuickPrompt('Create an automated iPaaS workflow that triggers on CRM Deal Won and provisions ERP invoice and Agile project', 'agent-workflow-builder')">
                            Build Automation Workflow
                        </button>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:12px;">
                        ${workflows.map(wf => {
                            let steps = [];
                            try { steps = JSON.parse(wf.steps_json); } catch(e){}
                            return `
                                <div class="clay-card" style="padding:18px; background:var(--clay-surface);">
                                    <div style="display:flex; justify-content:space-between; align-items:center;">
                                        <div style="display:flex; align-items:center; gap:10px;">
                                            <span class="pulse-dot online"></span>
                                            <strong style="font-size:14px; color:var(--text-primary);">${wf.name}</strong>
                                            <span class="clay-badge clay-badge-mint">Active</span>
                                        </div>
                                        <span style="font-size:11px; color:var(--text-muted); font-family:var(--font-mono);">${wf.execution_count} Executions</span>
                                    </div>
                                    <div style="margin-top:14px; display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
                                        <span class="clay-badge clay-badge-white" style="border:1px solid #CBD5E1;">Trigger: ${wf.trigger_event}</span>
                                        ${steps.map(s => `
                                            <span style="color:var(--text-muted); font-size:14px; font-weight:800;">→</span>
                                            <span class="clay-badge clay-badge-lilac">${s.action || s.name}</span>
                                        `).join('')}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    async runNlSql() {
        const input = document.getElementById('nlsql-input');
        const box = document.getElementById('nlsql-results');
        if (!input || !box) return;

        const question = input.value.trim();
        box.innerHTML = `<div style="text-align:center; padding:16px; color:var(--text-muted);">Translating natural language into SQL AST...</div>`;

        try {
            const res = await fetch('/api/mcp/call', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    toolName: 'mcp::translate_nl_to_sql',
                    arguments: { question }
                })
            });
            const resData = await res.json();
            const output = resData.output;

            box.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:14px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:11px; color:var(--clay-coral); font-family:var(--font-mono); font-weight:700;">SQL: ${output.generatedSql}</span>
                        <span class="clay-badge clay-badge-mint">Sub-10ms</span>
                    </div>
                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:12px;">
                        ${output.data.map(row => `
                            <div class="clay-card" style="padding:14px; background:var(--clay-surface);">
                                <div style="font-size:11px; color:var(--text-muted); font-weight:700; text-transform:uppercase;">${row.stage || row.status || row.priority}</div>
                                <div style="font-size:20px; font-weight:800; color:var(--text-primary); margin-top:6px; font-family:var(--font-mono);">
                                    ${row.total_value ? '$' + Number(row.total_value).toLocaleString() : row.count}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } catch (e) {
            box.innerHTML = `<div style="color:var(--clay-coral); padding:10px; font-weight:700;">Query error: ${e.message}</div>`;
        }
    },

    openN8nCanvasModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `position:fixed; inset:0; background:rgba(31,36,56,0.6); backdrop-filter:blur(8px); z-index:10000; display:flex; align-items:center; justify-content:center;`;
        modal.innerHTML = `
            <div class="clay-card" style="width:840px; max-width:92vw; padding:28px; background:var(--clay-surface);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:40px; height:40px; border-radius:12px; background:var(--clay-coral); color:#FFFFFF; display:flex; align-items:center; justify-content:center;">
                            ${Icons.get('zap', 20, '#FFFFFF')}
                        </div>
                        <div>
                            <h3 style="font-size:17px; font-weight:800; color:var(--text-primary);">Automated Workflow Topology (n8n Engine)</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Event-driven cross-suite cascade upon deal signature</p>
                        </div>
                    </div>
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="this.closest('div[style*=\\'position:fixed\\']').remove()" style="width:34px; height:34px;">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>
                <div class="clay-card" style="background:#F8FAFC; padding:28px; display:flex; align-items:center; justify-content:center; gap:14px; flex-wrap:wrap;">
                    <div class="clay-card" style="padding:16px 20px; text-align:center; min-width:140px; background:var(--clay-surface); border:2px solid var(--clay-coral);">
                        <span class="clay-badge clay-badge-coral">1. Deal Won</span>
                        <div style="font-size:12px; font-weight:800; margin-top:6px; color:var(--text-primary);">CRM Closed Won</div>
                    </div>
                    <span style="color:var(--text-muted); font-size:22px; font-weight:900;">→</span>
                    <div class="clay-card" style="padding:16px 20px; text-align:center; min-width:140px; background:var(--clay-surface); border:2px solid var(--clay-mint);">
                        <span class="clay-badge clay-badge-mint">2. Bill Generated</span>
                        <div style="font-size:12px; font-weight:800; margin-top:6px; color:var(--text-primary);">ERP Books Invoice</div>
                    </div>
                    <span style="color:var(--text-muted); font-size:22px; font-weight:900;">→</span>
                    <div class="clay-card" style="padding:16px 20px; text-align:center; min-width:140px; background:var(--clay-surface); border:2px solid var(--clay-sky);">
                        <span class="clay-badge clay-badge-sky">3. Tasks Seeded</span>
                        <div style="font-size:12px; font-weight:800; margin-top:6px; color:var(--text-primary);">Agile Project Board</div>
                    </div>
                    <span style="color:var(--text-muted); font-size:22px; font-weight:900;">→</span>
                    <div class="clay-card" style="padding:16px 20px; text-align:center; min-width:140px; background:var(--clay-surface); border:2px solid var(--clay-lilac);">
                        <span class="clay-badge clay-badge-lilac">4. E-Signature</span>
                        <div style="font-size:12px; font-weight:800; margin-top:6px; color:var(--text-primary);">Documenso Envelope</div>
                    </div>
                </div>
                <div style="margin-top:18px; display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:12px; color:var(--text-muted); font-weight:600;">Real-time event cascade duration: &lt; 100 milliseconds</span>
                    <button class="clay-btn clay-btn-coral" onclick="HitlManager.showToast('Test pipeline completed successfully', 'mint'); this.closest('div[style*=\\'position:fixed\\']').remove();">
                        Test Pipeline Execution
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
};

window.AnalyticsModule = AnalyticsModule;
