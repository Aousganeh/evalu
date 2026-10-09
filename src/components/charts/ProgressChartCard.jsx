import React, { useState, useEffect } from 'react';

const ProgressChartCard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

    const progressData = [
        {
            label: 'Monthly Target',
            value: 87,
            color: '#2F8F7C', // Muted green
            target: 100,
            suffix: '%'
        },
        {
            label: 'Customer Satisfaction',
            value: 92,
            color: '#4B8BBE', // Calm blue
            target: 95,
            suffix: '%'
        },
        {
            label: 'Response Rate',
            value: 76,
            color: '#BFA25C', // Soft gold
            target: 85,
            suffix: '%'
        },
        {
            label: 'Resolution Time',
            value: 68,
            color: '#D87A80', // Dusty red
            target: 80,
            suffix: '%'
        },
        {
            label: 'User Engagement',
            value: 94,
            color: '#A085C7', // Lavender gray
            target: 90,
            suffix: '%'
        }
    ];

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
          <div style={{ fontSize: '16px', marginBottom: '8px' }}>Loading progress chart...</div>
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
      <div style={{
        fontSize: '14px',
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: '16px'
      }}>
        Performance Metrics
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        flex: 1,
        overflowY: 'auto',
        paddingRight: '8px',
        position: 'relative',
        zIndex: 1
      }}>
        {progressData.map((item, index) => (
          <div key={index} style={{ width: '100%' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '6px'
            }}>
              <span style={{
                fontSize: '12px',
                fontWeight: '500',
                color: '#6B7280'
              }}>
                {item.label}
              </span>
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#1F2937'
              }}>
                {item.value}{item.suffix}
              </span>
            </div>

            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#F3F4F6',
              borderRadius: '4px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                width: `${Math.min(item.value / item.target * 100, 100)}%`,
                height: '100%',
                backgroundColor: item.color,
                borderRadius: '4px',
                transition: 'width 0.8s ease-out',
                animationDelay: `${index * 0.1}s`
              }} />

              {/* Target line */}
              <div style={{
                position: 'absolute',
                left: `${item.target}%`,
                top: '0',
                bottom: '0',
                width: '2px',
                backgroundColor: '#D87A80',
                opacity: 0.7
              }} />
            </div>

            <div style={{
              fontSize: '10px',
              color: '#9CA3AF',
              textAlign: 'right',
              marginTop: '2px'
            }}>
              Target: {item.target}{item.suffix}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressChartCard;


