import { useState } from "react";
import "./Promotions.css";

import { HiOutlineHome, HiOutlineBuildingOffice2, HiOutlineDocumentText, HiOutlineClipboardDocumentCheck,
  HiOutlineMegaphone, HiOutlineBell, HiOutlineCloudArrowUp, HiOutlineCalendarDays, HiOutlineClock, HiOutlineUserGroup, } from "react-icons/hi2";

import logo from "../assets/logo.png";

export default function Promotions() {
  const [pushNotification, setPushNotification] = useState(true);
  const [inAppMessage, setInAppMessage] = useState(true);

  const [message, setMessage] = useState("");

  return (
    <div className="promoPage">
      {/* ===========================
            SIDEBAR
      ============================ */}

      <aside className="promoSidebar">
        <div className="promoLogo">
          <img src={logo} alt="TrustEats" />
        </div>

        <nav className="promoNav">
          <a href="#">
            <HiOutlineHome />
            Dashboard
          </a>

          <a href="#">
            <HiOutlineBuildingOffice2 />
            Organizations
          </a>

          <a href="#">
            <HiOutlineDocumentText />
            Applications
          </a>

          <a href="#">
            <HiOutlineClipboardDocumentCheck />
            Consumer Reports
          </a>

          <a href="#" className="active">
            <HiOutlineMegaphone />
            Promotion & Tips
          </a>

          <a href="#">
            <HiOutlineBell />
            Notification
          </a>
        </nav>

        <div className="promoAdmin">
          <div className="adminCircle">AD</div>
          <span>Admin</span>
        </div>
      </aside>

      {/* ===========================
            MAIN CONTENT
      ============================ */}

      <main className="promoMain">
        <div className="promoHeader">
          <h2>Promotions &amp; Safety Tips</h2>
        </div>

        <section className="promoContent">

          <div className="promoTop">
            <div>
              <h3>Campaign Composer</h3>
              <p>
                Create and send promotions, safety tips and important updates
                to app users.
              </p>
            </div>

            <button className="recentBtn">
              Recent Campaign
            </button>
          </div>

          <div className="campaignCard">

            {/* ================= ROW 1 ================= */}

            <div className="row twoColumns">

              <div className="inputGroup">
                <label>Campaign Type</label>

                <div className="inputIcon">
                  <HiOutlineMegaphone />

                  <select>
                    <option>Promotion</option>
                    <option>Safety Tip</option>
                    <option>Announcement</option>
                  </select>
                </div>
              </div>

              <div className="inputGroup">
                <label>Audience</label>

                <div className="inputIcon">
                  <HiOutlineUserGroup />

                  <select>
                    <option>All Users</option>
                    <option>Organizations</option>
                    <option>Consumers</option>
                  </select>
                </div>
              </div>

            </div>

            {/* ================= TITLE ================= */}

            <div className="inputGroup">
              <label>Title</label>

              <input
                type="text"
                placeholder="Enter campaign title..."
              />
            </div>

            {/* ================= MESSAGE ================= */}

            <div className="inputGroup">
              <label>Message</label>

              <textarea
                placeholder="Write your message here..."
                maxLength={500}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <span className="counter">
                {message.length}/500
              </span>
            </div>

            {/* ================= LAST ROW ================= */}

            <div className="bottomGrid">

              {/* LEFT */}

              <div>

                <div className="inputGroup">
                  <label>
                    Upload Banner/Image
                    <span> (Optional)</span>
                  </label>

                  <div className="uploadBox">

                    <HiOutlineCloudArrowUp
                      className="uploadIcon"
                    />

                    <strong>Add photo</strong>

                    <small>
                      JPG, PNG up to 5MB each
                    </small>

                  </div>

                </div>

              </div>

              {/* RIGHT */}

              <div>

                <div className="inputGroup">
                  <label>Date</label>

                  <div className="inputIcon">
                    <input
                      type="date"
                    />

                    <HiOutlineCalendarDays />
                  </div>
                </div>

                <div className="inputGroup">
                  <label>Time</label>

                  <div className="inputIcon">
                    <input
                      type="time"
                    />

                    <HiOutlineClock />
                  </div>
                </div>

                {/* Push Notification */}

                <div className="toggleRow">

                  <div>
                    <h4>Send Push Notification</h4>
                    <p>
                      Send as push notification to users
                    </p>
                  </div>

                  <label className="switch">

                    <input
                      type="checkbox"
                      checked={pushNotification}
                      onChange={() =>
                        setPushNotification(
                          !pushNotification
                        )
                      }
                    />

                    <span className="slider"></span>

                  </label>

                </div>

                {/* In-App */}

                <div className="toggleRow">

                  <div>
                    <h4>Send In-App Message</h4>

                    <p>
                      Send Message inside the app App inbox
                    </p>
                  </div>

                  <label className="switch">

                    <input
                      type="checkbox"
                      checked={inAppMessage}
                      onChange={() =>
                        setInAppMessage(
                          !inAppMessage
                        )
                      }
                    />

                    <span className="slider"></span>

                  </label>

                </div>

              </div>

            </div>

            {/* BUTTON */}

            <button className="publishBtn">
              Publish Campaign
            </button>

          </div>

        </section>

      </main>
    </div>
  );
}