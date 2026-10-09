# Evalu - Disclosure of Libraries, Templates, Models, and Datasets

This document provides a complete inventory of all software libraries, templates, AI models, and datasets utilized in the Evalu Enterprise Solutions prototype, in compliance with transparency and hackathon requirements.

---

## 1. Third-Party Software Libraries

### Backend Runtime & Dependencies
- **Node.js (v24.7.0)**: Server-side JavaScript runtime.
- **Express (v5.3.0)**: REST API web server framework for routing, multipart handling, and JSON API endpoints.
- **CORS (v2.8.6)**: Cross-Origin Resource Sharing middleware.
- **Dotenv (v18.0.7)**: Environment variable configuration loader.
- **node:test & node:assert**: Native Node.js built-in automated test runner and assertion framework.

### Frontend Runtime & UI Libraries
- **React (v19.1.0)**: Declarative UI component library.
- **React DOM (v19.1.0)**: DOM bindings for React.
- **Vite (v6.4.1)**: Development build tool and production asset bundler.
- **Lucide React (v0.525.0)**: Accessible icon set for navigation, status tags, and actions.
- **React Router DOM (v7.6.3)**: Client-side routing.
- **Recharts (v3.0.2)** & **Chart.js (v4.5.0) / react-chartjs-2 (v5.3.0)**: Data visualization charts.
- **@dnd-kit/core**, **@dnd-kit/sortable**, **@dnd-kit/modifiers**: Drag-and-drop toolkit.
- **@floating-ui/react (v0.27.16)**: Tooltip and popover positioning engine.
- **ESLint (v9.25.0)**: Static code analysis and linting engine.

---

## 2. Base UI Template & Typography
- **Evalu Dashboard Base Template**: Initial React 19 layout with Switzer typography (`src/assets/fonts/Switzer_Complete`), modular card containers, and responsive drawer scaffolding.
- **Modifications**: Replaced static/inert handlers with live backend integration; purged all non-deterministic random data (`Math.random()`); added server persistence and dedicated end-to-end Evalu Pipeline interfaces.

---

## 3. Models & Inference Engines
1. **Configured Internal AI Model Adapter**:
   - Provider: Internal AI Provider / OpenAI-compatible endpoint.
   - Configuration: Environment variables only (`AI_BASE_URL`, `AI_API_KEY`, `AI_MODEL`).
   - Default Model Identifier: `gpt-4o-mini`.
   - Role of AI: Extract strict structured JSON (`sentiment`, `topic`, `summary`, `urgency`, `suggested_owner`, `repeat_contact_risk`, `confidence`) from customer interactions whose PII has already been redacted.
   - Validation & Retry: AI output is deterministically validated against a strict JSON schema; retries once on format failure.
2. **Evalu Multilingual Deterministic Rules-Based Engine**:
   - Role: Zero-dependency transparent fallback when API keys are absent, when the model endpoint is unreachable, or when JSON schema retries fail.
   - Languages Handled: Azerbaijani (`az`), Russian (`ru`), English (`en`).
   - Provenance Tagging: Explicitly attributes all fallback inferences as `model_used: "rules-based"` and `inference_type: "rules-based"` with transparent `fallback_reason`.

---

## 4. Datasets
1. **Synthetic Multilingual Telecom Interactions Dataset (`data/synthetic_interactions.csv`)**:
   - Size: 45 interactions.
   - Schema: `interaction_id,timestamp,channel,language,customer_id,text,status`.
   - Languages: Azerbaijani (15 rows), Russian (15 rows), English (15 rows).
   - Channels: Call Centre, Chat, CRM Ticket, App Review.
   - Embedded Synthetic PII: Simulated phone numbers (`+994 50...`, `+7 916...`, `+1 415...`), emails, 16-digit payment card numbers, patterned accounts (`ACC-xxxx`, `CUST-xxxx`), and FIN identity codes.
   - Nature: **100% synthetic**. Zero real customer or production telemetry was utilized.
2. **Closed-Loop Intervention Tracking Dataset (`server/data/db.json` / `server/store.js`)**:
   - Seeded benchmark tracking the impact of a Billing intervention on "Unexpected Data Charges" over a 7-week synthetic timeline (W-2 to W+4).
   - Nature: **100% synthetic demo case study**. Clearly marked with visual warnings in the user interface.
