# 🛡️ Open-Source Composability & License Hygiene Report

> **Compliance Analysis for WildCatter Ventures**  
> **AegisOS Enterprise Architecture — Version 3.0**  

---

## 1. Intellectual Property & Commercial Independence Mandate

As specified in the RFP Section 1.1 and 3.4, the platform leverages composable open-source foundations while guaranteeing **100% intellectual property ownership** for WildCatter Ventures over all custom code, UI wrappers, agent prompts, orchestration logic, and unified schemas.

To prevent any copyleft contamination (e.g. GPL/AGPL "viral" clauses), AegisOS enforces strict architectural boundaries:
1. **Network-Isolated Microservices**: All AGPL-licensed engines run in independent containerized boundaries communicating solely over standard JSON-RPC 2.0 or REST/gRPC network protocols.
2. **Permissive In-Tree Code**: 100% of the unified app shell, GenUI copilot layer, multi-agent LangGraph orchestrator, database schemas, and MCP tools are author-created and proprietary to WildCatter Ventures.

---

## 2. Composable Engine License Matrix

| Module Group | Core Open-Source Foundation | License Type | Boundary Isolation Strategy | Commercial Risk |
| :--- | :--- | :--- | :--- | :---: |
| **A: Sales & CRM** | Twenty CRM | AGPLv3 | Network API Boundary (Docker microservice) | Safe / Isolated |
| | EspoCRM | GPLv3 | REST API Gateway interface | Safe / Isolated |
| | Documenso | Apache 2.0 | Direct permissive library / API wrapper | Zero Risk |
| | Cal.com | AGPLv3 | Independent scheduling container | Safe / Isolated |
| **B: Marketing & CX** | Mautic | GPLv3 | REST API webhook event consumer | Safe / Isolated |
| | PostHog (Open-Source) | MIT | Direct integration / self-hosted node | Zero Risk |
| | Formbricks | AGPLv3 | External form iframe / Webhook bridge | Safe / Isolated |
| **C: Support & Service** | Chatwoot | MIT / Permissive | Embedded React SDK & Webhook receiver | Zero Risk |
| | Zammad | AGPLv3 | Network isolated service | Safe / Isolated |
| | RustDesk | GPLv3 | Independent signaling & relay container | Safe / Isolated |
| **D: Finance & ERP** | ERPNext (Frappe) | GPLv3 | REST API & MariaDB/PostgreSQL connector | Safe / Isolated |
| | Lago Billing | AGPLv3 | Metered event stream API | Safe / Isolated |
| **E: HR & Workplace** | Frappe HR | GPLv3 | REST API boundary | Safe / Isolated |
| | OrangeHRM | GPLv3 | Network isolated service | Safe / Isolated |
| **F: Collaboration** | Stalwart Mail | Apache 2.0 / MIT | Direct SMTP/IMAP network service | Zero Risk |
| | Mattermost | Apache 2.0 (Core) | Permissive REST / WebSocket client | Zero Risk |
| | LiveKit | Apache 2.0 | WebRTC Media Server | Zero Risk |
| | Vaultwarden | AGPLv3 | Self-contained password sync service | Safe / Isolated |
| **G: Project Management** | Plane | AGPLv3 | REST API & Webhook connector | Safe / Isolated |
| | OpenProject | GPLv3 | Independent Gantt container | Safe / Isolated |
| **H: ITSM & MDM** | GLPI | GPLv3 | REST API data connector | Safe / Isolated |
| | FleetDM | MIT | Direct osquery REST/TLS server | Zero Risk |
| **I: BI & iPaaS** | Metabase | AGPLv3 | Embedded signed JWT iframe | Safe / Isolated |
| | Apache Superset | Apache 2.0 | Direct analytical warehouse connection | Zero Risk |
| | NocoDB | AGPLv3 | REST API database wrapper | Safe / Isolated |
| | n8n | Fair-Code (Sustainable) | Webhook workflow execution node | Safe / Isolated |

---

## 3. Proprietary Custom Layer Owned 100% by WildCatter Ventures

The following architectural components are 100% custom-engineered and free from any third-party copyleft encumbrances:
1. `server.js`: Universal production HTTP & OpenAPI router.
2. `database/schema.sql` & `database/seed.js`: Canonical enterprise business entities and relational data fabric.
3. `agents/orchestrator.js`: Multi-agent execution engine with stateful handoffs.
4. `agents/memory.js`: Three-Tier Memory Architecture (Working, Episodic, Semantic RAG).
5. `agents/auditLedger.js`: Immutable SHA-256 audit ledger.
6. `api/mcp.js`: Model Context Protocol server exposing 10+ enterprise tools.
7. `public/js/copilot.js` & `public/js/hitlManager.js`: Generative UI streaming engine with interactive Level 3 HITL approval cards.
8. `public/js/modules/*.js`: Complete bespoke frontend module implementations replicating Zoho One.
