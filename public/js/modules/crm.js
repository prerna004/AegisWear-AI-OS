// ============================================================================
// Module Group A: Sales, CRM & Revenue Operations (Pastel Claymorphic Edition)
// Authentic Setproduct Claymorphism - Zero Emojis - Vector SVG Iconography
// ============================================================================

const CrmModule = {
    async render(container) {
        const [leadsRes, dealsRes, quotesRes] = await Promise.all([
            fetch('/api/crm/leads').then(r => r.json()),
            fetch('/api/crm/deals').then(r => r.json()),
            fetch('/api/crm/quotes').then(r => r.json())
        ]);

        const leads = leadsRes || [];
        const deals = dealsRes || [];
        const quotes = quotesRes || [];

        const totalPipeline = deals.reduce((sum, d) => sum + (d.amount || 0), 0);
        const wonRevenue = deals.filter(d => d.stage === 'closed_won').reduce((sum, d) => sum + (d.amount || 0), 0);

        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:20px;">
                <!-- Simple Explainer Banner -->
                <div class="simple-guide-banner">
                    <div class="simple-guide-icon" style="background:var(--clay-coral);">
                        ${Icons.get('briefcase', 24, '#FFFFFF')}
                    </div>
                    <div>
                        <div style="font-size:15px; font-weight:800; color:var(--text-primary);">Room A: Wholesale Boutiques & Bulk Deals</div>
                        <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
                            Autonomous AI agents find boutique retail buyers, calculate buyer match scores (0-100), plan boutique sales routes, and draft wholesale purchase agreements.
                        </div>
                    </div>
                </div>

                <!-- Action Bar & Stats -->
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; gap:10px;">
                        <button class="clay-btn clay-btn-white" onclick="CrmModule.openRouteIQModal()">
                            ${Icons.get('mapPin', 16, 'var(--clay-coral)')}
                            <span>Boutique Route Map</span>
                        </button>
                        <button class="clay-btn clay-btn-white" onclick="CrmModule.openDocumensoSignModal()">
                            ${Icons.get('fileText', 16, 'var(--clay-coral)')}
                            <span>Digital Contracts</span>
                        </button>
                    </div>
                    <button class="clay-btn clay-btn-coral" onclick="Copilot.sendQuickPrompt('Draft personalized wholesale lookbook partnership email for Nordic Streetwear Boutique', 'agent-sdr')">
                        ${Icons.get('zap', 16, '#FFFFFF')}
                        <span>Draft Wholesale Outreach</span>
                    </button>
                </div>

                <!-- 4 Quick Stats -->
                <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:14px;">
                    <div class="clay-card" style="padding:18px;">
                        <div style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Total Deals Pipeline</div>
                        <div style="font-size:24px; font-weight:800; color:var(--text-primary); margin-top:6px; font-family:var(--font-mono);">$${totalPipeline.toLocaleString()}</div>
                        <div style="font-size:11px; color:#10B981; font-weight:700; margin-top:4px;">+28% month-over-month</div>
                    </div>
                    <div class="clay-card" style="padding:18px;">
                        <div style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Closed & Paid Revenue</div>
                        <div style="font-size:24px; font-weight:800; color:#10B981; margin-top:6px; font-family:var(--font-mono);">$${wonRevenue.toLocaleString()}</div>
                        <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">100% margin verified</div>
                    </div>
                    <div class="clay-card" style="padding:18px;">
                        <div style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Qualified Leads</div>
                        <div style="font-size:24px; font-weight:800; color:var(--clay-coral); margin-top:6px; font-family:var(--font-mono);">${leads.filter(l => l.score >= 80).length} / ${leads.length}</div>
                        <div style="font-size:11px; color:var(--text-secondary); margin-top:4px;">Scored 80+ by AI</div>
                    </div>
                    <div class="clay-card" style="padding:18px;">
                        <div style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Awaiting Sign-off</div>
                        <div style="font-size:24px; font-weight:800; color:var(--clay-coral); margin-top:6px; font-family:var(--font-mono);">${quotes.filter(q => q.status === 'pending_hitl').length} Quotes</div>
                        <div style="font-size:11px; color:var(--clay-coral); font-weight:700; margin-top:4px;">Level 3 HITL guardrail</div>
                    </div>
                </div>

                <!-- Pipeline & Leads Split -->
                <div style="display:grid; grid-template-columns: 2fr 1fr; gap:16px;">
                    <!-- Deals Pipeline Kanban -->
                    <div class="clay-card" style="padding:20px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                            <div>
                                <h3 style="font-size:14px; font-weight:800; color:var(--text-primary);">Deals Pipeline</h3>
                                <p style="font-size:11px; color:var(--text-muted);">Stages from discovery call to closed contract</p>
                            </div>
                            <button class="clay-btn clay-btn-white" style="font-size:11px; padding:6px 12px;" onclick="Copilot.sendQuickPrompt('Run Monte Carlo simulation to forecast pipeline closing probability', 'agent-pipeline-forecast')">
                                Forecast Deals
                            </button>
                        </div>

                        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:10px;">
                            ${['qualification', 'proposal', 'negotiation', 'closed_won'].map(stage => {
                                const stageDeals = deals.filter(d => d.stage === stage);
                                const stageTitles = { qualification: 'Qualification', proposal: 'Proposal', negotiation: 'Negotiation', closed_won: 'Closed Won' };
                                return `
                                    <div style="background:var(--clay-surface-recessed); border-radius:18px; padding:12px;">
                                        <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:800; color:var(--text-muted); margin-bottom:10px; text-transform:uppercase;">
                                            <span>${stageTitles[stage]}</span>
                                            <span class="clay-badge clay-badge-white" style="font-size:9px; padding:2px 8px;">${stageDeals.length}</span>
                                        </div>
                                        <div style="display:flex; flex-direction:column; gap:8px;">
                                            ${stageDeals.map(d => `
                                                <div class="clay-card" style="padding:12px; font-size:12px; background:var(--clay-surface);">
                                                    <div style="font-weight:700; color:var(--text-primary); margin-bottom:2px;">${d.title}</div>
                                                    <div style="font-size:11px; color:var(--text-muted);">${d.account_name}</div>
                                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                                                        <strong style="color:#10B981; font-family:var(--font-mono); font-size:13px;">$${Number(d.amount).toLocaleString()}</strong>
                                                        <span class="clay-badge ${d.probability >= 80 ? 'clay-badge-mint' : 'clay-badge-butter'}" style="font-size:9px;">${d.probability}%</span>
                                                    </div>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Leads List -->
                    <div class="clay-card" style="padding:20px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                            <div>
                                <h3 style="font-size:14px; font-weight:800; color:var(--text-primary);">Boutique Leads</h3>
                                <p style="font-size:11px; color:var(--text-muted);">Scored 0-100 for fashion boutique fit</p>
                            </div>
                            <span class="clay-badge clay-badge-mint">${leads.length} Boutiques</span>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:10px; max-height:420px; overflow-y:auto;">
                            ${leads.map(l => `
                                <div class="clay-card" style="padding:12px; background:var(--clay-surface);">
                                    <div style="display:flex; justify-content:space-between; align-items:center;">
                                        <div style="font-weight:700; font-size:13px; color:var(--text-primary);">${l.name}</div>
                                        <span class="clay-badge ${l.score >= 90 ? 'clay-badge-mint' : 'clay-badge-butter'}">
                                            Score: ${l.score}/100
                                        </span>
                                    </div>
                                    <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">${l.company}</div>
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                                        <span class="clay-badge clay-badge-white" style="font-size:9px;">Intent: ${l.intent}</span>
                                        <button class="clay-btn clay-btn-white" style="font-size:10px; padding:4px 10px;" onclick="Copilot.sendQuickPrompt('Draft personalized wholesale lookbook email for ${l.name} at ${l.company}', 'agent-sdr')">
                                            Draft Lookbook
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- CPQ Quotes & Discount Guardrails -->
                <div class="clay-card" style="padding:20px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                        <div>
                            <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Wholesale Price Quotes & Margin Governance</h3>
                            <p style="font-size:11px; color:var(--text-muted);">Discounts greater than 10% pause execution and require Boss Sign-Off approval.</p>
                        </div>
                        <button class="clay-btn clay-btn-coral" onclick="CrmModule.openNewQuoteModal()">Create Wholesale Quote</button>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:10px;">
                        ${quotes.map(q => `
                            <div class="clay-card" style="padding:14px 18px; display:flex; justify-content:space-between; align-items:center; background:var(--clay-surface);">
                                <div>
                                    <div style="display:flex; align-items:center; gap:8px;">
                                        <span style="font-weight:800; font-size:13px; color:var(--text-primary);">${q.client_name}</span>
                                        <span class="clay-badge ${q.status === 'approved' ? 'clay-badge-mint' : (q.status === 'pending_hitl' ? 'clay-badge-coral' : 'clay-badge-butter')}">
                                            ${q.status === 'pending_hitl' ? 'AWAITING APPROVAL' : q.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div style="font-size:11px; color:var(--text-muted); margin-top:3px;">
                                        Discount: ${q.discount_percent}% • Profit Margin: ${q.margin_percent}%
                                    </div>
                                </div>
                                <div style="display:flex; align-items:center; gap:14px;">
                                    <span style="font-size:18px; font-weight:800; color:var(--text-primary); font-family:var(--font-mono);">$${Number(q.total_amount).toLocaleString()}</span>
                                    ${q.status === 'pending_hitl' ? `
                                        <button class="clay-btn clay-btn-coral" style="padding:8px 16px; font-size:11px;" onclick="HitlManager.resolve('hitl-01', 'approved')">
                                            Approve Discount
                                        </button>
                                    ` : `
                                        <button class="clay-btn clay-btn-white" style="font-size:11px; padding:6px 14px;" onclick="CrmModule.openDocumensoSignModal('${q.id}')">
                                            E-Sign Contract
                                        </button>
                                    `}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    openRouteIQModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `position:fixed; inset:0; background:rgba(31,36,56,0.6); backdrop-filter:blur(8px); z-index:10000; display:flex; align-items:center; justify-content:center;`;
        modal.innerHTML = `
            <div class="clay-card" style="width:720px; max-width:92vw; padding:28px; background:var(--clay-surface);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:40px; height:40px; border-radius:12px; background:var(--clay-coral); color:#FFFFFF; display:flex; align-items:center; justify-content:center;">
                            ${Icons.get('mapPin', 20, '#FFFFFF')}
                        </div>
                        <div>
                            <h3 style="font-size:17px; font-weight:800; color:var(--text-primary);">RouteIQ: Sales Travel Optimization</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">AI waypoint clustering minimizes transit time and fuel expenditure</p>
                        </div>
                    </div>
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="this.closest('div[style*=\\'position:fixed\\']').remove()" style="width:34px; height:34px;">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>
                <div class="clay-card" style="background:#F8FAFC; padding:18px; font-size:12px; font-family:var(--font-mono); color:var(--text-primary); line-height:2.2;">
                    Stop 1: Apex BioSystems (Bandra-Kurla Complex) — 10:15 AM (Check-in Ready)<br>
                    Stop 2: Hinduja Health Corridor (Mahim) — 12:45 PM<br>
                    Stop 3: Kokilaben Labs (Andheri West) — 03:30 PM (Via Coastal Freeway)<br>
                    Total Distance: 34.2 km • Estimated 24.8% transit time reduction
                </div>
                <div style="margin-top:18px; text-align:right;">
                    <button class="clay-btn clay-btn-coral" onclick="HitlManager.showToast('Driving itinerary dispatched to rep mobile device', 'mint'); this.closest('div[style*=\\'position:fixed\\']').remove()">
                        Dispatch Itinerary
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    openDocumensoSignModal(quoteId = 'quote-801') {
        const modal = document.createElement('div');
        modal.style.cssText = `position:fixed; inset:0; background:rgba(31,36,56,0.6); backdrop-filter:blur(8px); z-index:10000; display:flex; align-items:center; justify-content:center;`;
        modal.innerHTML = `
            <div class="clay-card" style="width:660px; max-width:92vw; padding:28px; background:var(--clay-surface);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:40px; height:40px; border-radius:12px; background:var(--clay-coral); color:#FFFFFF; display:flex; align-items:center; justify-content:center;">
                            ${Icons.get('pen', 20, '#FFFFFF')}
                        </div>
                        <div>
                            <h3 style="font-size:17px; font-weight:800; color:var(--text-primary);">Documenso: Digital Signature Envelope</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Cryptographic e-signature package with SHA-256 tamper-evident seal</p>
                        </div>
                    </div>
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="this.closest('div[style*=\\'position:fixed\\']').remove()" style="width:34px; height:34px;">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>
                <div class="clay-card" style="background:#F8FAFC; padding:18px; font-size:12px; line-height:1.8;">
                    <div><strong>Document:</strong> Enterprise Software License (${quoteId})</div>
                    <div><strong>Signer 1:</strong> Prerna Chotwani (Chief AI Architect)</div>
                    <div><strong>Signer 2:</strong> Chief Technology Officer (Client Enterprise)</div>
                    <div style="margin-top:8px; color:#10B981; font-weight:700;">Cryptographic certificate verification complete</div>
                </div>
                <div style="margin-top:18px; display:flex; justify-content:flex-end; gap:10px;">
                    <button class="clay-btn clay-btn-white" onclick="this.closest('div[style*=\\'position:fixed\\']').remove()">Cancel</button>
                    <button class="clay-btn clay-btn-coral" onclick="HitlManager.showToast('Contract dispatched for signature via Documenso', 'mint'); this.closest('div[style*=\\'position:fixed\\']').remove();">
                        Dispatch Envelope
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    openNewQuoteModal() {
        Copilot.sendQuickPrompt('Create new CPQ quote with 12% special discount for enterprise customer', 'agent-deal-desk');
    }
};

window.CrmModule = CrmModule;
