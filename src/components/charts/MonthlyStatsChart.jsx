import React, { useState, useEffect, useMemo } from 'react';
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { mockApi } from '../../utils/data/mockData';

const MonthlyStatsChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeLine, setActiveLine] = useState(null);

  useEffect(() => {
    const fetchMonthlyStats = async () => {
      try {
        setLoading(true);
        const data = await mockApi.getMonthlyStats();
        setMonthlyData(data);
      } catch (err) {
        console.error('Error fetching monthly stats:', err);
        setError('Failed to load monthly statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyStats();
  }, []);

  const getMonthName = (month) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[month - 1] || month;
  };

  const processedData = useMemo(() => {
    if (!monthlyData.length) return [];

    const sortedData = [...monthlyData].sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });

    return sortedData.map(item => {
      const total = item.positiveCount + item.negativeCount;
      const positivePercentage = total > 0 ? ((item.positiveCount / total) * 100).toFixed(1) : 0;
      const negativePercentage = total > 0 ? ((item.negativeCount / total) * 100).toFixed(1) : 0;

      return {
        ...item,
        monthLabel: `${getMonthName(item.month)} ${item.year}`,
        total,
        positivePercentage: parseFloat(positivePercentage),
        negativePercentage: parseFloat(negativePercentage),
        satisfaction: total > 0 ? Math.max(0, 100 - (item.negativeCount / total) * 50) : 100
      };
    });
  }, [monthlyData]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const total = data.total || 0;
      const positiveCount = data.positiveCount || 0;
      const negativeCount = data.negativeCount || 0;

      return (
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(10px)',
          minWidth: '280px'
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#0f172a'
                  }}>
                    {entry.value}
                  </span>
                  {entry.dataKey === 'positiveCount' && (
                    <span style={{
                      fontSize: '12px',
                        color: '#2F8F7C',
                        marginLeft: '4px'
                    }}>
                      ({data.positivePercentage}%)
                    </span>
                  )}
                  {entry.dataKey === 'negativeCount' && (
                    <span style={{
                      fontSize: '12px',
                      color: '#D87A80',
                      marginLeft: '4px'
                    }}>
                      ({data.negativePercentage}%)
                    </span>
                  )}
                </div>
              </div>
            ))}

              <div
                  style={{
                      marginTop: '8px',
                      padding: '8px 12px',
                      backgroundColor:
                          data.satisfaction >= 80
                              ? '#D4E9E2'  // Muted green
                              : data.satisfaction >= 60
                                  ? '#F7E7C6'  // Soft gold
                                  : '#F5D3D1', // Dusty red
                      borderRadius: '6px',
                      textAlign: 'center',
                  }}
              >
  <span
      style={{
          fontSize: '12px',
          fontWeight: 600,
          color:
              data.satisfaction >= 80
                  ? '#2F8F7C' // Dark muted green
                  : data.satisfaction >= 60
                      ? '#BFA25C' // Dark soft gold
                      : '#D87A80', // Dusty red
      }}
  >
    Satisfaction Score: {data.satisfaction.toFixed(1)}%
  </span>
              </div>

            {data.mostNegativeTopic && (
              <div style={{
                padding: '8px 12px',
                backgroundColor: '#f1f5f9',
                borderRadius: '6px'
              }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#334155'
                }}>
                  Top Concern: {data.mostNegativeTopic}
                </span>
              </div>
            )}
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
        alignItems: 'center',
        gap: '20px',
        marginBottom: '16px',
        width: '100%',
        padding: '0',
        margin: '0 auto 16px auto'
      }}>
        {payload.map((entry, index) => (
          <div
            key={index}
            onMouseEnter={() => setActiveLine(entry.dataKey)}
            onMouseLeave={() => setActiveLine(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              borderRadius: '20px',
              backgroundColor: activeLine === entry.dataKey ? entry.color + '15' : '#f8fafc',
              border: `1px solid ${activeLine === entry.dataKey ? entry.color : '#e2e8f0'}`,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              transform: activeLine === entry.dataKey ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: entry.color,
              boxShadow: `0 0 0 2px ${entry.color}30`,
              opacity: activeLine && activeLine !== entry.dataKey ? 0.3 : 1
            }}></div>
            <span style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#374151',
              opacity: activeLine && activeLine !== entry.dataKey ? 0.5 : 1
            }}>
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const getLineOpacity = (dataKey) => {
    if (!activeLine) return 1;
    return activeLine === dataKey ? 1 : 0.3;
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
        minHeight: '450px',
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
            Loading Monthly Statistics...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        background: 'transparent',
        borderRadius: '20px',
        padding: '24px',
        border: 'none',
        boxShadow: 'none',
        height: '100%',
        minHeight: '450px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
              backgroundColor: '#F9ECEC', // Soft dusty red background
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
          }}>
              <span style={{ color: '#D87A80', fontSize: '24px' }}>⚠️</span>
          </div>
            <div style={{
                textAlign: 'center',
                color: '#D87A80', // Dusty red for text
            fontSize: '16px',
            fontWeight: '500'
          }}>
            Error loading data
          </div>
          <div style={{
            textAlign: 'center',
            color: '#64748b',
            fontSize: '14px'
          }}>
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!processedData.length) {
    return (
      <div style={{
        background: 'transparent',
        borderRadius: '20px',
        padding: '24px',
        border: 'none',
        boxShadow: 'none',
        height: '100%',
        minHeight: '450px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: '#64748b', fontSize: '24px' }}>📊</span>
          </div>
          <div style={{
            textAlign: 'center',
            color: '#64748b',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            No data available
          </div>
          <div style={{
            textAlign: 'center',
            color: '#94a3b8',
            fontSize: '14px'
          }}>
            Monthly statistics will appear here
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
        minHeight: '450px',
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
        background: 'radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.02) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(239, 68, 68, 0.02) 0%, transparent 50%)',
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
          Monthly Review Statistics
        </h3>
        <p style={{
          fontSize: '13px',
          color: '#64748b',
          margin: '4px 0 0 0',
          fontWeight: '400'
        }}>
          Positive vs Negative Review Trends
        </p>
      </div>

      <div 
        className="chart-container-wrapper"
        style={{
          flex: 1,
          minHeight: '350px',
          height: '350px',
          position: 'relative',
          zIndex: 2,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={processedData}
            margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
          >
            <defs>
              <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="negativeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              opacity={0.5}
            />
            <XAxis
              dataKey="monthLabel"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#64748b',
                fontSize: 11,
                fontWeight: 500
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              width={35}
              tick={{
                fill: '#64748b',
                fontSize: 11,
                fontWeight: 500
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            <ReferenceLine
              y={50}
              stroke="#64748b"
              strokeDasharray="2 2"
              strokeOpacity={0.3}
              label={{
                value: "Average Target",
                position: "insideTopRight",
                fill: '#64748b',
                fontSize: 10
              }}
            />
            <Area
              type="monotone"
              dataKey="positiveCount"
              stroke="#10b981"
              fill="url(#positiveGradient)"
              strokeWidth={3}
              dot={{
                fill: '#10b981',
                stroke: '#ffffff',
                strokeWidth: 2,
                r: 5,
                filter: 'drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3))'
              }}
              activeDot={{
                r: 7,
                fill: '#10b981',
                stroke: '#ffffff',
                strokeWidth: 3,
                filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.4))'
              }}
              opacity={getLineOpacity('positiveCount')}
              name="Positive Reviews"
            />
            <Area
              type="monotone"
              dataKey="negativeCount"
              stroke="#ef4444"
              fill="url(#negativeGradient)"
              strokeWidth={3}
              dot={{
                fill: '#D87A80',
                stroke: '#ffffff',
                strokeWidth: 2,
                r: 5,
                filter: 'drop-shadow(0 2px 4px rgba(239, 68, 68, 0.3))'
              }}
              activeDot={{
                r: 7,
                fill: '#ef4444',
                stroke: '#ffffff',
                strokeWidth: 3,
                filter: 'drop-shadow(0 4px 8px rgba(239, 68, 68, 0.4))'
              }}
              opacity={getLineOpacity('negativeCount')}
              name="Negative Reviews"
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{
                fill: '#3b82f6',
                stroke: '#ffffff',
                strokeWidth: 2,
                r: 4,
                filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))'
              }}
              activeDot={{
                r: 6,
                fill: '#3b82f6',
                stroke: '#ffffff',
                strokeWidth: 3,
                filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.4))'
              }}
              opacity={getLineOpacity('total')}
              name="Total Reviews"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyStatsChart; 