import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import analytic from '../../assets/analytic.svg';
import feedback from '../../assets/feedback.svg';
import order from '../../assets/order.svg';
import customer from '../../assets/customer.svg';

const Sidebar = ({ currentPage, onNavigate, isCollapsed = false, onCollapseChange }) => {
  const toggleSidebar = () => {
    if (onCollapseChange) {
      onCollapseChange(!isCollapsed);
    } else {
      // Fallback: use internal state if onCollapseChange is not provided
      console.warn('Sidebar: onCollapseChange not provided');
    }
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Toggle Button - Outside sidebar-top to position at edge */}
      <button
        onClick={toggleSidebar}
        className="sidebar-toggle"
        style={{
          position: 'absolute',
          right: isCollapsed ? '-20px' : '-20px',
          top: '34px',
          background: '#f8f9fa',
          border: '1px solid #f8f9fa',
          borderLeft: 'none',
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
          borderTopRightRadius: '10px',
          borderBottomRightRadius: '10px',
          width: '20px',
          height: '37px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
          transition: 'all 0.3s ease',
          padding: '10px 0px',
          boxSizing: 'border-box',
          boxShadow: 'none',
          outline: 'none',
        }}
      >
        <div
          style={{
            transition: 'transform 0.3s ease',
            transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ChevronRight size={16} color="#64748b" />
        </div>
      </button>

      <div className="sidebar-top">
        <nav className="sidebar-nav">
          {/* Analytics Section - Direct link, no submenu */}
          <div 
            className={`nav-item ${currentPage === 'overview' || currentPage === 'dashboard' ? 'active' : ''}`} 
            onClick={() => onNavigate('overview')} 
            style={{ marginTop: '0px' }}
            title={isCollapsed ? 'Analytics' : ''}
          >
            <img src={analytic} alt="Analytics" className="icon" />
            {!isCollapsed && <span>Analytics</span>}
          </div>

          {/* Reviews Section */}
          <div 
            className={`nav-item ${currentPage === 'reviews' ? 'active' : ''}`} 
            onClick={() => onNavigate('reviews')} 
            style={{ marginTop: '8px' }}
            title={isCollapsed ? 'Reviews' : ''}
          >
            <img src={feedback} alt="Reviews" className="icon" />
            {!isCollapsed && <span>Reviews</span>}
          </div>

          {/* Departments Section */}
          <div 
            className={`nav-item ${currentPage === 'departments' ? 'active' : ''}`} 
            onClick={() => onNavigate('departments')}
            title={isCollapsed ? 'Departments' : ''}
          >
            <img src={order} alt="Departments" className="icon" />
            {!isCollapsed && <span>Departments</span>}
          </div>

          {/* Users Section */}
          <div 
            className={`nav-item ${currentPage === 'users' ? 'active' : ''}`} 
            onClick={() => onNavigate('users')}
            title={isCollapsed ? 'Users' : ''}
          >
            <img src={customer} alt="Users" className="icon" />
            {!isCollapsed && <span>Users</span>}
          </div>

          {/* Account Settings Section */}
          <div 
            className="nav-item" 
            title={isCollapsed ? 'Settings' : ''}
            style={{ marginTop: '8px' }}
          >
            <Settings size={20} color="#64748b" style={{ flexShrink: 0 }} />
            {!isCollapsed && <span>Settings</span>}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
