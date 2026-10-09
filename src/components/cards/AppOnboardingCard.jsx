import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const AppOnboardingCard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const funnelData = useMemo(() => [
    { stage: 'Application started', users: 24640, percentage: 100 },
    { stage: 'Application abandoned', users: 5965, percentage: 24.2 },
    { stage: 'Application restarted', users: 18675, percentage: 75.8 },
    { stage: 'Application completed', users: 5667, percentage: 23.0 }
  ], []);

  const conversionRate = 23.0;
  const dropOffRate = 28.0;
  const trendChange = 3.0;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '2px solid #e2e8f0',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '10px',
            paddingBottom: '8px',
            borderBottom: '2px solid #e2e8f0'
          }}>
            {data.stage}
          </div>
          <div style={{
            fontSize: '20px',
            fontWeight: '800',
            color: '#0f172a',
            marginBottom: '6px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {data.users.toLocaleString()} users
          </div>
          <div style={{
            fontSize: '12px',
            color: '#64748b',
            fontWeight: '500',
            padding: '6px 10px',
            background: '#f1f5f9',
            borderRadius: '6px',
            display: 'inline-block'
          }}>
            {data.percentage}% of started
          </div>
        </div>
      );
    }
    return null;
  };

  const getBarColor = (stage) => {
    if (stage === 'Application started') return 'url(#startedGradient)';
    if (stage === 'Application abandoned') return 'url(#abandonedGradient)';
    if (stage === 'Application restarted') return 'url(#restartedGradient)';
    return 'url(#completedGradient)';
  };

  if (loading) {
    return (
      <div style={{
        background: 'transparent',
        borderRadius: '16px',
        padding: '24px',
        border: 'none',
        boxShadow: 'none',
        height: '100%',
        minHeight: '350px',
        display: 'flex',
        alignItems: 'center',
          justifyContent: 'flex-start'
      }}>
        <div style={{ textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: '16px' }}>Loading analysis...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
        background: 'transparent',
        borderRadius: '20px',
        padding: '24px',
        border: 'none',
        boxShadow: 'none',
        height: '100%',
        minHeight: '350px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }}></div>

      {/* Header */}
      <div style={{ marginBottom: '20px', position: 'relative', zIndex: 1 }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#0f172a',
          margin: '0 0 12px 0',
          letterSpacing: '-0.02em'
        }}>
          Analysis for app onboarding
        </h3>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
            borderRadius: '8px',
            border: '1px solid #86efac'
          }}>
            <span style={{ fontSize: '14px', color: '#166534' }}>↑</span>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#166534' }}>
              {trendChange}% to convert
            </span>
          </div>
          <div style={{
            fontSize: '13px',
            color: '#475569',
            fontWeight: '500',
            padding: '6px 12px',
            background: '#f1f5f9',
            borderRadius: '8px'
          }}>
            {conversionRate}% Conversion rate
          </div>
          <div style={{
            fontSize: '13px',
            color: '#475569',
            fontWeight: '500',
            padding: '6px 12px',
            background: '#fef2f2',
            borderRadius: '8px',
            border: '1px solid #fecaca'
          }}>
            {dropOffRate}% drop-off ({funnelData[1].users.toLocaleString()} of {funnelData[0].users.toLocaleString()})
          </div>
        </div>
      </div>

      {/* Chart */}
      <div 
        className="chart-container-wrapper"
        style={{ 
          flex: 1, 
          minHeight: '250px',
          height: '250px',
          position: 'relative', 
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={funnelData}
            layout="vertical"
            margin={{ top: 10, right: 20, bottom: 10, left: 5 }}
          >
            <defs>
              <linearGradient id="startedGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="abandonedGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />
                <stop offset="100%" stopColor="#dc2626" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="restartedGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
                <stop offset="100%" stopColor="#d97706" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="completedGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                <stop offset="100%" stopColor="#059669" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
            <XAxis type="number" hide />
            <YAxis
              dataKey="stage"
              type="category"
              width={100}
              tick={{ fontSize: 13, fill: '#475569', fontWeight: '500' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="users" radius={[0, 12, 12, 0]} barSize={50}>
              {funnelData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.stage)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Actions dropdown placeholder */}
      <div style={{
        marginTop: '12px',
        paddingTop: '12px',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <button style={{
          background: 'transparent',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          padding: '6px 12px',
          fontSize: '12px',
          color: '#64748b',
          cursor: 'pointer'
        }}>
          Actions ▼
        </button>
      </div>
    </div>
  );
};

export default AppOnboardingCard;
