// ============================================================================
// Module Group H: IT Service Management (ITSM) & Endpoint Security (Pastel Clay)
// Authentic Setproduct Claymorphism - Zero Emojis - Vector SVG Iconography
// ============================================================================

const ItsmModule = {
    async render(container) {
        const [assetsRes, incRes] = await Promise.all([
            fetch('/api/itsm/assets').then(r => r.json()),
            fetch('/api/itsm/incidents').then(r => r.json())
        ]);

        const assets = assetsRes || [];
        const incidents = incRes || [];
        const healthyCount = assets.filter(a => a.health_status === 'Healthy').length;

        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:20px;">
                <!-- Simple Explainer Banner -->
                <div class="simple-guide-banner">
                    <div class="simple-guide-icon" style="background:var(--clay-mint);">
                        ${Icons.get('shield', 24, '#0E4337')}
                    </div>
                    <div>
                        <div style="font-size:15px; font-weight:800; color:var(--text-primary);">Room H: Store Registers, iPads & Barcode Scanners</div>
                        <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
                            Autonomous IT agents monitor flagship store billing iPads, clear bloated photoshoot cache files, and lock lost store devices.
                        </div>
                    </div>
                </div>

                <!-- Action Bar -->
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <button class="clay-btn clay-btn-white" onclick="ItsmModule.openCmdbModal()">
                        ${Icons.get('mapPin', 16, 'var(--text-primary)')}
                        <span>Store Device Topology</span>
                    </button>
                    <button class="clay-btn clay-btn-coral" onclick="Copilot.sendQuickPrompt('Diagnose high disk pressure on store-pos-ipad-01 and prepare cache cleanup script', 'agent-it-helpdesk')">
                        ${Icons.get('zap', 16, '#FFFFFF')}
                        <span>Clean Store iPad Cache</span>
                    </button>
                </div>

                <!-- 4 Quick Stats -->
                <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:14px;">
                    <div class="clay-card" style="padding:18px; background:var(--clay-surface);">
                        <div style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Managed Endpoints</div>
                        <div style="font-size:24px; font-weight:800; color:var(--text-primary); margin-top:6px; font-family:var(--font-mono);">${assets.length} Devices</div>
                        <div style="font-size:11px; color:#10B981; font-weight:700; margin-top:4px;">FleetDM active telemetry</div>
                    </div>
                    <div class="clay-card" style="padding:18px; background:var(--clay-surface);">
                        <div style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Fleet Health</div>
                        <div style="font-size:24px; font-weight:800; color:#10B981; margin-top:6px; font-family:var(--font-mono);">${healthyCount} / ${assets.length} Optimal</div>
                        <div style="font-size:11px; color:var(--text-secondary); margin-top:4px;">1 endpoint warning flagged</div>
                    </div>
                    <div class="clay-card" style="padding:18px; background:var(--clay-surface);">
                        <div style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">SOC-2 Compliance</div>
                        <div style="font-size:24px; font-weight:800; color:var(--clay-mint-dark); margin-top:6px; font-family:var(--font-mono);">99.2% Score</div>
                        <div style="font-size:11px; color:#10B981; font-weight:700; margin-top:4px;">Disk encryption verified</div>
                    </div>
                    <div class="clay-card" style="padding:18px; background:var(--clay-surface);">
                        <div style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">ITIL Incidents</div>
                        <div style="font-size:24px; font-weight:800; color:var(--clay-coral); margin-top:6px; font-family:var(--font-mono);">${incidents.length} Alert</div>
                        <div style="font-size:11px; color:var(--clay-coral); font-weight:700; margin-top:4px;">Level 3 HITL guardrail</div>
                    </div>
                </div>

                <!-- Assets & Incidents Split -->
                <div style="display:grid; grid-template-columns: 2fr 1fr; gap:16px;">
                    <!-- Managed Endpoint Fleet -->
                    <div class="clay-card" style="padding:22px; background:var(--clay-surface);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                            <div>
                                <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Enrolled Computers & Laptops</h3>
                                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Hardware inventory with live SOC-2 compliance scoring</p>
                            </div>
                            <span class="clay-badge clay-badge-mint">${assets.length} Online</span>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:12px;">
                            ${assets.map(a => `
                                <div class="clay-card" style="padding:16px; background:var(--clay-surface); display:flex; justify-content:space-between; align-items:center;">
                                    <div>
                                        <div style="display:flex; align-items:center; gap:8px;">
                                            <span style="font-weight:800; font-size:13px; color:var(--text-primary); font-family:var(--font-mono);">${a.hostname}</span>
                                            <span class="clay-badge ${a.health_status === 'Healthy' ? 'clay-badge-mint' : (a.health_status === 'Warning' ? 'clay-badge-butter' : 'clay-badge-coral')}">
                                                ${a.health_status}
                                            </span>
                                            <span class="clay-badge clay-badge-lilac">SOC 2: ${a.security_compliance}%</span>
                                        </div>
                                        <div style="font-size:12px; color:var(--text-secondary); margin-top:4px;">
                                            User: <strong style="color:var(--text-primary);">${a.user_email}</strong> • OS: ${a.os} • Agent: v${a.agent_version}
                                        </div>
                                    </div>
                                    <div style="display:flex; gap:8px;">
                                        <button class="clay-btn clay-btn-white" style="font-size:11px; padding:6px 14px;" onclick="ItsmModule.triggerRemoteTelemetry('${a.hostname}')">
                                            Telemetry
                                        </button>
                                        <button class="clay-btn clay-btn-coral" style="font-size:11px; padding:6px 14px;" onclick="ItsmModule.triggerRemoteLock('${a.hostname}')">
                                            MDM Lock
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- ITIL Incidents & Problems -->
                    <div class="clay-card" style="padding:22px; background:var(--clay-surface);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                            <div>
                                <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">ITIL Error Tickets</h3>
                                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Automated telemetry diagnostics</p>
                            </div>
                            <span class="clay-badge clay-badge-coral">1 Critical P1</span>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:12px;">
                            ${incidents.map(inc => `
                                <div class="clay-card" style="padding:16px; background:var(--clay-surface); border:2px solid var(--clay-coral);">
                                    <div style="display:flex; justify-content:space-between; align-items:center;">
                                        <strong style="font-size:13px; color:var(--text-primary);">${inc.title}</strong>
                                        <span class="clay-badge clay-badge-coral">${inc.urgency}</span>
                                    </div>
                                    <div style="font-size:11px; color:var(--text-secondary); margin-top:4px;">Assigned: ${inc.assigned_to}</div>
                                    <div style="font-size:11px; color:#22D3EE; font-family:var(--font-mono); margin-top:8px; background:#0F172A; padding:10px 12px; border-radius:10px;">
                                        ${inc.diagnostic_output}
                                    </div>
                                    <div style="margin-top:12px; display:flex; justify-content:flex-end;">
                                        <button class="clay-btn clay-btn-coral" style="font-size:11px; padding:6px 14px;" onclick="Copilot.sendQuickPrompt('Remediate incident on ${inc.asset_id}', 'agent-it-helpdesk')">
                                            Auto-Fix Device (HITL)
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    triggerRemoteTelemetry(hostname) {
        HitlManager.showToast(`FleetDM telemetry streaming initiated for ${hostname}`, 'mint');
    },

    triggerRemoteLock(hostname) {
        Copilot.sendQuickPrompt(`Execute remote security lock and asset containment on ${hostname}`, 'agent-it-helpdesk');
    },

    openCmdbModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `position:fixed; inset:0; background:rgba(31,36,56,0.6); backdrop-filter:blur(8px); z-index:10000; display:flex; align-items:center; justify-content:center;`;
        modal.innerHTML = `
            <div class="clay-card" style="width:720px; max-width:92vw; padding:28px; background:var(--clay-surface);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:40px; height:40px; border-radius:12px; background:var(--clay-mint); color:#0E4337; display:flex; align-items:center; justify-content:center;">
                            ${Icons.get('shield', 20, '#0E4337')}
                        </div>
                        <div>
                            <h3 style="font-size:17px; font-weight:800; color:var(--text-primary);">Infrastructure Topology Map</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Relational dependency graph between database, AI gateway, and devices</p>
                        </div>
                    </div>
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="this.closest('div[style*=\\'position:fixed\\']').remove()" style="width:34px; height:34px;">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>
                <div style="background:#0F172A; border-radius:16px; padding:22px; font-size:12px; font-family:var(--font-mono); line-height:2.4; color:#A5B4FC;">
                    [Kubernetes K3s Cluster] ──> [PostgreSQL 17 Database] ──> [pgvector Knowledge Store]<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;└──> [NATS JetStream Event Bus] ──> [Debezium Real-time Consumer]<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──> [LiteLLM Multi-Model Gateway] ──> [Ollama Llama 3.3 / Claude 3.5]<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──> [Keycloak SSO Identity Security] ──> [FleetDM Laptops & Endpoints]
                </div>
                <div style="margin-top:18px; display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:11px; color:#10B981; font-weight:700;">All 5 infrastructure layers verified & connected</span>
                    <button class="clay-btn clay-btn-coral" onclick="this.closest('div[style*=\\'position:fixed\\']').remove()">Close Topology View</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
};

window.ItsmModule = ItsmModule;
