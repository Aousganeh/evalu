# Evalu - AI Enterprise Solutions Prototype

> Evalu ingests customer feedback across call-centre transcripts, CRM tickets, chats, and reviews; deterministically strips personal identifiers (PII); uses an internal AI model to extract structured customer issues; aggregates recurring problems into root-cause clusters; assigns accountable owners; and tracks whether interventions reduce repeat contacts.

---

## 1. Architecture

Evalu is built as a lightweight, reliable full-stack application:

```
┌─────────────────────────────────────────────────────────────────┐
│                      EVALU FRONTEND (React 19 + Vite)          │
│  - Pipeline Dashboard: Ingestion, Redaction, Schema, Actions    │
│  - Explainable Priority Breakdown & Factor Attribution Bars     │
│  - Closed-Loop Outcome Verification & Synthetic Timeline        │
│  - Interactive Documented Failure Modes Inspector               │
└────────────────────────────────┬────────────────────────────────┘
                                 │ HTTP / REST (/api/*)
┌────────────────────────────────▼────────────────────────────────┐
│                   BACKEND API (Node.js Express)                 │
│  - server/pii.js: Deterministic PII Redaction Engine            │
│  - server/ai.js: Model Adapter + Schema Validator + Fallback    │
│  - server/cluster.js: Clustering & Explainable Priority Engine   │
│  - server/store.js: Local Database / JSON Persistence Store     │
└───────────────────┬─────────────────────────┬───────────────────┘
                    │                         │
     [Environment Variable AI Adapter]        │ [Persistent Store]
                    │                         │
┌───────────────────▼──────────────────┐ ┌────▼────────────────────┐
│   INTERNAL AI MODEL / OPENAI-COMPAT  │ │ server/data/db.json    │
│   (gpt-4o-mini / Gemini / Ollama)    │ │ (Interactions, Actions,│
│   Fallback: Deterministic Multilingual│ │  Closed-Loop Benchmark)│
│   Engine (AZ / RU / EN)              │ └────────────────────────┘
└──────────────────────────────────────┘
```

---

## 2. Local Setup (Fresh-Laptop Setup)

### Prerequisites
- Node.js `v20+` (tested and verified on `v24.7.0`)
- npm `v10+` (tested on `v11.5.1`)

### Setup Instructions
1. **Clone the repository and install dependencies:**
   ```bash
   git clone <repo-url>
   cd evalu
   npm install
   ```

2. **Configure Environment Variables (Optional):**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Configure model credentials if running live AI inference:
   ```env
   AI_BASE_URL=https://api.openai.com/v1
   AI_API_KEY=your_key_here
   AI_MODEL=gpt-4o-mini
   PORT=3001
   ```
   > **Note:** If `AI_API_KEY` is omitted or left empty, Evalu automatically and safely executes in **deterministic rules-based demo mode** across Azerbaijani, Russian, and English. No external API keys are required to demo all features.

3. **Start the Application:**
   Run both backend and frontend servers:

   *Terminal 1 (Backend API Server):*
   ```bash
   npm run server
   ```
   *Terminal 2 (Frontend Client):*
   ```bash
   npm run dev
   ```

   Open your browser to: `http://localhost:5173`

4. **Run Automated Test Suite:**
   ```bash
   npm test
   ```

5. **Run Standalone End-to-End Demo Script:**
   ```bash
   npm run demo
   ```

---

## 3. End-to-End Demo Walkthrough

1. **Ingest Synthetic Customer Interactions:**
   - Navigate to the **AI Pipeline** tab in the sidebar.
   - Click **"Load 45 Synthetic Records"** (or upload a custom CSV via **"Upload CSV"**).
   - Supported schema: `interaction_id,timestamp,channel,language,customer_id,text,status`.
   - Evalu ingests 45 interactions spanning Azerbaijani, Russian, and English across Call Centre, Chat, CRM Ticket, and Review channels.

2. **Inspect Pre-Inference PII Redaction:**
   - Under **"1. Ingestion & PII Redaction"**, view the side-by-side comparison between the raw customer text and the redacted text.
   - Notice the highlighted red badges: `[PHONE]`, `[EMAIL]`, `[CARD]`, `[ACCOUNT_ID]`, `[FIN]`.
   - **Crucial Privacy Guarantee:** All PII is stripped deterministically *before* any text reaches the AI model or fallback engine.

3. **Verify Strict Structured Model Output:**
   - Switch to **"2. Structured Model Output"**.
   - Confirm each record is parsed into the strict JSON schema:
     `sentiment` (`positive` | `neutral` | `negative`), `topic`, `summary`, `urgency`, `suggested_owner`, `repeat_contact_risk`, `confidence`.
   - Inspect the provenance badges: displays whether inference was conducted by `AI (gpt-4o-mini)` or `rules-based fallback` with the transparent fallback rationale.

4. **Explore Issue Clusters & Explainable Priority Scoring:**
   - Switch to **"3. Issue Clusters & Scoring"**.
   - View aggregated clusters ranked by their explainable Priority Score:
     * `#1 Unexpected Data Charges` (Score: 100.0) -> Suggested Owner: Billing
     * `#2 SIM Card & OTP Issues` (Score: 97.3) -> Suggested Owner: Support
     * `#3 Network Slowdown & Coverage` (Score: 74.5) -> Suggested Owner: Network
     * `#4 Mobile App Login & Crash` (Score: 66.4) -> Suggested Owner: Product
     * `#5 Positive Support Feedback` (Score: 31.5) -> Suggested Owner: Support
   - Inspect the contributing factors breakdown for each cluster:
     `Priority = (0.30 × VolumeNorm + 0.25 × NegativeRate + 0.25 × UrgencyWeight + 0.20 × RepeatRiskWeight) × 100`

5. **Assign Accountable Operator Action:**
   - Click **"Assign Operator Action"** on the top cluster (*Unexpected Data Charges*).
   - Enter Action Title, Assignee, Target Due Date, and Expected Success Metric.
   - Click **"Save & Persist Action"**.
   - Switch to **"4. Operator Actions"** to verify that the action is persisted on the server (`server/data/db.json`).
   - Change action status (e.g., from `in_progress` to `completed`) and observe instant server-side persistence.

6. **Verify Closed-Loop Outcome (Synthetic Dataset):**
   - Switch to **"5. Closed-Loop Outcome"**.
   - Inspect the before/after KPI impact for the Billing intervention on *Unexpected Data Charges*:
     * Weekly Mentions: **156/wk -> 18/wk (-88.5% reduction)**
     * Repeat-Contact Rate: **51.2% -> 8.5% (-83.4% relative reduction)**
     * Negative Sentiment: **91.0% -> 24.0%**
   - Review the weekly trajectory breakdown from W-2 through W+4.
   - *Clear disclaimer:* Marked with a persistent yellow banner stating this is a synthetic demonstration dataset.

7. **Test Documented Failure Modes:**
   - Switch to **"6. Documented Failure Modes"**.
   - Trigger the three interactive failure scenarios directly in the browser and observe the deterministic fallback response in real-time.

---

## 4. Model Configuration & Provider Adapter

Evalu abstracts AI provider interactions through environment variables:
- `AI_BASE_URL`: API root (default: `https://api.openai.com/v1`).
- `AI_API_KEY`: Model API authentication key.
- `AI_MODEL`: Model identifier (default: `gpt-4o-mini`).

### Validation & Single Retry
- Model responses are validated against the strict JSON schema using `validateAnalysisSchema()` in `server/ai.js`.
- If the model emits invalid JSON or schema violations, Evalu catches the error and performs **one automatic retry** with explicit error guidance in the prompt.
- If the retry fails or the API is unreachable, Evalu gracefully falls back to the rules-based engine. Fallback results are explicitly tagged as `inference_type: "rules-based"` and never misrepresented as AI inference.

---

## 5. Data & Privacy Design (PII Redaction)

Evalu enforces a zero-PII leak architecture:

1. **Deterministic Redaction Rules (`server/pii.js`):**
   - **Phone Numbers**: Azerbaijani (`+994 50/51/55/70/77/99`, `050/055...`), Russian (`+7 (xxx)...`, `8-xxx...`), North American (`+1...`), and international standard formats -> `[REDACTED_PHONE]`.
   - **Email Addresses**: All standard RFC email formats -> `[REDACTED_EMAIL]`.
   - **Payment Cards**: 16-digit debit/credit card patterns (spaced, hyphenated, continuous) -> `[REDACTED_CARD]`.
   - **Patterned Account IDs & FINs**: Account identifiers (`ACC-xxxx`, `CUST-xxxx`, `FIN: xxxxxxx`, `ID: xxxxx`) -> `[REDACTED_ACCOUNT_ID]` / `[REDACTED_FIN]`.

2. **Pre-Inference Execution:**
   - Redaction executes synchronously on ingested text. The internal AI model only ever receives sanitized text.
   - Raw interaction text is retained in secure synthetic local storage for operator auditing only.

---

## 6. Documented Failure Cases & Limitations

Evalu does not conceal edge cases or failures; it handles them deterministically:

### 1. Invalid Model JSON Output
- **Trigger**: Model generates incomplete JSON or violates enum constraints (e.g. invalid sentiment or urgency).
- **Behavior**: Evalu logs validation errors, retries the model once, and upon second failure, transparently engages the rules-based classifier.
- **Attribution**: Returns `inference_type: "rules-based"` with `fallback_reason: "Model returned invalid schema structure after retry"`.

### 2. Model / API Unavailable (HTTP 503 / Timeout)
- **Trigger**: AI endpoint unreachable, network outage, or missing `AI_API_KEY`.
- **Behavior**: Catches error cleanly without crashing; transparently routes to the deterministic rules-based multilingual fallback engine.
- **Attribution**: Returns `model_used: "rules-based"` with `fallback_reason: "Model API endpoint unavailable (HTTP 503)"` or missing API key note.

### 3. Ambiguous Multilingual Feedback
- **Trigger**: Unclear, mixed, or non-telecom communication (e.g., *"Salam privet hello maybe yes test ok"*).
- **Behavior**: Categorized into `"General Inquiries / Ambiguous"` with low confidence (`0.45`), neutral sentiment, suggested owner `"Other"`, and flagged for operator review.

---

## 7. Production Access-Control & Security Requirement

Evalu is currently a **local enterprise prototype** running in single-tenant mode without production identity management.

### Production Enterprise Deployment Requirements:
1. **OIDC / SSO Integration**: OAuth2 / OpenID Connect integration with Azure AD, Okta, or Google Workspace.
2. **Role-Based Access Control (RBAC)**:
   - `Viewer`: View aggregated clusters and closed-loop impact metrics only.
   - `Operator`: View redacted customer interactions, create corrective actions, update action statuses.
   - `Admin / Compliance Officer`: Manage PII redaction taxonomies, configure AI provider endpoints, audit raw interaction vaults.
3. **Audit Logging & Encryption**: Encryption at rest (AES-256) for stored feedback, TLS 1.3 in transit, and immutable audit logs for any access to unredacted text.

---

## 8. Testing & Quality Verification

### Test Commands
- **Unit & Integration Tests:**
  ```bash
  npm test
  ```
  *Observed Result: 21 passing tests (PII redaction, schema validator, priority score, fallback, failure modes, integration pipeline).*
- **Linter:**
  ```bash
  npm run lint
  ```
  *Observed Result: 0 errors.*
- **Production Asset Build:**
  ```bash
  npm run build
  ```
  *Observed Result: Clean Vite production build in dist/.*
- **End-to-End Demo Script:**
  ```bash
  npm run demo
  ```
  *Observed Result: Executes full 7-step pipeline from CSV parse to closed-loop validation in < 1 second.*
