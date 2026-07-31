import { useState } from "react";

import { HiOutlineHome, HiOutlineBuildingOffice2, HiOutlineDocumentText, HiOutlineClipboardDocumentCheck,
  HiOutlineMegaphone, HiOutlineBell, HiOutlineCloudArrowUp, HiOutlineCalendarDays, HiOutlineClock, HiOutlineUserGroup, } from "react-icons/hi2";

import logo from "../assets/Logo.png";

export default function Promotions() {
  const [pushNotification, setPushNotification] = useState(true);
  const [inAppMessage, setInAppMessage] = useState(true);

  const [message, setMessage] = useState("");

  return (
    <div className="flex min-h-screen bg-[#eef5fb] font-[Inter,sans-serif]">
      {/* ===========================
            SIDEBAR
      ============================ */}

      <aside className="flex w-[230px] flex-col border-r border-[#d9e3ec] bg-[#edf4fb] max-[850px]:hidden">
        <div className="mt-[56px] flex h-[52px] w-[182px] items-center pl-[28px]">
          <img src={logo} alt="TrustEats" className="w-[145px]" />
        </div>

        <nav className="flex flex-col gap-[8px] p-[24px_18px]">
          <a href="#" className="flex items-center gap-[12px] rounded-[8px] p-[11px_14px] text-[14px] font-medium text-[#4f7552] transition duration-[250ms] hover:bg-[#dcebdc]">
            <HiOutlineHome className="text-[18px]" />
            Dashboard
          </a>

          <a href="#" className="flex items-center gap-[12px] rounded-[8px] p-[11px_14px] text-[14px] font-medium text-[#4f7552] transition duration-[250ms] hover:bg-[#dcebdc]">
            <HiOutlineBuildingOffice2 className="text-[18px]" />
            Organizations
          </a>

          <a href="#" className="flex items-center gap-[12px] rounded-[8px] p-[11px_14px] text-[14px] font-medium text-[#4f7552] transition duration-[250ms] hover:bg-[#dcebdc]">
            <HiOutlineDocumentText className="text-[18px]" />
            Applications
          </a>

          <a href="#" className="flex items-center gap-[12px] rounded-[8px] p-[11px_14px] text-[14px] font-medium text-[#4f7552] transition duration-[250ms] hover:bg-[#dcebdc]">
            <HiOutlineClipboardDocumentCheck className="text-[18px]" />
            Consumer Reports
          </a>

          <a href="#" className="flex items-center gap-[12px] rounded-[8px] bg-[#4d8251] p-[11px_14px] text-[14px] font-medium text-white transition duration-[250ms] hover:bg-[#dcebdc]">
            <HiOutlineMegaphone className="text-[18px]" />
            Promotion & Tips
          </a>

          <a href="#" className="flex items-center gap-[12px] rounded-[8px] p-[11px_14px] text-[14px] font-medium text-[#4f7552] transition duration-[250ms] hover:bg-[#dcebdc]">
            <HiOutlineBell className="text-[18px]" />
            Notification
          </a>
        </nav>

        <div className="mt-[230px] mb-[30px] flex h-[42px] items-center justify-center gap-[10px] rounded-[10px] border border-[#8db28e] bg-white mx-[28px]">
          <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#c8d7c8] text-[10px] font-bold text-white">AD</div>
          <span className="text-[14px] font-semibold">Admin</span>
        </div>
      </aside>

      {/* ===========================
            MAIN CONTENT
      ============================ */}

      <main className="flex flex-1 flex-col">
        <div className="flex h-[71px] items-center bg-[#7d9d79] px-[35px] max-[850px]:px-[20px]">
          <h2 className="text-[24px] font-bold text-white max-[850px]:text-[20px]">Promotions &amp; Safety Tips</h2>
        </div>

        <section className="p-[22px_40px_40px] max-[1100px]:p-[20px] max-[500px]:p-[15px]">

          <div className="mb-[22px] flex items-center justify-between max-[850px]:flex-col max-[850px]:items-start max-[850px]:gap-[16px]">
            <div>
              <h3 className="mb-[6px] text-[28px] max-[500px]:text-[22px]">Campaign Composer</h3>
              <p className="text-[15px] text-[#666]">
                Create and send promotions, safety tips and important updates
                to app users.
              </p>
            </div>

            <button className="cursor-pointer rounded-[8px] border border-[#7da77d] bg-transparent px-[18px] py-[10px] font-semibold text-[#4b8251] transition duration-[250ms] hover:bg-[#edf7ed] max-[850px]:w-full">
              Recent Campaign
            </button>
          </div>

          <div className="rounded-[14px] bg-white p-[24px] shadow-[0_3px_12px_rgba(0,0,0,0.05)] max-[850px]:p-[18px] max-[500px]:p-[15px]">

            {/* ================= ROW 1 ================= */}

            <div className="grid grid-cols-2 gap-[20px] max-[850px]:grid-cols-1">

              <div className="mb-[18px] flex flex-col">
                <label className="mb-[8px] text-[14px] font-semibold">Campaign Type</label>

                <div className="relative flex items-center">
                  <HiOutlineMegaphone className="pointer-events-none absolute left-[14px] text-[18px] text-[#6f6f6f]" />

                  <select className="w-full rounded-[8px] border border-[#cfd7dc] py-[12px] pr-[14px] pl-[42px] text-[14px] outline-none transition duration-[250ms] focus:border-[#4f8250]">
                    <option>Promotion</option>
                    <option>Safety Tip</option>
                    <option>Announcement</option>
                  </select>
                </div>
              </div>

              <div className="mb-[18px] flex flex-col">
                <label className="mb-[8px] text-[14px] font-semibold">Audience</label>

                <div className="relative flex items-center">
                  <HiOutlineUserGroup className="pointer-events-none absolute left-[14px] text-[18px] text-[#6f6f6f]" />

                  <select className="w-full rounded-[8px] border border-[#cfd7dc] py-[12px] pr-[14px] pl-[42px] text-[14px] outline-none transition duration-[250ms] focus:border-[#4f8250]">
                    <option>All Users</option>
                    <option>Organizations</option>
                    <option>Consumers</option>
                  </select>
                </div>
              </div>

            </div>

            {/* ================= TITLE ================= */}

            <div className="mb-[18px] flex flex-col">
              <label className="mb-[8px] text-[14px] font-semibold">Title</label>

              <input
                type="text"
                placeholder="Enter campaign title..."
                className="w-full rounded-[8px] border border-[#cfd7dc] p-[12px_14px] text-[14px] outline-none transition duration-[250ms] focus:border-[#4f8250]"
              />
            </div>

            {/* ================= MESSAGE ================= */}

            <div className="mb-[18px] flex flex-col">
              <label className="mb-[8px] text-[14px] font-semibold">Message</label>

              <textarea
                placeholder="Write your message here..."
                maxLength={500}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-[140px] w-full resize-none rounded-[8px] border border-[#cfd7dc] p-[12px_14px] text-[14px] outline-none transition duration-[250ms] focus:border-[#4f8250]"
              />

              <span className="mt-[6px] self-end text-[12px] text-[#7b7b7b]">
                {message.length}/500
              </span>
            </div>

            {/* ================= LAST ROW ================= */}

            <div className="mt-[18px] grid grid-cols-[1fr_280px] gap-[25px] max-[1100px]:grid-cols-1">

              {/* LEFT */}

              <div>

                <div className="mb-[18px] flex flex-col">
                  <label className="mb-[8px] text-[14px] font-semibold">
                    Upload Banner/Image
                    <span className="font-normal text-[#7b7b7b]"> (Optional)</span>
                  </label>

                  <div className="flex h-[140px] cursor-pointer flex-col items-center justify-center rounded-[10px] border-2 border-dashed border-[#a7c5a6] bg-[#fafdf9] transition duration-[250ms] hover:border-[#4f8250] hover:bg-[#f3fbf2]">

                    <HiOutlineCloudArrowUp
                      className="mb-[10px] text-[34px] text-[#4f8250]"
                    />

                    <strong className="mb-[5px] text-[15px] text-[#4f8250]">Add photo</strong>

                    <small className="text-[12px] text-[#888]">
                      JPG, PNG up to 5MB each
                    </small>

                  </div>

                </div>

              </div>

              {/* RIGHT */}

              <div>

                <div className="mb-[18px] flex flex-col">
                  <label className="mb-[8px] text-[14px] font-semibold">Date</label>

                  <div className="relative flex items-center">
                    <input
                      type="date"
                      className="w-full rounded-[8px] border border-[#cfd7dc] py-[12px] pr-[42px] pl-[42px] text-[14px] outline-none transition duration-[250ms] focus:border-[#4f8250] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
                    />

                    <HiOutlineCalendarDays className="pointer-events-none absolute right-[14px] text-[18px] text-[#6f6f6f]" />
                  </div>
                </div>

                <div className="mb-[18px] flex flex-col">
                  <label className="mb-[8px] text-[14px] font-semibold">Time</label>

                  <div className="relative flex items-center">
                    <input
                      type="time"
                      className="w-full rounded-[8px] border border-[#cfd7dc] py-[12px] pr-[42px] pl-[42px] text-[14px] outline-none transition duration-[250ms] focus:border-[#4f8250] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
                    />

                    <HiOutlineClock className="pointer-events-none absolute right-[14px] text-[18px] text-[#6f6f6f]" />
                  </div>
                </div>

                {/* Push Notification */}

                <div className="mt-[18px] flex items-center justify-between py-[8px]">

                  <div>
                    <h4 className="mb-[3px] text-[14px]">Send Push Notification</h4>
                    <p className="text-[12px] leading-[1.4] text-[#777]">
                      Send as push notification to users
                    </p>
                  </div>

                  <label className="relative inline-block h-[24px] w-[44px]">

                    <input
                      type="checkbox"
                      checked={pushNotification}
                      onChange={() =>
                        setPushNotification(
                          !pushNotification
                        )
                      }
                      className="peer hidden"
                    />

                    <span className="absolute inset-0 cursor-pointer rounded-[999px] bg-[#d2d2d2] transition duration-[300ms] before:absolute before:top-[3px] before:left-[3px] before:h-[18px] before:w-[18px] before:rounded-full before:bg-white before:transition before:duration-[300ms] before:content-[''] peer-checked:bg-[#4f8250] peer-checked:before:translate-x-[20px]"></span>

                  </label>

                </div>

                {/* In-App */}

                <div className="mt-[18px] flex items-center justify-between py-[8px]">

                  <div>
                    <h4 className="mb-[3px] text-[14px]">Send In-App Message</h4>

                    <p className="text-[12px] leading-[1.4] text-[#777]">
                      Send Message inside the app App inbox
                    </p>
                  </div>

                  <label className="relative inline-block h-[24px] w-[44px]">

                    <input
                      type="checkbox"
                      checked={inAppMessage}
                      onChange={() =>
                        setInAppMessage(
                          !inAppMessage
                        )
                      }
                      className="peer hidden"
                    />

                    <span className="absolute inset-0 cursor-pointer rounded-[999px] bg-[#d2d2d2] transition duration-[300ms] before:absolute before:top-[3px] before:left-[3px] before:h-[18px] before:w-[18px] before:rounded-full before:bg-white before:transition before:duration-[300ms] before:content-[''] peer-checked:bg-[#4f8250] peer-checked:before:translate-x-[20px]"></span>

                  </label>

                </div>

              </div>

            </div>

            {/* BUTTON */}

            <button className="mt-[28px] h-[50px] w-full cursor-pointer rounded-[8px] border-none bg-[#3f7542] text-[15px] font-semibold text-white transition duration-[250ms] hover:bg-[#2f6232] max-[500px]:text-[14px]">
              Publish Campaign
            </button>

          </div>

        </section>

      </main>
    </div>
  );
}
