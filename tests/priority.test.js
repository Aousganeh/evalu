import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculatePriorityScore, aggregateIssueClusters } from '../server/cluster.js';

test('Priority: Calculates score accurately with transparent formula', () => {
  const stats = {
    volume: 10,
    negative_rate: 1.0,
    urgency: 'high', // weight 1.0
    repeat_contact_risk: 'high' // weight 1.0
  };
  const maxVolume = 10; // normalized = 1.0

  const result = calculatePriorityScore(stats, maxVolume);

  // Expected: (0.30*1.0 + 0.25*1.0 + 0.25*1.0 + 0.20*1.0) * 100 = 100.0
  assert.equal(result.score, 100.0);
  assert.equal(result.breakdown.volume.contribution, 30.0);
  assert.equal(result.breakdown.negative_rate.contribution, 25.0);
  assert.equal(result.breakdown.urgency.contribution, 25.0);
  assert.equal(result.breakdown.repeat_contact_risk.contribution, 20.0);
});

test('Priority: Correctly handles low-urgency positive cluster', () => {
  const stats = {
    volume: 5,
    negative_rate: 0.0,
    urgency: 'low', // weight 0.2
    repeat_contact_risk: 'low' // weight 0.1
  };
  const maxVolume = 10; // normalized = 0.5

  const result = calculatePriorityScore(stats, maxVolume);

  // Vol contrib: 0.30 * 0.5 * 100 = 15.0
  // Neg contrib: 0
  // Urg contrib: 0.25 * 0.2 * 100 = 5.0
  // Repeat contrib: 0.20 * 0.1 * 100 = 2.0
  // Total = 22.0
  assert.equal(result.score, 22.0);
});

test('Clustering: Aggregates interactions and ranks clusters descending by priority', () => {
  const mockInteractions = [
    {
      interaction_id: 'INT-1',
      channel: 'Call Centre',
      redacted_text: 'Deducted 8 AZN unjustly',
      analysis: { topic: 'Unexpected Data Charges', sentiment: 'negative', urgency: 'high', repeat_contact_risk: 'high', suggested_owner: 'Billing', summary: 'Deduction' }
    },
    {
      interaction_id: 'INT-2',
      channel: 'Chat',
      redacted_text: 'Deducted 12 AZN extra',
      analysis: { topic: 'Unexpected Data Charges', sentiment: 'negative', urgency: 'high', repeat_contact_risk: 'high', suggested_owner: 'Billing', summary: 'Deduction 2' }
    },
    {
      interaction_id: 'INT-3',
      channel: 'Review',
      redacted_text: 'Thanks for great support',
      analysis: { topic: 'Positive Support Feedback', sentiment: 'positive', urgency: 'low', repeat_contact_risk: 'low', suggested_owner: 'Support', summary: 'Thanks' }
    }
  ];

  const clusters = aggregateIssueClusters(mockInteractions);

  assert.equal(clusters.length, 2);
  assert.equal(clusters[0].topic, 'Unexpected Data Charges');
  assert.equal(clusters[0].volume, 2);
  assert.equal(clusters[0].suggested_owner, 'Billing');
  assert.ok(clusters[0].priority_score > clusters[1].priority_score);
});
