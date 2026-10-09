/**
 * Evalu Backend API Server
 * 
 * Express server providing:
 * - Deterministic PII redaction pipeline
 * - AI Model Adapter / Schema Validator / Rules-based Fallback
 * - Issue Clustering & Priority Scoring
 * - Server-side JSON Store Persistence
 * - Closed-Loop Outcome Tracking
 * - Documented Failure Mode Simulations
 */

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { redactPII } from './pii.js';
import { analyzeInteraction, rulesBasedAnalyze, validateAnalysisSchema } from './ai.js';
import { aggregateIssueClusters } from './cluster.js';
import { store } from './store.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.text({ type: 'text/csv', limit: '10mb' }));

/**
 * Robust RFC-compliant CSV parser
 */
export function parseCSV(csvText) {
  const lines = [];
  let currentRow = [];
  let currentField = '';
  let insideQuotes = false;

  const normalized = csvText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];
    const nextChar = normalized[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if (char === '\n' && !insideQuotes) {
      currentRow.push(currentField.trim());
      if (currentRow.length > 1 || currentRow[0] !== '') {
        lines.push(currentRow);
      }
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.length > 1 || currentRow[0] !== '') {
      lines.push(currentRow);
    }
  }

  if (lines.length === 0) return [];

  const headers = lines[0].map(h => h.trim().toLowerCase());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const rowObj = {};
    const values = lines[i];
    headers.forEach((h, idx) => {
      rowObj[h] = values[idx] || '';
    });
    rows.push(rowObj);
  }

  return rows;
}

/**
 * Health check & Model configuration status
 */
app.get('/api/health', (req, res) => {
  const apiKeyConfigured = Boolean(process.env.AI_API_KEY && process.env.AI_API_KEY.trim() !== '');
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    ai_configuration: {
      provider: 'Internal AI Provider / Compatible Adapter',
      base_url: process.env.AI_BASE_URL || 'https://api.openai.com/v1',
      model: process.env.AI_MODEL || 'gpt-4o-mini',
      api_key_configured: apiKeyConfigured,
      mode: apiKeyConfigured ? 'live-model-inference' : 'rules-based-fallback-demo'
    },
    privacy_controls: {
      pii_redaction_active: true,
      supported_pii: ['phone', 'email', 'card_number', 'account_id', 'fin_code']
    }
  });
});

/**
 * Ingest & analyze interactions from CSV or JSON
 */
async function processInteractions(rawRows, simulationOptions = {}) {
  const processed = [];

  for (const row of rawRows) {
    const text = row.text || '';
    const language = (row.language || 'en').toLowerCase();

    // STEP 1: Redact PII BEFORE model analysis
    const { redactedText, redactions } = redactPII(text);

    // STEP 2: Analyze interaction with AI model or fallback using REDACTED text only
    const analysis = await analyzeInteraction(
      {
        interaction_id: row.interaction_id || `INT-${Date.now()}`,
        text: redactedText,
        language
      },
      simulationOptions
    );

    processed.push({
      interaction_id: row.interaction_id || `INT-${processed.length + 1000}`,
      timestamp: row.timestamp || new Date().toISOString(),
      channel: row.channel || 'Call Centre',
      language,
      customer_id: row.customer_id || 'CUST-0000',
      status: row.status || 'open',
      original_text: text,
      redacted_text: redactedText,
      redactions_count: redactions.length,
      redactions,
      analysis
    });
  }

  return processed;
}

/**
 * POST /api/upload - Ingest CSV content
 */
app.post('/api/upload', async (req, res) => {
  try {
    let csvContent = '';
    if (typeof req.body === 'string') {
      csvContent = req.body;
    } else if (req.body && req.body.csv) {
      csvContent = req.body.csv;
    } else {
      return res.status(400).json({ error: 'Expected CSV content in request body' });
    }

    const rows = parseCSV(csvContent);
    if (rows.length === 0) {
      return res.status(400).json({ error: 'No valid rows found in CSV' });
    }

    const processed = await processInteractions(rows);
    store.setInteractions(processed);

    const clusters = aggregateIssueClusters(processed);

    res.json({
      success: true,
      count: processed.length,
      interactions: processed,
      clusters
    });
  } catch (err) {
    console.error('Error in /api/upload:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/load-sample - Ingest pre-packaged 45 synthetic telecom interactions
 */
app.post('/api/load-sample', async (req, res) => {
  try {
    const sampleCsvPath = path.join(__dirname, '../data/synthetic_interactions.csv');
    if (!fs.existsSync(sampleCsvPath)) {
      return res.status(404).json({ error: 'Sample dataset not found at ' + sampleCsvPath });
    }

    const csvContent = fs.readFileSync(sampleCsvPath, 'utf-8');
    const rows = parseCSV(csvContent);
    const processed = await processInteractions(rows);

    store.setInteractions(processed);
    const clusters = aggregateIssueClusters(processed);

    res.json({
      success: true,
      source: 'data/synthetic_interactions.csv',
      count: processed.length,
      interactions: processed,
      clusters
    });
  } catch (err) {
    console.error('Error in /api/load-sample:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/interactions - List stored interactions
 */
app.get('/api/interactions', (req, res) => {
  const interactions = store.getInteractions();
  res.json({
    total: interactions.length,
    interactions
  });
});

/**
 * GET /api/clusters - Aggregated issue clusters with explainable priority scores
 */
app.get('/api/clusters', (req, res) => {
  const interactions = store.getInteractions();
  const clusters = aggregateIssueClusters(interactions);
  res.json({
    total_clusters: clusters.length,
    clusters
  });
});

/**
 * GET /api/actions - Operator corrective actions
 */
app.get('/api/actions', (req, res) => {
  const actions = store.getActions();
  res.json({
    total: actions.length,
    actions
  });
});

/**
 * POST /api/actions - Create new operator action for a cluster
 */
app.post('/api/actions', (req, res) => {
  const { cluster_topic, action_title, owner, due_date, status, expected_success_metric } = req.body;
  if (!cluster_topic || !action_title) {
    return res.status(400).json({ error: 'cluster_topic and action_title are required' });
  }

  const created = store.addAction({
    cluster_topic,
    action_title,
    owner: owner || 'Support',
    due_date,
    status: status || 'open',
    expected_success_metric
  });

  res.status(201).json(created);
});

/**
 * PATCH /api/actions/:id - Update existing action
 */
app.patch('/api/actions/:id', (req, res) => {
  const updated = store.updateAction(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Action not found' });
  }
  res.json(updated);
});

/**
 * GET /api/closed-loop - Seeded synthetic before/after outcome metrics
 */
app.get('/api/closed-loop', (req, res) => {
  const closedLoop = store.getClosedLoop();
  res.json(closedLoop);
});

/**
 * GET /api/stats - Deterministic overview dashboard metrics
 */
app.get('/api/stats', (req, res) => {
  const interactions = store.getInteractions();
  const actions = store.getActions();
  const clusters = aggregateIssueClusters(interactions);

  let positiveCount = 0;
  let neutralCount = 0;
  let negativeCount = 0;
  let totalRedactions = 0;

  for (const item of interactions) {
    const s = item.analysis?.sentiment;
    if (s === 'positive') positiveCount++;
    else if (s === 'negative') negativeCount++;
    else neutralCount++;

    totalRedactions += (item.redactions_count || 0);
  }

  const topCluster = clusters.length > 0 ? clusters[0] : null;

  res.json({
    total_interactions: interactions.length,
    sentiment_counts: {
      positive: positiveCount,
      neutral: neutralCount,
      negative: negativeCount,
      negative_percentage: interactions.length > 0 ? +((negativeCount / interactions.length) * 100).toFixed(1) : 0
    },
    top_negative_topic: topCluster ? topCluster.topic : 'None',
    top_negative_score: topCluster ? topCluster.priority_score : 0,
    active_actions_count: actions.filter(a => a.status !== 'completed').length,
    total_actions_count: actions.length,
    total_pii_redacted: totalRedactions,
    clusters_count: clusters.length,
    model_mode: process.env.AI_API_KEY ? (process.env.AI_MODEL || 'gpt-4o-mini') : 'rules-based fallback'
  });
});

/**
 * POST /api/simulate-failure - Test and demonstrate the three failure cases
 */
app.post('/api/simulate-failure', async (req, res) => {
  const { case_type, text } = req.body;

  if (case_type === 'invalid_json') {
    // 1. Invalid Model JSON failure
    const sampleText = text || 'Customer charged twice on credit card 4169-1234-5678-9012';
    const { redactedText } = redactPII(sampleText);
    const result = await analyzeInteraction(
      { text: redactedText, language: 'en' },
      { forceInvalidJson: true }
    );
    return res.json({
      scenario: 'Invalid Model JSON Output',
      description: 'Model emitted non-conforming schema; retry was triggered once; deterministic rules-based fallback safely engaged.',
      result
    });
  }

  if (case_type === 'api_unavailable') {
    // 2. Model API Unavailable failure
    const sampleText = text || 'Internet connection drops continuously on 4G LTE';
    const { redactedText } = redactPII(sampleText);
    const result = await analyzeInteraction(
      { text: redactedText, language: 'en' },
      { forceApiUnavailable: true }
    );
    return res.json({
      scenario: 'Model API Unavailable (HTTP 503 / Network Timeout)',
      description: 'AI endpoint is unreachable; transparent rules-based fallback returned deterministic classification with explicit attribution.',
      result
    });
  }

  if (case_type === 'ambiguous_multilingual') {
    // 3. Ambiguous Multilingual feedback
    const ambiguousText = text || 'Salam privet hello maybe yes test ok';
    const { redactedText } = redactPII(ambiguousText);
    const result = rulesBasedAnalyze(redactedText, 'mixed', 'Ambiguous multilingual input');
    return res.json({
      scenario: 'Ambiguous Multilingual Feedback',
      description: 'Feedback lacks clear semantic telecom indicators; system flags low confidence (0.45) and routes to "General Inquiries / Ambiguous" for human review.',
      result
    });
  }

  res.status(400).json({ error: 'Unknown case_type. Choose: invalid_json, api_unavailable, ambiguous_multilingual' });
});

/**
 * POST /api/reset - Reset demo store
 */
app.post('/api/reset', async (req, res) => {
  store.reset();
  res.json({ success: true, message: 'Store reset to initial state' });
});

const isDirectExecution = process.argv[1] && (
  process.argv[1].endsWith('server/index.js') ||
  process.argv[1].endsWith('server/index')
);

if (isDirectExecution) {
  try {
    if (store.getInteractions().length === 0) {
      const sampleCsvPath = path.join(__dirname, '../data/synthetic_interactions.csv');
      if (fs.existsSync(sampleCsvPath)) {
        const csvContent = fs.readFileSync(sampleCsvPath, 'utf-8');
        const rows = parseCSV(csvContent);
        processInteractions(rows).then(processed => {
          store.setInteractions(processed);
          console.log(`[Evalu Server] Auto-seeded ${processed.length} synthetic interactions.`);
        }).catch(err => {
          console.error('[Evalu Server] Failed to auto-seed:', err);
        });
      }
    }
  } catch (e) {
    console.warn('[Evalu Server] Auto-seed skip:', e.message);
  }

  app.listen(PORT, () => {
    console.log(`[Evalu Server] Listening on http://localhost:${PORT}`);
  });
}

export default app;
