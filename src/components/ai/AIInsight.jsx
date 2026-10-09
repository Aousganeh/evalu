import React, { useState, useRef, useEffect } from 'react';
import AIInsightPopover from './AIInsightPopover';
import { createPortal } from 'react-dom';

const AIInsight = ({ insight, children, placement = 'bottom' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const anchorRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const insightId = insight?.id || 'insight-default';
  const hoverTimeoutRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const isDraggingRef = useRef(false);
  const isHoveringCardRef = useRef(false);
  const isHoveringPopoverRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (e) => {
    // Don't show if hovering over interactive elements
    if (e.target.closest('button, a, [role="button"], [data-drag-handle]')) {
      return;
    }
    
    // Don't show if currently dragging
    if (isDraggingRef.current) {
      return;
    }

    isHoveringCardRef.current = true;
    setIsHovered(true);
    
    // Clear any pending close
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    
    // Small delay before showing to avoid flickering when moving mouse quickly
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    hoverTimeoutRef.current = setTimeout(() => {
      if (insight && !isDraggingRef.current && isHoveringCardRef.current) {
        setIsOpen(true);
      }
    }, 400); // 400ms delay to avoid accidental triggers
  };

  const handleMouseLeave = () => {
    isHoveringCardRef.current = false;
    setIsHovered(false);
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    // Delay before hiding to allow moving to popover
    closeTimeoutRef.current = setTimeout(() => {
      if (!isHoveringCardRef.current && !isHoveringPopoverRef.current) {
        setIsOpen(false);
      }
    }, 200);
  };

  const handlePopoverMouseEnter = () => {
    isHoveringPopoverRef.current = true;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handlePopoverMouseLeave = () => {
    isHoveringPopoverRef.current = false;
    setIsOpen(false);
  };

  const handleMouseDown = (e) => {
    // Track if user starts dragging
    if (e.target.closest('button, a, [role="button"], [data-drag-handle]')) {
      return;
    }
    isDraggingRef.current = false;
    
    const startX = e.clientX;
    const startY = e.clientY;
    
    const handleMouseMove = (moveEvent) => {
      const xDiff = Math.abs(moveEvent.clientX - startX);
      const yDiff = Math.abs(moveEvent.clientY - startY);
      if (xDiff > 5 || yDiff > 5) {
        isDraggingRef.current = true;
        setIsOpen(false);
      }
    };
    
    const handleMouseUp = () => {
      setTimeout(() => {
        isDraggingRef.current = false;
      }, 100);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Close when another insight opens (global state management)
  useEffect(() => {
    const handleGlobalClose = (event) => {
      // Don't close if this is our own event
      if (event.detail?.insightId === insightId) {
        return;
      }
      if (isOpen) {
        setIsOpen(false);
      }
    };

    // Listen for custom event to close other insights
    window.addEventListener('ai-insight-open', handleGlobalClose);
    
    if (isOpen) {
      // Dispatch event with our ID to close other insights (but not ourselves)
      window.dispatchEvent(new CustomEvent('ai-insight-open', {
        detail: { insightId }
      }));
    }

    return () => {
      window.removeEventListener('ai-insight-open', handleGlobalClose);
    };
  }, [isOpen, insightId]);

  return (
    <div 
      style={{ position: 'relative', width: '100%', height: '100%' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
    >
      {/* Card content wrapper */}
      <div 
        ref={anchorRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative',
          cursor: insight ? 'help' : 'default',
          transition: insight ? 'transform 0.2s ease, box-shadow 0.2s ease' : 'none',
          transform: isHovered && insight ? 'translateY(-2px)' : 'translateY(0)',
          boxShadow: isHovered && insight ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        {/* Card children */}
        {children}
      </div>

      {/* Popover - rendered in portal */}
      {mounted && insight && createPortal(
        <AIInsightPopover
          insight={insight}
          anchorRef={anchorRef}
          isOpen={isOpen}
          onClose={handleClose}
          placement={placement}
          onMouseEnter={handlePopoverMouseEnter}
          onMouseLeave={handlePopoverMouseLeave}
        />,
        document.body
      )}
    </div>
  );
};

export default AIInsight;
