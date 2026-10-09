import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChartCard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const data = {
    labels: ['Customer Service', 'Product Quality', 'Shipping', 'Technical Support', 'Billing', 'Other'],
    datasets: [
      {
        data: [35, 25, 18, 12, 6, 4],
        backgroundColor: [
          '#4B8BBE', // Calm Blue - trustworthy, main highlight
          '#FFB366', // Warm Apricot - slightly softer than bright orange
          '#6FAF98', // Muted Teal - balanced, calming
          '#D87A80', // Dusty Rose - gentle alert
          '#BFA1E3', // Lavender Gray - sophisticated accent
          '#A0A0A0'  // Neutral Gray - for background/other categories
        ],
        borderColor: [
          '#3A6F9D', // Slightly darker blue for edges
          '#E6994D', // Darker apricot
          '#578A7D', // Deeper muted teal
          '#C36A70', // Slightly deeper dusty rose
          '#9B88C8', // Deeper lavender gray
          '#7A7A7A'  // Dark neutral gray
        ],
        borderWidth: 2,
        hoverOffset: 8,
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
          padding: 15,
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
      title: {
        display: true,
        text: 'Issue Categories',
        font: {
          size: 14,
          weight: '600'
        },
        color: '#1F2937',
        padding: {
          bottom: 20
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
          <div style={{ fontSize: '16px', marginBottom: '8px' }}>Loading donut chart...</div>
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
      <div style={{ flex: 1, minHeight: '220px' }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DonutChartCard;


