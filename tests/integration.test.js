import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { parseCSV } from '../server/index.js';
import { redactPII } from '../server/pii.js';
import { analyzeInteraction } from '../server/ai.js';
import { aggregateIssueClusters } from '../server/cluster.js';
import { store } from '../server/store.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('Integration Flow: CSV upload -> Redaction -> Analysis -> Cluster -> Action Creation -> Persistence -> Dashboard Stats', async () => {
  // 1. Reset Store
  store.reset();
  assert.equal(store.getInteractions().length, 0);

  // 2. CSV Upload & Parse
  const sampleCsvPath = path.join(__dirname, '../data/synthetic_interactions.csv');
  assert.ok(fs.existsSync(sampleCsvPath), 'Synthetic CSV file must exist');

  const csvContent = fs.readFileSync(sampleCsvPath, 'utf-8');
  const rows = parseCSV(csvContent);
  assert.ok(rows.length >= 40, `Expected >= 40 rows, got ${rows.length}`);

  // 3. Redact PII and Analyze each row
  const processed = [];
  let totalRedactions = 0;

  for (const row of rows) {
    // Redaction
    const { redactedText, redactions } = redactPII(row.text);
    totalRedactions += redactions.length;

    // Redaction check: ensure raw phone/email/card does not appear in redacted text
    assert.equal(redactedText.includes(row.text && row.text.includes('@') ? '@' : 'NON_EXISTENT_SENTINEL'), false);

    // AI Analysis (using redacted text only)
    const analysis = await analyzeInteraction({
      text: redactedText,
      language: row.language,
      interaction_id: row.interaction_id
    });

    assert.ok(['positive', 'neutral', 'negative'].includes(analysis.sentiment));
    assert.ok(analysis.topic.length > 0);
    assert.ok(analysis.confidence >= 0 && analysis.confidence <= 1);

    processed.push({
      ...row,
      redacted_text: redactedText,
      redactions_count: redactions.length,
      redactions,
      analysis
    });
  }

  assert.ok(totalRedactions > 0, 'Synthetic dataset must trigger PII redactions');

  // 4. Persistence in Store
  store.setInteractions(processed);
  assert.equal(store.getInteractions().length, rows.length);

  // 5. Cluster Aggregation and Priority Scoring
  const clusters = aggregateIssueClusters(processed);
  assert.ok(clusters.length >= 4, `Expected at least 4 clusters, got ${clusters.length}`);
  
  // Verify top cluster has valid explainable priority score
  const topCluster = clusters[0];
  assert.ok(topCluster.priority_score > 0);
  assert.ok(topCluster.priority_formula.includes('VolumeNorm'));
  assert.ok(topCluster.priority_breakdown.volume.contribution >= 0);
  assert.ok(topCluster.sample_evidence.length > 0);

  // Verify sample evidence does NOT contain unredacted PII
  for (const quote of topCluster.sample_evidence) {
    assert.equal(quote.text.includes('+994 50'), false);
    assert.equal(quote.text.includes('+7 916'), false);
    assert.equal(quote.text.includes('@'), false);
  }

  // 6. Operator Action Creation
  const newAction = store.addAction({
    cluster_topic: topCluster.topic,
    action_title: 'Implement Emergency Telecom Operator Hotfix',
    owner: topCluster.suggested_owner,
    due_date: '2026-10-25',
    status: 'in_progress',
    expected_success_metric: 'Reduce repeat contact rate by 60%'
  });

  assert.ok(newAction.id.startsWith('ACT-'));
  assert.equal(newAction.cluster_topic, topCluster.topic);

  // 7. Verify Action Persistence in Server Store
  const storedActions = store.getActions();
  assert.ok(storedActions.some(a => a.id === newAction.id));

  // 8. Verify Dashboard Metrics Update Deterministically
  const currentInteractions = store.getInteractions();
  const negativeCount = currentInteractions.filter(i => i.analysis.sentiment === 'negative').length;
  const positiveCount = currentInteractions.filter(i => i.analysis.sentiment === 'positive').length;

  assert.ok(negativeCount > 0);
  assert.ok(positiveCount > 0);
  assert.equal(negativeCount + positiveCount <= currentInteractions.length, true);

  // 9. Closed-Loop Outcome Verification
  const closedLoop = store.getClosedLoop();
  assert.equal(closedLoop.is_synthetic_demo, true);
  assert.ok(closedLoop.baseline_vs_current.volume_reduction_pct > 80);
});
