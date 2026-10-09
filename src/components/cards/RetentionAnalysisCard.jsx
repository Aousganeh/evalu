import React, { useState, useEffect, useMemo } from 'react';

const RetentionAnalysisCard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const retentionData = useMemo(() => [
    { cohort: 'Jan 01, 2025', day0: 85, day1: 25, day2: 15, day3: null, day4: null },
    { cohort: 'Jan 02, 2025', day0: 85, day1: 25, day2: 15, day3: null, day4: null },
    { cohort: 'Jan 03, 2025', day0: 75, day1: 55, day2: 35, day3: 25, day4: 5 },
    { cohort: 'Jan 04, 2025', day0: 85, day1: 35, day2: 25, day3: 45, day4: null }
  ], []);

  const getColorIntensity = (value) => {
    if (value === null || value === undefined) return '#f8fafc'; // Neutral / no data

    if (value >= 70)
      return 'linear-gradient(135deg, #D1FAE5 0%, #6EE7B7 100%)'; // Soft mint-green (success)

    if (value >= 50)
      return 'linear-gradient(135deg, #FEF3C7 0%, #FCD34D 100%)'; // Elegant pastel gold (warning/medium)

    if (value >= 30)
      return 'linear-gradient(135deg, #FFD8A8 0%, #F97316 100%)'; // Warm terracotta (low)

    return 'linear-gradient(135deg, #FECACA 0%, #F87171 100%)'; // Dusty rose (critical)
  };

  const getTextColor = (value) => {
    if (value === null || value === undefined) return '#94a3b8'; // Muted gray (no data)

    if (value >= 70) return '#2F8F7C'; // Muted green (excellent)
    if (value >= 50) return '#BFA25C'; // Soft gold (good / acceptable)
    if (value >= 30) return '#C47A3D'; // Muted orange-brown (warning)

    return '#D87A80'; // Dusty red (critical)
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
          <div style={{ fontSize: '16px' }}>Loading retention analysis...</div>
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
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      height: '100%',
      minHeight: '320px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
        pointerEvents: 'none'
      }}></div>

      {/* Header */}
      <div style={{ marginBottom: '20px', position: 'relative', zIndex: 1 }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#0f172a',
          margin: '0 0 6px 0',
          letterSpacing: '-0.02em'
        }}>
          Retention analysis
        </h3>
        <div style={{
          fontSize: '12px',
          color: '#64748b',
          fontWeight: '500',
          padding: '4px 10px',
          background: '#f1f5f9',
          borderRadius: '6px',
          display: 'inline-block'
        }}>
          Android
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflow: 'auto', position: 'relative', zIndex: 1 }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0' }}>
          <thead>
            <tr>
              <th style={{
                textAlign: 'left',
                padding: '12px',
                fontSize: '12px',
                fontWeight: '700',
                color: '#475569',
                borderBottom: '2px solid #e2e8f0',
                background: '#f8fafc'
              }}>
                Cohort
              </th>
              {['Day 0', 'Day 1', 'Day 2', 'Day 3', 'Day 4'].map((day, idx) => (
                <th key={idx} style={{
                  textAlign: 'center',
                  padding: '12px',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#475569',
                  borderBottom: '2px solid #e2e8f0',
                  background: '#f8fafc'
                }}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {retentionData.map((row, index) => (
              <tr key={index} style={{
                transition: 'background 0.2s',
                ':hover': { background: '#f8fafc' }
              }}>
                <td style={{
                  padding: '14px 12px',
                  fontSize: '13px',
                  color: '#0f172a',
                  fontWeight: '600',
                  borderBottom: '1px solid #f1f5f9',
                  background: index % 2 === 0 ? 'transparent' : '#fafbfc'
                }}>
                  {row.cohort}
                </td>
                {[row.day0, row.day1, row.day2, row.day3, row.day4].map((value, cellIndex) => (
                  <td
                    key={cellIndex}
                    style={{
                      padding: '14px 12px',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '700',
                      background: value !== null ? getColorIntensity(value) : '#f8fafc',
                      color: getTextColor(value),
                      borderBottom: '1px solid #f1f5f9',
                      minWidth: '60px',
                      position: 'relative'
                    }}
                  >
                    {value !== null ? (
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.6)'
                      }}>
                        {value}
                      </span>
                    ) : (
                      <span style={{ color: '#cbd5e1' }}>-</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RetentionAnalysisCard;
