// ============================================================================
// Module Group D: Finance, ERP & Supply Chain (Pastel Claymorphic Edition)
// Authentic Setproduct Claymorphism - Zero Emojis - Vector SVG Iconography
// ============================================================================

const FinanceModule = {
    async render(container) {
        const [invRes, stockRes, expRes] = await Promise.all([
            fetch('/api/finance/invoices').then(r => r.json()),
            fetch('/api/finance/inventory').then(r => r.json()),
            fetch('/api/finance/expenses').then(r => r.json())
        ]);

        const invoices = invRes || [];
        const inventory = stockRes || [];
        const expenses = expRes || [];

        const totalInvoiced = invoices.reduce((s, i) => s + (i.amount || 0), 0);
        const lowStockCount = inventory.filter(i => i.status === 'Low Stock' || i.stock_on_hand <= i.reorder_point).length;

        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:20px;">
                <!-- Simple Explainer Banner -->
                <div class="simple-guide-banner">
                    <div class="simple-guide-icon" style="background:var(--clay-mint);">
                        ${Icons.get('dollar', 24, '#0E4337')}
                    </div>
                    <div>
                        <div style="font-size:15px; font-weight:800; color:var(--text-primary);">Room D: Warehouse Stock, Hoodies, Sneakers & Billing</div>
                        <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
                            Autonomous AI agents balance store ledgers, track hoodie & sneaker stock in warehouses, and scan fabric & shipping receipts automatically.
                        </div>
                    </div>
                </div>

                <!-- Action Bar -->
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <button class="clay-btn clay-btn-white" onclick="FinanceModule.openOcrModal()">
                        ${Icons.get('camera', 16, 'var(--text-primary)')}
                        <span>Scan Receipt Photo (OCR)</span>
                    </button>
                    <button class="clay-btn clay-btn-mint" onclick="Copilot.sendQuickPrompt('Perform automated bank reconciliation across November feeds', 'agent-bookkeeper')">
                        ${Icons.get('zap', 16, '#0E4337')}
                        <span>Automated Bank Reconciliation</span>
                    </button>
                </div>

                <!-- 4 Quick Stats -->
                <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:14px;">
                    <div class="clay-card" style="padding:18px; background:var(--clay-surface);">
                        <div style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Total Invoiced</div>
                        <div style="font-size:24px; font-weight:800; color:var(--text-primary); margin-top:6px; font-family:var(--font-mono);">$${totalInvoiced.toLocaleString()}</div>
                        <div style="font-size:11px; color:#10B981; font-weight:700; margin-top:4px;">Tax calculations verified</div>
                    </div>
                    <div class="clay-card" style="padding:18px; background:var(--clay-surface);">
                        <div style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Low Stock SKUs</div>
                        <div style="font-size:24px; font-weight:800; color:var(--clay-coral); margin-top:6px; font-family:var(--font-mono);">${lowStockCount} Items</div>
                        <div style="font-size:11px; color:var(--clay-coral); font-weight:700; margin-top:4px;">Safety stock reorder triggered</div>
                    </div>
                    <div class="clay-card" style="padding:18px; background:var(--clay-surface);">
                        <div style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Flagged Receipts</div>
                        <div style="font-size:24px; font-weight:800; color:var(--clay-butter-dark); margin-top:6px; font-family:var(--font-mono);">${expenses.filter(e => e.status === 'flagged_policy').length}</div>
                        <div style="font-size:11px; color:var(--clay-butter-dark); font-weight:700; margin-top:4px;">Policy limit exceeded</div>
                    </div>
                    <div class="clay-card" style="padding:18px; background:var(--clay-surface);">
                        <div style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Active Subscriptions</div>
                        <div style="font-size:24px; font-weight:800; color:var(--clay-navy); margin-top:6px; font-family:var(--font-mono);">1,285</div>
                        <div style="font-size:11px; color:var(--text-secondary); margin-top:4px;">Metered usage billing</div>
                    </div>
                </div>

                <!-- Invoices & Stock Split -->
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
                    <!-- Invoices List -->
                    <div class="clay-card" style="padding:22px; background:var(--clay-surface);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                            <div>
                                <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Bills & Accounts Receivable</h3>
                                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Automated multi-currency billing ledgers</p>
                            </div>
                            <span class="clay-badge clay-badge-mint">Tax Compliant</span>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:12px;">
                            ${invoices.map(inv => `
                                <div class="clay-card" style="padding:14px; background:var(--clay-surface); display:flex; justify-content:space-between; align-items:center;">
                                    <div>
                                        <div style="display:flex; align-items:center; gap:8px;">
                                            <span style="font-weight:800; font-size:13px; color:var(--text-primary);">${inv.customer_name}</span>
                                            <span class="clay-badge ${inv.status === 'paid' ? 'clay-badge-mint' : 'clay-badge-butter'}">
                                                ${inv.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <div style="font-size:11px; color:var(--text-muted); margin-top:3px;">
                                            Invoice #${inv.id} • Due: ${inv.due_date}
                                        </div>
                                    </div>
                                    <div style="font-size:15px; font-weight:800; color:var(--text-primary); font-family:var(--font-mono);">
                                        $${Number(inv.amount).toLocaleString()}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Inventory Stock -->
                    <div class="clay-card" style="padding:22px; background:var(--clay-surface);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                            <div>
                                <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Warehouse Stock: Hoodies, Sneakers & Bags</h3>
                                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Stock levels across LA & London fulfillment hubs</p>
                            </div>
                            <button class="clay-btn clay-btn-white" style="font-size:11px; padding:6px 12px;" onclick="Copilot.sendQuickPrompt('Forecast SKU depletion velocity and calculate safety stock buffer for Puffy Runners and Hoodies', 'agent-inventory-forecast')">
                                Check Restock Dates
                            </button>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:12px;">
                            ${inventory.map(item => `
                                <div class="clay-card" style="padding:14px; background:var(--clay-surface); display:flex; justify-content:space-between; align-items:center;">
                                    <div>
                                        <div style="display:flex; align-items:center; gap:8px;">
                                            <span style="font-weight:800; font-size:13px; color:var(--text-primary);">${item.name}</span>
                                            <span class="clay-badge ${item.status === 'Optimal' ? 'clay-badge-mint' : 'clay-badge-coral'}">
                                                ${item.status}
                                            </span>
                                        </div>
                                        <div style="font-size:11px; color:var(--text-muted); margin-top:3px;">
                                            SKU: ${item.sku} • Location: ${item.warehouse}
                                        </div>
                                    </div>
                                    <div style="text-align:right;">
                                        <div style="font-size:14px; font-weight:800; color:var(--text-primary); font-family:var(--font-mono);">${item.stock_on_hand} Units</div>
                                        <div style="font-size:10px; color:var(--text-muted);">Reorder threshold: ${item.reorder_point}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Expenses & Forensic Receipt Policy Audit -->
                <div class="clay-card" style="padding:22px; background:var(--clay-surface);">
                    <div style="margin-bottom:16px;">
                        <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Expense Reports & Optical Character Recognition (OCR)</h3>
                        <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Automated fraud detection and company travel threshold audit</p>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        ${expenses.map(e => `
                            <div class="clay-card" style="padding:16px; background:var(--clay-surface); display:flex; justify-content:space-between; align-items:center;">
                                <div>
                                    <div style="display:flex; align-items:center; gap:8px;">
                                        <span style="font-weight:800; font-size:14px; color:var(--text-primary);">${e.employee_name}</span>
                                        <span class="clay-badge ${e.status === 'approved' ? 'clay-badge-mint' : 'clay-badge-coral'}">
                                            ${e.status === 'flagged_policy' ? 'POLICY VIOLATION' : e.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div style="font-size:12px; color:var(--text-muted); margin-top:3px;">
                                        Category: ${e.category} • Ref #${e.id}
                                    </div>
                                    ${e.flag_reason ? `
                                        <div style="margin-top:8px; font-size:12px; color:var(--clay-coral-dark); background:#FFE4E1; padding:8px 14px; border-radius:10px; font-weight:700;">
                                            Flag: ${e.flag_reason}
                                        </div>
                                    ` : ''}
                                </div>
                                <div style="font-size:18px; font-weight:800; color:var(--text-primary); font-family:var(--font-mono);">
                                    $${Number(e.amount).toFixed(2)} ${e.currency}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    openOcrModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `position:fixed; inset:0; background:rgba(31,36,56,0.6); backdrop-filter:blur(8px); z-index:10000; display:flex; align-items:center; justify-content:center;`;
        modal.innerHTML = `
            <div class="clay-card" style="width:640px; max-width:92vw; padding:28px; background:var(--clay-surface);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:40px; height:40px; border-radius:12px; background:var(--clay-coral); color:#FFFFFF; display:flex; align-items:center; justify-content:center;">
                            ${Icons.get('camera', 20, '#FFFFFF')}
                        </div>
                        <div>
                            <h3 style="font-size:17px; font-weight:800; color:var(--text-primary);">Mobile Receipt AI Scanner (OCR)</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Automated extraction of merchant, tax identifiers, line items, and VAT</p>
                        </div>
                    </div>
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="this.closest('div[style*=\\'position:fixed\\']').remove()" style="width:34px; height:34px;">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>
                <div class="clay-card" style="background:#F8FAFC; border:2px dashed #CBD5E1; padding:32px; text-align:center;">
                    <div style="width:52px; height:52px; border-radius:16px; background:var(--clay-surface); color:var(--clay-coral); display:flex; align-items:center; justify-content:center; margin:0 auto 12px; box-shadow:var(--clay-shadow-sm);">
                        ${Icons.get('fileText', 26, 'var(--clay-coral)')}
                    </div>
                    <div style="font-size:14px; font-weight:800; color:var(--text-primary);">Upload Receipt Photo or Drag File</div>
                    <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">Simulates camera capture pipeline from mobile PWA</div>
                    <button class="clay-btn clay-btn-coral" style="margin-top:18px;" onclick="FinanceModule.simulateOcrUpload(this)">
                        Simulate Optical OCR Processing
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    simulateOcrUpload(btn) {
        btn.innerHTML = 'Extracting line items & tax IDs via OCR...';
        setTimeout(() => {
            Copilot.sendQuickPrompt('Scan uploaded receipt for Camille Dubois and audit against company travel policy', 'agent-receipt-ocr');
            btn.closest('div[style*="position:fixed"]').remove();
        }, 800);
    }
};

window.FinanceModule = FinanceModule;
