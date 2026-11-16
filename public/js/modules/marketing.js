// ============================================================================
// Module Group B: Marketing & Customer Experience (Pastel Claymorphic Edition)
// Authentic Setproduct Claymorphism - Zero Emojis - Vector SVG Iconography
// ============================================================================

const MarketingModule = {
    async render(container) {
        const [campRes, socRes] = await Promise.all([
            fetch('/api/marketing/campaigns').then(r => r.json()),
            fetch('/api/marketing/social').then(r => r.json())
        ]);

        const campaigns = campRes || [];
        const social = socRes || [];

        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:20px;">
                <!-- Simple Explainer Banner -->
                <div class="simple-guide-banner">
                    <div class="simple-guide-icon" style="background:var(--clay-peach);">
                        ${Icons.get('megaphone', 24, 'var(--clay-peach-dark)')}
                    </div>
                    <div>
                        <div style="font-size:15px; font-weight:800; color:var(--text-primary);">Room B: Instagram, Summer Drops & Influencer Ads</div>
                        <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
                            Autonomous AI agents write drop launch announcements, monitor Instagram comments, and catch customer rage clicks at checkout.
                        </div>
                    </div>
                </div>

                <!-- Action Bar -->
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <button class="clay-btn clay-btn-white" onclick="MarketingModule.openCroModal()">
                        ${Icons.get('barChart', 16, 'var(--clay-coral)')}
                        <span>Checkout Funnel Analytics</span>
                    </button>
                    <button class="clay-btn clay-btn-coral" onclick="Copilot.sendQuickPrompt('Generate summer drop email sequence for Oversized Clay Hoodies & Puffy Runners', 'agent-campaign-orchestrator')">
                        ${Icons.get('sparkles', 16, '#FFFFFF')}
                        <span>Generate Summer Drop Brief</span>
                    </button>
                </div>

                <!-- Campaigns & Social Split -->
                <div style="display:grid; grid-template-columns: 2fr 1fr; gap:16px;">
                    <!-- Active Campaigns -->
                    <div class="clay-card" style="padding:22px; background:var(--clay-surface);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                            <div>
                                <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Multi-Channel Campaigns</h3>
                                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Automated sequences managed by Mautic & AI orchestrator</p>
                            </div>
                            <span class="clay-badge clay-badge-mint">Mautic Engine</span>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:12px;">
                            ${campaigns.map(c => `
                                <div class="clay-card" style="padding:16px; background:var(--clay-surface); display:flex; justify-content:space-between; align-items:center;">
                                    <div>
                                        <div style="display:flex; align-items:center; gap:8px;">
                                            <span style="font-weight:800; font-size:13px; color:var(--text-primary);">${c.name}</span>
                                            <span class="clay-badge clay-badge-lilac">${c.type}</span>
                                        </div>
                                        <p style="font-size:12px; color:var(--text-secondary); margin-top:4px;">${c.generated_brief}</p>
                                        <div style="display:flex; gap:16px; margin-top:8px; font-size:11px; color:var(--text-muted);">
                                            <span>Audience: <strong style="color:var(--text-primary);">${c.audience_size.toLocaleString()}</strong></span>
                                            <span>Open Rate: <strong style="color:#10B981;">${c.open_rate}%</strong></span>
                                            <span>Click Rate: <strong style="color:var(--clay-coral);">${c.click_rate}%</strong></span>
                                        </div>
                                    </div>
                                    <button class="clay-btn clay-btn-white" style="font-size:11px; padding:6px 14px;" onclick="Copilot.sendQuickPrompt('Analyze conversion drop-offs for campaign ${c.name}', 'agent-cro-analyst')">
                                        Inspect Funnel
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Social Sentiment -->
                    <div class="clay-card" style="padding:22px; background:var(--clay-surface);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                            <div>
                                <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Social Media Stream</h3>
                                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Real-time brand mentions</p>
                            </div>
                            <button class="clay-btn clay-btn-white" style="font-size:11px; padding:4px 10px;" onclick="Copilot.sendQuickPrompt('Monitor social streams for brand sentiment spikes', 'agent-social-listening')">
                                Refresh
                            </button>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:12px;">
                            ${social.map(s => `
                                <div class="clay-card" style="padding:14px; background:var(--clay-surface);">
                                    <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px;">
                                        <span class="clay-badge clay-badge-sky">${s.platform}</span>
                                        <span class="clay-badge clay-badge-mint">${(s.sentiment_score * 100).toFixed(0)}% Positive</span>
                                    </div>
                                    <p style="font-size:12px; color:var(--text-primary); margin-top:8px; line-height:1.4;">${s.content}</p>
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; font-size:10px; color:var(--text-muted); font-weight:600;">
                                        <span>${s.engagement_count} engagements</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    openCroModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `position:fixed; inset:0; background:rgba(31,36,56,0.6); backdrop-filter:blur(8px); z-index:10000; display:flex; align-items:center; justify-content:center;`;
        modal.innerHTML = `
            <div class="clay-card" style="width:720px; max-width:92vw; padding:28px; background:var(--clay-surface);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:40px; height:40px; border-radius:12px; background:var(--clay-peach); color:var(--clay-peach-dark); display:flex; align-items:center; justify-content:center;">
                            ${Icons.get('barChart', 20, 'var(--clay-peach-dark)')}
                        </div>
                        <div>
                            <h3 style="font-size:17px; font-weight:800; color:var(--text-primary);">PostHog: Conversion Funnel Analysis</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Step-by-step visitor progression and bounce telemetry</p>
                        </div>
                    </div>
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="this.closest('div[style*=\\'position:fixed\\']').remove()" style="width:34px; height:34px;">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>
                <div class="clay-card" style="background:#F8FAFC; padding:20px; font-size:12px; line-height:2.2;">
                    <div style="display:flex; justify-content:space-between;">
                        <span>Step 1: Homepage Landing</span>
                        <strong>14,200 visitors (100%)</strong>
                    </div>
                    <div style="display:flex; justify-content:space-between;">
                        <span>Step 2: Interactive Demo Launch</span>
                        <strong>6,820 visitors (48.0%)</strong>
                    </div>
                    <div style="display:flex; justify-content:space-between;">
                        <span>Step 3: OpenAPI Documentation View</span>
                        <strong>2,450 visitors (17.2%)</strong>
                    </div>
                    <div style="display:flex; justify-content:space-between; color:#10B981; font-weight:800;">
                        <span>Step 4: Enterprise Solution Brief Download</span>
                        <strong>890 completed (6.2%)</strong>
                    </div>
                    <div style="margin-top:12px; padding-top:10px; border-top:1px solid #E2E8F0; color:var(--clay-coral); font-weight:700;">
                        Recommendation: Reducing form fields from 5 to 2 is estimated to lift conversion by +18.4%.
                    </div>
                </div>
                <div style="margin-top:18px; text-align:right;">
                    <button class="clay-btn clay-btn-coral" onclick="HitlManager.showToast('Automated A/B experiment launched', 'mint'); this.closest('div[style*=\\'position:fixed\\']').remove()">
                        Deploy A/B Experiment
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
};

window.MarketingModule = MarketingModule;
