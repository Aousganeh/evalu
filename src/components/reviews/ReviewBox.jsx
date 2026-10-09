import React, { useState } from 'react';

// Helper to get initial from name
const getInitial = (name) => name?.[0]?.toUpperCase() || '?';

// Helper to get avatar color (simple hash)
const getAvatarColor = (name) => {
  const colors = ['#F87171', '#60A5FA', '#FBBF24', '#34D399', '#A78BFA', '#F472B6'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

// ReviewBox component
const ReviewBox = ({ name, review, score, topic }) => {
  const [hovered, setHovered] = useState(false);
  // Clamp score between 0 and 1
  const clampedScore = Math.max(0, Math.min(1, score));
  // Position for triangle (bar is 100px wide)
  const triangleLeft = 8 + clampedScore * 84; // 8px padding left/right

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 16, boxShadow: '0 1px 6px rgba(0,0,0,0.07)', border: '1.5px solid #E5E7EB', padding: '14px 18px', minWidth: 320, maxWidth: 400, gap: 16, margin: 4, position: 'relative', cursor: topic ? 'pointer' : 'default'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip for topic */}
      {topic && hovered && (
        <div style={{
          position: 'absolute',
          top: -38,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#222',
          color: '#fff',
          padding: '7px 16px',
          borderRadius: 8,
          fontSize: 15,
          fontWeight: 500,
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 8px rgba(0,0,0,0.13)',
          zIndex: 100,
          pointerEvents: 'none',
        }}>
          {topic}
        </div>
      )}
      {/* Avatar */}
      <div style={{
        width: 44, height: 44, borderRadius: '50%', background: getAvatarColor(name), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: 22, flexShrink: 0
      }}>{getInitial(name)}</div>
      {/* Name and review */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ fontWeight: 500, fontSize: 15, color: '#222', marginBottom: 2 }}>{name}</div>
        <div style={{ color: '#444', fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>
          {review}
        </div>
      </div>
      {/* Color bar */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 60 }}>
        <div style={{ position: 'relative', width: 100, height: 14, borderRadius: 8, background: 'linear-gradient(90deg, #F87171 0%, #FBBF24 50%, #34D399 100%)', marginBottom: 2, border: '1px solid #E5E7EB' }}>
          {/* Triangle indicator */}
          <div style={{
            position: 'absolute', left: triangleLeft - 6, top: 12, width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '7px solid #D1D5DB',
          }} />
        </div>
      </div>
    </div>
  );
};

export default ReviewBox; 