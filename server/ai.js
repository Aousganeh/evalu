/**
 * Evalu AI Provider Adapter, Schema Validator, and Rules-based Fallback
 * 
 * Supports:
 * - Environment variable configuration: AI_BASE_URL, AI_API_KEY, AI_MODEL
 * - Strict schema validation
 * - Single automatic retry for invalid schema output
 * - Transparent rules-based fallback with explicit provenance tagging
 * - Multilingual keyword rules for Azerbaijani, Russian, and English
 */

import dotenv from 'dotenv';
dotenv.config();

const ALLOWED_SENTIMENTS = ['positive', 'neutral', 'negative'];
const ALLOWED_URGENCIES = ['low', 'medium', 'high'];
const ALLOWED_OWNERS = ['Billing', 'Network', 'Support', 'Product', 'Other'];
const ALLOWED_REPEAT_RISKS = ['low', 'medium', 'high'];

/**
 * Validates analysis output against strict JSON schema
 * @param {any} data 
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateAnalysisSchema(data) {
  const errors = [];

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Output must be a valid JSON object'] };
  }

  // sentiment
  if (!ALLOWED_SENTIMENTS.includes(data.sentiment)) {
    errors.push(`Invalid sentiment: "${data.sentiment}". Must be one of: ${ALLOWED_SENTIMENTS.join(', ')}`);
  }

  // topic
  if (typeof data.topic !== 'string' || data.topic.trim().length === 0) {
    errors.push('Field "topic" must be a non-empty string');
  }

  // summary
  if (typeof data.summary !== 'string' || data.summary.trim().length === 0) {
    errors.push('Field "summary" must be a non-empty string');
  }

  // urgency
  if (!ALLOWED_URGENCIES.includes(data.urgency)) {
    errors.push(`Invalid urgency: "${data.urgency}". Must be one of: ${ALLOWED_URGENCIES.join(', ')}`);
  }

  // suggested_owner
  if (!ALLOWED_OWNERS.includes(data.suggested_owner)) {
    errors.push(`Invalid suggested_owner: "${data.suggested_owner}". Must be one of: ${ALLOWED_OWNERS.join(', ')}`);
  }

  // repeat_contact_risk
  if (!ALLOWED_REPEAT_RISKS.includes(data.repeat_contact_risk)) {
    errors.push(`Invalid repeat_contact_risk: "${data.repeat_contact_risk}". Must be one of: ${ALLOWED_REPEAT_RISKS.join(', ')}`);
  }

  // confidence
  if (typeof data.confidence !== 'number' || data.confidence < 0 || data.confidence > 1 || isNaN(data.confidence)) {
    errors.push('Field "confidence" must be a number between 0 and 1');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Deterministic Rules-Based Multilingual Fallback Engine
 * Analyzes redacted text across Azerbaijani, Russian, and English
 * @param {string} text - Redacted customer text
 * @param {string} [language] - Optional ISO language hint (az, ru, en)
 * @param {string} [reason] - Fallback rationale
 * @returns {object} Strict schema-compliant analysis
 */
export function rulesBasedAnalyze(text, language = 'en', reason = 'Rules-based demo fallback') {
  const lower = (text || '').toLowerCase();

  // Check 1: Positive Support Feedback
  const isPositive = 
    lower.includes('təşəkkür') || lower.includes('minnətdaram') || lower.includes('əla və operativ') ||
    lower.includes('çox sağ olun') || lower.includes('əla xidmət') || lower.includes('operativ xidmətə') ||
    lower.includes('спасибо') || lower.includes('поблагодарить') || lower.includes('отличная поддержка') ||
    lower.includes('прекрасно') || lower.includes('отличная работа') ||
    lower.includes('thank you') || lower.includes('super quick') || lower.includes('outstanding') ||
    lower.includes('highly satisfied') || lower.includes('kudos') || lower.includes('excellent');

  if (isPositive) {
    return {
      sentiment: 'positive',
      topic: 'Positive Support Feedback',
      summary: 'Customer expressed high satisfaction with prompt support assistance.',
      urgency: 'low',
      suggested_owner: 'Support',
      repeat_contact_risk: 'low',
      confidence: 0.94,
      model_used: 'rules-based',
      inference_type: 'rules-based',
      fallback_reason: reason
    };
  }

  // Check 2: Unexpected Data Charges / Billing
  const isBilling = 
    lower.includes('balans') || lower.includes('çıxıldı') || lower.includes('pul tutulub') ||
    lower.includes('azn') || lower.includes('rouminq borcu') || lower.includes('qaytarın') ||
    lower.includes('xərci') || lower.includes('списали') || lower.includes('списание') ||
    lower.includes('манат') || lower.includes('сняли') || lower.includes('подписк') ||
    lower.includes('возврат') || lower.includes('charge') || lower.includes('charged') ||
    lower.includes('billed') || lower.includes('invoice') || lower.includes('subscription') ||
    lower.includes('refund') || lower.includes('fee');

  if (isBilling) {
    return {
      sentiment: 'negative',
      topic: 'Unexpected Data Charges',
      summary: 'Customer reports unexpected deductions or disputed data charges.',
      urgency: 'high',
      suggested_owner: 'Billing',
      repeat_contact_risk: 'high',
      confidence: 0.92,
      model_used: 'rules-based',
      inference_type: 'rules-based',
      fallback_reason: reason
    };
  }

  // Check 3: SIM Card & OTP Issues
  const isSimOtp = 
    lower.includes('sim') || lower.includes('esim') || lower.includes('otp') ||
    lower.includes('təsdiq') || lower.includes('sms-lər') || lower.includes('sms') ||
    lower.includes('puk') || lower.includes('сим-карт') || lower.includes('смс') ||
    lower.includes('код') || lower.includes('авторизаци') || lower.includes('двухфакторн') ||
    lower.includes('two-factor') || lower.includes('verification code') || lower.includes('delivery gateway');

  if (isSimOtp) {
    return {
      sentiment: 'negative',
      topic: 'SIM Card & OTP Issues',
      summary: 'Failure delivering SMS OTP authentication codes or SIM provisioning issue.',
      urgency: 'high',
      suggested_owner: 'Support',
      repeat_contact_risk: 'high',
      confidence: 0.89,
      model_used: 'rules-based',
      inference_type: 'rules-based',
      fallback_reason: reason
    };
  }

  // Check 4: Mobile App Login & Crash
  const isAppIssue = 
    lower.includes('tətbiq') || lower.includes('çökür') || lower.includes('bağlanır') ||
    lower.includes('proqram') || lower.includes('giriş') || lower.includes('приложени') ||
    lower.includes('вылетает') || lower.includes('face id') || lower.includes('черный экран') ||
    lower.includes('ошибка сервера') || lower.includes('app') || lower.includes('crash') ||
    lower.includes('login') || lower.includes('splash screen') || lower.includes('credentials');

  if (isAppIssue) {
    return {
      sentiment: 'negative',
      topic: 'Mobile App Login & Crash',
      summary: 'Mobile application crashes or authentication authentication failure prevents login.',
      urgency: 'medium',
      suggested_owner: 'Product',
      repeat_contact_risk: 'medium',
      confidence: 0.88,
      model_used: 'rules-based',
      inference_type: 'rules-based',
      fallback_reason: reason
    };
  }

  // Check 5: Network Slowdown & Coverage
  const isNetwork = 
    lower.includes('4g') || lower.includes('5g') || lower.includes('internet') ||
    lower.includes('şəbəkə') || lower.includes('sürət') || lower.includes('kəsilir') ||
    lower.includes('modem') || lower.includes('связь') || lower.includes('скорость') ||
    lower.includes('вышка') || lower.includes('роутер') || lower.includes('пропадает') ||
    lower.includes('network') || lower.includes('slow') || lower.includes('signal') ||
    lower.includes('timeout') || lower.includes('packet loss') || lower.includes('ping') ||
    lower.includes('dropping');

  if (isNetwork) {
    return {
      sentiment: 'negative',
      topic: 'Network Slowdown & Coverage',
      summary: 'Degraded mobile network coverage, slow data speeds, or recurrent drops.',
      urgency: 'medium',
      suggested_owner: 'Network',
      repeat_contact_risk: 'medium',
      confidence: 0.86,
      model_used: 'rules-based',
      inference_type: 'rules-based',
      fallback_reason: reason
    };
  }

  // Ambiguous / Unmatched edge case
  return {
    sentiment: 'neutral',
    topic: 'General Inquiries / Ambiguous',
    summary: 'Customer communication requires manual review or clarification.',
    urgency: 'low',
    suggested_owner: 'Other',
    repeat_contact_risk: 'low',
    confidence: 0.45,
    model_used: 'rules-based',
    inference_type: 'rules-based',
    fallback_reason: `${reason}: Text pattern ambiguous or unmatched by deterministic taxonomy`
  };
}

/**
 * Builds the strict JSON extraction prompt
 */
function buildPrompt(text, language) {
  return `You are an internal telecom operations analysis AI.
Analyze the following customer interaction (which has already had PII redacted) and return ONLY a single JSON object.

Language: ${language || 'unknown'}
Text: """${text}"""

The JSON response MUST strictly follow this schema with no extra text or markdown formatting:
{
  "sentiment": "positive" | "neutral" | "negative",
  "topic": string (e.g. "Unexpected Data Charges", "Network Slowdown & Coverage", "SIM Card & OTP Issues", "Mobile App Login & Crash", "Positive Support Feedback"),
  "summary": string (one concise sentence summarizing the core customer issue),
  "urgency": "low" | "medium" | "high",
  "suggested_owner": "Billing" | "Network" | "Support" | "Product" | "Other",
  "repeat_contact_risk": "low" | "medium" | "high",
  "confidence": number (between 0.0 and 1.0)
}`;
}

/**
 * Analyzes interaction with configured internal AI model, with 1 retry and rules-based fallback
 * @param {object} interaction - { text, language, interaction_id, ... }
 * @param {object} [simulationOptions] - Optional simulation hook for tests { forceInvalidJson: boolean, forceApiUnavailable: boolean }
 * @returns {Promise<object>} Analysis object compliant with schema
 */
export async function analyzeInteraction(interaction, simulationOptions = {}) {
  const text = interaction.text || '';
  const language = interaction.language || 'en';

  const baseUrl = process.env.AI_BASE_URL || 'https://api.openai.com/v1';
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL || 'gpt-4o-mini';

  // 1. Simulation options for failure case demonstrations
  if (simulationOptions.forceApiUnavailable) {
    return rulesBasedAnalyze(text, language, 'Simulated Failure: Model API endpoint unavailable (HTTP 503)');
  }

  if (simulationOptions.forceInvalidJson) {
    // Model returns invalid JSON on first pass, then fallback engages after retry
    return rulesBasedAnalyze(text, language, 'Simulated Failure: Model returned invalid schema structure after retry');
  }

  // 2. Check if API Key is configured
  if (!apiKey || apiKey.trim() === '') {
    return rulesBasedAnalyze(text, language, 'No AI_API_KEY provided; operating in deterministic rules-based mode');
  }

  // 3. Attempt Model call with 1 retry
  let attempt = 0;
  let lastError = null;

  while (attempt < 2) {
    attempt++;
    try {
      const response = await fetch(`${baseUrl.replace(/\/+$/, '')}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'system',
              content: 'You are Evalu AI. You only output valid JSON conforming exactly to the requested schema. No code fences, no explanations.'
            },
            {
              role: 'user',
              content: attempt === 1 
                ? buildPrompt(text, language) 
                : `${buildPrompt(text, language)}\n\nIMPORTANT: Your previous output failed schema validation with errors: ${lastError}. Fix the JSON to strictly conform to schema.`
            }
          ],
          temperature: 0.1,
          response_format: { type: 'json_object' }
        }),
        signal: AbortSignal.timeout(8000) // 8s timeout
      });

      if (!response.ok) {
        throw new Error(`AI API returned status ${response.status}: ${response.statusText}`);
      }

      const resBody = await response.json();
      const content = resBody.choices?.[0]?.message?.content?.trim();

      if (!content) {
        throw new Error('AI API returned empty response content');
      }

      // Parse JSON
      let parsed;
      try {
        parsed = JSON.parse(content);
      } catch (e) {
        throw new Error(`JSON parse error: ${e.message}`);
      }

      // Validate schema
      const validation = validateAnalysisSchema(parsed);
      if (validation.valid) {
        return {
          ...parsed,
          model_used: model,
          inference_type: 'ai',
          fallback_reason: null
        };
      } else {
        lastError = validation.errors.join('; ');
        // If first attempt failed validation, loop will retry once with lastError
      }
    } catch (err) {
      lastError = err.message;
      // Network/auth/endpoint failure: do not hammer if outright connection error
      if (attempt === 1 && !err.message.includes('JSON parse error') && !err.message.includes('schema')) {
        break;
      }
    }
  }

  // If we reach here, model call or schema validation failed twice
  return rulesBasedAnalyze(text, language, `AI model inference failed (${lastError || 'validation failed'}); engaged fallback`);
}
