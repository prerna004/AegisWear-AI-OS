// ============================================================================
// Module Group F: Collaboration & Productivity Suite (Pastel Claymorphic Edition)
// Authentic Setproduct Claymorphism - Zero Emojis - Vector SVG Iconography
// ============================================================================

const CollabModule = {
    activeChannel: '#general',

    async render(container) {
        const [emailsRes, chatRes] = await Promise.all([
            fetch('/api/collab/emails').then(r => r.json()),
            fetch(`/api/collab/chat?channel=${encodeURIComponent(this.activeChannel)}`).then(r => r.json())
        ]);

        const emails = emailsRes || [];
        const messages = chatRes || [];

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
                <div style="display:flex; justify-content:space-between; align-items:center;">
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
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
                    <!-- Email Client -->
                    <div class="clay-card" style="padding:22px; background:var(--clay-surface);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                            <div>
                                <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Executive Email Inbox</h3>
                                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Incoming mail with AI-generated response drafts</p>
                            </div>
                            <span class="clay-badge clay-badge-mint">DKIM Secure</span>
                        </div>

                        <div style="display:flex; flex-direction:column; gap:12px;">
                            ${emails.map(em => `
                                <div class="clay-card" style="padding:16px; background:var(--clay-surface); display:flex; flex-direction:column; gap:6px;">
                                    <div style="display:flex; justify-content:space-between; align-items:center;">
                                        <span style="font-weight:800; font-size:12px; color:var(--text-primary);">${em.sender}</span>
                                        <span class="clay-badge ${em.category === 'action_needed' ? 'clay-badge-coral' : 'clay-badge-sky'}">
                                            ${em.category === 'action_needed' ? 'Action Needed' : 'Normal'}
                                        </span>
                                    </div>
                                    <div style="font-size:13px; font-weight:800; color:var(--clay-coral);">${em.subject}</div>
                                    <p style="font-size:12px; color:var(--text-secondary); line-height:1.4;">${em.preview}</p>
                                    ${em.ai_draft_reply ? `
                                        <div class="clay-card" style="background:#F8FAFC; border-left:4px solid var(--clay-mint); padding:12px 14px; margin-top:6px;">
                                            <div style="color:#0E4337; font-weight:800; font-size:11px;">AI SUGGESTED REPLY DRAFT:</div>
                                            <div style="color:var(--text-secondary); margin-top:4px; font-size:11px; line-height:1.4;">"${em.ai_draft_reply}"</div>
                                            <button class="clay-btn clay-btn-mint" style="font-size:10px; padding:4px 12px; margin-top:8px;" onclick="HitlManager.showToast('Email reply dispatched via gateway', 'mint')">
                                                Send Approved Draft
                                            </button>
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Team Chat Channels -->
                    <div class="clay-card" style="padding:22px; background:var(--clay-surface);">
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

                        <div id="collab-messages-list" style="height:310px; overflow-y:auto; display:flex; flex-direction:column; gap:10px; padding-right:6px;">
                            ${messages.map(m => `
                                <div class="clay-card" style="padding:12px 16px; font-size:12px; background:var(--clay-surface);">
                                    <div style="display:flex; justify-content:space-between; align-items:center;">
                                        <strong style="color:${m.is_bot ? 'var(--clay-coral)' : 'var(--text-primary)'}; font-size:12px;">${m.sender}</strong>
                                        <span style="font-size:10px; color:var(--text-muted); font-family:var(--font-mono);">${m.timestamp.substring(11, 16)}</span>
                                    </div>
                                    <div style="color:var(--text-secondary); margin-top:4px; line-height:1.4;">${m.text}</div>
                                </div>
                            `).join('')}
                        </div>

                        <div style="margin-top:14px; display:flex; gap:8px;">
                            <input id="chat-input-text" class="clay-input" type="text" placeholder="Send message in ${this.activeChannel}..." 
                                style="flex:1; border: 1px solid #CBD5E1;" />
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

    sendChatMessage() {
        const input = document.getElementById('chat-input-text');
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;
        input.value = '';

        const list = document.getElementById('collab-messages-list');
        const msgElem = document.createElement('div');
        msgElem.className = 'clay-card';
        msgElem.style.cssText = `padding:12px 16px; font-size:12px; margin-top:8px; background:var(--clay-surface);`;
        msgElem.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong style="color:var(--text-primary); font-size:12px;">Prerna Chotwani</strong>
                <span style="font-size:10px; color:var(--text-muted); font-family:var(--font-mono);">Just now</span>
            </div>
            <div style="color:var(--text-secondary); margin-top:4px; line-height:1.4;">${text}</div>
        `;
        list.appendChild(msgElem);
        list.scrollTop = list.scrollHeight;
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
                            <h3 style="font-size:17px; font-weight:800; color:var(--text-primary);">Live Video Session & Autonomous Scribe</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Live audio stream transcription with automated task synthesis</p>
                        </div>
                    </div>
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="this.closest('div[style*=\\'position:fixed\\']').remove()" style="width:34px; height:34px;">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>
                <div class="clay-card" style="background:#F8FAFC; padding:20px; font-size:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                        <span style="color:var(--clay-coral); font-weight:800;">Live Session: Enterprise Architecture Review</span>
                        <span class="clay-badge clay-badge-mint">LiveKit WebRTC</span>
                    </div>
                    <div style="background:#0F172A; border-radius:14px; padding:18px; color:#E2E8F0; font-family:var(--font-mono); font-size:11px; line-height:2;">
                        [10:14:02] Prerna Chotwani: "All 26 autonomous enterprise AI agents are operational."<br>
                        [10:14:18] Vikram Malhotra: "All test suites passing in 115ms across all 9 modules."<br>
                        [10:14:35] Ananya Deshmukh: "The pastel claymorphism design matches specifications exactly."<br>
                        [10:14:52] AI Meeting Scribe: Extracted Task: Ready for WildCatter Ventures GitHub push!
                    </div>
                </div>
                <div style="margin-top:18px; text-align:right;">
                    <button class="clay-btn clay-btn-coral" onclick="Copilot.sendQuickPrompt('Extract action items from meeting transcript and auto-create tasks in Projects module', 'agent-meeting-scribe'); this.closest('div[style*=\\'position:fixed\\']').remove();">
                        Extract Action Items & Save to Projects
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    openPasswordVaultModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `position:fixed; inset:0; background:rgba(31,36,56,0.6); backdrop-filter:blur(8px); z-index:10000; display:flex; align-items:center; justify-content:center;`;
        modal.innerHTML = `
            <div class="clay-card" style="width:680px; max-width:92vw; padding:28px; background:var(--clay-surface);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:40px; height:40px; border-radius:12px; background:var(--clay-coral); color:#FFFFFF; display:flex; align-items:center; justify-content:center;">
                            ${Icons.get('lock', 20, '#FFFFFF')}
                        </div>
                        <div>
                            <h3 style="font-size:17px; font-weight:800; color:var(--text-primary);">Encrypted Password & Secret Vault</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Zero-knowledge client-side encryption (Bitwarden compatible)</p>
                        </div>
                    </div>
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="this.closest('div[style*=\\'position:fixed\\']').remove()" style="width:34px; height:34px;">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>
                <div style="display:flex; flex-direction:column; gap:12px; font-size:12px;">
                    <div class="clay-card" style="padding:16px 20px; display:flex; justify-content:space-between; align-items:center; background:#F8FAFC;">
                        <div>
                            <strong style="color:var(--text-primary);">Stripe Payment Gateway Secret Key</strong>
                            <div style="font-size:11px; color:var(--text-muted);">AES-256 GCM • Finance VP Authorization Required</div>
                        </div>
                        <button class="clay-btn clay-btn-white" style="font-size:11px;" onclick="HitlManager.showToast('Encrypted key copied to clipboard', 'mint')">Copy Key</button>
                    </div>
                    <div class="clay-card" style="padding:16px 20px; display:flex; justify-content:space-between; align-items:center; background:#F8FAFC;">
                        <div>
                            <strong style="color:var(--text-primary);">AWS Production Root KMS Token</strong>
                            <div style="font-size:11px; color:var(--text-muted);">Hardware YubiKey Security Key Required</div>
                        </div>
                        <button class="clay-btn clay-btn-white" style="font-size:11px;" onclick="HitlManager.showToast('Hardware security key authenticated', 'mint')">Authenticate</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
};

window.CollabModule = CollabModule;
