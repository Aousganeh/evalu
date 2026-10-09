import React from 'react';
import { 
  Bell, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingDown, 
  CheckCircle, 
  X,
  ExternalLink
} from 'lucide-react';

export default function NotificationsPopover({ isOpen, onClose, onNavigate }) {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Urgent Issue Spike: Billing & Balance',
      message: 'Call Centre interactions report +14.2% surge in unexpected roaming charges.',
      time: '5m ago',
      unread: true,
      action: 'pipeline'
    },
    {
      id: 2,
      type: 'shield',
      title: 'Zero-PII Ingestion Scrubbed',
      message: '57 synthetic PII tokens (Azerbaijani phone numbers, card PANs) redacted with 100% determinism.',
      time: '18m ago',
      unread: true,
      action: 'pipeline'
    },
    {
      id: 3,
      type: 'impact',
      title: 'Closed-Loop Success Measured',
      message: 'Weekly repeat contact rate dropped by 83.4% following operator SMS confirmation rollout.',
      time: '42m ago',
      unread: false,
      action: 'pipeline'
    },
    {
      id: 4,
      type: 'info',
      title: 'Multilingual Ingestion Ready',
      message: '45 interactions indexed across Azerbaijani, Russian, and English channels.',
      time: '1h ago',
      unread: false,
      action: 'reviews'
    }
  ];

  return (
    <div 
      style={{
        position: 'absolute',
        top: '64px',
        right: '20px',
        width: '380px',
        background: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 12px 36px -4px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        zIndex: 1000,
        overflow: 'hidden',
        animation: 'slideIn 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #F1F5F9',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#F8FAFC'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={16} color="#2563EB" />
          <span style={{ fontWeight: '700', fontSize: '14px', color: '#0F172A' }}>Enterprise Notifications</span>
          <span style={{
            background: '#EFF6FF',
            color: '#2563EB',
            fontSize: '11px',
            fontWeight: '700',
            padding: '2px 6px',
            borderRadius: '10px'
          }}>2 new</span>
        </div>
        <button
          onClick={onClose}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
        >
          <X size={16} />
        </button>
      </div>

      <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
        {notifications.map(n => (
          <div
            key={n.id}
            onClick={() => {
              if (onNavigate && n.action) onNavigate(n.action);
              onClose();
            }}
            style={{
              padding: '14px 20px',
              borderBottom: '1px solid #F1F5F9',
              background: n.unread ? '#F8FAFC' : '#FFFFFF',
              cursor: 'pointer',
              transition: 'background 0.2s',
              display: 'flex',
              gap: '12px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#F1F5F9'}
            onMouseLeave={(e) => e.currentTarget.style.background = n.unread ? '#F8FAFC' : '#FFFFFF'}
          >
            <div style={{ marginTop: '2px' }}>
              {n.type === 'alert' && <AlertTriangle size={18} color="#EF4444" />}
              {n.type === 'shield' && <ShieldCheck size={18} color="#10B981" />}
              {n.type === 'impact' && <TrendingDown size={18} color="#2563EB" />}
              {n.type === 'info' && <CheckCircle size={18} color="#64748B" />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{n.title}</span>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>{n.time}</span>
              </div>
              <p style={{ fontSize: '12px', color: '#475569', margin: '4px 0 0 0', lineHeight: '1.4' }}>
                {n.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        padding: '10px 20px',
        background: '#F8FAFC',
        textAlign: 'center',
        borderTop: '1px solid #F1F5F9'
      }}>
        <span style={{ fontSize: '11px', color: '#64748B' }}>
          All alerts synced with Evalu telemetry stream
        </span>
      </div>
    </div>
  );
}
