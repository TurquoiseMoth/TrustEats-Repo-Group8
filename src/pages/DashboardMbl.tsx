import React from 'react';
import { Bell, Scan, QrCode, FileText, CheckCircle2, Home, Package, Settings } from 'lucide-react';
import './DashboardMbl.css';

import phone from "../assets/phone.png";

import goldenMorn from "../assets/goldenMorn.png";

const DashboardMbl: React.FC = () => {
  return (
    <div className="dashboard-mbl-container">
      
      {/* Top Header */}
      <header className="dashboard-mbl-header">
        <h1 className="dashboard-mbl-title">
          Welcome,<br />Greenfoods LTD!
        </h1>
        <button className="bell-btn" aria-label="Notifications">
          <Bell className="w-24 h-6" />
        </button>
      </header>

      <main className="dashboard-mbl-content">

        {/* Hero Banner Card */}
        <section className="banner-card">
          <div className="banner-left">
            <h2 className="banner-heading">
              Register Product<br />Generate QR Code
            </h2>
            <p className="banner-description">
              Register your product by verifying your NAFDAC Reg NO. and other details to generate a unique QR code.
            </p>

            {/* Steps List */}
            <div className="steps-list">
              <div className="step-item">
                <p className="step-title">Verify NAFDAC Reg. NO.</p>
                <p className="step-desc">Ensure product is verified on our Platform</p>
              </div>
              <div className="step-item">
                <p className="step-title">Enter Product Details</p>
                <p className="step-desc">Add product info. date and image.</p>
              </div>
              <div className="step-item no-border">
                <p className="step-title">Generate QR Code</p>
                <p className="step-desc">Get a unique QR code for each batch.</p>
              </div>
            </div>

            <button className="register-btn">Register Product</button>
          </div>

          <div className="banner-image-wrapper">
  <img 
    src={phone} 
    alt="Scanning Product" 
    className="banner-image"
  />
</div>
        </section>

        {/* Stats Grid */}
        <section className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Total Product</p>
            <p className="stat-value">5</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Verified Products</p>
            <p className="stat-value">4</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">QR Code Generated</p>
            <p className="stat-value">4</p>
          </div>
        </section>

        {/* Quick Access Section */}
        <section>
          <h3 className="section-title">Quick Access</h3>
          <div className="quick-access-grid">
            <button className="quick-btn">
              <div className="icon-box">
                <Scan size={20} />
              </div>
              <div>
                <p className="btn-title">Add New Product</p>
                <p className="btn-desc">Verify product authenticity</p>
              </div>
            </button>

            <button className="quick-btn">
              <div className="icon-box">
                <QrCode size={20} />
              </div>
              <div>
                <p className="btn-title">Generate QR Code</p>
                <p className="btn-desc">Create a QR code for a product batch</p>
              </div>
            </button>
          </div>
        </section>

        {/* Recent Activities Section */}
        <section>
          <h3 className="section-title">Recent Activities</h3>
          <div className="activities-list">

            {/* Item 1 */}
            <div className="activity-card">
              <div className="activity-left">
                <div className="activity-icon-container">
                  <FileText size={28} />
                </div>
                <div>
                  <p className="activity-title">Document Verification</p>
                  <p className="activity-subtitle">Document verified successfully</p>
                </div>
              </div>
              <div className="activity-right">
                <span className="status-badge">
                  <CheckCircle2 size={12} />
                  <span>Verified</span>
                </span>
                <p className="activity-time">9:30 AM</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="activity-card">
  <div className="activity-left">
        <img src={goldenMorn} style={{ width: 24, height: 24, }} alt="Golden Morn" />
    <div>
      <p className="activity-title">Golden Morn</p>
      <p className="activity-subtitle">New product added</p>
    </div>
  </div>
  <div className="activity-right">
    <p className="activity-time">10:30 PM</p>
  </div>
</div>

            {/* Item 3 */}
            <div className="activity-card">
              <div className="activity-left">
                <div className="activity-icon-container">
                  <QrCode size={24} />
                </div>
                <div>
                  <p className="activity-title">QR Code Generated</p>
                  <p className="activity-subtitle">Product: Golden Morn</p>
                </div>
              </div>
              <div className="activity-right">
                <p className="activity-time">12:01 PM</p>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Navigation Footer Bar */}
      <nav className="bottom-nav">
        <button className="nav-item active">
          <div className="active-icon-bg">
            <Home size={20} />
          </div>
          <span className="nav-label">Home</span>
        </button>

        <button className="nav-item">
          <Scan size={20} />
          <span className="nav-label">QR Code</span>
        </button>

        <button className="nav-item">
          <Package size={20} />
          <span className="nav-label">Product</span>
        </button>

        <button className="nav-item">
          <Settings size={20} />
          <span className="nav-label">Settings</span>
        </button>
      </nav>

    </div>
  );
};

export default DashboardMbl;