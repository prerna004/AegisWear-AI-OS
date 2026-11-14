// ============================================================================
// AegisWear: Enterprise Master Seed Data (AI-Native Fashion & E-Commerce)
// Pre-populates all 9 Zoho One Module equivalents + 26 Agent initial states
// ============================================================================

const db = require('./db');

function seedDatabase(forceClear = false) {
    console.log('[Seed] Populating AegisWear E-Commerce Enterprise Data...');

    if (forceClear) {
        const tables = [
            'leads', 'accounts', 'deals', 'quotes', 'campaigns', 'social_posts',
            'tickets', 'kb_articles', 'invoices', 'inventory', 'expenses',
            'employees', 'candidates', 'emails', 'chat_messages', 'projects',
            'tasks', 'it_assets', 'it_incidents', 'workflows', 'hitl_queue',
            'agent_audit_ledger', 'agent_memory'
        ];
        for (const t of tables) {
            db.run(`DELETE FROM ${t}`);
        }
    }

    // 1. Leads (Wholesale Boutique Buyers & Retail Inquiries)
    const existingLeads = db.query('SELECT count(*) as count FROM leads');
    if (existingLeads[0]?.count === 0) {
        const leads = [
            ['lead-101', 'Aria Montgomery', 'Nordic Streetwear Boutique', 'aria@nordicstreet.dk', '+45 3321 8890', 'Qualified', 94, 'High', JSON.stringify({ stores: '8 boutiques across Copenhagen & Oslo', interest: 'Oversized Hoodies & Sneakers', targetOrder: '$48,000' })],
            ['lead-102', 'Liam Gallagher', 'Soho Fashion House', 'liam@sohofashion.co.uk', '+44 20 7946 0912', 'Contacted', 92, 'High', JSON.stringify({ stores: 'Flagships in London & NYC', interest: 'Puffy Runner Pastel Sneakers', targetOrder: '$65,000' })],
            ['lead-103', 'Kenji Sato', 'Harajuku Urban Apparel', 'kenji@harajukuurban.jp', '+81 3 5555 0142', 'New', 88, 'Medium', JSON.stringify({ stores: 'Concept store in Tokyo', interest: 'Puff Baseball Caps & Accessories', targetOrder: '$32,000' })],
            ['lead-104', 'Zoya Merchant', 'Kala Ghoda Designer Hub', 'zoya@kalaghodahub.in', '+91 98201 55678', 'Qualified', 95, 'High', JSON.stringify({ stores: 'Luxury boutique in Mumbai', interest: 'Peach Leather Clay Tote Bags', targetOrder: '$18,500' })],
            ['lead-105', 'Chloe Dubois', 'Marais Apparel Gallery', 'chloe@maraisgallery.fr', '+33 1 4268 5500', 'Nurturing', 78, 'Low', JSON.stringify({ stores: 'Paris showroom', interest: 'Summer Drop Lookbook Preview', targetOrder: '$14,000' })]
        ];
        for (const l of leads) {
            db.run('INSERT INTO leads (id, name, company, email, phone, status, score, intent, firmographics) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', l);
        }
    }

    // 2. Accounts & Deals (Wholesale Partnerships)
    const existingDeals = db.query('SELECT count(*) as count FROM deals');
    if (existingDeals[0]?.count === 0) {
        const accounts = [
            ['acc-01', 'Nordic Streetwear Boutique', 'Apparel & Streetwear Retail', 12000000, 'Copenhagen, Denmark', 94, 'https://nordicstreet.example.com'],
            ['acc-02', 'Soho Fashion House', 'Luxury Urban Fashion Chain', 45000000, 'London / New York', 91, 'https://sohofashion.example.com'],
            ['acc-03', 'Harajuku Urban Apparel', 'Streetwear Concept Store', 18000000, 'Tokyo, Japan', 88, 'https://harajukuurban.example.com'],
            ['acc-04', 'Kala Ghoda Designer Hub', 'Designer Fashion Boutique', 8500000, 'Mumbai, India', 96, 'https://kalaghodahub.example.com']
        ];
        for (const a of accounts) {
            db.run('INSERT OR IGNORE INTO accounts (id, name, industry, annual_revenue, location, health_score, website) VALUES (?, ?, ?, ?, ?, ?, ?)', a);
        }

        const deals = [
            ['deal-501', 'Nordic Wholesale: 250 Oversized Hoodies & 150 Sneakers', 'acc-01', 'Nordic Streetwear Boutique', 48000, 'negotiation', 85, '2026-12-10', 'quote-801'],
            ['deal-502', 'Soho Bulk Order: 500 Puffy Runner Sneakers (15% Discount)', 'acc-02', 'Soho Fashion House', 65000, 'proposal', 70, '2026-12-20', 'quote-802'],
            ['deal-503', 'Harajuku Concept Drop: 300 Puff Caps & Tote Bags', 'acc-03', 'Harajuku Urban Apparel', 32000, 'closed_won', 100, '2026-11-05', 'quote-803'],
            ['deal-504', 'Kala Ghoda Hub: 150 Peach Leather Clay Totes', 'acc-04', 'Kala Ghoda Designer Hub', 18500, 'closed_won', 100, '2026-11-12', 'quote-804']
        ];
        for (const d of deals) {
            db.run('INSERT INTO deals (id, title, account_id, account_name, amount, stage, probability, expected_close, cpq_quote_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', d);
        }

        const quotes = [
            ['quote-801', 'deal-501', 'Nordic Streetwear Boutique', JSON.stringify([
                { item: 'Oversized Clay Hoodie (Pastel Lilac / Butter)', qty: 250, unit: 48, subtotal: 12000 },
                { item: 'Puffy Runner Pastel Sneakers (Mint/Yellow)', qty: 150, unit: 65, subtotal: 9750 },
                { item: 'Worldwide Priority Freight & Custom Labeling', qty: 1, unit: 2250, subtotal: 2250 }
            ]), 48000, 8.0, 41.5, 'approved'],
            ['quote-802', 'deal-502', 'Soho Fashion House', JSON.stringify([
                { item: 'Puffy Runner Pastel Sneakers (Special Bulk Lot)', qty: 500, unit: 55, subtotal: 27500 },
                { item: 'Oversized Clay Hoodie (Exclusive Colorway)', qty: 300, unit: 45, subtotal: 13500 }
            ]), 65000, 15.0, 36.2, 'pending_hitl']
        ];
        for (const q of quotes) {
            db.run('INSERT INTO quotes (id, deal_id, client_name, items_json, total_amount, discount_percent, margin_percent, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', q);
        }
    }

    // 3. Campaigns & Social (E-Commerce Drops, Instagram & TikTok)
    const existingCampaigns = db.query('SELECT count(*) as count FROM campaigns');
    if (existingCampaigns[0]?.count === 0) {
        const campaigns = [
            ['camp-01', 'Summer Drop 2026 Streetwear Collection', 'Omnichannel', 'Active', 48500, 52.4, 21.6, 14500, 'Targeted at streetwear lovers on Instagram & TikTok across London, NYC & Mumbai'],
            ['camp-02', 'VIP Early Access: Pastel Hoodies & Sneakers', 'Email', 'Active', 18200, 44.8, 16.2, 4800, 'Exclusive 24-hour early access for high-LTV loyalty members'],
            ['camp-03', 'Influencer Unboxing Blitz (50 Fashion Creators)', 'Social', 'Completed', 65000, 68.1, 28.5, 12000, 'Unboxing reels for Puffy Runner Sneakers & Peach Leather Clay Totes']
        ];
        for (const c of campaigns) {
            db.run('INSERT INTO campaigns (id, name, type, status, audience_size, open_rate, click_rate, budget, generated_brief) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', c);
        }

        const social = [
            ['soc-01', 'Instagram', 'Pastel season is officially here! Meet the Puffy Runner in Mint Green and the Oversized Clay Hoodie in Lilac. Limited drop live now.', '2026-11-15 12:00:00', 'Published', 0.96, 4280],
            ['soc-02', 'X', 'Every stitch in our Summer 2026 collection uses 100% organic cotton and eco-friendly clay dye. Sustainable fashion meets futuristic comfort.', '2026-11-14 16:30:00', 'Published', 0.91, 1850]
        ];
        for (const s of social) {
            db.run('INSERT INTO social_posts (id, platform, content, scheduled_time, status, sentiment_score, engagement_count) VALUES (?, ?, ?, ?, ?, ?, ?)', s);
        }
    }

    // 4. Customer Support: Size Exchanges, Orders & Returns
    const existingTickets = db.query('SELECT count(*) as count FROM tickets');
    if (existingTickets[0]?.count === 0) {
        const tickets = [
            ['tick-301', 'Exchange Size: Clay Hoodie (Medium to Large)', 'Sarah Jenkins', 'sarah.j@gmail.com', 'Medium', 'resolved', 'Exchanges', '2026-11-16 14:00:00', 'Positive', 'AI Support Agent verified stock in Bhiwandi Hub and auto-generated return QR label.'],
            ['tick-302', 'Tracking Inquiry: Where is my Puffy Runner sneaker shipment?', 'Devin Miller', 'devin.m@outlook.com', 'Low', 'resolved', 'Shipping', '2026-11-16 11:30:00', 'Neutral', 'AI verified BlueDart courier tracking link. Package is out for delivery today.'],
            ['tick-303', 'Damaged Item: Silk Trench Coat ($240 Refund Request)', 'Ananya Roy', 'ananya.roy@yahoo.com', 'Urgent', 'open', 'Returns', '2026-11-16 09:15:00', 'Frustrated', 'Customer received rain-damaged outer carton. Refund > $50 threshold; escalated to Boss HITL for sign-off.']
        ];
        for (const t of tickets) {
            db.run('INSERT INTO tickets (id, subject, customer_name, email, priority, status, department, sla_due_at, sentiment, resolution_notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', t);
        }

        const kb = [
            ['kb-101', 'Hassle-Free 14-Day Size Exchanges & Instant Return Labels', 'Customer FAQ', 'Step-by-step guide on how customers can exchange hoodies and shoes in 60 seconds with our instant courier pickup QR code.', 2450, 210, 'tick-301', 'published'],
            ['kb-102', 'Complete Footwear & Sneaker Sizing Guide (US / UK / EU)', 'Fit & Sizing', 'Accurate foot measurement guide for Puffy Runner Sneakers with insole dimensions in centimeters and conversion chart.', 3890, 340, 'tick-302', 'published'],
            ['kb-103', 'Care & Washing Instructions for Organic Cotton Clay Hoodies', 'Garment Care', 'Preserve pastel colors: Wash inside-out in cold water, use gentle eco-detergent, and air-dry flat in shade.', 1640, 155, 'tick-303', 'published']
        ];
        for (const k of kb) {
            db.run('INSERT INTO kb_articles (id, title, category, content, views, helpful_count, source_ticket_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', k);
        }
    }

    // 5. Finance, Warehouse Inventory & Invoices
    const existingInvoices = db.query('SELECT count(*) as count FROM invoices');
    if (existingInvoices[0]?.count === 0) {
        const invoices = [
            ['inv-901', 'Harajuku Urban Apparel', 32000, 5760, '2026-11-25', 'paid', JSON.stringify([{ desc: 'Puff Baseball Caps & Accessories (300 units)', amount: 32000 }])],
            ['inv-902', 'Kala Ghoda Designer Hub', 18500, 3330, '2026-11-28', 'paid', JSON.stringify([{ desc: 'Peach Leather Clay Tote Bags (150 units)', amount: 18500 }])],
            ['inv-903', 'Nordic Streetwear Boutique', 48000, 8640, '2026-12-05', 'unpaid', JSON.stringify([{ desc: 'Oversized Hoodies & Puffy Runners Batch 1', amount: 48000 }])]
        ];
        for (const inv of invoices) {
            db.run('INSERT INTO invoices (id, customer_name, amount, tax_amount, due_date, status, items_json) VALUES (?, ?, ?, ?, ?, ?, ?)', inv);
        }

        const inventory = [
            ['inv-sku-01', 'CLAY-HD-01', 'Oversized Clay Hoodie (Pastel Lilac / Butter)', 'Apparel', 'Bhiwandi Central Hub', 140, 40, 72.00, 'Optimal'],
            ['inv-sku-02', 'PUFF-RN-02', 'Puffy Runner Pastel Sneakers (Mint/Yellow)', 'Footwear', 'Bhiwandi Central Hub', 18, 50, 89.00, 'Low Stock'],
            ['inv-sku-03', 'PUFF-CP-03', 'Puff Baseball Cap (Mint Green)', 'Headwear', 'Bhiwandi Central Hub', 125, 30, 29.00, 'Optimal'],
            ['inv-sku-04', 'CLAY-TT-04', 'Clay Tote Bag (Peach Leather)', 'Bags & Accessories', 'Mumbai Flagship Store', 14, 25, 67.00, 'Low Stock'],
            ['inv-sku-05', 'CHUN-WT-05', 'Chunk Minimalist Pastel Watch (Sky Blue)', 'Watches', 'Bhiwandi Central Hub', 85, 20, 49.00, 'Optimal'],
            ['inv-sku-06', 'SQUI-SD-06', 'Squish Retro Sunglasses (Lavender)', 'Eyewear', 'Bhiwandi Central Hub', 110, 25, 35.00, 'Optimal']
        ];
        for (const item of inventory) {
            db.run('INSERT INTO inventory (id, sku, name, category, warehouse, stock_on_hand, reorder_point, unit_price, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', item);
        }

        const expenses = [
            ['exp-401', 'Ananya Deshmukh', 'Lookbook Photoshoot Studio Rental', 1850.00, 'USD', 'https://receipts.example.com/studio-401.pdf', 'approved', null],
            ['exp-402', 'Devendra Patil', 'Milan Fashion Week Exhibition Space', 4800.00, 'EUR', 'https://receipts.example.com/milan-402.pdf', 'flagged_policy', 'Amount exceeds single travel transaction threshold of €3,000 without prior VP sign-off.'],
            ['exp-403', 'Samir Kulkarni', 'Warehouse Eco-Packaging Materials', 640.00, 'USD', 'https://receipts.example.com/pack-403.pdf', 'approved', null]
        ];
        for (const exp of expenses) {
            db.run('INSERT INTO expenses (id, employee_name, category, amount, currency, receipt_url, status, flag_reason) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', exp);
        }
    }

    // 6. Employees & Candidates (Creative Team & Store Staff)
    const existingEmployees = db.query('SELECT count(*) as count FROM employees');
    if (existingEmployees[0]?.count === 0) {
        const employees = [
            ['emp-01', 'Prerna Chotwani', 'Head of Creative Architecture & AI Pod Lead', 'Design & Tech', 'prerna@aegiswear.internal', '+91 98200 44321', '2025-01-15', 'Active', null, 22],
            ['emp-02', 'Vikram Malhotra', 'Chief Supply Chain & Logistics Lead', 'Operations', 'vikram.m@aegiswear.internal', '+91 98199 88776', '2025-03-01', 'Active', 'emp-01', 19],
            ['emp-03', 'Ananya Deshmukh', 'Senior Fashion & Apparel Designer', 'Design', 'ananya.d@aegiswear.internal', '+91 99201 33445', '2025-04-10', 'Active', 'emp-01', 18],
            ['emp-04', 'Samir Kulkarni', 'Warehouse Logistics & Fulfillment QA', 'Fulfillment', 'samir.k@aegiswear.internal', '+91 98700 12345', '2025-06-01', 'Active', 'emp-01', 20],
            ['emp-05', 'Nisha Sen', 'Head of Customer Stylist Experience', 'Customer Care', 'nisha.s@aegiswear.internal', '+91 98111 67890', '2025-02-15', 'Active', 'emp-01', 16]
        ];
        for (const e of employees) {
            db.run('INSERT INTO employees (id, name, title, department, email, phone, join_date, status, manager_id, pto_balance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', e);
        }

        const candidates = [
            ['cand-01', 'Tanvi Parekh', 'Sustainable Textile & Eco-Dye Specialist', 'tanvi.p@gmail.com', 96, 'Interview', 'Expert in GOTS certified organic cotton, recycled canvas, and zero-chemical clay dyes with 6 years experience.'],
            ['cand-02', 'Aditya Joshi', 'Senior E-Commerce Growth & Merchandiser', 'aditya.j@outlook.com', 92, 'Offer Pending', 'Led D2C fashion revenue growth from $2M to $12M with high-converting lookbook experiences.'],
            ['cand-03', 'Zara Chen', 'Lead Fashion Lookbook Photographer', 'zara.c@alumni.arts.edu', 89, 'Screened', 'Vogue & GQ featured editorial photographer specializing in pastel natural-light lookbooks.']
        ];
        for (const cand of candidates) {
            db.run('INSERT INTO candidates (id, name, applied_role, email, match_score, status, resume_summary) VALUES (?, ?, ?, ?, ?, ?, ?)', cand);
        }
    }

    // 7. Collaboration: Supplier Inquiries & Store Chat
    const existingEmails = db.query('SELECT count(*) as count FROM emails');
    if (existingEmails[0]?.count === 0) {
        const emails = [
            ['em-01', 'aria@nordicstreet.dk', 'prerna@aegiswear.internal', 'Nordic Streetwear Wholesale Contract & Delivery Schedule', 'Hi Prerna, We reviewed the wholesale quote for 250 hoodies and 150 sneakers. Please confirm if the first batch can ship by December 10th.', 'Hi Prerna, We love the clay pastel samples! The fabric quality is fantastic. Please confirm our 8% discount was locked in and we will complete the e-signature.', 'action_needed', 0, 'Hi Aria, Confirmed! The 8% discount is locked and the digital contract is ready in Documenso. Shipment departs Dec 10th.'],
            ['em-02', 'factory@textilesupplier.in', 'operations@aegiswear.internal', 'GOTS Organic Cotton Fabric Batch 4 Ready for Dispatch', 'Batch 4 of pastel lilac and mint fleece fabric (4,000 meters) has passed all quality checks and is en route to our stitching unit.', 'Dear Team, All lab dip approvals for the pastel lilac hue have been matched 100%. Dispatching 4,000 meters today.', 'primary', 1, 'Thank you! Warehouse inventory has been notified to receive the bolt rolls.']
        ];
        for (const em of emails) {
            db.run('INSERT INTO emails (id, sender, recipient, subject, preview, body, category, is_read, ai_draft_reply) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', em);
        }

        const chat = [
            ['msg-01', '#general', 'Prerna Chotwani', 'Team, all 26 autonomous fashion agents are online and running smoothly! Summer Drop is fully stocked.', '2026-11-16 10:15:00', 0],
            ['msg-02', '#general', 'Aegis Sentinel Agent', 'Automated Store Update: 140 online orders processed today, zero return backlogs, p95 site response is 38ms.', '2026-11-16 10:15:30', 1],
            ['msg-03', '#leads', 'Lead Enrichment Agent', 'New high-intent wholesale buyer: Aria Montgomery (Nordic Streetwear). Score: 94/100. Sample catalog sent automatically.', '2026-11-16 10:45:00', 1]
        ];
        for (const ch of chat) {
            db.run('INSERT INTO chat_messages (id, channel, sender, text, timestamp, is_bot) VALUES (?, ?, ?, ?, ?, ?)', ch);
        }
    }

    // 8. Projects & Production (Launches & Sprints)
    const existingProjects = db.query('SELECT count(*) as count FROM projects');
    if (existingProjects[0]?.count === 0) {
        const projects = [
            ['proj-01', 'Winter 2026 Heavyweight Hoodie & Coat Drop', 'Agile', 88, 'In Progress', 45000, '2026-11-28'],
            ['proj-02', 'Smart Warehouse Barcode & RFID Auto-Packing', 'Waterfall', 92, 'In Progress', 28000, '2026-12-05'],
            ['proj-03', 'Interactive Virtual 3D Sneaker Fitting Room', 'Agile', 76, 'In Progress', 35000, '2026-12-20']
        ];
        for (const p of projects) {
            db.run('INSERT INTO projects (id, name, type, progress_percent, status, budget, deadline) VALUES (?, ?, ?, ?, ?, ?, ?)', p);
        }

        const tasks = [
            ['task-101', 'proj-01', 'Complete studio photoshoot for Pastel Lilac & Butter Hoodies', 'done', 'High', 'Ananya Deshmukh', 5, '2026-11-14', 'None'],
            ['task-102', 'proj-01', 'Review Soho Fashion House 15% bulk discount request (HITL Sign-off)', 'done', 'Critical', 'Prerna Chotwani', 8, '2026-11-16', 'None'],
            ['task-103', 'proj-01', 'Automate low-stock alerts for Puffy Runner Sneakers (Size 9-11)', 'done', 'High', 'Vikram Malhotra', 5, '2026-11-15', 'None'],
            ['task-104', 'proj-01', 'Launch VIP email sequence with 24-hour early access code', 'in_progress', 'Medium', 'Nisha Sen', 3, '2026-11-18', 'None'],
            ['task-105', 'proj-02', 'Calibrate RFID barcode scanners at Bhiwandi Central Hub', 'done', 'Critical', 'Samir Kulkarni', 5, '2026-11-14', 'None'],
            ['task-106', 'proj-03', 'Train Conversational Data Scientist agent on best-selling apparel categories', 'review', 'High', 'Prerna Chotwani', 8, '2026-11-19', 'None']
        ];
        for (const t of tasks) {
            db.run('INSERT INTO tasks (id, project_id, title, status, priority, assignee, story_points, due_date, blocker_risk) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', t);
        }
    }

    // 9. Store & Warehouse Devices (ITSM & POS Scanners)
    const existingAssets = db.query('SELECT count(*) as count FROM it_assets');
    if (existingAssets[0]?.count === 0) {
        const assets = [
            ['ast-01', 'pos-ipad-bandra-flagship', 'bandra.store@aegiswear.internal', 'iPadOS 18.1', 'Healthy', '2.4.1', '2026-11-16 11:30:00', 100],
            ['ast-02', 'pos-ipad-soho-register', 'soho.store@aegiswear.internal', 'iPadOS 18.1', 'Healthy', '2.4.1', '2026-11-16 11:28:00', 100],
            ['ast-03', 'rfid-scanner-bhiwandi-hub', 'warehouse.lead@aegiswear.internal', 'Android 14 Enterprise', 'Healthy', '2.4.1', '2026-11-16 11:15:00', 98],
            ['ast-04', 'macbook-studio-ananya', 'ananya.d@aegiswear.internal', 'macOS 15.1 Sequoia', 'Warning', '2.3.9', '2026-11-16 09:40:00', 85]
        ];
        for (const a of assets) {
            db.run('INSERT INTO it_assets (id, hostname, user_email, os, health_status, agent_version, last_seen, security_compliance) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', a);
        }

        const incidents = [
            ['inc-01', 'ast-04', 'Disk usage threshold 92% on Designer Studio MacBook (Raw 4K Lookbook files)', 'High', 'Open', 'Autonomous IT Helpdesk Agent', 'Raw photoshoot cache filling disk. Remediation script ready to archive 85GB to cloud cold storage.']
        ];
        for (const inc of incidents) {
            db.run('INSERT INTO it_incidents (id, asset_id, title, urgency, status, assigned_to, diagnostic_output) VALUES (?, ?, ?, ?, ?, ?, ?)', inc);
        }
    }

    // 10. E-Commerce Workflows (n8n / iPaaS Automation)
    const existingWorkflows = db.query('SELECT count(*) as count FROM workflows');
    if (existingWorkflows[0]?.count === 0) {
        const workflows = [
            ['wf-01', 'Autonomous Order-to-Fulfillment & Invoice Dispatch', 'order.paid', JSON.stringify([
                { step: 1, action: 'Reserve Stock in Warehouse Inventory (ERPNext/Inventory)' },
                { step: 2, action: 'Generate GST/Tax Invoice & Customer Packing Slip' },
                { step: 3, action: 'Auto-book Courier Pickup with BlueDart / DHL Express' },
                { step: 4, action: 'Send WhatsApp Tracking Link to Customer' }
            ]), 1, '2026-11-16 08:30:00', 142],
            ['wf-02', 'Low Stock Auto-Replenishment Trigger', 'inventory.stock_below_reorder', JSON.stringify([
                { step: 1, action: 'Calculate Forecasted Depletion Rate for next 14 days' },
                { step: 2, action: 'Generate Supplier Purchase Order for 200 Units' },
                { step: 3, action: 'Send WhatsApp PO Confirmation to Stitching Unit' }
            ]), 1, '2026-11-15 19:12:00', 36]
        ];
        for (const wf of workflows) {
            db.run('INSERT INTO workflows (id, name, trigger_event, steps_json, is_active, last_run_at, execution_count) VALUES (?, ?, ?, ?, ?, ?, ?)', wf);
        }
    }

    // 11. Initial HITL Queue & Audit Ledger Records (Human-in-the-Loop)
    const existingHitl = db.query('SELECT count(*) as count FROM hitl_queue');
    if (existingHitl[0]?.count === 0) {
        const hitlItems = [
            ['hitl-01', 'agent-deal-desk', 'Deal Desk & CPQ Agent', 'Approve 15% Bulk Wholesale Discount for Soho Fashion House', 'Client Soho Fashion House requested a 15% discount on 500 Puffy Runner sneakers ($65,000 order). Standard autonomous limit is 10%. Projected margin: 36.2% (Threshold: 35%). Requires Boss Sign-off.', JSON.stringify({
                quoteId: 'quote-802',
                client: 'Soho Fashion House (London / NYC)',
                orderValue: 65000,
                discountPercent: 15.0,
                marginPercent: 36.2,
                items: '500 Puffy Runner Sneakers (Size 8-11)',
                impact: 'Total Revenue: $65,000, Net Gross Profit: $23,530'
            }), 3, 'pending', '2026-11-16 11:20:00', null, null],
            ['hitl-02', 'agent-tier1-2-resolution', 'Tier 1 & 2 Support Agent', 'Authorize High-Value $240 Refund for Rain-Damaged Silk Trench Coat', 'Customer Ananya Roy requested $240 refund for damaged package. Autonomous refund ceiling is $50. Courier fault photo verified. Requires Store Manager Sign-off.', JSON.stringify({
                ticketId: 'tick-303',
                customer: 'Ananya Roy',
                amount: 240.00,
                reason: 'Water damaged outer packaging during transit',
                action: 'Process immediate refund to original credit card'
            }), 3, 'pending', '2026-11-16 11:25:00', null, null]
        ];
        for (const h of hitlItems) {
            db.run('INSERT INTO hitl_queue (id, agent_id, agent_name, action_type, description, payload_json, risk_level, status, requested_at, reviewed_by, reviewed_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', h);
        }
    }

    const existingAudit = db.query('SELECT count(*) as count FROM agent_audit_ledger');
    if (existingAudit[0]?.count === 0) {
        const auditRecords = [
            ['aud-001', '2026-11-16 10:45:12', 'agent-lead-enrichment', 'Lead Enrichment & Scoring Agent', 'usr_admin', 'lead.created', 1, 'h8a2f91', 'Scraped boutique retail footprint for Aria Montgomery (Nordic Streetwear). Found 8 active store locations in Copenhagen & Oslo.', 'mcp::enrich_lead, mcp::compute_icp_score', JSON.stringify({ score: { before: 0, after: 94 }, status: { before: 'New', after: 'Qualified' } }), 0.0014, 'Autonomous'],
            ['aud-002', '2026-11-16 11:10:04', 'agent-receipt-ocr', 'Receipt OCR & Policy Audit Agent', 'usr_admin', 'expense.submitted', 2, 'k93b71c', 'Analyzed receipt exp-402 for Devendra Patil (€4,800 Milan Fashion Week booth). Detected expense exceeds €3,000 policy threshold.', 'mcp::ocr_receipt, mcp::audit_policy', JSON.stringify({ status: { before: 'pending_audit', after: 'flagged_policy' } }), 0.0021, 'Autonomous'],
            ['aud-003', '2026-11-16 11:20:30', 'agent-deal-desk', 'Deal Desk & CPQ Agent', 'usr_admin', 'quote.create_request', 3, 'p01e45a', 'Calculated 15% discount request on 500 Puffy Runner sneakers for Soho Fashion House. Exceeded 10% threshold. Pushed to Boss HITL approval queue.', 'mcp::calculate_cpq_margin, mcp::queue_hitl_approval', JSON.stringify({ status: { before: 'draft', after: 'pending_hitl' } }), 0.0035, 'Pending_HITL']
        ];
        for (const aud of auditRecords) {
            db.run('INSERT INTO agent_audit_ledger (id, timestamp, agent_id, agent_name, on_behalf_of_user_id, trigger_event, risk_level, prompt_hash, reasoning_trace, mcp_tools_called, before_after_diff, token_cost, approval_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', aud);
        }
    }

    // 12. Agent Memory Seeds (Working, Episodic, Semantic)
    const existingMemory = db.query('SELECT count(*) as count FROM agent_memory');
    if (existingMemory[0]?.count === 0) {
        const memories = [
            ['mem-01', 'working', 'session_current_active_view', 'User is managing the Summer Drop 2026 fashion inventory and reviewing wholesale CPQ approval workflows.', JSON.stringify({ activeModule: 'overview', brand: 'AegisWear Fashion' })],
            ['mem-02', 'episodic', 'soho_fashion_house_negotiation_history', 'Soho Fashion House previously placed $35k trial order; now requesting 15% discount on 500 Puffy Runner Sneakers for upcoming London Fashion Week.', JSON.stringify({ outcome: 'HITL Pending', approvedPreviously: true })],
            ['mem-03', 'semantic', 'wholesale_discount_and_refund_policy_v2', 'Store policy: Maximum autonomous wholesale discount is 10%. Any discount above 10% requires VP / Boss approval. Automated customer refunds are capped at $50; refunds above $50 require photo proof and store manager sign-off.', JSON.stringify({ category: 'E-Commerce SOP', complianceTag: 'SOC2-FIN-01' })],
            ['mem-04', 'semantic', 'garment_size_exchange_sop_matrix', 'Size exchange policy: Customers are eligible for free 1-click exchanges within 14 days of delivery if the item is unworn with original tags attached. Courier pickup is auto-dispatched.', JSON.stringify({ category: 'Customer Support SOP', complianceTag: 'CSAT-RET-04' })]
        ];
        for (const m of memories) {
            db.run('INSERT INTO agent_memory (id, tier, key, content, metadata_json) VALUES (?, ?, ?, ?, ?)', m);
        }
    }

    console.log('[Seed] AegisWear E-Commerce Enterprise Database successfully populated across all 9 modules and 26 agents!');
}

seedDatabase();

module.exports = { seedDatabase };
