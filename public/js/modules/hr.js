// ============================================================================
// Module Group E: Human Resources & Workplace Culture (Pastel Claymorphic Edition)
// Authentic Setproduct Claymorphism - Zero Emojis - Vector SVG Iconography
// ============================================================================

const HrModule = {
    async render(container) {
        let employees = [
            { id: 'emp-01', name: 'Prerna Chotwani', title: 'Creative Director & Founder', department: 'Design', pto_balance: 18, email: 'prerna@aegiswear.com' },
            { id: 'emp-02', name: 'Rahul Sharma', title: 'Head of Wholesale Accounts', department: 'Sales', pto_balance: 14, email: 'rahul@aegiswear.com' },
            { id: 'emp-03', name: 'Ananya Mehta', title: 'Lead Apparel Designer', department: 'Design', pto_balance: 21, email: 'ananya@aegiswear.com' }
        ];
        let candidates = [
            { id: 'cand-01', name: 'Tanvi Parekh', applied_role: 'Sustainable Textile Specialist', match_score: 96, status: 'Interview', resume_summary: 'Expert in GOTS certified organic cotton and zero-chemical dyes with 6 years experience.' }
        ];

        if (window.AegisStore && window.AegisStore.getState) {
            const st = window.AegisStore.getState();
            if (st.employees && st.employees.length > 0) {
                employees = st.employees.map(e => ({
                    id: e.id,
                    name: e.name,
                    title: e.role || e.title || 'Team Member',
                    department: e.department || 'Operations',
                    pto_balance: e.pto_balance !== undefined ? e.pto_balance : 15,
                    email: e.email || `${e.name.toLowerCase().replace(/\s+/g, '.')}@aegiswear.com`
                }));
            }
            if (st.candidates && st.candidates.length > 0) candidates = st.candidates;
        }

        try {
            const [empRes, candRes] = await Promise.all([
                fetch('/api/hr/employees').then(r => r.json()).catch(() => null),
                fetch('/api/hr/candidates').then(r => r.json()).catch(() => null)
            ]);
            if (Array.isArray(empRes) && empRes.length > 0) employees = empRes;
            if (Array.isArray(candRes) && candRes.length > 0) candidates = candRes;
        } catch (e) {
            console.warn('HrModule fetch failed, using fallback:', e);
        }

        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:20px;">
                <!-- Simple Explainer Banner -->
                <div class="simple-guide-banner">
                    <div class="simple-guide-icon" style="background:var(--clay-butter);">
                        ${Icons.get('users', 24, 'var(--text-on-butter)')}
                    </div>
                    <div>
                        <div style="font-size:15px; font-weight:800; color:var(--text-primary);">Room E: Designers, Models & Store Staff</div>
                        <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
                            Autonomous AI agents answer store staff leave requests, screen fashion design & model portfolios, and provision retail accounts.
                        </div>
                    </div>
                </div>

                <!-- Action Bar -->
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <button class="clay-btn clay-btn-white" onclick="HrModule.openPtoModal()">
                        ${Icons.get('user', 16, 'var(--text-primary)')}
                        <span>Request Shift Time-Off (PTO)</span>
                    </button>
                    <button class="clay-btn clay-btn-coral" onclick="Copilot.sendQuickPrompt('Screen incoming candidate resumes against Apparel & Sneaker Designer rubric', 'agent-ai-recruiter')">
                        ${Icons.get('zap', 16, '#FFFFFF')}
                        <span>Screen Fashion Portfolios</span>
                    </button>
                </div>

                <!-- Staff & Hiring Split -->
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
                    <!-- Staff Directory -->
                    <div class="clay-card" style="padding:22px; background:var(--clay-surface);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                            <div>
                                <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Company Directory</h3>
                                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Active staff profiles & accrued PTO balances</p>
                            </div>
                            <span class="clay-badge clay-badge-butter">${employees.length} Staff</span>
                        </div>

                        <div style="display:flex; flex-direction:column; gap:12px;">
                            ${employees.map(e => `
                                <div class="clay-card" style="padding:14px; background:var(--clay-surface); display:flex; justify-content:space-between; align-items:center;">
                                    <div style="display:flex; align-items:center; gap:12px;">
                                        <div style="width:38px; height:38px; border-radius:12px; background:var(--clay-butter); color:var(--text-on-butter); display:flex; align-items:center; justify-content:center; font-weight:800; font-size:13px; box-shadow:var(--clay-shadow-sm);">
                                            ${e.name.split(' ').map(n=>n[0]).join('')}
                                        </div>
                                        <div>
                                            <div style="font-weight:800; font-size:13px; color:var(--text-primary);">${e.name}</div>
                                            <div style="font-size:11px; color:var(--text-muted);">${e.title} • ${e.department}</div>
                                        </div>
                                    </div>
                                    <div style="text-align:right;">
                                        <span class="clay-badge clay-badge-mint">${e.pto_balance} days PTO</span>
                                        <div style="font-size:10px; color:var(--text-muted); margin-top:2px; font-family:var(--font-mono);">${e.email}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Candidate Hiring Pipeline -->
                    <div class="clay-card" style="padding:22px; background:var(--clay-surface);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                            <div>
                                <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Recruitment Pipeline</h3>
                                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Scored autonomously via resume rubric parsing</p>
                            </div>
                            <span class="clay-badge clay-badge-mint">ATS Parser</span>
                        </div>

                        <div style="display:flex; flex-direction:column; gap:12px;">
                            ${candidates.map(c => `
                                <div class="clay-card" style="padding:16px; background:var(--clay-surface);">
                                    <div style="display:flex; justify-content:space-between; align-items:center;">
                                        <span style="font-weight:800; font-size:13px; color:var(--text-primary);">${c.name}</span>
                                        <span class="clay-badge ${c.match_score >= 90 ? 'clay-badge-mint' : 'clay-badge-butter'}">
                                            ${c.match_score}% Rubric Match
                                        </span>
                                    </div>
                                    <div style="font-size:11px; color:var(--clay-coral); font-weight:700; margin-top:2px;">Target: ${c.applied_role}</div>
                                    <p style="font-size:11px; color:var(--text-secondary); margin-top:6px; line-height:1.4;">${c.resume_summary}</p>
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
                                        <span class="clay-badge clay-badge-white" style="font-size:10px;">${c.status}</span>
                                        <button class="clay-btn clay-btn-coral" style="font-size:10px; padding:4px 12px;" onclick="Copilot.sendQuickPrompt('Initiate zero-touch onboarding credential provisioning for ${c.name}', 'agent-onboarding-provisioning')">
                                            Provision Access
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

    openPtoModal() {
        Copilot.sendQuickPrompt('How many days of PTO do I have remaining, and can I take Friday off?', 'agent-hr-concierge');
    }
};

window.HrModule = HrModule;
