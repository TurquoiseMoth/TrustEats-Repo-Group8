import "./ConsumerReports.css"; // Ensure your CSS handles badge styles and table layouts

// Icons
import { HiOutlineHome, HiOutlineBuildingOffice2, HiOutlineDocumentText, HiOutlineClipboardDocumentCheck, HiOutlineMegaphone, HiOutlineBell, } from "react-icons/hi2"; // Alternatively use react-icons/hi or lucide-react
import { BsThreeDotsVertical } from "react-icons/bs";

import logo from "../assets/logo.png";
import pepperPaste from "../assets/pepperPaste.png";
import tomatoSauce from "../assets/tomatoSauce.png";
import farmMilk from "../assets/farmMilk.png";
import sunburstChips from "../assets/sunburstChips.png";

const ConsumerReports = () => {
  // Stats Data
  const stats = [
    { title: "Total Report", value: 4 },
    { title: "Pending Review", value: 2 },
    { title: "Highlighted Report", value: 0 },
  ];

  // Consumer Reports Data Table
  const reports = [
    {
      id: 1,
      productName: "Pepper & Onion Tomatoes Paste",
      productImage: pepperPaste,
      organization: "Gino",
      issueType: "Expired Product",
      issueTagClass: "tag-purple", // Style according to issue type
      date: "July 19, 2026",
      time: "11:45 AM",
    },
    {
      id: 2,
      productName: "PureTaste Tomatoes sauce",
      productImage: tomatoSauce,
      organization: "GreenFoodS LTD",
      issueType: "Suspicious Product",
      issueTagClass: "tag-orange",
      date: "May 19, 2026",
      time: "5:45 PM",
    },
    {
      id: 3,
      productName: "Farm Milk",
      productImage: farmMilk,
      organization: "Health farms LTD",
      issueType: "Fake Product",
      issueTagClass: "tag-red",
      date: "April 19, 2026",
      time: "2:05 PM",
    },
    {
      id: 4,
      productName: "Sunburst Chips",
      productImage: sunburstChips,
      organization: "GreenFoodS LTD",
      issueType: "Counterfeit",
      issueTagClass: "tag-blue",
      date: "Dec 19, 2025",
      time: "1:45 AM",
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
            <div className="navItem">
              <HiOutlineHome />
              <span>Dashboard</span>
            </div>

            <div className="navItem">
              <HiOutlineBuildingOffice2 />
              <span>Organizations</span>
            </div>

            <div className="navItem">
              <HiOutlineDocumentText />
              <span>Applications</span>
            </div>

            <div className="navItem active">
              <HiOutlineClipboardDocumentCheck />
              <span>Consumer Reports</span>
            </div>

            <div className="navItem">
              <HiOutlineMegaphone />
              <span>Promotion & Tips</span>
            </div>

            <div className="navItem">
              <HiOutlineBell />
              <span>Notification</span>
            </div>
          </nav>
        </div>
        <div className="promoAdmin">
          <div className="adminCircle">AD</div>
          <span>Admin</span>
        </div>
      </aside>

      {/* ================= Main Content ================= */}
      <main className="mainContent">
        <header className="headerBar">
          <h2>Consumer Report</h2>
        </header>

        <div className="contentPadding">
          {/* ================= Stats Grid ================= */}
          <section className="statsGrid">
            {stats.map((item, index) => (
              <div key={index} className="statCard">
                <small>{item.title}</small>
                <h2>{item.value}</h2>
              </div>
            ))}
          </section>

          {/* ================= Reports Table/List ================= */}
          <section className="reportsTableSection">
            {/* Table Header */}
            <div className="tableHeader">
              <div>Product</div>
              <div>Organization</div>
              <div>Issue Type</div>
              <div>Date</div>
              <div>Action</div>
            </div>

            {/* Table Rows */}
            <div className="tableBody">
              {reports.map((report) => (
                <div key={report.id} className="reportCardRow">
                  {/* Column 1: Product info */}
                  <div className="colProduct">
                    <img
                      src={report.productImage}
                      alt={report.productName}
                      className="productThumb"
                    />
                    <span>{report.productName}</span>
                  </div>

                  {/* Column 2: Organization */}
                  <div className="colOrg">{report.organization}</div>

                  {/* Column 3: Issue Type Badge */}
                  <div className="colIssue">
                    <span className={`issueBadge ${report.issueTagClass}`}>
                      {report.issueType}
                    </span>
                  </div>

                  {/* Column 4: Date & Time */}
                  <div className="colDate">
                    <div>{report.date}</div>
                    <small>{report.time}</small>
                  </div>

                  {/* Column 5: Action Button & More Options */}
                  <div className="colAction">
                    <button className="reviewBtn">Review</button>
                    <button className="moreBtn" aria-label="More Options">
                      <BsThreeDotsVertical />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ConsumerReports;