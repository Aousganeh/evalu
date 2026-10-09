import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import logo from '../assets/logosmall.svg';
import notify from '../assets/notify.svg';
import problem from '../assets/problem.svg';
import customer from '../assets/customer.svg';
import feedback from '../assets/feedback.svg';
import analytic from '../assets/analytic.svg';
import message from '../assets/message.svg';
import greenarrow from '../assets/greenarrow.svg';
import thinarrow from '../assets/thinarrow.svg';
import { DndContext, closestCenter, closestCorners, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Edit3, Plus, X } from 'lucide-react';
import ReviewBox from '../components/reviews/ReviewBox';
import PieChartBox from '../components/charts/PieChartBox';
import DepartmentsPage from './DepartmentsPage';
import ReviewsPage from './ReviewsPage';
import UsersPage from './UsersPage';
import MonthlyStatsChart from '../components/charts/MonthlyStatsChart';
import BarChartCard from '../components/charts/BarChartCard';
import DonutChartCard from '../components/charts/DonutChartCard';
import ProgressChartCard from '../components/charts/ProgressChartCard';
import AreaChartCard from '../components/charts/AreaChartCard';
import RadarChartCard from '../components/charts/RadarChartCard';
import AppOnboardingCard from '../components/cards/AppOnboardingCard';
import UninstallsFirstOpensCard from '../components/cards/UninstallsFirstOpensCard';
import RetentionAnalysisCard from '../components/cards/RetentionAnalysisCard';
import UserClusteringCard from '../components/cards/UserClusteringCard';
import NetworkTimeoutCard from '../components/cards/NetworkTimeoutCard';
import ChartCardWrapper from '../components/common/ChartCardWrapper';
import Sidebar from '../components/common/Sidebar';
import { mockApi, mockAdditionalStats } from '../utils/data/mockData';
import AIInsight from '../components/ai/AIInsight';


// Optimized CSS animations with better performance
const animationStyles = `
  @keyframes pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.9;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.05);
      opacity: 1;
    }
  }
  
  @keyframes ripple {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0,0,0);
    }
    40%, 43% {
      transform: translate3d(0, -6px, 0);
    }
    70% {
      transform: translate3d(0, -3px, 0);
    }
    90% {
      transform: translate3d(0, -1px, 0);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-4px);
    }
  }

  .draggable-stat-card {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, box-shadow, opacity;
    width: 100%;
    height: auto;
    min-height: auto;
    max-width: 100%;
    box-sizing: border-box;
  }

  .draggable-stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.12);
  }

  .droppable-row {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, border-color, background-color;
  }

  .drop-zone-indicator {
    transition: all 0.2s ease;
    will-change: transform, opacity;
  }

  .card-grid {
    transition: all 0.2s ease;
    will-change: grid-template-columns;
  }

  .stat-card {
    width: 100%;
    height: auto;
    min-height: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .edit-button {
    transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, box-shadow, background, border, color;
    background: transparent;
    color: #374151;
    border: 1.5px solid #e5e7eb;
    border-radius: 8px;
    padding: 8px 16px;
    font-weight: 500;
    font-size: 15px;
    box-shadow: none;
    outline: none;
    cursor: pointer;
    display: flex;
    alignItems: center;
    gap: 8px;
  }

  .edit-button:hover, .edit-button:focus {
    background: #f3f4f6;
    border-color: #cbd5e1;
    color: #2563eb;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.07);
    transform: translateY(-1px) scale(1.03);
  }

  .add-card-item {
    transition: all 0.15s ease;
    will-change: background-color, border-color, transform;
    background: #f8fafc;
    border: 1.5px dashed #e5e7eb;
    border-radius: 8px;
    color: #374151;
  }

  .add-card-item:hover, .add-card-item:focus {
    background: #f1f5f9;
    border-color: #60a5fa;
    color: #2563eb;
    transform: translateY(-1px) scale(1.02);
  }

  .drop-zone-indicator {
    transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, opacity, background, border;
    background: rgba(59, 130, 246, 0.07) !important;
    border: 2px dashed #60a5fa !important;
    box-shadow: 0 2px 12px rgba(59, 130, 246, 0.07);
    border-radius: 16px !important;
  }
`;

// Inject styles only once
if (typeof document !== 'undefined' && !document.getElementById('dashboard-animations')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'dashboard-animations';
  styleSheet.textContent = animationStyles;
  document.head.appendChild(styleSheet);
}

const avatarUrl = 'https://c.animaapp.com/4Ezm8fFj/img/avatar-image@2x.png';

const thinArrowStyle = { width: 11, height: 11 };

// Memoized DraggableStatCard component for better performance
const DraggableStatCard = React.memo(({ id, children, isEditMode, onRemove, isLastMoved, cardTitle, isChartCard = false }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = useMemo(() => ({
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition || 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: isDragging ? 1000 : 1,
    background: isDragging
      ? 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
      : '#f8f9fa',
    borderRadius: 12,
    border: isDragging
      ? '2px solid #3b82f6'
      : '1px solid #dcdcdc',
    position: 'relative',
    boxShadow: isDragging
      ? '0 20px 40px rgba(59, 130, 246, 0.3), 0 8px 16px rgba(0,0,0,0.2)'
      : '0 2px 8px rgba(0,0,0,0.08)',
    cursor: isDragging ? 'grabbing' : isEditMode ? 'grab' : 'default',
    marginBottom: 0,
    opacity: isDragging ? 0.95 : 1,
    filter: isDragging ? 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' : 'none',
    animation: isLastMoved ? 'bounce 0.4s ease-out' : 'none',
    width: '100%',
    height: 'auto',
    minHeight: 'auto',
    maxWidth: '100%',
    boxSizing: 'border-box',
  }), [transform, transition, isDragging, isEditMode, isLastMoved]);

  const handleRemove = useCallback(() => {
    onRemove(id);
  }, [id, onRemove]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="draggable-stat-card"
      {...(isEditMode ? { ...attributes, ...listeners } : {})}
    >
      {isEditMode && (
        <>
          {/* Drag handle only in edit mode */}
          <div
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 11,
              cursor: 'grab',
              opacity: 0.7,
              background: 'rgba(255,255,255,0.85)',
              borderRadius: '50%',
              width: 26,
              height: 26,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              transition: 'all 0.15s',
            }}
            {...attributes}
            {...listeners}
            onMouseDown={e => e.stopPropagation()}
            onTouchStart={e => e.stopPropagation()}
          >
            <GripVertical size={14} color="#6b7280" />
          </div>
          {/* Remove button */}
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              cursor: 'pointer',
              zIndex: 12,
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '50%',
              width: 26,
              height: 26,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
              opacity: 0.6,
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
            }}
            onClick={e => { e.stopPropagation(); handleRemove(); }}
            onMouseDown={e => e.stopPropagation()}
            onTouchStart={e => e.stopPropagation()}
            onMouseEnter={(e) => {
              e.target.style.opacity = '1';
              e.target.style.transform = 'scale(1.1)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '0.6';
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
            }}
          >
            <X size={14} color="#6b7280" />
          </div>
        </>
      )}
      {children}
    </div>
  );
});

// Memoized DroppableRow component
const DroppableRow = React.memo(({ rowIndex, children, isEmpty, isEditMode, cardCount, idPrefix = 'row' }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `${idPrefix}-${rowIndex}`,
  });

  const isFull = cardCount >= 3;

  const rowStyle = useMemo(() => ({
    border: isOver && !isFull ? '2px dashed #60a5fa' :
           isOver && isFull ? '2px dashed #fca5a5' :
           isEditMode ? '1.5px solid #e5e7eb' : '1.5px solid transparent',
    borderRadius: '16px',
    padding: isOver ? '18px' : '4px',
    background: isOver && !isFull
      ? 'rgba(59, 130, 246, 0.07)'
      : isOver && isFull
        ? 'rgba(239, 68, 68, 0.07)'
        : isEditMode
          ? 'rgba(243, 244, 246, 0.5)'
          : 'transparent',
    transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
    minHeight: isOver ? '140px' : 'auto',
    transform: isOver ? 'scale(1.01)' : 'scale(1)',
    boxShadow: isOver && !isFull
      ? '0 2px 12px rgba(59, 130, 246, 0.07)'
      : isOver && isFull
        ? '0 2px 12px rgba(239, 68, 68, 0.07)'
        : isEditMode
          ? '0 1.5px 6px rgba(0,0,0,0.03)'
          : 'none',
    position: 'relative',
    overflow: 'visible',
  }), [isOver, isFull, isEditMode]);

  return (
    <div
      ref={setNodeRef}
      style={rowStyle}
      className="droppable-row"
    >
      {/* Optimized drop zone indicator */}
      {isOver && !isFull && (
        <div
          className="drop-zone-indicator"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse 1.2s ease-in-out infinite',
            zIndex: 1,
            opacity: 0.8,
            pointerEvents: 'none',
          }}
        >
          <div style={{
            width: '30px',
            height: '30px',
            border: '2px solid white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>+</span>
          </div>
        </div>
      )}

      {/* Optimized full row indicator */}
      {isOver && isFull && (
        <div
          className="drop-zone-indicator"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse 0.8s ease-in-out infinite',
            zIndex: 1,
            opacity: 0.9,
            pointerEvents: 'none',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>Row Full</span>
            <span style={{ color: 'white', fontSize: '12px' }}>(3/3)</span>
          </div>
        </div>
      )}

      {/* Optimized ripple effect */}
      {isOver && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          animation: 'ripple 0.4s ease-out',
          pointerEvents: 'none',
        }} />
      )}

      <div style={{
        position: 'relative',
        zIndex: 2,
        opacity: isOver ? 0.8 : 1,
        transition: 'opacity 0.2s ease',
      }}>
        {children}
      </div>
    </div>
  );
});

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState('overview');
  const [customerCount, setCustomerCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [negativeReviewsCount, setNegativeReviewsCount] = useState(0);
  const [mostNegativeTopic, setMostNegativeTopic] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [reviewsUpdating, setReviewsUpdating] = useState(false);
  const [negativeReviewsUpdating, setNegativeReviewsUpdating] = useState(false);
  const [topicUpdating, setTopicUpdating] = useState(false);
  const [solvedReviewsCount, setSolvedReviewsCount] = useState(0);
  const [solvedReviewsUpdating, setSolvedReviewsUpdating] = useState(false);
  const [positiveReviewsCount, setPositiveReviewsCount] = useState(0);
  const [positiveReviewsUpdating, setPositiveReviewsUpdating] = useState(false);
  const [customerSatisfaction, setCustomerSatisfaction] = useState(0);
  const [averageResponseTime, setAverageResponseTime] = useState('');
  const [resolutionRate, setResolutionRate] = useState(0);
  const [reviewResponseRate, setReviewResponseRate] = useState(0);
  const [customerRetention, setCustomerRetention] = useState(0);
  const [activeUsersToday, setActiveUsersToday] = useState(0);
  const [statCardOrder, setStatCardOrder] = useState([
    'customers', 'reviews', 'positive', 'solvedReviews', 'negative', 'mostNegativeTopic'
  ]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load sidebar collapsed state from localStorage
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  // Check if mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Save sidebar collapsed state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);
  // Separate stat cards from chart cards
  const statCardIds = [
    'customers', 'reviews', 'positive', 'negative', 'solvedReviews', 'mostNegativeTopic',
    'customerSatisfaction', 'responseTime', 'resolutionRate', 'reviewResponseRate',
    'customerRetention', 'activeUsersToday'
  ];

  const chartCardIds = [
    'barChart', 'donutChart', 'progressChart', 'areaChart', 'radarChart',
    'monthlyChart', 'appOnboarding',
    'uninstallsFirstOpens', 'retentionAnalysis', 'userClustering', 'networkTimeout'
  ];

  const [statCardsLayout, setStatCardsLayout] = useState(() => {
    const savedLayout = localStorage.getItem('statCardsLayout');
    return savedLayout ? JSON.parse(savedLayout) : [
      ['customers', 'reviews', 'positive'],
      ['solvedReviews', 'negative', 'mostNegativeTopic']
    ];
  });

  const [chartCardsLayout, setChartCardsLayout] = useState(() => {
    const savedLayout = localStorage.getItem('chartCardsLayout');
    return savedLayout ? JSON.parse(savedLayout) : [];
  });
  const [lastMovedCard, setLastMovedCard] = useState(null);
  const [activeCardId, setActiveCardId] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor));
  const [reviews, setReviews] = useState([]);

  const fetchNegativeReviewsCount = async () => {
    try {
      if (!loading) {
        setNegativeReviewsUpdating(true);
      }
      console.log('Fetching negative reviews count...');

      const data = await mockApi.getNegativeReviewCount();
      console.log('Mock negative reviews response data:', data);

      const count = parseInt(data, 10);
      console.log('Parsed negative reviews count:', count);

      setNegativeReviewsCount(count);
    } catch (err) {
      console.error('Error fetching negative reviews count:', err);
      setNegativeReviewsCount(0);
    } finally {
      setNegativeReviewsUpdating(false);
    }
  };

  const fetchReviewsCount = async () => {
    try {
      if (!loading) {
        setReviewsUpdating(true);
      }
      console.log('Fetching reviews count...');

      const data = await mockApi.getReviewCount();
      console.log('Mock reviews response data:', data);

      const count = parseInt(data, 10);
      console.log('Parsed reviews count:', count);

      setReviewsCount(count);
    } catch (err) {
      console.error('Error fetching reviews count:', err);
      setReviewsCount(0);
    } finally {
      setReviewsUpdating(false);
    }
  };

  const fetchCustomerCount = async () => {
    try {
      if (!loading) {
        setIsUpdating(true); // Show updating indicator for subsequent calls
      } else {
        setLoading(true);
      }
      console.log('Fetching customer count...');

      const data = await mockApi.getCustomerCount();
      console.log('Mock customer response data:', data);

      const count = parseInt(data, 10);
      console.log('Parsed customer count:', count);

      setCustomerCount(count);
      setError(null);
    } catch (err) {
      console.error('Error fetching customer count:', err);
      setError(`Failed to load customer count: ${err.message}`);
      setCustomerCount(0);
    } finally {
      setLoading(false);
      setIsUpdating(false);
    }
  };

  const fetchSolvedReviewsCount = async () => {
    try {
      setSolvedReviewsUpdating(true);
      const data = await mockApi.getSolvedReviewCount();
      const count = parseInt(data, 10);
      setSolvedReviewsCount(count);
    } catch (err) {
      setSolvedReviewsCount(0);
    } finally {
      setSolvedReviewsUpdating(false);
    }
  };

  const fetchPositiveReviewsCount = async () => {
    try {
      setPositiveReviewsUpdating(true);
      const data = await mockApi.getPositiveReviewCount();
      const count = parseInt(data, 10);
      setPositiveReviewsCount(count);
    } catch (err) {
      setPositiveReviewsCount(0);
    } finally {
      setPositiveReviewsUpdating(false);
    }
  };

  // Fetch additional statistics
  const fetchAdditionalStats = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setCustomerSatisfaction(mockAdditionalStats.customerSatisfaction);
      setAverageResponseTime(mockAdditionalStats.averageResponseTime);
      setResolutionRate(mockAdditionalStats.resolutionRate);
      setReviewResponseRate(mockAdditionalStats.reviewResponseRate);
      setCustomerRetention(mockAdditionalStats.customerRetention);
      setActiveUsersToday(mockAdditionalStats.activeUsersToday);
    } catch (err) {
      console.error('Error fetching additional stats:', err);
    }
  };

  // Save layouts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('statCardsLayout', JSON.stringify(statCardsLayout));
  }, [statCardsLayout]);

  useEffect(() => {
    localStorage.setItem('chartCardsLayout', JSON.stringify(chartCardsLayout));
  }, [chartCardsLayout]);


  useEffect(() => {
    fetchCustomerCount();
    fetchReviewsCount();
    fetchNegativeReviewsCount();
    fetchMostNegativeTopic();
    fetchSolvedReviewsCount();
    fetchPositiveReviewsCount();
    fetchAdditionalStats();

    // Set up polling every 5 seconds for real-time updates
    const interval = setInterval(() => {
      console.log('Polling for updates...');
      fetchCustomerCount();
      fetchReviewsCount();
      fetchNegativeReviewsCount();
      fetchMostNegativeTopic();
      fetchSolvedReviewsCount();
      fetchPositiveReviewsCount();
      fetchAdditionalStats();
    }, 5000); // 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Fetch most negative topic
  const fetchMostNegativeTopic = async () => {
    try {
      if (!loading) {
        setTopicUpdating(true);
      }
      console.log('Fetching most negative topic...');

      const data = await mockApi.getMostNegativeTopic();
      console.log('Mock most negative topic response data:', data);

      setMostNegativeTopic(data.trim());
    } catch (err) {
      console.error('Error fetching most negative topic:', err);
      setMostNegativeTopic('N/A');
    } finally {
      setTopicUpdating(false);
    }
  };

  // Calculate negative reviews ratio and get color
  const getNegativeReviewsRatio = () => {
    if (reviewsCount === 0) return { ratio: 0, color: '#FFFBEB' }; // Very light amber
    const ratio = (negativeReviewsCount / reviewsCount) * 100;
    if (ratio <= 10) return { ratio, color: '#FFFBEB' }; // Very light amber
    if (ratio <= 20) return { ratio, color: '#FEF3C7' }; // Light amber
    if (ratio <= 30) return { ratio, color: '#FDE68A' }; // Lighter amber
    if (ratio <= 40) return { ratio, color: '#FCD34D' }; // Medium amber
    if (ratio <= 50) return { ratio, color: '#FBBF24' }; // Bright amber
    if (ratio <= 60) return { ratio, color: '#F59E0B' }; // Orange
    if (ratio <= 70) return { ratio, color: '#EF4444' }; // Light red
    if (ratio <= 85) return { ratio, color: '#DC2626' }; // Medium red
    return { ratio, color: '#B91C1C' }; // Deep red
  };

  // Calculate positive reviews ratio and get color
  const getPositiveReviewsRatio = () => {
    if (reviewsCount === 0 || positiveReviewsCount === 0) return { ratio: 0, color: '#f8f9fa' };
    const ratio = (positiveReviewsCount / reviewsCount) * 100;
    if (ratio <= 10) return { ratio, color: '#ECFDF5' }; // Very light emerald
    if (ratio <= 20) return { ratio, color: '#D1FAE5' }; // Light emerald
    if (ratio <= 35) return { ratio, color: '#A7F3D0' }; // Lighter emerald
    if (ratio <= 50) return { ratio, color: '#6EE7B7' }; // Medium emerald
    if (ratio <= 65) return { ratio, color: '#34D399' }; // Bright emerald
    if (ratio <= 85) return { ratio, color: '#10B981' }; // Strong emerald
    return { ratio, color: '#059669' }; // Deep emerald
  };

  // Define all available cards with metadata
  const allAvailableCards = {
    customers: { title: 'Total Customers', icon: customer, removable: true },
    reviews: { title: 'Total Reviews', icon: feedback, removable: true },
    positive: { title: 'Positive Reviews', icon: feedback, removable: true },
    negative: { title: 'Negative Reviews', icon: feedback, removable: true },
    solvedReviews: { title: 'Solved Reviews', icon: analytic, removable: true },
    mostNegativeTopic: { title: 'Most Negative Topic', icon: problem, removable: true },
    customerSatisfaction: { title: 'Customer Satisfaction', icon: feedback, removable: true },
    responseTime: { title: 'Avg Response Time', icon: message, removable: true },
    resolutionRate: { title: 'Resolution Rate', icon: analytic, removable: true },
    reviewResponseRate: { title: 'Review Response Rate', icon: message, removable: true },
    customerRetention: { title: 'Customer Retention', icon: customer, removable: true },
    activeUsersToday: { title: 'Active Users Today', icon: customer, removable: true },
    barChart: { title: 'Weekly Activity', icon: analytic, removable: true },
    donutChart: { title: 'Issue Distribution', icon: analytic, removable: true },
    progressChart: { title: 'Performance Metrics', icon: analytic, removable: true },
    areaChart: { title: 'Financial Overview', icon: analytic, removable: true },
    radarChart: { title: 'Performance Radar', icon: analytic, removable: true },
    monthlyChart: { title: 'Monthly Statistics', icon: analytic, removable: true },
    appOnboarding: { title: 'App Onboarding Analysis', icon: analytic, removable: true },
    uninstallsFirstOpens: { title: 'Uninstalls & First Opens', icon: analytic, removable: true },
    retentionAnalysis: { title: 'Retention Analysis', icon: analytic, removable: true },
    userClustering: { title: 'User Clustering Analysis', icon: analytic, removable: true },
    networkTimeout: { title: 'Network Timeout Error', icon: problem, removable: true },
  };

  // Now define statCardMap after all helpers
  const statCardMap = {
    customers: (
      <AIInsight
        insight={{
          id: 'customers-insight',
          text: `Total customers have grown to ${customerCount}, showing a 0.5% increase. This steady growth indicates healthy customer acquisition. Consider analyzing customer segments to identify high-value cohorts.`,
          placement: 'bottom'
        }}
        placement="bottom"
      >
        <div className="stat-card">
          <div className="stat-header">
            <img src={customer} alt="Total Customers" className="icon" />
            <span>Total Customers</span>
          </div>
          <div className="stat-value">
            <h2>{customerCount}</h2>
            <div className="stat-change">
              <img src={greenarrow} alt="Up" className="icon" />
              <span className="positive">0.5%</span>
            </div>
          </div>
        </div>
      </AIInsight>
    ),
    reviews: (
      <AIInsight
        insight={{
          id: 'reviews-insight',
          text: `Total reviews have reached ${reviewsCount} with a significant 20.5% increase. This high growth rate suggests strong customer engagement. Monitor review quality and response times to maintain this momentum.`,
          placement: 'bottom'
        }}
        placement="bottom"
      >
        <div className="stat-card">
          <div className="stat-header">
            <img src={feedback} alt="Total Reviews" className="icon" />
            <span>Total Reviews</span>
          </div>
          <div className="stat-value">
            <h2>{reviewsCount}</h2>
            <div className="stat-change">
              <img src={greenarrow} alt="Up" className="icon" />
              <span className="positive">20.5%</span>
            </div>
          </div>
        </div>
      </AIInsight>
    ),
    positive: (
      <AIInsight
        insight={{
          id: 'positive-insight',
          text: `Positive reviews account for ${getPositiveReviewsRatio().ratio.toFixed(1)}% of all reviews (${positiveReviewsCount} total). This is a strong indicator of customer satisfaction. Continue focusing on the factors that drive positive experiences.`,
          placement: 'bottom'
        }}
        placement="bottom"
      >
        <div className="stat-card" style={{ backgroundColor: getPositiveReviewsRatio().color, color: positiveReviewsCount === 0 ? '#374151' : 'black' }}>
          <div className="stat-header">
            <img src={feedback} alt="Positive Reviews" className="icon" style={{ filter: positiveReviewsCount === 0 ? 'none' : 'brightness(0)' }} />
            <span>Positive Reviews</span>
          </div>
          <div className="stat-value">
            <h2>{positiveReviewsCount}</h2>
            <div className="stat-change">
              <span style={{ color: positiveReviewsCount === 0 ? '#6b7280' : 'black' }}>
                {positiveReviewsCount === 0 ? 'No positive reviews' : `${getPositiveReviewsRatio().ratio.toFixed(1)}% of total`}
              </span>
            </div>
          </div>
        </div>
      </AIInsight>
    ),
    negative: (
      <AIInsight
        insight={{
          id: 'negative-insight',
          text: negativeReviewsCount === 0
            ? 'Excellent! No negative reviews currently. Maintain this high standard by continuing to address customer concerns proactively.'
            : `Negative reviews represent ${getNegativeReviewsRatio().ratio.toFixed(1)}% of total reviews (${negativeReviewsCount} reviews). Focus on addressing the most common issues mentioned in these reviews to improve overall satisfaction.`,
          placement: 'bottom'
        }}
        placement="bottom"
      >
        <div className="stat-card" style={{ backgroundColor: negativeReviewsCount === 0 ? '#f8f9fa' : getNegativeReviewsRatio().color, color: negativeReviewsCount === 0 ? '#374151' : 'black' }}>
          <div className="stat-header">
            <img src={feedback} alt="Negative Reviews" className="icon" style={{ filter: negativeReviewsCount === 0 ? 'none' : 'brightness(0)' }} />
            <span>Negative Reviews</span>
          </div>
          <div className="stat-value">
            <h2>{negativeReviewsCount}</h2>
            <div className="stat-change">
              <span style={{ color: negativeReviewsCount === 0 ? '#6b7280' : 'black' }}>
                {negativeReviewsCount === 0 ? 'No negative reviews' : `${getNegativeReviewsRatio().ratio.toFixed(1)}% of total`}
              </span>
            </div>
          </div>
        </div>
      </AIInsight>
    ),
    solvedReviews: (
      <AIInsight
        insight={{
          id: 'solved-reviews-insight',
          text: `${solvedReviewsCount} reviews have been resolved. This represents ${reviewsCount > 0 ? ((solvedReviewsCount / reviewsCount) * 100).toFixed(1) : 0}% resolution rate. Continue prioritizing timely responses to maintain customer trust.`,
          placement: 'bottom'
        }}
        placement="bottom"
      >
        <div className="stat-card">
          <div className="stat-header">
            <img src={analytic} alt="Solved Reviews" className="icon" />
            <span>Solved Reviews</span>
          </div>
          <div className="stat-value">
            <h2>
              <span>{solvedReviewsCount}</span>
            </h2>
          </div>
        </div>
      </AIInsight>
    ),
    mostNegativeTopic: (
      <AIInsight
        insight={{
          id: 'most-negative-topic-insight',
          text: mostNegativeTopic
            ? `"${mostNegativeTopic}" is the most common negative topic. Prioritize addressing this issue through product improvements, customer communication, or targeted support initiatives.`
            : 'Analyzing negative review topics to identify the most common concerns. This will help prioritize improvement areas.',
          placement: 'bottom'
        }}
        placement="bottom"
      >
        <div className="stat-card">
          <div className="stat-header">
            <img src={problem} alt="Most Negative Topic" className="icon" />
            <span>Most Negative Topic</span>
          </div>
          <div className="stat-value">
            <h2><span style={{ wordBreak: 'break-word' }}>{mostNegativeTopic || 'Loading...'}</span></h2>
          </div>
        </div>
      </AIInsight>
    ),
    customerSatisfaction: (
      <AIInsight
        insight={{
          id: 'customer-satisfaction-insight',
          text: customerSatisfaction >= 85
            ? `Customer satisfaction is at ${customerSatisfaction.toFixed(1)}%, which is excellent. Maintain this high standard by continuing to deliver exceptional service and proactively addressing any concerns.`
            : customerSatisfaction >= 70
            ? `Customer satisfaction is at ${customerSatisfaction.toFixed(1)}%, which is good but has room for improvement. Focus on enhancing product quality and customer support to reach the excellent threshold of 85%+.`
            : `Customer satisfaction is at ${customerSatisfaction.toFixed(1)}%, which needs attention. Prioritize addressing common customer complaints and improving service quality to boost satisfaction levels.`,
          placement: 'bottom'
        }}
        placement="bottom"
      >
        <div className="stat-card" style={{ backgroundColor: customerSatisfaction >= 85 ? '#D1FAE5' : customerSatisfaction >= 70 ? '#DBEAFE' : '#FEE2E2', color: customerSatisfaction >= 85 ? '#065F46' : customerSatisfaction >= 70 ? '#1E40AF' : '#991B1B' }}>
          <div className="stat-header">
            <img src={feedback} alt="Customer Satisfaction" className="icon" style={{ filter: 'brightness(0)', opacity: 0.8 }} />
            <span>Customer Satisfaction</span>
          </div>
          <div className="stat-value">
            <h2>{customerSatisfaction.toFixed(1)}%</h2>
            <div className="stat-change">
              <span style={{ color: customerSatisfaction >= 85 ? '#065F46' : customerSatisfaction >= 70 ? '#1E40AF' : '#991B1B' }}>
                {customerSatisfaction >= 85 ? 'Excellent' : customerSatisfaction >= 70 ? 'Good' : 'Needs improvement'}
              </span>
            </div>
          </div>
        </div>
      </AIInsight>
    ),
    responseTime: (
      <AIInsight
        insight={{
          id: 'response-time-insight',
          text: `Average response time is ${averageResponseTime || 'being optimized'}, showing a 12.3% improvement. Quick response times are crucial for customer satisfaction. Consider implementing chatbots for common queries and optimizing support workflows to maintain this positive trend.`,
          placement: 'bottom'
        }}
        placement="bottom"
      >
        <div className="stat-card">
          <div className="stat-header">
            <img src={message} alt="Avg Response Time" className="icon" />
            <span>Avg Response Time</span>
          </div>
          <div className="stat-value">
            <h2>{averageResponseTime || 'Loading...'}</h2>
            <div className="stat-change">
              <img src={greenarrow} alt="Down" className="icon" />
              <span className="positive">12.3%</span>
            </div>
          </div>
        </div>
      </AIInsight>
    ),
    resolutionRate: (
      <AIInsight
        insight={{
          id: 'resolution-rate-insight',
          text: resolutionRate >= 80
            ? `Resolution rate is ${resolutionRate.toFixed(1)}%, which is high. This indicates effective problem-solving capabilities. Continue empowering support agents with better tools and knowledge resources to maintain this excellent performance.`
            : resolutionRate >= 60
            ? `Resolution rate is ${resolutionRate.toFixed(1)}%, which is medium. Focus on improving first-contact resolution by enhancing agent training and providing comprehensive knowledge bases to reduce the need for multiple interactions.`
            : `Resolution rate is ${resolutionRate.toFixed(1)}%, which needs improvement. Many issues require multiple interactions. Prioritize empowering support agents with better tools, training, and knowledge bases to increase first-contact resolution.`,
          placement: 'bottom'
        }}
        placement="bottom"
      >
        <div className="stat-card" style={{ backgroundColor: resolutionRate >= 80 ? '#D1FAE5' : resolutionRate >= 60 ? '#DBEAFE' : '#FEE2E2', color: resolutionRate >= 80 ? '#065F46' : resolutionRate >= 60 ? '#1E40AF' : '#991B1B' }}>
          <div className="stat-header">
            <img src={analytic} alt="Resolution Rate" className="icon" style={{ filter: 'brightness(0)', opacity: 0.8 }} />
            <span>Resolution Rate</span>
          </div>
          <div className="stat-value">
            <h2>{resolutionRate.toFixed(1)}%</h2>
            <div className="stat-change">
              <span style={{ color: resolutionRate >= 80 ? '#065F46' : resolutionRate >= 60 ? '#1E40AF' : '#991B1B' }}>
                {resolutionRate >= 80 ? 'High' : resolutionRate >= 60 ? 'Medium' : 'Low'}
              </span>
            </div>
          </div>
        </div>
      </AIInsight>
    ),
    reviewResponseRate: (
      <AIInsight
        insight={{
          id: 'review-response-rate-insight',
          text: reviewResponseRate >= 90
            ? `Review response rate is ${reviewResponseRate.toFixed(1)}%, which is excellent. Responding to reviews shows customers you value their feedback. Continue maintaining this high response rate to build trust and demonstrate commitment to customer satisfaction.`
            : reviewResponseRate >= 75
            ? `Review response rate is ${reviewResponseRate.toFixed(1)}%, which is good. To improve further, set up review monitoring alerts and create response templates to ensure timely responses to all customer feedback.`
            : `Review response rate is ${reviewResponseRate.toFixed(1)}%, which needs attention. Not all reviews are being addressed promptly. Implement review monitoring alerts and response templates to ensure every customer review receives a timely, personalized response.`,
          placement: 'bottom'
        }}
        placement="bottom"
      >
        <div className="stat-card" style={{ backgroundColor: reviewResponseRate >= 90 ? '#D1FAE5' : reviewResponseRate >= 75 ? '#DBEAFE' : '#FEE2E2', color: reviewResponseRate >= 90 ? '#065F46' : reviewResponseRate >= 75 ? '#1E40AF' : '#991B1B' }}>
          <div className="stat-header">
            <img src={message} alt="Review Response Rate" className="icon" style={{ filter: 'brightness(0)', opacity: 0.8 }} />
            <span>Review Response Rate</span>
          </div>
          <div className="stat-value">
            <h2>{reviewResponseRate.toFixed(1)}%</h2>
            <div className="stat-change">
              <span style={{ color: reviewResponseRate >= 90 ? '#065F46' : reviewResponseRate >= 75 ? '#1E40AF' : '#991B1B' }}>
                {reviewResponseRate >= 90 ? 'Excellent' : reviewResponseRate >= 75 ? 'Good' : 'Needs attention'}
              </span>
            </div>
          </div>
        </div>
      </AIInsight>
    ),
    customerRetention: (
      <AIInsight
        insight={{
          id: 'customer-retention-insight',
          text: customerRetention >= 85
            ? `Customer retention is ${customerRetention.toFixed(1)}%, which is very high. This indicates strong customer loyalty and satisfaction. Continue delivering value and maintaining relationships to preserve this excellent retention rate.`
            : customerRetention >= 70
            ? `Customer retention is ${customerRetention.toFixed(1)}%, which is good. To improve further, consider implementing loyalty programs and personalized engagement campaigns to strengthen customer relationships and reduce churn.`
            : `Customer retention is ${customerRetention.toFixed(1)}%, which needs improvement. Customer churn may be increasing. Focus on creating loyalty programs, personalized engagement campaigns, and addressing the root causes of customer departure to improve retention.`,
          placement: 'bottom'
        }}
        placement="bottom"
      >
        <div className="stat-card" style={{ backgroundColor: customerRetention >= 85 ? '#D1FAE5' : customerRetention >= 70 ? '#DBEAFE' : '#FEE2E2', color: customerRetention >= 85 ? '#065F46' : customerRetention >= 70 ? '#1E40AF' : '#991B1B' }}>
          <div className="stat-header">
            <img src={customer} alt="Customer Retention" className="icon" style={{ filter: 'brightness(0)', opacity: 0.8 }} />
            <span>Customer Retention</span>
          </div>
          <div className="stat-value">
            <h2>{customerRetention.toFixed(1)}%</h2>
            <div className="stat-change">
              <span style={{ color: customerRetention >= 85 ? '#065F46' : customerRetention >= 70 ? '#1E40AF' : '#991B1B' }}>
                {customerRetention >= 85 ? 'Very high' : customerRetention >= 70 ? 'Good' : 'Needs improvement'}
              </span>
            </div>
          </div>
        </div>
      </AIInsight>
    ),
    activeUsersToday: (
      <AIInsight
        insight={{
          id: 'active-users-insight',
          text: `Active users today reached ${activeUsersToday}, showing an 8.2% increase. This growth indicates strong user engagement. To maintain momentum, consider sending push notifications for important updates and creating daily engagement features that encourage regular app usage.`,
          placement: 'bottom'
        }}
        placement="bottom"
      >
        <div className="stat-card">
          <div className="stat-header">
            <img src={customer} alt="Active Users Today" className="icon" />
            <span>Active Users Today</span>
          </div>
          <div className="stat-value">
            <h2>{activeUsersToday}</h2>
            <div className="stat-change">
              <img src={greenarrow} alt="Up" className="icon" />
              <span className="positive">8.2%</span>
            </div>
          </div>
        </div>
      </AIInsight>
    ),
    barChart: (
      <AIInsight
        insight={{
          id: 'bar-chart-insight',
          text: 'Weekly activity patterns show significant variation by day. Identify peak activity days and schedule important updates, feature releases, or marketing campaigns during these high-engagement periods to maximize impact and user participation.',
          placement: 'bottom'
        }}
        placement="bottom"
      >
        <ChartCardWrapper cardId="barChart" cardTitle="Weekly Activity">
          <BarChartCard />
        </ChartCardWrapper>
      </AIInsight>
    ),
    donutChart: (
      <AIInsight
        insight={{
          id: 'donut-chart-insight',
          text: 'Issue distribution reveals that certain categories dominate customer complaints. Customer Service (35%) and Product Quality (25%) are the top concerns. Focus resources and improvement initiatives on these high-impact areas first to address the majority of customer issues effectively.',
          placement: 'right'
        }}
        placement="right"
      >
        <ChartCardWrapper cardId="donutChart" cardTitle="Issue Distribution">
          <DonutChartCard />
        </ChartCardWrapper>
      </AIInsight>
    ),
    progressChart: (
      <AIInsight
        insight={{
          id: 'progress-chart-insight',
          text: 'Performance metrics show varying levels of achievement across different KPIs. Some metrics are below target thresholds. Create specific action plans for each underperforming metric, track progress weekly, and allocate resources strategically to improve overall performance.',
          placement: 'bottom'
        }}
        placement="bottom"
      >
        <ChartCardWrapper cardId="progressChart" cardTitle="Performance Metrics">
          <ProgressChartCard />
        </ChartCardWrapper>
      </AIInsight>
    ),
    areaChart: (
      <AIInsight
        insight={{
          id: 'area-chart-insight',
          text: 'Financial overview indicates revenue growth patterns that may be inconsistent over time. Analyze cost drivers, identify areas of inefficiency, and implement cost-saving measures while maintaining service quality to improve financial stability and growth trajectory.',
          placement: 'right'
        }}
        placement="right"
      >
        <ChartCardWrapper cardId="areaChart" cardTitle="Financial Overview">
          <AreaChartCard />
        </ChartCardWrapper>
      </AIInsight>
    ),
    radarChart: (
      <AIInsight
        insight={{
          id: 'radar-chart-insight',
          text: 'Customers rate perceived value highly (86%), reflecting strong alignment between pricing and benefits. However, pricing transparency (70%) scores lower, indicating confusion around plans or costs. Simplifying pricing communication could reduce friction and improve conversion.',
          placement: 'right'
        }}
        placement="right"
      >
        <ChartCardWrapper cardId="radarChart" cardTitle="Performance Radar">
          <RadarChartCard />
        </ChartCardWrapper>
      </AIInsight>
    ),
    monthlyChart: (
      <AIInsight
        insight={{
          id: 'monthly-chart-insight',
          text: 'Monthly statistics provide a comprehensive view of trends over time. Analyze seasonal patterns, identify growth opportunities, and compare month-over-month performance to make data-driven decisions and optimize strategies for future periods.',
          placement: 'right'
        }}
        placement="right"
      >
        <ChartCardWrapper cardId="monthlyChart" cardTitle="Monthly Statistics">
          <MonthlyStatsChart />
        </ChartCardWrapper>
      </AIInsight>
    ),
    appOnboarding: (
      <AIInsight
        insight={{
          id: 'app-onboarding-insight',
          text: 'App onboarding analysis reveals user journey patterns and potential drop-off points. Identify where users struggle during onboarding and optimize those steps. Streamline the process, add helpful tooltips, and ensure a smooth first-time user experience to improve conversion rates.',
          placement: 'bottom'
        }}
        placement="bottom"
      >
        <ChartCardWrapper cardId="appOnboarding" cardTitle="App Onboarding Analysis">
          <AppOnboardingCard />
        </ChartCardWrapper>
      </AIInsight>
    ),
    uninstallsFirstOpens: (
      <AIInsight
        insight={{
          id: 'uninstalls-first-opens-insight',
          text: 'Uninstalls and first opens data highlights critical user behavior patterns. High uninstall rates relative to first opens may indicate onboarding issues or unmet expectations. Focus on improving the first-time user experience and addressing common reasons for uninstallation to reduce churn.',
          placement: 'bottom'
        }}
        placement="bottom"
      >
        <ChartCardWrapper cardId="uninstallsFirstOpens" cardTitle="Uninstalls & First Opens">
          <UninstallsFirstOpensCard />
        </ChartCardWrapper>
      </AIInsight>
    ),
    retentionAnalysis: (
      <AIInsight
        insight={{
          id: 'retention-analysis-insight',
          text: 'Retention analysis shows how well you maintain users over time. Compare day 1, day 7, and day 30 retention rates to identify where users drop off. Implement targeted re-engagement campaigns and improve features that drive long-term value to improve retention at each stage.',
          placement: 'bottom'
        }}
        placement="bottom"
      >
        <ChartCardWrapper cardId="retentionAnalysis" cardTitle="Retention Analysis">
          <RetentionAnalysisCard />
        </ChartCardWrapper>
      </AIInsight>
    ),
    userClustering: (
      <AIInsight
        insight={{
          id: 'user-clustering-insight',
          text: 'User clustering analysis reveals distinct user segments with different behaviors and preferences. Use these insights to create personalized experiences, targeted marketing campaigns, and feature recommendations tailored to each user segment to improve engagement and satisfaction.',
          placement: 'right'
        }}
        placement="right"
      >
        <ChartCardWrapper cardId="userClustering" cardTitle="User Clustering Analysis">
          <UserClusteringCard />
        </ChartCardWrapper>
      </AIInsight>
    ),
    networkTimeout: (
      <AIInsight
        insight={{
          id: 'network-timeout-insight',
          text: 'Network timeout errors indicate connectivity or performance issues that impact user experience. Monitor error frequency, identify patterns (time of day, regions, devices), and optimize API response times, implement retry mechanisms, and improve error handling to reduce timeout occurrences.',
          placement: 'bottom'
        }}
        placement="bottom"
      >
        <ChartCardWrapper cardId="networkTimeout" cardTitle="Network Timeout Error">
          <NetworkTimeoutCard />
        </ChartCardWrapper>
      </AIInsight>
    ),
  };

  // Memoized available cards - separate for stats and charts
  const availableStatCardsToAdd = useMemo(() => {
    const allStatCardsInLayout = statCardsLayout.flat();
    return statCardIds.filter(cardId => !allStatCardsInLayout.includes(cardId));
  }, [statCardsLayout]);

  const availableChartCardsToAdd = useMemo(() => {
    const allChartCardsInLayout = chartCardsLayout.flat();
    return chartCardIds.filter(cardId => !allChartCardsInLayout.includes(cardId));
  }, [chartCardsLayout]);

  // Add Card logic - separate for stats and charts
  const addCard = useCallback((cardId, cardType) => {
    const isStatCard = statCardIds.includes(cardId);
    const isChartCard = chartCardIds.includes(cardId);

    if (isStatCard) {
      const isCardAlreadyAdded = statCardsLayout.some(row => row.includes(cardId));
    if (!isCardAlreadyAdded) {
        setStatCardsLayout(prev => {
          const newLayout = [...prev];
          for (let i = 0; i < newLayout.length; i++) {
            const row = newLayout[i];
            if (row.length < 3) {
              newLayout[i] = [...row, cardId];
              return newLayout;
            }
          }
          newLayout.push([cardId]);
          return newLayout;
        });
      }
    } else if (isChartCard) {
      const isCardAlreadyAdded = chartCardsLayout.some(row => row.includes(cardId));
      const isSpecialBox = cardId === 'monthlyChart';
    if (!isCardAlreadyAdded) {
        setChartCardsLayout(prev => {
        const newLayout = [...prev];
        if (cardId === 'monthlyChart') {
          newLayout.push([cardId]);
          return newLayout;
        }
        if (isSpecialBox) {
          for (let i = 0; i < newLayout.length; i++) {
            const row = newLayout[i];
              const hasSpecial = row.includes('monthlyChart');
              const hasNormal = row.some(id => id !== 'monthlyChart');
              if (row.includes(cardId)) continue;
            if ((row.length === 0) || (hasSpecial && !hasNormal && !row.includes(cardId) && row.length < 3)) {
              newLayout[i] = [...row, cardId];
              return newLayout;
            }
          }
          newLayout.push([cardId]);
          return newLayout;
        }
        for (let i = 0; i < newLayout.length; i++) {
          const row = newLayout[i];
            const hasSpecial = row.includes('monthlyChart');
          if (row.length < 3 && !hasSpecial) {
            newLayout[i] = [...row, cardId];
            return newLayout;
          }
        }
        newLayout.push([cardId]);
        return newLayout;
      });
    }
    }
  }, [statCardsLayout, chartCardsLayout]);

  const removeCard = useCallback((cardId) => {
    setStatCardOrder(prev => prev.filter(id => id !== cardId));
  }, []);

  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => {
      const newMode = !prev;
      if (!newMode) {
    setShowAddMenu(false);
      }
      return newMode;
    });
  }, []);

  // Optimized functions to manage layouts - separate for stats and charts
  const addNewStatRow = useCallback(() => {
    setStatCardsLayout(prev => [...prev, []]);
  }, []);

  const addNewChartRow = useCallback(() => {
    setChartCardsLayout(prev => [...prev, []]);
  }, []);

  const removeStatRow = useCallback((rowIndex) => {
    setStatCardsLayout(prev => prev.filter((_, index) => index !== rowIndex));
  }, []);

  const removeChartRow = useCallback((rowIndex) => {
    setChartCardsLayout(prev => prev.filter((_, index) => index !== rowIndex));
  }, []);

  const removeCardFromStatRow = useCallback((cardId, rowIndex) => {
    setStatCardsLayout(prev => {
      const newLayout = [...prev];
      newLayout[rowIndex] = newLayout[rowIndex].filter(id => id !== cardId);
      return newLayout;
    });
  }, []);

  const removeCardFromChartRow = useCallback((cardId, rowIndex) => {
    setChartCardsLayout(prev => {
      const newLayout = [...prev];
      newLayout[rowIndex] = newLayout[rowIndex].filter(id => id !== cardId);
      return newLayout;
    });
  }, []);

  // Retry function
  const retryFetch = () => {
    setError(null);
    setLoading(true);
    fetchCustomerCount();
  };

  // Optimized drag end handler - handles both stat and chart sections
  const handleDragEnd = useCallback((event, sectionType) => {
    const { active, over } = event;
    if (!active || !over) return;

    const isStatCard = statCardIds.includes(active.id);
    const isChartCard = chartCardIds.includes(active.id);

    // Determine which layout to use based on section type or card type
    let currentLayout, setLayout, layoutType;
    if (sectionType === 'stats' || (isStatCard && !isChartCard)) {
      currentLayout = statCardsLayout;
      setLayout = setStatCardsLayout;
      layoutType = 'stat';
    } else if (sectionType === 'charts' || (isChartCard && !isStatCard)) {
      currentLayout = chartCardsLayout;
      setLayout = setChartCardsLayout;
      layoutType = 'chart';
    } else {
      return; // Can't determine layout
    }

    if (over.id.startsWith(`${layoutType}-row-`) || over.id.startsWith('row-')) {
      const targetRowIndex = parseInt(over.id.split('-').pop());
      let activeRowIndex = -1;
      for (let i = 0; i < currentLayout.length; i++) {
        if (currentLayout[i].includes(active.id)) {
          activeRowIndex = i;
          break;
        }
      }
      if (activeRowIndex !== -1 && activeRowIndex !== targetRowIndex) {
        const targetRow = currentLayout[targetRowIndex] || [];
      const isSpecialBox = active.id === 'reviewsBox' || active.id === 'monthlyChart';
      const targetHasSpecial = targetRow.includes('reviewsBox') || targetRow.includes('monthlyChart');
      const targetHasNormal = targetRow.some(id => id !== 'reviewsBox' && id !== 'monthlyChart');

        if (active.id === 'monthlyChart' && targetRow.includes('monthlyChart')) return;
      if (active.id === 'monthlyChart' && targetRow.length > 0) return;
      if (isSpecialBox) {
        if (targetHasNormal) return;
        if (targetRow.length >= 3) return;
      } else {
        if (targetHasSpecial) return;
        if (targetRow.length >= 3) return;
      }
        setLastMovedCard(active.id);
        setTimeout(() => setLastMovedCard(null), 600);
        setLayout(prev => {
          const newLayout = [...prev];
          newLayout[activeRowIndex] = newLayout[activeRowIndex].filter(id => id !== active.id);
          if (!newLayout[targetRowIndex]) {
            newLayout[targetRowIndex] = [];
          }
          newLayout[targetRowIndex].push(active.id);
          return newLayout;
        });
      }
      return;
    }
    if (active.id === over.id) return;

    let activeRowIndex = -1;
    let activeCardIndex = -1;
    for (let i = 0; i < currentLayout.length; i++) {
      const cardIndex = currentLayout[i].indexOf(active.id);
      if (cardIndex !== -1) {
        activeRowIndex = i;
        activeCardIndex = cardIndex;
        break;
      }
    }
    let overRowIndex = -1;
    let overCardIndex = -1;
    for (let i = 0; i < currentLayout.length; i++) {
      const cardIndex = currentLayout[i].indexOf(over.id);
      if (cardIndex !== -1) {
        overRowIndex = i;
        overCardIndex = cardIndex;
        break;
      }
    }
    if (activeRowIndex !== -1 && overRowIndex !== -1) {
      const targetRow = currentLayout[overRowIndex] || [];
      const isSpecialBox = active.id === 'reviewsBox' || active.id === 'monthlyChart';
      const targetHasSpecial = targetRow.includes('reviewsBox') || targetRow.includes('monthlyChart');
      const targetHasNormal = targetRow.some(id => id !== 'reviewsBox' && id !== 'monthlyChart');

        if (active.id === 'monthlyChart' && targetRow.includes('monthlyChart')) return;
      if (active.id === 'monthlyChart' && targetRow.length > 0) return;
      if (isSpecialBox) {
        if (targetHasNormal) return;
        if (targetRow.length >= 3) return;
      } else {
        if (targetHasSpecial) return;
        if (targetRow.length >= 3) return;
      }
        setLastMovedCard(active.id);
        setTimeout(() => setLastMovedCard(null), 600);
      setLayout(prev => {
          const newLayout = [...prev];
          newLayout[activeRowIndex] = newLayout[activeRowIndex].filter(id => id !== active.id);
          const newRow = [...newLayout[overRowIndex]];
          newRow.splice(overCardIndex, 0, active.id);
          newLayout[overRowIndex] = newRow;
          return newLayout;
        });
      }
  }, [statCardsLayout, chartCardsLayout]);

  // Fetch reviews from mock API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await mockApi.getReviews();
        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        setReviews([]);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="dashboard" id="main-page">

      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo" onClick={isMobile ? toggleMobileMenu : undefined} style={{ cursor: isMobile ? 'pointer' : 'default' }}>
            <img src={logo} alt="Logo" className="logo-img" />
            <span className="logo-text">Evalu</span>
          </div>
        </div>

        <div className="header-right">
          {currentPage === 'overview' || currentPage === 'dashboard' ? (
            <>
              {isEditMode && (
                <button
                  onClick={() => setShowAddMenu(prev => !prev)}
                  className="edit-button"
                  style={{
                    background: '#f8f9fa',
                    color: '#374151',
                    border: '1px solid #dcdcdc',
                    borderRadius: '20px',
                    padding: '12px 20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: '500',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#e9ecef';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f8f9fa';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                  }}
                >
                  <Plus size={16} />
                  {showAddMenu ? 'Close' : 'Add Card'}
                </button>
              )}
              <button
                onClick={toggleEditMode}
                className="edit-button"
                style={{
                  background: '#f8f9fa',
                  color: '#374151',
                  border: '1px solid #dcdcdc',
                  borderRadius: '20px',
                  padding: '12px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: '500',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e9ecef';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f8f9fa';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                }}
              >
                <Edit3 size={16} />
                {isEditMode ? 'Done' : 'Edit'}
              </button>
            </>
          ) : null}
          <img src={notify} alt="Notification" className="icon" />
        </div>
      </header>

      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 99,
            transition: 'opacity 0.3s ease'
          }}
        />
      )}

      <div className="main-content">
        {/* Sidebar */}
        <Sidebar
          currentPage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page);
            if (isMobile) {
              setIsMobileMenuOpen(false);
            }
          }}
          isCollapsed={isMobile ? !isMobileMenuOpen : isSidebarCollapsed}
          onCollapseChange={isMobile ? () => setIsMobileMenuOpen(false) : setIsSidebarCollapsed}
        />

        {/* Main Content */}
        <div
          className="dashboard-content"
          style={{
            paddingTop: '0px',
            paddingBottom: '20px',
            paddingLeft: '20px',
            paddingRight: '20px',
            marginLeft: isMobile ? '0' : (isSidebarCollapsed ? '60px' : '240px'),
            marginTop: '20px',
            transition: 'margin-left 0.3s ease'
          }}
        >
          {currentPage === 'overview' || currentPage === 'dashboard' ? (
            <>

              {/* Add Card Menu - Popup Modal */}
              {showAddMenu && (
                <>
                  {/* Backdrop */}
                  <div
                    onClick={() => setShowAddMenu(false)}
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0, 0, 0, 0.5)',
                      zIndex: 9998,
                      animation: 'fadeIn 0.2s ease-out',
                    }}
                  />
                  {/* Modal */}
                  <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'white',
                    border: '1px solid #dcdcdc',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    zIndex: 9999,
                    maxWidth: '800px',
                    width: '90%',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    animation: 'fadeInScale 0.3s ease-out',
                  }}>
                  {/* Modal Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                  }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>
                      Add Cards to Dashboard
                    </h3>
                    <button
                      onClick={() => setShowAddMenu(false)}
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
                    >
                      <X size={20} />
                    </button>
                  </div>

              {/* Stat Cards Section */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#64748b' }}>
                  Stat Cards
                </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '12px',
              }}>
                  {availableStatCardsToAdd.map(cardId => {
                  const card = allAvailableCards[cardId];
                  return (
                    <div
                      key={cardId}
                      onClick={() => addCard(cardId)}
                      className="add-card-item"
                      style={{
                        padding: '12px',
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#f8f9fa',
                      }}
                    >
                      {card.icon && <img src={card.icon} alt="" style={{ width: 16, height: 16 }} />}
                      <span style={{ fontSize: '14px', fontWeight: '500' }}>{card.title}</span>
                    </div>
                  );
                })}
              </div>
                {availableStatCardsToAdd.length === 0 && (
                  <p style={{ textAlign: 'center', color: '#6c757d', margin: '12px 0', fontSize: '13px' }}>
                    All stat cards are already added.
                </p>
              )}
              </div>

              {/* Chart Cards Section */}
              <div>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#64748b' }}>
                  Charts & Diagrams
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '12px',
                }}>
                  {availableChartCardsToAdd.map(cardId => {
                    const card = allAvailableCards[cardId];
                    return (
                      <div
                        key={cardId}
                        onClick={() => addCard(cardId)}
                        className="add-card-item"
                        style={{
                          padding: '12px',
                          border: '1px solid #e9ecef',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: '#f8f9fa',
                        }}
                      >
                        {card.icon && <img src={card.icon} alt="" style={{ width: 16, height: 16 }} />}
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>{card.title}</span>
                      </div>
                    );
                  })}
                </div>
                {availableChartCardsToAdd.length === 0 && (
                  <p style={{ textAlign: 'center', color: '#6c757d', margin: '12px 0', fontSize: '13px' }}>
                    All chart cards are already added.
                  </p>
                )}
              </div>
                  </div>
                </>
              )}

          {/* Stat Cards Section */}
          <div style={{ marginBottom: '0px', position: 'relative' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '20px' }}>
              Metrics & Statistics
            </h2>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={event => setActiveCardId(event.active.id)}
            onDragEnd={event => {
                handleDragEnd(event, 'stats');
              setActiveCardId(null);
            }}
            onDragCancel={() => setActiveCardId(null)}
            measuring={{
              droppable: {
                strategy: 'always'
              }
            }}
          >
            <SortableContext
                items={[...statCardsLayout.flat(), ...statCardsLayout.map((_, index) => `stat-row-${index}`)]}
              strategy={verticalListSortingStrategy}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {statCardsLayout.map((row, rowIndex) => (
                    <DroppableRow key={`stat-${rowIndex}`} rowIndex={rowIndex} isEmpty={row.length === 0} isEditMode={isEditMode} cardCount={row.length} idPrefix="stat-row">
                      <div style={{ position: 'relative', marginTop: isEditMode ? '50px' : '0' }}>
                        {/* Row Controls in Edit Mode */}
                        {isEditMode && (
                          <div style={{
                            position: 'absolute',
                            top: '-40px',
                            right: '0',
                            display: 'flex',
                            gap: '8px',
                            zIndex: 10,
                            padding: '8px 12px',
                          }}>
                            {/* Row status indicator */}
                            {row.length >= 3 && (
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '4px 8px',
                                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                color: 'white',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: '500',
                              }}>
                                <span>FULL</span>
                                <span>({row.length}/3)</span>
                              </div>
                            )}

                            <button
                              onClick={() => removeStatRow(rowIndex)}
                              className="edit-button"
                              style={{
                                background: '#fef2f2',
                                color: '#dc2626',
                                border: '1px solid #fecaca',
                                borderRadius: '12px',
                                padding: '8px 16px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                boxShadow: '0 2px 4px rgba(239, 68, 68, 0.1)',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.background = '#fee2e2';
                                e.currentTarget.style.borderColor = '#fca5a5';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.15)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.background = '#fef2f2';
                                e.currentTarget.style.borderColor = '#fecaca';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 4px rgba(239, 68, 68, 0.1)';
                              }}
                            >
                              <X size={14} />
                              Remove Row
                            </button>
                          </div>
                        )}
                        {/* Cards in this row */}
                        <div
                          className="card-grid"
                          data-cols={row.length}
                          style={{
                            minHeight: 'auto',
                            maxWidth: '100%',
                            position: 'relative',
                            zIndex: 1,
                            alignItems: 'stretch',
                          }}
                        >
                          {row.map(cardId => {
                            if (!statCardMap[cardId]) return null;

                            return (
                              <DraggableStatCard
                                key={cardId}
                                id={cardId}
                                isEditMode={isEditMode}
                                onRemove={(id) => removeCardFromStatRow(id, rowIndex)}
                                isLastMoved={lastMovedCard === cardId}
                                cardTitle={allAvailableCards[cardId]?.title}
                                isChartCard={false}
                              >
                                {statCardMap[cardId]}
                              </DraggableStatCard>
                            );
                          })}
                          {/* Empty space indicator in edit mode */}
                          {isEditMode && row.length === 0 && (
                            <div style={{
                              borderRadius: '20px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minHeight: '160px',
                              color: '#64748b',
                              fontSize: '14px',
                              background: '#f8fafc',
                              animation: 'slideIn 0.3s ease-out',
                              position: 'relative',
                              overflow: 'hidden',
                              gridColumn: '1 / -1',
                              margin: '0 auto',
                              width: 'fit-content',
                              maxWidth: '400px',
                              padding: '24px 0',
                            }}>
                              <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '12px',
                                textAlign: 'center',
                              }}>
                                <div style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '4px',
                                }}>
                                  <span style={{ fontWeight: '600', fontSize: '16px', color: '#374151' }}>Empty Row</span>
                                  <span style={{ fontSize: '13px', opacity: 0.7, color: '#6b7280' }}>Drop stat cards here</span>
                                </div>
                              </div>
                              {/* Optimized floating particles */}
                              {[...Array(3)].map((_, i) => (
                                <div
                                  key={i}
                                  style={{
                                    position: 'absolute',
                                    width: '4px',
                                    height: '4px',
                                    background: '#cbd5e1',
                                    borderRadius: '50%',
                                    opacity: 0.6,
                                    animation: `float ${2.5 + i * 0.4}s ease-in-out infinite`,
                                    animationDelay: `${i * 0.3}s`,
                                    top: `${20 + i * 20}%`,
                                    left: `${25 + i * 30}%`,
                                  }}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </DroppableRow>
                  ))}
                  {/* Add New Stat Row Button in Edit Mode */}
                  {isEditMode && (
                    <button
                      onClick={addNewStatRow}
                      className="edit-button"
                    style={{
                      background: '#f8f9fa',
                      color: '#374151',
                      border: '1px solid #dcdcdc',
                      borderRadius: '20px',
                      padding: '12px 20px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: '500',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      alignSelf: 'center',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                    }}
                  >
                    <Plus size={18} />
                    Add New Stat Row
                  </button>
                  )}
                </div>
              </SortableContext>
              <DragOverlay>
                {activeCardId && statCardIds.includes(activeCardId) ? (
                  <div style={{ width: '100%', minHeight: '120px', height: '100%' }}>
                    {statCardMap[activeCardId]}
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>

          {/* Chart Cards Section */}
          <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '20px' }}>
              Charts & Visualizations
            </h2>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={event => setActiveCardId(event.active.id)}
              onDragEnd={event => {
                handleDragEnd(event, 'charts');
                setActiveCardId(null);
              }}
              onDragCancel={() => setActiveCardId(null)}
              measuring={{
                droppable: {
                  strategy: 'always'
                }
              }}
            >
              <SortableContext
                items={[...chartCardsLayout.flat(), ...chartCardsLayout.map((_, index) => `chart-row-${index}`)]}
                strategy={verticalListSortingStrategy}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {(() => {
                    const renderedSpecial = new Set();
                    return chartCardsLayout.map((row, rowIndex) => (
                      <DroppableRow key={`chart-${rowIndex}`} rowIndex={rowIndex} isEmpty={row.length === 0} isEditMode={isEditMode} cardCount={row.length} idPrefix="chart-row">
                        <div style={{ position: 'relative', marginTop: isEditMode ? '50px' : '0' }}>
                          {isEditMode && (
                            <div style={{
                              position: 'absolute',
                              top: '-40px',
                              right: '0',
                              display: 'flex',
                              gap: '8px',
                              zIndex: 10,
                              padding: '8px 12px',
                            }}>
                              {row.length >= 3 && (
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  padding: '4px 8px',
                                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                  color: 'white',
                                  borderRadius: '4px',
                                  fontSize: '11px',
                                  fontWeight: '500',
                                }}>
                                  <span>FULL</span>
                                  <span>({row.length}/3)</span>
                                </div>
                              )}
                              <button
                                onClick={() => removeChartRow(rowIndex)}
                                className="edit-button"
                                style={{
                                  background: '#fef2f2',
                                  color: '#dc2626',
                                  border: '1px solid #fecaca',
                                  borderRadius: '12px',
                                  padding: '8px 16px',
                                  cursor: 'pointer',
                                  fontSize: '14px',
                                  fontWeight: '500',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  boxShadow: '0 2px 4px rgba(239, 68, 68, 0.1)',
                                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                                onMouseOver={e => {
                                  e.currentTarget.style.background = '#fee2e2';
                                  e.currentTarget.style.borderColor = '#fca5a5';
                                  e.currentTarget.style.transform = 'translateY(-1px)';
                                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.15)';
                                }}
                                onMouseOut={e => {
                                  e.currentTarget.style.background = '#fef2f2';
                                  e.currentTarget.style.borderColor = '#fecaca';
                                  e.currentTarget.style.transform = 'translateY(0)';
                                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(239, 68, 68, 0.1)';
                                }}
                              >
                                <X size={14} />
                                Remove Row
                              </button>
                            </div>
                          )}
                        <div
                          className="card-grid"
                          data-cols={row.length}
                          style={{
                            minHeight: row.length === 1 ? '400px' : row.length === 2 ? '350px' : '300px',
                            maxWidth: '100%',
                            position: 'relative',
                            zIndex: 1,
                            alignItems: 'stretch',
                          }}
                          data-chart-grid="true"
                        >
                          {row.filter(cardId => {
                            if (cardId === 'monthlyChart') {
                              if (renderedSpecial.has(cardId)) return false;
                              renderedSpecial.add(cardId);
                              return true;
                            }
                            return true;
                          }).map(cardId => (
                            statCardMap[cardId] ? (
                              <DraggableStatCard
                                key={cardId}
                                id={cardId}
                                isEditMode={isEditMode}
                                onRemove={(id) => removeCardFromChartRow(id, rowIndex)}
                                isLastMoved={lastMovedCard === cardId}
                                cardTitle={allAvailableCards[cardId]?.title}
                                isChartCard={true}
                              >
                                {statCardMap[cardId]}
                              </DraggableStatCard>
                            ) : null
                          ))}
                          {isEditMode && row.length === 0 && (
                            <div style={{
                              borderRadius: '20px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minHeight: '160px',
                              color: '#64748b',
                              fontSize: '14px',
                              background: '#f8fafc',
                              animation: 'slideIn 0.3s ease-out',
                              position: 'relative',
                              overflow: 'hidden',
                              gridColumn: '1 / -1',
                              margin: '0 auto',
                              width: 'fit-content',
                              maxWidth: '400px',
                              padding: '24px 0',
                            }}>
                              <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '12px',
                                textAlign: 'center',
                              }}>
                                <div style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '4px',
                                }}>
                                  <span style={{ fontWeight: '600', fontSize: '16px', color: '#374151' }}>Empty Row</span>
                                    <span style={{ fontSize: '13px', opacity: 0.7, color: '#6b7280' }}>Drop charts here to get started</span>
                                </div>
                              </div>
                              {[...Array(3)].map((_, i) => (
                                <div
                                  key={i}
                                  style={{
                                    position: 'absolute',
                                    width: '4px',
                                    height: '4px',
                                    background: '#cbd5e1',
                                    borderRadius: '50%',
                                    opacity: 0.6,
                                    animation: `float ${2.5 + i * 0.4}s ease-in-out infinite`,
                                    animationDelay: `${i * 0.3}s`,
                                    top: `${20 + i * 20}%`,
                                    left: `${25 + i * 30}%`,
                                  }}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </DroppableRow>
                  ));
                })()}
                {isEditMode && (
                  <button
                      onClick={addNewChartRow}
                    className="edit-button"
                    style={{
                      background: '#f8f9fa',
                      color: '#374151',
                      border: '1px solid #dcdcdc',
                      borderRadius: '20px',
                      padding: '12px 20px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: '500',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      alignSelf: 'center',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                    }}
                  >
                    <Plus size={18} />
                      Add New Chart Row
                  </button>
                )}
              </div>
            </SortableContext>
            <DragOverlay>
                {activeCardId && chartCardIds.includes(activeCardId) ? (
                <div style={{ width: '100%', minHeight: '120px', height: '100%' }}>
                  {statCardMap[activeCardId]}
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
          </div>
        </>
          ) : currentPage === 'departments' ? (
              <DepartmentsPage />
          ) : currentPage === 'reviews' ? (
              <ReviewsPage />
      ) : currentPage === 'users' ? (
        <UsersPage
          onNavigate={setCurrentPage}
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
        />
      ) : (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          color: '#64748b'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', marginBottom: '12px' }}>
            Page Not Found
          </h2>
          <p style={{ fontSize: '16px' }}>
            The page you're looking for doesn't exist.
          </p>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
