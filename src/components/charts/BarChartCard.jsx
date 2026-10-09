import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

const BarChartCard = () => {
  const [loading, setLoading] = useState(true);
  const [activeBar, setActiveBar] = useState(null);
  const [hoveredDataKey, setHoveredDataKey] = useState(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const activityData = useMemo(() => [
    {
      day: 'Mon',
      inquiries: 45,
      resolved: 35,
      pending: 10,
      satisfaction: 78,
      dayFull: 'Monday'
    },
    {
      day: 'Tue',
      inquiries: 52,
      resolved: 42,
      pending: 10,
      satisfaction: 82,
      dayFull: 'Tuesday'
    },
    {
      day: 'Wed',
      inquiries: 38,
      resolved: 31,
      pending: 7,
      satisfaction: 85,
      dayFull: 'Wednesday'
    },
    {
      day: 'Thu',
      inquiries: 67,
      resolved: 58,
      pending: 9,
      satisfaction: 79,
      dayFull: 'Thursday'
    },
    {
      day: 'Fri',
      inquiries: 89,
      resolved: 72,
      pending: 17,
      satisfaction: 76,
      dayFull: 'Friday'
    },
    {
      day: 'Sat',
      inquiries: 34,
      resolved: 29,
      pending: 5,
      satisfaction: 91,
      dayFull: 'Saturday'
    },
    {
      day: 'Sun',
      inquiries: 28,
      resolved: 22,
      pending: 6,
      satisfaction: 88,
      dayFull: 'Sunday'
    }
  ], []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const resolutionRate = ((data.resolved / data.inquiries) * 100).toFixed(1);

      return (
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(10px)',
          minWidth: '220px'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '12px',
            textAlign: 'center'
          }}>
            {data.dayFull}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {payload.map((entry, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
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
                  {entry.value}
                </span>
              </div>
            ))}

            <div style={{
              marginTop: '8px',
              padding: '8px 12px',
              backgroundColor: resolutionRate >= 80 ? '#dcfce7' : resolutionRate >= 60 ? '#fef3c7' : '#fee2e2',
              borderRadius: '6px',
              textAlign: 'center'
            }}>
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                color:
                    resolutionRate >= 80
                        ? '#2F8F7C'   // Muted success green
                        : resolutionRate >= 60
                            ? '#BFA25C' // Soft gold warning
                            : '#D87A80'              }}>
                Resolution Rate: {resolutionRate}%
              </span>
            </div>

            <div style={{
              padding: '8px 12px',
              backgroundColor: '#f1f5f9',
              borderRadius: '6px',
              textAlign: 'center'
            }}>
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#334155'
              }}>
                Satisfaction: {data.satisfaction}%
              </span>
            </div>
          </div>
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
        gap: '16px',
        marginBottom: '16px'
      }}>
        {payload.map((entry, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredDataKey(entry.dataKey)}
            onMouseLeave={() => setHoveredDataKey(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              borderRadius: '20px',
              backgroundColor: hoveredDataKey === entry.dataKey ? entry.color + '15' : '#f8fafc',
              border: `1px solid ${hoveredDataKey === entry.dataKey ? entry.color : '#e2e8f0'}`,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              transform: hoveredDataKey === entry.dataKey ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: entry.color,
              boxShadow: `0 0 0 2px ${entry.color}30`,
              opacity: hoveredDataKey && hoveredDataKey !== entry.dataKey ? 0.3 : 1
            }}></div>
            <span style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#374151',
              opacity: hoveredDataKey && hoveredDataKey !== entry.dataKey ? 0.5 : 1
            }}>
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Function to get bar color based on active state
  const getBarColor = (dataKey, index) => {
    if (dataKey === 'inquiries') {
      // Muted blues for inquiries
      return activeBar === `inquiries-${index}` ? '#4B8BBE' : '#7CAEDC';
    }
    if (dataKey === 'resolved') {
      // Muted greens for resolved
      return activeBar === `resolved-${index}` ? '#2F8F7C' : '#6FAF98';
    }
    // Fallback neutral
    return '#A0A0A0';
  };

// Function to get bar opacity based on hover
  const getBarOpacity = (dataKey) => {
    if (!hoveredDataKey) return 1;
    return hoveredDataKey === dataKey ? 1 : 0.4; // slightly higher base visibility than 0.3 for elegance
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
            Loading Weekly Activity...
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
        background: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.02) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.02) 0%, transparent 50%)',
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
          Weekly Activity
        </h3>
        <p style={{
          fontSize: '13px',
          color: '#64748b',
          margin: '4px 0 0 0',
          fontWeight: '400'
        }}>
          Customer Inquiries vs Resolutions
        </p>
      </div>

      <div
        className="chart-container-wrapper"
        style={{
          flex: 1,
          minHeight: '250px',
          height: '250px',
          position: 'relative',
          zIndex: 2,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={activityData}
            margin={{ top: 10, right: 20, bottom: 10, left: 5 }}
            barCategoryGap="20%"
            barGap={4}
          >
            <defs>
              <linearGradient id="inquiriesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.9} />
              </linearGradient>
              <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#047857" stopOpacity={0.9} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              opacity={0.5}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#64748b',
                fontSize: 12,
                fontWeight: 500
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              width={40}
              tick={{
                fill: '#64748b',
                fontSize: 11,
                fontWeight: 500
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            <Bar
              dataKey="inquiries"
              fill="url(#inquiriesGradient)"
              name="Customer Inquiries"
              radius={[4, 4, 0, 0]}
              opacity={getBarOpacity('inquiries')}
              onMouseEnter={(data, index) => setActiveBar(`inquiries-${index}`)}
              onMouseLeave={() => setActiveBar(null)}
            >
              {activityData.map((entry, index) => (
                <Cell
                  key={`inquiries-${index}`}
                  fill={getBarColor('inquiries', index)}
                  stroke={activeBar === `inquiries-${index}` ? '#4C6FBF' : 'none'}
                  strokeWidth={activeBar === `inquiries-${index}` ? 2 : 0}
                />
              ))}
            </Bar>
            <Bar
              dataKey="resolved"
              fill="url(#resolvedGradient)"
              name="Resolved Issues"
              radius={[4, 4, 0, 0]}
              opacity={getBarOpacity('resolved')}
              onMouseEnter={(data, index) => setActiveBar(`resolved-${index}`)}
              onMouseLeave={() => setActiveBar(null)}
            >
              {activityData.map((entry, index) => (
                <Cell
                  key={`resolved-${index}`}
                  fill={getBarColor('resolved', index)}
                  stroke={activeBar === `resolved-${index}` ? '#2F8F7C' : 'none'}
                  strokeWidth={activeBar === `resolved-${index}` ? 2 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartCard;


