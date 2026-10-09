import React, { useState, useEffect, useRef } from 'react';
import logo from '../../assets/logosmall.svg';

const AIRecommendation = ({ cardId, cardTitle, mousePosition }) => {
  const tooltipRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState('bottom');

  useEffect(() => {
    if (!mousePosition) {
      setPosition({ top: 0, left: 0 });
      return;
    }

    const updatePosition = () => {
      if (!tooltipRef.current) return;
      
      const tooltip = tooltipRef.current;
      const tooltipWidth = 400; // max-width
      const tooltipHeight = tooltip.offsetHeight || 350;
      const padding = 20;
      
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let top = mousePosition.y;
      let left = mousePosition.x + 20; // Default: right side of cursor
      let arrowPos = 'bottom';
      
      // Check if tooltip would go off right edge
      if (left + tooltipWidth > viewportWidth - padding) {
        // Position to the left of cursor instead
        left = mousePosition.x - tooltipWidth - 20;
      }
      
      // Check if tooltip would go off left edge
      if (left < padding) {
        left = padding;
      }
      
      // Check if tooltip would go off bottom edge
      if (top + tooltipHeight > viewportHeight - padding) {
        // Position above cursor
        top = mousePosition.y - tooltipHeight - 20;
        arrowPos = 'top';
      }
      
      // Check if tooltip would go off top edge
      if (top < padding) {
        top = padding;
        arrowPos = 'bottom';
      }
      
      setPosition({ top, left });
      setArrowPosition(arrowPos);
    };

    // Initial position calculation
    updatePosition();
    
    // Update on window resize
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [mousePosition]);

  const getRecommendation = (cardId) => {
    const recommendations = {
      customers: {
        action: "Focus on customer acquisition campaigns",
        problem: "Customer growth is slowing",
        solution: "Launch targeted marketing campaigns and improve onboarding experience"
      },
      reviews: {
        action: "Respond to reviews within 24 hours",
        problem: "Review response rate is below optimal",
        solution: "Set up automated review response system and prioritize negative reviews"
      },
      positive: {
        action: "Leverage positive reviews for marketing",
        problem: "Not maximizing positive feedback",
        solution: "Feature positive reviews on your website and social media channels"
      },
      negative: {
        action: "Address negative reviews immediately",
        problem: "Negative reviews are impacting reputation",
        solution: "Contact dissatisfied customers directly and resolve their issues"
      },
      solvedReviews: {
        action: "Analyze resolution patterns",
        problem: "Some reviews remain unresolved",
        solution: "Identify common issues and create FAQ or knowledge base articles"
      },
      mostNegativeTopic: {
        action: "Prioritize fixing this issue",
        problem: "This topic is causing most complaints",
        solution: "Allocate resources to address this specific problem area"
      },
      customerSatisfaction: {
        action: "Improve customer service quality",
        problem: "Satisfaction score needs improvement",
        solution: "Train support team and implement customer feedback loops"
      },
      responseTime: {
        action: "Reduce average response time",
        problem: "Response times are too high",
        solution: "Implement chatbots for common queries and optimize support workflow"
      },
      resolutionRate: {
        action: "Increase first-contact resolution",
        problem: "Many issues require multiple interactions",
        solution: "Empower support agents with better tools and knowledge base"
      },
      reviewResponseRate: {
        action: "Respond to all reviews promptly",
        problem: "Not all reviews are being addressed",
        solution: "Set up review monitoring alerts and response templates"
      },
      customerRetention: {
        action: "Implement retention strategies",
        problem: "Customer churn is increasing",
        solution: "Create loyalty programs and personalized engagement campaigns"
      },
      activeUsersToday: {
        action: "Boost daily active users",
        problem: "User engagement is declining",
        solution: "Send push notifications and create daily engagement features"
      },
      barChart: {
        action: "Optimize weekly activity patterns",
        problem: "Activity varies significantly by day",
        solution: "Identify peak days and schedule important updates accordingly"
      },
      donutChart: {
        action: "Address top issue categories",
        problem: "Certain categories dominate complaints",
        solution: "Focus resources on the most problematic areas first"
      },
      progressChart: {
        action: "Improve underperforming metrics",
        problem: "Some metrics are below target",
        solution: "Create action plans for each metric and track progress weekly"
      },
      areaChart: {
        action: "Optimize financial performance",
        problem: "Revenue growth is inconsistent",
        solution: "Analyze cost drivers and implement cost-saving measures"
      },
      radarChart: {
        action: "Strengthen weak performance areas",
        problem: "Some performance dimensions lag behind",
        solution: "Allocate resources to improve underperforming areas"
      },
      statisticsBox: {
        action: "Review statistical trends",
        problem: "Data shows concerning patterns",
        solution: "Deep dive into statistics and create improvement initiatives"
      },
      monthlyChart: {
        action: "Address monthly trend changes",
        problem: "Monthly patterns indicate issues",
        solution: "Compare month-over-month data and identify root causes"
      },
      appOnboarding: {
        action: "Improve onboarding conversion",
        problem: "High drop-off rate during onboarding",
        solution: "Simplify onboarding steps and add progress indicators"
      },
      uninstallsFirstOpens: {
        action: "Reduce app uninstalls",
        problem: "Uninstall rate is increasing",
        solution: "Improve first-time user experience and add value early"
      },
      retentionAnalysis: {
        action: "Improve user retention",
        problem: "Retention rates are declining",
        solution: "Implement retention campaigns and improve product stickiness"
      },
      userClustering: {
        action: "Engage with user segments",
        problem: "Some user segments are disengaging",
        solution: "Create targeted campaigns for each user segment"
      },
      networkTimeout: {
        action: "Fix network timeout issues",
        problem: "Network errors are affecting users",
        solution: "Update app for older iOS versions and optimize network calls"
      }
    };

    return recommendations[cardId] || {
      action: "Review this metric regularly",
      problem: "Monitor for changes",
      solution: "Set up alerts and track trends over time"
    };
  };

  const recommendation = getRecommendation(cardId);

  return (
    <div 
      ref={tooltipRef}
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '2px solid #3b82f6',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        minWidth: '320px',
        maxWidth: '400px',
        zIndex: 10000,
        pointerEvents: 'auto',
        animation: 'slideIn 0.2s ease-out',
        filter: 'drop-shadow(0 4px 12px rgba(59, 130, 246, 0.2))',
        transform: 'translateZ(0)' // Force GPU acceleration
      }}
    >
      {/* Arrow pointing to cursor */}
      {arrowPosition === 'bottom' && (
        <div style={{
          position: 'absolute',
          bottom: '-8px',
          left: mousePosition ? `${Math.min(Math.max(mousePosition.x - position.left, 20), 380)}px` : '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: '8px solid #3b82f6'
        }}></div>
      )}
      {arrowPosition === 'top' && (
        <div style={{
          position: 'absolute',
          top: '-8px',
          left: mousePosition ? `${Math.min(Math.max(mousePosition.x - position.left, 20), 380)}px` : '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderBottom: '8px solid #3b82f6'
        }}></div>
      )}
      {/* Logo and Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px',
        paddingBottom: '12px',
        borderBottom: '2px solid #e2e8f0'
      }}>
        <img 
          src={logo} 
          alt="AI" 
          style={{ 
            width: '24px', 
            height: '24px',
            borderRadius: '6px'
          }} 
        />
        <div>
          <div style={{
            fontSize: '14px',
            fontWeight: '700',
            color: '#0f172a'
          }}>
            AI Recommendation
          </div>
          <div style={{
            fontSize: '11px',
            color: '#64748b',
            fontWeight: '500'
          }}>
            {cardTitle}
          </div>
        </div>
      </div>

      {/* Action */}
      <div style={{
        marginBottom: '10px',
        padding: '10px',
        background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
        borderRadius: '8px',
        border: '1px solid #93c5fd'
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: '600',
          color: '#1e40af',
          marginBottom: '4px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Recommended Action
        </div>
        <div style={{
          fontSize: '13px',
          fontWeight: '600',
          color: '#1e293b',
          lineHeight: '1.4'
        }}>
          {recommendation.action}
        </div>
      </div>

      {/* Problem */}
      <div style={{
        marginBottom: '10px',
        padding: '10px',
        background: '#fef2f2',
        borderRadius: '8px',
        border: '1px solid #fecaca'
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: '600',
          color: '#991b1b',
          marginBottom: '4px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Problem Identified
        </div>
        <div style={{
          fontSize: '12px',
          color: '#7f1d1d',
          lineHeight: '1.4'
        }}>
          {recommendation.problem}
        </div>
      </div>

      {/* Solution */}
      <div style={{
        padding: '10px',
        background: '#f0fdf4',
        borderRadius: '8px',
        border: '1px solid #bbf7d0'
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: '600',
          color: '#166534',
          marginBottom: '4px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Solution
        </div>
        <div style={{
          fontSize: '12px',
          color: '#14532d',
          lineHeight: '1.4'
        }}>
          {recommendation.solution}
        </div>
      </div>
    </div>
  );
};

export default AIRecommendation;
