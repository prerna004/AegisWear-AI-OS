// ============================================================================
// AegisOS: Three-Tier Memory Architecture Explorer (Pastel Claymorphic Edition)
// Authentic Setproduct Claymorphism - Zero Emojis - Vector SVG Iconography
// ============================================================================

const MemoryViewer = {
    async openModal() {
        let modal = document.getElementById('memory-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'memory-modal';
            modal.style.cssText = `
                position: fixed; inset: 0; background: rgba(31,36,56,0.6); backdrop-filter: blur(8px);
                z-index: 10000; display: flex; align-items: center; justify-content: center;
            `;
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="clay-card" style="width: 860px; max-width: 92vw; max-height: 85vh; display: flex; flex-direction: column; overflow: hidden; padding: 28px; background:var(--clay-surface);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <div style="display:flex; align-items:center; gap:14px;">
                        <div style="width:44px; height:44px; border-radius:14px; background:var(--clay-coral); color:#FFFFFF; display:flex; align-items:center; justify-content:center; box-shadow: 2px 4px 10px rgba(255,124,99,0.35);">
                            ${Icons.get('brain', 24, '#FFFFFF')}
                        </div>
                        <div>
                            <h3 style="font-size:18px; font-weight:800; color:var(--text-primary);">Three-Tier Agent Memory System</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Inspection engine for session context, episodic audit logs, and semantic RAG rulebooks</p>
                        </div>
                    </div>
                    <button class="clay-btn-soft-circle" onclick="document.getElementById('memory-modal').remove()" style="width:34px; height:34px;" title="Close Modal">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>

                <div style="display:flex; gap:12px; margin-bottom:20px;">
                    <button id="mem-tab-btn-working" class="clay-btn clay-btn-coral" onclick="MemoryViewer.switchTab('working')" style="flex:1; justify-content:center;">
                        1. Active Now (Working)
                    </button>
                    <button id="mem-tab-btn-episodic" class="clay-btn clay-btn-white" onclick="MemoryViewer.switchTab('episodic')" style="flex:1; justify-content:center;">
                        2. Past History (Episodic)
                    </button>
                    <button id="mem-tab-btn-semantic" class="clay-btn clay-btn-white" onclick="MemoryViewer.switchTab('semantic')" style="flex:1; justify-content:center;">
                        3. Enterprise Rulebook (Semantic RAG)
                    </button>
                </div>

                <div id="memory-tab-content" style="overflow-y: auto; flex: 1; padding: 4px;">
                    <div style="text-align:center; padding:30px; color:var(--text-muted);">Loading memory brain...</div>
                </div>
            </div>
        `;

        this.switchTab('working');
    },

    async switchTab(tab) {
        ['working', 'episodic', 'semantic'].forEach(t => {
            const btn = document.getElementById(`mem-tab-btn-${t}`);
            if (btn) {
                if (t === tab) {
                    btn.className = 'clay-btn clay-btn-coral';
                } else {
                    btn.className = 'clay-btn clay-btn-white';
                }
            }
        });

        const container = document.getElementById('memory-tab-content');
        if (!container) return;

        if (tab === 'working') {
            const res = await fetch('/api/memory/working');
            const data = await res.json();
            container.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:16px;">
                    <div class="simple-guide-banner">
                        <div class="simple-guide-icon" style="background:var(--clay-coral);">
                            ${Icons.get('sparkles', 22, '#FFFFFF')}
                        </div>
                        <div>
                            <div style="font-weight:800; font-size:13px; color:var(--text-primary);">What is Working Memory?</div>
                            <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">Transient short-term session state: current active user identity, active room, and recent prompt context.</div>
                        </div>
                    </div>
                    <div class="clay-card" style="padding:18px; background:#F8FAFC;">
                        <span class="clay-badge clay-badge-coral">Active Session Context</span>
                        <pre style="margin-top:12px; font-size:12px; color:var(--text-primary); font-family:var(--font-mono); overflow-x:auto; line-height:1.5;">${JSON.stringify(data, null, 2)}</pre>
                    </div>
                </div>
            `;
        } else if (tab === 'episodic') {
            const res = await fetch('/api/audit/logs?limit=6');
            const data = await res.json();
            const logs = data.logs || [];
            container.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:14px;">
                    <div class="simple-guide-banner">
                        <div class="simple-guide-icon" style="background:var(--clay-lilac);">
                            ${Icons.get('fileText', 22, 'var(--text-on-lilac)')}
                        </div>
                        <div>
                            <div style="font-weight:800; font-size:13px; color:var(--text-primary);">What is Episodic Memory?</div>
                            <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">Chronological history of agent decisions, tool invocations, state mutations, and human approvals.</div>
                        </div>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:10px;">
                        ${logs.map(l => `
                            <div class="clay-card" style="padding:14px 18px; display:flex; justify-content:space-between; align-items:center;">
                                <div>
                                    <div style="font-size:13px; font-weight:800; color:var(--text-primary);">${l.agent_name}</div>
                                    <div style="font-size:12px; color:var(--text-secondary); margin-top:3px;">${l.reasoning_trace.substring(0, 80)}...</div>
                                </div>
                                <span class="clay-badge ${l.risk_level === 3 ? 'clay-badge-coral' : (l.risk_level === 2 ? 'clay-badge-butter' : 'clay-badge-mint')}">
                                    Level ${l.risk_level}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } else if (tab === 'semantic') {
            container.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:16px;">
                    <div class="simple-guide-banner">
                        <div class="simple-guide-icon" style="background:var(--clay-mint);">
                            ${Icons.get('shield', 22, '#0E4337')}
                        </div>
                        <div>
                            <div style="font-weight:800; font-size:13px; color:var(--text-primary);">What is Semantic Memory (RAG)?</div>
                            <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">Vector knowledge base encoding enterprise governance, CPQ discount policies, SLAs, and expense limits.</div>
                        </div>
                    </div>
                    <div style="display:flex; gap:10px;">
                        <input id="semantic-search-input" class="clay-input" type="text" placeholder="Search enterprise rulebook (e.g. 'discount policy', 'travel expense', 'SLA tier')..." 
                            style="flex:1; border: 1px solid #CBD5E1;" />
                        <button class="clay-btn clay-btn-coral" onclick="MemoryViewer.runSemanticQuery()">Search Rulebook</button>
                    </div>
                    <div id="semantic-results-box" style="display:flex; flex-direction:column; gap:10px;">
                        <div style="text-align:center; padding:20px; color:var(--text-muted); font-size:13px; font-weight:600;">
                            Type a query above to test real-time semantic retrieval.
                        </div>
                    </div>
                </div>
            `;
        }
    },

    async runSemanticQuery() {
        const input = document.getElementById('semantic-search-input');
        const box = document.getElementById('semantic-results-box');
        if (!input || !box) return;

        const query = input.value.trim();
        if (!query) return;

        box.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted);">Searching knowledge base...</div>`;
        const res = await fetch('/api/memory/semantic/query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const data = await res.json();
        const matches = data.matches || [];

        if (matches.length === 0) {
            box.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted);">No rules matched your query.</div>`;
            return;
        }

        box.innerHTML = matches.map(m => `
            <div class="clay-card" style="padding:16px; border-left:6px solid var(--clay-coral);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong style="font-size:14px; color:var(--text-primary);">${m.key}</strong>
                    <span class="clay-badge clay-badge-coral">Relevance: ${(m.relevanceScore * 100).toFixed(0)}%</span>
                </div>
                <p style="font-size:12px; color:var(--text-secondary); margin-top:8px; line-height:1.5;">${m.content}</p>
            </div>
        `).join('');
    }
};

window.MemoryViewer = MemoryViewer;
