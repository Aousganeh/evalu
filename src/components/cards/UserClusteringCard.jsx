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

const UserClusteringCard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const clusterData = useMemo(() => [
      { segment: 'Casual users', percentage: 38.76, color: '#4C6FBF', gradient: 'url(#casualGradient)' },    // Muted blue
      { segment: 'Power bankers', percentage: 36.18, color: '#2F8F7C', gradient: 'url(#powerGradient)' },  // Muted emerald green
      { segment: 'App uninstallers', percentage: 24.55, color: '#D87A80', gradient: 'url(#uninstallerGradient)' }
  ], []);

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
            marginBottom: '8px',
            paddingBottom: '8px',
            borderBottom: '2px solid #e2e8f0'
          }}>
            {data.segment}
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: '800',
            background: `linear-gradient(135deg, ${data.color} 0%, ${data.color}dd 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {data.percentage}%
          </div>
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
        minHeight: '280px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: '16px' }}>Loading clustering analysis...</div>
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
        minHeight: '280px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute',
        top: -30,
        right: -30,
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: -20,
        left: -20,
        width: '120px',
        height: '120px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
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
          User clustering analysis
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
          <BarChart
            data={clusterData}
            layout="vertical"
            margin={{ top: 10, right: 20, bottom: 10, left: 5 }}
          ><defs>
              <linearGradient id="casualGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4C6FBF" stopOpacity={1} />  {/* Muted blue start */}
                  <stop offset="100%" stopColor="#3B5AA3" stopOpacity={1} /> {/* Slightly darker muted blue end */}
              </linearGradient>

              <linearGradient id="powerGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2F8F7C" stopOpacity={1} />  {/* Muted emerald green start */}
                  <stop offset="100%" stopColor="#246F66" stopOpacity={1} /> {/* Darker muted green end */}
              </linearGradient>

              <linearGradient id="uninstallerGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#D87A80" stopOpacity={1} />  {/* Dusty red start */}
                  <stop offset="100%" stopColor="#B85C63" stopOpacity={1} /> {/* Darker dusty red end */}
              </linearGradient>
          </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              dataKey="segment"
              type="category"
              width={90}
              tick={{ fontSize: 13, fill: '#475569', fontWeight: '600' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="percentage" radius={[0, 12, 12, 0]} barSize={50}>
              {clusterData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.gradient} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '24px',
        marginTop: '16px',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 1
      }}>
        {clusterData.map((item, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            background: '#f8fafc',
            borderRadius: '8px',
            border: `2px solid ${item.color}30`
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              borderRadius: '4px',
              background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
              boxShadow: `0 2px 4px ${item.color}40`
            }}></div>
            <span style={{ fontSize: '13px', color: '#475569', fontWeight: '600' }}>
              {item.segment}: <strong style={{ color: item.color }}>{item.percentage}%</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserClusteringCard;
