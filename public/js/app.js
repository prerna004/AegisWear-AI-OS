// ============================================================================
// AegisOS: Core Application Shell & Router (Pastel Claymorphic Edition)
// Authentic Setproduct Claymorphism - Zero Emojis - Vector SVG Iconography
// ============================================================================

const AegisApp = {
    currentModule: 'overview',
    isDesktopMode: false,
    currentTheme: 'light',

    init() {
        console.log('[AegisOS] Booting Pastel Claymorphic Single-Pane UI Shell...');
        try {
            this.currentTheme = localStorage.getItem('aegis-theme') || 'light';
            document.documentElement.setAttribute('data-theme', this.currentTheme);
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
        setIcon('theme-btn-icon', 'sun', 18, 'var(--text-primary)');
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

        switch (moduleName) {
            case 'overview':
                this.renderOverview(container);
                break;
            case 'crm':
                CrmModule.render(container);
                break;
            case 'marketing':
                MarketingModule.render(container);
                break;
            case 'support':
                SupportModule.render(container);
                break;
            case 'finance':
                FinanceModule.render(container);
                break;
            case 'hr':
                HrModule.render(container);
                break;
            case 'collab':
                CollabModule.render(container);
                break;
            case 'projects':
                ProjectsModule.render(container);
                break;
            case 'itsm':
                ItsmModule.render(container);
                break;
            case 'analytics':
                AnalyticsModule.render(container);
                break;
            case 'agents':
                AgentsViewModule.render(container);
                break;
            case 'developer':
                DeveloperModule.render(container);
                break;
            default:
                this.renderOverview(container);
        }
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
        const [metricsRes, pendingHitlRes] = await Promise.all([
            fetch('/api/bi/metrics').then(r => r.json()),
            fetch('/api/hitl/pending').then(r => r.json())
        ]);

        const metrics = metricsRes || {};
        const hitl = pendingHitlRes || { items: [] };

        const hour = new Date().getHours();
        const greeting = hour < 12 ? 'Good morning' : (hour < 17 ? 'Good afternoon' : 'Good evening');

        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:20px;">
                
                <!-- 1. Authentic Coral Hero Card (Directly from Clayshop Screenshot) -->
                <div class="clay-card clay-card-coral hero-overview-card" style="padding:28px 32px;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <div>
                            <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px; flex-wrap:wrap;">
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
                            <p style="font-size:14px; color:rgba(255,255,255,0.92); margin-top:8px; max-width:740px; line-height:1.5;">
                                Wholesale boutique orders, warehouse inventory, customer size exchanges, and marketing campaigns are managed smoothly and automatically in one place.
                            </p>
                            
                            <!-- Action Chips & Mint CTA Button (Matching Clayshop Translucent Chips) -->
                            <div style="display:flex; align-items:center; gap:12px; margin-top:20px; flex-wrap:wrap;">
                                <button class="clay-btn clay-btn-mint" onclick="Copilot.toggle()">
                                    ${Icons.get('sparkles', 16, '#0E4337')}
                                    <span>Open Store Assistant</span>
                                    ${Icons.get('arrowRight', 16, '#0E4337')}
                                </button>
                                <button class="clay-btn-hero-pill" onclick="AegisApp.switchModule('crm')">Wholesale Orders</button>
                                <button class="clay-btn-hero-pill" onclick="AegisApp.switchModule('finance')">Warehouse Stock</button>
                                <button class="clay-btn-hero-pill" onclick="AegisApp.switchModule('support')">Size Exchanges</button>
                                <button class="clay-btn-hero-pill" onclick="AegisApp.switchModule('analytics')">Sales Insights</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 2. Four Quick Pastel Stat Cards (Mint, Lilac, Butter, Sky) -->
                <div class="stat-cards-grid">
                    <!-- Mint Card -->
                    <div class="clay-card clay-card-mint" style="padding:20px;">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.04em;">Total Revenue</span>
                            ${Icons.get('dollar', 20, 'currentColor')}
                        </div>
                        <div style="font-size:26px; font-weight:800; margin-top:8px; font-family:var(--font-mono);">$${Number(metrics.closedWonRevenue || 0).toLocaleString()}</div>
                        <div style="font-size:11px; margin-top:4px; font-weight:600; opacity:0.85;">+28% this month across all stores</div>
                    </div>

                    <!-- Lilac Card -->
                    <div class="clay-card clay-card-lilac" style="padding:20px;">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.04em;">Orders Fulfilled</span>
                            ${Icons.get('check', 20, 'currentColor')}
                        </div>
                        <div style="font-size:26px; font-weight:800; margin-top:8px; font-family:var(--font-mono);">1,420 Orders</div>
                        <div style="font-size:11px; margin-top:4px; font-weight:600; opacity:0.85;">Hoodies, sneakers & caps dispatched</div>
                    </div>

                    <!-- Butter Yellow Card -->
                    <div class="clay-card clay-card-butter" style="padding:20px;">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.04em;">Orders Needing Review</span>
                            ${Icons.get('alertTriangle', 20, 'currentColor')}
                        </div>
                        <div style="font-size:26px; font-weight:800; margin-top:8px; font-family:var(--font-mono);">${hitl.items.length} Pending</div>
                        <div style="font-size:11px; margin-top:4px; font-weight:600; opacity:0.85;">Bulk discounts & high-value returns</div>
                    </div>

                    <!-- Sky Blue Card -->
                    <div class="clay-card clay-card-sky" style="padding:20px;">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.04em;">Customer Satisfaction</span>
                            ${Icons.get('activity', 20, 'currentColor')}
                        </div>
                        <div style="font-size:26px; font-weight:800; margin-top:8px; font-family:var(--font-mono);">99.4% Positive</div>
                        <div style="font-size:11px; margin-top:4px; font-weight:600; opacity:0.85;">Same-day size exchanges & delivery</div>
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
    }
};

window.AegisApp = AegisApp;
if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => AegisApp.init());
} else {
    AegisApp.init();
}
