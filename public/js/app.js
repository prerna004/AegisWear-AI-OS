// ============================================================================
// AegisOS: Core Application Shell & Router (Pastel Claymorphic Edition)
// Authentic Setproduct Claymorphism - Zero Emojis - Vector SVG Iconography
// ============================================================================

// Global resilient modal close handler
window.closeModal = function(elem) {
    if (!elem) {
        document.querySelectorAll('.clay-modal-backdrop, .myntra-login-backdrop, [id$="-modal"], div[style*="position:fixed"], div[style*="position: fixed"]').forEach(m => m.remove());
        return;
    }
    if (elem.nodeType === 1 && (elem.classList.contains('clay-modal-backdrop') || elem.classList.contains('myntra-login-backdrop') || elem.style.position === 'fixed')) {
        elem.remove();
        return;
    }
    const modal = elem.closest('.clay-modal-backdrop, .myntra-login-backdrop, [id$="-modal"], div[style*="position:fixed"], div[style*="position: fixed"]');
    if (modal) {
        modal.remove();
        return;
    }
    let cur = elem.parentElement;
    while (cur && cur !== document.body) {
        const pos = window.getComputedStyle(cur).position;
        if (pos === 'fixed' || (pos === 'absolute' && Number(cur.style.zIndex || 0) > 100)) {
            cur.remove();
            return;
        }
        cur = cur.parentElement;
    }
    document.querySelectorAll('.clay-modal-backdrop, div[style*="position: fixed"], div[style*="position:fixed"]').forEach(m => m.remove());
};

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.closeModal();
    }
});

const AegisApp = {
    currentModule: 'overview',
    isDesktopMode: false,
    currentTheme: 'light',
    accentMode: 'fuchsia',

    init() {
        console.log('[AegisOS] Booting Pastel Claymorphic Single-Pane UI Shell...');
        try {
            this.currentTheme = localStorage.getItem('aegis-theme') || 'light';
            document.documentElement.setAttribute('data-theme', this.currentTheme);
            this.accentMode = localStorage.getItem('aegis-accent') || 'fuchsia';
            document.documentElement.setAttribute('data-accent', this.accentMode);
        } catch (e) {
            console.warn('[AegisOS] Theme init fallback:', e);
        }

        try {
            this.populateIcons();
        } catch (e) {
            console.error('[AegisOS] Icon population error:', e);
        }

        try {
            this.bindGlobalShortcuts();
        } catch (e) {
            console.error('[AegisOS] Shortcuts error:', e);
        }

        try {
            this.setupNavigation();
        } catch (e) {
            console.error('[AegisOS] Nav setup error:', e);
        }

        try {
            this.initTicker();
        } catch (e) {
            console.error('[AegisOS] Ticker error:', e);
        }

        try {
            if (window.HitlManager) HitlManager.init();
        } catch (e) {
            console.error('[AegisOS] HITL error:', e);
        }

        try {
            if (window.Copilot) Copilot.init();
        } catch (e) {
            console.error('[AegisOS] Copilot error:', e);
        }

        try {
            this.switchModule('overview');
        } catch (e) {
            console.error('[AegisOS] Overview render error:', e);
        }
    },

    initTicker() {
        const facts = [
            "Summer Drop: 38 pairs of Puffy Runners shipped today",
            "Wholesale: Soho Fashion House bulk order in review ($65,000)",
            "Warehouse: 18 Puffy Runners in stock (Auto-reorder queued)",
            "Customer Care: 99.4% customer satisfaction rating",
            "Operations: 26 Digital Specialists active & synced",
            "Lookbook: Copenhagen Boutique partnership approved"
        ];
        let idx = 0;
        setInterval(() => {
            const tickerText = document.getElementById('ticker-text');
            if (!tickerText) return;
            idx = (idx + 1) % facts.length;
            tickerText.style.opacity = '0';
            tickerText.style.transform = 'translateY(-6px)';
            setTimeout(() => {
                tickerText.textContent = facts[idx];
                tickerText.style.opacity = '1';
                tickerText.style.transform = 'translateY(0)';
            }, 250);
        }, 5000);
    },

    populateIcons() {
        if (!window.Icons) return;
        const setIcon = (id, name, size = 18, color = 'currentColor') => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = Icons.get(name, size, color);
        };

        setIcon('nav-icon-overview', 'home', 18);
        setIcon('nav-icon-agents', 'robot', 18);
        setIcon('nav-icon-developer', 'code', 18);
        setIcon('nav-icon-crm', 'briefcase', 18);
        setIcon('nav-icon-marketing', 'megaphone', 18);
        setIcon('nav-icon-support', 'headset', 18);
        setIcon('nav-icon-finance', 'dollar', 18);
        setIcon('nav-icon-hr', 'users', 18);
        setIcon('nav-icon-collab', 'mail', 18);
        setIcon('nav-icon-projects', 'checkSquare', 18);
        setIcon('nav-icon-itsm', 'shield', 18);
        setIcon('nav-icon-analytics', 'barChart', 18);
        setIcon('user-memory-icon', 'brain', 16, 'var(--text-primary)');
        setIcon('header-search-icon', 'search', 16, '#FFFFFF');
        setIcon('mobile-search-icon', 'search', 17, 'var(--text-primary)');
        setIcon('theme-btn-icon', 'sun', 18, 'var(--text-primary)');
        setIcon('palette-btn-icon', 'palette', 18, 'var(--clay-coral)');
        setIcon('header-bell-icon', 'bell', 18, 'var(--text-primary)');
        setIcon('header-desktop-icon', 'desktop', 18, 'var(--text-primary)');
        setIcon('header-copilot-icon', 'sparkles', 18, '#FFFFFF');
        setIcon('cmd-search-icon', 'search', 20, 'var(--clay-coral)');
        setIcon('mobile-hamburger-icon', 'menu', 18, 'var(--text-primary)');
        setIcon('dock-icon-overview', 'home', 18, 'currentColor');
        setIcon('dock-icon-rooms', 'sliders', 18, 'currentColor');
        setIcon('dock-icon-approvals', 'checkSquare', 18, 'currentColor');
        setIcon('dock-icon-copilot', 'sparkles', 18, '#FFFFFF');
    },

    toggleMobileMenu() {
        const drawer = document.getElementById('sidebar-drawer');
        const backdrop = document.getElementById('sidebar-backdrop');
        if (drawer) {
            const isOpen = drawer.classList.toggle('open');
            if (backdrop) backdrop.classList.toggle('open', isOpen);
        }
    },

    closeMobileMenu() {
        const drawer = document.getElementById('sidebar-drawer');
        const backdrop = document.getElementById('sidebar-backdrop');
        if (drawer) drawer.classList.remove('open');
        if (backdrop) backdrop.classList.remove('open');
    },

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(() => console.log('[PWA] Service Worker active for Desktop Installability.'))
                .catch(err => console.warn('[PWA] Service Worker registration failed:', err));
        }
    },

    bindGlobalShortcuts() {
        window.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.toggleCommandPalette();
            }
            if (e.key === 'Escape') {
                this.closeCommandPalette();
                this.closeMobileMenu();
                const memModal = document.getElementById('memory-modal');
                if (memModal) memModal.remove();
            }
        });
    },

    setupNavigation() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const mod = item.dataset.module;
                if (mod) this.switchModule(mod);
                this.closeMobileMenu();
            });
        });
    },

    switchModule(moduleName) {
        this.currentModule = moduleName;
        this.closeMobileMenu();

        // Sync Copilot dynamic suggestions with the active room
        if (window.Copilot && Copilot.syncWithCurrentModule) {
            Copilot.syncWithCurrentModule();
        }

        // Update mobile bottom dock active button
        document.querySelectorAll('.mobile-dock-btn').forEach(btn => {
            const tab = btn.dataset.tab;
            if (tab === moduleName) {
                btn.classList.add('active');
            } else if (tab === 'rooms' && moduleName !== 'overview' && moduleName !== 'agents') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Highlight active nav button with puffy clay depressed state
        document.querySelectorAll('.nav-item').forEach(item => {
            if (item.dataset.module === moduleName) {
                item.style.background = 'var(--clay-coral)';
                item.style.color = '#FFFFFF';
                item.style.boxShadow = '5px 8px 18px rgba(255, 124, 99, 0.42), inset 2px 2px 4px rgba(255, 255, 255, 0.6), inset -2px -2px 4px rgba(180, 50, 30, 0.3)';
                const sub = item.querySelector('div div:last-child');
                if (sub) sub.style.color = 'rgba(255,255,255,0.85)';
            } else {
                item.style.background = '#FFFFFF';
                item.style.color = 'var(--text-primary)';
                item.style.boxShadow = 'var(--clay-shadow-sm)';
                const sub = item.querySelector('div div:last-child');
                if (sub) sub.style.color = 'var(--text-muted)';
            }
        });

        const container = document.getElementById('module-content-area');
        if (!container) return;
        container.innerHTML = `<div style="text-align:center; padding:50px; color:var(--text-muted); font-size:14px; font-weight:700;">Opening ${moduleName}...</div>`;

        const runModuleRender = async () => {
            switch (moduleName) {
                case 'overview':
                    return this.renderOverview(container);
                case 'crm':
                    return CrmModule.render(container);
                case 'marketing':
                    return MarketingModule.render(container);
                case 'support':
                    return SupportModule.render(container);
                case 'finance':
                    return FinanceModule.render(container);
                case 'hr':
                    return HrModule.render(container);
                case 'collab':
                    return CollabModule.render(container);
                case 'projects':
                    return ProjectsModule.render(container);
                case 'itsm':
                    return ItsmModule.render(container);
                case 'analytics':
                    return AnalyticsModule.render(container);
                case 'agents':
                    return AgentsViewModule.render(container);
                case 'developer':
                    return DeveloperModule.render(container);
                default:
                    return this.renderOverview(container);
            }
        };

        runModuleRender().catch(err => {
            console.error(`[AegisApp] Error rendering module ${moduleName}:`, err);
            // Auto fallback: If CrmModule fails, ensure container still renders from store
            if (moduleName === 'crm' && window.CrmModule) {
                try {
                    CrmModule.render(container);
                    return;
                } catch(e) {}
            }
            container.innerHTML = `
                <div class="clay-card" style="padding:32px; text-align:center; max-width:540px; margin:40px auto; background:var(--clay-surface);">
                    <div style="font-size:18px; font-weight:800; color:var(--clay-coral);">Room Loading Fallback</div>
                    <p style="font-size:13px; color:var(--text-secondary); margin:10px 0 20px;">Could not connect to live server. Displaying cached store data.</p>
                    <button class="clay-btn clay-btn-coral" onclick="AegisApp.switchModule('${moduleName}')">Retry Room Load</button>
                </div>
            `;
        });
    },

    refreshCurrentView() {
        this.switchModule(this.currentModule);
    },

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        const iconContainer = document.getElementById('theme-btn-icon');
        if (iconContainer && window.Icons) {
            iconContainer.innerHTML = Icons.get(this.currentTheme === 'light' ? 'sun' : 'moon', 18, 'var(--text-primary)');
        }
        HitlManager.showToast(`Switched to ${this.currentTheme === 'light' ? 'Light' : 'Dark'} Clay Theme`, 'mint');
    },

    async renderOverview(container) {
        let metrics = { closedWonRevenue: 145000, ordersFulfilled: 1420, satisfactionRate: 99.4 };
        let hitlItems = [];

        if (window.AegisStore) {
            const st = window.AegisStore.getState();
            if (st.metrics) metrics = Object.assign({}, metrics, st.metrics);
            if (st.hitlQueue) hitlItems = st.hitlQueue;
        }

        try {
            const [metricsRes, pendingHitlRes] = await Promise.all([
                fetch('/api/bi/metrics').then(r => r.json()).catch(() => null),
                fetch('/api/hitl/pending').then(r => r.json()).catch(() => null)
            ]);

            if (metricsRes && typeof metricsRes === 'object') {
                metrics = Object.assign({}, metrics, metricsRes);
            }
            if (pendingHitlRes) {
                if (Array.isArray(pendingHitlRes)) {
                    hitlItems = pendingHitlRes;
                } else if (Array.isArray(pendingHitlRes.items)) {
                    hitlItems = pendingHitlRes.items;
                }
            }
        } catch (e) {
            console.warn('[Overview] Fetch notice, using resilient store data:', e);
        }

        const pendingCount = Array.isArray(hitlItems) ? hitlItems.length : 0;
        const revenue = Number(metrics.closedWonRevenue || 145000);
        const hour = new Date().getHours();
        const greeting = hour < 12 ? 'Good morning' : (hour < 17 ? 'Good afternoon' : 'Good evening');

        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:20px;">
                
                <!-- 1. Authentic Coral Hero Card (Directly from Clayshop Screenshot) -->
                <div class="clay-card clay-card-coral hero-overview-card">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <div style="width:100%;">
                            <div class="hero-badges-wrap" style="display:flex; align-items:center; gap:10px; margin-bottom:12px; flex-wrap:wrap;">
                                <span class="clay-badge clay-badge-white" style="color:var(--clay-coral);">
                                    ${Icons.get('sparkles', 14, 'var(--clay-coral)')}
                                    <span>AegisWear Operations</span>
                                </span>
                                <span class="clay-badge clay-badge-mint">
                                    ${Icons.get('check', 14, '#0E4337')}
                                    <span>All Channels Live & Synced</span>
                                </span>
                            </div>
                            <h1 class="hero-overview-title" style="font-size:28px; font-weight:800; color:#FFFFFF; letter-spacing:-0.02em; line-height:1.2;">
                                Welcome back, Prerna — ${greeting}! Your Summer Collection is Live
                            </h1>
                            <p class="hero-overview-desc" style="font-size:14px; color:rgba(255,255,255,0.92); margin-top:8px; max-width:740px; line-height:1.5;">
                                Wholesale boutique orders, warehouse inventory, customer size exchanges, and marketing campaigns are managed smoothly and automatically in one place.
                            </p>
                            
                            <!-- Action Chips & Mint CTA Button (Matching Clayshop Translucent Chips) -->
                            <div class="hero-actions-container" style="display:flex; align-items:center; gap:12px; margin-top:20px; flex-wrap:wrap;">
                                <button class="clay-btn clay-btn-mint hero-assistant-btn" onclick="Copilot.toggle()">
                                    ${Icons.get('sparkles', 16, '#0E4337')}
                                    <span>Open Store Assistant</span>
                                    ${Icons.get('arrowRight', 16, '#0E4337')}
                                </button>
                                <div class="hero-pills-rail">
                                    <button class="clay-btn-hero-pill" onclick="AegisApp.switchModule('crm')">
                                        ${Icons.get('briefcase', 14, '#FFFFFF')}
                                        <span>Wholesale Orders</span>
                                    </button>
                                    <button class="clay-btn-hero-pill" onclick="AegisApp.switchModule('finance')">
                                        ${Icons.get('dollar', 14, '#FFFFFF')}
                                        <span>Warehouse Stock</span>
                                    </button>
                                    <button class="clay-btn-hero-pill" onclick="AegisApp.switchModule('support')">
                                        ${Icons.get('refresh', 14, '#FFFFFF')}
                                        <span>Size Exchanges</span>
                                    </button>
                                    <button class="clay-btn-hero-pill" onclick="AegisApp.switchModule('analytics')">
                                        ${Icons.get('barChart', 14, '#FFFFFF')}
                                        <span>Sales Insights</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 2. Four Quick Pastel Stat Cards (Mint, Lilac, Butter, Sky) -->
                <div class="stat-cards-grid">
                    <!-- Mint Card -->
                    <div class="clay-card clay-card-mint stat-card-item">
                        <div class="stat-card-header">
                            <span class="stat-card-label">Total Revenue</span>
                            <div class="stat-card-icon-badge">${Icons.get('dollar', 20, 'currentColor')}</div>
                        </div>
                        <div class="stat-card-value">$${revenue.toLocaleString()}</div>
                        <div class="stat-card-sub">+28% this month across all stores</div>
                    </div>

                    <!-- Lilac Card -->
                    <div class="clay-card clay-card-lilac stat-card-item">
                        <div class="stat-card-header">
                            <span class="stat-card-label">Orders Fulfilled</span>
                            <div class="stat-card-icon-badge">${Icons.get('check', 20, 'currentColor')}</div>
                        </div>
                        <div class="stat-card-value">1,420 Orders</div>
                        <div class="stat-card-sub">Hoodies, sneakers & caps dispatched</div>
                    </div>

                    <!-- Butter Yellow Card -->
                    <div class="clay-card clay-card-butter stat-card-item">
                        <div class="stat-card-header">
                            <span class="stat-card-label">Orders Needing Review</span>
                            <div class="stat-card-icon-badge">${Icons.get('alertTriangle', 20, 'currentColor')}</div>
                        </div>
                        <div class="stat-card-value">${pendingCount} Pending</div>
                        <div class="stat-card-sub">Bulk discounts & high-value returns</div>
                    </div>

                    <!-- Sky Blue Card -->
                    <div class="clay-card clay-card-sky stat-card-item">
                        <div class="stat-card-header">
                            <span class="stat-card-label">Customer Satisfaction</span>
                            <div class="stat-card-icon-badge">${Icons.get('activity', 20, 'currentColor')}</div>
                        </div>
                        <div class="stat-card-value">99.4% Positive</div>
                        <div class="stat-card-sub">Same-day size exchanges & delivery</div>
                    </div>
                </div>

                <!-- 3. The Store Departments Grid (Pastel Clay Cards) -->
                <div class="clay-card department-container-card" style="padding:24px; background:var(--clay-surface);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
                        <div>
                            <h3 style="font-size:16px; font-weight:800; color:var(--text-primary);">Store Departments & Operations</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Select any department to inspect live activity and inventory.</p>
                        </div>
                        <span class="clay-badge clay-badge-mint">All Systems Online</span>
                    </div>

                    <div class="department-rooms-grid">
                        <!-- Wholesale & Boutiques -->
                        <div class="clay-card clay-card-tint-peach clay-card-interactive" style="padding:18px;" onclick="AegisApp.switchModule('crm')">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <div style="width:36px; height:36px; border-radius:12px; background:var(--clay-coral); color:#FFFFFF; display:flex; align-items:center; justify-content:center; box-shadow: 2px 4px 8px rgba(255,124,99,0.35), inset 1px 1px 2px rgba(255,255,255,0.6);">
                                    ${Icons.get('briefcase', 18, '#FFFFFF')}
                                </div>
                                <span class="clay-badge clay-badge-coral">Wholesale</span>
                            </div>
                            <div style="font-size:14px; font-weight:800; margin-top:10px;">Wholesale & Boutiques</div>
                            <p style="font-size:12px; margin-top:4px; line-height:1.4; opacity:0.88;">
                                Review bulk orders from partner stores, negotiate wholesale pricing, and track signed digital buyer contracts.
                            </p>
                            <div style="font-size:11px; font-weight:800; margin-top:10px;">Open Wholesale ➔</div>
                        </div>

                        <!-- Marketing & Campaigns -->
                        <div class="clay-card clay-card-tint-butter clay-card-interactive" style="padding:18px;" onclick="AegisApp.switchModule('marketing')">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <div style="width:36px; height:36px; border-radius:12px; background:var(--clay-butter); color:var(--clay-butter-dark); display:flex; align-items:center; justify-content:center; box-shadow: 2px 4px 8px rgba(255,232,141,0.4), inset 1px 1px 2px rgba(255,255,255,0.7);">
                                    ${Icons.get('megaphone', 18, 'var(--clay-butter-dark)')}
                                </div>
                                <span class="clay-badge clay-badge-butter">Marketing</span>
                            </div>
                            <div style="font-size:14px; font-weight:800; margin-top:10px;">Marketing & Campaigns</div>
                            <p style="font-size:12px; margin-top:4px; line-height:1.4; opacity:0.85;">
                                Launch summer drop email campaigns, monitor Instagram feedback, and optimize checkout conversion.
                            </p>
                            <div style="font-size:11px; font-weight:800; margin-top:10px;">Open Marketing ➔</div>
                        </div>

                        <!-- Returns & Customer Care -->
                        <div class="clay-card clay-card-tint-lilac clay-card-interactive" style="padding:18px;" onclick="AegisApp.switchModule('support')">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <div style="width:36px; height:36px; border-radius:12px; background:var(--clay-lilac); color:var(--text-on-lilac); display:flex; align-items:center; justify-content:center; box-shadow: 2px 4px 8px rgba(197,184,249,0.4), inset 1px 1px 2px rgba(255,255,255,0.7);">
                                    ${Icons.get('headset', 18, 'var(--text-on-lilac)')}
                                </div>
                                <span class="clay-badge clay-badge-lilac">Care & Help</span>
                            </div>
                            <div style="font-size:14px; font-weight:800; margin-top:10px;">Returns & Customer Care</div>
                            <p style="font-size:12px; margin-top:4px; line-height:1.4; opacity:0.85;">
                                Handle hoodie and sneaker size swaps in 60s, print return labels, and track customer shipments.
                            </p>
                            <div style="font-size:11px; font-weight:800; margin-top:10px;">Open Returns ➔</div>
                        </div>

                        <!-- Warehouse & Inventory -->
                        <div class="clay-card clay-card-tint-mint clay-card-interactive" style="padding:18px;" onclick="AegisApp.switchModule('finance')">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <div style="width:36px; height:36px; border-radius:12px; background:var(--clay-mint); color:var(--text-on-mint); display:flex; align-items:center; justify-content:center; box-shadow: 2px 4px 8px rgba(122,232,194,0.4), inset 1px 1px 2px rgba(255,255,255,0.7);">
                                    ${Icons.get('dollar', 18, 'var(--text-on-mint)')}
                                </div>
                                <span class="clay-badge clay-badge-mint">Inventory</span>
                            </div>
                            <div style="font-size:14px; font-weight:800; margin-top:10px;">Warehouse & Inventory</div>
                            <p style="font-size:12px; margin-top:4px; line-height:1.4; opacity:0.85;">
                                Check live stock for hoodies, sneakers & bags across warehouses, scan supplier bills, and prevent stockouts.
                            </p>
                            <div style="font-size:11px; font-weight:800; margin-top:10px;">Open Inventory ➔</div>
                        </div>

                        <!-- Design Team & Staff -->
                        <div class="clay-card clay-card-tint-butter clay-card-interactive" style="padding:18px;" onclick="AegisApp.switchModule('hr')">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <div style="width:36px; height:36px; border-radius:12px; background:var(--clay-butter); color:var(--text-on-butter); display:flex; align-items:center; justify-content:center; box-shadow: 2px 4px 8px rgba(255,232,141,0.4), inset 1px 1px 2px rgba(255,255,255,0.7);">
                                    ${Icons.get('users', 18, 'var(--text-on-butter)')}
                                </div>
                                <span class="clay-badge clay-badge-butter">Team & Staff</span>
                            </div>
                            <div style="font-size:14px; font-weight:800; margin-top:10px;">Design Team & Staff</div>
                            <p style="font-size:12px; margin-top:4px; line-height:1.4; opacity:0.85;">
                                Coordinate store employee shifts, screen design portfolios, and manage staff time-off requests.
                            </p>
                            <div style="font-size:11px; font-weight:800; margin-top:10px;">Open Team ➔</div>
                        </div>

                        <!-- Design Studio & Chat -->
                        <div class="clay-card clay-card-tint-sky clay-card-interactive" style="padding:18px;" onclick="AegisApp.switchModule('collab')">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <div style="width:36px; height:36px; border-radius:12px; background:var(--clay-sky); color:var(--text-on-sky); display:flex; align-items:center; justify-content:center; box-shadow: 2px 4px 8px rgba(174,228,255,0.4), inset 1px 1px 2px rgba(255,255,255,0.7);">
                                    ${Icons.get('mail', 18, 'var(--text-on-sky)')}
                                </div>
                                <span class="clay-badge clay-badge-sky">Studio Chat</span>
                            </div>
                            <div style="font-size:14px; font-weight:800; margin-top:10px;">Design Studio & Chat</div>
                            <p style="font-size:12px; margin-top:4px; line-height:1.4; opacity:0.85;">
                                Review wholesale buyer emails, designer lookbook notes, and supplier fabric agreements.
                            </p>
                            <div style="font-size:11px; font-weight:800; margin-top:10px;">Open Studio ➔</div>
                        </div>

                        <!-- Collection Launches -->
                        <div class="clay-card clay-card-tint-periwinkle clay-card-interactive" style="padding:18px;" onclick="AegisApp.switchModule('projects')">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <div style="width:36px; height:36px; border-radius:12px; background:var(--clay-periwinkle); color:var(--clay-periwinkle-dark); display:flex; align-items:center; justify-content:center; box-shadow: 2px 4px 8px rgba(205,195,251,0.4), inset 1px 1px 2px rgba(255,255,255,0.7);">
                                    ${Icons.get('checkSquare', 18, 'var(--clay-periwinkle-dark)')}
                                </div>
                                <span class="clay-badge clay-badge-lilac">Launches</span>
                            </div>
                            <div style="font-size:14px; font-weight:800; margin-top:10px;">Collection Launches</div>
                            <p style="font-size:12px; margin-top:4px; line-height:1.4; opacity:0.85;">
                                Keep seasonal fashion lines on schedule, track factory production milestones, and prevent delays.
                            </p>
                            <div style="font-size:11px; font-weight:800; margin-top:10px;">Open Launches ➔</div>
                        </div>

                        <!-- Store Registers & POS -->
                        <div class="clay-card clay-card-tint-mint clay-card-interactive" style="padding:18px;" onclick="AegisApp.switchModule('itsm')">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <div style="width:36px; height:36px; border-radius:12px; background:var(--clay-mint); color:var(--text-on-mint); display:flex; align-items:center; justify-content:center; box-shadow: 2px 4px 8px rgba(122,232,194,0.4), inset 1px 1px 2px rgba(255,255,255,0.7);">
                                    ${Icons.get('shield', 18, 'var(--text-on-mint)')}
                                </div>
                                <span class="clay-badge clay-badge-mint">Store POS</span>
                            </div>
                            <div style="font-size:14px; font-weight:800; margin-top:10px;">Store Registers & POS</div>
                            <p style="font-size:12px; margin-top:4px; line-height:1.4; opacity:0.85;">
                                Monitor flagship store checkout iPads, POS card readers, and warehouse barcode scanners.
                            </p>
                            <div style="font-size:11px; font-weight:800; margin-top:10px;">Open POS ➔</div>
                        </div>

                        <!-- Sales Trends & Insights -->
                        <div class="clay-card clay-card-tint-rose clay-card-interactive" style="padding:18px;" onclick="AegisApp.switchModule('analytics')">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <div style="width:36px; height:36px; border-radius:12px; background:var(--clay-coral); color:#FFFFFF; display:flex; align-items:center; justify-content:center; box-shadow: 2px 4px 8px rgba(255,124,99,0.35), inset 1px 1px 2px rgba(255,255,255,0.6);">
                                    ${Icons.get('barChart', 18, '#FFFFFF')}
                                </div>
                                <span class="clay-badge clay-badge-coral">Insights</span>
                            </div>
                            <div style="font-size:14px; font-weight:800; margin-top:10px;">Sales Trends & Insights</div>
                            <p style="font-size:12px; margin-top:4px; line-height:1.4; opacity:0.85;">
                                Ask questions in plain English to see best-selling items, revenue charts, and seasonal trends.
                            </p>
                            <div style="font-size:11px; font-weight:800; margin-top:10px;">Open Insights ➔</div>
                        </div>
                    </div>
                </div>

                <!-- 4. Bottom Notification Bar (Mint Green Bar directly from screenshot) -->
                <div class="clay-banner-mint">
                    ${Icons.get('shield', 20, '#0E4337')}
                    <div style="flex:1;">
                        <strong>Store Protection Policy:</strong> Orders with wholesale discounts above 10% or refunds above $50 are held for store manager review before processing.
                    </div>
                    <button class="clay-btn clay-btn-white" style="font-size:11px; padding:6px 14px;" onclick="AegisApp.switchModule('agents')">
                        Review Activity
                    </button>
                </div>
            </div>
        `;
    },

    toggleDesktopMode() {
        this.isDesktopMode = !this.isDesktopMode;
        const titlebar = document.getElementById('desktop-titlebar');
        if (titlebar) {
            titlebar.classList.toggle('active', this.isDesktopMode);
        }
        HitlManager.showToast(`Desktop App Mode ${this.isDesktopMode ? 'Enabled' : 'Disabled'}`, 'mint');
    },

    toggleCommandPalette() {
        const box = document.getElementById('command-palette-backdrop');
        if (box) {
            box.classList.toggle('active');
            if (box.classList.contains('active')) {
                const input = document.getElementById('cmd-input');
                if (input) {
                    input.value = '';
                    input.focus();
                }
            }
        }
    },

    closeCommandPalette() {
        const box = document.getElementById('command-palette-backdrop');
        if (box) box.classList.remove('active');
    },

    handleCommandSelect(action) {
        this.closeCommandPalette();
        if (action.startsWith('nav:')) {
            this.switchModule(action.replace('nav:', ''));
        } else if (action.startsWith('agent:')) {
            const parts = action.split(':');
            Copilot.sendQuickPrompt(parts[2], parts[1]);
        }
    },

    toggleAccentMode() {
        this.accentMode = this.accentMode === 'fuchsia' ? 'coral' : 'fuchsia';
        document.documentElement.setAttribute('data-accent', this.accentMode);
        try {
            localStorage.setItem('aegis-accent', this.accentMode);
        } catch (e) {}
        HitlManager.showToast(this.accentMode === 'fuchsia' ? 'Switched to Myntra Fuchsia Pink Scheme' : 'Switched to Soft Pastel Coral Scheme', 'mint');
    },

    openLoginModal() {
        let modalBackdrop = document.getElementById('myntra-login-backdrop');
        if (!modalBackdrop) {
            modalBackdrop = document.createElement('div');
            modalBackdrop.id = 'myntra-login-backdrop';
            modalBackdrop.className = 'myntra-login-backdrop';
            modalBackdrop.onclick = (e) => {
                if (e.target === modalBackdrop) AegisApp.closeLoginModal();
            };
            document.body.appendChild(modalBackdrop);
        }

        const currentUser = (window.AegisStore && window.AegisStore.getState().currentUser) ? window.AegisStore.getState().currentUser : { name: 'Prerna Chotwani', role: 'Creative Director & Founder' };

        modalBackdrop.innerHTML = `
            <div class="myntra-login-modal">
                <!-- Myntra Iconic Vibrant Header Banner -->
                <div class="myntra-banner-header">
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="AegisApp.closeLoginModal()" 
                        style="position:absolute; top:16px; right:16px; width:34px; height:34px; background:rgba(255,255,255,0.3); border:none; color:#FFFFFF;">
                        ${Icons.get('x', 14, '#FFFFFF')}
                    </button>
                    <div class="myntra-tag-pill">
                        ${Icons.get('sparkles', 12, '#FFFFFF')}
                        <span>AEGISWEAR FASHION PASS</span>
                    </div>
                    <h2 style="font-size:22px; font-weight:800; margin-top:10px; letter-spacing:-0.02em; line-height:1.2;">
                        Summer '26 Drop VIP Access
                    </h2>
                    <p style="font-size:12px; opacity:0.92; margin-top:4px;">
                        Wholesale Boutique Portal • 60s Size Swaps • Inventory Orchestrator
                    </p>
                    <div style="margin-top:12px; display:inline-flex; align-items:center; gap:6px; background:#FFFFFF; color:#D80064; border-radius:8px; padding:4px 10px; font-size:11px; font-weight:800;">
                        <span>FLAT 15% WHOLESALE DISCOUNT ON FIRST ORDER</span>
                    </div>
                </div>

                <!-- Modal Body -->
                <div style="padding:22px; display:flex; flex-direction:column; gap:16px;">
                    <!-- Phone / Email Login Input -->
                    <div>
                        <label style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.04em;">Login with Mobile Number or Email</label>
                        <div style="display:flex; gap:8px; margin-top:6px;">
                            <div class="clay-input" style="display:flex; align-items:center; gap:6px; width:92px; padding:8px 10px; font-weight:800; font-size:12px; color:var(--text-primary); cursor:default;">
                                <span>+91 (IND)</span>
                            </div>
                            <input id="myntra-phone-input" class="clay-input" type="tel" placeholder="Enter 10-digit mobile number" value="98201 55678" style="flex:1; font-weight:700;" />
                        </div>
                    </div>

                    <!-- OTP Simulation Row -->
                    <div id="otp-input-section" style="display:none; flex-direction:column; gap:8px;">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Enter 4-Digit OTP</span>
                            <span style="font-size:11px; color:#FF3F6C; font-weight:700;">Resend OTP in 28s</span>
                        </div>
                        <div style="display:flex; gap:10px; justify-content:center;">
                            <input class="otp-box-input" maxlength="1" value="9" />
                            <input class="otp-box-input" maxlength="1" value="4" />
                            <input class="otp-box-input" maxlength="1" value="8" />
                            <input class="otp-box-input" maxlength="1" value="1" />
                        </div>
                    </div>

                    <button id="myntra-login-submit-btn" class="clay-btn clay-btn-coral" style="width:100%; padding:12px; font-size:14px; font-weight:800; background:linear-gradient(135deg, #FF3F6C, #D80064);" onclick="AegisApp.handleLoginSubmit()">
                        Continue with Mobile OTP
                    </button>

                    <!-- Divider -->
                    <div style="display:flex; align-items:center; gap:12px; margin:2px 0;">
                        <div style="flex:1; height:1px; background:var(--clay-nav-border);"></div>
                        <span style="font-size:10px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">OR 1-CLICK INSTANT PERSONA LOGIN</span>
                        <div style="flex:1; height:1px; background:var(--clay-nav-border);"></div>
                    </div>

                    <!-- Persona Selection List -->
                    <div style="display:flex; flex-direction:column; gap:8px;">
                        <div class="persona-select-card" onclick="AegisApp.selectPersona('prerna')">
                            <div style="display:flex; align-items:center; gap:10px;">
                                <div style="width:36px; height:36px; border-radius:12px; background:linear-gradient(135deg, #FF3F6C, #9B00E8); color:#FFFFFF; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:13px;">
                                    PC
                                </div>
                                <div>
                                    <div style="font-size:13px; font-weight:800; color:var(--text-primary);">Prerna Chotwani</div>
                                    <div style="font-size:11px; color:#10B981; font-weight:600;">Creative Director &amp; Founder (All Access)</div>
                                </div>
                            </div>
                            <span class="clay-badge clay-badge-mint" style="font-size:10px;">Sign in</span>
                        </div>

                        <div class="persona-select-card" onclick="AegisApp.selectPersona('rahul')">
                            <div style="display:flex; align-items:center; gap:10px;">
                                <div style="width:36px; height:36px; border-radius:12px; background:var(--clay-coral); color:#FFFFFF; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:13px;">
                                    RS
                                </div>
                                <div>
                                    <div style="font-size:13px; font-weight:800; color:var(--text-primary);">Rahul Sharma</div>
                                    <div style="font-size:11px; color:var(--text-muted); font-weight:600;">Head of Wholesale Accounts &amp; Boutiques</div>
                                </div>
                            </div>
                            <span class="clay-badge clay-badge-coral" style="font-size:10px;">Sign in</span>
                        </div>

                        <div class="persona-select-card" onclick="AegisApp.selectPersona('ananya')">
                            <div style="display:flex; align-items:center; gap:10px;">
                                <div style="width:36px; height:36px; border-radius:12px; background:var(--clay-lilac); color:var(--text-on-lilac); display:flex; align-items:center; justify-content:center; font-weight:800; font-size:13px;">
                                    AM
                                </div>
                                <div>
                                    <div style="font-size:13px; font-weight:800; color:var(--text-primary);">Ananya Mehta</div>
                                    <div style="font-size:11px; color:var(--text-muted); font-weight:600;">Lead Apparel &amp; Textile Designer</div>
                                </div>
                            </div>
                            <span class="clay-badge clay-badge-lilac" style="font-size:10px;">Sign in</span>
                        </div>
                    </div>

                    <!-- Color Scheme Selector Option -->
                    <div style="display:flex; justify-content:space-between; align-items:center; padding-top:8px; border-top:1px solid var(--clay-nav-border);">
                        <span style="font-size:11px; font-weight:700; color:var(--text-secondary);">Accent Color Scheme:</span>
                        <div style="display:flex; gap:6px;">
                            <button class="clay-btn ${this.accentMode === 'fuchsia' ? 'clay-btn-coral' : 'clay-btn-white'}" style="font-size:10px; padding:4px 10px; display:inline-flex; align-items:center; gap:4px;" onclick="AegisApp.setAccent('fuchsia')">
                                ${Icons.get('sparkles', 12, 'currentColor')}
                                <span>Myntra Fuchsia Pink</span>
                            </button>
                            <button class="clay-btn ${this.accentMode === 'coral' ? 'clay-btn-coral' : 'clay-btn-white'}" style="font-size:10px; padding:4px 10px; display:inline-flex; align-items:center; gap:4px;" onclick="AegisApp.setAccent('coral')">
                                ${Icons.get('palette', 12, 'currentColor')}
                                <span>Pastel Coral</span>
                            </button>
                        </div>
                    </div>

                    <div style="text-align:center; font-size:10px; color:var(--text-muted); line-height:1.4;">
                        By continuing, you agree to AegisWear Terms of Service and Privacy Policy. AES-256 encrypted authentication.
                    </div>
                </div>
            </div>
        `;

        modalBackdrop.classList.add('active');
    },

    closeLoginModal() {
        const modalBackdrop = document.getElementById('myntra-login-backdrop');
        if (modalBackdrop) modalBackdrop.classList.remove('active');
    },

    handleLoginSubmit() {
        const phone = document.getElementById('myntra-phone-input').value.trim();
        const otpSection = document.getElementById('otp-input-section');
        const submitBtn = document.getElementById('myntra-login-submit-btn');

        if (otpSection && otpSection.style.display === 'none') {
            otpSection.style.display = 'flex';
            submitBtn.textContent = 'Verify OTP & Enter AegisWear';
            HitlManager.showToast(`OTP 9481 sent to +91 ${phone}!`, 'mint');
        } else {
            this.selectPersona('prerna');
        }
    },

    selectPersona(roleKey) {
        const personas = {
            prerna: {
                name: 'Prerna Chotwani',
                role: 'Creative Director & Founder',
                email: 'prerna@aegiswear.com',
                phone: '+91 98201 55678',
                avatar: 'PC'
            },
            rahul: {
                name: 'Rahul Sharma',
                role: 'Head of Wholesale Accounts',
                email: 'rahul@aegiswear.com',
                phone: '+91 98201 44321',
                avatar: 'RS'
            },
            ananya: {
                name: 'Ananya Mehta',
                role: 'Lead Apparel Designer',
                email: 'ananya@aegiswear.com',
                phone: '+91 98201 33210',
                avatar: 'AM'
            }
        };

        const user = personas[roleKey] || personas.prerna;
        if (window.AegisStore) {
            window.AegisStore.getState().currentUser = user;
            window.AegisStore.save();
        }

        this.updateUserUi(user);
        this.closeLoginModal();
        HitlManager.showToast(`Welcome back, ${user.name}! Switched account successfully.`, 'mint');

        // If currently on overview, re-render
        if (this.currentModule === 'overview') {
            const container = document.getElementById('module-content-area');
            if (container) this.renderOverview(container);
        }
    },

    setAccent(color) {
        this.accentMode = color;
        document.documentElement.setAttribute('data-accent', color);
        try {
            localStorage.setItem('aegis-accent', color);
        } catch (e) {}
        this.closeLoginModal();
        HitlManager.showToast(`Color scheme set to ${color === 'fuchsia' ? 'Myntra Fuchsia Pink' : 'Pastel Coral'}!`, 'mint');
    },

    updateUserUi(user) {
        const currentUser = user || (window.AegisStore ? window.AegisStore.getState().currentUser : null);
        if (!currentUser) return;

        // Update sidebar founder card
        const avatarEl = document.querySelector('.founder-avatar');
        if (avatarEl) avatarEl.textContent = currentUser.avatar || 'PC';

        const nameEl = document.querySelector('.founder-card div div:first-child');
        if (nameEl) nameEl.textContent = currentUser.name;

        const roleEl = document.querySelector('.founder-card div div:last-child span:last-child');
        if (roleEl) roleEl.textContent = currentUser.role;

        // Update header user badge if present
        const headerAvatar = document.getElementById('header-user-avatar');
        if (headerAvatar) headerAvatar.textContent = currentUser.avatar || 'PC';
    }
};

window.AegisApp = AegisApp;
if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => AegisApp.init());
} else {
    AegisApp.init();
}
