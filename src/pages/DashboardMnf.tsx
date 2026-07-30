import "./DashboardMnf.css";

import { HiOutlineHome, HiOutlinePlusCircle,HiOutlineClipboardList, HiOutlineBell, HiOutlineCog, } from "react-icons/hi";

import { HiOutlineQrCode } from "react-icons/hi2";

import logo from "../assets/logo.png";

import phone from "../assets/phone.png";


import { FiCheckCircle } from "react-icons/fi"

import { IoQrCodeOutline } from 'react-icons/io5';

import goldenMorn from '../assets/goldenMorn.png'; // 

import { FileText } from 'lucide-react';

const DashboardMnf = () => {

  const stats = [
    {
      title: "Total Product",
      value: 5,
    },
    {
      title: "Verified Products",
      value: 4,
    },
    {
      title: "QR Code Generated",
      value: 4,
    },
  ];

const activities = [
  {
    icon: <FileText size={28} />, // Changed icon here
    title: 'Document Verification',
    subtitle: 'Document verified successfully',
    status: 'Verified',
    time: '9:30 AM',
  },
  {
    image: goldenMorn, // Added product image
    title: 'Golden Morn',
    subtitle: 'New product added',
    time: '10:30 PM',
  },
  {
    icon: <IoQrCodeOutline />,
    title: 'QR Code Generated',
    subtitle: 'Product: Golden Morn',
    time: '12:01 PM',
  },
];

  return (
    <div className="dashboardContainer">

      {/* ================= Sidebar ================= */}

      <aside className="sidebar">

        <div>

          <div className="logo">
  <div className="logoIcon">
    <img src={logo} alt="TrustEats Logo" />
  </div>
</div>

          <nav>

            <div className="navItem active">
              <HiOutlineHome />
              <span>Dashboard</span>
            </div>

            <div className="navItem">
              <HiOutlineQrCode />
              <span>QR Code</span>
            </div>

            <div className="navItem">
              <HiOutlinePlusCircle />
              <span>Add Product</span>
            </div>

            <div className="navItem">
              <HiOutlineClipboardList />
              <span>Product List</span>
            </div>

            <div className="navItem">
              <HiOutlineBell />
              <span>Notification</span>
            </div>

          </nav>

        </div>

        <button className="settingBtn">
          <HiOutlineCog />
          Setting
        </button>

      </aside>

      {/* ================= Main ================= */}

      <main className="mainContent">

        <header className="header">
          <h2>Dashboard</h2>
        </header>

        {/* ================= Hero ================= */}

        <section className="heroCard">

          <div className="heroLeft">

            <h1>
              Register Product
              <br />
              Generate QR Code
            </h1>

            <p className="heroDesc">
              Register your product by verifying your
              NAFDAC Registration Number and generate
              a unique QR code.
            </p>

            <div className="heroSteps">

              <div className="step">

                <h4>Verify NAFDAC Reg. No.</h4>

                <p>
                  Ensure product is verified
                  on our platform.
                </p>

              </div>

              <div className="step">

                <h4>Enter Product Details</h4>

                <p>
                  Add product information
                  and image.
                </p>

              </div>

              <div className="step">

                <h4>Generate QR Code</h4>

                <p>
                  Get a unique QR code
                  for each batch.
                </p>

              </div>

            </div>

            <button className="registerBtn">
              Register Product
            </button>

          </div>

          {/* Placeholder Image */}

<div className="heroRight">
      <img src={phone} alt="Phone illustration" />
    </div>

        </section>

        {/* ================= Stats ================= */}

        <section className="statsGrid">

          {stats.map((item, index) => (

            <div
              key={index}
              className="statCard"
            >

              <small>{item.title}</small>

              <h2>{item.value}</h2>

            </div>

          ))}

        </section>


                {/* ================= Quick Access ================= */}

        <section className="quickSection">

          <h3 className="sectionTitle">
            Quick Access
          </h3>

          <div className="quickGrid">

            <div className="quickCard">

              <div className="quickIcon">
                {<HiOutlinePlusCircle />}
              </div>

              <div>

                <h4>Add New Product</h4>

                <p>
                  Verify your product and add it to your
                  product list.
                </p>

              </div>

            </div>

            <div className="quickCard">

              <div className="quickIcon">
                <HiOutlineQrCode />
              </div>

              <div>

                <h4>Generate QR Code</h4>

                <p>
                  Generate a unique QR code for
                  each product batch.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* ================= Recent Activities ================= */}

        <section className="activitySection">
  <div className="activityHeader">
    <h3>Recent Activities</h3>
  </div>

  <div className="activityList">
    {activities.map((activity, index) => (
      <div key={index} className="activityCard">
        <div className="activityLeft">
          
          {/* Render image if present, otherwise render the icon */}
          <div className="activityIcon">
            {activity.image ? (
              <img src={activity.image} alt={activity.title} className="productThumb" />
            ) : (
              activity.icon
            )}
          </div>

          <div>
            <h4>{activity.title}</h4>
            <p>{activity.subtitle}</p>
          </div>
        </div>

        <div className="activityRight">
  {activity.status && (
    <span className="verifiedBadge">
      <FiCheckCircle size={12} /> {activity.status}
    </span>
  )}
  <small>{activity.time}</small>
</div>
      </div>
    ))}
  </div>
</section>

      </main>

    </div>
  );
};

export default DashboardMnf;


