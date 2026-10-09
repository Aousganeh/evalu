import React, { useState, useEffect, useMemo } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Text
} from 'recharts';

const RadarChartCard = () => {
  const [loading, setLoading] = useState(true);
  const [hoveredData, setHoveredData] = useState(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const radarData = useMemo(() => [
    {
      subject: 'Customer Service',
      current: 85,
      target: 90,
      fullMark: 100
    },
    {
      subject: 'Product Quality',
      current: 78,
      target: 85,
      fullMark: 100
    },
    {
      subject: 'Technical Support',
      current: 92,
      target: 95,
      fullMark: 100
    },
    {
      subject: 'Delivery Speed',
      current: 76,
      target: 85,
      fullMark: 100
    },
    {
      subject: 'Value for Money',
      current: 88,
      target: 90,
      fullMark: 100
    },
    {
      subject: 'User Experience',
      current: 83,
      target: 88,
      fullMark: 100
    }
  ], []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(10px)',
          minWidth: '200px'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '12px',
            textAlign: 'center'
          }}>
            {label}
          </div>
          {payload.map((entry, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: index === payload.length - 1 ? 0 : '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: entry.color,
                  boxShadow: `0 0 0 2px ${entry.color}20`
                }}></div>
                <span style={{
                  fontSize: '13px',
                  color: '#475569',
                  fontWeight: '500'
                }}>
                  {entry.name}
                </span>
              </div>
              <span style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#0f172a'
              }}>
                {entry.value}%
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomLegend = (props) => {
    const { payload } = props;
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '24px',
        marginBottom: '16px'
      }}>
        {payload.map((entry, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            borderRadius: '20px',
            backgroundColor: entry.color + '15',
            border: `1px solid ${entry.color}30`,
            transition: 'all 0.2s ease'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: entry.color,
              boxShadow: `0 0 0 2px ${entry.color}30`
            }}></div>
            <span style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#374151'
            }}>
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const CustomPolarRadiusAxis = ({ payload, x, y, cx, cy }) => {
    if (payload.value % 20 === 0) {
      return (
        <Text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: '11px',
            fill: '#64748b',
            fontWeight: '500'
          }}
        >
          {payload.value}%
        </Text>
      );
    }
    return null;
  };

  if (loading) {
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
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.03) 50%, transparent 70%)',
          animation: 'shimmer 2s infinite'
        }}></div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          zIndex: 1
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid #e2e8f0',
            borderTop: '3px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <div style={{
            textAlign: 'center',
            color: '#64748b',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            Loading Performance Radar...
          </div>
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
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.02) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(16, 185, 129, 0.02) 0%, transparent 50%)',
        pointerEvents: 'none'
      }}></div>

      <div style={{
        textAlign: 'center',
        marginBottom: '20px',
        position: 'relative',
        zIndex: 2
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#0f172a',
          margin: 0,
          letterSpacing: '-0.025em'
        }}>
          Performance Radar
        </h3>
        <p style={{
          fontSize: '13px',
          color: '#64748b',
          margin: '4px 0 0 0',
          fontWeight: '400'
        }}>
          Current vs Target Performance Metrics
        </p>
      </div>

      <div style={{
        flex: 1,
        minHeight: '250px',
        position: 'relative',
        zIndex: 2
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <defs>
              <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="70%" stopColor="#3b82f6" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                <stop offset="70%" stopColor="#10b981" stopOpacity={0.08} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <PolarGrid
              gridType="polygon"
              stroke="#e2e8f0"
              strokeWidth={1}
              strokeDasharray="none"
            />
            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fill: '#475569',
                fontSize: 12,
                fontWeight: 500,
                textAnchor: 'middle'
              }}
              tickLine={false}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={<CustomPolarRadiusAxis />}
              tickCount={6}
              axisLine={false}
              tickLine={false}
            />
            <Radar
              name="Current Performance"
              dataKey="current"
              stroke="#3b82f6"
              fill="url(#currentGradient)"
              strokeWidth={3}
              dot={{
                  fill: '#4C6FBF', // Muted slate blue
                  stroke: '#ffffff',
                  strokeWidth: 2,
                  r: 5,
                  filter: 'drop-shadow(0 2px 4px rgba(76, 111, 191, 0.28))'
              }}
              activeDot={{
                  r: 7,
                  fill: '#4C6FBF',
                  stroke: '#ffffff',
                  strokeWidth: 3,
                  filter: 'drop-shadow(0 4px 8px rgba(76, 111, 191, 0.38))'
              }}
            />
            <Radar
              name="Target Performance"
              dataKey="target"
              stroke="#10b981"
              fill="url(#targetGradient)"
              strokeWidth={3}
              dot={{
                  fill: '#2F8F7C', // Muted emerald green
                  stroke: '#ffffff',
                  strokeWidth: 2,
                  r: 5,
                  filter: 'drop-shadow(0 2px 4px rgba(47, 143, 124, 0.28))'
              }}
              activeDot={{
                  r: 7,
                  fill: '#2F8F7C',
                  stroke: '#ffffff',
                  strokeWidth: 3,
                  filter: 'drop-shadow(0 4px 8px rgba(47, 143, 124, 0.38))'
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RadarChartCard;
