import React, { useEffect, useState } from 'react';
import ReviewBox from './ReviewBox';
import { mockApi } from '../../utils/data/mockData';

// Deterministic sentiment score for sentiment=1 or 2
function getDeterministicSentimentScore(sentiment, review) {
  if (sentiment === 1) {
    // Between yellow and green (0.51-0.99)
    let hash = 0;
    for (let i = 0; i < review.content.length; i++) hash = review.content.charCodeAt(i) + ((hash << 5) - hash);
    return 0.51 + (Math.abs(hash) % 4800) / 10000;
  }
  if (sentiment === 2) {
    // Between red and yellow (0.01-0.49)
    let hash = 0;
    for (let i = 0; i < review.content.length; i++) hash = review.content.charCodeAt(i) + ((hash << 5) - hash);
    return 0.01 + (Math.abs(hash) % 4800) / 10000;
  }
  if (sentiment === 3) return 0.5;
  return 0.5;
}

const ReviewsBox = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockApi.getReviews();
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load reviews');
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div style={{
      borderRadius: 20,
      border: '1.5px solid #E5E7EB',
      boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
      background: '#fff',
      padding: '22px 28px 18px 28px',
      marginTop: 0,
      marginBottom: 24,
      width: '100%',
      height: '100%',
      minHeight: '400px',
      alignSelf: 'stretch',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
        <svg width="20" height="20" fill="none" viewBox="0 0 20 20" style={{marginRight: 4}}><path d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2Zm0 14.5A6.5 6.5 0 1 1 10 3.5a6.5 6.5 0 0 1 0 13Zm0-10.25A3.75 3.75 0 1 0 10 14.75 3.75 3.75 0 0 0 10 6.25Zm0 6A2.25 2.25 0 1 1 10 7.75a2.25 2.25 0 0 1 0 4.5Z" fill="#6B7280"/></svg>
        <span style={{ fontWeight: 600, fontSize: 18, color: '#222' }}>Reviews</span>
      </div>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', flex: 1, alignItems: 'flex-start', overflow: 'visible' }}>
        {loading ? (
          <span style={{ color: '#888', fontSize: 15 }}>Loading reviews...</span>
        ) : error ? (
          <span style={{ color: '#e11d48', fontSize: 15 }}>{error}</span>
        ) : reviews.length === 0 ? (
          <span style={{ color: '#888', fontSize: 15 }}>No reviews found.</span>
        ) : (
          reviews.map((review, idx) => {
            const name = review.customer ? `${review.customer.firstName} ${review.customer.lastName}` : 'Unknown';
            const sentimentScore = getDeterministicSentimentScore(review.sentiment, review);
            return (
              <ReviewBox
                key={idx}
                name={name}
                review={review.content}
                score={sentimentScore}
                topic={review.topic}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default ReviewsBox; 