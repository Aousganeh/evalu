import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rulesBasedAnalyze } from '../server/ai.js';

test('Fallback: Correctly classifies Azerbaijani billing issues', () => {
  const text = 'Salam, bu gün balansdan səbəbsiz 8 AZN çıxıldı. Xahiş edirəm pulu qaytarın.';
  const res = rulesBasedAnalyze(text, 'az');

  assert.equal(res.sentiment, 'negative');
  assert.equal(res.topic, 'Unexpected Data Charges');
  assert.equal(res.suggested_owner, 'Billing');
  assert.equal(res.urgency, 'high');
  assert.equal(res.model_used, 'rules-based');
  assert.equal(res.inference_type, 'rules-based');
  assert.ok(res.fallback_reason.length > 0);
});

test('Fallback: Correctly classifies Russian network degradation', () => {
  const text = 'В районе метро Сахил постоянно пропадает 4G, скорость упала до нуля.';
  const res = rulesBasedAnalyze(text, 'ru');

  assert.equal(res.sentiment, 'negative');
  assert.equal(res.topic, 'Network Slowdown & Coverage');
  assert.equal(res.suggested_owner, 'Network');
  assert.equal(res.model_used, 'rules-based');
  assert.equal(res.inference_type, 'rules-based');
});

test('Fallback: Correctly classifies English SIM/OTP issues', () => {
  const text = 'Unable to receive two-factor authentication OTP SMS after eSIM transfer.';
  const res = rulesBasedAnalyze(text, 'en');

  assert.equal(res.sentiment, 'negative');
  assert.equal(res.topic, 'SIM Card & OTP Issues');
  assert.equal(res.suggested_owner, 'Support');
  assert.equal(res.urgency, 'high');
  assert.equal(res.model_used, 'rules-based');
});

test('Fallback: Correctly classifies multilingual positive feedback', () => {
  const azText = 'Zəng mərkəzindən Fuad bəy məsələmi 5 dəqiqəyə həll etdi, əla xidmətə görə minnətdaram!';
  const ruText = 'Оператор Анна очень вежливо и быстро помогла, отличная поддержка, спасибо!';
  const enText = 'Super quick and professional customer support from the call centre representative!';

  const azRes = rulesBasedAnalyze(azText, 'az');
  const ruRes = rulesBasedAnalyze(ruText, 'ru');
  const enRes = rulesBasedAnalyze(enText, 'en');

  assert.equal(azRes.sentiment, 'positive');
  assert.equal(azRes.topic, 'Positive Support Feedback');
  assert.equal(ruRes.sentiment, 'positive');
  assert.equal(enRes.sentiment, 'positive');
});

test('Fallback: Accurately flags ambiguous or unmatched text', () => {
  const ambiguous = 'Test message checking random symbols 1234 hello';
  const res = rulesBasedAnalyze(ambiguous, 'en');

  assert.equal(res.topic, 'General Inquiries / Ambiguous');
  assert.equal(res.sentiment, 'neutral');
  assert.ok(res.confidence < 0.6);
  assert.ok(res.fallback_reason.includes('ambiguous'));
});
