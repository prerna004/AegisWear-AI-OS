// ============================================================================
// Module Group B: Marketing & Customer Experience (Pastel Claymorphic Edition)
// Authentic Setproduct Claymorphism - Zero Emojis - Vector SVG Iconography
// ============================================================================

const MarketingModule = {
    async render(container) {
        let campaigns = [];
        let social = [];

        try {
            const [campRes, socRes] = await Promise.all([
                fetch('/api/marketing/campaigns').then(r => r.json()).catch(() => null),
                fetch('/api/marketing/social').then(r => r.json()).catch(() => null)
            ]);
            campaigns = campRes || (window.AegisStore ? window.AegisStore.getCampaigns() : []);
            social = socRes || (window.AegisStore ? window.AegisStore.getState().social : []);
        } catch (e) {
            campaigns = window.AegisStore ? window.AegisStore.getCampaigns() : [];
            social = window.AegisStore ? window.AegisStore.getState().social : [];
        }

        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:20px;">
                <!-- Simple Explainer Banner -->
                <div class="simple-guide-banner">
                    <div class="simple-guide-icon" style="background:var(--clay-peach);">
                        ${Icons.get('megaphone', 24, 'var(--clay-peach-dark)')}
                    </div>
                    <div>
                        <div style="font-size:15px; font-weight:800; color:var(--text-primary);">Room B: Instagram, Summer Drops &amp; Influencer Ads</div>
                        <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
                            Autonomous AI agents write drop launch announcements, launch multichannel ads, and analyze conversion drop-offs.
                        </div>
                    </div>
                </div>

                <!-- Action Bar -->
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                    <div style="display:flex; gap:10px;">
                        <button class="clay-btn clay-btn-white" onclick="MarketingModule.openCreateCampaignModal()">
                            ${Icons.get('sparkles', 16, 'var(--clay-coral)')}
                            <span>+ Create New Campaign</span>
                        </button>
                        <button class="clay-btn clay-btn-white" onclick="MarketingModule.openCroModal()">
                            ${Icons.get('barChart', 16, 'var(--clay-coral)')}
                            <span>Checkout Funnel Analytics</span>
                        </button>
                    </div>
                    <button class="clay-btn clay-btn-coral" onclick="Copilot.sendQuickPrompt('Generate summer drop email sequence for Oversized Clay Hoodies & Puffy Runners', 'agent-campaign-orchestrator')">
                        ${Icons.get('sparkles', 16, '#FFFFFF')}
                        <span>Generate Summer Drop Brief</span>
                    </button>
                </div>

                <!-- Campaigns & Social Split -->
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:16px;">
                    <!-- Active Campaigns -->
                    <div class="clay-card" style="padding:22px; background:var(--clay-surface);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                            <div>
                                <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Multi-Channel Campaigns</h3>
                                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Automated sequences managed by AI Campaign Orchestrator</p>
                            </div>
                            <span class="clay-badge clay-badge-mint">${campaigns.length} Active</span>
                        </div>
                        <div id="campaigns-list" style="display:flex; flex-direction:column; gap:12px;">
                            ${campaigns.map(c => `
                                <div class="clay-card" id="camp-card-${c.id}" style="padding:16px; background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                                    <div style="flex:1; min-width:220px;">
                                        <div style="display:flex; align-items:center; gap:8px;">
                                            <span style="font-weight:800; font-size:13px; color:var(--text-primary);">${c.name}</span>
                                            <span class="clay-badge clay-badge-lilac">${c.type}</span>
                                            <span class="clay-badge ${c.status === 'Active' ? 'clay-badge-mint' : 'clay-badge-butter'}" id="status-badge-${c.id}">${c.status}</span>
                                        </div>
                                        <p style="font-size:12px; color:var(--text-secondary); margin-top:4px;">${c.generated_brief || 'Multi-platform fashion campaign'}</p>
                                        <div style="display:flex; gap:16px; margin-top:8px; font-size:11px; color:var(--text-muted); flex-wrap:wrap;">
                                            <span>Audience: <strong style="color:var(--text-primary);">${(c.audience_size || 25000).toLocaleString()}</strong></span>
                                            <span>Open Rate: <strong style="color:#10B981;">${c.open_rate || 52.4}%</strong></span>
                                            <span>Click Rate: <strong style="color:var(--clay-coral);">${c.click_rate || 21.6}%</strong></span>
                                            <span>Budget: <strong style="color:var(--text-primary);">$${(c.budget || 5000).toLocaleString()}</strong></span>
                                        </div>
                                    </div>
                                    <div style="display:flex; gap:8px;">
                                        <button class="clay-btn clay-btn-white" style="font-size:11px; padding:6px 14px;" onclick="MarketingModule.openFunnelModal('${c.id}', '${escape(c.name)}')">
                                            Inspect Funnel
                                        </button>
                                        <button class="clay-btn clay-btn-white" style="font-size:11px; padding:6px 12px;" onclick="MarketingModule.toggleCampaignStatus('${c.id}')" id="toggle-btn-${c.id}">
                                            ${c.status === 'Active' ? 'Pause' : 'Resume'}
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Social Sentiment -->
                    <div class="clay-card" style="padding:22px; background:var(--clay-surface);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                            <div>
                                <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Social Media Stream</h3>
                                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Real-time brand mentions &amp; comments</p>
                            </div>
                            <button class="clay-btn clay-btn-white" style="font-size:11px; padding:4px 10px;" onclick="MarketingModule.refreshSocial()">
                                Refresh
                            </button>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:12px;">
                            ${social.map(s => `
                                <div class="clay-card" style="padding:14px; background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border);">
                                    <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px;">
                                        <span class="clay-badge clay-badge-sky">${s.platform}</span>
                                        <span class="clay-badge clay-badge-mint">${(s.sentiment_score * 100).toFixed(0)}% Positive</span>
                                    </div>
                                    <p style="font-size:12px; color:var(--text-primary); margin-top:8px; line-height:1.4;">${s.content}</p>
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; font-size:10px; color:var(--text-muted); font-weight:600;">
                                        <span>${s.engagement_count} engagements</span>
                                        <span>Live Sentiment</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    toggleCampaignStatus(campId) {
        if (!window.AegisStore) return;
        const campaigns = window.AegisStore.getCampaigns();
        const camp = campaigns.find(c => c.id === campId);
        if (!camp) return;

        camp.status = camp.status === 'Active' ? 'Paused' : 'Active';
        window.AegisStore.save();

        const badge = document.getElementById(`status-badge-${campId}`);
        const btn = document.getElementById(`toggle-btn-${campId}`);
        if (badge) {
            badge.textContent = camp.status;
            badge.className = `clay-badge ${camp.status === 'Active' ? 'clay-badge-mint' : 'clay-badge-butter'}`;
        }
        if (btn) {
            btn.textContent = camp.status === 'Active' ? 'Pause' : 'Resume';
        }
        HitlManager.showToast(`Campaign ${camp.name} is now ${camp.status}`, 'mint');
    },

    openCreateCampaignModal() {
        const modal = document.createElement('div');
        modal.className = 'clay-modal-backdrop';
        modal.onclick = (e) => { if (e.target === modal) closeModal(modal); };
        modal.innerHTML = `
            <div class="clay-card clay-modal-box" style="width:680px; max-width:92vw; padding:28px; background:var(--clay-surface);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:40px; height:40px; border-radius:12px; background:var(--clay-coral); color:#FFFFFF; display:flex; align-items:center; justify-content:center;">
                            ${Icons.get('megaphone', 20, '#FFFFFF')}
                        </div>
                        <div>
                            <h3 style="font-size:17px; font-weight:800; color:var(--text-primary);">Launch Multi-Channel Campaign</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Automate cross-platform fashion drops on Instagram, TikTok, and WhatsApp</p>
                        </div>
                    </div>
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="closeModal(this)" style="width:34px; height:34px;">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>

                <div style="display:flex; flex-direction:column; gap:14px;">
                    <div>
                        <label style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Campaign Name</label>
                        <input id="new-camp-name" class="clay-input" type="text" value="Summer Drop 2026: Pastel Hoodies &amp; Puffy Runners Blitz" style="width:100%; margin-top:4px;" />
                    </div>

                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
                        <div>
                            <label style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Channel Type</label>
                            <select id="new-camp-type" class="clay-input" style="width:100%; margin-top:4px;">
                                <option value="Omnichannel">Omnichannel (Instagram, TikTok, WhatsApp)</option>
                                <option value="Social">Social Video Blitz (Instagram Reels &amp; TikTok)</option>
                                <option value="Email">VIP Early Access Lookbook Email</option>
                                <option value="SMS">Flash Drop WhatsApp &amp; SMS Broadcast</option>
                            </select>
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Budget ($)</label>
                            <input id="new-camp-budget" class="clay-input" type="number" value="8500" style="width:100%; margin-top:4px;" />
                        </div>
                    </div>

                    <div>
                        <label style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Estimated Audience Size</label>
                        <input id="new-camp-audience" class="clay-input" type="number" value="45000" style="width:100%; margin-top:4px;" />
                    </div>

                    <div>
                        <label style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">AI Creative Strategy &amp; Pitch</label>
                        <textarea id="new-camp-brief" class="clay-input" rows="3" style="width:100%; margin-top:4px; font-family:inherit; resize:vertical;">Target Gen-Z and luxury streetwear enthusiasts with pastel clay palette videos, featuring 100% organic cotton French Terry and cloud-sole sneakers.</textarea>
                    </div>
                </div>

                <div style="margin-top:20px; display:flex; justify-content:flex-end; gap:10px;">
                    <button class="clay-btn clay-btn-white" onclick="closeModal(this)">Cancel</button>
                    <button class="clay-btn clay-btn-coral" onclick="MarketingModule.submitNewCampaign(this)">
                        ${Icons.get('sparkles', 14, '#FFFFFF')}
                        <span>Launch Campaign Now</span>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    submitNewCampaign(btn) {
        const name = document.getElementById('new-camp-name').value.trim();
        const type = document.getElementById('new-camp-type').value;
        const budget = Number(document.getElementById('new-camp-budget').value) || 5000;
        const audience_size = Number(document.getElementById('new-camp-audience').value) || 25000;
        const brief = document.getElementById('new-camp-brief').value.trim();

        if (!name) {
            HitlManager.showToast('Please provide a campaign name', 'coral');
            return;
        }

        if (window.AegisStore) {
            window.AegisStore.createCampaign({
                name,
                type,
                budget,
                audience_size,
                brief
            });
        }

        closeModal(btn);
        HitlManager.showToast(`Campaign "${name}" launched successfully across all channels!`, 'mint');

        // Re-render
        const container = document.getElementById('module-content-area');
        if (container) this.render(container);
    },

    openFunnelModal(campId, campName) {
        const name = unescape(campName);
        const modal = document.createElement('div');
        modal.className = 'clay-modal-backdrop';
        modal.onclick = (e) => { if (e.target === modal) closeModal(modal); };
        modal.innerHTML = `
            <div class="clay-card clay-modal-box" style="width:680px; max-width:92vw; padding:28px; background:var(--clay-surface);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div>
                        <h3 style="font-size:17px; font-weight:800; color:var(--text-primary);">${name}</h3>
                        <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Real-time conversion telemetry &amp; channel analytics</p>
                    </div>
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="closeModal(this)" style="width:34px; height:34px;">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>
                
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <div class="clay-card" style="padding:14px; background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border);">
                        <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
                            <strong style="color:var(--text-primary);">Step 1: Ad Impressions (Instagram &amp; TikTok)</strong>
                            <span style="color:#10B981; font-weight:800;">48,500 (100%)</span>
                        </div>
                        <div style="height:8px; border-radius:4px; background:#E2E8F0; overflow:hidden;">
                            <div style="width:100%; height:100%; background:var(--clay-coral);"></div>
                        </div>
                    </div>

                    <div class="clay-card" style="padding:14px; background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border);">
                        <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
                            <strong style="color:var(--text-primary);">Step 2: Boutique &amp; Product Page Clicks</strong>
                            <span style="color:#10B981; font-weight:800;">10,476 (21.6%)</span>
                        </div>
                        <div style="height:8px; border-radius:4px; background:#E2E8F0; overflow:hidden;">
                            <div style="width:45%; height:100%; background:var(--clay-mint);"></div>
                        </div>
                    </div>

                    <div class="clay-card" style="padding:14px; background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border);">
                        <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
                            <strong style="color:var(--text-primary);">Step 3: Added to Cart (Hoodies &amp; Sneakers)</strong>
                            <span style="color:#10B981; font-weight:800;">3,880 (8.0%)</span>
                        </div>
                        <div style="height:8px; border-radius:4px; background:#E2E8F0; overflow:hidden;">
                            <div style="width:28%; height:100%; background:var(--clay-sky);"></div>
                        </div>
                    </div>

                    <div class="clay-card" style="padding:14px; background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border);">
                        <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
                            <strong style="color:var(--text-primary);">Step 4: Orders Completed (Stripe Checkout)</strong>
                            <span style="color:#10B981; font-weight:800;">1,420 (2.9%)</span>
                        </div>
                        <div style="height:8px; border-radius:4px; background:#E2E8F0; overflow:hidden;">
                            <div style="width:18%; height:100%; background:#10B981;"></div>
                        </div>
                    </div>
                </div>

                <div style="margin-top:18px; text-align:right;">
                    <button class="clay-btn clay-btn-coral" onclick="closeModal(this)">Close Analytics</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    openCroModal() {
        const modal = document.createElement('div');
        modal.className = 'clay-modal-backdrop';
        modal.onclick = (e) => { if (e.target === modal) closeModal(modal); };
        modal.innerHTML = `
            <div class="clay-card clay-modal-box" style="width:720px; max-width:92vw; padding:28px; background:var(--clay-surface);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:40px; height:40px; border-radius:12px; background:var(--clay-peach); color:var(--clay-peach-dark); display:flex; align-items:center; justify-content:center;">
                            ${Icons.get('barChart', 20, 'var(--clay-peach-dark)')}
                        </div>
                        <div>
                            <h3 style="font-size:17px; font-weight:800; color:var(--text-primary);">Checkout Funnel Analysis</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Step-by-step visitor progression and bounce telemetry</p>
                        </div>
                    </div>
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="closeModal(this)" style="width:34px; height:34px;">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>
                <div class="clay-card" style="background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border); padding:20px; font-size:12px; line-height:2.2; color:var(--text-primary);">
                    <div style="display:flex; justify-content:space-between;">
                        <span>Step 1: Homepage Landing</span>
                        <strong>14,200 visitors (100%)</strong>
                    </div>
                    <div style="display:flex; justify-content:space-between;">
                        <span>Step 2: Summer Drop Lookbook View</span>
                        <strong>8,820 visitors (62.1%)</strong>
                    </div>
                    <div style="display:flex; justify-content:space-between;">
                        <span>Step 3: Size Selection &amp; Cart Addition</span>
                        <strong>4,450 visitors (31.3%)</strong>
                    </div>
                    <div style="display:flex; justify-content:space-between; color:#10B981; font-weight:800;">
                        <span>Step 4: Stripe Checkout Completed</span>
                        <strong>1,420 completed (10.0%)</strong>
                    </div>
                    <div style="margin-top:12px; padding-top:10px; border-top:1px solid var(--clay-nav-border); color:var(--clay-coral); font-weight:700;">
                        Recommendation: 1-click Express Apple Pay / UPI checkout lifted mobile checkout conversion by +22.4%.
                    </div>
                </div>
                <div style="margin-top:18px; text-align:right;">
                    <button class="clay-btn clay-btn-coral" onclick="HitlManager.showToast('Automated A/B experiment launched for checkout', 'mint'); closeModal(this);">
                        Deploy A/B Experiment
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    refreshSocial() {
        HitlManager.showToast('Social feeds refreshed across Instagram, TikTok, and X', 'mint');
    }
};

window.MarketingModule = MarketingModule;
