# 🤖 Master Catalog: 26 Autonomous Enterprise AI Agents

> **Complete Mapping for Replacing Zoho One Products**  
> **AegisOS Enterprise Architecture — Version 3.0**  

---

## Complete 26-Agent Roster

| # | Agent Identifier | Module Group | Zoho Replacement | Risk Tier | Primary MCP Tools | Default Model |
| :-: | :--- | :--- | :--- | :-: | :--- | :--- |
| **1** | `agent-lead-enrichment` | A: Sales & CRM | Zoho CRM / Zia Enrichment | Level 1 | `mcp::enrich_lead`, `mcp::compute_icp_score` | Gemini 2.0 Flash / Llama 3.3 |
| **2** | `agent-sdr` | A: Sales & CRM | Zoho Bigin / Cadence | Level 2 | `mcp::draft_outreach_email`, `mcp::schedule_cal_com` | Claude 3.5 Sonnet / Gemini 2.0 |
| **3** | `agent-deal-desk` | A: Sales & CRM | Zoho CPQ / Zoho Sign | **Level 3 (HITL)** | `mcp::calculate_cpq_margin`, `mcp::create_documenso_envelope` | Claude 3.5 Sonnet / GPT-4o |
| **4** | `agent-pipeline-forecast` | A: Sales & CRM | Zoho RouteIQ / Forecast | Level 1 | `mcp::run_monte_carlo_forecast`, `mcp::detect_deal_slippage` | Gemini 2.0 Flash |
| **5** | `agent-campaign-orchestrator` | B: Marketing & CX | Zoho Campaigns / Marketing Plus | Level 2 | `mcp::generate_email_sequence`, `mcp::segment_audience` | Claude 3.5 Sonnet / Gemini 2.0 |
| **6** | `agent-cro-analyst` | B: Marketing & CX | Zoho PageSense | Level 1 | `mcp::analyze_conversion_funnel`, `mcp::detect_rage_clicks` | Gemini 2.0 Flash |
| **7** | `agent-social-listening` | B: Marketing & CX | Zoho Social | Level 2 | `mcp::analyze_social_sentiment`, `mcp::draft_social_reply` | Gemini 2.0 Flash |
| **8** | `agent-tier1-2-resolution` | C: Support & Service | Zoho Desk / SalesIQ Bot | Level 2 / 3 | `mcp::search_kb_rag`, `mcp::trigger_password_reset` | Claude 3.5 Sonnet / Gemini 2.0 |
| **9** | `agent-sentiment-churn` | C: Support & Service | Zoho Desk Sentiment / Zia | Level 2 | `mcp::evaluate_ticket_sentiment`, `mcp::page_oncall_csm` | Gemini 2.0 Flash |
| **10** | `agent-auto-kb` | C: Support & Service | Zoho Desk Knowledge Base | Level 2 | `mcp::synthesize_ticket_resolution`, `mcp::publish_kb_article` | Gemini 2.0 Flash |
| **11** | `agent-bookkeeper` | D: Finance & ERP | Zoho Books / Banking | Level 2 | `mcp::fetch_bank_transactions`, `mcp::match_ledger_entry` | Claude 3.5 Sonnet / Gemini 2.0 |
| **12** | `agent-receipt-ocr` | D: Finance & ERP | Zoho Expense | Level 2 / 3 | `mcp::ocr_receipt_image`, `mcp::audit_expense_policy` | Gemini 2.0 Flash |
| **13** | `agent-inventory-forecast` | D: Finance & ERP | Zoho Inventory | Level 1 | `mcp::forecast_sku_depletion`, `mcp::compute_safety_stock` | Gemini 2.0 Flash |
| **14** | `agent-ai-recruiter` | E: HR & Workplace | Zoho Recruit | Level 1 | `mcp::parse_resume_pdf`, `mcp::score_candidate_rubric` | Claude 3.5 Sonnet / Gemini 2.0 |
| **15** | `agent-hr-concierge` | E: HR & Workplace | Zoho People | Level 2 | `mcp::query_hr_policy_rag`, `mcp::submit_leave_request` | Gemini 2.0 Flash |
| **16** | `agent-onboarding-provisioning` | E: HR & Workplace | Zoho People Onboarding | **Level 3 (HITL)** | `mcp::provision_sso_identity`, `mcp::order_hardware_asset` | Claude 3.5 Sonnet |
| **17** | `agent-meeting-scribe` | F: Collaboration | Zoho Meeting / Cliq | Level 2 | `mcp::summarize_transcript`, `mcp::create_project_tasks` | Claude 3.5 Sonnet / Gemini 2.0 |
| **18** | `agent-inbox-triage` | F: Collaboration | Zoho Mail / Streams | Level 2 | `mcp::classify_email_priority`, `mcp::draft_reply_response` | Gemini 2.0 Flash |
| **19** | `agent-document-synthesis` | F: Collaboration | Zoho Writer / WorkDrive | Level 1 | `mcp::summarize_long_document`, `mcp::extract_clauses` | Gemini 2.0 Flash |
| **20** | `agent-scrum-master` | G: Project Management | Zoho Projects / Sprints | Level 2 | `mcp::decompose_prd_to_stories`, `mcp::estimate_story_points` | Claude 3.5 Sonnet / Gemini 2.0 |
| **21** | `agent-blocker-slippage` | G: Project Management | Zoho BugTracker / Gantt | Level 1 | `mcp::calculate_critical_path`, `mcp::forecast_milestone_slip` | Gemini 2.0 Flash |
| **22** | `agent-standup-digest` | G: Project Management | Zoho Sprints Standup | Level 1 | `mcp::gather_async_updates`, `mcp::compile_standup_digest` | Gemini 2.0 Flash |
| **23** | `agent-it-helpdesk` | H: ITSM & MDM | ServiceDesk Plus / Endpoint Central | **Level 3 (HITL)** | `mcp::query_fleet_telemetry`, `mcp::execute_endpoint_remediation` | Claude 3.5 Sonnet |
| **24** | `agent-license-optimizer` | H: ITSM & MDM | ServiceDesk Asset Manager | Level 2 | `mcp::audit_saas_usage`, `mcp::flag_dormant_seats` | Gemini 2.0 Flash |
| **25** | `agent-data-scientist` | I: BI & Low-Code | Zoho Analytics / Zia Insights | Level 1 | `mcp::translate_nl_to_sql`, `mcp::generate_chart_spec` | Claude 3.5 Sonnet / Gemini 2.0 |
| **26** | `agent-workflow-builder` | I: BI & Low-Code | Zoho Flow / Creator | Level 2 | `mcp::generate_n8n_flow`, `mcp::deploy_workflow` | Claude 3.5 Sonnet / Gemini 2.0 |

---

## Detailed Agent Profiles & Governance Guardrails

### 1. Deal Desk & CPQ Agent (`agent-deal-desk`)
- **Risk Level**: **Level 3 (Mandatory Human-in-the-Loop)**
- **System Objective**: Validates multi-tier pricing, product bundles, and discount requests against company profit margins.
- **Guardrail Boundary**: Any quote that proposes a discount greater than 10.0% OR reduces gross deal margins below 35.0% automatically pauses execution and pushes an interactive approval card to the authorized VP Sales / CFO.
- **Immutable Log Diff**: Records `quoteStatus: { before: "draft", after: "pending_hitl" }`.

### 2. Autonomous IT Helpdesk Agent (`agent-it-helpdesk`)
- **Risk Level**: **Level 3 (Mandatory Human-in-the-Loop)**
- **System Objective**: Detects OS-level faults, disk space exhaustion, and unpatched vulnerabilities across FleetDM managed devices.
- **Guardrail Boundary**: Synthesizes remediation shell scripts but CANNOT execute shell commands on endpoint hardware without explicit admin sign-off in the Copilot drawer.

### 3. Conversational Data Scientist Agent (`agent-data-scientist`)
- **Risk Level**: **Level 1 (Autonomous)**
- **System Objective**: Translates natural language inquiries into clean, parameterized SQL queries, runs them against the unified relational data fabric, and formats chart visualization objects.
- **Safety**: Read-only queries enforced via SQL parser (disallows `DROP`, `UPDATE`, `DELETE`, `INSERT`).
