// ============================================================================
// AegisOS: Human-in-the-Loop (HITL) & Level 2 Undo Manager (Pastel Clay Edition)
// Authentic Setproduct Claymorphism - Zero Emojis - Vector SVG Iconography
// ============================================================================

const HitlManager = {
    pendingApprovals: [],

    init() {
        this.fetchPending();
        setInterval(() => this.fetchPending(), 10000);
    },

    async fetchPending() {
        try {
            const res = await fetch('/api/hitl/pending');
            const data = await res.json();
            this.pendingApprovals = data.items || [];
            this.updateBadge();
        } catch (e) {
            console.error('[HITL] Failed to fetch pending queue:', e);
        }
    },

    updateBadge() {
        const badge = document.getElementById('hitl-badge');
        if (badge) {
            if (this.pendingApprovals.length > 0) {
                badge.textContent = this.pendingApprovals.length;
                badge.style.display = 'inline-flex';
            } else {
                badge.style.display = 'none';
            }
        }
        const dockBadge = document.getElementById('dock-hitl-badge');
        if (dockBadge) {
            if (this.pendingApprovals.length > 0) {
                dockBadge.textContent = this.pendingApprovals.length;
                dockBadge.style.display = 'inline-flex';
            } else {
                dockBadge.style.display = 'none';
            }
        }
    },

    async resolve(hitlId, decision) {
        try {
            // 1. Immediately disable and update buttons in drawer if present
            const btnsContainer = document.getElementById(`hitl-btns-${hitlId}`);
            if (btnsContainer) {
                btnsContainer.innerHTML = `
                    <div style="background:${decision === 'approved' ? 'rgba(122,232,194,0.18)' : 'rgba(255,124,99,0.18)'}; border:1px solid ${decision === 'approved' ? 'var(--clay-mint)' : 'var(--clay-coral)'}; border-radius:14px; padding:12px 16px; display:flex; align-items:center; gap:10px; color:${decision === 'approved' ? '#0E6B56' : '#C03820'}; font-weight:800; font-size:13px; width:100%; box-shadow: inset 1px 1px 2px rgba(255,255,255,0.8);">
                        ${window.Icons ? Icons.get(decision === 'approved' ? 'check' : 'x', 18, decision === 'approved' ? '#0E6B56' : '#C03820') : ''}
                        <span>Order Action ${decision === 'approved' ? 'Approved & Dispatched' : 'Declined'} by Prerna Chotwani</span>
                    </div>
                `;
            }

            const card = document.getElementById(`hitl-card-${hitlId}`);
            if (card) {
                card.style.borderColor = decision === 'approved' ? 'var(--clay-mint)' : 'var(--clay-coral)';
            }

            const res = await fetch('/api/hitl/resolve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ hitlId, decision, reviewer: 'usr_admin' })
            });
            const data = await res.json();
            
            this.showToast(`Order Action ${decision.toUpperCase()}`, decision === 'approved' ? 'mint' : 'coral');
            
            // 2. Launch joyful celebratory confetti if approved!
            if (decision === 'approved') {
                this.launchConfetti();
            }

            // 3. Append confirmation response message to Store Assistant thread (Zero Emojis)
            if (window.Copilot && window.Copilot.appendAssistantMessage) {
                if (decision === 'approved') {
                    window.Copilot.appendAssistantMessage(`Order Action Approved & Executed!\n\nThe 15% bulk wholesale discount for Soho Fashion House ($65,000 order) has been officially authorized.\n\n• Contract status: Digitally Signed & Stamped\n• Profit margin locked: 36.2% ($23,530 profit)\n• Warehouse dispatch: 500 Puffy Runner sneakers queued for shipping to London & NYC showrooms.`, 'Action Approved');
                } else {
                    window.Copilot.appendAssistantMessage(`Order Action Declined.\n\nThe discount request was declined. Soho Fashion House has been notified to proceed with standard pricing terms.`, 'Action Declined');
                }
            }

            await this.fetchPending();
            
            if (window.AegisApp && window.AegisApp.refreshCurrentView) {
                window.AegisApp.refreshCurrentView();
            }
            return data;
        } catch (err) {
            this.showToast(`Failed to resolve action: ${err.message}`, 'coral');
        }
    },

    launchConfetti() {
        const colors = ['#7AE8C2', '#FF7C63', '#C5B8F9', '#FFE88D', '#AEE4FF'];
        for (let i = 0; i < 35; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}vw;
                width: ${Math.random() * 10 + 6}px;
                height: ${Math.random() * 10 + 6}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '3px'};
                opacity: 0.9;
                z-index: 99999;
                pointer-events: none;
                transform: rotate(${Math.random() * 360}deg);
                transition: transform 2.5s cubic-bezier(0.25, 1, 0.5, 1), top 2.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 2.5s;
            `;
            document.body.appendChild(piece);
            setTimeout(() => {
                piece.style.top = `${Math.random() * 50 + 60}vh`;
                piece.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 100 - 50}px)`;
                piece.style.opacity = '0';
            }, 20);
            setTimeout(() => piece.remove(), 2600);
        }
    },

    showLevel2UndoToast(actionKey, undoId) {
        const toast = document.createElement('div');
        toast.className = 'level2-undo-toast';
        toast.id = `undo-toast-${undoId}`;
        toast.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <span class="clay-badge clay-badge-mint">Store Action</span>
                <span style="font-size:13px; color:#FFFFFF; font-weight:700;">Completed: <strong>${actionKey}</strong></span>
            </div>
            <button class="clay-btn clay-btn-coral" style="padding:6px 16px; font-size:12px;" onclick="HitlManager.triggerUndo('${undoId}')">
                ${window.Icons ? Icons.get('undo', 14, '#FFFFFF') : ''}
                <span>Undo (10s)</span>
            </button>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            if (document.getElementById(`undo-toast-${undoId}`)) {
                toast.remove();
            }
        }, 10000);
    },

    async triggerUndo(undoId) {
        try {
            const res = await fetch('/api/undo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ undoId })
            });
            const data = await res.json();
            const elem = document.getElementById(`undo-toast-${undoId}`);
            if (elem) elem.remove();
            this.showToast(data.message, 'mint');
            if (window.AegisApp && window.AegisApp.refreshCurrentView) {
                window.AegisApp.refreshCurrentView();
            }
        } catch (e) {
            this.showToast('Undo failed', 'coral');
        }
    },

    showToast(message, color = 'mint') {
        const toast = document.createElement('div');
        toast.className = 'clay-card';
        toast.style.cssText = `
            position: fixed; top: 24px; right: 24px; z-index: 99999;
            padding: 14px 22px; border-radius: 9999px; font-size: 13px; font-weight: 700;
            color: var(--text-primary); display: flex; align-items: center; gap: 12px;
            box-shadow: var(--clay-shadow-hover); background: #FFFFFF;
        `;
        const borderCol = color === 'mint' ? 'var(--clay-mint)' : color === 'coral' ? 'var(--clay-coral)' : color === 'lilac' ? 'var(--clay-lilac)' : 'var(--clay-butter)';
        toast.style.borderLeft = `6px solid ${borderCol}`;
        const iconName = color === 'coral' ? 'alertTriangle' : 'check';
        const iconSvg = window.Icons ? Icons.get(iconName, 18, borderCol) : '';
        toast.innerHTML = `${iconSvg}<span>${message}</span>`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    }
};

window.HitlManager = HitlManager;
