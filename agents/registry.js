// ============================================================================
// AegisOS: Autonomous AI Agents Registry
// Defines all 26 Enterprise AI Agents matching the Zoho One RFP Matrix
// ============================================================================

const AGENT_REGISTRY = [
    // ------------------------------------------------------------------------
    // Module Group A: Sales, CRM & Revenue Operations
    // ------------------------------------------------------------------------
    {
        id: 'agent-lead-enrichment',
        name: 'Lead Enrichment & Scoring Agent',
        module: 'Sales & CRM',
        group: 'A',
        replacesZoho: 'Zoho CRM / Zia Enrichment',
        openSourceCore: 'Twenty CRM / EspoCRM',
        riskLevel: 1, // Autonomous
        description: 'Continuously scrapes firmographics, revenue indicators, and tech stack signals to compute Ideal Customer Profile (ICP) fit scores (0-100).',
        tools: ['mcp::enrich_firmographics', 'mcp::calculate_icp_score', 'mcp::tag_buying_intent'],
        model: 'gemini-2.0-flash / llama-3.3-70b',
        systemPrompt: 'You are an autonomous B2B revenue intelligence agent. Given a company domain or lead name, extract employee size, annual revenue, tech stack, and assign a 0-100 ICP score.'
    },
    {
        id: 'agent-sdr',
        name: 'Autonomous SDR Agent',
        module: 'Sales & CRM',
        group: 'A',
        replacesZoho: 'Zoho Bigin / Cadence',
        openSourceCore: 'Twenty CRM / Cal.com',
        riskLevel: 2, // Autonomous with 1-click Undo
        description: 'Drafts hyper-personalized cold outreach emails and multi-channel touchpoints based on firmographic triggers, and books calendar meetings.',
        tools: ['mcp::draft_outreach_email', 'mcp::check_calendar_availability', 'mcp::schedule_cal_com_slot'],
        model: 'gemini-2.0-flash / claude-3-5-sonnet',
        systemPrompt: 'You are a top-performing enterprise SDR. Generate concise, value-focused outreach emails that address specific pain points.'
    },
    {
        id: 'agent-deal-desk',
        name: 'Deal Desk & CPQ Agent',
        module: 'Sales & CRM',
        group: 'A',
        replacesZoho: 'Zoho CPQ / Zoho Sign',
        openSourceCore: 'ERPNext CRM / Documenso',
        riskLevel: 3, // Mandatory HITL Approval
        description: 'Configures multi-tier pricing, validates gross margins, enforces discount matrices, and generates tamper-proof Documenso digital envelopes.',
        tools: ['mcp::calculate_cpq_margin', 'mcp::validate_discount_policy', 'mcp::create_documenso_envelope', 'mcp::queue_hitl_approval'],
        model: 'claude-3-5-sonnet / gpt-4o',
        systemPrompt: 'You are an enterprise Deal Desk controller. Any quote exceeding 10% discount or reducing gross margin below 35% MUST be halted and routed for executive HITL sign-off.'
    },
    {
        id: 'agent-pipeline-forecast',
        name: 'Pipeline Forecast Agent',
        module: 'Sales & CRM',
        group: 'A',
        replacesZoho: 'Zoho RouteIQ / SalesIQ Forecast',
        openSourceCore: 'Twenty CRM',
        riskLevel: 1, // Autonomous
        description: 'Runs Monte Carlo pipeline simulations, models deal velocity, and flags deals at risk of slipping past current quarter close dates.',
        tools: ['mcp::run_monte_carlo_forecast', 'mcp::detect_deal_slippage', 'mcp::generate_pipeline_waterfall'],
        model: 'gemini-2.0-flash / llama-3.3-70b',
        systemPrompt: 'You are an algorithmic revenue forecaster. Analyze stage dwell times, engagement frequency, and output calibrated closing probabilities.'
    },

    // ------------------------------------------------------------------------
    // Module Group B: Marketing & Customer Experience
    // ------------------------------------------------------------------------
    {
        id: 'agent-campaign-orchestrator',
        name: 'Campaign Orchestrator Agent',
        module: 'Marketing & CX',
        group: 'B',
        replacesZoho: 'Zoho Campaigns / Marketing Plus',
        openSourceCore: 'Mautic',
        riskLevel: 2, // Autonomous with Undo
        description: 'Transforms a single product marketing brief into multi-channel email drips, SMS sequences, landing page copies, and audience segments.',
        tools: ['mcp::generate_email_sequence', 'mcp::segment_audience', 'mcp::create_ab_test_variants'],
        model: 'gemini-2.0-flash / claude-3-5-sonnet',
        systemPrompt: 'You are an omnichannel growth marketing director. Deconstruct campaign briefs into high-converting copy and segmented trigger workflows.'
    },
    {
        id: 'agent-cro-analyst',
        name: 'CRO Analyst Agent',
        module: 'Marketing & CX',
        group: 'B',
        replacesZoho: 'Zoho PageSense',
        openSourceCore: 'PostHog / Plausible',
        riskLevel: 1, // Autonomous
        description: 'Analyzes click/scroll heatmaps, conversion funnels, and bounce patterns to prescribe actionable UX adjustments.',
        tools: ['mcp::analyze_conversion_funnel', 'mcp::detect_rage_clicks', 'mcp::propose_cro_hypotheses'],
        model: 'gemini-2.0-flash',
        systemPrompt: 'You are a conversion rate optimization specialist. Find the drop-off bottlenecks in user journeys and provide data-backed UI fixes.'
    },
    {
        id: 'agent-social-listening',
        name: 'Social Listening & Response Agent',
        module: 'Marketing & CX',
        group: 'B',
        replacesZoho: 'Zoho Social',
        openSourceCore: 'Custom Stream / N8N',
        riskLevel: 2, // Autonomous with Undo
        description: 'Monitors brand mentions across LinkedIn, X, and YouTube, flags negative sentiment spikes, and drafts on-brand social responses.',
        tools: ['mcp::analyze_social_sentiment', 'mcp::draft_social_reply', 'mcp::alert_brand_crisis'],
        model: 'gemini-2.0-flash',
        systemPrompt: 'You are a brand reputation sentinel. Monitor mention streams, evaluate public sentiment, and craft constructive, empathetic replies.'
    },

    // ------------------------------------------------------------------------
    // Module Group C: Customer Service & Support
    // ------------------------------------------------------------------------
    {
        id: 'agent-tier1-2-resolution',
        name: 'Tier-1 & Tier-2 Resolution Agent',
        module: 'Support & Service',
        group: 'C',
        replacesZoho: 'Zoho Desk / SalesIQ Bot',
        openSourceCore: 'Chatwoot / Zammad',
        riskLevel: 2, // Level 2 normally, escalates to Level 3 if refund > $50
        description: 'Queries enterprise semantic RAG knowledge base to resolve customer tickets autonomously and execute safe account actions.',
        tools: ['mcp::search_kb_rag', 'mcp::trigger_password_reset', 'mcp::issue_account_credit', 'mcp::escalate_to_human'],
        model: 'gemini-2.0-flash / claude-3-5-sonnet',
        systemPrompt: 'You are a senior support engineer. Resolve technical customer questions accurately using enterprise knowledge base articles.'
    },
    {
        id: 'agent-sentiment-churn',
        name: 'Sentiment & Churn Escalation Agent',
        module: 'Support & Service',
        group: 'C',
        replacesZoho: 'Zoho Desk Sentiment / Zia',
        openSourceCore: 'Chatwoot',
        riskLevel: 2, // Autonomous with Undo
        description: 'Detects customer frustration and SLA degradation in real time, alerting Account Executives and escalating ticket priority.',
        tools: ['mcp::evaluate_ticket_sentiment', 'mcp::calculate_churn_risk', 'mcp::page_oncall_csm'],
        model: 'gemini-2.0-flash',
        systemPrompt: 'Detect subtle cues of frustration or intent to cancel. Alert customer success teams before account churn occurs.'
    },
    {
        id: 'agent-auto-kb',
        name: 'Auto-KB Authoring Agent',
        module: 'Support & Service',
        group: 'C',
        replacesZoho: 'Zoho Desk Knowledge Base',
        openSourceCore: 'Chatwoot / Documenso KB',
        riskLevel: 2, // Autonomous with Undo
        description: 'Automatically synthesizes complex resolved support tickets into public and internal troubleshooting help articles.',
        tools: ['mcp::synthesize_ticket_resolution', 'mcp::format_kb_markdown', 'mcp::publish_kb_article'],
        model: 'gemini-2.0-flash',
        systemPrompt: 'Transform raw engineer-customer dialogue into clean, search-optimized knowledge base documentation.'
    },

    // ------------------------------------------------------------------------
    // Module Group D: Finance, ERP & Supply Chain
    // ------------------------------------------------------------------------
    {
        id: 'agent-bookkeeper',
        name: 'Autonomous Bookkeeper & Reconciliation Agent',
        module: 'Finance & ERP',
        group: 'D',
        replacesZoho: 'Zoho Books / Banking',
        openSourceCore: 'ERPNext / Odoo Community',
        riskLevel: 2, // Autonomous with Undo
        description: 'Ingests bank feeds, categorizes general ledger entries, applies statutory tax rules (GST/VAT), and executes automated reconciliation.',
        tools: ['mcp::fetch_bank_transactions', 'mcp::match_ledger_entry', 'mcp::reconcile_discrepancy'],
        model: 'gemini-2.0-flash / claude-3-5-sonnet',
        systemPrompt: 'You are a chartered accountant. Match bank credits/debits against open invoices and journal entries with zero reconciliation drift.'
    },
    {
        id: 'agent-receipt-ocr',
        name: 'Receipt OCR & Policy Audit Agent',
        module: 'Finance & ERP',
        group: 'D',
        replacesZoho: 'Zoho Expense',
        openSourceCore: 'ERPNext Expense / Lago',
        riskLevel: 2, // Level 2 with undo; Level 3 if flag requires dispute
        description: 'Extracts line items, merchant tax IDs, and totals from uploaded receipt photos, flagging policy violations and duplicate submissions.',
        tools: ['mcp::ocr_receipt_image', 'mcp::audit_expense_policy', 'mcp::flag_duplicate_expense'],
        model: 'gemini-2.0-flash',
        systemPrompt: 'Inspect expense receipts with forensic accuracy. Flag missing merchant IDs, alcohol line items, or amounts exceeding per-diem limits.'
    },
    {
        id: 'agent-inventory-forecast',
        name: 'Inventory Demand Forecasting Agent',
        module: 'Finance & ERP',
        group: 'D',
        replacesZoho: 'Zoho Inventory',
        openSourceCore: 'ERPNext Inventory',
        riskLevel: 1, // Autonomous
        description: 'Calculates dynamic reorder points, factoring in seasonal demand velocity and supplier lead-time variance to prevent stockouts.',
        tools: ['mcp::forecast_sku_depletion', 'mcp::compute_safety_stock', 'mcp::generate_purchase_order_draft'],
        model: 'gemini-2.0-flash',
        systemPrompt: 'Calculate optimal reorder quantities across warehouses to balance working capital efficiency against stockout risk.'
    },

    // ------------------------------------------------------------------------
    // Module Group E: Human Resources & Workplace Culture
    // ------------------------------------------------------------------------
    {
        id: 'agent-ai-recruiter',
        name: 'AI Recruiter & Resume Screening Agent',
        module: 'HR & Workplace',
        group: 'E',
        replacesZoho: 'Zoho Recruit',
        openSourceCore: 'Frappe HR / OrangeHRM',
        riskLevel: 1, // Autonomous
        description: 'Parses candidate resumes, benchmarks qualifications against job description rubrics, and ranks candidate fit scores.',
        tools: ['mcp::parse_resume_pdf', 'mcp::score_candidate_rubric', 'mcp::draft_screening_questions'],
        model: 'gemini-2.0-flash / claude-3-5-sonnet',
        systemPrompt: 'Evaluate candidates objectively based on technical competencies, verifiable project outcomes, and role criteria.'
    },
    {
        id: 'agent-hr-concierge',
        name: 'HR Policy Concierge Agent',
        module: 'HR & Workplace',
        group: 'E',
        replacesZoho: 'Zoho People',
        openSourceCore: 'Frappe HR',
        riskLevel: 2, // Autonomous with Undo
        description: 'Answers employee questions on health insurance, maternity/paternity leave, and company SOPs, and automatically books PTO.',
        tools: ['mcp::query_hr_policy_rag', 'mcp::check_pto_balance', 'mcp::submit_leave_request'],
        model: 'gemini-2.0-flash',
        systemPrompt: 'You are an empathetic, precise HR policy concierge. Answer employee queries clearly and execute PTO bookings accurately.'
    },
    {
        id: 'agent-onboarding-provisioning',
        name: 'Onboarding Provisioning Agent',
        module: 'HR & Workplace',
        group: 'E',
        replacesZoho: 'Zoho People Onboarding',
        openSourceCore: 'Keycloak / FleetDM',
        riskLevel: 3, // Mandatory HITL Approval
        description: 'Orchestrates new-hire provisioning: generates Keycloak accounts, assigns RBAC roles, orders laptops, and issues temporary credentials.',
        tools: ['mcp::provision_sso_identity', 'mcp::assign_rbac_groups', 'mcp::order_hardware_asset', 'mcp::queue_hitl_approval'],
        model: 'claude-3-5-sonnet',
        systemPrompt: 'Provision corporate identities securely according to zero-trust principles. Require HR director sign-off before credential issuance.'
    },

    // ------------------------------------------------------------------------
    // Module Group F: Collaboration & Productivity Suite
    // ------------------------------------------------------------------------
    {
        id: 'agent-meeting-scribe',
        name: 'Meeting Scribe & Action Agent',
        module: 'Collaboration',
        group: 'F',
        replacesZoho: 'Zoho Meeting / Cliq',
        openSourceCore: 'LiveKit / Mattermost',
        riskLevel: 2, // Autonomous with Undo
        description: 'Ingests real-time meeting audio transcripts, summarizes executive decisions, and automatically creates assigned tasks in Projects.',
        tools: ['mcp::summarize_transcript', 'mcp::extract_action_items', 'mcp::create_project_tasks'],
        model: 'gemini-2.0-flash / claude-3-5-sonnet',
        systemPrompt: 'Extract key decisions, commitments, owners, and due dates from transcripts without losing nuanced context.'
    },
    {
        id: 'agent-inbox-triage',
        name: 'Inbox Triage & Draft Agent',
        module: 'Collaboration',
        group: 'F',
        replacesZoho: 'Zoho Mail / Streams',
        openSourceCore: 'Stalwart / Mailcow',
        riskLevel: 2, // Autonomous with Undo
        description: 'Categorizes incoming emails, marks high-priority enterprise communications, and prepares contextual draft replies ready for review.',
        tools: ['mcp::classify_email_priority', 'mcp::draft_reply_response', 'mcp::tag_email_category'],
        model: 'gemini-2.0-flash',
        systemPrompt: 'Filter email clutter. Draft thoughtful, concise, professional responses to high-priority business emails.'
    },
    {
        id: 'agent-document-synthesis',
        name: 'Document Synthesis Agent',
        module: 'Collaboration',
        group: 'F',
        replacesZoho: 'Zoho Writer / WorkDrive',
        openSourceCore: 'Nextcloud + Collabora',
        riskLevel: 1, // Autonomous
        description: 'Synthesizes enterprise whitepapers, complex technical specs, and financial spreadsheets into executive decision briefs.',
        tools: ['mcp::summarize_long_document', 'mcp::extract_contract_clauses', 'mcp::generate_briefing_memo'],
        model: 'gemini-2.0-flash',
        systemPrompt: 'Provide high-density synthesis of complex documents highlighting risks, obligations, and strategic implications.'
    },

    // ------------------------------------------------------------------------
    // Module Group G: Project Management (Agile & Waterfall)
    // ------------------------------------------------------------------------
    {
        id: 'agent-scrum-master',
        name: 'AI Scrum Master & Sprint Planner Agent',
        module: 'Project Management',
        group: 'G',
        replacesZoho: 'Zoho Projects / Sprints',
        openSourceCore: 'Plane / OpenProject',
        riskLevel: 2, // Autonomous with Undo
        description: 'Deconstructs product requirement documents (PRDs) into user stories with acceptance criteria, estimates story points, and balances sprint loads.',
        tools: ['mcp::decompose_prd_to_stories', 'mcp::estimate_story_points', 'mcp::balance_sprint_workload'],
        model: 'gemini-2.0-flash / claude-3-5-sonnet',
        systemPrompt: 'Break down high-level features into atomic, testable engineering tasks following Agile best practices.'
    },
    {
        id: 'agent-blocker-slippage',
        name: 'Blocker & Slippage Prediction Agent',
        module: 'Project Management',
        group: 'G',
        replacesZoho: 'Zoho BugTracker / Gantt',
        openSourceCore: 'Plane / OpenProject',
        riskLevel: 1, // Autonomous
        description: 'Analyzes task dependency graphs (FS/SS/FF) and Git pull-request activity to calculate critical path delays and sprint slippage risks.',
        tools: ['mcp::calculate_critical_path', 'mcp::detect_pr_bottlenecks', 'mcp::forecast_milestone_slip'],
        model: 'gemini-2.0-flash',
        systemPrompt: 'Identify hidden dependency risks and calculate probability distributions for sprint milestone completion.'
    },
    {
        id: 'agent-standup-digest',
        name: 'Automated Standup & Status Digest Agent',
        module: 'Project Management',
        group: 'G',
        replacesZoho: 'Zoho Sprints Standup',
        openSourceCore: 'Plane',
        riskLevel: 1, // Autonomous
        description: 'Aggregates async updates across Git commits, resolved tasks, and ticket resolutions into daily executive project summaries.',
        tools: ['mcp::gather_async_updates', 'mcp::compile_standup_digest', 'mcp::publish_digest_channel'],
        model: 'gemini-2.0-flash',
        systemPrompt: 'Summarize engineering accomplishments, blockers, and next steps into crisp daily standup digests.'
    },

    // ------------------------------------------------------------------------
    // Module Group H: IT Service Management (ITSM) & Endpoint Security
    // ------------------------------------------------------------------------
    {
        id: 'agent-it-helpdesk',
        name: 'Autonomous IT Helpdesk Agent',
        module: 'ITSM & MDM',
        group: 'H',
        replacesZoho: 'Zoho ServiceDesk Plus / Endpoint Central',
        openSourceCore: 'GLPI / FleetDM',
        riskLevel: 3, // Mandatory HITL Approval for remote script execution
        description: 'Monitors endpoint device telemetry (CPU, disk, memory, patches), diagnoses system faults, and proposes self-healing remediation scripts.',
        tools: ['mcp::query_fleet_telemetry', 'mcp::diagnose_os_incident', 'mcp::generate_remediation_script', 'mcp::queue_hitl_approval'],
        model: 'claude-3-5-sonnet',
        systemPrompt: 'You are an IT infrastructure automation specialist. Propose clean shell remediation commands, requiring human sign-off before execution.'
    },
    {
        id: 'agent-license-optimizer',
        name: 'Software License Optimization Agent',
        module: 'ITSM & MDM',
        group: 'H',
        replacesZoho: 'Zoho ServiceDesk Asset Management',
        openSourceCore: 'GLPI',
        riskLevel: 2, // Autonomous with Undo
        description: 'Tracks SaaS seat utilization, detects dormant software licenses (>30 days inactive), and recommends de-provisioning to cut costs.',
        tools: ['mcp::audit_saas_usage', 'mcp::flag_dormant_seats', 'mcp::calculate_cost_savings'],
        model: 'gemini-2.0-flash',
        systemPrompt: 'Identify software seat waste and recommend rightsizing strategies that trim IT overhead without impacting productivity.'
    },

    // ------------------------------------------------------------------------
    // Module Group I: Business Intelligence, Low-Code & iPaaS
    // ------------------------------------------------------------------------
    {
        id: 'agent-data-scientist',
        name: 'Conversational Data Scientist Agent',
        module: 'BI & Analytics',
        group: 'I',
        replacesZoho: 'Zoho Analytics / Zia Insights',
        openSourceCore: 'Metabase / Apache Superset',
        riskLevel: 1, // Autonomous
        description: 'Translates natural language questions into optimized SQL queries, executes cross-module analytics, and returns interactive chart specifications.',
        tools: ['mcp::translate_nl_to_sql', 'mcp::execute_analytical_query', 'mcp::generate_chart_spec'],
        model: 'gemini-2.0-flash / claude-3-5-sonnet',
        systemPrompt: 'Convert natural language inquiries into clean SQL queries across leads, invoices, tickets, and tasks. Return data with interactive visualization configs.'
    },
    {
        id: 'agent-workflow-builder',
        name: 'Workflow Builder Agent (iPaaS)',
        module: 'BI & Analytics',
        group: 'I',
        replacesZoho: 'Zoho Flow / Zoho Creator',
        openSourceCore: 'n8n / Activepieces',
        riskLevel: 2, // Autonomous with Undo
        description: 'Generates multi-step event-driven automation pipelines and webhook connectors from plain-language user prompts.',
        tools: ['mcp::generate_n8n_flow', 'mcp::validate_workflow_schema', 'mcp::deploy_workflow'],
        model: 'gemini-2.0-flash / claude-3-5-sonnet',
        systemPrompt: 'Translate integration requests into structured multi-step webhook workflows with proper error handling and retry logic.'
    }
];

module.exports = {
    AGENT_REGISTRY,
    getAgentById: (id) => AGENT_REGISTRY.find(a => a.id === id),
    getAgentsByModule: (mod) => AGENT_REGISTRY.filter(a => a.module === mod),
    getAgentsByGroup: (grp) => AGENT_REGISTRY.filter(a => a.group === grp),
    getAllAgents: () => AGENT_REGISTRY
};
