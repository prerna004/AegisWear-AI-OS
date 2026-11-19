// ============================================================================
// Module Group H: IT Service Management (ITSM) & Endpoint Security (Pastel Clay)
// Authentic Setproduct Claymorphism - Zero Emojis - Vector SVG Iconography
// ============================================================================

const ItsmModule = {
    async render(container) {
        let assets = [
            { id: 'ast-01', hostname: 'store-pos-ipad-01', ip_address: '192.168.10.42', os: 'iPadOS 18.2', health_status: 'Healthy', disk_usage_percent: 42, ram_usage_percent: 38 },
            { id: 'ast-02', hostname: 'warehouse-scanner-04', ip_address: '192.168.20.15', os: 'Android 14 (Zebra)', health_status: 'Healthy', disk_usage_percent: 28, ram_usage_percent: 45 },
            { id: 'ast-03', hostname: 'design-macbook-pro', ip_address: '192.168.10.88', os: 'macOS Sequoia 15.1', health_status: 'Warning', disk_usage_percent: 94, ram_usage_percent: 82 }
        ];
        let incidents = [
            { id: 'inc-01', title: 'High disk pressure on design-macbook-pro (Photoshoot RAW files)', severity: 'Medium', status: 'Open', assigned_agent: 'agent-it-helpdesk' }
        ];

        if (window.AegisStore && window.AegisStore.getState) {
            const st = window.AegisStore.getState();
            if (st.itAssets) assets = st.itAssets;
            if (st.itIncidents) incidents = st.itIncidents;
        }

        try {
            const [assetsRes, incRes] = await Promise.all([
                fetch('/api/itsm/assets').then(r => r.json()).catch(() => null),
                fetch('/api/itsm/incidents').then(r => r.json()).catch(() => null)
            ]);
            if (Array.isArray(assetsRes) && assetsRes.length > 0) assets = assetsRes;
            if (Array.isArray(incRes) && incRes.length > 0) incidents = incRes;
        } catch (e) {
            console.warn('ITSM fetch failed, using AegisStore fallback:', e);
        }

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
        modal.className = 'clay-modal-backdrop';
        modal.innerHTML = `
            <div class="clay-card" style="width:780px; max-width:94vw; max-height:92vh; overflow-y:auto; padding:24px; background:var(--clay-surface); border-radius:24px; box-shadow:0 24px 60px rgba(0,0,0,0.4);">
                <!-- Modal Header -->
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:42px; height:42px; border-radius:14px; background:var(--clay-mint); color:#0E4337; display:flex; align-items:center; justify-content:center; box-shadow:2px 4px 10px rgba(122,232,194,0.4);">
                            ${Icons.get('shield', 22, '#0E4337')}
                        </div>
                        <div>
                            <h3 style="font-size:18px; font-weight:800; color:var(--text-primary); letter-spacing:-0.01em;">Store Architecture &amp; System Topology</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Live visual dependency graph connecting storefront, AI agents, cloud DB &amp; store hardware</p>
                        </div>
                    </div>
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="closeModal(this)" style="width:36px; height:36px;">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>

                <!-- Visual Graphical SVG Architecture Diagram -->
                <div class="clay-card" style="background:#0F172A; border-radius:18px; padding:20px; margin-bottom:16px; position:relative; overflow:hidden;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                        <span style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:#7AE8C2;">LIVE SYSTEM FABRIC • 5 SYNCHRONIZED LAYERS</span>
                        <span class="clay-badge clay-badge-mint" style="font-size:10px;">Zero Latency Drift (38ms)</span>
                    </div>

                    <svg viewBox="0 0 700 240" style="width:100%; height:auto; display:block; filter:drop-shadow(0 4px 12px rgba(0,0,0,0.5));">
                        <!-- Connection Links -->
                        <line x1="100" y1="60" x2="260" y2="120" stroke="#334155" stroke-width="2" stroke-dasharray="4 4" />
                        <line x1="100" y1="180" x2="260" y2="120" stroke="#334155" stroke-width="2" stroke-dasharray="4 4" />
                        <line x1="260" y1="120" x2="440" y2="120" stroke="#FF7C63" stroke-width="3" />
                        <line x1="440" y1="120" x2="600" y2="60" stroke="#7AE8C2" stroke-width="2" />
                        <line x1="440" y1="120" x2="600" y2="180" stroke="#C5B8F9" stroke-width="2" />

                        <!-- Node 1: Storefront / PWA (Top Left) -->
                        <rect x="20" y="30" width="160" height="60" rx="12" fill="#1E293B" stroke="#AEE4FF" stroke-width="1.5" />
                        <circle cx="40" cy="50" r="5" fill="#40C4FF" />
                        <text x="52" y="54" fill="#FFFFFF" font-size="12" font-weight="700">PWA Storefront</text>
                        <text x="40" y="74" fill="#94A3B8" font-size="10">Vercel Edge / iOS PWA</text>

                        <!-- Node 2: Warehouse Scanners & POS (Bottom Left) -->
                        <rect x="20" y="150" width="160" height="60" rx="12" fill="#1E293B" stroke="#FFE88D" stroke-width="1.5" />
                        <circle cx="40" cy="170" r="5" fill="#FFE88D" />
                        <text x="52" y="174" fill="#FFFFFF" font-size="12" font-weight="700">Hardware Fleet</text>
                        <text x="40" y="194" fill="#94A3B8" font-size="10">Bandra POS &amp; Scanners</text>

                        <!-- Node 3: Core Event Bus & Relational DB (Center) -->
                        <rect x="210" y="90" width="180" height="66" rx="14" fill="#1E293B" stroke="#FF7C63" stroke-width="2" />
                        <circle cx="230" cy="112" r="6" fill="#FF7C63" />
                        <text x="244" y="116" fill="#FFFFFF" font-size="13" font-weight="800">Unified Data Fabric</text>
                        <text x="230" y="136" fill="#CBD5E1" font-size="10">SQLite3 &amp; pgvector Store</text>

                        <!-- Node 4: 26 AI Agents Gateway (Right Center) -->
                        <rect x="420" y="90" width="180" height="66" rx="14" fill="#1E293B" stroke="#7AE8C2" stroke-width="2" />
                        <circle cx="440" cy="112" r="6" fill="#7AE8C2" />
                        <text x="454" y="116" fill="#FFFFFF" font-size="13" font-weight="800">26 AI Agent Brain</text>
                        <text x="440" y="136" fill="#CBD5E1" font-size="10">LiteLLM / Gemini 2.0</text>

                        <!-- Node 5: Third Party API Sync (Top Right) -->
                        <rect x="520" y="30" width="160" height="60" rx="12" fill="#1E293B" stroke="#FFBFA9" stroke-width="1.5" />
                        <circle cx="540" cy="50" r="5" fill="#FF7C63" />
                        <text x="552" y="54" fill="#FFFFFF" font-size="12" font-weight="700">Retail APIs</text>
                        <text x="540" y="74" fill="#94A3B8" font-size="10">Shopify &amp; Stripe Sync</text>

                        <!-- Node 6: Courier Logistics (Bottom Right) -->
                        <rect x="520" y="150" width="160" height="60" rx="12" fill="#1E293B" stroke="#C5B8F9" stroke-width="1.5" />
                        <circle cx="540" cy="170" r="5" fill="#C5B8F9" />
                        <text x="552" y="174" fill="#FFFFFF" font-size="12" font-weight="700">Logistics &amp; Docu</text>
                        <text x="540" y="194" fill="#94A3B8" font-size="10">Delhivery &amp; Documenso</text>
                    </svg>

                    <!-- Status indicators -->
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; padding-top:12px; border-top:1px solid #1E293B; font-size:11px; color:#94A3B8;">
                        <span style="color:#7AE8C2; font-weight:700;">✓ All 5 Infrastructure Layers Operational</span>
                        <span>Zero-knowledge Encryption • Bitwarden &amp; TLS 1.3</span>
                    </div>
                </div>

                <div style="display:flex; justify-content:flex-end; gap:10px;">
                    <button class="clay-btn clay-btn-coral" onclick="closeModal(this)">Close Topology View</button>
                </div>
            </div>
        `;
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
        document.body.appendChild(modal);
    }
};

window.ItsmModule = ItsmModule;
