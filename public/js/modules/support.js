// ============================================================================
// Module Group C: Customer Service & Support (Pastel Claymorphic Edition)
// Authentic Setproduct Claymorphism - Zero Emojis - Vector SVG Iconography
// ============================================================================

const SupportModule = {
    async render(container) {
        const [ticketsRes, kbRes] = await Promise.all([
            fetch('/api/support/tickets').then(r => r.json()),
            fetch('/api/support/kb').then(r => r.json())
        ]);

        const tickets = ticketsRes || [];
        const kb = kbRes || [];

        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:20px;">
                <!-- Simple Explainer Banner -->
                <div class="simple-guide-banner">
                    <div class="simple-guide-icon" style="background:var(--clay-lilac);">
                        ${Icons.get('headset', 24, 'var(--text-on-lilac)')}
                    </div>
                    <div>
                        <div style="font-size:15px; font-weight:800; color:var(--text-primary);">Room C: Size Exchanges & Customer Care</div>
                        <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
                            Autonomous AI agents handle hoodie/sneaker size swaps in 60 seconds, track courier delivery packages, and draft size & fit guides.
                        </div>
                    </div>
                </div>

                <!-- Action Bar -->
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <button class="clay-btn clay-btn-white" onclick="SupportModule.openRemoteAssistModal()">
                        ${Icons.get('mapPin', 16, 'var(--text-primary)')}
                        <span>Live Courier Package Tracking</span>
                    </button>
                    <button class="clay-btn clay-btn-coral" onclick="Copilot.sendQuickPrompt('Analyze open size exchange tickets and generate auto-resolution exchange labels using RAG', 'agent-tier1-2-resolution')">
                        ${Icons.get('zap', 16, '#FFFFFF')}
                        <span>Auto-Solve Size Exchanges</span>
                    </button>
                </div>

                <!-- Tickets & KB Split -->
                <div style="display:grid; grid-template-columns: 2fr 1fr; gap:16px;">
                    <!-- Ticket Queue -->
                    <div class="clay-card" style="padding:22px; background:var(--clay-surface);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                            <div>
                                <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Customer Ticket Queue</h3>
                                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Omnichannel requests from Email, WhatsApp, and Web</p>
                            </div>
                            <span class="clay-badge clay-badge-lilac">${tickets.length} Tickets</span>
                        </div>

                        <div style="display:flex; flex-direction:column; gap:12px;">
                            ${tickets.map(t => `
                                <div class="clay-card" style="padding:16px; background:var(--clay-surface); display:flex; justify-content:space-between; align-items:flex-start;">
                                    <div>
                                        <div style="display:flex; align-items:center; gap:8px;">
                                            <span style="font-weight:800; font-size:13px; color:var(--text-primary);">${t.subject}</span>
                                            <span class="clay-badge ${t.priority === 'Urgent' ? 'clay-badge-coral' : 'clay-badge-butter'}">
                                                ${t.priority}
                                            </span>
                                            <span class="clay-badge ${t.sentiment === 'Frustrated' ? 'clay-badge-coral' : 'clay-badge-sky'}">
                                                ${t.sentiment}
                                            </span>
                                        </div>
                                        <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">
                                            Customer: <strong>${t.customer_name}</strong> • Department: ${t.department}
                                        </div>
                                        <p style="font-size:11px; color:var(--text-secondary); margin-top:8px; background:var(--clay-surface-recessed); padding:10px 14px; border-radius:12px;">
                                            ${t.resolution_notes || 'Pending autonomous RAG size exchange'}
                                        </p>
                                    </div>
                                    <div style="display:flex; flex-direction:column; align-items:flex-end; gap:8px;">
                                        <span style="font-size:10px; color:var(--clay-coral); font-weight:800;">SLA: 4h threshold</span>
                                        <button class="clay-btn clay-btn-coral" style="font-size:11px; padding:6px 14px;" onclick="Copilot.sendQuickPrompt('Resolve ticket: ${t.subject}', 'agent-tier1-2-resolution')">
                                            Auto-Solve
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Auto-Authored KB -->
                    <div class="clay-card" style="padding:22px; background:var(--clay-surface);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                            <div>
                                <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Knowledge Base</h3>
                                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Synthesized autonomously by AI</p>
                            </div>
                            <button class="clay-btn clay-btn-white" style="font-size:11px; padding:4px 10px;" onclick="Copilot.sendQuickPrompt('Synthesize resolved tickets into new public knowledge base article', 'agent-auto-kb')">
                                Write Article
                            </button>
                        </div>

                        <div style="display:flex; flex-direction:column; gap:12px;">
                            ${kb.map(k => `
                                <div class="clay-card" style="padding:14px; background:var(--clay-surface);">
                                    <div style="display:flex; justify-content:space-between; align-items:center;">
                                        <span style="font-weight:800; font-size:13px; color:var(--text-primary);">${k.title}</span>
                                        <span class="clay-badge clay-badge-sky">${k.category}</span>
                                    </div>
                                    <p style="font-size:11px; color:var(--text-secondary); margin-top:6px; line-height:1.4;">${k.content.substring(0, 100)}...</p>
                                    <div style="display:flex; justify-content:space-between; margin-top:8px; font-size:10px; color:var(--text-muted); font-weight:600;">
                                        <span>${k.views} views</span>
                                        <span>${k.helpful_count} upvotes</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    openRemoteAssistModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `position:fixed; inset:0; background:rgba(31,36,56,0.6); backdrop-filter:blur(8px); z-index:10000; display:flex; align-items:center; justify-content:center;`;
        modal.innerHTML = `
            <div class="clay-card" style="width:760px; max-width:92vw; padding:28px; background:var(--clay-surface);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:40px; height:40px; border-radius:12px; background:var(--clay-lilac); color:var(--text-on-lilac); display:flex; align-items:center; justify-content:center;">
                            ${Icons.get('desktop', 20, 'var(--text-on-lilac)')}
                        </div>
                        <div>
                            <h3 style="font-size:17px; font-weight:800; color:var(--text-primary);">RustDesk: Browser Remote Desktop Session</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Zero-install WebRTC remote desktop protocol</p>
                        </div>
                    </div>
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="this.closest('div[style*=\\'position:fixed\\']').remove()" style="width:34px; height:34px;">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>
                <div class="clay-card" style="background:#0F172A; padding:20px; border-radius:18px;">
                    <div style="font-size:11px; color:#94A3B8; margin-bottom:10px; font-family:var(--font-mono);">Client Endpoint: fleet-gw-nordic-418.iot (Status: Active)</div>
                    <div style="color:#22C55E; font-family:var(--font-mono); font-size:12px; text-align:left; line-height:1.8;">
                        root@fleet-gw-418:~# uptime<br>
                        12:08:12 up 48 days, 14:12, 1 active session<br>
                        root@fleet-gw-418:~# df -h /<br>
                        Filesystem      Size  Used Avail Use% Mounted on<br>
                        /dev/sda1        40G   37G  2.8G  93% / [HIGH DISK WARNING]<br>
                        root@fleet-gw-418:~# _
                    </div>
                </div>
                <div style="margin-top:18px; display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:12px; color:var(--clay-coral); font-weight:700;">Level 3 Safety: Remote script execution requires human sign-off</span>
                    <button class="clay-btn clay-btn-coral" onclick="Copilot.sendQuickPrompt('Diagnose disk usage alert on fleet-gw-nordic-418.iot and prepare clean script', 'agent-it-helpdesk'); this.closest('div[style*=\\'position:fixed\\']').remove();">
                        Execute Remediation (HITL)
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
};

window.SupportModule = SupportModule;
