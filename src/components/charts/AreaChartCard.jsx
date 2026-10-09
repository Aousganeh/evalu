import React, { useState, useEffect, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

const AreaChartCard = () => {
  const [loading, setLoading] = useState(true);
  const [activeMetric, setActiveMetric] = useState(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  const financialData = useMemo(() => [
    { month: 'Jan', revenue: 12000, costs: 8000, profit: 4000, growth: 8.3 },
    { month: 'Feb', revenue: 15000, costs: 9500, profit: 5500, growth: 25.0 },
    { month: 'Mar', revenue: 18000, costs: 11000, profit: 7000, growth: 27.3 },
    { month: 'Apr', revenue: 22000, costs: 13000, profit: 9000, growth: 22.2 },
    { month: 'May', revenue: 25000, costs: 15000, profit: 10000, growth: 13.6 },
    { month: 'Jun', revenue: 28000, costs: 17000, profit: 11000, growth: 12.0 },
    { month: 'Jul', revenue: 32000, costs: 19000, profit: 13000, growth: 14.3 },
    { month: 'Aug', revenue: 29000, costs: 18500, profit: 10500, growth: -9.4 },
    { month: 'Sep', revenue: 35000, costs: 21000, profit: 14000, growth: 20.7 },
    { month: 'Oct', revenue: 38000, costs: 23000, profit: 15000, growth: 8.6 },
    { month: 'Nov', revenue: 42000, costs: 25000, profit: 17000, growth: 10.5 },
    { month: 'Dec', revenue: 45000, costs: 27000, profit: 18000, growth: 7.1 }
  ], []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(10px)',
          minWidth: '240px'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '12px',
            textAlign: 'center'
          }}>
            {label} 2024
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
                ${entry.value?.toLocaleString()}
              </span>
            </div>
          ))}
          {data.growth && (
            <div style={{
              marginTop: '12px',
              padding: '8px 12px',
              backgroundColor: data.growth >= 0 ? '#dcfce7' : '#fef2f2',
              borderRadius: '6px',
              textAlign: 'center'
            }}>
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                  color: data.growth >= 0 ? '#2F8F7C' : '#D87A80'              }}>
                Growth: {data.growth >= 0 ? '+' : ''}{data.growth.toFixed(1)}%
              </span>
            </div>
          )}
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
        gap: '20px',
        marginBottom: '16px'
      }}>
        {payload.map((entry, index) => (
          <div
            key={index}
            onMouseEnter={() => setActiveMetric(entry.dataKey)}
            onMouseLeave={() => setActiveMetric(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              borderRadius: '20px',
              backgroundColor: activeMetric === entry.dataKey ? entry.color + '15' : '#f8fafc',
              border: `1px solid ${activeMetric === entry.dataKey ? entry.color : '#e2e8f0'}`,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              transform: activeMetric === entry.dataKey ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: entry.color,
              boxShadow: `0 0 0 2px ${entry.color}30`,
              opacity: activeMetric && activeMetric !== entry.dataKey ? 0.3 : 1
            }}></div>
            <span style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#374151',
              opacity: activeMetric && activeMetric !== entry.dataKey ? 0.5 : 1
            }}>
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const formatYAxis = (value) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    return `$${value}`;
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
          background: 'linear-gradient(45deg, transparent 30%, rgba(16, 185, 129, 0.03) 50%, transparent 70%)',
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
            borderTop: '3px solid #10b981',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <div style={{
            textAlign: 'center',
            color: '#64748b',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            Loading Financial Overview...
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
        background: 'radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.02) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(239, 68, 68, 0.02) 0%, transparent 50%)',
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
          Financial Overview
        </h3>
        <p style={{
          fontSize: '13px',
          color: '#64748b',
          margin: '4px 0 0 0',
          fontWeight: '400'
        }}>
          Revenue, Costs & Profit Trends
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
          <AreaChart
            data={financialData}
            margin={{ top: 10, right: 20, bottom: 10, left: 5 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="50%" stopColor="#10b981" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="costsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="50%" stopColor="#ef4444" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              opacity={0.5}
            />
            <XAxis
              dataKey="month"
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
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            <ReferenceLine
              y={30000}
              stroke="#10b981"
              strokeDasharray="5 5"
              strokeOpacity={0.3}
              label={{
                value: "Revenue Target",
                position: "topRight",
                fill: '#10b981',
                fontSize: 11
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stackId="1"
              stroke="#10b981"
              fill="url(#revenueGradient)"
              strokeWidth={3}
              dot={{
                  fill: '#2F8F7C',
                  stroke: '#ffffff',
                strokeWidth: 2,
                r: 4,
                filter: 'drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3))'
              }}
              activeDot={{
                r: 6,
                  fill: '#2F8F7C',
                  stroke: '#ffffff',
                strokeWidth: 3,
                filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.4))'
              }}
              opacity={activeMetric && activeMetric !== 'revenue' ? 0.3 : 1}
            />
            <Area
              type="monotone"
              dataKey="costs"
              stackId="2"
              stroke="#ef4444"
              fill="url(#costsGradient)"
              strokeWidth={3}
              dot={{
                  fill: '#D87A80',
                  stroke: '#ffffff',
                strokeWidth: 2,
                r: 4,
                filter: 'drop-shadow(0 2px 4px rgba(239, 68, 68, 0.3))'
              }}
              activeDot={{
                r: 6,
                  fill: '#D87A80',
                  stroke: '#ffffff',
                strokeWidth: 3,
                filter: 'drop-shadow(0 4px 8px rgba(239, 68, 68, 0.4))'
              }}
              opacity={activeMetric && activeMetric !== 'costs' ? 0.3 : 1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaChartCard;


