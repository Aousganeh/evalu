import React from 'react';
import { Sparkles } from 'lucide-react';

const AIInsightPill = ({ onClick, isOpen }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onTouchStart={(e) => {
        e.stopPropagation();
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        background: isOpen ? '#3b82f6' : '#f8f9fa',
        color: isOpen ? '#ffffff' : '#374151',
        border: `1px solid ${isOpen ? '#3b82f6' : '#e5e7eb'}`,
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: isOpen ? '0 2px 8px rgba(59, 130, 246, 0.2)' : '0 1px 2px rgba(0, 0, 0, 0.05)',
      }}
      onMouseEnter={(e) => {
        if (!isOpen) {
          e.currentTarget.style.background = '#f1f5f9';
          e.currentTarget.style.borderColor = '#cbd5e1';
        }
      }}
      onMouseLeave={(e) => {
        if (!isOpen) {
          e.currentTarget.style.background = '#f8f9fa';
          e.currentTarget.style.borderColor = '#e5e7eb';
        }
      }}
      aria-label="Get AI insights"
      aria-expanded={isOpen}
    >
      <Sparkles size={14} />
      <span>Get AI insights</span>
    </button>
  );
};

export default AIInsightPill;
