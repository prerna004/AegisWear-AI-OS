// ============================================================================
// Module Group G: Project Management (Agile & Waterfall) (Pastel Claymorphic Edition)
// Authentic Setproduct Claymorphism - Zero Emojis - Vector SVG Iconography
// ============================================================================

const ProjectsModule = {
    viewMode: 'kanban',

    async render(container) {
        try {
            let projects = [
                { id: 'proj-01', name: 'Summer 2026 Drop Launch', type: 'Fashion Drop', progress_percent: 85, budget: 45000, deadline: 'Nov 25, 2026' },
                { id: 'proj-02', name: 'Paris & Tokyo Fashion Week Capsule', type: 'Runway Capsule', progress_percent: 40, budget: 85000, deadline: 'Jan 15, 2027' },
                { id: 'proj-03', name: 'Organic French Terry Collection', type: 'Eco-Wear Drop', progress_percent: 62, budget: 32000, deadline: 'Dec 10, 2026' }
            ];
            let tasks = [
                { id: 'tsk-01', title: 'Approve Lab Dips for French Terry Lilac', priority: 'High', status: 'done', assignee: 'Ananya Mehta', assignee_name: 'Ananya Mehta', story_points: 3 },
                { id: 'tsk-02', title: 'Review Soho Wholesale Digital Contract', priority: 'Urgent', status: 'review', assignee: 'Rahul Sharma', assignee_name: 'Rahul Sharma', story_points: 5 },
                { id: 'tsk-03', title: 'Finalize Paris Lookbook Studio Bookings', priority: 'Medium', status: 'todo', assignee: 'Prerna Chotwani', assignee_name: 'Prerna Chotwani', story_points: 2 },
                { id: 'tsk-04', title: 'Puffy Runner Prototype Cushioning Test', priority: 'High', status: 'in_progress', assignee: 'Ananya Mehta', assignee_name: 'Ananya Mehta', story_points: 4 }
            ];

            if (window.AegisStore && window.AegisStore.getState) {
                const st = window.AegisStore.getState();
                if (st.projects && st.projects.length > 0) {
                    projects = st.projects.map(p => ({
                        id: p.id,
                        name: p.name,
                        type: p.type || (p.lead ? `Lead: ${p.lead}` : 'Drop Milestone'),
                        progress_percent: p.progress_percent !== undefined ? p.progress_percent : (p.progress !== undefined ? p.progress : 75),
                        budget: p.budget || 45000,
                        deadline: p.deadline || p.target_date || 'Nov 25, 2026'
                    }));
                }
            }

            try {
                const [projRes, tasksRes] = await Promise.all([
                    fetch('/api/projects').then(r => r.ok && r.headers.get('content-type')?.includes('application/json') ? r.json() : null).catch(() => null),
                    fetch('/api/projects/tasks').then(r => r.ok && r.headers.get('content-type')?.includes('application/json') ? r.json() : null).catch(() => null)
                ]);
                if (Array.isArray(projRes) && projRes.length > 0) {
                    projects = projRes.map(p => ({
                        ...p,
                        budget: p.budget || 45000,
                        deadline: p.deadline || p.target_date || 'Nov 25, 2026',
                        progress_percent: p.progress_percent !== undefined ? p.progress_percent : 70
                    }));
                }
                if (Array.isArray(tasksRes) && tasksRes.length > 0) {
                    tasks = tasksRes.map(t => ({
                        ...t,
                        assignee: t.assignee || t.assignee_name || 'Design Team',
                        story_points: t.story_points || 3
                    }));
                }
            } catch (e) {
                console.warn('ProjectsModule fetch failed, using fallback:', e);
            }

            container.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:20px;">
                    <!-- Simple Explainer Banner -->
                    <div class="simple-guide-banner">
                        <div class="simple-guide-icon" style="background:var(--clay-periwinkle);">
                            ${Icons.get('checkSquare', 24, 'var(--clay-periwinkle-dark)')}
                        </div>
                        <div>
                            <div style="font-size:15px; font-weight:800; color:var(--text-primary);">Room G: Collection Drops & Production Tasks</div>
                            <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
                                Autonomous AI agents break seasonal fashion drops into fabric cutting/sewing tasks, detect factory delays, and compile daily production digests.
                            </div>
                        </div>
                    </div>

                    <!-- Action Bar -->
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                        <button class="clay-btn clay-btn-white" onclick="ProjectsModule.toggleView('${this.viewMode === 'kanban' ? 'gantt' : 'kanban'}')">
                            ${this.viewMode === 'kanban' ? Icons.get('barChart', 16, 'var(--clay-coral)') + ' <span>Switch to Drop Timeline</span>' : Icons.get('checkSquare', 16, 'var(--clay-coral)') + ' <span>Switch to Production Board</span>'}
                        </button>
                        <button class="clay-btn clay-btn-coral" onclick="Copilot.sendQuickPrompt('Analyze collection task dependencies for factory delays and drop milestone slippage', 'agent-blocker-slippage')">
                            ${Icons.get('zap', 16, '#FFFFFF')}
                            <span>Forecast Factory Delays</span>
                        </button>
                    </div>

                    <!-- Projects Summary Bar -->
                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:14px;">
                        ${projects.map(p => {
                            const budgetNum = Number(p.budget || 45000);
                            const budgetFormatted = isNaN(budgetNum) ? '45,000' : budgetNum.toLocaleString();
                            const deadlineStr = p.deadline || p.target_date || 'Nov 25, 2026';
                            const progress = Number(p.progress_percent || 75);
                            return `
                                <div class="clay-card" style="padding:20px; background:var(--clay-surface);">
                                    <div style="display:flex; justify-content:space-between; align-items:center;">
                                        <span style="font-weight:800; font-size:14px; color:var(--text-primary);">${p.name}</span>
                                        <span class="clay-badge clay-badge-lilac">${p.type || 'Collection'}</span>
                                    </div>
                                    <div style="margin-top:14px;">
                                        <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-muted); margin-bottom:6px; font-weight:700;">
                                            <span>Milestone Completion</span>
                                            <span>${progress}%</span>
                                        </div>
                                        <div style="width:100%; height:8px; background:#E2E8F0; border-radius:9999px; overflow:hidden;">
                                            <div style="width:${progress}%; height:100%; background:var(--clay-coral); border-radius:9999px;"></div>
                                        </div>
                                    </div>
                                    <div style="display:flex; justify-content:space-between; margin-top:14px; font-size:11px; color:var(--text-muted); font-weight:600;">
                                        <span>Budget: <strong style="color:var(--text-primary);">$${budgetFormatted}</strong></span>
                                        <span>Target: <strong style="color:var(--text-primary);">${deadlineStr}</strong></span>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>

                    ${this.viewMode === 'kanban' ? this.renderKanban(tasks) : this.renderGantt(tasks)}
                </div>
            `;
        } catch (err) {
            console.error('[ProjectsModule Render Error]', err);
            container.innerHTML = `
                <div class="clay-card" style="padding:32px; text-align:center; background:var(--clay-surface);">
                    <div style="font-size:18px; font-weight:800; color:var(--text-primary); margin-bottom:8px;">Collection Launches &amp; Production Tasks</div>
                    <p style="font-size:13px; color:var(--text-secondary); margin-bottom:16px;">Production tasks synced from store inventory &amp; factory pipeline.</p>
                    <button class="clay-btn clay-btn-coral" onclick="ProjectsModule.render(document.getElementById('module-content-area'))">Reload Drop Tasks</button>
                </div>
            `;
        }
    },

    toggleView(mode) {
        this.viewMode = mode;
        const container = document.getElementById('module-content-area');
        if (container) this.render(container);
    },

    renderKanban(tasks) {
        const columns = ['todo', 'in_progress', 'review', 'done'];
        const colTitles = { todo: 'To Do', in_progress: 'In Progress', review: 'Review / QA', done: 'Completed' };
        const statusMap = {
            todo: ['todo', 'to do', 'backlog'],
            in_progress: ['in_progress', 'in progress', 'progress', 'doing', 'active'],
            review: ['review', 'in review', 'qa', 'testing'],
            done: ['done', 'completed', 'finished', 'closed']
        };

        return `
            <div class="clay-card" style="padding:22px; background:var(--clay-surface);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
                    <div>
                        <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Sprint Board (Collection Production)</h3>
                        <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Apparel tasks organized by design and manufacturing stage</p>
                    </div>
                    <button class="clay-btn clay-btn-white" style="font-size:11px; padding:6px 14px;" onclick="Copilot.sendQuickPrompt('Decompose Product Requirement Document into user stories with story points', 'agent-scrum-master')">
                        Decompose PRD into Tasks
                    </button>
                </div>
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:12px;">
                    ${columns.map(col => {
                        const colTasks = tasks.filter(t => {
                            const rawStatus = (t.status || 'todo').toString().toLowerCase().trim();
                            return statusMap[col].includes(rawStatus) || rawStatus === col;
                        });
                        return `
                            <div style="background:#F8FAFC; border-radius:18px; padding:14px; border:1px solid rgba(0,0,0,0.04);">
                                <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase; margin-bottom:12px;">
                                    <span>${colTitles[col]}</span>
                                    <span class="clay-badge clay-badge-white" style="font-size:9px; padding:2px 8px;">${colTasks.length}</span>
                                </div>
                                <div style="display:flex; flex-direction:column; gap:10px;">
                                    ${colTasks.map(t => {
                                        const assignee = t.assignee || t.assignee_name || 'Design Team';
                                        const pts = t.story_points || 3;
                                        return `
                                            <div class="clay-card" style="padding:14px; font-size:12px; background:var(--clay-surface);">
                                                <div style="font-weight:700; color:var(--text-primary); margin-bottom:4px;">${t.title}</div>
                                                <div style="font-size:11px; color:var(--text-muted);">${assignee}</div>
                                                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                                                    <span class="clay-badge ${t.priority === 'Critical' || t.priority === 'Urgent' ? 'clay-badge-coral' : (t.priority === 'High' ? 'clay-badge-butter' : 'clay-badge-mint')}" style="font-size:9px;">
                                                        ${t.priority || 'Normal'}
                                                    </span>
                                                    <span style="font-size:11px; font-family:var(--font-mono); color:var(--text-muted);">${pts} pts</span>
                                                </div>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    renderGantt(tasks) {
        return `
            <div class="clay-card" style="padding:22px; background:var(--clay-surface);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div>
                        <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Waterfall Gantt Timeline (Fashion Drop Critical Path)</h3>
                        <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Critical path dependency chains and milestone duration estimates</p>
                    </div>
                    <span class="clay-badge clay-badge-mint">Critical Path Solved</span>
                </div>
                <div class="clay-card" style="background:#F8FAFC; padding:20px; overflow-x:auto;">
                    <div style="min-width:600px;">
                        <div style="display:grid; grid-template-columns: 240px 1fr; border-bottom:1px solid #E2E8F0; padding-bottom:10px; font-size:11px; color:var(--text-muted); font-weight:800;">
                            <span>TASK / MILESTONE</span>
                            <div style="display:flex; justify-content:space-between;">
                                <span>Nov 10</span>
                                <span>Nov 15</span>
                                <span>Nov 20</span>
                                <span>Nov 25</span>
                                <span>Nov 30</span>
                                <span>Dec 05</span>
                            </div>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:12px; margin-top:14px;">
                            ${tasks.map((t, idx) => {
                                const leftOffset = Math.min(idx * 16, 60);
                                const widthPercent = Math.max(25, 75 - leftOffset);
                                const isCrit = t.priority === 'Critical' || t.priority === 'Urgent' || t.priority === 'High';
                                const assignee = t.assignee || t.assignee_name || 'Design Team';
                                const pts = t.story_points || 3;
                                return `
                                    <div style="display:grid; grid-template-columns: 240px 1fr; align-items:center; font-size:12px;">
                                        <div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:var(--text-primary); font-weight:700; padding-right:12px;">
                                            ${t.title}
                                        </div>
                                        <div style="position:relative; height:28px; background:#E2E8F0; border-radius:8px;">
                                            <div style="position:absolute; left:${leftOffset}%; width:${widthPercent}%; height:100%; border-radius:8px; background:${isCrit ? 'var(--clay-coral)' : 'var(--clay-lilac)'}; display:flex; align-items:center; padding:0 12px; color:#FFFFFF; font-size:11px; font-weight:800; box-shadow:var(--clay-shadow-sm); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                                                ${assignee} (${pts}d)
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

window.ProjectsModule = ProjectsModule;
