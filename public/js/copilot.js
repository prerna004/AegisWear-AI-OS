// ============================================================================
// AegisOS: Persistent AI Copilot Helper (Pastel Claymorphic Edition)
// Authentic Setproduct Claymorphism - Zero Emojis - Vector SVG Iconography
// Dynamic suggestions engine, context-aware prompt routing, mobile-optimized
// ============================================================================

const Copilot = {
    isOpen: window.innerWidth > 768,
    activeAgent: 'agent-inventory-forecast',
    currentCategory: 'overview',
    suggestionOffset: 0,

    // Rich pools of realistic fashion e-commerce actions
    suggestionPool: {
        inventory: [
            { text: "Forecast restock dates for Puffy Runner sneakers (18 pairs left)", agent: "agent-inventory-forecast", icon: "zap", tint: "mint" },
            { text: "Compute safety stock buffer for Oversized Clay Hoodies", agent: "agent-inventory-forecast", icon: "activity", tint: "mint" },
            { text: "Audit fabric supplier receipts (YKK brass zippers & French terry)", agent: "agent-receipt-ocr", icon: "fileText", tint: "peach" },
            { text: "Check warehouse depletion velocity across EU & US distribution hubs", agent: "agent-inventory-forecast", icon: "activity", tint: "sky" },
            { text: "Flag slow-moving summer items for archive flash sale", agent: "agent-inventory-forecast", icon: "alertTriangle", tint: "butter" }
        ],
        wholesale: [
            { text: "Review 15% bulk discount request for Soho Fashion House ($65k order)", agent: "agent-deal-desk", icon: "shield", tint: "peach" },
            { text: "Draft wholesale partnership outreach email for Aria Montgomery at Nordic Streetwear", agent: "agent-sdr", icon: "mail", tint: "lilac" },
            { text: "Score Copenhagen Boutique for Wholesale Partner Program (ICP 0-100)", agent: "agent-lead-enrichment", icon: "sparkles", tint: "mint" },
            { text: "Calculate CPQ gross margin for 500 Puffy Runner sneakers bundle", agent: "agent-deal-desk", icon: "dollar", tint: "sky" },
            { text: "Generate Documenso digital wholesale agreement for retail buyers", agent: "agent-deal-desk", icon: "fileText", tint: "butter" }
        ],
        trends: [
            { text: "Show revenue breakdown by apparel category (Hoodies, Sneakers, Caps)", agent: "agent-data-scientist", icon: "barChart", tint: "sky" },
            { text: "Which product generated highest gross profit margin this month?", agent: "agent-data-scientist", icon: "dollar", tint: "mint" },
            { text: "Compare online Shopify sales vs wholesale boutique retail volume", agent: "agent-data-scientist", icon: "activity", tint: "butter" },
            { text: "Forecast July revenue run-rate using Monte Carlo simulation", agent: "agent-pipeline-forecast", icon: "sparkles", tint: "lilac" },
            { text: "Show top 5 best-selling colorways in Summer '26 drop", agent: "agent-data-scientist", icon: "barChart", tint: "peach" }
        ],
        support: [
            { text: "Auto-resolve pending size exchange (Medium to Large Clay Hoodie)", agent: "agent-tier1-2-resolution", icon: "checkSquare", tint: "mint" },
            { text: "Evaluate customer ticket sentiment across today's deliveries", agent: "agent-sentiment-churn", icon: "activity", tint: "peach" },
            { text: "Search knowledge base: International express delivery timelines to Germany", agent: "agent-tier1-2-resolution", icon: "search", tint: "sky" },
            { text: "Send tracking link and return label for Order #8492", agent: "agent-tier1-2-resolution", icon: "mail", tint: "lilac" },
            { text: "Synthesize return policy FAQ for summer footwear & swimwear", agent: "agent-auto-kb", icon: "fileText", tint: "butter" }
        ],
        marketing: [
            { text: "Draft 3-part email launch sequence for Summer Capsule Drop", agent: "agent-campaign-orchestrator", icon: "mail", tint: "lilac" },
            { text: "Analyze visitor conversion funnel and rage clicks on Summer Lookbook", agent: "agent-cro-analyst", icon: "activity", tint: "peach" },
            { text: "Scan Instagram comments and sentiment for #AegisWear drop", agent: "agent-social-listening", icon: "sparkles", tint: "mint" },
            { text: "Segment customers who spent >$300 for VIP early access", agent: "agent-campaign-orchestrator", icon: "users", tint: "sky" }
        ],
        launches: [
            { text: "Decompose Autumn '26 lookbook shoot into sprint production tasks", agent: "agent-scrum-master", icon: "checkSquare", tint: "lilac" },
            { text: "Calculate critical path for footwear sample manufacturing", agent: "agent-blocker-slippage", icon: "activity", tint: "peach" },
            { text: "Compile async standup digest for fashion design team", agent: "agent-standup-digest", icon: "users", tint: "mint" }
        ]
    },

    init() {
        const isMobile = window.innerWidth <= 768;
        this.isOpen = !isMobile;
        this.renderDrawer();
        this.bindEvents();

        const drawer = document.getElementById('copilot-drawer');
        if (drawer) {
            drawer.style.transform = this.isOpen ? 'translateX(0)' : 'translateX(100%)';
        }
        const appContainer = document.getElementById('main-workspace');
        if (appContainer) {
            appContainer.style.marginRight = (!isMobile && this.isOpen) ? '390px' : '0px';
        }
    },

    toggle() {
        this.isOpen = !this.isOpen;
        const drawer = document.getElementById('copilot-drawer');
        if (drawer) {
            drawer.style.transform = this.isOpen ? 'translateX(0)' : 'translateX(100%)';
        }
        const appContainer = document.getElementById('main-workspace');
        if (appContainer) {
            const isMobile = window.innerWidth <= 768;
            appContainer.style.marginRight = (!isMobile && this.isOpen) ? '390px' : '0px';
        }
        if (this.isOpen) {
            // Update suggestions whenever drawer opens based on active room
            this.syncWithCurrentModule();
        }
    },

    renderDrawer() {
        let drawer = document.getElementById('copilot-drawer');
        if (!drawer) {
            drawer = document.createElement('aside');
            drawer.id = 'copilot-drawer';
            drawer.className = 'copilot-drawer';
            document.body.appendChild(drawer);
        }

        const isMobile = window.innerWidth <= 768;
        drawer.style.position = 'fixed';
        drawer.style.top = '0';
        drawer.style.right = '0';
        drawer.style.bottom = '0';
        drawer.style.width = isMobile ? '100vw' : '390px';
        drawer.style.maxWidth = isMobile ? '100vw' : '390px';
        drawer.style.background = 'var(--clay-sidebar)';
        drawer.style.boxShadow = '-8px 0 32px rgba(150,165,190,0.28)';
        drawer.style.borderLeft = '1px solid var(--clay-nav-border)';
        drawer.style.zIndex = '1200';
        drawer.style.display = 'flex';
        drawer.style.flexDirection = 'column';
        drawer.style.transition = 'transform 0.3s cubic-bezier(0.16,1,0.3,1)';
        drawer.style.transform = this.isOpen ? 'translateX(0)' : 'translateX(100%)';

        drawer.innerHTML = `
            <!-- Copilot Header (Pastel Lilac Container) -->
            <div id="copilot-header" style="padding: 14px 18px; background: var(--clay-lilac); display: flex; align-items: center; justify-content: space-between; box-shadow: 0 4px 14px rgba(197,184,249,0.3); border-bottom: 1px solid var(--clay-nav-border);">
                <div style="display:flex; align-items:center; gap:12px;">
                    <div style="width:36px; height:36px; border-radius:12px; background:var(--clay-coral); display:flex; align-items:center; justify-content:center; box-shadow: 2px 4px 8px rgba(255,124,99,0.4), inset 1px 1px 2px rgba(255,255,255,0.6);">
                        ${Icons.get('sparkles', 18, '#FFFFFF')}
                    </div>
                    <div>
                        <div style="font-size:14px; font-weight:800; color:var(--clay-header-text);">Store Assistant</div>
                        <div style="font-size:11px; color:#10B981; font-weight:700; display:flex; align-items:center; gap:6px; margin-top:1px;">
                            <span class="pulse-dot online" style="width:6px; height:6px;"></span>
                            <span>Ready to assist your store</span>
                        </div>
                    </div>
                </div>
                <button class="clay-btn-soft-circle" onclick="Copilot.toggle()" style="width:34px; height:34px;" title="Close Assistant">
                    ${Icons.get('x', 14, 'var(--text-primary)')}
                </button>
            </div>

            <!-- Quick Action Selector Pills (Touch-scrollable) -->
            <div id="copilot-chips-bar" style="padding: 10px 14px; background: var(--clay-surface-recessed); display:flex; gap:8px; overflow-x:auto; border-bottom:1px solid var(--clay-nav-border); -webkit-overflow-scrolling:touch;">
                <button class="clay-btn copilot-agent-chip active" data-cat="inventory" onclick="Copilot.selectCategory('inventory', 'agent-inventory-forecast', this)" style="padding:6px 14px; font-size:11px; white-space:nowrap; border-radius:9999px;">
                    Check Stock
                </button>
                <button class="clay-btn copilot-agent-chip" data-cat="wholesale" onclick="Copilot.selectCategory('wholesale', 'agent-deal-desk', this)" style="padding:6px 14px; font-size:11px; white-space:nowrap; border-radius:9999px;">
                    Wholesale Deals
                </button>
                <button class="clay-btn copilot-agent-chip" data-cat="trends" onclick="Copilot.selectCategory('trends', 'agent-data-scientist', this)" style="padding:6px 14px; font-size:11px; white-space:nowrap; border-radius:9999px;">
                    Sales Trends
                </button>
                <button class="clay-btn copilot-agent-chip" data-cat="support" onclick="Copilot.selectCategory('support', 'agent-tier1-2-resolution', this)" style="padding:6px 14px; font-size:11px; white-space:nowrap; border-radius:9999px;">
                    Customer Help
                </button>
                <button class="clay-btn copilot-agent-chip" data-cat="marketing" onclick="Copilot.selectCategory('marketing', 'agent-campaign-orchestrator', this)" style="padding:6px 14px; font-size:11px; white-space:nowrap; border-radius:9999px;">
                    Drops &amp; Ads
                </button>
            </div>

            <!-- Messages Stream Area -->
            <div id="copilot-messages" style="flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:14px; background:var(--clay-bg); -webkit-overflow-scrolling:touch;">
                <!-- Dynamic Suggestions Greeting Card -->
                <div id="copilot-dynamic-suggestions"></div>
            </div>

            <!-- Input Box Container (Mobile Keyboard Protected) -->
            <div style="padding: 14px 16px; background: var(--clay-surface-recessed); border-top: 1px solid var(--clay-nav-border); padding-bottom: max(14px, env(safe-area-inset-bottom));">
                <form id="copilot-input-form" onsubmit="Copilot.handleSubmit(event)" style="display:flex; flex-direction:column; gap:10px;">
                    <textarea id="copilot-input" class="clay-input" placeholder="Ask anything about your store, orders, or stock..." 
                        rows="2" style="width:100%; resize:none; font-family:inherit; border-radius:16px; background:var(--clay-surface); color:var(--text-primary); border:1px solid var(--clay-nav-border); font-size:13px; padding:10px 14px;"></textarea>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:11px; color:var(--text-muted); font-weight:600;">Store Safeguards Active</span>
                        <button type="submit" class="clay-btn clay-btn-coral" style="padding:8px 18px; font-size:12px; gap:6px;">
                            <span>Ask Assistant</span>
                            ${Icons.get('send', 14, '#FFFFFF')}
                        </button>
                    </div>
                </form>
            </div>
        `;

        const appContainer = document.getElementById('main-workspace');
        if (appContainer && window.innerWidth > 768) {
            appContainer.style.marginRight = '390px';
        }

        // Render dynamic suggestions
        this.renderSuggestions();
    },

    bindEvents() {
        const input = document.getElementById('copilot-input');
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleSubmit(e);
                }
            });
        }
        window.addEventListener('resize', () => {
            const appContainer = document.getElementById('main-workspace');
            if (appContainer) {
                if (window.innerWidth <= 768) {
                    appContainer.style.marginRight = '0px';
                } else if (this.isOpen) {
                    appContainer.style.marginRight = '390px';
                }
            }
        });
    },

    syncWithCurrentModule() {
        const mod = (window.AegisApp && AegisApp.currentModule) ? AegisApp.currentModule : 'overview';
        const modMap = {
            overview: 'overview',
            crm: 'wholesale',
            finance: 'inventory',
            marketing: 'marketing',
            support: 'support',
            projects: 'launches',
            analytics: 'trends',
            developer: 'inventory',
            agents: 'wholesale'
        };
        const cat = modMap[mod] || 'overview';
        this.currentCategory = cat;
        this.updateChipHighlight(cat);
        this.renderSuggestions();
    },

    updateChipHighlight(cat) {
        document.querySelectorAll('.copilot-agent-chip').forEach(b => {
            if (b.dataset.cat === cat) {
                b.style.background = 'var(--clay-coral)';
                b.style.color = '#FFFFFF';
                b.style.boxShadow = '3px 5px 12px rgba(255,124,99,0.4), inset 1px 1px 2px rgba(255,255,255,0.6)';
            } else {
                b.style.background = 'var(--clay-surface)';
                b.style.color = 'var(--text-primary)';
                b.style.boxShadow = 'var(--clay-shadow-sm)';
            }
        });
    },

    selectCategory(cat, agentId, btnElem) {
        this.currentCategory = cat;
        if (agentId) this.activeAgent = agentId;
        this.updateChipHighlight(cat);
        this.suggestionOffset = 0;
        this.renderSuggestions();
    },

    shuffleSuggestions() {
        this.suggestionOffset = (this.suggestionOffset + 3);
        this.renderSuggestions(true);
    },

    renderSuggestions(isShuffling = false) {
        const container = document.getElementById('copilot-dynamic-suggestions');
        if (!container) return;

        const hour = new Date().getHours();
        const greeting = hour < 12 ? 'Good morning' : (hour < 17 ? 'Good afternoon' : 'Good evening');

        // Gather relevant suggestions
        let pool = [];
        if (this.currentCategory === 'overview') {
            // Mix from wholesale, inventory, and trends
            pool = [
                ...this.suggestionPool.inventory.slice(0, 2),
                ...this.suggestionPool.wholesale.slice(0, 2),
                ...this.suggestionPool.trends.slice(0, 2)
            ];
        } else {
            pool = this.suggestionPool[this.currentCategory] || this.suggestionPool.inventory;
        }

        // Rotate through pool using offset
        const total = pool.length;
        const start = this.suggestionOffset % total;
        let selected = [];
        for (let i = 0; i < Math.min(3, total); i++) {
            selected.push(pool[(start + i) % total]);
        }

        // Check if there are pending HITL approvals
        const pendingCount = (window.HitlManager && HitlManager.pendingApprovals) ? HitlManager.pendingApprovals.length : 0;
        let urgentCardHtml = '';
        if (pendingCount > 0) {
            const firstHitl = HitlManager.pendingApprovals[0];
            urgentCardHtml = `
                <div class="clay-card clay-card-tint-peach clay-card-interactive" style="border: 1.5px solid var(--clay-coral); padding: 12px 14px; margin-bottom: 10px; cursor:pointer;" onclick="Copilot.sendQuickPrompt('Review pending store approval: ${firstHitl.actionType || 'Wholesale order'}', '${firstHitl.agentId || 'agent-deal-desk'}')">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="clay-badge clay-badge-coral" style="font-size:10px;">
                            ${Icons.get('shield', 12, '#FFFFFF')}
                            <span>BOSS APPROVAL WAITING</span>
                        </span>
                        <span style="font-size:11px; font-weight:800; color:var(--clay-coral);">Review Now ➔</span>
                    </div>
                    <div style="font-size:12px; font-weight:800; color:var(--text-primary); margin-top:6px;">
                        ${firstHitl.actionType || 'Wholesale Discount Sign-Off'}
                    </div>
                    <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">
                        ${firstHitl.description || 'Action held by store safeguards'}
                    </div>
                </div>
            `;
        }

        const categoryLabels = {
            overview: 'Store Operations',
            inventory: 'Stock & Warehouse',
            wholesale: 'Wholesale & Boutiques',
            trends: 'Sales Trends & BI',
            support: 'Customer Care & Swaps',
            marketing: 'Summer Drops & Ads',
            launches: 'Collection Launches'
        };
        const currentLabel = categoryLabels[this.currentCategory] || 'Store Operations';

        container.innerHTML = `
            <div class="clay-card clay-card-tint-lilac" style="padding:16px; font-size:12px; line-height:1.5; transition: all 0.25s ease;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <div style="font-weight:800; font-size:13px; display:flex; align-items:center; gap:8px;">
                        ${Icons.get('sparkles', 16, 'var(--clay-coral)')}
                        <span>${greeting}, Prerna!</span>
                    </div>
                    <button class="clay-btn-soft-circle" style="width:30px; height:30px; padding:0;" onclick="Copilot.shuffleSuggestions()" title="Shuffle Suggestions">
                        ${Icons.get('refresh', 14, 'var(--text-primary)')}
                    </button>
                </div>
                
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                    <span style="color:var(--text-muted); font-size:11px;">Suggested for <strong>${currentLabel}</strong>:</span>
                    <button onclick="Copilot.shuffleSuggestions()" style="background:none; border:none; color:var(--clay-coral); font-size:11px; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:4px; padding:0;">
                        <span>Shuffle</span>
                        ${Icons.get('sparkles', 11, 'var(--clay-coral)')}
                    </button>
                </div>

                ${urgentCardHtml}

                <div style="display:flex; flex-direction:column; gap:8px;">
                    ${selected.map(item => `
                        <button class="clay-card clay-card-tint-${item.tint} clay-card-interactive" style="font-size:11px; text-align:left; justify-content:flex-start; border-radius:14px; width:100%; padding:10px 14px; display:flex; align-items:center; gap:10px; cursor:pointer;" onclick="Copilot.sendQuickPrompt('${item.text.replace(/'/g, "\\'")}', '${item.agent}')">
                            ${Icons.get(item.icon, 14, 'currentColor')}
                            <span style="font-weight:700; flex:1; line-height:1.35;">${item.text}</span>
                            ${Icons.get('arrowRight', 12, 'currentColor')}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    },

    sendQuickPrompt(promptText, agentId = null) {
        if (agentId) this.activeAgent = agentId;
        const input = document.getElementById('copilot-input');
        if (input) {
            input.value = promptText;
            this.handleSubmit(new Event('submit'));
        }
    },

    async handleSubmit(e) {
        if (e && e.preventDefault) e.preventDefault();
        const input = document.getElementById('copilot-input');
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;

        input.value = '';
        this.appendUserMessage(text);

        const thinkingId = 'think-' + Date.now();
        this.appendThinkingIndicator(thinkingId, this.activeAgent);

        try {
            const res = await fetch('/api/agents/invoke', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    agentId: this.activeAgent,
                    prompt: text,
                    context: {
                        client: text.includes('Nordic') ? 'Nordic Streetwear Boutique' : (text.includes('Soho') ? 'Soho Fashion House' : undefined),
                        amount: text.includes('65,000') || text.includes('65k') ? 65000 : 50000,
                        discountPercent: text.includes('15%') ? 15.0 : 10.0
                    }
                })
            });

            const data = await res.json();
            const thinkElem = document.getElementById(thinkingId);
            if (thinkElem) thinkElem.remove();

            this.renderAgentResponse(data, text);
        } catch (err) {
            const thinkElem = document.getElementById(thinkingId);
            if (thinkElem) thinkElem.remove();
            this.appendErrorMessage(`AI execution failed: ${err.message}`);
        }
    },

    appendUserMessage(text) {
        const container = document.getElementById('copilot-messages');
        const div = document.createElement('div');
        div.style.cssText = `
            align-self: flex-end; max-width: 85%; background: var(--clay-coral);
            color: #FFFFFF; padding: 12px 18px; border-radius: 20px 20px 4px 20px;
            font-size: 13px; line-height: 1.4; word-break: break-word;
            box-shadow: 4px 6px 16px rgba(255,124,99,0.35), inset 2px 2px 4px rgba(255,255,255,0.5), inset -2px -2px 4px rgba(180,50,30,0.25);
            font-weight: 600;
        `;
        div.textContent = text;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    },

    appendAssistantMessage(text, badgeText = 'Confirmed') {
        const container = document.getElementById('copilot-messages');
        if (!container) return;
        const div = document.createElement('div');
        div.style.cssText = `
            align-self: flex-start; width: 100%; display:flex; flex-direction:column; gap:10px;
        `;
        div.innerHTML = `
            <div class="clay-card" style="padding: 16px; font-size: 13px; background:var(--clay-surface);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span style="font-weight:800; color:var(--text-primary);">Store Assistant</span>
                    </div>
                    <span class="clay-badge clay-badge-mint" style="font-size:10px;">
                        ${badgeText}
                    </span>
                </div>
                <div style="color:var(--text-primary); line-height:1.6; font-size:13px; border-left:3px solid var(--clay-mint); padding-left:12px; margin:8px 0; white-space:pre-wrap; font-family:inherit;">
                    ${text}
                </div>
            </div>
        `;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    },

    appendThinkingIndicator(id, agentId) {
        const container = document.getElementById('copilot-messages');
        const div = document.createElement('div');
        div.id = id;
        div.className = 'clay-card';
        div.style.cssText = `
            align-self: flex-start; max-width: 90%; padding: 12px 18px; font-size: 12px;
            color: var(--text-secondary); display:flex; align-items:center; gap:10px;
            font-weight: 600;
        `;
        div.innerHTML = `
            <span class="pulse-dot thinking"></span>
            <span>Checking store data and updating records...</span>
        `;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    },

    renderAgentResponse(data, originalPrompt = '') {
        const container = document.getElementById('copilot-messages');
        const div = document.createElement('div');
        div.style.cssText = `
            align-self: flex-start; width: 100%; display:flex; flex-direction:column; gap:10px;
        `;

        let hitlCardHtml = '';
        if (data.requiresHitl && data.hitlRecord) {
            const h = data.hitlRecord;
            hitlCardHtml = `
                <div id="hitl-card-${h.id}" class="hitl-approval-card" style="border:2px solid var(--clay-coral); border-radius:20px; padding:18px; background:var(--clay-surface);">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="clay-badge clay-badge-coral">
                            ${Icons.get('shield', 14, '#FFFFFF')}
                            <span>STORE MANAGER SIGN-OFF REQUIRED</span>
                        </span>
                        <span style="font-size:11px; font-family:var(--font-mono); color:var(--text-muted); font-weight:700;">Ref #${h.id}</span>
                    </div>
                    <div style="font-weight:800; font-size:14px; color:var(--text-primary); margin-top:10px;">
                        ${h.actionType}
                    </div>
                    <p style="font-size:12px; color:var(--text-secondary); margin-top:6px; line-height:1.4;">
                        ${h.description}
                    </p>
                    <div id="hitl-btns-${h.id}" style="display:flex; gap:10px; margin-top:14px;">
                        <button class="clay-btn clay-btn-mint" style="flex:1; padding:10px; font-size:12px;" onclick="HitlManager.resolve('${h.id}', 'approved')">
                            ${Icons.get('check', 14, '#0E4337')}
                            <span>Approve Action</span>
                        </button>
                        <button class="clay-btn clay-btn-coral" style="flex:1; padding:10px; font-size:12px;" onclick="HitlManager.resolve('${h.id}', 'rejected')">
                            ${Icons.get('x', 14, '#FFFFFF')}
                            <span>Decline</span>
                        </button>
                    </div>
                </div>
            `;
        }

        let chartHtml = '';
        if (data.executionResult && data.executionResult.data && data.executionResult.generatedSql) {
            chartHtml = `
                <div class="clay-card" style="padding:14px; margin-top:10px; background:var(--clay-surface-recessed);">
                    <div style="font-size:11px; color:var(--clay-coral); font-weight:800; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
                        ${Icons.get('barChart', 14, 'var(--clay-coral)')}
                        <span>Store Sales &amp; Inventory Breakdown:</span>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        ${data.executionResult.data.map(d => `
                            <div style="display:flex; justify-content:space-between; font-size:12px; border-bottom:1px solid rgba(0,0,0,0.06); padding:4px 0;">
                                <span style="color:var(--text-secondary); font-weight:600;">${d.category || d.stage || d.status || d.priority || 'Items'}</span>
                                <strong style="color:var(--text-primary); font-family:var(--font-mono);">${d.total_value || d.revenue ? '$' + Number(d.total_value || d.revenue).toLocaleString() : (d.count || d.units || d.stock_on_hand)}</strong>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Smart dynamic follow-up suggestions based on response content
        let followUps = [];
        const lowerPrompt = originalPrompt.toLowerCase();
        if (lowerPrompt.includes('stock') || lowerPrompt.includes('runner') || lowerPrompt.includes('inventory')) {
            followUps = [
                { text: "Order 50 replacement pairs from supplier", agent: "agent-inventory-forecast" },
                { text: "View warehouse stock across hubs", agent: "agent-inventory-forecast" },
                { text: "Notify Soho wholesale account manager", agent: "agent-sdr" }
            ];
        } else if (lowerPrompt.includes('discount') || lowerPrompt.includes('wholesale') || lowerPrompt.includes('soho')) {
            followUps = [
                { text: "Draft Documenso digital contract", agent: "agent-deal-desk" },
                { text: "Check warehouse inventory reservation", agent: "agent-inventory-forecast" },
                { text: "Email Soho Fashion House confirmation", agent: "agent-sdr" }
            ];
        } else if (lowerPrompt.includes('sql') || lowerPrompt.includes('category') || lowerPrompt.includes('revenue') || lowerPrompt.includes('chart')) {
            followUps = [
                { text: "Show top margin apparel items", agent: "agent-data-scientist" },
                { text: "Compare D2C store sales vs wholesale", agent: "agent-data-scientist" },
                { text: "Forecast next month demand", agent: "agent-pipeline-forecast" }
            ];
        } else {
            followUps = [
                { text: "Check Puffy Runner stock levels", agent: "agent-inventory-forecast" },
                { text: "Review wholesale discount limits", agent: "agent-deal-desk" },
                { text: "Show apparel revenue chart", agent: "agent-data-scientist" }
            ];
        }

        const followUpHtml = `
            <div style="margin-top:10px;">
                <div style="font-size:10px; color:var(--text-muted); font-weight:800; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:6px;">Next Suggested Actions:</div>
                <div style="display:flex; flex-wrap:wrap; gap:6px;">
                    ${followUps.map(f => `
                        <button class="clay-badge clay-badge-white" style="cursor:pointer; font-size:11px; padding:6px 10px; border:1px solid var(--clay-nav-border);" onclick="Copilot.sendQuickPrompt('${f.text.replace(/'/g, "\\'")}', '${f.agent}')">
                            ${Icons.get('sparkles', 10, 'var(--clay-coral)')}
                            <span>${f.text}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        div.innerHTML = `
            <div class="clay-card" style="padding: 16px; font-size: 13px; background:var(--clay-surface);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span style="font-weight:800; color:var(--text-primary);">Store Assistant</span>
                    </div>
                    <span class="clay-badge ${data.requiresHitl ? 'clay-badge-coral' : 'clay-badge-mint'}" style="font-size:10px;">
                        ${data.requiresHitl ? 'Action Pending Review' : 'Updated'}
                    </span>
                </div>
                <div style="color:var(--text-primary); line-height:1.6; font-size:13px; border-left:3px solid var(--clay-coral); padding-left:12px; margin:8px 0; white-space:pre-wrap; font-family:inherit;">
                    ${data.reasoningTrace}
                </div>
                ${chartHtml}
                ${followUpHtml}
            </div>
            ${hitlCardHtml}
        `;

        container.appendChild(div);
        container.scrollTop = container.scrollHeight;

        if (data.undoAvailable) {
            HitlManager.showLevel2UndoToast('Store Action', 'undo-' + Date.now());
        }
    },

    appendErrorMessage(msg) {
        const container = document.getElementById('copilot-messages');
        const div = document.createElement('div');
        div.className = 'clay-card';
        div.style.cssText = `
            align-self: flex-start; max-width: 90%; background: #FFF1F2;
            color: #E11D48; padding: 12px 16px; font-size: 12px; font-weight:600;
        `;
        div.textContent = msg;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }
};

window.Copilot = Copilot;