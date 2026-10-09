import React, { useRef, useEffect, useCallback, useState } from 'react';
import { X } from 'lucide-react';
import logo from '../../assets/logosmall.svg';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
} from '@floating-ui/react';

const AIInsightPopover = ({ 
  insight, 
  anchorRef, 
  isOpen, 
  onClose, 
  placement = 'bottom',
  onMouseEnter = () => {},
  onMouseLeave = () => {}
}) => {
  const arrowRef = useRef(null);
  
  // Track if Floating UI has calculated the position - MUST be before early return
  const [isPositionReady, setIsPositionReady] = useState(false);
  
  const { refs, floatingStyles, placement: actualPlacement, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: () => {},
    placement: placement,
    middleware: [
      offset(12),
      flip({
        fallbackAxisSideDirection: 'start',
        padding: 8,
      }),
      shift({
        padding: 8,
      }),
      arrow({
        element: arrowRef,
        padding: 8,
      }),
    ],
    whileElementsMounted: autoUpdate,
    strategy: 'absolute',
  });

  // Set reference ref - set it whenever anchorRef is available
  useEffect(() => {
    if (anchorRef?.current && isOpen) {
      refs.setReference(anchorRef.current);
      // Reset position ready state when anchor changes
      setIsPositionReady(false);
      // Force Floating UI to recalculate by triggering a layout
      // This ensures the position is calculated before showing the popover
      requestAnimationFrame(() => {
        // Trigger a reflow to ensure Floating UI calculates position
        if (anchorRef?.current) {
          anchorRef.current.offsetHeight; // Force reflow
        }
      });
    }
  }, [anchorRef, isOpen, refs]);

  // Set floating ref using callback ref
  const setFloatingRef = useCallback((node) => {
    if (node) {
      refs.setFloating(node);
    }
  }, [refs]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    // For hover-based insights, we don't need click outside handler
    // The insight will close when mouse leaves the card

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Reset position ready state when popover opens/closes
  useEffect(() => {
    if (!isOpen) {
      setIsPositionReady(false);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setIsPositionReady(false);
      return;
    }
    
    // Wait for Floating UI to calculate position
    // Check if floatingStyles are ready and valid, and anchorRef is set
    if (!anchorRef?.current || !floatingStyles) {
      setIsPositionReady(false);
      return;
    }
    
    const rect = anchorRef.current.getBoundingClientRect();
    
    // Check if floatingStyles has valid position values
    if (floatingStyles.top === undefined || floatingStyles.left === undefined) {
      setIsPositionReady(false);
      return;
    }
    
    // Parse position values (they might be strings like "123px" or numbers)
    const floatingTop = typeof floatingStyles.top === 'string' 
      ? parseFloat(floatingStyles.top.replace('px', '')) 
      : floatingStyles.top;
    const floatingLeft = typeof floatingStyles.left === 'string'
      ? parseFloat(floatingStyles.left.replace('px', ''))
      : floatingStyles.left;
    
    // Verify that floating position is valid and reasonable
    // It should be near the anchor element, not at screen center or invalid
    if (isNaN(floatingTop) || isNaN(floatingLeft)) {
      setIsPositionReady(false);
      return;
    }
    
    // Check if position is reasonable relative to anchor
    // The popover should be near the anchor (within reasonable distance)
    const distanceFromAnchor = Math.sqrt(
      Math.pow(floatingTop - rect.top, 2) + 
      Math.pow(floatingLeft - rect.left, 2)
    );
    
    // If position is too far from anchor (more than 2000px), it's probably wrong
    // Also check it's not at screen center (which is fallback)
    const isAtScreenCenter = Math.abs(floatingTop - window.innerHeight / 2) < 100 &&
                            Math.abs(floatingLeft - window.innerWidth / 2) < 100;
    
    if (distanceFromAnchor < 2000 && !isAtScreenCenter) {
      // Position looks valid, show after a small delay to ensure stability
      const timer = setTimeout(() => {
        setIsPositionReady(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsPositionReady(false);
    }
  }, [floatingStyles, isOpen, anchorRef]);

  // Early return after hooks
  if (!isOpen || !insight) {
    return null;
  }

  // Get arrow position from Floating UI middleware
  const arrowX = middlewareData.arrow?.x;
  const arrowY = middlewareData.arrow?.y;
  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[actualPlacement?.split('-')[0]] || 'bottom';

  const getArrowStyle = () => {
    const baseStyle = {
      position: 'absolute',
      width: 0,
      height: 0,
      zIndex: 1,
    };

    const arrowSize = 8;

    // staticSide is the side of the popover where the arrow is
    // When popover is above anchor (placement: 'top'), arrow is on bottom of popover pointing down
    // When popover is below anchor (placement: 'bottom'), arrow is on top of popover pointing up
    if (staticSide === 'top') {
      // Arrow on top of popover, pointing upward (popover is below anchor)
      return {
        ...baseStyle,
        top: arrowY != null ? `${arrowY}px` : '-8px',
        left: arrowX != null ? `${arrowX}px` : '50%',
        transform: 'translateX(-50%)',
        borderLeft: `${arrowSize}px solid transparent`,
        borderRight: `${arrowSize}px solid transparent`,
        borderBottom: `${arrowSize}px solid #ffffff`, // Points upward
      };
    }
    if (staticSide === 'bottom') {
      // Arrow on bottom of popover, pointing downward (popover is above anchor)
      return {
        ...baseStyle,
        bottom: arrowY != null ? `${arrowY}px` : '-8px',
        left: arrowX != null ? `${arrowX}px` : '50%',
        transform: 'translateX(-50%)',
        borderLeft: `${arrowSize}px solid transparent`,
        borderRight: `${arrowSize}px solid transparent`,
        borderTop: `${arrowSize}px solid #ffffff`, // Points downward
      };
    }
    if (staticSide === 'left') {
      // Arrow on left side of popover, pointing left (popover is to the right of anchor)
      return {
        ...baseStyle,
        left: arrowX != null ? `${arrowX}px` : '-8px',
        top: arrowY != null ? `${arrowY}px` : '50%',
        transform: 'translateY(-50%)',
        borderTop: `${arrowSize}px solid transparent`,
        borderBottom: `${arrowSize}px solid transparent`,
        borderRight: `${arrowSize}px solid #ffffff`, // Points left
      };
    }
    if (staticSide === 'right') {
      // Arrow on right side of popover, pointing right (popover is to the left of anchor)
      return {
        ...baseStyle,
        right: arrowX != null ? `${arrowX}px` : '-8px',
        top: arrowY != null ? `${arrowY}px` : '50%',
        transform: 'translateY(-50%)',
        borderTop: `${arrowSize}px solid transparent`,
        borderBottom: `${arrowSize}px solid transparent`,
        borderLeft: `${arrowSize}px solid #ffffff`, // Points right
      };
    }
    return baseStyle;
  };

  const getArrowShadowStyle = () => {
    const baseStyle = {
      position: 'absolute',
      width: 0,
      height: 0,
      zIndex: 0,
    };

    const arrowSize = 9;
    const shadowOffset = 1;

    if (staticSide === 'top') {
      // Shadow for arrow on top of popover (pointing upward)
      return {
        ...baseStyle,
        top: arrowY != null ? `${arrowY + shadowOffset}px` : '-9px',
        left: arrowX != null ? `${arrowX}px` : '50%',
        transform: 'translateX(-50%)',
        borderLeft: `${arrowSize}px solid transparent`,
        borderRight: `${arrowSize}px solid transparent`,
        borderBottom: `${arrowSize}px solid rgba(0, 0, 0, 0.1)`, // Points upward
      };
    }
    if (staticSide === 'bottom') {
      // Shadow for arrow on bottom of popover (pointing downward)
      return {
        ...baseStyle,
        bottom: arrowY != null ? `${arrowY + shadowOffset}px` : '-9px',
        left: arrowX != null ? `${arrowX}px` : '50%',
        transform: 'translateX(-50%)',
        borderLeft: `${arrowSize}px solid transparent`,
        borderRight: `${arrowSize}px solid transparent`,
        borderTop: `${arrowSize}px solid rgba(0, 0, 0, 0.1)`, // Points downward
      };
    }
    if (staticSide === 'left') {
      // Shadow for arrow on left side (pointing left)
      return {
        ...baseStyle,
        left: arrowX != null ? `${arrowX + shadowOffset}px` : '-9px',
        top: arrowY != null ? `${arrowY}px` : '50%',
        transform: 'translateY(-50%)',
        borderTop: `${arrowSize}px solid transparent`,
        borderBottom: `${arrowSize}px solid transparent`,
        borderRight: `${arrowSize}px solid rgba(0, 0, 0, 0.1)`, // Points left
      };
    }
    if (staticSide === 'right') {
      // Shadow for arrow on right side (pointing right)
      return {
        ...baseStyle,
        right: arrowX != null ? `${arrowX + shadowOffset}px` : '-9px',
        top: arrowY != null ? `${arrowY}px` : '50%',
        transform: 'translateY(-50%)',
        borderTop: `${arrowSize}px solid transparent`,
        borderBottom: `${arrowSize}px solid transparent`,
        borderLeft: `${arrowSize}px solid rgba(0, 0, 0, 0.1)`, // Points right
      };
    }
    return baseStyle;
  };

  // Calculate fallback position if floatingStyles aren't ready
  const getPositionStyles = () => {
    // Always prefer Floating UI's calculated position
    if (floatingStyles && floatingStyles.top !== undefined && floatingStyles.left !== undefined) {
      return floatingStyles;
    }
    
    // Fallback: position relative to anchorRef if available
    // getBoundingClientRect() returns viewport coordinates, so we don't need to add scroll
    if (anchorRef?.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      
      // Handle different placement directions
      if (placement === 'right') {
        return {
          top: `${rect.top + (rect.height / 2)}px`,
          left: `${rect.right + 12}px`,
          transform: 'translateY(-50%)',
        };
      } else if (placement === 'left') {
        return {
          top: `${rect.top + (rect.height / 2)}px`,
          right: `${window.innerWidth - rect.left + 12}px`,
          transform: 'translateY(-50%)',
        };
      } else if (placement === 'top') {
        return {
          bottom: `${window.innerHeight - rect.top + 12}px`,
          left: `${rect.left + (rect.width / 2)}px`,
          transform: 'translateX(-50%)',
        };
      } else {
        // Default to bottom
        return {
          top: `${rect.bottom + 12}px`,
          left: `${rect.left + (rect.width / 2)}px`,
          transform: 'translateX(-50%)',
        };
      }
    }
    
    // Last resort: center of screen (but this should never be visible due to isPositionReady)
    return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
  };

  const positionStyles = getPositionStyles();

  return (
    <div
      ref={setFloatingRef}
      role="tooltip"
      aria-live="polite"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'absolute',
        ...positionStyles,
        background: '#ffffff',
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
        minWidth: '280px',
        maxWidth: '360px',
        zIndex: 10000,
        pointerEvents: 'auto',
        animation: isPositionReady ? 'fadeInScale 0.2s ease-out' : 'none',
        border: '1px solid #e5e7eb',
        visibility: isPositionReady ? 'visible' : 'hidden',
        opacity: isPositionReady ? 1 : 0,
        transition: isPositionReady ? 'opacity 0.2s ease-out' : 'none',
      }}
    >
      {/* Arrow shadow */}
      <div style={getArrowShadowStyle()}></div>
      
      {/* Arrow */}
      <div ref={arrowRef} style={getArrowStyle()}></div>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <img 
            src={logo} 
            alt="AI" 
            style={{ 
              width: '20px', 
              height: '20px',
              borderRadius: '4px'
            }} 
          />
          <span style={{
            fontSize: '13px',
            fontWeight: '600',
            color: '#1e293b',
          }}>
            AI Insight
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            color: '#64748b',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f1f5f9';
            e.currentTarget.style.color = '#374151';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#64748b';
          }}
          aria-label="Close insight"
        >
          <X size={16} />
        </button>
      </div>

      {/* Insight text */}
      <div style={{
        fontSize: '13px',
        lineHeight: '1.5',
        color: '#475569',
      }}>
        {insight.text}
      </div>
    </div>
  );
};

export default AIInsightPopover;
