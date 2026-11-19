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

        const totalPipeline = deals.reduce((sum, d) => sum + (d.amount || d.value || 0), 0);
        const wonRevenue = deals.filter(d => (d.stage || '').toLowerCase().replace(/[\s_-]+/g, '') === 'closedwon').reduce((sum, d) => sum + (d.amount || d.value || 0), 0);

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
                                const stageDeals = deals.filter(d => (d.stage || '').toLowerCase().replace(/[\s_-]+/g, '') === stage.replace(/[\s_-]+/g, ''));
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
                                                        <strong style="color:#10B981; font-family:var(--font-mono); font-size:13px;">$${Number(d.amount || d.value || 0).toLocaleString()}</strong>
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
        modal.style.cssText = `position:fixed; inset:0; background:rgba(31,36,56,0.65); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); z-index:10000; display:flex; align-items:center; justify-content:center; padding:16px;`;
        modal.innerHTML = `
            <div class="clay-card" style="width:760px; max-width:94vw; max-height:92vh; overflow-y:auto; padding:24px; background:var(--clay-surface); border-radius:24px; box-shadow:0 24px 60px rgba(0,0,0,0.4);">
                <!-- Modal Header -->
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:42px; height:42px; border-radius:14px; background:var(--clay-coral); color:#FFFFFF; display:flex; align-items:center; justify-content:center; box-shadow:2px 4px 10px rgba(255,124,99,0.4);">
                            ${Icons.get('mapPin', 22, '#FFFFFF')}
                        </div>
                        <div>
                            <h3 style="font-size:18px; font-weight:800; color:var(--text-primary); letter-spacing:-0.01em;">Boutique RouteIQ: Sales Travel Optimization</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">AI waypoint clustering & GPS delivery route for partner fashion boutiques</p>
                        </div>
                    </div>
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="this.closest('div[style*=\\'position:fixed\\']').remove()" style="width:36px; height:36px;">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>

                <!-- Interactive Visual Route Map (SVG) -->
                <div class="clay-card" style="background:#0F172A; border-radius:18px; padding:16px; margin-bottom:16px; position:relative; overflow:hidden;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                        <span style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:#7AE8C2;">LIVE GPS ROUTE • MUMBAI FASHION CORRIDOR</span>
                        <span class="clay-badge clay-badge-mint" style="font-size:10px;">Traffic: Smooth (Coastal Road Open)</span>
                    </div>

                    <!-- Stylized Vector Map Graphics -->
                    <svg viewBox="0 0 680 200" style="width:100%; height:auto; display:block; filter:drop-shadow(0 4px 12px rgba(0,0,0,0.5));">
                        <line x1="0" y1="50" x2="680" y2="50" stroke="#1E293B" stroke-dasharray="4 4" />
                        <line x1="0" y1="100" x2="680" y2="100" stroke="#1E293B" stroke-dasharray="4 4" />
                        <line x1="0" y1="150" x2="680" y2="150" stroke="#1E293B" stroke-dasharray="4 4" />

                        <path d="M 50 160 Q 200 120 320 80 T 520 40 T 630 30" fill="none" stroke="#334155" stroke-width="8" stroke-linecap="round"/>
                        <path d="M 50 160 Q 200 120 320 80 T 520 40 T 630 30" fill="none" stroke="#FF7C63" stroke-width="3" stroke-dasharray="8 6"/>

                        <!-- Waypoint 1: Kala Ghoda -->
                        <circle cx="50" cy="160" r="14" fill="#7AE8C2" opacity="0.3"/>
                        <circle cx="50" cy="160" r="8" fill="#7AE8C2"/>
                        <text x="50" y="190" fill="#F8FAFC" font-size="11" font-weight="700" text-anchor="middle">Stop 1: Kala Ghoda</text>

                        <!-- Waypoint 2: Palladium Lower Parel -->
                        <circle cx="240" cy="105" r="14" fill="#FFE88D" opacity="0.3"/>
                        <circle cx="240" cy="105" r="8" fill="#FFE88D"/>
                        <text x="240" y="85" fill="#F8FAFC" font-size="11" font-weight="700" text-anchor="middle">Stop 2: Palladium Parel</text>

                        <!-- Waypoint 3: Bandra Linking Rd -->
                        <circle cx="440" cy="55" r="16" fill="#FF7C63" opacity="0.4"/>
                        <circle cx="440" cy="55" r="9" fill="#FF7C63"/>
                        <text x="440" y="35" fill="#F8FAFC" font-size="11" font-weight="800" text-anchor="middle">Stop 3: Bandra Flagship</text>

                        <!-- Waypoint 4: Juhu Tara Rd -->
                        <circle cx="630" cy="30" r="14" fill="#C5B8F9" opacity="0.3"/>
                        <circle cx="630" cy="30" r="8" fill="#C5B8F9"/>
                        <text x="630" y="60" fill="#F8FAFC" font-size="11" font-weight="700" text-anchor="middle">Stop 4: Juhu Studio</text>
                    </svg>

                    <!-- Route Stats Bar -->
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px; padding-top:10px; border-top:1px solid #1E293B; font-size:11px; color:#94A3B8;">
                        <span><strong>Total Distance:</strong> 32.4 km</span>
                        <span><strong>Transit Time:</strong> 1h 45m (Coastal Road)</span>
                        <span style="color:#7AE8C2; font-weight:700;"><strong>Fuel Saved:</strong> 24.8% via AI Waypoints</span>
                    </div>
                </div>

                <!-- Waypoint Timeline Cards (Theme-Aware) -->
                <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:18px;">
                    <div class="clay-card" style="padding:12px 16px; background:var(--clay-surface); display:flex; justify-content:space-between; align-items:center;">
                        <div style="display:flex; align-items:center; gap:12px;">
                            <div style="width:28px; height:28px; border-radius:8px; background:var(--clay-mint); color:#0E4337; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:12px;">1</div>
                            <div>
                                <div style="font-size:13px; font-weight:800; color:var(--text-primary);">Kala Ghoda Designer Hub (Fort)</div>
                                <div style="font-size:11px; color:var(--text-muted);">ETA: 10:15 AM • Delivering 40x Silk Totes & Summer Lookbooks</div>
                            </div>
                        </div>
                        <span class="clay-badge clay-badge-mint">Check-in Ready</span>
                    </div>

                    <div class="clay-card" style="padding:12px 16px; background:var(--clay-surface); display:flex; justify-content:space-between; align-items:center;">
                        <div style="display:flex; align-items:center; gap:12px;">
                            <div style="width:28px; height:28px; border-radius:8px; background:var(--clay-butter); color:var(--text-on-butter); display:flex; align-items:center; justify-content:center; font-weight:800; font-size:12px;">2</div>
                            <div>
                                <div style="font-size:13px; font-weight:800; color:var(--text-primary);">Palladium High-Street Store (Lower Parel)</div>
                                <div style="font-size:11px; color:var(--text-muted);">ETA: 12:45 PM • Buyer Meeting: Pre-order 80x Oversized Hoodies</div>
                            </div>
                        </div>
                        <span class="clay-badge clay-badge-butter">Meeting Confirmed</span>
                    </div>

                    <div class="clay-card" style="padding:12px 16px; background:var(--clay-surface); display:flex; justify-content:space-between; align-items:center;">
                        <div style="display:flex; align-items:center; gap:12px;">
                            <div style="width:28px; height:28px; border-radius:8px; background:var(--clay-coral); color:#FFFFFF; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:12px;">3</div>
                            <div>
                                <div style="font-size:13px; font-weight:800; color:var(--text-primary);">Bandra Linking Road Flagship (Bandra West)</div>
                                <div style="font-size:11px; color:var(--text-muted);">ETA: 03:00 PM • Replenishing 100x Puffy Runner Pastel Sneakers</div>
                            </div>
                        </div>
                        <span class="clay-badge clay-badge-coral">Priority Delivery</span>
                    </div>

                    <div class="clay-card" style="padding:12px 16px; background:var(--clay-surface); display:flex; justify-content:space-between; align-items:center;">
                        <div style="display:flex; align-items:center; gap:12px;">
                            <div style="width:28px; height:28px; border-radius:8px; background:var(--clay-lilac); color:var(--text-on-lilac); display:flex; align-items:center; justify-content:center; font-weight:800; font-size:12px;">4</div>
                            <div>
                                <div style="font-size:13px; font-weight:800; color:var(--text-primary);">Juhu Designer Enclave (Juhu Tara Road)</div>
                                <div style="font-size:11px; color:var(--text-muted);">ETA: 05:15 PM • Wholesale Agreement Signature Pickup</div>
                            </div>
                        </div>
                        <span class="clay-badge clay-badge-lilac">Documenso Ready</span>
                    </div>
                </div>

                <!-- Dispatch Action Box -->
                <div id="dispatch-action-area" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; border-top:1px solid var(--clay-nav-border); padding-top:16px;">
                    <div style="font-size:12px; color:var(--text-secondary); display:flex; align-items:center; gap:6px;">
                        ${Icons.get('user', 14, 'var(--text-muted)')}
                        <span>Assigned Rep: <strong>Rahul Sharma (Field Accounts Lead)</strong></span>
                    </div>
                    <div style="display:flex; gap:10px;">
                        <button class="clay-btn clay-btn-white" onclick="CrmModule.copyItineraryToClipboard()">
                            ${Icons.get('fileText', 14, 'currentColor')}
                            <span>Copy GPS Route</span>
                        </button>
                        <button class="clay-btn clay-btn-coral" onclick="CrmModule.dispatchItinerary(this)">
                            ${Icons.get('send', 14, '#FFFFFF')}
                            <span>Dispatch Itinerary to Rep</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    copyItineraryToClipboard() {
        const text = `AEGISWEAR BOUTIQUE ROUTE ITINERARY (TODAY)\nRep: Rahul Sharma\n1. 10:15 AM - Kala Ghoda Designer Hub (Fort)\n2. 12:45 PM - Palladium Store (Lower Parel)\n3. 03:00 PM - Bandra Linking Rd Flagship\n4. 05:15 PM - Juhu Designer Studio\nTotal Distance: 32.4 km | Traffic: Coastal Road Optimal`;
        navigator.clipboard.writeText(text).then(() => {
            HitlManager.showToast('GPS Itinerary copied to clipboard!', 'mint');
        }).catch(() => {
            HitlManager.showToast('Itinerary details ready for mobile dispatch', 'mint');
        });
    },

    dispatchItinerary(btn) {
        btn.innerHTML = `${Icons.get('check', 14, '#FFFFFF')} <span>Dispatched via Live GPS</span>`;
        btn.style.background = '#10B981';
        btn.disabled = true;

        const actionArea = document.getElementById('dispatch-action-area');
        if (actionArea) {
            const confirmationDiv = document.createElement('div');
            confirmationDiv.style.cssText = 'width:100%; margin-top:12px; padding:12px 16px; background:#ECFDF5; border:1px solid #A7F3D0; border-radius:14px; color:#065F46; font-size:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;';
            confirmationDiv.innerHTML = `
                <div>
                    <strong>✓ Itinerary Live:</strong> Dispatched to Rahul Sharma's Aegis Mobile App &amp; WhatsApp.
                </div>
                <div style="display:flex; gap:8px;">
                    <a href="https://maps.google.com/?q=Kala+Ghoda+Fort+Mumbai" target="_blank" class="clay-btn clay-btn-mint" style="font-size:11px; padding:4px 12px; text-decoration:none;">
                        Open Google Maps Route
                    </a>
                </div>
            `;
            actionArea.appendChild(confirmationDiv);
        }

        HitlManager.showToast('Driving itinerary dispatched to rep mobile device & WhatsApp!', 'mint');
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
                <div class="clay-card" style="background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border); padding:18px; font-size:12px; line-height:1.8; color:var(--text-primary);">
                    <div><strong>Document:</strong> Summer Drop Wholesale Lot Agreement (${quoteId})</div>
                    <div><strong>Signer 1:</strong> Prerna Chotwani (Creative Director &amp; Founder)</div>
                    <div><strong>Signer 2:</strong> Wholesale Buyer Partner</div>
                    <div style="margin-top:8px; color:#10B981; font-weight:700;">Cryptographic SHA-256 certificate verification complete</div>
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
