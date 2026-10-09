import React, { useState, useEffect } from 'react';
import logo from '../assets/logosmall.svg';
import search from '../assets/search.svg';
import home from '../assets/home.svg';
import feedback from '../assets/feedback.svg';
import analytic from '../assets/analytic.svg';
import notify from '../assets/notify.svg';
import problem from '../assets/problem.svg';
import customer from '../assets/customer.svg';
import order from '../assets/order.svg';
import message from '../assets/message.svg';
import greenarrow from '../assets/greenarrow.svg';
import thinarrow from '../assets/thinarrow.svg';
import { 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  CheckCircle,
  Clock,
  Users,
  Target,
  AlertCircle,
  MessageSquare,
  FileText,
  Phone,
  Mail,
  MessageCircle,
  Settings,
  CreditCard,
  RotateCcw,
  Package,
  Truck,
  HelpCircle
} from 'lucide-react';
import { mockApi, mockReviews, departmentResponsibilities } from '../utils/data/mockData';

const avatarUrl = 'https://c.animaapp.com/4Ezm8fFj/img/avatar-image@2x.png';
const thinArrowStyle = { width: 11, height: 11 };
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

  const DepartmentsPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalReviews, setTotalReviews] = useState(0);
  const [positiveReviews, setPositiveReviews] = useState(0);
  const [negativeReviews, setNegativeReviews] = useState(0);
  const [solvedReviews, setSolvedReviews] = useState(0);

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch department names from mock API
  const fetchDepartments = async () => {
    if (!loading) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const data = await mockApi.getDepartmentNames();
      const names = JSON.parse(data);

      // Analyze reviews to get actual department statistics
      const departmentStats = {};

      // Initialize all departments with zero counts
      names.forEach((name, idx) => {
        departmentStats[name] = {
          totalReviews: 0,
          positiveReviews: 0,
          negativeReviews: 0,
          solvedReviews: 0,
          color: `hsl(${(idx * 137.5) % 360}, 70%, 60%)`
        };
      });

      // Distribute reviews evenly across departments
      const totalReviews = mockReviews.length;
      const departmentsCount = names.length;

      // Calculate reviews per department (some departments get more, some get less)
      const baseReviewsPerDept = Math.floor(totalReviews / departmentsCount);
      const extraReviews = totalReviews % departmentsCount;

      // Assign reviews to departments more evenly
      let reviewIndex = 0;
      names.forEach((deptName, deptIndex) => {
        // Some departments get extra reviews
        const reviewsForThisDept = baseReviewsPerDept + (deptIndex < extraReviews ? 1 : 0);

        for (let i = 0; i < reviewsForThisDept && reviewIndex < mockReviews.length; i++) {
          const review = mockReviews[reviewIndex];

          departmentStats[deptName].totalReviews++;

          // Categorize by sentiment
          if (review.sentiment === 3) {
            departmentStats[deptName].positiveReviews++;
          } else if (review.sentiment === 1) {
            departmentStats[deptName].negativeReviews++;
          }

          // Calculate solved reviews based on sentiment (positive reviews more likely to be solved)
          const solvedProbability = review.sentiment === 3 ? 0.8 : review.sentiment === 1 ? 0.3 : 0.5;
          if (Math.random() < solvedProbability) {
            departmentStats[deptName].solvedReviews++;
          }

          reviewIndex++;
        }
      });

      // If we still have unassigned reviews, distribute them to departments with fewer reviews
      while (reviewIndex < mockReviews.length) {
        // Find department with fewest reviews
        let minReviews = Infinity;
        let targetDept = null;

        names.forEach(deptName => {
          if (departmentStats[deptName].totalReviews < minReviews) {
            minReviews = departmentStats[deptName].totalReviews;
            targetDept = deptName;
          }
        });

        if (targetDept) {
          const review = mockReviews[reviewIndex];
          departmentStats[targetDept].totalReviews++;

          if (review.sentiment === 3) {
            departmentStats[targetDept].positiveReviews++;
          } else if (review.sentiment === 1) {
            departmentStats[targetDept].negativeReviews++;
          }

          const solvedProbability = review.sentiment === 3 ? 0.8 : review.sentiment === 1 ? 0.3 : 0.5;
          if (Math.random() < solvedProbability) {
            departmentStats[targetDept].solvedReviews++;
          }

          reviewIndex++;
        } else {
          break; // Prevent infinite loop
        }
      }

      // Create department objects with actual review data
      const deptData = names.map((name, idx) => {
        const stats = departmentStats[name] || {
          totalReviews: 0,
          positiveReviews: 0,
          negativeReviews: 0,
          solvedReviews: 0
        };

        const responsibilities = departmentResponsibilities[name] || {
          responsibilities: [],
          topics: [],
          avgResponseTime: "N/A",
          avgResolutionTime: "N/A"
        };

        // Generate additional solved items (tickets, issues, etc.)
        const totalTickets = stats.totalReviews + Math.floor(Math.random() * 20) + 5;
        const solvedTickets = stats.solvedReviews + Math.floor(totalTickets * 0.7);
        const pendingTickets = totalTickets - solvedTickets;
        const openTickets = Math.floor(pendingTickets * 0.6);

        return {
          id: idx + 1,
          name: name,
          totalReviews: stats.totalReviews,
          positiveReviews: stats.positiveReviews,
          negativeReviews: stats.negativeReviews,
          solvedReviews: stats.solvedReviews,
          totalTickets: totalTickets,
          solvedTickets: solvedTickets,
          pendingTickets: pendingTickets,
          openTickets: openTickets,
          responsibilities: responsibilities.responsibilities,
          topics: responsibilities.topics,
          avgResponseTime: responsibilities.avgResponseTime,
          avgResolutionTime: responsibilities.avgResolutionTime,
          teamSize: Math.floor(Math.random() * 15) + 5,
          trend: stats.totalReviews > 0 ? (Math.random() > 0.5 ? 'up' : 'down') : 'stable',
          trendPercentage: stats.totalReviews > 0 ? Math.floor(Math.random() * 20) + 1 : 0,
          color: stats.color
        };
      });

      setDepartments(deptData);
    } catch (err) {
      console.error('Error fetching departments:', err);
      setError('Could not load departments');
      setDepartments([]);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Fetch total reviews count
  const fetchTotalReviews = async () => {
    try {
      const data = await mockApi.getReviewCount();
      const count = parseInt(data, 10);
      setTotalReviews(count);
    } catch (err) {
      console.error('Error fetching total reviews:', err);
      setTotalReviews(0);
    }
  };

  // Fetch positive reviews count
  const fetchPositiveReviews = async () => {
    try {
      const data = await mockApi.getPositiveReviewCount();
      const count = parseInt(data, 10);
      setPositiveReviews(count);
    } catch (err) {
      console.error('Error fetching positive reviews:', err);
      setPositiveReviews(0);
    }
  };

  // Fetch negative reviews count
  const fetchNegativeReviews = async () => {
    try {
      const data = await mockApi.getNegativeReviewCount();
      const count = parseInt(data, 10);
      setNegativeReviews(count);
    } catch (err) {
      console.error('Error fetching negative reviews:', err);
      setNegativeReviews(0);
    }
  };

  // Fetch solved reviews count
  const fetchSolvedReviews = async () => {
    try {
      const data = await mockApi.getSolvedReviewCount();
      const count = parseInt(data, 10);
      setSolvedReviews(count);
    } catch (err) {
      console.error('Error fetching solved reviews:', err);
      setSolvedReviews(0);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchTotalReviews();
    fetchPositiveReviews();
    fetchNegativeReviews();
    fetchSolvedReviews();
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
          fetchDepartments();
          fetchTotalReviews();
          fetchPositiveReviews();
          fetchNegativeReviews();
          fetchSolvedReviews();
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
          fetchDepartments();
          fetchTotalReviews();
          fetchPositiveReviews();
          fetchNegativeReviews();
          fetchSolvedReviews();
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

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} color="#10B981" />;
      case 'down':
        return <TrendingDown size={16} color="#EF4444" />;
      default:
        return <Minus size={16} color="#6B7280" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return '#10B981';
      case 'down':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getDepartmentIcon = (name) => {
    if (name.includes('Phone')) return Phone;
    if (name.includes('Email')) return Mail;
    if (name.includes('Chat')) return MessageCircle;
    if (name.includes('Watch')) return Settings;
    if (name.includes('Technical')) return Settings;
    if (name.includes('Billing')) return CreditCard;
    if (name.includes('Returns')) return RotateCcw;
    if (name.includes('Product Information')) return Package;
    if (name.includes('Order Tracking')) return Truck;
    return HelpCircle;
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
          <div id="departments-page" style={{ padding: '20px', color: '#EF4444' }}>
            {error}
          </div>
      );
    }

    return (
        <div id="departments-page" style={{ paddingTop: 0, paddingBottom: 20 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{
                background: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                minWidth: '200px'
              }}>
                <img src={search} alt="Search" style={{ width: 16, height: 16, opacity: 0.6 }} />
                <input
                  type="text"
                  placeholder="Search departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    width: '100%',
                    background: 'transparent'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={feedback} alt="Total" style={{ width: '20px', height: '20px', filter: 'brightness(0) invert(1)' }} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#6B7280' }}>Total Reviews</span>
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937' }}>{totalReviews}</div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={feedback} alt="Positive" style={{ width: '20px', height: '20px', filter: 'brightness(0) invert(1)' }} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#6B7280' }}>Positive</span>
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937' }}>{positiveReviews}</div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={feedback} alt="Negative" style={{ width: '20px', height: '20px', filter: 'brightness(0) invert(1)' }} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#6B7280' }}>Negative</span>
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937' }}>{negativeReviews}</div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={analytic} alt="Solved" style={{ width: '20px', height: '20px', filter: 'brightness(0) invert(1)' }} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#6B7280' }}>Solved</span>
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937' }}>{solvedReviews}</div>
            </div>
          </div>

          {/* Departments List */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '24px',
              borderBottom: '1px solid #E5E7EB',
              background: '#F9FAFB'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', margin: 0 }}>
                Department Performance
              </h2>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0 0 0' }}>
                Review statistics for each department
              </p>
            </div>

            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {filteredDepartments.map((dept, index) => (
                <div
                  key={dept.id}
                  style={{
                    padding: '20px 24px',
                    borderBottom: index < filteredDepartments.length - 1 ? '1px solid #F3F4F6' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: selectedDepartment?.id === dept.id ? '#F3F4F6' : 'transparent'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
                  onMouseLeave={(e) => e.currentTarget.style.background = selectedDepartment?.id === dept.id ? '#F3F4F6' : 'transparent'}
                  onClick={() => setSelectedDepartment(selectedDepartment?.id === dept.id ? null : dept)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: dept.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {React.createElement(getDepartmentIcon(dept.name), { size: 24, color: '#fff' })}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', margin: '0 0 4px 0' }}>
                          {dept.name}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#6B7280', flexWrap: 'wrap', marginBottom: '4px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MessageSquare size={14} />
                            {dept.totalReviews} reviews
                          </span>
                          <span>•</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle size={14} />
                            {dept.solvedTickets} solved
                          </span>
                          <span>•</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Users size={14} />
                            {dept.teamSize} team members
                          </span>
                        </div>
                        {dept.topics && dept.topics.length > 0 && (
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                            {dept.topics.slice(0, 3).map((topic, idx) => (
                              <span
                                key={idx}
                                style={{
                                  padding: '2px 8px',
                                  borderRadius: '4px',
                                  background: '#F3F4F6',
                                  color: '#6B7280',
                                  fontSize: '11px',
                                  fontWeight: '500'
                                }}
                              >
                                {topic}
                              </span>
                            ))}
                            {dept.topics.length > 3 && (
                              <span style={{ fontSize: '11px', color: '#9CA3AF' }}>
                                +{dept.topics.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {getTrendIcon(dept.trend)}
                        <span style={{ fontSize: '14px', fontWeight: '500', color: getTrendColor(dept.trend) }}>
                          {dept.trendPercentage > 0 ? '+' : ''}{dept.trendPercentage}%
                        </span>
                      </div>
                      <ChevronRight 
                        size={20} 
                        color="#9CA3AF"
                        style={{
                          transform: selectedDepartment?.id === dept.id ? 'rotate(90deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease'
                        }}
                      />
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedDepartment?.id === dept.id && (
                    <div style={{
                      marginTop: '16px',
                      padding: '20px',
                      background: 'white',
                      borderRadius: '12px',
                      border: '1px solid #E5E7EB',
                      animation: 'slideIn 0.2s ease-out'
                    }}>
                      {/* Statistics Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                        <div>
                          <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Total Reviews</span>
                          <div style={{ fontSize: '24px', fontWeight: '700', color: '#1F2937' }}>{dept.totalReviews}</div>
                        </div>
                        <div>
                          <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Total Tickets</span>
                          <div style={{ fontSize: '24px', fontWeight: '700', color: '#3B82F6' }}>{dept.totalTickets}</div>
                        </div>
                        <div>
                          <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Solved Items</span>
                          <div style={{ fontSize: '24px', fontWeight: '700', color: '#10B981' }}>{dept.solvedTickets}</div>
                        </div>
                        <div>
                          <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Open Tickets</span>
                          <div style={{ fontSize: '24px', fontWeight: '700', color: '#F59E0B' }}>{dept.openTickets}</div>
                        </div>
                        <div>
                          <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Pending</span>
                          <div style={{ fontSize: '24px', fontWeight: '700', color: '#EF4444' }}>{dept.pendingTickets}</div>
                        </div>
                        <div>
                          <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Team Size</span>
                          <div style={{ fontSize: '24px', fontWeight: '700', color: '#8B5CF6' }}>{dept.teamSize}</div>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                        <div style={{
                          padding: '16px',
                          background: '#F9FAFB',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <Clock size={16} color="#6B7280" />
                            <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>Avg Response Time</span>
                          </div>
                          <div style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937' }}>{dept.avgResponseTime}</div>
                        </div>
                        <div style={{
                          padding: '16px',
                          background: '#F9FAFB',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <Target size={16} color="#6B7280" />
                            <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>Avg Resolution Time</span>
                          </div>
                          <div style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937' }}>{dept.avgResolutionTime}</div>
                        </div>
                        <div style={{
                          padding: '16px',
                          background: '#F9FAFB',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <CheckCircle size={16} color="#6B7280" />
                            <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>Resolution Rate</span>
                          </div>
                          <div style={{ fontSize: '18px', fontWeight: '600', color: '#10B981' }}>
                            {dept.totalTickets > 0 ? ((dept.solvedTickets / dept.totalTickets) * 100).toFixed(1) : '0.0'}%
                          </div>
                        </div>
                      </div>

                      {/* Resolution Rate Progress */}
                      <div style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Overall Resolution Rate</span>
                          <span style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>
                            {dept.totalTickets > 0 ? ((dept.solvedTickets / dept.totalTickets) * 100).toFixed(1) : '0.0'}%
                          </span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '10px',
                          background: '#F3F4F6',
                          borderRadius: '5px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${dept.totalTickets > 0 ? (dept.solvedTickets / dept.totalTickets) * 100 : 0}%`,
                            height: '100%',
                            background: dept.color,
                            borderRadius: '5px',
                            transition: 'width 0.3s ease'
                          }} />
                        </div>
                      </div>

                      {/* Responsibilities Section */}
                      {dept.responsibilities && dept.responsibilities.length > 0 && (
                        <div style={{ marginBottom: '24px' }}>
                          <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Target size={18} />
                            Department Responsibilities
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {dept.responsibilities.map((responsibility, idx) => (
                              <div
                                key={idx}
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: '10px',
                                  padding: '10px',
                                  background: '#F9FAFB',
                                  borderRadius: '6px',
                                  border: '1px solid #E5E7EB'
                                }}
                              >
                                <CheckCircle size={16} color="#10B981" style={{ marginTop: '2px', flexShrink: 0 }} />
                                <span style={{ fontSize: '14px', color: '#374151', lineHeight: '1.5' }}>
                                  {responsibility}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Topics Section */}
                      {dept.topics && dept.topics.length > 0 && (
                        <div>
                          <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FileText size={18} />
                            Handles These Topics
                          </h4>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {dept.topics.map((topic, idx) => (
                              <span
                                key={idx}
                                style={{
                                  padding: '6px 12px',
                                  borderRadius: '6px',
                                  background: dept.color,
                                  color: '#1F2937',
                                  fontSize: '13px',
                                  fontWeight: '500',
                                  opacity: 0.9
                                }}
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default DepartmentsPage; 