// ============================================================================
// Module Group C: Customer Service & Support (Pastel Claymorphic Edition)
// Authentic Setproduct Claymorphism - Zero Emojis - Vector SVG Iconography
// ============================================================================

const SupportModule = {
    async render(container) {
        let tickets = [];
        let kb = [];

        try {
            const [ticketsRes, kbRes] = await Promise.all([
                fetch('/api/support/tickets').then(r => r.json()).catch(() => null),
                fetch('/api/support/kb').then(r => r.json()).catch(() => null)
            ]);
            tickets = ticketsRes || (window.AegisStore ? window.AegisStore.getTickets() : []);
            kb = kbRes || (window.AegisStore ? window.AegisStore.getKb() : []);
        } catch (e) {
            tickets = window.AegisStore ? window.AegisStore.getTickets() : [];
            kb = window.AegisStore ? window.AegisStore.getKb() : [];
        }

        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:20px;">
                <!-- Simple Explainer Banner -->
                <div class="simple-guide-banner">
                    <div class="simple-guide-icon" style="background:var(--clay-lilac);">
                        ${Icons.get('headset', 24, 'var(--text-on-lilac)')}
                    </div>
                    <div>
                        <div style="font-size:15px; font-weight:800; color:var(--text-primary);">Room C: Size Exchanges &amp; Customer Care</div>
                        <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
                            Autonomous AI agents handle hoodie/sneaker size swaps in 60 seconds, track courier delivery packages, and draft size &amp; fit guides.
                        </div>
                    </div>
                </div>

                <!-- Action Bar -->
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                    <div style="display:flex; gap:10px;">
                        <button class="clay-btn clay-btn-white" onclick="SupportModule.openCourierTrackingModal()">
                            ${Icons.get('mapPin', 16, 'var(--clay-coral)')}
                            <span>Live Courier Tracking</span>
                        </button>
                        <button class="clay-btn clay-btn-white" onclick="SupportModule.openNewTicketModal()">
                            ${Icons.get('plus', 16, 'var(--clay-coral)')}
                            <span>+ New Customer Ticket</span>
                        </button>
                    </div>
                    <button class="clay-btn clay-btn-coral" onclick="Copilot.sendQuickPrompt('Analyze open size exchange tickets and generate auto-resolution exchange labels using RAG', 'agent-tier1-2-resolution')">
                        ${Icons.get('zap', 16, '#FFFFFF')}
                        <span>Auto-Solve Size Exchanges</span>
                    </button>
                </div>

                <!-- Tickets & KB Split -->
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:16px;">
                    <!-- Ticket Queue -->
                    <div class="clay-card" style="padding:22px; background:var(--clay-surface);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                            <div>
                                <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Customer Ticket Queue</h3>
                                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Omnichannel requests from Email, WhatsApp, and Web</p>
                            </div>
                            <span class="clay-badge clay-badge-lilac">${tickets.length} Tickets</span>
                        </div>

                        <div id="support-tickets-list" style="display:flex; flex-direction:column; gap:12px;">
                            ${tickets.map(t => {
                                const title = t.title || t.subject || 'Size Exchange Request';
                                const priority = t.priority || 'High';
                                const category = t.category || t.department || 'Size Exchange';
                                const customer = t.customer_name || 'Valued Customer';
                                const notes = t.resolution_notes || t.auto_suggested_kb || '60-Second Size Exchange & Return Courier Guide';
                                const isResolved = t.status === 'Resolved';

                                return `
                                    <div class="clay-card" id="ticket-card-${t.id}" style="padding:16px; background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border); display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
                                        <div style="flex:1; min-width:220px;">
                                            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                                                <span style="font-weight:800; font-size:13px; color:var(--text-primary);">${title}</span>
                                                <span class="clay-badge ${priority === 'High' || priority === 'Urgent' ? 'clay-badge-coral' : 'clay-badge-butter'}">
                                                    ${priority}
                                                </span>
                                                <span class="clay-badge ${isResolved ? 'clay-badge-mint' : 'clay-badge-sky'}" id="ticket-status-${t.id}">
                                                    ${t.status || 'Open'}
                                                </span>
                                            </div>
                                            <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">
                                                Customer: <strong>${customer}</strong> • Channel: ${t.channel || 'Mobile App'} • Category: ${category}
                                            </div>
                                            <p style="font-size:11px; color:var(--text-secondary); margin-top:8px; background:var(--clay-surface); border:1px solid var(--clay-nav-border); padding:10px 14px; border-radius:12px;">
                                                ${notes}
                                            </p>
                                        </div>
                                        <div style="display:flex; flex-direction:column; align-items:flex-end; gap:8px;">
                                            <span style="font-size:10px; color:var(--clay-coral); font-weight:800;">SLA: 60s Fast Exchange</span>
                                            ${isResolved ? `
                                                <span class="clay-badge clay-badge-mint" style="font-size:11px; padding:6px 12px;">✓ Resolved</span>
                                            ` : `
                                                <button class="clay-btn clay-btn-coral" style="font-size:11px; padding:6px 14px;" onclick="SupportModule.openSizeExchangeModal('${t.id}')">
                                                    Instant 60s Exchange
                                                </button>
                                            `}
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Auto-Authored KB -->
                    <div class="clay-card" style="padding:22px; background:var(--clay-surface);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                            <div>
                                <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Knowledge Base</h3>
                                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Size guides &amp; fabric care synthesized by AI</p>
                            </div>
                            <button class="clay-btn clay-btn-white" style="font-size:11px; padding:4px 10px;" onclick="Copilot.sendQuickPrompt('Synthesize resolved tickets into new public knowledge base article for sizing', 'agent-auto-kb')">
                                Write Article
                            </button>
                        </div>

                        <div style="display:flex; flex-direction:column; gap:12px;">
                            ${kb.map(k => `
                                <div class="clay-card" style="padding:14px; background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border);">
                                    <div style="display:flex; justify-content:space-between; align-items:center;">
                                        <span style="font-weight:800; font-size:13px; color:var(--text-primary);">${k.title}</span>
                                        <span class="clay-badge clay-badge-sky">${k.category}</span>
                                    </div>
                                    <p style="font-size:11px; color:var(--text-secondary); margin-top:6px; line-height:1.4;">${k.content ? k.content.substring(0, 110) : ''}...</p>
                                    <div style="display:flex; justify-content:space-between; margin-top:8px; font-size:10px; color:var(--text-muted); font-weight:600;">
                                        <span>Verified Fashion Guide</span>
                                        <span style="color:#10B981;">100% Match</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    openSizeExchangeModal(ticketId) {
        const modal = document.createElement('div');
        modal.style.cssText = `position:fixed; inset:0; background:rgba(31,36,56,0.6); backdrop-filter:blur(8px); z-index:10000; display:flex; align-items:center; justify-content:center;`;
        modal.innerHTML = `
            <div class="clay-card" style="width:680px; max-width:92vw; padding:28px; background:var(--clay-surface);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:40px; height:40px; border-radius:12px; background:var(--clay-coral); color:#FFFFFF; display:flex; align-items:center; justify-content:center;">
                            ${Icons.get('refresh', 20, '#FFFFFF')}
                        </div>
                        <div>
                            <h3 style="font-size:17px; font-weight:800; color:var(--text-primary);">60-Second Size Exchange Portal</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Automated Delhivery courier pickup &amp; replacement dispatch</p>
                        </div>
                    </div>
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="this.closest('div[style*=\\'position:fixed\\']').remove()" style="width:34px; height:34px;">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>

                <div style="display:flex; flex-direction:column; gap:12px; font-size:12px;">
                    <div class="clay-card" style="padding:16px; background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border);">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <strong style="color:var(--text-primary); font-size:13px;">Original Order: #AW-9481</strong>
                            <span class="clay-badge clay-badge-mint">Verified Purchase</span>
                        </div>
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-top:10px;">
                            <div>
                                <span style="color:var(--text-muted); font-size:11px;">Current Size:</span>
                                <div style="font-weight:700; color:var(--text-primary);">Oversized Clay Hoodie (Pastel Lilac) - Medium</div>
                            </div>
                            <div>
                                <span style="color:var(--text-muted); font-size:11px;">Requested Swap:</span>
                                <div style="font-weight:700; color:var(--clay-coral);">Oversized Clay Hoodie (Pastel Lilac) - Large</div>
                            </div>
                        </div>
                        <div style="margin-top:8px; font-size:11px; color:#10B981; font-weight:700;">
                            ✓ Stock verified: 840 units in Mumbai Warehouse A
                        </div>
                    </div>

                    <div class="clay-card" style="padding:16px; background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border);">
                        <strong style="color:var(--text-primary); font-size:13px;">Doorstep Reverse Courier Details</strong>
                        <div style="margin-top:8px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                            <div>
                                <div style="color:var(--text-secondary);">Courier Partner: <strong>Delhivery Surface Express</strong></div>
                                <div style="color:var(--text-muted); font-size:11px; margin-top:2px;">AWB Number: <code style="font-family:var(--font-mono); color:var(--clay-coral);">DEL-9948218-IN</code></div>
                            </div>
                            <span class="clay-badge clay-badge-mint">Doorstep Swap</span>
                        </div>
                        <p style="margin-top:8px; font-size:11px; color:var(--text-muted); line-height:1.4;">
                            The courier rider will hand over Size L to the customer and collect the Size M parcel simultaneously at the doorstep.
                        </p>
                    </div>
                </div>

                <div id="exchange-modal-actions" style="margin-top:20px; display:flex; justify-content:flex-end; gap:10px;">
                    <button class="clay-btn clay-btn-white" onclick="this.closest('div[style*=\\'position:fixed\\']').remove()">Cancel</button>
                    <button class="clay-btn clay-btn-coral" onclick="SupportModule.confirmSizeExchange('${ticketId}', this)">
                        ${Icons.get('check', 14, '#FFFFFF')}
                        <span>Approve &amp; Dispatch Swap Label</span>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    confirmSizeExchange(ticketId, btn) {
        if (window.AegisStore) {
            window.AegisStore.resolveTicket(ticketId);
        }

        btn.innerHTML = '✓ Swap Waybill Generated!';
        btn.style.background = '#10B981';
        btn.disabled = true;

        const badge = document.getElementById(`ticket-status-${ticketId}`);
        if (badge) {
            badge.textContent = 'Resolved';
            badge.className = 'clay-badge clay-badge-mint';
        }

        HitlManager.showToast('Delhivery doorstep replacement dispatched! Waybill DEL-9948218-IN SMS sent to customer.', 'mint');
        
        setTimeout(() => {
            const modal = btn.closest('div[style*="position:fixed"]');
            if (modal) modal.remove();
            const container = document.getElementById('module-content-area');
            if (container) this.render(container);
        }, 1200);
    },

    openNewTicketModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `position:fixed; inset:0; background:rgba(31,36,56,0.6); backdrop-filter:blur(8px); z-index:10000; display:flex; align-items:center; justify-content:center;`;
        modal.innerHTML = `
            <div class="clay-card" style="width:640px; max-width:92vw; padding:28px; background:var(--clay-surface);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:40px; height:40px; border-radius:12px; background:var(--clay-lilac); color:var(--text-on-lilac); display:flex; align-items:center; justify-content:center;">
                            ${Icons.get('plus', 20, 'var(--text-on-lilac)')}
                        </div>
                        <div>
                            <h3 style="font-size:17px; font-weight:800; color:var(--text-primary);">Create Customer Support Ticket</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Omnichannel ticket entry for size swaps, inquiries &amp; returns</p>
                        </div>
                    </div>
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="this.closest('div[style*=\\'position:fixed\\']').remove()" style="width:34px; height:34px;">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>

                <div style="display:flex; flex-direction:column; gap:12px;">
                    <div>
                        <label style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Customer Full Name</label>
                        <input id="ticket-customer-name" class="clay-input" type="text" placeholder="e.g. Riya Sen" value="Riya Sen" style="width:100%; margin-top:4px;" />
                    </div>

                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
                        <div>
                            <label style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Customer Email</label>
                            <input id="ticket-customer-email" class="clay-input" type="email" placeholder="riya@gmail.com" value="riya@gmail.com" style="width:100%; margin-top:4px;" />
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Ticket Category</label>
                            <select id="ticket-category" class="clay-input" style="width:100%; margin-top:4px;">
                                <option value="Size Exchange">Size Exchange (Hoodie/Sneakers)</option>
                                <option value="Delivery Tracking">Courier Tracking / Delay</option>
                                <option value="Product Care">Fabric Care &amp; Washing</option>
                                <option value="Custom Fit">Custom Sizing Inquiry</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Ticket Subject</label>
                        <input id="ticket-subject" class="clay-input" type="text" value="Need size swap: Puffy Runner Sneakers (Size 38 to 39)" style="width:100%; margin-top:4px;" />
                    </div>
                </div>

                <div style="margin-top:20px; display:flex; justify-content:flex-end; gap:10px;">
                    <button class="clay-btn clay-btn-white" onclick="this.closest('div[style*=\\'position:fixed\\']').remove()">Cancel</button>
                    <button class="clay-btn clay-btn-coral" onclick="SupportModule.submitNewTicket(this)">
                        Create Ticket
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    submitNewTicket(btn) {
        const customer_name = document.getElementById('ticket-customer-name').value.trim();
        const email = document.getElementById('ticket-customer-email').value.trim();
        const category = document.getElementById('ticket-category').value;
        const title = document.getElementById('ticket-subject').value.trim();

        if (!title) {
            HitlManager.showToast('Please provide a ticket subject', 'coral');
            return;
        }

        if (window.AegisStore) {
            window.AegisStore.createTicket({
                customer_name,
                email,
                category,
                title,
                priority: 'High'
            });
        }

        btn.closest('div[style*="position:fixed"]').remove();
        HitlManager.showToast(`Ticket for ${customer_name} created successfully!`, 'mint');

        const container = document.getElementById('module-content-area');
        if (container) this.render(container);
    },

    openCourierTrackingModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `position:fixed; inset:0; background:rgba(31,36,56,0.6); backdrop-filter:blur(8px); z-index:10000; display:flex; align-items:center; justify-content:center;`;
        modal.innerHTML = `
            <div class="clay-card" style="width:720px; max-width:92vw; padding:28px; background:var(--clay-surface);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:40px; height:40px; border-radius:12px; background:var(--clay-coral); color:#FFFFFF; display:flex; align-items:center; justify-content:center;">
                            ${Icons.get('mapPin', 20, '#FFFFFF')}
                        </div>
                        <div>
                            <h3 style="font-size:17px; font-weight:800; color:var(--text-primary);">Delhivery &amp; BlueDart Live Courier Tracking</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Real-time GPS courier tracking for size exchanges and customer orders</p>
                        </div>
                    </div>
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="this.closest('div[style*=\\'position:fixed\\']').remove()" style="width:34px; height:34px;">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>

                <!-- GPS Map Canvas Graphic -->
                <div class="clay-card" style="background:#0F172A; border-radius:18px; padding:18px; margin-bottom:16px; color:#F8FAFC;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                        <span style="font-size:11px; font-weight:800; color:#7AE8C2; letter-spacing:0.04em;">DELHIVERY EXPRESS • SHIPMENT #DEL-9948218-IN</span>
                        <span class="clay-badge clay-badge-mint">Out for Doorstep Delivery</span>
                    </div>

                    <svg viewBox="0 0 640 180" style="width:100%; height:auto; display:block;">
                        <path d="M 40 140 Q 200 130 320 80 T 600 40" fill="none" stroke="#334155" stroke-width="6" stroke-linecap="round"/>
                        <path d="M 40 140 Q 200 130 320 80" fill="none" stroke="#7AE8C2" stroke-width="4"/>
                        <circle cx="40" cy="140" r="8" fill="#7AE8C2"/>
                        <text x="40" y="165" fill="#94A3B8" font-size="10" font-weight="700" text-anchor="middle">Bhiwandi Hub</text>

                        <circle cx="320" cy="80" r="10" fill="#FF7C63"/>
                        <circle cx="320" cy="80" r="16" fill="#FF7C63" opacity="0.3"/>
                        <text x="320" y="60" fill="#FF7C63" font-size="11" font-weight="800" text-anchor="middle">Rider: Bandra West</text>

                        <circle cx="600" cy="40" r="8" fill="#64748B"/>
                        <text x="600" y="65" fill="#94A3B8" font-size="10" font-weight="700" text-anchor="middle">Customer Address</text>
                    </svg>

                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px; font-size:11px; color:#CBD5E1; border-top:1px solid #1E293B; padding-top:10px;">
                        <span><strong>Delivery Partner:</strong> Sunil K. (Delhivery)</span>
                        <span><strong>Phone:</strong> +91 98201 44321</span>
                        <span style="color:#7AE8C2; font-weight:800;">ETA: 24 mins (Live GPS)</span>
                    </div>
                </div>

                <div style="display:flex; justify-content:flex-end; gap:10px;">
                    <button class="clay-btn clay-btn-white" onclick="HitlManager.showToast('Courier SMS alert triggered to customer', 'mint')">Send ETA to Customer</button>
                    <button class="clay-btn clay-btn-coral" onclick="this.closest('div[style*=\\'position:fixed\\']').remove()">Close Tracking</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
};

window.SupportModule = SupportModule;
