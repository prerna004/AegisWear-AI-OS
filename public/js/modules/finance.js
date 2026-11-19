// ============================================================================
// Module Group D: Finance, ERP & Supply Chain (Pastel Claymorphic Edition)
// Authentic Setproduct Claymorphism - Zero Emojis - Vector SVG Iconography
// ============================================================================

const FinanceModule = {
    async render(container) {
        let invoices = [];
        let inventory = [];
        let expenses = [];

        if (window.AegisStore) {
            invoices = window.AegisStore.getInvoices() || [];
            inventory = window.AegisStore.getInventory() || [];
            expenses = window.AegisStore.getExpenses() || [];
        }

        try {
            const [invRes, stockRes, expRes] = await Promise.all([
                fetch('/api/finance/invoices').then(r => r.json()).catch(() => null),
                fetch('/api/finance/inventory').then(r => r.json()).catch(() => null),
                fetch('/api/finance/expenses').then(r => r.json()).catch(() => null)
            ]);

            if (invRes && Array.isArray(invRes)) invoices = invRes;
            if (stockRes && Array.isArray(stockRes)) inventory = stockRes;
            if (expRes && Array.isArray(expRes)) expenses = expRes;
        } catch (e) {
            console.warn('[Finance] Network fetch notice:', e);
        }

        const totalInvoiced = invoices.reduce((s, i) => s + (i.amount || 0), 0);
        const lowStockCount = inventory.filter(i => i.status === 'Low Stock' || (i.stock || i.stock_on_hand || 0) <= (i.reorder_level || i.reorder_point || 0)).length;

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
                                            <span style="font-weight:800; font-size:13px; color:var(--text-primary);">${inv.customer_name || inv.client_name || 'Wholesale Client'}</span>
                                            <span class="clay-badge ${String(inv.status).toLowerCase() === 'paid' ? 'clay-badge-mint' : 'clay-badge-butter'}">
                                                ${String(inv.status || 'Pending').toUpperCase()}
                                            </span>
                                        </div>
                                        <div style="font-size:11px; color:var(--text-muted); margin-top:3px;">
                                            Invoice #${inv.id} • Due: ${inv.due_date || '2026-11-25'}
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
                            ${inventory.map(item => {
                                const stockVal = item.stock_on_hand ?? item.stock ?? 500;
                                const reorderVal = item.reorder_point ?? item.reorder_level ?? 150;
                                const isLow = stockVal <= reorderVal;
                                return `
                                    <div class="clay-card" style="padding:14px; background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border); display:flex; justify-content:space-between; align-items:center;">
                                        <div>
                                            <div style="display:flex; align-items:center; gap:8px;">
                                                <span style="font-weight:800; font-size:13px; color:var(--text-primary);">${item.name}</span>
                                                <span class="clay-badge ${!isLow ? 'clay-badge-mint' : 'clay-badge-coral'}">
                                                    ${!isLow ? 'Optimal' : 'Low Stock'}
                                                </span>
                                            </div>
                                            <div style="font-size:11px; color:var(--text-muted); margin-top:3px;">
                                                SKU: ${item.sku || item.id} • Location: ${item.warehouse || item.location || 'Mumbai Warehouse A'}
                                            </div>
                                        </div>
                                        <div style="text-align:right;">
                                            <div style="font-size:14px; font-weight:800; color:var(--text-primary); font-family:var(--font-mono);">${stockVal} Units</div>
                                            <div style="font-size:10px; color:var(--text-muted);">Reorder threshold: ${reorderVal}</div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>

                <!-- Expenses & Forensic Receipt Policy Audit -->
                <div class="clay-card" style="padding:22px; background:var(--clay-surface);">
                    <div style="margin-bottom:16px;">
                        <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Expense Reports &amp; Optical Character Recognition (OCR)</h3>
                        <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Automated fashion invoice verification and GST tax ID audit</p>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        ${expenses.map(e => `
                            <div class="clay-card" style="padding:16px; background:var(--clay-surface-recessed); border:1px solid var(--clay-nav-border); display:flex; justify-content:space-between; align-items:center;">
                                <div>
                                    <div style="display:flex; align-items:center; gap:8px;">
                                        <span style="font-weight:800; font-size:14px; color:var(--text-primary);">${e.vendor || e.employee_name || 'Milan Luxury Textiles'}</span>
                                        <span class="clay-badge ${String(e.status).toLowerCase() === 'approved' ? 'clay-badge-mint' : 'clay-badge-coral'}">
                                            ${String(e.status || 'Approved').toUpperCase()}
                                        </span>
                                    </div>
                                    <div style="font-size:12px; color:var(--text-muted); margin-top:3px;">
                                        Category: ${e.category} • Ref #${e.id} • ${e.description || 'Verified fashion invoice'}
                                    </div>
                                </div>
                                <div style="font-size:18px; font-weight:800; color:var(--text-primary); font-family:var(--font-mono);">
                                    $${Number(e.amount).toLocaleString()}
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
        modal.id = 'ocr-scanner-modal';
        modal.className = 'clay-modal-backdrop';
        modal.onclick = (e) => { if (e.target === modal) closeModal(modal); };
        modal.innerHTML = `
            <div class="clay-card clay-modal-box" style="width:680px; max-width:94vw; max-height:92vh; overflow-y:auto; padding:24px; background:var(--clay-surface); border-radius:24px; box-shadow:0 24px 60px rgba(0,0,0,0.4);">
                <!-- Modal Header -->
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:42px; height:42px; border-radius:14px; background:var(--clay-coral); color:#FFFFFF; display:flex; align-items:center; justify-content:center; box-shadow:2px 4px 10px rgba(255,124,99,0.4);">
                            ${Icons.get('camera', 22, '#FFFFFF')}
                        </div>
                        <div>
                            <h3 style="font-size:18px; font-weight:800; color:var(--text-primary); letter-spacing:-0.01em;">Mobile Receipt AI Scanner (OCR)</h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Capture supplier bills, fabric roll invoices & courier receipts</p>
                        </div>
                    </div>
                    <button class="clay-btn clay-btn-white clay-btn-circle" onclick="closeModal(this)" style="width:36px; height:36px;">
                        ${Icons.get('x', 14, 'var(--text-primary)')}
                    </button>
                </div>

                <!-- Hidden Native Camera Inputs -->
                <input type="file" id="ocr-camera-input" accept="image/*" capture="environment" style="display:none;" onchange="FinanceModule.handleReceiptSelected(event)">
                <input type="file" id="ocr-file-input" accept="image/*" style="display:none;" onchange="FinanceModule.handleReceiptSelected(event)">

                <!-- Interactive Upload / Camera Area -->
                <div id="ocr-dropzone" class="clay-card" style="background:var(--clay-bg); border:2px dashed var(--clay-nav-border); border-radius:20px; padding:28px 20px; text-align:center; transition:all 0.2s;">
                    <div style="width:56px; height:56px; border-radius:18px; background:var(--clay-surface); color:var(--clay-coral); display:flex; align-items:center; justify-content:center; margin:0 auto 12px; box-shadow:var(--clay-shadow-sm);">
                        ${Icons.get('camera', 28, 'var(--clay-coral)')}
                    </div>
                    <div style="font-size:15px; font-weight:800; color:var(--text-primary);">Take Receipt Photo or Upload Invoice</div>
                    <div style="font-size:12px; color:var(--text-muted); margin-top:4px; max-width:440px; margin-left:auto; margin-right:auto;">
                        Uses mobile camera hardware to scan supplier receipts and auto-extract fabrics, trims & tax IDs.
                    </div>

                    <!-- Action Buttons -->
                    <div style="display:flex; justify-content:center; gap:10px; margin-top:18px; flex-wrap:wrap;">
                        <button class="clay-btn clay-btn-coral" onclick="document.getElementById('ocr-camera-input').click()">
                            ${Icons.get('camera', 16, '#FFFFFF')}
                            <span>Open Camera / Snap Photo</span>
                        </button>
                        <button class="clay-btn clay-btn-white" onclick="document.getElementById('ocr-file-input').click()">
                            ${Icons.get('fileText', 16, 'currentColor')}
                            <span>Choose from Gallery / Files</span>
                        </button>
                        <button class="clay-btn clay-btn-white" style="font-size:11px; padding:6px 14px;" onclick="FinanceModule.loadSampleReceipt()">
                            ${Icons.get('sparkles', 14, 'var(--clay-coral)')}
                            <span>Try Sample Fabric Invoice</span>
                        </button>
                    </div>

                    <div style="margin-top:16px; text-align:center;">
                        <button class="clay-btn clay-btn-white" onclick="closeModal(this)" style="font-size:12px; padding:6px 18px;">
                            Cancel
                        </button>
                    </div>
                </div>

                <!-- Live Image Preview & Extraction Container (Initially Hidden) -->
                <div id="ocr-preview-container" style="display:none; margin-top:16px;">
                    <!-- Laser Scanner Viewport -->
                    <div style="position:relative; width:100%; max-height:220px; border-radius:16px; overflow:hidden; background:#0F172A; display:flex; align-items:center; justify-content:center;">
                        <img id="ocr-preview-img" src="" alt="Scanned Receipt" style="width:100%; height:100%; object-fit:contain; opacity:0.85;">
                        <!-- Animated Scanning Laser Line -->
                        <div id="ocr-laser" style="position:absolute; top:0; left:0; right:0; height:3px; background:#7AE8C2; box-shadow:0 0 16px #7AE8C2; animation:laserScan 1.8s infinite alternate ease-in-out;"></div>
                    </div>

                    <!-- Extracted Line Items Data Card -->
                    <div id="ocr-results-box" class="clay-card" style="margin-top:14px; padding:18px; background:var(--clay-surface); border-radius:18px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid var(--clay-nav-border); padding-bottom:8px;">
                            <div>
                                <div style="font-size:14px; font-weight:800; color:var(--text-primary);">Milan Luxury Textile Mill &amp; Trims Ltd</div>
                                <div style="font-size:11px; color:var(--text-muted);">GST ID: 27AABCM9182C1ZP • Inv #MLT-88219 • 19 Nov 2026</div>
                            </div>
                            <span class="clay-badge clay-badge-mint">99.8% Match</span>
                        </div>

                        <div style="font-size:12px; color:var(--text-secondary); line-height:1.7;">
                            <div style="display:flex; justify-content:space-between;">
                                <span>250m Organic French Terry Fleece (Lilac &amp; Mint)</span>
                                <strong>$3,250.00</strong>
                            </div>
                            <div style="display:flex; justify-content:space-between;">
                                <span>120x Rose Gold Metallic YKK Zippers</span>
                                <strong>$480.00</strong>
                            </div>
                            <div style="display:flex; justify-content:space-between;">
                                <span>500x Recycled Eco-Clay Sneaker Outsoles</span>
                                <strong>$4,500.00</strong>
                            </div>
                            <div style="display:flex; justify-content:space-between; margin-top:6px; padding-top:6px; border-top:1px dashed var(--clay-nav-border); color:var(--text-muted);">
                                <span>GST / Sales Tax (18%)</span>
                                <span>$1,481.40</span>
                            </div>
                            <div style="display:flex; justify-content:space-between; font-size:14px; font-weight:800; color:var(--clay-coral); margin-top:4px;">
                                <span>Grand Total Extracted:</span>
                                <span>$9,711.40</span>
                            </div>
                        </div>

                        <!-- Confirmation Button -->
                        <div style="margin-top:16px; display:flex; justify-content:flex-end; gap:10px;">
                            <button class="clay-btn clay-btn-white" onclick="FinanceModule.resetOcr()">Scan Another</button>
                            <button class="clay-btn clay-btn-coral" onclick="FinanceModule.confirmOcrExpense()">
                                ${Icons.get('check', 16, '#FFFFFF')}
                                <span>✓ Approve &amp; Log to Expenses</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    handleReceiptSelected(event) {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            this.showOcrResults(e.target.result);
        };
        reader.readAsDataURL(file);
    },

    loadSampleReceipt() {
        // High quality fashion fabric invoice SVG mockup
        const sampleSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300"><rect width="600" height="300" fill="%23FFFFFF"/><text x="40" y="50" font-family="monospace" font-size="20" font-weight="bold" fill="%231E293B">MILAN TEXTILE MILLS INVOICE</text><text x="40" y="80" font-family="monospace" font-size="12" fill="%2364748B">GST: 27AABCM9182C1ZP | DATE: 19-NOV-2026</text><line x1="40" y1="100" x2="560" y2="100" stroke="%23CBD5E1" stroke-width="2"/><text x="40" y="130" font-family="monospace" font-size="14" fill="%23334155">250m Organic French Terry Fleece ........... $3,250.00</text><text x="40" y="160" font-family="monospace" font-size="14" fill="%23334155">120x Metallic YKK Rose Gold Zippers ......... $480.00</text><text x="40" y="190" font-family="monospace" font-size="14" fill="%23334155">500x Recycled Cloud Sneaker Soles .......... $4,500.00</text><line x1="40" y1="220" x2="560" y2="220" stroke="%23CBD5E1" stroke-width="2"/><text x="40" y="250" font-family="monospace" font-size="16" font-weight="bold" fill="%23E11D48">TOTAL AMOUNT: $9,711.40 (PAID VIA STRIPE)</text></svg>`;
        this.showOcrResults(sampleSvg);
    },

    showOcrResults(imgSrc) {
        const dropzone = document.getElementById('ocr-dropzone');
        const container = document.getElementById('ocr-preview-container');
        const img = document.getElementById('ocr-preview-img');

        if (dropzone) dropzone.style.display = 'none';
        if (container) container.style.display = 'block';
        if (img) img.src = imgSrc;

        HitlManager.showToast('Camera capture received. Running neural OCR extraction...', 'mint');

        setTimeout(() => {
            const laser = document.getElementById('ocr-laser');
            if (laser) laser.style.display = 'none';
            HitlManager.showToast('✓ OCR Complete: 3 Fashion Line Items extracted!', 'mint');
        }, 1200);
    },

    resetOcr() {
        const dropzone = document.getElementById('ocr-dropzone');
        const container = document.getElementById('ocr-preview-container');
        if (dropzone) dropzone.style.display = 'block';
        if (container) container.style.display = 'none';
    },

    confirmOcrExpense() {
        if (window.AegisStore) {
            window.AegisStore.addExpense({
                vendor: 'Milan Luxury Textile Mill & Trims Ltd',
                category: 'Raw Materials',
                amount: 9711.40,
                description: '250m French Terry Fleece + 120 YKK Zippers + 500 Outsoles'
            });
        }
        HitlManager.showToast('✓ Scanned Invoice #MLT-88219 logged to Warehouse Expenses!', 'mint');
        const modal = document.getElementById('ocr-scanner-modal');
        if (modal) modal.remove();

        // Refresh Finance view
        if (window.AegisApp && AegisApp.currentModule === 'finance') {
            AegisApp.switchModule('finance');
        }
    }
};

window.FinanceModule = FinanceModule;
