import React, { useState, useEffect } from 'react';
import logo from '../assets/logosmall.svg';
import problem from '../assets/problem.svg';
import greenarrow from '../assets/greenarrow.svg';
import thinarrow from '../assets/thinarrow.svg';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  Tag,
  User,
  ArrowLeft,
  Reply,
  Flag,
  Archive
} from 'lucide-react';
import { mockApi, mockReviews } from '../utils/data/mockData';

// Helper to get initial from name
const getInitial = (name) => name?.[0]?.toUpperCase() || '?';

// Helper to get avatar color
const getAvatarColor = (name) => {
  const colors = ['#F87171', '#60A5FA', '#FBBF24', '#34D399', '#A78BFA', '#F472B6'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};
const dotsContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '60vh',
};

const dotsWrapperStyle = {
  display: 'flex',
  gap: '8px',
};

const dotStyle = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: '#3B82F6',
  animation: 'dotBounce 1.4s infinite ease-in-out both',
};
// Get sentiment score (0-1 scale)
const getSentimentScore = (sentiment, review) => {
  if (sentiment === 1) {
    // Negative: 0.0 - 0.4
    let hash = 0;
    for (let i = 0; i < review.content.length; i++) hash = review.content.charCodeAt(i) + ((hash << 5) - hash);
    return 0.0 + (Math.abs(hash) % 4000) / 10000;
  }
  if (sentiment === 2) {
    // Neutral: 0.4 - 0.6
    let hash = 0;
    for (let i = 0; i < review.content.length; i++) hash = review.content.charCodeAt(i) + ((hash << 5) - hash);
    return 0.4 + (Math.abs(hash) % 2000) / 10000;
  }
  if (sentiment === 3) {
    // Positive: 0.6 - 1.0
    let hash = 0;
    for (let i = 0; i < review.content.length; i++) hash = review.content.charCodeAt(i) + ((hash << 5) - hash);
    return 0.6 + (Math.abs(hash) % 4000) / 10000;
  }
  return 0.5;
};

// Get sentiment label and color
const getSentimentInfo = (score) => {
  if (score < 0.4) {
    return { label: 'Negative', color: '#EF4444', bgColor: '#FEE2E2', icon: XCircle };
  } else if (score < 0.6) {
    return { label: 'Neutral', color: '#F59E0B', bgColor: '#FEF3C7', icon: AlertCircle };
  } else {
    return { label: 'Positive', color: '#10B981', bgColor: '#D1FAE5', icon: CheckCircle };
  }
};

const addDatesToReviews = (reviews) => {
  const baseDate = new Date('2026-10-01T12:00:00Z');
  return reviews.map((review, index) => {
    const daysAgo = (index * 7) % 90;
    const date = new Date(baseDate);
    date.setDate(date.getDate() - daysAgo);
    return {
      ...review,
      date: date.toISOString(),
      replied: (index % 3) !== 0,
      resolved: (index % 4) === 0,
    };
  });
};

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);
  const [sentimentFilter, setSentimentFilter] = useState('all'); // 'all', 'positive', 'negative', 'neutral'
  const [topicFilter, setTopicFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'replied', 'unreplied', 'resolved'
  const [sortBy, setSortBy] = useState('date'); // 'date', 'sentiment', 'topic'
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get unique topics
  const topics = [...new Set(mockReviews.map(r => r.topic))];

  const fetchReviews = async () => {
    if (!loading) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const data = await mockApi.getReviews();
      const reviewsWithDates = addDatesToReviews(Array.isArray(data) ? data : []);
      setReviews(reviewsWithDates);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Could not load reviews');
      setReviews([]);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Pull to refresh functionality
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;
    let lastScrollTop = 0;
    let scrollTimeout = null;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      touchEndY = e.touches[0].clientY;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // If at top and pulling down more than 80px
      if (scrollTop === 0 && touchEndY > touchStartY && touchEndY - touchStartY > 80) {
        if (!loading && !isRefreshing) {
          fetchReviews();
        }
      }
    };

    const handleTouchEnd = () => {
      touchStartY = 0;
      touchEndY = 0;
    };

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Only refresh when scrolling up to top, not when scrolling down
      if (scrollTop === 0 && lastScrollTop > 0 && !loading && !isRefreshing) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          fetchReviews();
        }, 300); // Small delay to prevent multiple refreshes
      }
      
      lastScrollTop = scrollTop;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [loading, isRefreshing]);

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(review => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${review.customer?.firstName} ${review.customer?.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Sentiment filter
      const score = getSentimentScore(review.sentiment, review);
      const matchesSentiment = sentimentFilter === 'all' ||
        (sentimentFilter === 'positive' && score >= 0.6) ||
        (sentimentFilter === 'negative' && score < 0.4) ||
        (sentimentFilter === 'neutral' && score >= 0.4 && score < 0.6);
      
      // Topic filter
      const matchesTopic = topicFilter === 'all' || review.topic === topicFilter;
      
      // Status filter
      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'replied' && review.replied) ||
        (statusFilter === 'unreplied' && !review.replied) ||
        (statusFilter === 'resolved' && review.resolved);
      
      return matchesSearch && matchesSentiment && matchesTopic && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'sentiment') {
        const scoreA = getSentimentScore(a.sentiment, a);
        const scoreB = getSentimentScore(b.sentiment, b);
        return scoreA - scoreB;
      } else if (sortBy === 'topic') {
        return a.topic.localeCompare(b.topic);
      }
      return 0;
    });

  // Calculate statistics
  const stats = {
    total: reviews.length,
    positive: reviews.filter(r => getSentimentScore(r.sentiment, r) >= 0.6).length,
    negative: reviews.filter(r => getSentimentScore(r.sentiment, r) < 0.4).length,
    neutral: reviews.filter(r => {
      const score = getSentimentScore(r.sentiment, r);
      return score >= 0.4 && score < 0.6;
    }).length,
    replied: reviews.filter(r => r.replied).length,
    resolved: reviews.filter(r => r.resolved).length,
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
        <div style={dotsContainerStyle}>
          <style>{`
        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>

          <div style={dotsWrapperStyle}>
            <div style={{ ...dotStyle, animationDelay: '0s' }} />
            <div style={{ ...dotStyle, animationDelay: '0.15s' }} />
            <div style={{ ...dotStyle, animationDelay: '0.3s' }} />
          </div>
        </div>
    );
  }

  if (error) {
    return (
        <div id="reviews-page" style={{ padding: '20px', color: '#EF4444' }}>
          {error}
        </div>
    );
  }

  // Detail view
  if (selectedReview) {
    const score = getSentimentScore(selectedReview.sentiment, selectedReview);
    const sentimentInfo = getSentimentInfo(score);
    const SentimentIcon = sentimentInfo.icon;
    const customerName = `${selectedReview.customer?.firstName || ''} ${selectedReview.customer?.lastName || ''}`.trim() || 'Unknown';

    return (
        <div id="reviews-page" style={{ paddingTop: 0, paddingBottom: 20 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
            {/* Back button */}
            <button
              onClick={() => setSelectedReview(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                border: 'none',
                color: '#6B7280',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '24px',
                padding: '8px 0',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1F2937'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
            >
              <ArrowLeft size={18} />
              Back to Reviews
            </button>

            {/* Review Detail Card */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              padding: '32px',
              marginBottom: '24px'
            }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: getAvatarColor(customerName),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: '600',
                    fontSize: '28px',
                    flexShrink: 0
                  }}>
                    {getInitial(customerName)}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1F2937', margin: '0 0 4px 0' }}>
                      {customerName}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#6B7280' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} />
                        {formatDate(selectedReview.date)}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Tag size={14} />
                        {selectedReview.topic}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status badges */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: sentimentInfo.bgColor,
                    color: sentimentInfo.color,
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    <SentimentIcon size={16} />
                    {sentimentInfo.label}
                  </div>
                  {selectedReview.replied && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      background: '#DBEAFE',
                      color: '#1E40AF',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      <MessageSquare size={16} />
                      Replied
                    </div>
                  )}
                  {selectedReview.resolved && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      background: '#D1FAE5',
                      color: '#065F46',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      <CheckCircle size={16} />
                      Resolved
                    </div>
                  )}
                </div>
              </div>

              {/* Review Content */}
              <div style={{
                background: '#F9FAFB',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '24px',
                border: '1px solid #E5E7EB'
              }}>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#1F2937',
                  margin: 0
                }}>
                  {selectedReview.content}
                </p>
              </div>

              {/* Sentiment Analysis */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>
                  Sentiment Analysis
                </h3>
                <div style={{
                  background: '#F9FAFB',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #E5E7EB'
                }}>
                  {/* Sentiment Score Bar */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280' }}>Sentiment Score</span>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>
                        {(score * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: '24px',
                      borderRadius: '12px',
                      background: 'linear-gradient(90deg, #EF4444 0%, #F59E0B 50%, #10B981 100%)',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        left: `${score * 100}%`,
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        background: '#1F2937',
                        transform: 'translateX(-50%)',
                        zIndex: 2
                      }} />
                      <div style={{
                        position: 'absolute',
                        left: `${score * 100}%`,
                        top: '24px',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '6px solid transparent',
                        borderRight: '6px solid transparent',
                        borderTop: '8px solid #1F2937',
                        zIndex: 2
                      }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: '#9CA3AF' }}>
                      <span>Negative</span>
                      <span>Neutral</span>
                      <span>Positive</span>
                    </div>
                  </div>

                  {/* Sentiment Breakdown */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    <div style={{
                      padding: '12px',
                      background: score < 0.4 ? '#FEE2E2' : '#F9FAFB',
                      borderRadius: '8px',
                      border: score < 0.4 ? '2px solid #EF4444' : '1px solid #E5E7EB'
                    }}>
                      <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Negative</div>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: '#EF4444' }}>
                        {score < 0.4 ? ((1 - score) * 100).toFixed(1) : '0.0'}%
                      </div>
                    </div>
                    <div style={{
                      padding: '12px',
                      background: score >= 0.4 && score < 0.6 ? '#FEF3C7' : '#F9FAFB',
                      borderRadius: '8px',
                      border: score >= 0.4 && score < 0.6 ? '2px solid #F59E0B' : '1px solid #E5E7EB'
                    }}>
                      <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Neutral</div>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: '#F59E0B' }}>
                        {score >= 0.4 && score < 0.6 ? ((score - 0.4) * 500).toFixed(1) : '0.0'}%
                      </div>
                    </div>
                    <div style={{
                      padding: '12px',
                      background: score >= 0.6 ? '#D1FAE5' : '#F9FAFB',
                      borderRadius: '8px',
                      border: score >= 0.6 ? '2px solid #10B981' : '1px solid #E5E7EB'
                    }}>
                      <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Positive</div>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: '#10B981' }}>
                        {score >= 0.6 ? ((score - 0.6) * 250).toFixed(1) : '0.0'}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    background: '#3B82F6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#2563EB'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#3B82F6'}
                >
                  <Reply size={16} />
                  {selectedReview.replied ? 'Edit Reply' : 'Reply'}
                </button>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    background: selectedReview.resolved ? '#6B7280' : '#10B981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = selectedReview.resolved ? '#4B5563' : '#059669'}
                  onMouseLeave={(e) => e.currentTarget.style.background = selectedReview.resolved ? '#6B7280' : '#10B981'}
                >
                  <CheckCircle size={16} />
                  {selectedReview.resolved ? 'Mark Unresolved' : 'Mark Resolved'}
                </button>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    background: 'white',
                    color: '#6B7280',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F9FAFB';
                    e.currentTarget.style.borderColor = '#D1D5DB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = '#E5E7EB';
                  }}
                >
                  <Flag size={16} />
                  Flag
                </button>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    background: 'white',
                    color: '#6B7280',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F9FAFB';
                    e.currentTarget.style.borderColor = '#D1D5DB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = '#E5E7EB';
                  }}
                >
                  <Archive size={16} />
                  Archive
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }

  // List view
  return (
      <div id="reviews-page" style={{ paddingTop: 0, paddingBottom: 20 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>

          {/* Statistics Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280', marginBottom: '8px' }}>Total Reviews</div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937' }}>{stats.total}</div>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280', marginBottom: '8px' }}>Positive</div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#10B981' }}>{stats.positive}</div>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280', marginBottom: '8px' }}>Negative</div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#EF4444' }}>{stats.negative}</div>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280', marginBottom: '8px' }}>Replied</div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#3B82F6' }}>{stats.replied}</div>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280', marginBottom: '8px' }}>Resolved</div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#8B5CF6' }}>{stats.resolved}</div>
            </div>
          </div>

          {/* Filters and Search */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Search */}
              <div style={{
                flex: '1',
                minWidth: '250px',
                position: 'relative'
              }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 40px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                  onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                />
              </div>

              {/* Sentiment Filter */}
              <select
                value={sentimentFilter}
                onChange={(e) => setSentimentFilter(e.target.value)}
                style={{
                  padding: '10px 12px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: 'white',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="all">All Sentiments</option>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
                <option value="neutral">Neutral</option>
              </select>

              {/* Topic Filter */}
              <select
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                style={{
                  padding: '10px 12px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: 'white',
                  cursor: 'pointer',
                  outline: 'none',
                  minWidth: '180px'
                }}
              >
                <option value="all">All Topics</option>
                {topics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '10px 12px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: 'white',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="all">All Status</option>
                <option value="replied">Replied</option>
                <option value="unreplied">Unreplied</option>
                <option value="resolved">Resolved</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '10px 12px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: 'white',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="date">Sort by Date</option>
                <option value="sentiment">Sort by Sentiment</option>
                <option value="topic">Sort by Topic</option>
              </select>
            </div>
          </div>

          {/* Reviews List */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            {filteredReviews.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
                No reviews found matching your filters.
              </div>
            ) : (
              <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {filteredReviews.map((review, index) => {
                  const score = getSentimentScore(review.sentiment, review);
                  const sentimentInfo = getSentimentInfo(score);
                  const SentimentIcon = sentimentInfo.icon;
                  const customerName = `${review.customer?.firstName || ''} ${review.customer?.lastName || ''}`.trim() || 'Unknown';

                  return (
                    <div
                      key={review.id}
                      onClick={() => setSelectedReview(review)}
                      style={{
                        padding: '20px',
                        borderBottom: index < filteredReviews.length - 1 ? '1px solid #F3F4F6' : 'none',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease',
                        background: 'transparent'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        {/* Avatar */}
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          background: getAvatarColor(customerName),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontWeight: '600',
                          fontSize: '20px',
                          flexShrink: 0
                        }}>
                          {getInitial(customerName)}
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <div>
                              <div style={{ fontWeight: '600', fontSize: '16px', color: '#1F2937', marginBottom: '4px' }}>
                                {customerName}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#6B7280', flexWrap: 'wrap' }}>
                                <span>{formatDate(review.date)}</span>
                                <span>•</span>
                                <span>{review.topic}</span>
                              </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                background: sentimentInfo.bgColor,
                                color: sentimentInfo.color,
                                fontSize: '12px',
                                fontWeight: '500'
                              }}>
                                <SentimentIcon size={14} />
                                {sentimentInfo.label}
                              </div>
                              {review.replied && (
                                <div style={{
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  background: '#DBEAFE',
                                  color: '#1E40AF',
                                  fontSize: '12px',
                                  fontWeight: '500'
                                }}>
                                  Replied
                                </div>
                              )}
                            </div>
                          </div>
                          <p style={{
                            fontSize: '14px',
                            color: '#374151',
                            lineHeight: '1.5',
                            margin: 0,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {review.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default ReviewsPage;
