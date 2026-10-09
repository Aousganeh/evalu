import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateAnalysisSchema } from '../server/ai.js';

test('Schema: Accepts strictly valid AI analysis output', () => {
  const validOutput = {
    sentiment: 'negative',
    topic: 'Unexpected Data Charges',
    summary: 'Customer reports unauthorized 8 AZN charge while on WiFi.',
    urgency: 'high',
    suggested_owner: 'Billing',
    repeat_contact_risk: 'high',
    confidence: 0.95
  };

  const result = validateAnalysisSchema(validOutput);
  assert.equal(result.valid, true);
  assert.equal(result.errors.length, 0);
});

test('Schema: Rejects invalid sentiment values', () => {
  const invalidOutput = {
    sentiment: 'somewhat_annoyed',
    topic: 'Unexpected Data Charges',
    summary: 'Deduction issues.',
    urgency: 'high',
    suggested_owner: 'Billing',
    repeat_contact_risk: 'high',
    confidence: 0.9
  };

  const result = validateAnalysisSchema(invalidOutput);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some(e => e.includes('Invalid sentiment')));
});

test('Schema: Rejects invalid urgency and suggested_owner', () => {
  const invalidOutput = {
    sentiment: 'negative',
    topic: 'Unexpected Data Charges',
    summary: 'Deduction issues.',
    urgency: 'critical', // Invalid: only low | medium | high
    suggested_owner: 'FinanceDepartment', // Invalid: only Billing | Network | Support | Product | Other
    repeat_contact_risk: 'high',
    confidence: 0.9
  };

  const result = validateAnalysisSchema(invalidOutput);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some(e => e.includes('Invalid urgency')));
  assert.ok(result.errors.some(e => e.includes('Invalid suggested_owner')));
});

test('Schema: Rejects confidence out of range [0, 1]', () => {
  const invalidOutput = {
    sentiment: 'negative',
    topic: 'Billing Problem',
    summary: 'Summary text',
    urgency: 'high',
    suggested_owner: 'Billing',
    repeat_contact_risk: 'high',
    confidence: 1.5 // Invalid
  };

  const result = validateAnalysisSchema(invalidOutput);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some(e => e.includes('Field "confidence"')));
});
