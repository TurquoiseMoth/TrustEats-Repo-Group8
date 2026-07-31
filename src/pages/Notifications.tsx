import { useState } from "react";

import { HiOutlineHome, HiOutlineBuildingOffice2, HiOutlineDocumentText, HiOutlineClipboardDocumentCheck, HiOutlineMegaphone, HiOutlineBell, HiOutlineUser, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineDocument, HiOutlineEnvelopeOpen,HiChevronLeft, HiChevronRight, } from "react-icons/hi2";

import logo from "../assets/Logo.png";

const initialNotifications = [
  {
    id: 1,
    type: "user",
    icon: <HiOutlineUser />,
    title: "New Manufacture Application",
    description:
      "GreenField Foods Ltd has submitted an application for registration.",
    date: "July 23, 2026 • 10:20 AM",
    unread: true,
  },
  {
    id: 2,
    type: "success",
    icon: <HiOutlineCheckCircle />,
    title: "Manufacture Application Approved",
    description:
      "GreenField Foods Ltd application has been approved",
    date: "July 10, 2026 • 10:51 AM",
    unread: true,
  },
  {
    id: 3,
    type: "rejected",
    icon: <HiOutlineXCircle />,
    title: "Manufacture Application Rejected",
    description:
      "GreenField Foods Ltd application was rejected",
    date: "June 8, 2026 • 3:20 PM",
    unread: true,
  },
  {
    id: 4,
    type: "document",
    icon: <HiOutlineDocument />,
    title: "Consumer Report Received",
    description:
      "A new report has submitted for a product : Golden Morn Cereal",
    date: "May 12, 2026 • 5:20 PM",
    unread: true,
  },
  {
    id: 5,
    type: "user",
    icon: <HiOutlineUser />,
    title: "New Manufacture Application",
    description:
      "Aquafina Table Water LTD has submitted an application for registration.",
    date: "May 12, 2026 • 10:20 AM",
    unread: false,
  },
  {
    id: 6,
    type: "user",
    icon: <HiOutlineUser />,
    title: "New Manufacture Application",
    description:
      "Crop8Hub has submitted an application for registration.",
    date: "April 25, 2026 • 12:20 PM",
    unread: false,
  },
  {
    id: 7,
    type: "user",
    icon: <HiOutlineUser />,
    title: "New Manufacture Application",
    description:
      "Bwater has submitted an application for registration.",
    date: "April 1, 2026 • 2:20 PM",
    unread: false,
  },
  {
    id: 8,
    type: "document",
    icon: <HiOutlineDocument />,
    title: "Consumer Report Received",
    description:
      "A new report has submitted for a product : Farm Milk",
    date: "February 1, 2026 • 10:45 AM",
    unread: false,
  },
  {
    id: 9,
    type: "success",
    icon: <HiOutlineCheckCircle />,
    title: "Manufacture Application Approved",
    description:
      "Delat Palm Brand application has been approved",
    date: "January 20, 2026 • 1:00 PM",
    unread: false,
  },
  {
    id: 10,
    type: "user",
    icon: <HiOutlineUser />,
    title: "New Manufacture Application",
    description:
      "Delat Palm Brand has submitted an application for registration.",
    date: "January 15, 2026 • 9:45 AM",
    unread: false,
  },
];

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const unreadCount = notifications.filter(
    (item) => item.unread
  ).length;

  const displayedNotifications =
    activeTab === "unread"
      ? notifications.filter((item) => item.unread)
      : notifications;

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        unread: false,
      }))
    );
  };

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">

      {/* Sidebar */}

      <aside className="absolute top-[-10px] left-0 w-[280px] h-full flex flex-col py-[32px] px-[16px] bg-[#edf3f8] border-r border-[#e2e8f0] z-[1000] items-center mr-[30px] max-[992px]:hidden">

        <div className="flex items-center gap-[10px] mb-[40px] pl-[12px]">
          <img src={logo} alt="TrustEats" className="w-[120px] h-auto block" />
        </div>

        <nav className="w-full h-full flex flex-col gap-[8px] absolute top-[160px] left-[46px]">

          <div className="w-[68%] h-[42px] flex items-center gap-[12px] px-[16px] rounded-[8px] text-[#5b7065] cursor-pointer text-[13px] font-semibold transition-all duration-200 ease-[ease] [&_svg]:w-[16px] [&_svg]:h-[16px] [&_svg]:shrink-0 hover:bg-[#e1ebd9]">
            <HiOutlineHome />
            <span>Dashboard</span>
          </div>

          <div className="w-[68%] h-[42px] flex items-center gap-[12px] px-[16px] rounded-[8px] text-[#5b7065] cursor-pointer text-[13px] font-semibold transition-all duration-200 ease-[ease] [&_svg]:w-[16px] [&_svg]:h-[16px] [&_svg]:shrink-0 hover:bg-[#e1ebd9]">
            <HiOutlineBuildingOffice2 />
            <span>Organizations</span>
          </div>

          <div className="w-[68%] h-[42px] flex items-center gap-[12px] px-[16px] rounded-[8px] text-[#5b7065] cursor-pointer text-[13px] font-semibold transition-all duration-200 ease-[ease] [&_svg]:w-[16px] [&_svg]:h-[16px] [&_svg]:shrink-0 hover:bg-[#e1ebd9]">
            <HiOutlineDocumentText />
            <span>Applications</span>
          </div>

          <div className="w-[68%] h-[42px] flex items-center gap-[12px] px-[16px] rounded-[8px] text-[#5b7065] cursor-pointer text-[13px] font-semibold transition-all duration-200 ease-[ease] [&_svg]:w-[16px] [&_svg]:h-[16px] [&_svg]:shrink-0 hover:bg-[#e1ebd9]">
            <HiOutlineClipboardDocumentCheck />
            <span>Consumer Reports</span>
          </div>

          <div className="w-[68%] h-[42px] flex items-center gap-[12px] px-[16px] rounded-[8px] text-[#5b7065] cursor-pointer text-[13px] font-semibold transition-all duration-200 ease-[ease] [&_svg]:w-[16px] [&_svg]:h-[16px] [&_svg]:shrink-0 hover:bg-[#e1ebd9]">
            <HiOutlineMegaphone />
            <span>Promotion & Tips</span>
          </div>

          <div className="w-[68%] h-[42px] flex items-center gap-[12px] px-[16px] rounded-[8px] text-[#5b7065] cursor-pointer text-[13px] font-semibold transition-all duration-200 ease-[ease] [&_svg]:w-[16px] [&_svg]:h-[16px] [&_svg]:shrink-0 hover:bg-[#e1ebd9] bg-[#3d7246] text-white shadow-[0_2px_4px_rgba(61,114,70,0.2)] [&_svg]:text-white">
            <HiOutlineBell />
            <span>Notification</span>
          </div>

        </nav>
        
        <div className="relative top-[240px] left-0 w-[78%] h-[42px] border border-[#8db28e] rounded-[10px] flex items-center gap-[10px] justify-center bg-white mb-[60px]">
          <div className="w-[24px] h-[24px] rounded-full bg-[#c8d7c8] flex items-center justify-center text-white text-[10px] font-bold">AD</div>
          <span>Admin</span>
        </div>


      </aside>

      {/* Main */}

      <main className="flex-1 ml-[280px] min-h-screen w-[calc(100%-220px)] max-[992px]:w-full max-[992px]:ml-0">

        <header className="h-[64px] bg-[#84a98c] flex items-center px-[32px] max-[600px]:h-[70px] max-[600px]:px-[20px]">
          <h2 className="text-white text-[20px] font-bold max-[600px]:text-[22px]">Notification</h2>
        </header>

        <div className="p-[32px] max-[992px]:p-[20px] max-[600px]:p-[16px]">

          <div className="flex justify-between items-center mb-[24px] max-[992px]:flex-col max-[992px]:items-start max-[992px]:gap-[20px]">

            <div className="flex gap-[32px] max-[600px]:gap-[20px]">

              <button
                className={`bg-transparent border-none cursor-pointer text-[14px] text-[#6b7280] font-semibold relative pb-[10px] flex items-center gap-[8px] max-[600px]:text-[13px] ${
                  activeTab === "all"
                    ? "text-[#3d7246] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[4px] after:rounded-[4px] after:bg-[#3d7246]"
                    : ""
                }`}
                onClick={() => setActiveTab("all")}
              >
                All Notification
                <span className="bg-[#e2ece9] text-[#3d7246] text-[11px] font-bold px-[8px] py-[2px] rounded-[12px]">
                  {notifications.length}
                </span>
              </button>

              <button
                className={`bg-transparent border-none cursor-pointer text-[14px] text-[#6b7280] font-semibold relative pb-[10px] flex items-center gap-[8px] max-[600px]:text-[13px] ${
                  activeTab === "unread"
                    ? "text-[#3d7246] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[4px] after:rounded-[4px] after:bg-[#3d7246]"
                    : ""
                }`}
                onClick={() => setActiveTab("unread")}
              >
                Unread
                <span className="bg-[#e2ece9] text-[#3d7246] text-[11px] font-bold px-[8px] py-[2px] rounded-[12px] bg-[#3d7246] text-white">
                  {unreadCount}
                </span>
              </button>

            </div>

            <button
              className="flex items-center gap-[8px] border border-[#c0d4c6] bg-white text-[#3d7246] px-[16px] py-[8px] rounded-[8px] cursor-pointer text-[13px] font-semibold transition-all duration-200 ease-[ease] hover:bg-[#f0f7f2] max-[600px]:w-full max-[600px]:justify-center"
              onClick={markAllAsRead}
            >
              <HiOutlineEnvelopeOpen />
              Mark all as read
            </button>

          </div>

          <div className="bg-white rounded-[12px] overflow-hidden border border-[#e5e7eb] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">

            {displayedNotifications.map((item) => (

              <div
                key={item.id}
                className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#f3f4f6] transition-colors duration-200 ease-[ease] hover:bg-[#f9fafb] last:border-b-0 max-[992px]:flex-col max-[992px]:items-start max-[992px]:gap-[15px] max-[600px]:p-[15px]"
              >

                <div
                  className="w-[38px] h-[38px] rounded-[8px] flex items-center justify-center mr-[16px] text-[16px] shrink-0 bg-[#edf5ef] text-[#3d7246]"
                >
                  {item.icon}
                </div>

                <div className="flex-1">
                  <h4 className="text-[14px] font-bold text-[#1f2937] mb-[3px]">{item.title}</h4>
                  <p className="text-[#9ca3af] text-[12px] font-normal">{item.description}</p>
                </div>

                <div className="flex items-center gap-[12px] max-[992px]:w-full max-[992px]:justify-between">

                  <span className="text-[#6b7280] text-[12px] font-medium whitespace-nowrap">
                    {item.date}
                  </span>

                  {item.unread && (
                    <span className="w-[7px] h-[7px] bg-[#3d7246] rounded-full"></span>
                  )}

                </div>

              </div>

            ))}

            {activeTab === "all" && (

              <div className="flex justify-between items-center px-[22px] py-[18px] border-t border-[#ececec] bg-white max-[992px]:flex-col max-[992px]:gap-[15px]">

                <span className="text-[#6b7280] text-[14px]">
                  Showing 1 to 10 of {notifications.length}
                  &nbsp;Notifications
                </span>

                <div className="flex gap-[8px]">

                  <button className="w-[38px] h-[38px] border border-[#d8d8d8] rounded-[8px] bg-white text-[#1f2937] cursor-pointer font-[inherit] transition-colors duration-200 ease-[ease] hover:bg-[#edf5ef]">
                    <HiChevronLeft />
                  </button>

                  <button className="w-[38px] h-[38px] border border-[#d8d8d8] rounded-[8px] bg-white text-[#1f2937] cursor-pointer font-[inherit] transition-colors duration-200 ease-[ease] hover:bg-[#edf5ef] bg-[#3d7246] text-white border-[#3d7246]">
                    1
                  </button>

                  <button className="w-[38px] h-[38px] border border-[#d8d8d8] rounded-[8px] bg-white text-[#1f2937] cursor-pointer font-[inherit] transition-colors duration-200 ease-[ease] hover:bg-[#edf5ef]">
                    2
                  </button>

                  <button className="w-[38px] h-[38px] border border-[#d8d8d8] rounded-[8px] bg-white text-[#1f2937] cursor-pointer font-[inherit] transition-colors duration-200 ease-[ease] hover:bg-[#edf5ef]">
                    3
                  </button>

                  <button className="w-[38px] h-[38px] border border-[#d8d8d8] rounded-[8px] bg-white text-[#1f2937] cursor-pointer font-[inherit] transition-colors duration-200 ease-[ease] hover:bg-[#edf5ef]">
                    <HiChevronRight />
                  </button>

                </div>

              </div>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}
