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
  Search, 
  Filter, 
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Star,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  Download,
  Tag,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  Activity,
  Edit,
  MoreVertical
} from 'lucide-react';
import { mockApi, mockUsers } from '../utils/data/mockData';

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
};// Get segment color
const getSegmentColor = (segment) => {
  switch (segment) {
    case 'VIP':
      return { bg: '#FEF3C7', text: '#92400E', border: '#F59E0B' };
    case 'Regular':
      return { bg: '#DBEAFE', text: '#1E40AF', border: '#3B82F6' };
    case 'At Risk':
      return { bg: '#FEE2E2', text: '#991B1B', border: '#EF4444' };
    default:
      return { bg: '#F3F4F6', text: '#6B7280', border: '#9CA3AF' };
  }
};

// Get status icon
const getStatusIcon = (status) => {
  switch (status) {
    case 'active':
      return { icon: CheckCircle, color: '#10B981' };
    case 'inactive':
      return { icon: XCircle, color: '#EF4444' };
    default:
      return { icon: AlertCircle, color: '#F59E0B' };
  }
};

// Format date
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

// Format date time
const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Get activity icon
const getActivityIcon = (type) => {
  switch (type) {
    case 'order':
      return ShoppingBag;
    case 'review':
      return MessageSquare;
    case 'login':
      return Activity;
    default:
      return Activity;
  }
};

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'inactive'
  const [segmentFilter, setSegmentFilter] = useState('all'); // 'all', 'VIP', 'Regular', 'At Risk'
  const [sortBy, setSortBy] = useState('lastActive'); // 'lastActive', 'joinDate', 'totalSpent', 'totalOrders'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'

  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchUsers = async () => {
    if (!loading) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const data = await mockApi.getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Could not load users');
      setUsers([]);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
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
          fetchUsers();
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
          fetchUsers();
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

  // Filter and sort users
  const filteredUsers = users
    .filter(user => {
      // Search filter
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        fullName.includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      
      // Segment filter
      const matchesSegment = segmentFilter === 'all' || user.segment === segmentFilter;
      
      return matchesSearch && matchesStatus && matchesSegment;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'lastActive':
          aValue = new Date(a.lastActive).getTime();
          bValue = new Date(b.lastActive).getTime();
          break;
        case 'joinDate':
          aValue = new Date(a.joinDate).getTime();
          bValue = new Date(b.joinDate).getTime();
          break;
        case 'totalSpent':
          aValue = a.totalSpent;
          bValue = b.totalSpent;
          break;
        case 'totalOrders':
          aValue = a.totalOrders;
          bValue = b.totalOrders;
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

  // Calculate statistics
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    vip: users.filter(u => u.segment === 'VIP').length,
    atRisk: users.filter(u => u.segment === 'At Risk').length,
    totalSpent: users.reduce((sum, u) => sum + u.totalSpent, 0),
    totalOrders: users.reduce((sum, u) => sum + u.totalOrders, 0),
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleExport = () => {
    // Simple CSV export
    const headers = ['Name', 'Email', 'Phone', 'Location', 'Status', 'Segment', 'Total Orders', 'Total Spent', 'Join Date', 'Last Active'];
    const rows = filteredUsers.map(user => [
      `${user.firstName} ${user.lastName}`,
      user.email,
      user.phone,
      user.location,
      user.status,
      user.segment,
      user.totalOrders,
      user.totalSpent,
      formatDate(user.joinDate),
      formatDate(user.lastActive)
    ]);
    
    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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
        <div id="users-page" style={{ padding: '20px', color: '#EF4444' }}>
          {error}
        </div>
    );
  }

  // Detail view
  if (selectedUser) {
    const StatusIcon = getStatusIcon(selectedUser.status).icon;
    const statusColor = getStatusIcon(selectedUser.status).color;
    const segmentColors = getSegmentColor(selectedUser.segment);
    const fullName = `${selectedUser.firstName} ${selectedUser.lastName}`;

    return (
        <div id="users-page" style={{ paddingTop: 0, paddingBottom: 20 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
            {/* Back button */}
            <button
              onClick={() => setSelectedUser(null)}
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
              Back to Users
            </button>

            {/* User Detail Card */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              padding: '32px',
              marginBottom: '24px'
            }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: getAvatarColor(fullName),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: '600',
                    fontSize: '32px',
                    flexShrink: 0
                  }}>
                    {getInitial(fullName)}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#1F2937', margin: '0 0 8px 0' }}>
                      {fullName}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#6B7280' }}>
                        <Mail size={16} />
                        {selectedUser.email}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#6B7280' }}>
                        <Phone size={16} />
                        {selectedUser.phone}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#6B7280' }}>
                        <MapPin size={16} />
                        {selectedUser.location}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        background: segmentColors.bg,
                        color: segmentColors.text,
                        fontSize: '14px',
                        fontWeight: '500',
                        border: `1px solid ${segmentColors.border}`
                      }}>
                        <Tag size={14} />
                        {selectedUser.segment}
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        background: selectedUser.status === 'active' ? '#D1FAE5' : '#FEE2E2',
                        color: selectedUser.status === 'active' ? '#065F46' : '#991B1B',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        <StatusIcon size={14} />
                        {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 16px',
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
                  <Edit size={16} />
                  Edit User
                </button>
              </div>

              {/* Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                <div style={{
                  background: '#F9FAFB',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #E5E7EB'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <ShoppingBag size={20} color="#6B7280" />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280' }}>Total Orders</span>
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937' }}>{selectedUser.totalOrders}</div>
                </div>
                <div style={{
                  background: '#F9FAFB',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #E5E7EB'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <DollarSign size={20} color="#6B7280" />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280' }}>Total Spent</span>
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937' }}>
                    ${selectedUser.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div style={{
                  background: '#F9FAFB',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #E5E7EB'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <MessageSquare size={20} color="#6B7280" />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280' }}>Reviews</span>
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937' }}>{selectedUser.reviewsCount}</div>
                </div>
                <div style={{
                  background: '#F9FAFB',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #E5E7EB'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Star size={20} color="#6B7280" />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280' }}>Avg Rating</span>
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937' }}>{selectedUser.avgRating.toFixed(1)}</div>
                </div>
              </div>

              {/* Tags */}
              {selectedUser.tags && selectedUser.tags.length > 0 && (
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>Tags</h3>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {selectedUser.tags.map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          background: '#DBEAFE',
                          color: '#1E40AF',
                          fontSize: '13px',
                          fontWeight: '500'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Activity Timeline */}
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>Recent Activity</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedUser.activity && selectedUser.activity.length > 0 ? (
                    selectedUser.activity.map((activity, index) => {
                      const ActivityIcon = getActivityIcon(activity.type);
                      return (
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            gap: '12px',
                            padding: '12px',
                            background: '#F9FAFB',
                            borderRadius: '8px',
                            border: '1px solid #E5E7EB'
                          }}
                        >
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: '#DBEAFE',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <ActivityIcon size={16} color="#1E40AF" />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937', marginBottom: '4px' }}>
                              {activity.description}
                            </div>
                            <div style={{ fontSize: '12px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Clock size={12} />
                              {formatDateTime(activity.date)}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#6B7280' }}>
                      No recent activity
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }

  // List view
  return (
      <div id="users-page" style={{ paddingTop: 0, paddingBottom: 20 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '24px' }}>
            <button
              onClick={handleExport}
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
              <Download size={16} />
              Export CSV
            </button>
          </div>

          {/* Statistics Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280', marginBottom: '8px' }}>Total Users</div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937' }}>{stats.total}</div>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280', marginBottom: '8px' }}>Active</div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#10B981' }}>{stats.active}</div>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280', marginBottom: '8px' }}>VIP</div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#F59E0B' }}>{stats.vip}</div>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280', marginBottom: '8px' }}>At Risk</div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#EF4444' }}>{stats.atRisk}</div>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280', marginBottom: '8px' }}>Total Revenue</div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937' }}>
                ${(stats.totalSpent / 1000).toFixed(1)}K
              </div>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280', marginBottom: '8px' }}>Total Orders</div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937' }}>{stats.totalOrders}</div>
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
                  placeholder="Search users by name, email, or location..."
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              {/* Segment Filter */}
              <select
                value={segmentFilter}
                onChange={(e) => setSegmentFilter(e.target.value)}
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
                <option value="all">All Segments</option>
                <option value="VIP">VIP</option>
                <option value="Regular">Regular</option>
                <option value="At Risk">At Risk</option>
              </select>

              {/* Sort */}
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
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
                <option value="lastActive-desc">Last Active (Newest)</option>
                <option value="lastActive-asc">Last Active (Oldest)</option>
                <option value="joinDate-desc">Join Date (Newest)</option>
                <option value="joinDate-asc">Join Date (Oldest)</option>
                <option value="totalSpent-desc">Total Spent (High to Low)</option>
                <option value="totalSpent-asc">Total Spent (Low to High)</option>
                <option value="totalOrders-desc">Total Orders (High to Low)</option>
                <option value="totalOrders-asc">Total Orders (Low to High)</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            {filteredUsers.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
                No users found matching your filters.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                      <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        User
                      </th>
                      <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Contact
                      </th>
                      <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Status
                      </th>
                      <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Segment
                      </th>
                      <th style={{ padding: '16px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Orders
                      </th>
                      <th style={{ padding: '16px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Total Spent
                      </th>
                      <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Last Active
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => {
                      const fullName = `${user.firstName} ${user.lastName}`;
                      const StatusIcon = getStatusIcon(user.status).icon;
                      const statusColor = getStatusIcon(user.status).color;
                      const segmentColors = getSegmentColor(user.segment);
                      
                      return (
                        <tr
                          key={user.id}
                          onClick={() => setSelectedUser(user)}
                          style={{
                            borderBottom: index < filteredUsers.length - 1 ? '1px solid #F3F4F6' : 'none',
                            cursor: 'pointer',
                            transition: 'background 0.2s ease',
                            background: 'transparent'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <td style={{ padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: getAvatarColor(fullName),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontWeight: '600',
                                fontSize: '16px',
                                flexShrink: 0
                              }}>
                                {getInitial(fullName)}
                              </div>
                              <div>
                                <div style={{ fontWeight: '600', fontSize: '14px', color: '#1F2937', marginBottom: '2px' }}>
                                  {fullName}
                                </div>
                                <div style={{ fontSize: '12px', color: '#6B7280' }}>
                                  {user.location}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '16px' }}>
                            <div style={{ fontSize: '13px', color: '#374151', marginBottom: '4px' }}>{user.email}</div>
                            <div style={{ fontSize: '12px', color: '#6B7280' }}>{user.phone}</div>
                          </td>
                          <td style={{ padding: '16px' }}>
                            <div style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              background: user.status === 'active' ? '#D1FAE5' : '#FEE2E2',
                              color: user.status === 'active' ? '#065F46' : '#991B1B',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}>
                              <StatusIcon size={12} />
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </div>
                          </td>
                          <td style={{ padding: '16px' }}>
                            <div style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              background: segmentColors.bg,
                              color: segmentColors.text,
                              fontSize: '12px',
                              fontWeight: '500',
                              border: `1px solid ${segmentColors.border}`
                            }}>
                              {user.segment}
                            </div>
                          </td>
                          <td style={{ padding: '16px', textAlign: 'right', fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>
                            {user.totalOrders}
                          </td>
                          <td style={{ padding: '16px', textAlign: 'right', fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>
                            ${user.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td style={{ padding: '16px', fontSize: '13px', color: '#6B7280' }}>
                            {formatDate(user.lastActive)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default UsersPage;
