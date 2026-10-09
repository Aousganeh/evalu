import React, { useState, useEffect, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const UninstallsFirstOpensCard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const data = useMemo(() => [
    { date: 'Jan 01', uninstalls: 12000, firstOpens: 35000 },
    { date: 'Jan 05', uninstalls: 15000, firstOpens: 38000 },
    { date: 'Jan 10', uninstalls: 18000, firstOpens: 42000 },
    { date: 'Jan 15', uninstalls: 22000, firstOpens: 45000 },
    { date: 'Jan 20', uninstalls: 25000, firstOpens: 48000 },
    { date: 'Jan 25', uninstalls: 28000, firstOpens: 50000 },
    { date: 'Feb 01', uninstalls: 30000, firstOpens: 52000 },
    { date: 'Feb 05', uninstalls: 32000, firstOpens: 48000 },
    { date: 'Feb 10', uninstalls: 35000, firstOpens: 45000 }
  ], []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '2px solid #e2e8f0',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)',
          minWidth: '200px'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '12px',
            paddingBottom: '8px',
            borderBottom: '2px solid #e2e8f0'
          }}>
            {label}
          </div>
          {payload.map((entry, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              marginBottom: index === payload.length - 1 ? 0 : '10px',
              padding: '8px',
              background: '#f8fafc',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: entry.color,
                  boxShadow: `0 0 0 3px ${entry.color}20`
                }}></div>
                <span style={{ fontSize: '13px', color: '#475569', fontWeight: '600' }}>
                  {entry.name}
                </span>
              </div>
              <span style={{
                fontSize: '16px',
                fontWeight: '800',
                color: '#0f172a'
              }}>
                {entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
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
        minHeight: '320px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: '16px' }}>Loading chart...</div>
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
      minHeight: '320px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute',
        top: -50,
        right: -50,
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: -30,
        left: -30,
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        pointerEvents: 'none'
      }}></div>

      {/* Header */}
      <div style={{ marginBottom: '20px', position: 'relative', zIndex: 1 }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#0f172a',
          margin: '0 0 8px 0',
          letterSpacing: '-0.02em'
        }}>
          Uninstalls & first opens
        </h3>
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
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <defs>
              <linearGradient id="uninstallsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="firstOpensGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: '#475569', fontWeight: '500' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              width={35}
              tick={{ fontSize: 12, fill: '#475569', fontWeight: '500' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '13px', fontWeight: '600' }}
              iconType="line"
              formatter={(value) => (
                <span style={{ fontSize: '13px', color: '#475569', fontWeight: '600' }}>{value}</span>
              )}
            />
            <Line
              type="monotone"
              dataKey="uninstalls"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 4, strokeWidth: 2, stroke: '#ffffff' }}
              activeDot={{ r: 7, fill: '#2563eb', stroke: '#ffffff', strokeWidth: 3 }}
              name="Uninstalls"
            />
            <Line
              type="monotone"
              dataKey="firstOpens"
              stroke="#8b5cf6"
              strokeWidth={3}
              strokeDasharray="8 4"
              dot={{ fill: '#8b5cf6', r: 4, strokeWidth: 2, stroke: '#ffffff' }}
              activeDot={{ r: 7, fill: '#7c3aed', stroke: '#ffffff', strokeWidth: 3 }}
              name="First opens"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UninstallsFirstOpensCard;
