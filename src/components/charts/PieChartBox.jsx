import React, { useState, useEffect, useMemo, useRef } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { mockApi } from '../../utils/data/mockData';

const COLORS = [
  '#2F8F7C', // Muted green
  '#D87A80', // Dusty red
  '#BFA25C', // Soft gold
  '#4B8BBE', // Calm blue
  '#A085C7', // Lavender gray
  '#D78FB4', // Muted rose/pink
];
const STAT_CHOICES = [
  { key: 'solved', label: 'Solved/Unsolved' },
  { key: 'posneg', label: 'Positive/Negative' },
];

// Custom tooltip for pie chart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '7px 14px', color: '#222', fontWeight: 500, fontSize: 15, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        {name}: {value}
      </div>
    );
  }
  return null;
};

const PieChartBox = ({ isEditMode }) => {
  const [selected, setSelected] = useState('solved');
  const [counts, setCounts] = useState({
    solved: null,
    total: null,
    positive: null,
    negative: null,
  });
  const prevCountsRef = useRef(counts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      setError(null);
      try {
        const [solved, total, positive, negative] = await Promise.all([
          mockApi.getSolvedReviewCount(),
          mockApi.getReviewCount(),
          mockApi.getPositiveReviewCount(),
          mockApi.getNegativeReviewCount(),
        ]);
        const newCounts = {
          solved: parseInt(solved, 10),
          total: parseInt(total, 10),
          positive: parseInt(positive, 10),
          negative: parseInt(negative, 10),
        };
        const prev = prevCountsRef.current;
        if (
          prev.solved !== newCounts.solved ||
          prev.total !== newCounts.total ||
          prev.positive !== newCounts.positive ||
          prev.negative !== newCounts.negative
        ) {
          setCounts(newCounts);
          prevCountsRef.current = newCounts;
        }
      } catch (err) {
        setError('Failed to load chart data');
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  const chartData = useMemo(() => {
    if (loading || error || !counts.total) return [];
    if (selected === 'solved') {
      const solved = counts.solved || 0;
      const unsolved = (counts.total || 0) - solved;
      return [
        { name: 'Solved', value: solved },
        { name: 'Unsolved', value: unsolved },
      ];
    }
    if (selected === 'posneg') {
      const positive = counts.positive || 0;
      const negative = counts.negative || 0;
      return [
        { name: 'Positive', value: positive },
        { name: 'Negative', value: negative },
      ];
    }
    return [];
  }, [counts, selected, loading, error]);

  return (
    <div style={{
      borderRadius: 20,
      border: 'none',
      boxShadow: 'none',
      background: 'transparent',
      padding: '22px 28px 18px 28px',
      marginTop: 32,
      marginBottom: 24,
      width: '100%',
      height: '100%',
      minHeight: '350px',
      alignSelf: 'stretch',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
        <svg width="20" height="20" fill="none" viewBox="0 0 20 20" style={{marginRight: 4}}><circle cx="10" cy="10" r="8" stroke="#6B7280" strokeWidth="2" fill="none"/><path d="M10 2a8 8 0 0 1 8 8h-8V2Z" fill="#60A5FA"/></svg>
        <span style={{ fontWeight: 600, fontSize: 18, color: '#222' }}>Statistics</span>
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
        {STAT_CHOICES.map(choice => (
          <button
            key={choice.key}
            onClick={() => !isEditMode && setSelected(choice.key)}
            style={{
              padding: '7px 16px',
              borderRadius: 12,
              border: selected === choice.key ? '2px solid #2563eb' : '1.5px solid #E5E7EB',
              background: selected === choice.key ? '#eff6ff' : '#f8fafc',
              color: selected === choice.key ? '#2563eb' : '#374151',
              fontWeight: 500,
              fontSize: 15,
              cursor: isEditMode ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s',
              pointerEvents: isEditMode ? 'none' : 'auto',
            }}
            disabled={isEditMode}
          >
            {choice.label}
          </button>
        ))}
      </div>
      <div style={{ width: '100%', height: 220, position: 'relative', pointerEvents: isEditMode ? 'none' : 'auto' }}>
        {loading ? (
          <div style={{ color: '#888', fontSize: 15, marginTop: 60, textAlign: 'center' }}>Loading chart...</div>
        ) : error ? (
          <div style={{ color: '#e11d48', fontSize: 15, marginTop: 60, textAlign: 'center' }}>{error}</div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                innerRadius="50%"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        )}
        {isEditMode && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            borderRadius: 20,
            fontWeight: 600,
            fontSize: 18,
            color: '#6B7280',
            pointerEvents: 'auto',
            userSelect: 'none',
          }}>
            Unlock to interact
          </div>
        )}
      </div>
      {(!loading && !error && chartData.length === 0) && (
        <div style={{ color: '#888', fontSize: 15, marginTop: 12 }}>No data available.</div>
      )}
    </div>
  );
};

export default PieChartBox; 