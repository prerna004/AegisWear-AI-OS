# 📚 AegisOS Developer API & Extensibility Guide

> **Building Over the AI-Native Enterprise OS**  
> **OpenAPI 3.1 & Model Context Protocol (MCP) Standards**  

---

## 1. Overview & Base URLs

AegisOS exposes a unified REST, GraphQL, and Model Context Protocol (MCP) API gateway. All endpoints support standard CORS and TLS 1.3 encryption.

- **Local Base URL**: `http://localhost:3000/api`
- **Cloud Demo URL**: `https://aegis-enterprise-os.onrender.com/api`
- **Interactive Swagger Explorer**: `http://localhost:3000/docs`
- **Raw OpenAPI 3.1 Spec**: `http://localhost:3000/api/openapi.json`

---

## 2. Authentication

Requests require an enterprise API Key or Non-Human Identity (NHI) Service Token passed via the `Authorization` header:

```http
Authorization: Bearer agy_sec_9942a7...
```

---

## 3. Core API Endpoints

### 3.1 Autonomous Agent Invocation
**`POST /api/agents/invoke`**  
Invoke any of the 26 agents with automatic Level 1, Level 2, or Level 3 governance.

#### Request Body
```json
{
  "agentId": "agent-deal-desk",
  "prompt": "Evaluate CPQ quote for Nordic Logistics with 12% discount",
  "context": {
    "client": "Nordic Logistics Global",
    "amount": 480000,
    "discountPercent": 12.0
  },
  "userId": "usr_admin"
}
```

#### Response (Level 3 HITL Triggered)
```json
{
  "agentId": "agent-deal-desk",
  "agentName": "Deal Desk & CPQ Agent",
  "riskLevel": 3,
  "requiresHitl": true,
  "hitlRecord": {
    "id": "hitl-01",
    "actionType": "Approve CPQ Discount & Margin Override",
    "description": "Client Nordic Logistics Global requested 12% discount ($422,400). Margin: 38.5%.",
    "status": "pending"
  },
  "auditEntry": {
    "id": "aud-003",
    "promptHash": "p01e45a",
    "approvalStatus": "Pending_HITL"
  }
}
```

---

### 3.2 Human-in-the-Loop (HITL) Resolution
**`POST /api/hitl/resolve`**  
Approve or reject a Level 3 action held in the queue.

#### Request Body
```json
{
  "hitlId": "hitl-01",
  "decision": "approved",
  "reviewer": "usr_admin"
}
```

#### Response
```json
{
  "hitlId": "hitl-01",
  "status": "approved",
  "reviewedBy": "usr_admin"
}
```

---

### 3.3 Model Context Protocol (MCP) Standard Tool Execution
**`POST /api/mcp/call`**  
Directly call any exposed business tool adhering to the JSON-RPC 2.0 / MCP specification.

#### Request Body
```json
{
  "toolName": "mcp::translate_nl_to_sql",
  "arguments": {
    "question": "Show deals by stage and sum amount"
  }
}
```

#### Response
```json
{
  "status": "success",
  "output": {
    "nlQuery": "Show deals by stage and sum amount",
    "generatedSql": "SELECT stage, count(*) as count, sum(amount) as total_value FROM deals GROUP BY stage",
    "chartType": "bar",
    "data": [
      { "stage": "proposal", "count": 1, "total_value": 480000 },
      { "stage": "negotiation", "count": 1, "total_value": 240000 },
      { "stage": "closed_won", "count": 1, "total_value": 195000 }
    ]
  }
}
```

---

### 3.4 Change Data Capture (CDC) Webhook Subscriptions
**`POST /api/webhooks/dispatch`**  
Stream database mutations in `<100ms` across external services (e.g., Salesforce, SAP, Slack, custom microservices).

#### Supported Events:
- `deal.closed_won` ➔ Triggers ERP invoice creation & Documenso contract dispatch
- `lead.created` ➔ Triggers Lead Enrichment & ICP ranking
- `ticket.sentiment_frustrated` ➔ Triggers Account Exec pager alert & SLA escalation
- `expense.policy_breach` ➔ Triggers VP Finance HITL review

---

## 4. Multi-Language SDK Snippets

### TypeScript / Node.js
```typescript
import { AegisClient } from '@aegis-os/sdk';

const aegis = new AegisClient({
  apiKey: process.env.AEGIS_API_KEY,
  baseUrl: 'https://aegis-enterprise-os.onrender.com'
});

const result = await aegis.agents.invoke({
  agentId: 'agent-lead-enrichment',
  prompt: 'Enrich Aether Dynamics and compute ICP fit score'
});

console.log('ICP Score:', result.executionResult.icpScore);
```

### Python
```python
import os
import requests

AEGIS_URL = "https://aegis-enterprise-os.onrender.com/api"
API_KEY = os.getenv("AEGIS_API_KEY")

response = requests.post(
    f"{AEGIS_URL}/agents/invoke",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json={
        "agentId": "agent-sdr",
        "prompt": "Draft cadence email for Dr. Arjun Mehta at Apex BioSystems"
    }
)

print(response.json()["executionResult"]["subject"])
```
