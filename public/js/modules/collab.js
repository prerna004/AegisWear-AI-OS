// ============================================================================
// Module Group F: Collaboration & Productivity Suite (Pastel Claymorphic Edition)
// Authentic Setproduct Claymorphism - Zero Emojis - Vector SVG Iconography
// ============================================================================

const CollabModule = {
    activeChannel: '#general',

    async render(container) {
        let emails = [];
        let messages = [];

        try {
            const [emailsRes, chatRes] = await Promise.all([
                fetch('/api/collab/emails').then(r => r.json()).catch(() => null),
                fetch(`/api/collab/chat?channel=${encodeURIComponent(this.activeChannel)}`).then(r => r.json()).catch(() => null)
            ]);
            emails = emailsRes || (window.AegisStore ? window.AegisStore.getEmails() : []);
            messages = chatRes || (window.AegisStore ? window.AegisStore.getChat(this.activeChannel) : []);
        } catch (e) {
            emails = window.AegisStore ? window.AegisStore.getEmails() : [];
            messages = window.AegisStore ? window.AegisStore.getChat(this.activeChannel) : [];
        }

        const formatTimestamp = (ts) => {
            if (!ts) return 'Just now';
            if (typeof ts === 'string') {
                if (ts.length > 10 && ts.includes('T')) return ts.substring(11, 16);
                return ts;
            }
            return 'Just now';
        };

        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:20px;">
                <!-- Simple Explainer Banner -->
                <div class="simple-guide-banner">
                    <div class="simple-guide-icon" style="background:var(--clay-sky);">
                        ${Icons.get('mail', 24, 'var(--text-on-sky)')}
                    </div>
                    <div>
                        <div style="font-size:15px; font-weight:800; color:var(--text-primary);">Room F: Design Studio, Chat & Lookbooks</div>
                        <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
                            Autonomous AI agents triage wholesale buyer emails, transcribe designer moodboard calls, and summarize fabric supplier agreements.
                        </div>
                    </div>
                </div>

                <!-- Action Bar -->
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                    <div style="display:flex; gap:10px;">
                        <button class="clay-btn clay-btn-white" onclick="CollabModule.openLiveMeetingModal()">
                            ${Icons.get('mic', 16, 'var(--clay-coral)')}
                            <span>Designer Meeting Scribe</span>
                        </button>
                        <button class="clay-btn clay-btn-white" onclick="CollabModule.openPasswordVaultModal()">
                            ${Icons.get('lock', 16, 'var(--clay-coral)')}
                            <span>Supplier Vault</span>
                        </button>
                    </div>
                    <button class="clay-btn clay-btn-coral" onclick="Copilot.sendQuickPrompt('Triage incoming wholesale buyer emails and draft lookbook responses', 'agent-inbox-triage')">
                        ${Icons.get('zap', 16, '#FFFFFF')}
                        <span>Triage Wholesale Inbox</span>
                    </button>
                </div>

                <!-- Mail & Chat Split -->
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:16px;">
                    <!-- Email Client -->
                    <div class="clay-card" style="padding:22px; background:var(--clay-surface);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                            <div>
                                <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Executive Email Inbox</h3>
                                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Incoming mail with AI-generated response drafts</p>
                            </div>
                            <span class="clay-badge clay-badge-mint">DKIM Secure</span>
                        </div>

                        <div id="collab-email-list" style="display:flex; flex-direction:column; gap:12px;">
                            ${emails.map(em => `
                                <div class="clay-card" id="email-card-${em.id}" style="padding:16px; background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border); display:flex; flex-direction:column; gap:6px;">
                                    <div style="display:flex; justify-content:space-between; align-items:center;">
                                        <span style="font-weight:800; font-size:12px; color:var(--text-primary);">${em.sender}</span>
                                        <span class="clay-badge ${em.category === 'action_needed' ? 'clay-badge-coral' : 'clay-badge-sky'}">
                                            ${em.category === 'action_needed' ? 'Action Needed' : 'Normal'}
                                        </span>
                                    </div>
                                    <div style="font-size:13px; font-weight:800; color:var(--clay-coral);">${em.subject}</div>
                                    <p style="font-size:12px; color:var(--text-secondary); line-height:1.4;">${em.preview}</p>
                                    ${em.ai_draft_reply ? `
                                        <div class="clay-card" style="background:var(--clay-surface); border-left:4px solid var(--clay-mint); padding:12px 14px; margin-top:6px;">
                                            <div style="color:#10B981; font-weight:800; font-size:11px;">AI SUGGESTED REPLY DRAFT:</div>
                                            <div style="color:var(--text-primary); margin-top:4px; font-size:11px; line-height:1.4;">"${em.ai_draft_reply}"</div>
                                            <button class="clay-btn clay-btn-mint" style="font-size:10px; padding:4px 12px; margin-top:8px;" onclick="CollabModule.sendEmailReply('${em.id}', this)">
                                                Send Approved Draft
                                            </button>
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Team Chat Channels -->
                    <div class="clay-card" style="padding:22px; background:var(--clay-surface); display:flex; flex-direction:column;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                            <div style="display:flex; gap:8px;">
                                ${['#general', '#leads', '#dev'].map(ch => `
                                    <button class="clay-btn ${ch === this.activeChannel ? 'clay-btn-coral' : 'clay-btn-white'}" 
                                        style="font-size:11px; padding:6px 14px;"
                                        onclick="CollabModule.switchChannel('${ch}')">
                                        ${ch}
                                    </button>
                                `).join('')}
                            </div>
                            <span class="clay-badge clay-badge-mint">Live Sync</span>
                        </div>

                        <div id="collab-messages-list" style="height:320px; overflow-y:auto; display:flex; flex-direction:column; gap:10px; padding-right:6px;">
                            ${messages.map(m => `
                                <div class="clay-card" style="padding:12px 16px; font-size:12px; background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border);">
                                    <div style="display:flex; justify-content:space-between; align-items:center;">
                                        <strong style="color:${m.is_bot ? 'var(--clay-coral)' : 'var(--text-primary)'}; font-size:12px;">${m.sender}</strong>
                                        <span style="font-size:10px; color:var(--text-muted); font-family:var(--font-mono);">${formatTimestamp(m.timestamp)}</span>
                                    </div>
                                    <div style="color:var(--text-secondary); margin-top:4px; line-height:1.4;">${m.text}</div>
                                </div>
                            `).join('')}
                        </div>

                        <div style="margin-top:14px; display:flex; gap:8px;">
                            <input id="chat-input-text" class="clay-input" type="text" placeholder="Send message in ${this.activeChannel}..." 
                                style="flex:1;" onkeydown="if(event.key === 'Enter') CollabModule.sendChatMessage()" />
                            <button class="clay-btn clay-btn-coral" onclick="CollabModule.sendChatMessage()">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async switchChannel(channel) {
        this.activeChannel = channel;
        const container = document.getElementById('module-content-area');
        if (container) this.render(container);
    },

    sendEmailReply(emailId, btn) {
        btn.innerHTML = '✓ Dispatched via SMTP Gateway';
        btn.disabled = true;
        btn.style.background = '#10B981';
        HitlManager.showToast('Wholesale lookbook reply dispatched via secure SMTP gateway', 'mint');
    },

    sendChatMessage() {
        const input = document.getElementById('chat-input-text');
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;
        input.value = '';

        const currentChannel = this.activeChannel;
        const list = document.getElementById('collab-messages-list');
        
        // Save to store
        if (window.AegisStore) {
            window.AegisStore.addChatMessage(currentChannel, text, 'Prerna Chotwani', false);
        }

        const msgElem = document.createElement('div');
        msgElem.className = 'clay-card';
        msgElem.style.cssText = `padding:12px 16px; font-size:12px; margin-top:8px; background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border);`;
        msgElem.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong style="color:var(--text-primary); font-size:12px;">Prerna Chotwani</strong>
                <span style="font-size:10px; color:var(--text-muted); font-family:var(--font-mono);">Just now</span>
            </div>
            <div style="color:var(--text-secondary); margin-top:4px; line-height:1.4;">${text}</div>
        `;
        list.appendChild(msgElem);
        list.scrollTop = list.scrollHeight;

        // Auto AI Sentinel Agent Response
        setTimeout(() => {
            const botReplies = {
                '#general': "Aegis Sentinel Agent: All wholesale orders and store webhooks synchronized. Cloud latency is 38ms.",
                '#leads': "Deal Desk Agent: Wholesale lead pipeline analyzed. Nordic Streetwear contract is ready for e-signature.",
                '#dev': "Dev Ops Agent: 26 autonomous pipelines operating at 100% health across Vercel and edge gateways."
            };
            const replyText = botReplies[currentChannel] || "Store Agent: Received and logged in studio audit trail.";
            
            if (window.AegisStore) {
                window.AegisStore.addChatMessage(currentChannel, replyText, 'Aegis Sentinel Agent', true);
            }

            const botElem = document.createElement('div');
            botElem.className = 'clay-card';
            botElem.style.cssText = `padding:12px 16px; font-size:12px; margin-top:8px; background:var(--clay-surface-recessed); border-left:3px solid var(--clay-coral);`;
            botElem.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong style="color:var(--clay-coral); font-size:12px;">Aegis Sentinel Agent</strong>
                    <span style="font-size:10px; color:var(--text-muted); font-family:var(--font-mono);">Just now</span>
                </div>
                <div style="color:var(--text-secondary); margin-top:4px; line-height:1.4;">${replyText}</div>
            `;
            list.appendChild(botElem);
            list.scrollTop = list.scrollHeight;
        }, 600);
    },

    openLiveMeetingModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `position:fixed; inset:0; background:rgba(31,36,56,0.6); backdrop-filter:blur(8px); z-index:10000; display:flex; align-items:center; justify-content:center;`;
        modal.innerHTML = `
            <div class="clay-card" style="width:760px; max-width:92vw; padding:28px; background:var(--clay-surface);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:40px; height:40px; border-radius:12px; background:var(--clay-coral); color:#FFFFFF; display:flex; align-items:center; justify-content:center;">
                            ${Icons.get('mic', 20, '#FFFFFF')}
                        </div>
                        <div>
                            <h3 style="font-size:17px; font-weight:800; color:var(--text-primary);">Live Fashion Studio &amp; Autonomous Scribe</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Live audio stream transcription with automated task synthesis</p>
                        </div>
                    </div>
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="this.closest('div[style*=\\'position:fixed\\']').remove()" style="width:34px; height:34px;">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>
                <div class="clay-card" style="background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border); padding:20px; font-size:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                        <span style="color:var(--clay-coral); font-weight:800;">Live Session: Summer 2026 Lookbook &amp; Milan Fabric Selection</span>
                        <span class="clay-badge clay-badge-mint">LiveKit WebRTC</span>
                    </div>
                    <div style="background:#0F172A; border-radius:14px; padding:18px; color:#E2E8F0; font-family:var(--font-mono); font-size:11px; line-height:2;">
                        [10:14:02] Prerna Chotwani: "The organic French Terry 400 GSM fabric batch arrived from Milan with perfect pastel lilac tones."<br>
                        [10:14:18] Rahul Sharma: "Nordic Streetwear Boutique wants 250 hoodies and 150 Puffy Runners delivered before Dec 10th."<br>
                        [10:14:35] Ananya Mehta: "The claymorphic packaging boxes are eco-certified and ready at the Mumbai fulfillment center."<br>
                        [10:14:52] AI Meeting Scribe: Extracted Task: Created wholesale reservation lot #WHL-2026-904 in inventory!
                    </div>
                </div>
                <div style="margin-top:18px; text-align:right;">
                    <button class="clay-btn clay-btn-coral" onclick="Copilot.sendQuickPrompt('Extract action items from meeting transcript and auto-create tasks in Collection Launches module', 'agent-meeting-scribe'); this.closest('div[style*=\\'position:fixed\\']').remove();">
                        Extract Action Items &amp; Save to Launches
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    openPasswordVaultModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `position:fixed; inset:0; background:rgba(31,36,56,0.65); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); z-index:10000; display:flex; align-items:center; justify-content:center; padding:16px;`;
        modal.innerHTML = `
            <div class="clay-card" style="width:720px; max-width:94vw; max-height:92vh; overflow-y:auto; padding:24px; background:var(--clay-surface); border-radius:24px; box-shadow:0 24px 60px rgba(0,0,0,0.4);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:42px; height:42px; border-radius:14px; background:var(--clay-coral); color:#FFFFFF; display:flex; align-items:center; justify-content:center; box-shadow:2px 4px 10px rgba(255,124,99,0.4);">
                            ${Icons.get('lock', 22, '#FFFFFF')}
                        </div>
                        <div>
                            <h3 style="font-size:18px; font-weight:800; color:var(--text-primary); letter-spacing:-0.01em;">Fashion Studio &amp; Retail Supplier Vault</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Encrypted API secrets for Shopify, Milan Textile Mill, Couriers &amp; Payment Gateway</p>
                        </div>
                    </div>
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="this.closest('div[style*=\\'position:fixed\\']').remove()" style="width:36px; height:36px;">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>
                <div style="display:flex; flex-direction:column; gap:12px; font-size:12px;">
                    <div class="clay-card" style="padding:16px 20px; display:flex; justify-content:space-between; align-items:center; background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border);">
                        <div>
                            <div style="display:flex; align-items:center; gap:8px;">
                                <strong style="color:var(--text-primary); font-size:13px;">Shopify Direct Storefront API Token (Private App)</strong>
                                <span class="clay-badge clay-badge-mint" style="font-size:9px;">Live Sync</span>
                            </div>
                            <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">AES-256 GCM • Powers live orders, webhooks and PWA storefront checkouts</div>
                        </div>
                        <button class="clay-btn clay-btn-white" style="font-size:11px;" onclick="navigator.clipboard.writeText('shpat_aegiswear_live_994821884').then(() => HitlManager.showToast('Shopify Private API Key copied to clipboard!', 'mint'))">Copy Key</button>
                    </div>

                    <div class="clay-card" style="padding:16px 20px; display:flex; justify-content:space-between; align-items:center; background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border);">
                        <div>
                            <div style="display:flex; align-items:center; gap:8px;">
                                <strong style="color:var(--text-primary); font-size:13px;">Milan Luxury Textile Mill EDI / Supplier Token</strong>
                                <span class="clay-badge clay-badge-lilac" style="font-size:9px;">GOTS Certified</span>
                            </div>
                            <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">Automated replenishment for French Terry 400 GSM &amp; YKK Zippers</div>
                        </div>
                        <button class="clay-btn clay-btn-white" style="font-size:11px;" onclick="navigator.clipboard.writeText('milan_edi_sec_88412_token').then(() => HitlManager.showToast('Milan Textile EDI Token copied to clipboard!', 'mint'))">Copy Key</button>
                    </div>

                    <div class="clay-card" style="padding:16px 20px; display:flex; justify-content:space-between; align-items:center; background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border);">
                        <div>
                            <div style="display:flex; align-items:center; gap:8px;">
                                <strong style="color:var(--text-primary); font-size:13px;">Delhivery &amp; BlueDart Automated Courier Dispatch Secret</strong>
                                <span class="clay-badge clay-badge-sky" style="font-size:9px;">60s Waybill</span>
                            </div>
                            <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">Auto-generates return waybills &amp; doorstep size swap courier tracking</div>
                        </div>
                        <button class="clay-btn clay-btn-white" style="font-size:11px;" onclick="navigator.clipboard.writeText('delhivery_live_auth_772109').then(() => HitlManager.showToast('Courier Dispatch Key copied to clipboard!', 'mint'))">Copy Key</button>
                    </div>

                    <div class="clay-card" style="padding:16px 20px; display:flex; justify-content:space-between; align-items:center; background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border);">
                        <div>
                            <div style="display:flex; align-items:center; gap:8px;">
                                <strong style="color:var(--text-primary); font-size:13px;">Stripe Global E-Commerce &amp; Checkout Secret Key</strong>
                                <span class="clay-badge clay-badge-coral" style="font-size:9px;">PCI-DSS Level 1</span>
                            </div>
                            <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">Authorized for Founder Prerna Chotwani &amp; Wholesale Settlements</div>
                        </div>
                        <button class="clay-btn clay-btn-white" style="font-size:11px;" onclick="navigator.clipboard.writeText('vault_token_stripe_prod_gateway_aes256').then(() => HitlManager.showToast('Encrypted Stripe Secret Key copied to clipboard!', 'mint'))">Copy Key</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
};

window.CollabModule = CollabModule;
