// ============================================================================
// AegisWear: Digital Operations Team (Pastel Claymorphic Edition)
// 26 Autonomous Digital Specialists Running Wholesale, Inventory, & Sizing
// Zero Emojis - Vector SVG Iconography
// ============================================================================

const FASHION_AGENT_TITLES = {
    'agent-lead-enrichment': { role: 'Boutique Scout', dept: 'Wholesale & Retail', summary: 'Scouts partner boutiques in Copenhagen, London & NYC and evaluates store footprint.' },
    'agent-sdr': { role: 'Wholesale Outreach Specialist', dept: 'Wholesale & Retail', summary: 'Drafts personalized lookbook partnership invites and books showroom calls.' },
    'agent-deal-desk': { role: 'Wholesale Deal & Margin Guardian', dept: 'Wholesale & Retail', summary: 'Protects profit margins (>35%). Holds bulk orders with >10% discount for Boss approval.' },
    'agent-pipeline-forecast': { role: 'Revenue & Cash Flow Forecaster', dept: 'Wholesale & Retail', summary: 'Predicts monthly sneaker & hoodie sales revenue using real-time deal probability.' },
    'agent-campaign-orchestrator': { role: 'Summer Drop Campaign Director', dept: 'Marketing & Drops', summary: 'Crafts high-converting launch email sequences for summer sneaker & hoodie releases.' },
    'agent-cro-analyst': { role: 'Checkout Conversion Specialist', dept: 'Marketing & Drops', summary: 'Spots where shoppers abandon carts during shoe checkout and tests smoother flows.' },
    'agent-social-listening': { role: 'Instagram & Brand Sentiment Scout', dept: 'Marketing & Drops', summary: 'Monitors Instagram comments, unboxing videos, and shopper mentions 24/7.' },
    'agent-tier1-2-resolution': { role: 'Size Exchange & Return Specialist', dept: 'Customer Care', summary: 'Approves hoodie & sneaker size swaps in 60s and emails prepaid BlueDart return QR labels.' },
    'agent-sentiment-churn': { role: 'VIP Customer Care Concierge', dept: 'Customer Care', summary: 'Detects frustrated shoppers early and alerts store management before issues escalate.' },
    'agent-auto-kb': { role: 'Sizing Guide & Lookbook FAQ Author', dept: 'Customer Care', summary: 'Turns common customer sizing and fabric questions into helpful public fit articles.' },
    'agent-bookkeeper': { role: 'Store Bookkeeper & Reconciler', dept: 'Warehouse & Finance', summary: 'Matches boutique bank deposits and Stripe payouts directly with warehouse invoices.' },
    'agent-receipt-ocr': { role: 'Photoshoot & Expense Auditor', dept: 'Warehouse & Finance', summary: 'Scans fabric supplier bills, photographer invoices, and model fees with camera OCR.' },
    'agent-inventory-forecast': { role: 'Sneaker & Stock Demand Forecaster', dept: 'Warehouse & Finance', summary: 'Calculates warehouse depletion velocity so you never run out of Puffy Runners or Hoodies.' },
    'agent-ai-recruiter': { role: 'Design & Model Talent Scout', dept: 'Design Team & HR', summary: 'Screens fashion designer portfolios and model comp cards against AegisWear aesthetic rubrics.' },
    'agent-hr-concierge': { role: 'Store Staff Shifts & PTO Concierge', dept: 'Design Team & HR', summary: 'Answers employee questions about store shifts, paid time off, and payroll holidays.' },
    'agent-onboarding-provisioning': { role: 'Staff Register & Account Provisioner', dept: 'Design Team & HR', summary: 'Provisions store billing logins and orders warehouse equipment (Requires Boss Sign-Off).' },
    'agent-meeting-scribe': { role: 'Design Studio Meeting Scribe', dept: 'Studio & Lookbooks', summary: 'Transcribes photoshoot planning and fabric sourcing meetings into clear task lists.' },
    'agent-inbox-triage': { role: 'Wholesale Buyer Inbox Manager', dept: 'Studio & Lookbooks', summary: 'Triages buyer emails, flags urgent bulk requests, and drafts instant professional replies.' },
    'agent-document-synthesis': { role: 'Fabric Supplier Contract Analyst', dept: 'Studio & Lookbooks', summary: 'Reads 30-page fabric supplier contracts and extracts wholesale pricing and delivery clauses.' },
    'agent-scrum-master': { role: 'Collection Drop Sprint Master', dept: 'Collection Launches', summary: 'Breaks seasonal fashion lines into cutting, sample sewing, and photoshoot sprint milestones.' },
    'agent-blocker-slippage': { role: 'Factory Delay & Deadline Guardian', dept: 'Collection Launches', summary: 'Warns the team immediately if overseas sewing factories are running behind drop schedule.' },
    'agent-standup-digest': { role: 'Daily Factory Production Digest', dept: 'Collection Launches', summary: 'Compiles daily async updates from production managers and factory cutters into a 1-page memo.' },
    'agent-it-helpdesk': { role: 'Store POS & Register Support', dept: 'Store Registers & IT', summary: 'Monitors flagship store checkout iPads and clears bloated cache files (Requires Sign-Off).' },
    'agent-license-optimizer': { role: 'Shopify Apps & SaaS Cost Auditor', dept: 'Store Registers & IT', summary: 'Audits dormant Shopify apps and software seats to save the brand monthly overhead.' },
    'agent-data-scientist': { role: 'Plain-English Trends Specialist', dept: 'Sales Insights & BI', summary: 'Answers any question in plain English to see best-selling apparel categories and revenue charts.' },
    'agent-workflow-builder': { role: 'Store Flow & Event Automator', dept: 'Sales Insights & BI', summary: 'Connects new online orders, warehouse inventory deduction, and WhatsApp shipment tracking.' }
};

const AgentsViewModule = {
    async render(container) {
        // Default 26 agents generated from catalog if network unavailable
        const defaultAgents = Object.entries(FASHION_AGENT_TITLES).map(([id, info]) => ({
            id,
            name: info.role,
            category: info.dept,
            risk_tier: id.includes('deal-desk') || id.includes('it-helpdesk') || id.includes('onboarding') ? 3 : (id.includes('sdr') || id.includes('campaign') || id.includes('support') ? 2 : 1),
            status: 'Active',
            description: info.summary
        }));

        let agents = defaultAgents;
        let swarm = [];
        let stats = { totalActions: 1842, policyPassRate: 100, verifiedCryptographic: true };
        let logs = [
            {
                id: 'aud-01',
                timestamp: '2026-11-20T10:15:00.000Z',
                agent_id: 'agent-deal-desk',
                agent_name: 'Wholesale Deal & Margin Guardian',
                trigger_event: 'Quote Margin Approval',
                risk_level: 3,
                reasoning_trace: 'Gross margin calculated at 36.2% for Soho Fashion House quote ($65,000 bulk order).',
                approval_status: 'Approved'
            },
            {
                id: 'aud-02',
                timestamp: '2026-11-20T10:30:00.000Z',
                agent_id: 'agent-tier1-2-resolution',
                agent_name: 'Size Exchange Specialist',
                trigger_event: 'Customer Size Swap',
                risk_level: 2,
                reasoning_trace: 'Prepaid BlueDart return QR exchange label generated for Sarah Jenkins (Order #AW-9481).',
                approval_status: 'Approved'
            },
            {
                id: 'aud-03',
                timestamp: '2026-11-20T11:05:00.000Z',
                agent_id: 'agent-campaign-orchestrator',
                agent_name: 'Summer Drop Campaign Director',
                trigger_event: 'Omnichannel Launch Sequence',
                risk_level: 2,
                reasoning_trace: 'Dispatched 3-part Instagram and WhatsApp VIP teaser for Pastel Clay Hoodies.',
                approval_status: 'Approved'
            },
            {
                id: 'aud-04',
                timestamp: '2026-11-20T11:45:00.000Z',
                agent_id: 'agent-inventory-forecast',
                agent_name: 'Sneaker & Stock Demand Forecaster',
                trigger_event: 'Depletion Velocity Audit',
                risk_level: 1,
                reasoning_trace: 'Puffy Runner stock depletion rate analyzed across Mumbai & Bangalore hubs. Restock buffer active.',
                approval_status: 'Autonomous'
            }
        ];

        try {
            const [registryRes, swarmRes, auditStatsRes, auditLogsRes] = await Promise.all([
                fetch('/api/agents/registry').then(r => r.json()).catch(() => null),
                fetch('/api/agents/swarm-status').then(r => r.json()).catch(() => null),
                fetch('/api/audit/stats').then(r => r.json()).catch(() => null),
                fetch('/api/audit/logs?limit=15').then(r => r.json()).catch(() => null)
            ]);

            if (registryRes && Array.isArray(registryRes.agents) && registryRes.agents.length > 0) {
                agents = registryRes.agents;
            }
            if (swarmRes && Array.isArray(swarmRes.activeSwarm)) {
                swarm = swarmRes.activeSwarm;
            }
            if (auditStatsRes && typeof auditStatsRes === 'object') {
                stats = auditStatsRes;
            }
            if (auditLogsRes) {
                if (Array.isArray(auditLogsRes.logs)) logs = auditLogsRes.logs;
                else if (Array.isArray(auditLogsRes)) logs = auditLogsRes;
            }
        } catch (e) {
            console.warn('AgentsViewModule fetch failed, using fallback:', e);
        }

        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:20px;">
                <!-- Simple Explainer Banner -->
                <div class="simple-guide-banner">
                    <div class="simple-guide-icon" style="background:var(--clay-lilac);">
                        ${Icons.get('sparkles', 24, 'var(--text-on-lilac)')}
                    </div>
                    <div>
                        <div style="font-size:16px; font-weight:800; color:var(--text-primary);">AegisWear Operations Team: 26 Digital Store Specialists</div>
                        <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
                            Meet your 24/7 digital team running boutique wholesale sales, summer drops, customer size exchanges, warehouse inventory, and retail registers.
                        </div>
                    </div>
                </div>

                <!-- 4 KPI Cards -->
                <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:14px;">
                    <div class="clay-card" style="padding:18px; background:var(--clay-surface);">
                        <div style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Tasks Automated</div>
                        <div style="font-size:24px; font-weight:800; color:var(--text-primary); margin-top:6px; font-family:var(--font-mono);">1,420 Completed</div>
                        <div style="font-size:11px; color:#10B981; font-weight:700; margin-top:4px;">Zero manual copy-pasting</div>
                    </div>
                    <div class="clay-card" style="padding:18px; background:var(--clay-surface);">
                        <div style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Manager Reviews</div>
                        <div style="font-size:24px; font-weight:800; color:var(--clay-coral); margin-top:6px; font-family:var(--font-mono);">${stats.level3ProtectedInvocations || 2} Sign-offs</div>
                        <div style="font-size:11px; color:var(--clay-coral); font-weight:700; margin-top:4px;">Discounts &amp; refunds protected</div>
                    </div>
                    <div class="clay-card" style="padding:18px; background:var(--clay-surface);">
                        <div style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Time Saved This Month</div>
                        <div style="font-size:24px; font-weight:800; color:var(--clay-navy); margin-top:6px; font-family:var(--font-mono);">~184 Hours</div>
                        <div style="font-size:11px; color:var(--text-secondary); margin-top:4px;">Founder focuses on fashion design</div>
                    </div>
                    <div class="clay-card" style="padding:18px; background:var(--clay-surface);">
                        <div style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Team Coverage</div>
                        <div style="font-size:24px; font-weight:800; color:#10B981; margin-top:6px; font-family:var(--font-mono);">26 Specialists Active</div>
                        <div style="font-size:11px; color:#10B981; font-weight:700; margin-top:4px;">100% store uptime 24/7</div>
                    </div>
                </div>

                <!-- 26 Specialists Master Grid -->
                <div class="clay-card" style="padding:24px; background:var(--clay-surface);">
                    <div style="margin-bottom:16px; display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <h3 style="font-size:16px; font-weight:800; color:var(--text-primary);">The 26 Digital Store Specialists</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Specialists work autonomously under your guidance. Click any specialist to chat directly.</p>
                        </div>
                        <span class="clay-badge clay-badge-mint">All Active</span>
                    </div>

                    <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap:14px;">
                        ${agents.map(a => {
                            const info = FASHION_AGENT_TITLES[a.id] || { role: a.name, dept: 'Operations', summary: a.description };
                            const swarmItem = swarm.find(s => s.id === a.id);
                            const st = swarmItem ? swarmItem.status : 'idle';
                            const badgeClass = a.riskLevel === 3 ? 'clay-badge-coral' : (a.riskLevel === 2 ? 'clay-badge-butter' : 'clay-badge-mint');
                            const levelLabel = a.riskLevel === 3 ? 'Boss Sign-Off Required' : (a.riskLevel === 2 ? '1-Click Undo' : 'Autonomous 24/7');
                            return `
                                <div class="clay-card" style="padding:18px; background:var(--clay-surface); display:flex; flex-direction:column; justify-content:space-between; transition:transform 0.2s;" onmouseenter="this.style.transform='translateY(-3px)'" onmouseleave="this.style.transform='none'">
                                    <div>
                                        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                                            <div>
                                                <span style="font-weight:800; font-size:14px; color:var(--text-primary);">${info.role}</span>
                                                <div style="font-size:11px; color:var(--clay-coral); font-weight:700; margin-top:2px;">${info.dept}</div>
                                            </div>
                                            <span class="clay-badge ${badgeClass}" style="font-size:9px; white-space:nowrap;">${levelLabel}</span>
                                        </div>
                                        <p style="font-size:12px; color:var(--text-secondary); margin-top:10px; line-height:1.45;">${info.summary}</p>
                                    </div>
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; padding-top:10px; border-top:1px solid rgba(0,0,0,0.06);">
                                        <div style="display:flex; align-items:center; gap:6px;">
                                            <span class="pulse-dot online"></span>
                                            <span style="font-size:11px; color:var(--text-muted); font-weight:600;">Active 24/7</span>
                                        </div>
                                        <button class="clay-btn clay-btn-white" style="font-size:11px; padding:6px 14px;" onclick="Copilot.selectAgent('${a.id}'); Copilot.toggle();">
                                            Chat with Specialist
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Permanent Activity History & Audit Trail -->
                <div class="clay-card" style="padding:24px; background:var(--clay-surface);">
                    <div style="margin-bottom:16px;">
                        <h3 style="font-size:16px; font-weight:800; color:var(--text-primary);">Activity History &amp; Audit Trail</h3>
                        <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Immutable record of store actions, orders, discount reviews, and customer shipments.</p>
                    </div>

                    <div style="overflow-x:auto;">
                        <table style="width:100%; border-collapse:collapse; font-size:12px; text-align:left;">
                            <thead>
                                <tr style="border-bottom:2px solid #E2E8F0; color:var(--text-muted); text-transform:uppercase; font-size:10px; font-weight:800;">
                                    <th style="padding:10px;">Time</th>
                                    <th style="padding:10px;">Specialist</th>
                                    <th style="padding:10px;">Store Event</th>
                                    <th style="padding:10px;">Governance</th>
                                    <th style="padding:10px;">Action Summary</th>
                                    <th style="padding:10px;">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${logs.map(l => {
                                    const rawTime = (l.timestamp || '10:15:00').toString();
                                    const timeDisplay = rawTime.includes('T') ? rawTime.substring(11, 19) : rawTime;
                                    const agentId = l.agent_id || l.agent || 'agent-deal-desk';
                                    const title = (FASHION_AGENT_TITLES[agentId]?.role) || l.agent_name || 'Wholesale Margin Specialist';
                                    const event = l.trigger_event || l.event || l.action || 'Store Workflow Action';
                                    const risk = Number(l.risk_level || (agentId.includes('deal-desk') ? 3 : 1));
                                    const summary = l.reasoning_trace || l.action || 'Autonomous retail workflow completed.';
                                    const status = l.approval_status || (risk === 3 ? 'Pending Review' : 'Approved');
                                    return `
                                        <tr style="border-bottom:1px solid rgba(0,0,0,0.05);">
                                            <td style="padding:10px; font-family:var(--font-mono); color:var(--text-muted); font-size:11px;">${timeDisplay}</td>
                                            <td style="padding:10px; font-weight:700; color:var(--text-primary);">${title}</td>
                                            <td style="padding:10px; color:var(--text-secondary);">${event}</td>
                                            <td style="padding:10px;">
                                                <span class="clay-badge ${risk === 3 ? 'clay-badge-coral' : (risk === 2 ? 'clay-badge-butter' : 'clay-badge-mint')}" style="font-size:9px;">
                                                    ${risk === 3 ? 'Boss Approval' : (risk === 2 ? 'Undoable' : 'Autonomous')}
                                                </span>
                                            </td>
                                            <td style="padding:10px; color:var(--text-muted); font-size:11px; max-width:320px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${summary}</td>
                                            <td style="padding:10px;">
                                                <span class="clay-badge ${status === 'Approved' ? 'clay-badge-mint' : (status === 'Pending_HITL' || status === 'Pending Review' ? 'clay-badge-coral' : 'clay-badge-sky')}" style="font-size:9px;">
                                                    ${status === 'Pending_HITL' ? 'Pending Review' : status}
                                                </span>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
};

window.AgentsViewModule = AgentsViewModule;
