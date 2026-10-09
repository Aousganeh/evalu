import React from 'react';

const ChartCardWrapper = ({ cardId, cardTitle, children }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        pointerEvents: 'auto'
      }}
    >
      {children}
    </div>
  );
};

export default ChartCardWrapper;
