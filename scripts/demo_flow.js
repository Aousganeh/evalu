/**
 * Evalu Executable Demo Script
 * Run with: node scripts/demo_flow.js
 * 
 * Demonstrates:
 * 1. CSV dataset ingestion (45 interactions across AZ, RU, EN)
 * 2. Deterministic PII redaction (phones, emails, cards, IDs)
 * 3. Model / Rules-based analysis with strict JSON schema
 * 4. Cluster aggregation and explainable priority scoring
 * 5. Operator action assignment and persistent storage
 * 6. Closed-loop outcome validation on synthetic before/after data
 */

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

async function runDemo() {
  console.log('='.repeat(70));
  console.log('EVALU AI ENTERPRISE SOLUTIONS - END-TO-END DEMO PIPELINE');
  console.log('='.repeat(70));

  // Step 1: Load CSV
  const csvPath = path.join(__dirname, '../data/synthetic_interactions.csv');
  console.log(`\n[STEP 1] Ingesting CSV: ${csvPath}`);
  const csvText = fs.readFileSync(csvPath, 'utf-8');
  const rows = parseCSV(csvText);
  console.log(`✔ Parsed ${rows.length} synthetic customer interactions.`);

  // Step 2: Redaction & Analysis
  console.log('\n[STEP 2 & 3] Redacting PII & Running Analysis Pipeline...');
  let totalRedactions = 0;
  const processed = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const { redactedText, redactions } = redactPII(row.text);
    totalRedactions += redactions.length;

    const analysis = await analyzeInteraction({
      interaction_id: row.interaction_id,
      text: redactedText,
      language: row.language
    });

    processed.push({
      ...row,
      redacted_text: redactedText,
      redactions_count: redactions.length,
      redactions,
      analysis
    });
  }

  store.setInteractions(processed);
  console.log(`✔ Redacted ${totalRedactions} PII instances across all interactions.`);
  console.log(`✔ Analyzed all ${processed.length} records. Active inference mode: ${processed[0].analysis.inference_type}`);

  // Display a sample comparison
  const sample = processed[0];
  console.log('\n--- Sample Redaction & Model Output ---');
  console.log(`Original:  "${sample.text}"`);
  console.log(`Redacted:  "${sample.redacted_text}"`);
  console.log(`PII Found: ${JSON.stringify(sample.redactions.map(r => r.type))}`);
  console.log('Structured AI JSON:');
  console.log(JSON.stringify(sample.analysis, null, 2));

  // Step 4: Clustering & Prioritization
  console.log('\n[STEP 4] Aggregating Issue Clusters & Calculating Priority Scores...');
  const clusters = aggregateIssueClusters(processed);
  console.log(`✔ Identified ${clusters.length} root-cause clusters:\n`);

  clusters.forEach((c, idx) => {
    console.log(`  #${idx + 1} [Score: ${c.priority_score.toFixed(1)}] ${c.topic}`);
    console.log(`     Volume: ${c.volume} | Neg Rate: ${(c.negative_rate * 100).toFixed(0)}% | Urgency: ${c.urgency} | Risk: ${c.repeat_contact_risk} | Owner: ${c.suggested_owner}`);
    console.log(`     Formula: ${c.priority_formula}`);
    console.log(`     Factors: Vol=${c.priority_breakdown.volume.contribution} Neg=${c.priority_breakdown.negative_rate.contribution} Urg=${c.priority_breakdown.urgency.contribution} Rep=${c.priority_breakdown.repeat_contact_risk.contribution}`);
  });

  // Step 5: Assign Action
  const top = clusters[0];
  console.log(`\n[STEP 5] Operator assigns corrective action for top cluster: "${top.topic}"...`);
  const createdAction = store.addAction({
    cluster_topic: top.topic,
    action_title: `Audit Billing charging engine and configure warning notifications`,
    owner: top.suggested_owner,
    due_date: '2026-10-31',
    status: 'in_progress',
    expected_success_metric: 'Reduce repeat contact volume by 50%'
  });
  console.log(`✔ Persisted Action [${createdAction.id}]: "${createdAction.action_title}" (Owner: ${createdAction.owner})`);

  // Step 6: Verify Persistence
  console.log('\n[STEP 6] Verifying server-side persistence in store...');
  const allActions = store.getActions();
  console.log(`✔ Total stored actions in database: ${allActions.length}`);

  // Step 7: Closed-Loop Outcome
  console.log('\n[STEP 7] Inspecting Closed-Loop Outcome (Synthetic Dataset)...');
  const loop = store.getClosedLoop();
  console.log(`✔ Cluster: "${loop.cluster_topic}"`);
  console.log(`✔ Baseline weekly volume: ${loop.baseline_vs_current.before_weekly_volume} -> Post-intervention: ${loop.baseline_vs_current.after_weekly_volume} (${loop.baseline_vs_current.volume_reduction_pct}% reduction)`);
  console.log(`✔ Repeat contact rate: ${loop.baseline_vs_current.before_repeat_contact_rate}% -> ${loop.baseline_vs_current.after_repeat_contact_rate}% (${loop.baseline_vs_current.repeat_rate_reduction_pct}% relative decrease)`);
  console.log(`✔ Disclaimer: ${loop.disclaimer}`);

  console.log('\n' + '='.repeat(70));
  console.log('DEMO PIPELINE FINISHED SUCCESSFULLY');
  console.log('='.repeat(70));
}

runDemo().catch(err => {
  console.error('Demo script error:', err);
  process.exit(1);
});
