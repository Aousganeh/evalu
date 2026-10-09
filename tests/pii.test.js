import { test } from 'node:test';
import assert from 'node:assert/strict';
import { redactPII } from '../server/pii.js';

test('PII: Redacts Azerbaijani phone numbers', () => {
  const input = 'Salam, nömrəm +994 50 234 56 78 və digər əlaqə 055-412-88-90 zəng edin.';
  const { redactedText, redactions } = redactPII(input);

  assert.equal(redactedText.includes('+994 50 234 56 78'), false);
  assert.equal(redactedText.includes('055-412-88-90'), false);
  assert.ok(redactedText.includes('[REDACTED_PHONE]'));
  assert.equal(redactions.filter(r => r.type === 'PHONE').length, 2);
});

test('PII: Redacts Russian and international phone numbers', () => {
  const input = 'Звоните на +7 916 234 56 78 или московский 8 (903) 555-01-92 или US +1 415 555 0199.';
  const { redactedText, redactions } = redactPII(input);

  assert.equal(redactedText.includes('+7 916 234 56 78'), false);
  assert.equal(redactedText.includes('+1 415 555 0199'), false);
  assert.ok(redactedText.includes('[REDACTED_PHONE]'));
  assert.ok(redactions.filter(r => r.type === 'PHONE').length >= 2);
});

test('PII: Redacts multilingual email addresses', () => {
  const input = 'Contact me at john.smith@company.com or leyla.a@box.az or svetlana@yandex.ru.';
  const { redactedText, redactions } = redactPII(input);

  assert.equal(redactedText.includes('john.smith@company.com'), false);
  assert.equal(redactedText.includes('leyla.a@box.az'), false);
  assert.equal(redactedText.includes('svetlana@yandex.ru'), false);
  assert.equal(redactions.filter(r => r.type === 'EMAIL').length, 3);
  assert.ok(redactedText.includes('[REDACTED_EMAIL]'));
});

test('PII: Redacts credit / debit card numbers with hyphens and spaces', () => {
  const input = 'Charged my Visa 4169-8201-9283-1102 and mastercard 5425 1234 5678 9012 without authorization.';
  const { redactedText, redactions } = redactPII(input);

  assert.equal(redactedText.includes('4169-8201-9283-1102'), false);
  assert.equal(redactedText.includes('5425 1234 5678 9012'), false);
  assert.equal(redactions.filter(r => r.type === 'CARD').length, 2);
  assert.ok(redactedText.includes('[REDACTED_CARD]'));
});

test('PII: Redacts patterned Account IDs, Customer IDs, and national FIN codes', () => {
  const input = 'Account ACC-9011 and customer CUST-8831 with FIN: 5A8B9C1 and şəxsi kabinet ID: 44102.';
  const { redactedText, redactions } = redactPII(input);

  assert.equal(redactedText.includes('ACC-9011'), false);
  assert.equal(redactedText.includes('CUST-8831'), false);
  assert.equal(redactedText.includes('5A8B9C1'), false);
  assert.ok(redactions.some(r => r.type === 'ACCOUNT_ID' || r.type === 'FIN_CODE'));
});
