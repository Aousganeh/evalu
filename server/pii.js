/**
 * Evalu PII Redaction Engine
 * 
 * Deterministically detects and redacts personal identifiers before
 * text is forwarded to internal AI model analysis or fallback pipelines:
 * - Phone numbers (Azerbaijani +994, Russian +7 / 8, North American +1, international)
 * - Email addresses
 * - Credit / debit card-like numbers (16-digit spaced/dashed/continuous)
 * - Patterned Account / Customer IDs (e.g., ACC-xxxx, CUST-xxxx, FIN: xxxxxxx, ID: xxxx)
 */

// Regex patterns
const EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

// Card patterns: 16 digits formatted with spaces, hyphens, or grouped
const CARD_REGEX = /\b(?:\d{4}[-\s]){3}\d{4}\b|\b\d{16}\b/g;

// Patterned Account / Customer IDs / National FIN codes
const ACCOUNT_ID_REGEX = /\b(?:ACC|CUST)-\d+\b/gi;
const FIN_CODE_REGEX = /\bFIN:\s*[A-Z0-9]{7}\b/gi;
const USER_ID_LABEL_REGEX = /\b(?:hesab kodum|şəxsi kabinet ID|лицевой счет|аккаунт|клиент ID|account|customer ID|ID):\s*([A-Za-z0-9-]+)\b/gi;

// Phone numbers: international (+994, +7, +1, +44) & local variations
const PHONE_REGEX = /(?:\+994[\s-]?(?:50|51|55|70|77|99|12)[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2})|(?:\b0(?:50|51|55|70|77|99)[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}\b)|(?:\+7[\s-]?(?:\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2})|(?:\b8[\s-]?(?:\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}\b)|(?:\+1[\s-]?(?:\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4})|(?:\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b)/g;

/**
 * Redacts PII from text deterministically
 * @param {string} text - Raw customer interaction text
 * @returns {{ redactedText: string, redactions: Array<{ type: string, original: string, replacement: string }> }}
 */
export function redactPII(text) {
  if (!text || typeof text !== 'string') {
    return { redactedText: '', redactions: [] };
  }

  let redactedText = text;
  const redactions = [];

  // 1. Redact Emails first (prevents email digits from being flagged as phones/IDs)
  redactedText = redactedText.replace(EMAIL_REGEX, (match) => {
    redactions.push({ type: 'EMAIL', original: match, replacement: '[REDACTED_EMAIL]' });
    return '[REDACTED_EMAIL]';
  });

  // 2. Redact Card numbers (16-digit patterns)
  redactedText = redactedText.replace(CARD_REGEX, (match) => {
    // Basic sanity check: ensure it's not a simple timestamp or innocuous sequence
    const digitsOnly = match.replace(/\D/g, '');
    if (digitsOnly.length === 16) {
      redactions.push({ type: 'CARD', original: match, replacement: '[REDACTED_CARD]' });
      return '[REDACTED_CARD]';
    }
    return match;
  });

  // 3. Redact Phone numbers
  redactedText = redactedText.replace(PHONE_REGEX, (match) => {
    redactions.push({ type: 'PHONE', original: match, replacement: '[REDACTED_PHONE]' });
    return '[REDACTED_PHONE]';
  });

  // 4. Redact FIN Codes
  redactedText = redactedText.replace(FIN_CODE_REGEX, (match) => {
    redactions.push({ type: 'FIN_CODE', original: match, replacement: '[REDACTED_FIN]' });
    return '[REDACTED_FIN]';
  });

  // 5. Redact Patterned Account IDs (ACC-xxxx, CUST-xxxx)
  redactedText = redactedText.replace(ACCOUNT_ID_REGEX, (match) => {
    redactions.push({ type: 'ACCOUNT_ID', original: match, replacement: '[REDACTED_ACCOUNT_ID]' });
    return '[REDACTED_ACCOUNT_ID]';
  });

  // 6. Redact explicit ID labels (e.g. "şəxsi kabinet ID: 44102", "лицевой счет 99401")
  redactedText = redactedText.replace(USER_ID_LABEL_REGEX, (fullMatch, idGroup) => {
    // Avoid double-redacting already redacted placeholders
    if (idGroup.startsWith('[REDACTED_')) {
      return fullMatch;
    }
    redactions.push({ type: 'ACCOUNT_ID', original: idGroup, replacement: '[REDACTED_ACCOUNT_ID]' });
    return fullMatch.replace(idGroup, '[REDACTED_ACCOUNT_ID]');
  });

  return {
    redactedText,
    redactions
  };
}
