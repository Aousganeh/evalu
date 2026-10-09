import React from 'react';
import logo from '../../assets/logosmall.svg';

const RecommendationsPanel = ({ selectedCardId, cardTitle, placement = 'right' }) => {
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
      }
    };

    return recommendations[cardId] || null;
  };

  if (!selectedCardId) {
    return null;
  }

  const recommendation = getRecommendation(selectedCardId);
  
  if (!recommendation) {
    return null;
  }

  const isLeft = placement === 'left';

  return (
    <div 
      style={{
        width: '400px',
        maxWidth: '400px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '2px solid #3b82f6',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        position: 'relative',
        boxSizing: 'border-box',
        margin: '0'
      }}
    >
      {/* Upward pointing triangle (^) connecting to card above */}
      <div style={{
        position: 'absolute',
        top: '-8px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 0,
        height: 0,
        borderLeft: '8px solid transparent',
        borderRight: '8px solid transparent',
        borderBottom: '8px solid #3b82f6',
        zIndex: 1
      }}></div>
      {/* Inner white triangle for border effect */}
      <div style={{
        position: 'absolute',
        top: '-6px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 0,
        height: 0,
        borderLeft: '7px solid transparent',
        borderRight: '7px solid transparent',
        borderBottom: '7px solid #ffffff',
        zIndex: 2
      }}></div>
      
      {/* Logo and Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '16px',
        paddingBottom: '16px',
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
        marginBottom: '12px',
        padding: '12px',
        background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
        borderRadius: '8px',
        border: '1px solid #93c5fd'
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: '600',
          color: '#1e40af',
          marginBottom: '6px',
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
        marginBottom: '12px',
        padding: '12px',
        background: '#fef2f2',
        borderRadius: '8px',
        border: '1px solid #fecaca'
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: '600',
          color: '#991b1b',
          marginBottom: '6px',
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
        padding: '12px',
        background: '#f0fdf4',
        borderRadius: '8px',
        border: '1px solid #bbf7d0'
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: '600',
          color: '#166534',
          marginBottom: '6px',
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

export default RecommendationsPanel;
