/**
 * Evalu Issue Clustering and Explainable Priority Scoring Engine
 * 
 * Aggregates analyzed customer interactions into root-cause clusters:
 * - Computes volume, negative rate, affected channels, sample evidence
 * - Derives modal/consensus urgency, repeat-contact risk, and suggested owner
 * - Calculates an explainable, deterministic Priority Score with factor breakdowns
 */

const URGENCY_WEIGHTS = {
  high: 1.0,
  medium: 0.6,
  low: 0.2
};

const REPEAT_RISK_WEIGHTS = {
  high: 1.0,
  medium: 0.5,
  low: 0.1
};

/**
 * Calculates priority score and detailed factor breakdown
 * Formula: Score = (0.30 * VolNorm + 0.25 * NegRate + 0.25 * UrgencyWeight + 0.20 * RepeatRiskWeight) * 100
 */
export function calculatePriorityScore(clusterStats, maxVolume = 1) {
  const volNorm = Math.min(1.0, clusterStats.volume / Math.max(1, maxVolume));
  const negRate = clusterStats.negative_rate;
  const urgWeight = URGENCY_WEIGHTS[clusterStats.urgency] ?? 0.2;
  const repWeight = REPEAT_RISK_WEIGHTS[clusterStats.repeat_contact_risk] ?? 0.1;

  const volContrib = +(0.30 * volNorm * 100).toFixed(1);
  const negContrib = +(0.25 * negRate * 100).toFixed(1);
  const urgContrib = +(0.25 * urgWeight * 100).toFixed(1);
  const repContrib = +(0.20 * repWeight * 100).toFixed(1);

  const totalScore = +(volContrib + negContrib + urgContrib + repContrib).toFixed(1);

  return {
    score: totalScore,
    formula: 'Score = (0.30 × VolumeNorm + 0.25 × NegativeRate + 0.25 × UrgencyWeight + 0.20 × RepeatRiskWeight) × 100',
    breakdown: {
      volume: {
        raw: clusterStats.volume,
        normalized: +volNorm.toFixed(2),
        weight: 0.30,
        contribution: volContrib
      },
      negative_rate: {
        raw: +negRate.toFixed(2),
        weight: 0.25,
        contribution: negContrib
      },
      urgency: {
        level: clusterStats.urgency,
        weight: +urgWeight.toFixed(2),
        factor_weight: 0.25,
        contribution: urgContrib
      },
      repeat_contact_risk: {
        level: clusterStats.repeat_contact_risk,
        weight: +repWeight.toFixed(2),
        factor_weight: 0.20,
        contribution: repContrib
      }
    }
  };
}

/**
 * Aggregates analyzed interactions into issue clusters
 * @param {Array<object>} interactions - List of analyzed interactions
 * @returns {Array<object>} Ranked clusters with priority explanations
 */
export function aggregateIssueClusters(interactions) {
  if (!Array.isArray(interactions) || interactions.length === 0) {
    return [];
  }

  const clustersByTopic = {};

  // Group by topic
  for (const item of interactions) {
    const analysis = item.analysis || {};
    const topic = analysis.topic || 'General Inquiries / Ambiguous';

    if (!clustersByTopic[topic]) {
      clustersByTopic[topic] = {
        topic,
        items: [],
        channels: new Set(),
        sentiments: { positive: 0, neutral: 0, negative: 0 },
        urgencies: { low: 0, medium: 0, high: 0 },
        repeat_risks: { low: 0, medium: 0, high: 0 },
        owners: {}
      };
    }

    const group = clustersByTopic[topic];
    group.items.push(item);
    if (item.channel) group.channels.add(item.channel);

    const sent = analysis.sentiment || 'neutral';
    group.sentiments[sent] = (group.sentiments[sent] || 0) + 1;

    const urg = analysis.urgency || 'low';
    group.urgencies[urg] = (group.urgencies[urg] || 0) + 1;

    const risk = analysis.repeat_contact_risk || 'low';
    group.repeat_risks[risk] = (group.repeat_risks[risk] || 0) + 1;

    const owner = analysis.suggested_owner || 'Other';
    group.owners[owner] = (group.owners[owner] || 0) + 1;
  }

  // Find max volume for normalization
  const topicsList = Object.values(clustersByTopic);
  const maxVolume = Math.max(...topicsList.map(g => g.items.length), 1);

  // Helper for mode selection
  const getMode = (countsObj, fallback) => {
    let bestKey = fallback;
    let maxCount = -1;
    for (const [key, count] of Object.entries(countsObj)) {
      if (count > maxCount) {
        maxCount = count;
        bestKey = key;
      }
    }
    return bestKey;
  };

  const aggregated = topicsList.map(group => {
    const volume = group.items.length;
    const negativeCount = group.sentiments.negative || 0;
    const negativeRate = +(negativeCount / volume).toFixed(2);

    // Pick highest/dominant urgency
    let dominantUrgency = 'low';
    if (group.urgencies.high > 0 && group.urgencies.high >= group.urgencies.medium) dominantUrgency = 'high';
    else if (group.urgencies.medium > 0) dominantUrgency = 'medium';

    // Pick highest/dominant repeat risk
    let dominantRisk = 'low';
    if (group.repeat_risks.high > 0 && group.repeat_risks.high >= group.repeat_risks.medium) dominantRisk = 'high';
    else if (group.repeat_risks.medium > 0) dominantRisk = 'medium';

    const dominantOwner = getMode(group.owners, 'Support');

    // Extract sample quotes using REDACTED text only
    const sampleEvidence = group.items
      .slice(0, 3)
      .map(item => ({
        interaction_id: item.interaction_id,
        channel: item.channel,
        language: item.language,
        text: item.redacted_text || item.text,
        summary: item.analysis?.summary || ''
      }));

    const stats = {
      volume,
      negative_rate: negativeRate,
      urgency: dominantUrgency,
      repeat_contact_risk: dominantRisk
    };

    const priority = calculatePriorityScore(stats, maxVolume);

    return {
      topic: group.topic,
      volume,
      negative_count: negativeCount,
      negative_rate: negativeRate,
      affected_channels: Array.from(group.channels),
      urgency: dominantUrgency,
      repeat_contact_risk: dominantRisk,
      suggested_owner: dominantOwner,
      sample_evidence: sampleEvidence,
      priority_score: priority.score,
      priority_formula: priority.formula,
      priority_breakdown: priority.breakdown,
      interaction_ids: group.items.map(i => i.interaction_id)
    };
  });

  // Sort descending by priority score
  aggregated.sort((a, b) => b.priority_score - a.priority_score);

  return aggregated;
}
