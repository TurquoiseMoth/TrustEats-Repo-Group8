import React from 'react';
import { Scan, CheckCircle2, AlertTriangle, XCircle, ChevronRight, Home, History, User } from 'lucide-react';
import './Dashboard.css';
import phone from '../assets/phone.png';
import pepper from '../assets/pepper.png';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        
        {/* Main Content */}
        <div className="dashboard-content">
          
          {/* Header */}
          <header className="header-section">
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome back!</h1>
        <p className="welcome-subtitle">
          Scan a product's QR code to verify its authenticity in seconds.
        </p>
      </div>

      <button className="notification-btn" aria-label="Notifications">
        {/* Replace with your SVG icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
      </button>
    </header>

          {/* Banner */}
          <div className="banner-card">
            <div className="banner-content">
              <h2 className="banner-title">Verify. Trust. <br /> Trust.</h2>
              <p className="banner-description">
                Scan QR code on food products to know if they are genuine and safe for you and your family.
              </p>
            </div>

            <button className="banner-btn">
              <span>Scan a Product</span>
              <Scan size={16} />
            </button>

            <div className="banner-image-container">
              <img 
                src={phone} 
                alt="Product verification preview" 
                className="banner-image"
              />
            </div>
          </div>

          {/* Monthly Scan Summary */}
          <div className="summary-card">
            <h3 className="section-title">Monthly Scan Summary</h3>

            <div className="summary-grid">
              {/* Total Scans */}
              <div className="total-scan-box">
                <span className="total-count">10</span>
                <span className="total-label">Total Scan</span>
              </div>

              {/* Status List */}
              <div className="summary-breakdown">
                <div className="summary-row border-bottom">
                  <div className="status-label verified">
                    <CheckCircle2 size={16} />
                    <span>Verified</span>
                  </div>
                  <span className="status-value">5</span>
                </div>

                <div className="summary-row border-bottom">
                  <div className="status-label suspicious">
                    <AlertTriangle size={16} />
                    <span>Suspicious</span>
                  </div>
                  <span className="status-value">2</span>
                </div>

                <div className="summary-row">
                  <div className="status-label fake">
                    <XCircle size={16} />
                    <span>Fake</span>
                  </div>
                  <span className="status-value">3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Scans */}
          <div className="recent-section">
            <div className="recent-header">
              <h3 className="section-title" style={{ margin: 0 }}>Recent Scan</h3>
              <a href="#view-all" className="view-all-link">View all</a>
            </div>

            <div className="scan-card">
              <div className="scan-item-info">
                <div className="product-image-box">
                  <img 
                    src={pepper} 
                    alt="Gino Pepper & Onion Paste" 
                    className="product-image"
                  />
                </div>
                <div className="product-details">
                  <h4 className="product-name">Gino Pepper & Onion Paste</h4>
                  <div className="status-badge">
                    <CheckCircle2 size={12} />
                    <span>Verified</span>
                  </div>
                  <p className="scan-time">Today, 12:53 PM</p>
                </div>
              </div>

              <ChevronRight size={20} className="chevron-icon" />
            </div>
          </div>

        </div>

        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          <button className="nav-item active">
            <div className="nav-icon-wrapper">
              <Home size={20} />
            </div>
            <span>Home</span>
          </button>

          <button className="nav-item">
            <div className="nav-icon-wrapper">
              <Scan size={22} />
            </div>
            <span>Scan</span>
          </button>

          <button className="nav-item">
            <div className="nav-icon-wrapper">
              <History size={22} />
            </div>
            <span>History</span>
          </button>

          <button className="nav-item">
            <div className="nav-icon-wrapper">
              <User size={22} />
            </div>
            <span>Profile</span>
          </button>
        </nav>

      </div>
    </div>
  );
};

export default Dashboard;