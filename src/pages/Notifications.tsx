import { useState } from "react";
import "./Notifications.css";

import { HiOutlineHome, HiOutlineBuildingOffice2, HiOutlineDocumentText, HiOutlineClipboardDocumentCheck, HiOutlineMegaphone, HiOutlineBell, HiOutlineUser, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineDocument, HiOutlineEnvelopeOpen,HiChevronLeft, HiChevronRight, } from "react-icons/hi2";

import logo from "../assets/logo.png";

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
    <div className="dashboardContainer">

      {/* Sidebar */}

      <aside className="sidebar">

        <div className="logo">
          <img src={logo} alt="TrustEats" />
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

          <div className="navItem">
            <HiOutlineClipboardDocumentCheck />
            <span>Consumer Reports</span>
          </div>

          <div className="navItem">
            <HiOutlineMegaphone />
            <span>Promotion & Tips</span>
          </div>

          <div className="navItem active">
            <HiOutlineBell />
            <span>Notification</span>
          </div>

        </nav>
        
        <div className="promoAdmin">
          <div className="adminCircle">AD</div>
          <span>Admin</span>
        </div>


      </aside>

      {/* Main */}

      <main className="mainContent">

        <header className="headerBar">
          <h2>Notification</h2>
        </header>

        <div className="contentPadding">

          <div className="notificationTopBar">

            <div className="tabs">

              <button
                className={`tabBtn ${
                  activeTab === "all" ? "active" : ""
                }`}
                onClick={() => setActiveTab("all")}
              >
                All Notification
                <span className="badge">
                  {notifications.length}
                </span>
              </button>

              <button
                className={`tabBtn ${
                  activeTab === "unread" ? "active" : ""
                }`}
                onClick={() => setActiveTab("unread")}
              >
                Unread
                <span className="badge light">
                  {unreadCount}
                </span>
              </button>

            </div>

            <button
              className="markReadBtn"
              onClick={markAllAsRead}
            >
              <HiOutlineEnvelopeOpen />
              Mark all as read
            </button>

          </div>

          <div className="notificationCard">

            {displayedNotifications.map((item) => (

              <div
                key={item.id}
                className="notificationItem"
              >

                <div
                  className={`notifIconContainer ${item.type}`}
                >
                  {item.icon}
                </div>

                <div className="notifContent">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>

                <div className="notifRight">

                  <span className="notifDate">
                    {item.date}
                  </span>

                  {item.unread && (
                    <span className="greenDot"></span>
                  )}

                </div>

              </div>

            ))}

            {activeTab === "all" && (

              <div className="paginationFooter">

                <span className="showingText">
                  Showing 1 to 10 of {notifications.length}
                  &nbsp;Notifications
                </span>

                <div className="paginationControls">

                  <button className="pageBtn">
                    <HiChevronLeft />
                  </button>

                  <button className="pageBtn activePage">
                    1
                  </button>

                  <button className="pageBtn">
                    2
                  </button>

                  <button className="pageBtn">
                    3
                  </button>

                  <button className="pageBtn">
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