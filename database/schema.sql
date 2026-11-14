-- ============================================================================
-- AegisOS: AI-Native Agentic Enterprise Operating System
-- Unified Relational & Vector Schema (PostgreSQL & SQLite Compatible)
-- Replicates Zoho Enterprise (Zoho One) Architecture
-- ============================================================================

-- 1. Sales & CRM (Module Group A)
CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    status TEXT DEFAULT 'New', -- New, Contacted, Qualified, Nurturing, Disqualified
    score INTEGER DEFAULT 0,
    intent TEXT DEFAULT 'Medium',
    firmographics TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS accounts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    industry TEXT,
    annual_revenue REAL DEFAULT 0,
    location TEXT,
    health_score INTEGER DEFAULT 85,
    website TEXT
);

CREATE TABLE IF NOT EXISTS deals (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    account_id TEXT,
    account_name TEXT,
    amount REAL DEFAULT 0,
    stage TEXT DEFAULT 'prospect', -- prospect, qualification, proposal, negotiation, closed_won, closed_lost
    probability INTEGER DEFAULT 20,
    expected_close DATE,
    cpq_quote_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quotes (
    id TEXT PRIMARY KEY,
    deal_id TEXT,
    client_name TEXT NOT NULL,
    items_json TEXT NOT NULL,
    total_amount REAL DEFAULT 0,
    discount_percent REAL DEFAULT 0,
    margin_percent REAL DEFAULT 40,
    status TEXT DEFAULT 'draft', -- draft, pending_hitl, approved, sent, signed
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Marketing & Customer Experience (Module Group B)
CREATE TABLE IF NOT EXISTS campaigns (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT DEFAULT 'Omnichannel', -- Email, SMS, Social, Omnichannel
    status TEXT DEFAULT 'Active', -- Draft, Active, Completed, Paused
    audience_size INTEGER DEFAULT 0,
    open_rate REAL DEFAULT 0,
    click_rate REAL DEFAULT 0,
    budget REAL DEFAULT 0,
    generated_brief TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS social_posts (
    id TEXT PRIMARY KEY,
    platform TEXT NOT NULL, -- LinkedIn, X, Instagram, YouTube
    content TEXT NOT NULL,
    scheduled_time DATETIME,
    status TEXT DEFAULT 'Published',
    sentiment_score REAL DEFAULT 0.8,
    engagement_count INTEGER DEFAULT 0
);

-- 3. Customer Service & Support (Module Group C)
CREATE TABLE IF NOT EXISTS tickets (
    id TEXT PRIMARY KEY,
    subject TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    priority TEXT DEFAULT 'Medium', -- Low, Medium, High, Urgent
    status TEXT DEFAULT 'open', -- open, pending_user, resolved, escalated
    department TEXT DEFAULT 'Support',
    sla_due_at DATETIME,
    sentiment TEXT DEFAULT 'Neutral', -- Positive, Neutral, Frustrated, At-Risk
    resolution_notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS kb_articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    content TEXT NOT NULL,
    views INTEGER DEFAULT 0,
    helpful_count INTEGER DEFAULT 0,
    source_ticket_id TEXT,
    status TEXT DEFAULT 'published'
);

-- 4. Finance, ERP & Supply Chain (Module Group D)
CREATE TABLE IF NOT EXISTS invoices (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    amount REAL DEFAULT 0,
    tax_amount REAL DEFAULT 0,
    due_date DATE,
    status TEXT DEFAULT 'unpaid', -- draft, unpaid, paid, overdue, pending_approval
    items_json TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inventory (
    id TEXT PRIMARY KEY,
    sku TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT,
    warehouse TEXT DEFAULT 'Bhiwandi CFA Hub',
    stock_on_hand INTEGER DEFAULT 0,
    reorder_point INTEGER DEFAULT 50,
    unit_price REAL DEFAULT 0,
    status TEXT DEFAULT 'Optimal' -- Optimal, Low Stock, Critical
);

CREATE TABLE IF NOT EXISTS expenses (
    id TEXT PRIMARY KEY,
    employee_name TEXT NOT NULL,
    category TEXT NOT NULL,
    amount REAL DEFAULT 0,
    currency TEXT DEFAULT 'USD',
    receipt_url TEXT,
    status TEXT DEFAULT 'approved', -- pending_audit, approved, flagged_policy, rejected
    flag_reason TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. Human Resources & Workplace Culture (Module Group E)
CREATE TABLE IF NOT EXISTS employees (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    join_date DATE,
    status TEXT DEFAULT 'Active',
    manager_id TEXT,
    pto_balance INTEGER DEFAULT 18
);

CREATE TABLE IF NOT EXISTS candidates (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    applied_role TEXT NOT NULL,
    email TEXT NOT NULL,
    match_score INTEGER DEFAULT 80,
    status TEXT DEFAULT 'Screened', -- Screened, Interview, Offer Pending, Hired, Rejected
    resume_summary TEXT
);

-- 6. Collaboration & Productivity Suite (Module Group F)
CREATE TABLE IF NOT EXISTS emails (
    id TEXT PRIMARY KEY,
    sender TEXT NOT NULL,
    recipient TEXT NOT NULL,
    subject TEXT NOT NULL,
    preview TEXT,
    body TEXT,
    category TEXT DEFAULT 'primary', -- primary, updates, action_needed
    is_read INTEGER DEFAULT 0,
    ai_draft_reply TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chat_messages (
    id TEXT PRIMARY KEY,
    channel TEXT NOT NULL, -- #general, #leads, #dev, #executive
    sender TEXT NOT NULL,
    text TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_bot INTEGER DEFAULT 0
);

-- 7. Project Management (Module Group G)
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT DEFAULT 'Agile', -- Agile, Waterfall
    progress_percent INTEGER DEFAULT 0,
    status TEXT DEFAULT 'In Progress',
    budget REAL DEFAULT 0,
    deadline DATE
);

CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    project_id TEXT,
    title TEXT NOT NULL,
    status TEXT DEFAULT 'todo', -- todo, in_progress, review, done
    priority TEXT DEFAULT 'Medium', -- Low, Medium, High, Critical
    assignee TEXT,
    story_points INTEGER DEFAULT 3,
    due_date DATE,
    blocker_risk TEXT DEFAULT 'None' -- None, Low, Elevated, Critical
);

-- 8. IT Service Management & MDM (Module Group H)
CREATE TABLE IF NOT EXISTS it_assets (
    id TEXT PRIMARY KEY,
    hostname TEXT NOT NULL,
    user_email TEXT,
    os TEXT NOT NULL,
    health_status TEXT DEFAULT 'Healthy', -- Healthy, Warning, Critical
    agent_version TEXT DEFAULT '2.4.1',
    last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
    security_compliance INTEGER DEFAULT 100
);

CREATE TABLE IF NOT EXISTS it_incidents (
    id TEXT PRIMARY KEY,
    asset_id TEXT,
    title TEXT NOT NULL,
    urgency TEXT DEFAULT 'Medium',
    status TEXT DEFAULT 'Open', -- Open, In Analysis, Resolved
    assigned_to TEXT,
    diagnostic_output TEXT
);

-- 9. Business Intelligence, Low-Code & iPaaS (Module Group I)
CREATE TABLE IF NOT EXISTS workflows (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    trigger_event TEXT NOT NULL,
    steps_json TEXT NOT NULL,
    is_active INTEGER DEFAULT 1,
    last_run_at DATETIME,
    execution_count INTEGER DEFAULT 0
);

-- 10. Agentic Orchestration, Memory, Audit & HITL Infrastructure
CREATE TABLE IF NOT EXISTS agent_audit_ledger (
    id TEXT PRIMARY KEY,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    agent_id TEXT NOT NULL,
    agent_name TEXT NOT NULL,
    on_behalf_of_user_id TEXT DEFAULT 'usr_admin',
    trigger_event TEXT NOT NULL,
    risk_level INTEGER DEFAULT 1, -- 1: Read/Analyze, 2: Internal Mutation (Undoable), 3: Mandatory HITL
    prompt_hash TEXT,
    reasoning_trace TEXT,
    mcp_tools_called TEXT,
    before_after_diff TEXT,
    token_cost REAL DEFAULT 0.0012,
    approval_status TEXT DEFAULT 'Approved' -- Autonomous, Pending_HITL, Approved, Rejected, Undone
);

CREATE TABLE IF NOT EXISTS hitl_queue (
    id TEXT PRIMARY KEY,
    agent_id TEXT NOT NULL,
    agent_name TEXT NOT NULL,
    action_type TEXT NOT NULL,
    description TEXT NOT NULL,
    payload_json TEXT NOT NULL,
    risk_level INTEGER DEFAULT 3,
    status TEXT DEFAULT 'pending', -- pending, approved, rejected
    requested_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    reviewed_by TEXT,
    reviewed_at DATETIME
);

CREATE TABLE IF NOT EXISTS agent_memory (
    id TEXT PRIMARY KEY,
    tier TEXT NOT NULL, -- working, episodic, semantic
    key TEXT NOT NULL,
    content TEXT NOT NULL,
    metadata_json TEXT,
    embedding_vector TEXT, -- Mocked / JSON array for vector distance
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
