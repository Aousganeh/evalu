import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Upload, 
  RotateCcw, 
  HelpCircle, 
  Filter, 
  ArrowRight, 
  UserCheck, 
  TrendingDown, 
  TrendingUp, 
  FileText,
  Clock,
  Sparkles,
  Info,
  Code
} from 'lucide-react';

export default function EvaluPipelinePage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [loading, setLoading] = useState(false);
  const [health, setHealth] = useState(null);
  const [stats, setStats] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [actions, setActions] = useState([]);
  const [closedLoop, setClosedLoop] = useState(null);

  // Filters
  const [languageFilter, setLanguageFilter] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');
  const [topicFilter, setTopicFilter] = useState('all');

  // Action Form State
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedClusterForAction, setSelectedClusterForAction] = useState(null);
  const [actionForm, setActionForm] = useState({
    cluster_topic: '',
    action_title: '',
    owner: 'Billing',
    due_date: '2026-10-31',
    status: 'in_progress',
    expected_success_metric: 'Reduce repeat contact volume by 50%'
  });

  // Failure simulation state
  const [simResult, setSimResult] = useState(null);
  const [simLoading, setSimLoading] = useState(false);

  // Fetch initial data
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [hRes, sRes, iRes, cRes, aRes, clRes] = await Promise.all([
        fetch('/api/health').then(r => r.json()).catch(() => null),
        fetch('/api/stats').then(r => r.json()).catch(() => null),
        fetch('/api/interactions').then(r => r.json()).catch(() => ({ interactions: [] })),
        fetch('/api/clusters').then(r => r.json()).catch(() => ({ clusters: [] })),
        fetch('/api/actions').then(r => r.json()).catch(() => ({ actions: [] })),
        fetch('/api/closed-loop').then(r => r.json()).catch(() => null)
      ]);

      if (hRes) setHealth(hRes);
      if (sRes) setStats(sRes);
      if (iRes) setInteractions(iRes.interactions || []);
      if (cRes) setClusters(cRes.clusters || []);
      if (aRes) setActions(aRes.actions || []);
      if (clRes) setClosedLoop(clRes);
    } catch (err) {
      console.error('Error fetching data from Evalu API:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // 1-Click Load Synthetic Dataset
  const handleLoadSampleDataset = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/load-sample', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        await loadAllData();
      }
    } catch (err) {
      console.error('Error loading sample dataset:', err);
    } finally {
      setLoading(false);
    }
  };

  // Reset Demo
  const handleResetDemo = async () => {
    if (!window.confirm('Reset local demo database to initial state?')) return;
    setLoading(true);
    try {
      await fetch('/api/reset', { method: 'POST' });
      await handleLoadSampleDataset();
    } catch (err) {
      console.error('Error resetting demo:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle CSV file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const text = evt.target?.result;
      if (!text) return;
      setLoading(true);
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'text/csv' },
          body: text
        });
        const data = await res.json();
        if (data.success) {
          await loadAllData();
        } else {
          alert('Upload failed: ' + (data.error || 'Unknown error'));
        }
      } catch (err) {
        alert('Upload error: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsText(file);
  };

  // Open Action Modal
  const openActionModal = (cluster) => {
    setSelectedClusterForAction(cluster);
    setActionForm({
      cluster_topic: cluster.topic,
      action_title: `Implement corrective intervention for ${cluster.topic}`,
      owner: cluster.suggested_owner || 'Support',
      due_date: '2026-10-31',
      status: 'in_progress',
      expected_success_metric: 'Reduce repeat contact volume by 50% within 3 weeks'
    });
    setShowActionModal(true);
  };

  // Submit Action
  const handleSaveAction = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(actionForm)
      });
      if (res.ok) {
        setShowActionModal(false);
        await loadAllData();
      } else {
        const err = await res.json();
        alert('Failed to save action: ' + (err.error || 'Error'));
      }
    } catch (err) {
      alert('Error creating action: ' + err.message);
    }
  };

  // Update Action Status
  const handleUpdateActionStatus = async (id, status) => {
    try {
      await fetch(`/api/actions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      await loadAllData();
    } catch (err) {
      console.error('Failed to update action:', err);
    }
  };

  // Run Failure Simulation
  const handleRunSimulation = async (caseType) => {
    setSimLoading(true);
    setSimResult(null);
    try {
      const res = await fetch('/api/simulate-failure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ case_type: caseType })
      });
      const data = await res.json();
      setSimResult(data);
    } catch (err) {
      setSimResult({ error: err.message });
    } finally {
      setSimLoading(false);
    }
  };

  // Filtered interactions
  const filteredInteractions = interactions.filter(item => {
    if (languageFilter !== 'all' && item.language !== languageFilter) return false;
    if (channelFilter !== 'all' && item.channel !== channelFilter) return false;
    if (topicFilter !== 'all' && item.analysis?.topic !== topicFilter) return false;
    return true;
  });

  const isModelLive = health?.ai_configuration?.api_key_configured;

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1440px', margin: '0 auto', fontFamily: 'Switzer, sans-serif' }}>
      {/* Top Banner & Control Center */}
      <div style={{
        background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
        color: '#FFFFFF',
        borderRadius: '16px',
        padding: '24px 28px',
        marginBottom: '24px',
        boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.25)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{
                background: '#3B82F6',
                color: '#FFFFFF',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '0.5px'
              }}>EVALU CORE PIPELINE</span>
              <span style={{ fontSize: '13px', color: '#94A3B8' }}>
                Enterprise Customer Intelligence & Closed-Loop Operations
              </span>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '8px 0 4px 0' }}>
              Multilingual Redaction, Extraction & Intervention Tracking
            </h1>
            <p style={{ fontSize: '14px', color: '#CBD5E1', margin: 0, maxWidth: '780px' }}>
              Ingesting synthetic call transcripts, CRM tickets, and chats across Azerbaijani, Russian, and English.
              Deterministically scrubs PII before model analysis, aggregates clusters with explainable priority scoring, and tracks intervention efficacy.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <label style={{
              background: '#334155',
              color: '#FFFFFF',
              padding: '9px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background 0.2s'
            }}>
              <Upload size={16} />
              Upload CSV
              <input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>

            <button
              onClick={handleLoadSampleDataset}
              disabled={loading}
              style={{
                background: '#2563EB',
                color: '#FFFFFF',
                border: 'none',
                padding: '9px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sparkles size={16} />
              {loading ? 'Processing...' : 'Load 45 Synthetic Records'}
            </button>

            <button
              onClick={handleResetDemo}
              disabled={loading}
              title="Reset Server JSON Store"
              style={{
                background: '#475569',
                color: '#FFFFFF',
                border: 'none',
                padding: '9px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Operational Status Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Cpu size={18} color="#60A5FA" />
            <div>
              <div style={{ fontSize: '11px', color: '#94A3B8' }}>ACTIVE MODEL</div>
              <div style={{ fontSize: '13px', fontWeight: '600' }}>
                {isModelLive ? (
                  <span style={{ color: '#10B981' }}>{health?.ai_configuration?.model} (Live Inference)</span>
                ) : (
                  <span style={{ color: '#FBBF24' }}>rules-based fallback (Demo Mode)</span>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={18} color="#34D399" />
            <div>
              <div style={{ fontSize: '11px', color: '#94A3B8' }}>PII REDACTION ENGINE</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#34D399' }}>
                {stats?.total_pii_redacted || 0} Redactions Scrubbed
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers size={18} color="#A78BFA" />
            <div>
              <div style={{ fontSize: '11px', color: '#94A3B8' }}>ISSUE CLUSTERS</div>
              <div style={{ fontSize: '13px', fontWeight: '600' }}>
                {clusters.length} Root Issues Ranked
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UserCheck size={18} color="#F472B6" />
            <div>
              <div style={{ fontSize: '11px', color: '#94A3B8' }}>OPERATOR ACTIONS</div>
              <div style={{ fontSize: '13px', fontWeight: '600' }}>
                {actions.length} Persisted in Local Store
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '2px solid #E2E8F0',
        marginBottom: '24px',
        overflowX: 'auto'
      }}>
        {[
          { id: 'pipeline', label: '1. Ingestion & PII Redaction', count: interactions.length },
          { id: 'analysis', label: '2. Structured Model Output', count: interactions.length },
          { id: 'clusters', label: '3. Issue Clusters & Scoring', count: clusters.length },
          { id: 'actions', label: '4. Operator Actions', count: actions.length },
          { id: 'closed_loop', label: '5. Closed-Loop Outcome', badge: 'Synthetic' },
          { id: 'failures', label: '6. Documented Failure Modes', badge: 'Test' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 18px',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === tab.id ? '3px solid #2563EB' : '3px solid transparent',
              color: activeTab === tab.id ? '#2563EB' : '#64748B',
              fontWeight: activeTab === tab.id ? '700' : '500',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span style={{
                background: activeTab === tab.id ? '#DBEAFE' : '#F1F5F9',
                color: activeTab === tab.id ? '#1D4ED8' : '#64748B',
                fontSize: '12px',
                padding: '2px 8px',
                borderRadius: '12px',
                fontWeight: '600'
              }}>{tab.count}</span>
            )}
            {tab.badge && (
              <span style={{
                background: tab.id === 'closed_loop' ? '#FEF3C7' : '#EDE9FE',
                color: tab.id === 'closed_loop' ? '#92400E' : '#6D28D9',
                fontSize: '11px',
                padding: '2px 7px',
                borderRadius: '10px',
                fontWeight: '700'
              }}>{tab.badge}</span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: Ingestion & PII Redaction */}
      {activeTab === 'pipeline' && (
        <div>
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <div style={{ fontWeight: '700', color: '#0F172A', fontSize: '15px' }}>
                Deterministic Pre-Inference PII Redaction
              </div>
              <div style={{ fontSize: '13px', color: '#64748B' }}>
                All sensitive identifiers (Azerbaijani/Russian/Intl phones, emails, 16-digit cards, account IDs) are scrubbed BEFORE inference.
              </div>
            </div>

            {/* Filter controls */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569' }}>
                <Filter size={14} />
                <span>Language:</span>
                <select
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                >
                  <option value="all">All (AZ, RU, EN)</option>
                  <option value="az">Azerbaijani (az)</option>
                  <option value="ru">Russian (ru)</option>
                  <option value="en">English (en)</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569' }}>
                <span>Channel:</span>
                <select
                  value={channelFilter}
                  onChange={(e) => setChannelFilter(e.target.value)}
                  style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                >
                  <option value="all">All Channels</option>
                  <option value="Call Centre">Call Centre</option>
                  <option value="Chat">Chat</option>
                  <option value="CRM Ticket">CRM Ticket</option>
                  <option value="Review">Review</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interactions Table with Redaction View */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead style={{ background: '#F1F5F9', borderBottom: '1px solid #E2E8F0', color: '#475569' }}>
                <tr>
                  <th style={{ padding: '12px 16px', width: '110px' }}>ID & Time</th>
                  <th style={{ padding: '12px 16px', width: '120px' }}>Channel / Lang</th>
                  <th style={{ padding: '12px 16px', width: '40%' }}>Raw Customer Interaction (Synthetic)</th>
                  <th style={{ padding: '12px 16px', width: '40%' }}>Redacted Text (Sent to Model)</th>
                  <th style={{ padding: '12px 16px', width: '120px' }}>Redactions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInteractions.map((item, idx) => (
                  <tr key={item.interaction_id || idx} style={{ borderBottom: '1px solid #F1F5F9', background: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                    <td style={{ padding: '12px 16px', verticalAlign: 'top' }}>
                      <div style={{ fontWeight: '600', color: '#1E293B' }}>{item.interaction_id}</div>
                      <div style={{ fontSize: '11px', color: '#94A3B8' }}>{item.timestamp?.split('T')[0]}</div>
                    </td>
                    <td style={{ padding: '12px 16px', verticalAlign: 'top' }}>
                      <div style={{ fontWeight: '500', color: '#334155' }}>{item.channel}</div>
                      <span style={{
                        display: 'inline-block',
                        background: '#EEF2FF',
                        color: '#4338CA',
                        fontSize: '11px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontWeight: '700',
                        marginTop: '4px'
                      }}>{item.language?.toUpperCase()}</span>
                    </td>
                    <td style={{ padding: '12px 16px', verticalAlign: 'top', color: '#334155', lineHeight: '1.5' }}>
                      {item.original_text || item.text}
                    </td>
                    <td style={{ padding: '12px 16px', verticalAlign: 'top', color: '#0F172A', lineHeight: '1.5' }}>
                      {renderHighlightedRedactions(item.redacted_text)}
                    </td>
                    <td style={{ padding: '12px 16px', verticalAlign: 'top' }}>
                      {item.redactions_count > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{
                            background: '#DCFCE7',
                            color: '#166534',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '700'
                          }}>
                            {item.redactions_count} scrubbed
                          </span>
                          <div style={{ fontSize: '11px', color: '#64748B' }}>
                            {Array.from(new Set(item.redactions?.map(r => r.type) || [])).join(', ')}
                          </div>
                        </div>
                      ) : (
                        <span style={{ color: '#94A3B8', fontSize: '12px' }}>None needed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Structured Model Output */}
      {activeTab === 'analysis' && (
        <div>
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <div style={{ fontWeight: '700', color: '#0F172A', fontSize: '15px' }}>
                Strict Structured JSON Extractions
              </div>
              <div style={{ fontSize: '13px', color: '#64748B' }}>
                Every customer interaction conforms to the strict schema (sentiment, topic, summary, urgency, suggested_owner, repeat_contact_risk, confidence).
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{
                background: '#DBEAFE',
                color: '#1E40AF',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                Provenance: {isModelLive ? `AI (${health?.ai_configuration?.model})` : 'Rules-Based Demo Fallback'}
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '16px' }}>
            {filteredInteractions.map((item, idx) => {
              const a = item.analysis || {};
              const isRules = a.inference_type === 'rules-based';

              return (
                <div key={item.interaction_id || idx} style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '18px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <span style={{ fontWeight: '700', color: '#1E293B', fontSize: '14px' }}>{item.interaction_id}</span>
                      <span style={{ color: '#94A3B8', fontSize: '12px', marginLeft: '8px' }}>{item.channel} • {item.language?.toUpperCase()}</span>
                    </div>

                    <span style={{
                      background: isRules ? '#FEF3C7' : '#DCFCE7',
                      color: isRules ? '#92400E' : '#166534',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '700'
                    }}>
                      {isRules ? 'rules-based' : `AI (${a.model_used})`}
                    </span>
                  </div>

                  <div style={{ fontSize: '13px', color: '#475569', marginBottom: '12px', fontStyle: 'italic', background: '#F8FAFC', padding: '8px 12px', borderRadius: '6px' }}>
                    "{item.redacted_text}"
                  </div>

                  {/* Schema Fields Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
                    <div>
                      <span style={{ color: '#64748B' }}>Topic:</span>
                      <div style={{ fontWeight: '600', color: '#0F172A' }}>{a.topic}</div>
                    </div>
                    <div>
                      <span style={{ color: '#64748B' }}>Suggested Owner:</span>
                      <div style={{ fontWeight: '600', color: '#2563EB' }}>{a.suggested_owner}</div>
                    </div>
                    <div>
                      <span style={{ color: '#64748B' }}>Sentiment:</span>
                      <div style={{ fontWeight: '600', color: a.sentiment === 'positive' ? '#10B981' : a.sentiment === 'negative' ? '#EF4444' : '#F59E0B' }}>
                        {a.sentiment?.toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <span style={{ color: '#64748B' }}>Urgency / Repeat Risk:</span>
                      <div style={{ fontWeight: '600', color: a.urgency === 'high' ? '#DC2626' : '#475569' }}>
                        {a.urgency} / {a.repeat_contact_risk}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Summary:</div>
                    <div style={{ fontSize: '13px', color: '#1E293B', fontWeight: '500' }}>{a.summary}</div>
                  </div>

                  {a.fallback_reason && (
                    <div style={{ marginTop: '8px', fontSize: '11px', color: '#B45309', background: '#FFFBEB', padding: '4px 8px', borderRadius: '4px' }}>
                      Fallback Note: {a.fallback_reason}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Issue Clusters & Priority Scoring */}
      {activeTab === 'clusters' && (
        <div>
          <div style={{
            background: 'linear-gradient(90deg, #F0FDF4 0%, #EFF6FF 100%)',
            border: '1px solid #BFDBFE',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '20px'
          }}>
            <div style={{ fontWeight: '700', color: '#1E3A8A', fontSize: '15px', marginBottom: '4px' }}>
              Explainable Priority Scoring Formula
            </div>
            <div style={{ fontSize: '13px', color: '#1E40AF', fontFamily: 'monospace' }}>
              Priority = (0.30 × VolumeNorm + 0.25 × NegativeRate + 0.25 × UrgencyWeight + 0.20 × RepeatRiskWeight) × 100
            </div>
            <div style={{ fontSize: '12px', color: '#475569', marginTop: '6px' }}>
              Weights: Volume (30%), Negative Sentiment Rate (25%), Urgency Weight (High: 1.0, Med: 0.6, Low: 0.2), Repeat Contact Risk (High: 1.0, Med: 0.5, Low: 0.1).
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {clusters.map((cluster, idx) => (
              <div key={cluster.topic} style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      background: idx === 0 ? '#FEF2F2' : '#F1F5F9',
                      color: idx === 0 ? '#DC2626' : '#475569',
                      border: idx === 0 ? '1px solid #FECACA' : '1px solid #CBD5E1',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '11px', fontWeight: '600' }}>PRIORITY</div>
                      <div style={{ fontSize: '18px', fontWeight: '800' }}>{cluster.priority_score.toFixed(1)}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>
                        {cluster.topic}
                      </div>
                      <div style={{ fontSize: '13px', color: '#64748B', display: 'flex', gap: '12px', marginTop: '4px' }}>
                        <span>Volume: <strong>{cluster.volume}</strong></span>
                        <span>Negative Rate: <strong>{(cluster.negative_rate * 100).toFixed(0)}%</strong></span>
                        <span>Urgency: <strong>{cluster.urgency}</strong></span>
                        <span>Owner: <strong style={{ color: '#2563EB' }}>{cluster.suggested_owner}</strong></span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => openActionModal(cluster)}
                    style={{
                      background: '#0F172A',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '9px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <UserCheck size={16} />
                    Assign Operator Action
                  </button>
                </div>

                {/* Factor Contribution Breakdown */}
                <div style={{
                  background: '#F8FAFC',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  marginTop: '16px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: '12px'
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>VOLUME FACTOR (30%)</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>
                      +{cluster.priority_breakdown?.volume?.contribution} pts
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>NEGATIVE SENTIMENT (25%)</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>
                      +{cluster.priority_breakdown?.negative_rate?.contribution} pts
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>URGENCY WEIGHT (25%)</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>
                      +{cluster.priority_breakdown?.urgency?.contribution} pts
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>REPEAT RISK (20%)</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>
                      +{cluster.priority_breakdown?.repeat_contact_risk?.contribution} pts
                    </div>
                  </div>
                </div>

                {/* Sample Evidence (Redacted) */}
                <div style={{ marginTop: '14px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>
                    SAMPLE CUSTOMER EVIDENCE (PII REDACTED):
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {cluster.sample_evidence?.map((ev, sIdx) => (
                      <div key={sIdx} style={{ fontSize: '12px', color: '#334155', background: '#FAFAFA', padding: '6px 10px', borderRadius: '4px', borderLeft: '3px solid #CBD5E1' }}>
                        <span style={{ fontWeight: '600', color: '#64748B', marginRight: '6px' }}>[{ev.channel} • {ev.language?.toUpperCase()}]:</span>
                        "{ev.text}"
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Operator Actions */}
      {activeTab === 'actions' && (
        <div>
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontWeight: '700', color: '#0F172A', fontSize: '15px' }}>
                Accountable Operator Corrective Actions
              </div>
              <div style={{ fontSize: '13px', color: '#64748B' }}>
                Persisted in server-side JSON store (<code style={{ background: '#E2E8F0', padding: '2px 4px', borderRadius: '4px' }}>server/data/db.json</code>). Changes survive server and browser reload.
              </div>
            </div>

            <button
              onClick={() => openActionModal({ topic: 'Unexpected Data Charges', suggested_owner: 'Billing' })}
              style={{
                background: '#2563EB',
                color: '#FFFFFF',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600'
              }}
            >
              + Create Action
            </button>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead style={{ background: '#F1F5F9', borderBottom: '1px solid #E2E8F0', color: '#475569' }}>
                <tr>
                  <th style={{ padding: '12px 16px' }}>Action ID</th>
                  <th style={{ padding: '12px 16px' }}>Target Issue Cluster</th>
                  <th style={{ padding: '12px 16px' }}>Action Title & Metric</th>
                  <th style={{ padding: '12px 16px' }}>Owner</th>
                  <th style={{ padding: '12px 16px' }}>Due Date</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {actions.map((act) => (
                  <tr key={act.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '14px 16px', fontWeight: '700', color: '#1E293B' }}>{act.id}</td>
                    <td style={{ padding: '14px 16px', fontWeight: '600', color: '#334155' }}>{act.cluster_topic}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: '600', color: '#0F172A' }}>{act.action_title}</div>
                      <div style={{ fontSize: '12px', color: '#2563EB', marginTop: '2px' }}>
                        Metric: {act.expected_success_metric}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#475569' }}>{act.owner}</td>
                    <td style={{ padding: '14px 16px', color: '#64748B' }}>{act.due_date}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <select
                        value={act.status}
                        onChange={(e) => handleUpdateActionStatus(act.id, e.target.value)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          fontSize: '12px',
                          fontWeight: '600',
                          background: act.status === 'completed' ? '#DCFCE7' : act.status === 'in_progress' ? '#FEF3C7' : '#F1F5F9',
                          color: act.status === 'completed' ? '#166534' : act.status === 'in_progress' ? '#92400E' : '#475569'
                        }}
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: Closed-Loop Outcome Verification */}
      {activeTab === 'closed_loop' && (
        <div>
          {/* Prominent Synthetic Demo Disclaimer */}
          <div style={{
            background: '#FFFBEB',
            border: '2px solid #FCD34D',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <AlertTriangle size={24} color="#D97706" />
            <div>
              <div style={{ fontWeight: '700', color: '#B45309', fontSize: '14px' }}>
                SYNTHETIC DEMO DATASET (SEEDED CLOSED-LOOP CASE STUDY)
              </div>
              <div style={{ fontSize: '13px', color: '#92400E' }}>
                This before/after comparison is based on seeded synthetic interactions designed to demonstrate Evalu's feedback reduction tracking. It is NOT real enterprise production telemetry.
              </div>
            </div>
          </div>

          {/* Intervention Overview Card */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
              <div>
                <span style={{ background: '#EFF6FF', color: '#1D4ED8', fontSize: '12px', padding: '4px 10px', borderRadius: '6px', fontWeight: '700' }}>
                  CASE STUDY: BILLING INTERVENTION
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '8px 0 4px 0' }}>
                  {closedLoop?.cluster_topic}
                </h2>
                <div style={{ fontSize: '14px', color: '#64748B' }}>
                  Action Applied: <strong>{closedLoop?.action_applied?.title}</strong> ({closedLoop?.action_applied?.owner})
                </div>
              </div>

              <div style={{
                background: '#ECFDF5',
                border: '1px solid #A7F3D0',
                padding: '10px 16px',
                borderRadius: '8px',
                color: '#065F46',
                fontWeight: '700',
                fontSize: '13px'
              }}>
                Status: {closedLoop?.baseline_vs_current?.status}
              </div>
            </div>

            {/* Before vs After Impact Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>WEEKLY MENTIONS</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
                  <span style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A' }}>
                    {closedLoop?.baseline_vs_current?.after_weekly_volume}
                  </span>
                  <span style={{ fontSize: '14px', color: '#94A3B8', textDecoration: 'line-through' }}>
                    {closedLoop?.baseline_vs_current?.before_weekly_volume}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#10B981', display: 'flex', alignItems: 'center' }}>
                    <TrendingDown size={14} /> -{closedLoop?.baseline_vs_current?.volume_reduction_pct}%
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>From 156/wk pre-fix to 18/wk post-fix</div>
              </div>

              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>REPEAT CONTACT RATE</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
                  <span style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A' }}>
                    {closedLoop?.baseline_vs_current?.after_repeat_contact_rate}%
                  </span>
                  <span style={{ fontSize: '14px', color: '#94A3B8', textDecoration: 'line-through' }}>
                    {closedLoop?.baseline_vs_current?.before_repeat_contact_rate}%
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#10B981', display: 'flex', alignItems: 'center' }}>
                    <TrendingDown size={14} /> -{closedLoop?.baseline_vs_current?.repeat_rate_reduction_pct}%
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Repeat contacts dropped by over 80%</div>
              </div>

              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>NEGATIVE SENTIMENT RATE</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
                  <span style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A' }}>24.0%</span>
                  <span style={{ fontSize: '14px', color: '#94A3B8', textDecoration: 'line-through' }}>91.0%</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#10B981', display: 'flex', alignItems: 'center' }}>
                    <TrendingDown size={14} /> -73.6%
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Customer escalation severity reduced</div>
              </div>
            </div>

            {/* Weekly Trajectory Timeline Table */}
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px', color: '#0F172A' }}>
              Weekly Feedback Trajectory Before & After Intervention
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead style={{ background: '#F1F5F9', borderBottom: '1px solid #E2E8F0', color: '#475569' }}>
                  <tr>
                    <th style={{ padding: '10px 14px' }}>Week Stage</th>
                    <th style={{ padding: '10px 14px' }}>Intervention Phase</th>
                    <th style={{ padding: '10px 14px' }}>Mentions</th>
                    <th style={{ padding: '10px 14px' }}>Repeat Contact Rate</th>
                    <th style={{ padding: '10px 14px' }}>Negative Sentiment</th>
                    <th style={{ padding: '10px 14px' }}>Trajectory Bar</th>
                  </tr>
                </thead>
                <tbody>
                  {closedLoop?.weekly_trend?.map((w, idx) => (
                    <tr key={idx} style={{
                      borderBottom: '1px solid #F1F5F9',
                      background: w.stage === 'intervention' ? '#FEF3C7' : w.stage === 'after' ? '#F0FDF4' : '#FFFFFF'
                    }}>
                      <td style={{ padding: '10px 14px', fontWeight: '700', color: '#1E293B' }}>{w.week}</td>
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: w.stage === 'before' ? '#FEE2E2' : w.stage === 'intervention' ? '#FDE68A' : '#DCFCE7',
                          color: w.stage === 'before' ? '#991B1B' : w.stage === 'intervention' ? '#92400E' : '#166534'
                        }}>
                          {w.stage?.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '10px 14px', fontWeight: '600' }}>{w.mentions}</td>
                      <td style={{ padding: '10px 14px' }}>{w.repeat_contact_pct}%</td>
                      <td style={{ padding: '10px 14px' }}>{w.negative_rate_pct}%</td>
                      <td style={{ padding: '10px 14px', width: '200px' }}>
                        <div style={{ background: '#E2E8F0', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
                          <div style={{
                            background: w.stage === 'after' ? '#10B981' : w.stage === 'intervention' ? '#F59E0B' : '#EF4444',
                            width: `${(w.mentions / 160) * 100}%`,
                            height: '100%'
                          }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: Documented Failure Modes Inspector */}
      {activeTab === 'failures' && (
        <div>
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '20px'
          }}>
            <div style={{ fontWeight: '700', color: '#0F172A', fontSize: '15px' }}>
              Deterministic Resilience & Documented Failure Cases
            </div>
            <div style={{ fontSize: '13px', color: '#64748B' }}>
              Evalu never hides failures. Click below to execute and observe the three documented failure scenarios:
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {/* Failure 1 */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ background: '#FEE2E2', color: '#991B1B', fontSize: '11px', fontWeight: '700', padding: '2px 6px', borderRadius: '4px' }}>CASE 1</span>
                <h3 style={{ fontSize: '15px', fontWeight: '700', margin: 0, color: '#0F172A' }}>Invalid Model JSON</h3>
              </div>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
                Simulates model generating invalid schema. Evalu automatically validates against JSON schema, retries once with error context, and transparently engages rules-based fallback tagged as "rules-based".
              </p>
              <button
                onClick={() => handleRunSimulation('invalid_json')}
                disabled={simLoading}
                style={{
                  background: '#EF4444',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              >
                Trigger Invalid JSON Case
              </button>
            </div>

            {/* Failure 2 */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ background: '#FEE2E2', color: '#991B1B', fontSize: '11px', fontWeight: '700', padding: '2px 6px', borderRadius: '4px' }}>CASE 2</span>
                <h3 style={{ fontSize: '15px', fontWeight: '700', margin: 0, color: '#0F172A' }}>Model / API Unavailable</h3>
              </div>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
                Simulates provider outage (HTTP 503 / network timeout / missing API key). Evalu catches error gracefully without crashing, falling back to deterministic keyword taxonomy with full attribution.
              </p>
              <button
                onClick={() => handleRunSimulation('api_unavailable')}
                disabled={simLoading}
                style={{
                  background: '#F59E0B',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              >
                Trigger API Outage Case
              </button>
            </div>

            {/* Failure 3 */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ background: '#FEE2E2', color: '#991B1B', fontSize: '11px', fontWeight: '700', padding: '2px 6px', borderRadius: '4px' }}>CASE 3</span>
                <h3 style={{ fontSize: '15px', fontWeight: '700', margin: 0, color: '#0F172A' }}>Ambiguous Multilingual Feedback</h3>
              </div>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
                Passes mixed, unclear, or non-telecom feedback ("Salam privet hello maybe yes test"). Evalu assigns low confidence (0.45) and routes to "General Inquiries / Ambiguous" for human operator inspection.
              </p>
              <button
                onClick={() => handleRunSimulation('ambiguous_multilingual')}
                disabled={simLoading}
                style={{
                  background: '#6366F1',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              >
                Trigger Ambiguous Feedback Case
              </button>
            </div>
          </div>

          {/* Simulation Output Display */}
          {simLoading && (
            <div style={{ padding: '20px', textAlign: 'center', color: '#64748B' }}>
              Executing failure simulation...
            </div>
          )}

          {simResult && !simLoading && (
            <div style={{
              background: '#0F172A',
              color: '#F8FAFC',
              borderRadius: '12px',
              padding: '20px',
              fontFamily: 'monospace',
              fontSize: '13px',
              overflowX: 'auto'
            }}>
              <div style={{ color: '#38BDF8', fontWeight: '700', marginBottom: '8px', fontSize: '14px' }}>
                // OBSERVABLE FAILURE RESPONSE FROM EVALU ENGINE:
              </div>
              <pre style={{ margin: 0 }}>{JSON.stringify(simResult, null, 2)}</pre>
            </div>
          )}
        </div>
      )}

      {/* Action Assignment Modal */}
      {showActionModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            width: '540px',
            maxWidth: '90%',
            padding: '24px 28px',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px', color: '#0F172A' }}>
              Assign Operator Action
            </h2>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '20px' }}>
              Creates an accountable operational intervention persisted to the server database.
            </p>

            <form onSubmit={handleSaveAction}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Cluster Topic:
                </label>
                <input
                  type="text"
                  value={actionForm.cluster_topic}
                  readOnly
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#F1F5F9', fontSize: '13px' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Action Title:
                </label>
                <input
                  type="text"
                  required
                  value={actionForm.action_title}
                  onChange={(e) => setActionForm({ ...actionForm, action_title: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Accountable Owner:
                  </label>
                  <select
                    value={actionForm.owner}
                    onChange={(e) => setActionForm({ ...actionForm, owner: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  >
                    <option value="Billing">Billing</option>
                    <option value="Network">Network</option>
                    <option value="Support">Support</option>
                    <option value="Product">Product</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Target Due Date:
                  </label>
                  <input
                    type="date"
                    required
                    value={actionForm.due_date}
                    onChange={(e) => setActionForm({ ...actionForm, due_date: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Expected Success Metric:
                </label>
                <input
                  type="text"
                  required
                  value={actionForm.expected_success_metric}
                  onChange={(e) => setActionForm({ ...actionForm, expected_success_metric: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowActionModal(false)}
                  style={{ background: '#F1F5F9', color: '#475569', border: 'none', padding: '9px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ background: '#2563EB', color: '#FFFFFF', border: 'none', padding: '9px 18px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
                >
                  Save & Persist Action
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper to highlight redactions in text
function renderHighlightedRedactions(text) {
  if (!text) return null;
  const parts = text.split(/(\[REDACTED_[A-Z_]+\])/g);

  return parts.map((part, i) => {
    if (part.startsWith('[REDACTED_')) {
      const type = part.replace('[REDACTED_', '').replace(']', '');
      return (
        <span
          key={i}
          style={{
            background: '#FEE2E2',
            color: '#991B1B',
            fontWeight: '700',
            padding: '2px 5px',
            borderRadius: '4px',
            fontSize: '11px',
            display: 'inline-block',
            margin: '0 2px'
          }}
        >
          [{type}]
        </span>
      );
    }
    return part;
  });
}
