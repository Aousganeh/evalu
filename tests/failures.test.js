import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyzeInteraction, rulesBasedAnalyze } from '../server/ai.js';
import { redactPII } from '../server/pii.js';

test('Failure Case 1: Invalid model JSON triggers retry and graceful fallback', async () => {
  const interaction = {
    interaction_id: 'INT-FAIL-1',
    text: 'Customer reports unexpected 25 AZN deduction on mobile bill',
    language: 'en'
  };

  // Simulate invalid JSON from model
  const result = await analyzeInteraction(interaction, { forceInvalidJson: true });

  assert.equal(result.inference_type, 'rules-based');
  assert.equal(result.model_used, 'rules-based');
  assert.ok(result.fallback_reason.includes('invalid schema structure'));
  assert.equal(result.topic, 'Unexpected Data Charges');
  assert.equal(result.suggested_owner, 'Billing');
});

test('Failure Case 2: Model API unavailable (503 / Network timeout) transparently falls back', async () => {
  const interaction = {
    interaction_id: 'INT-FAIL-2',
    text: 'LTE network connection drops in downtown tunnel area',
    language: 'en'
  };

  // Simulate API outage
  const result = await analyzeInteraction(interaction, { forceApiUnavailable: true });

  assert.equal(result.inference_type, 'rules-based');
  assert.equal(result.model_used, 'rules-based');
  assert.ok(result.fallback_reason.includes('unavailable'));
  assert.equal(result.topic, 'Network Slowdown & Coverage');
  assert.equal(result.suggested_owner, 'Network');
});

test('Failure Case 3: Ambiguous multilingual feedback produces low confidence and explicit flag', () => {
  const ambiguousText = 'Salam privet hello maybe yes test ok 4321';
  const { redactedText } = redactPII(ambiguousText);
  const result = rulesBasedAnalyze(redactedText, 'mixed', 'Ambiguous mixed feedback');

  assert.equal(result.topic, 'General Inquiries / Ambiguous');
  assert.equal(result.sentiment, 'neutral');
  assert.ok(result.confidence <= 0.5);
  assert.ok(result.fallback_reason.toLowerCase().includes('ambiguous'));
  assert.equal(result.suggested_owner, 'Other');
});
