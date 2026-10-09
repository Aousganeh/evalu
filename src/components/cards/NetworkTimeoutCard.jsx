import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const NetworkTimeoutCard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const data = {
    labels: ['iOS 14.0.1', 'iOS 15.0.1', 'iOS 14.0.8', 'iOS 14.0.5', 'iOS 15.0.4'],
    datasets: [
      {
        data: [38, 26, 18, 13, 5],
        backgroundColor: [
          'rgba(76, 111, 191, 1)',  // Muted blue
          'rgba(216, 122, 128, 1)', // Dusty red
          'rgba(191, 162, 92, 1)',  // Soft gold
          'rgba(47, 143, 124, 1)',  // Muted green
          'rgba(167, 139, 250, 1)'  // Muted violet
        ],
        borderColor: [
          'rgb(255, 255, 255)',
          'rgb(255, 255, 255)',
          'rgb(255, 255, 255)',
          'rgb(255, 255, 255)',
          'rgb(255, 255, 255)'
        ],
        borderWidth: 3,
        hoverOffset: 12,
        hoverBorderWidth: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 12,
          usePointStyle: true,
          font: {
            size: 11,
            weight: '500'
          },
          generateLabels: (chart) => {
            const data = chart.data;
            return data.labels.map((label, i) => ({
              text: `${label}: ${data.datasets[0].data[i]}%`,
              fillStyle: data.datasets[0].backgroundColor[i],
              strokeStyle: data.datasets[0].borderColor[i],
              lineWidth: 2,
              hidden: false,
              index: i
            }));
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1F2937',
        bodyColor: '#374151',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed;
            return `${label}: ${value}%`;
          }
        }
      }
    }
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
          <div style={{ fontSize: '16px' }}>Loading error analysis...</div>
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
        top: -40,
        right: -40,
        width: '180px',
        height: '180px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: -30,
        left: -30,
        width: '140px',
        height: '140px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
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
          Network timeout error
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
          Distribution by iOS version
        </div>
      </div>

      {/* Chart */}
      <div style={{ flex: 1, minHeight: '200px', position: 'relative', zIndex: 1 }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default NetworkTimeoutCard;
