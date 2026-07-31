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
      issueTagClass: "bg-[#ede9fe] text-[#7c3aed]", // Style according to issue type
      date: "July 19, 2026",
      time: "11:45 AM",
    },
    {
      id: 2,
      productName: "PureTaste Tomatoes sauce",
      productImage: tomatoSauce,
      organization: "GreenFoodS LTD",
      issueType: "Suspicious Product",
      issueTagClass: "bg-[#ffedd5] text-[#ea580c]",
      date: "May 19, 2026",
      time: "5:45 PM",
    },
    {
      id: 3,
      productName: "Farm Milk",
      productImage: farmMilk,
      organization: "Health farms LTD",
      issueType: "Fake Product",
      issueTagClass: "bg-[#ffe4e6] text-[#e11d48]",
      date: "April 19, 2026",
      time: "2:05 PM",
    },
    {
      id: 4,
      productName: "Sunburst Chips",
      productImage: sunburstChips,
      organization: "GreenFoodS LTD",
      issueType: "Counterfeit",
      issueTagClass: "bg-[#dbeafe] text-[#2563eb]",
      date: "Dec 19, 2025",
      time: "1:45 AM",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#eef5f3]">
      {/* ================= Sidebar ================= */}
      <aside className="w-[280px] min-h-screen bg-white p-[32px_24px] flex flex-col justify-between border-r border-[#e2e8f0] shrink-0">
        <div>
          <div className="mb-12 flex items-center">
            <div>
              <img src={logo} alt="TrustEats Logo" className="max-w-[150px] h-auto block" />
            </div>
          </div>

          <nav className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-[14px] px-4 py-3 rounded-lg text-[#417551] font-medium text-[15px] cursor-pointer transition-all duration-200 ease-[ease] hover:bg-[#f0f5f2]">
              <HiOutlineHome className="text-[20px]" />
              <span>Dashboard</span>
            </div>

            <div className="flex items-center gap-[14px] px-4 py-3 rounded-lg text-[#417551] font-medium text-[15px] cursor-pointer transition-all duration-200 ease-[ease] hover:bg-[#f0f5f2]">
              <HiOutlineBuildingOffice2 className="text-[20px]" />
              <span>Organizations</span>
            </div>

            <div className="flex items-center gap-[14px] px-4 py-3 rounded-lg text-[#417551] font-medium text-[15px] cursor-pointer transition-all duration-200 ease-[ease] hover:bg-[#f0f5f2]">
              <HiOutlineDocumentText className="text-[20px]" />
              <span>Applications</span>
            </div>

            <div className="flex items-center gap-[14px] px-4 py-3 rounded-lg text-[#417551] font-medium text-[15px] cursor-pointer transition-all duration-200 ease-[ease] hover:bg-[#f0f5f2] bg-[#417551] text-white hover:bg-[#417551]!">
              <HiOutlineClipboardDocumentCheck className="text-[20px]" />
              <span>Consumer Reports</span>
            </div>

            <div className="flex items-center gap-[14px] px-4 py-3 rounded-lg text-[#417551] font-medium text-[15px] cursor-pointer transition-all duration-200 ease-[ease] hover:bg-[#f0f5f2]">
              <HiOutlineMegaphone className="text-[20px]" />
              <span>Promotion & Tips</span>
            </div>

            <div className="flex items-center gap-[14px] px-4 py-3 rounded-lg text-[#417551] font-medium text-[15px] cursor-pointer transition-all duration-200 ease-[ease] hover:bg-[#f0f5f2]">
              <HiOutlineBell className="text-[20px]" />
              <span>Notification</span>
            </div>
          </nav>
        </div>
        <div className="w-full h-[42px] mt-4 mb-4 border border-[#8db28e] rounded-[10px] flex items-center gap-[10px] justify-center bg-white">
          <div className="w-6 h-6 rounded-full bg-[#c8d7c8] flex items-center justify-center text-white text-[10px] font-bold">AD</div>
          <span>Admin</span>
        </div>
      </aside>

      {/* ================= Main Content ================= */}
      <main className="flex-1 flex flex-col">
        <header className="bg-[#7ca982] px-8 py-5 text-white flex items-center">
          <h2 className="text-[20px] font-semibold text-white">Consumer Report</h2>
        </header>

        <div className="p-8">
          {/* ================= Stats Grid ================= */}
          <section className="grid grid-cols-3 gap-6 mb-8">
            {stats.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-[12px] shadow-[0_2px_6px_rgba(0,0,0,0.03)] flex flex-col gap-3">
                <small className="text-[13px] text-[#718096] font-semibold">{item.title}</small>
                <h2 className="text-2xl text-[#1a202c] font-bold">{item.value}</h2>
              </div>
            ))}
          </section>

          {/* ================= Reports Table/List ================= */}
          <section className="flex flex-col gap-3">
            {/* Table Header */}
            <div className="grid grid-cols-[2.5fr_1.5fr_1.5fr_1.5fr_1fr] px-6 py-3 text-[13px] font-semibold text-[#718096]">
              <div>Product</div>
              <div>Organization</div>
              <div>Issue Type</div>
              <div>Date</div>
              <div>Action</div>
            </div>

            {/* Table Rows */}
            <div className="flex flex-col gap-3">
              {reports.map((report) => (
                <div key={report.id} className="grid grid-cols-[2.5fr_1.5fr_1.5fr_1.5fr_1fr] items-center bg-white px-6 py-4 rounded-[12px] border border-[#e2e8f0] shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-[transform,box-shadow] duration-150 ease-[ease] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                  {/* Column 1: Product info */}
                  <div className="flex items-center gap-4 font-semibold text-[14px] text-[#2d3748]">
                    <img
                      src={report.productImage}
                      alt={report.productName}
                      className="w-9 h-11 object-contain rounded shrink-0"
                    />
                    <span>{report.productName}</span>
                  </div>

                  {/* Column 2: Organization */}
                  <div className="text-[14px] text-[#4a5568] font-medium">{report.organization}</div>

                  {/* Column 3: Issue Type Badge */}
                  <div className="flex items-center">
                    <span className={`px-[14px] py-1.5 rounded-[12px] text-[12px] font-semibold inline-block ${report.issueTagClass}`}>
                      {report.issueType}
                    </span>
                  </div>

                  {/* Column 4: Date & Time */}
                  <div className="flex flex-col text-[13px] text-[#2d3748] font-medium">
                    <div>{report.date}</div>
                    <small className="text-[11px] text-[#718096] mt-0.5">{report.time}</small>
                  </div>

                  {/* Column 5: Action Button & More Options */}
                  <div className="flex items-center gap-3">
                    <button className="bg-transparent text-[#417551] border border-[#417551] px-[18px] py-1.5 rounded-md text-[13px] font-semibold cursor-pointer transition-all duration-200 ease-[ease] hover:bg-[#417551] hover:text-white">Review</button>
                    <button className="bg-transparent border-none text-[#a0aec0] text-[18px] cursor-pointer flex items-center p-1 rounded hover:text-[#4a5568] hover:bg-[#f7fafc]" aria-label="More Options">
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
