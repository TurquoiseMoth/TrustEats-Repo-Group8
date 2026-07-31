import React from "react";
import {
  Scan,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronRight,
  Home,
  History,
  User,
  Bell,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { ROUTES } from "../constants";
import logo from "../assets/Logo.png";
import phone from "../assets/phone.png";
import pepper from "../assets/pepper.png";

const navItems = [
  { label: "Home", href: ROUTES.DASHBOARD, icon: Home },
  { label: "Scan", href: ROUTES.SCAN, icon: Scan },
  { label: "History", href: ROUTES.HISTORY, icon: History },
  { label: "Profile", href: ROUTES.PROFILE, icon: User },
];

const Dashboard: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen justify-center bg-[#f3f4f6] font-[system-ui,-apple-system,BlinkMacSystemFont,Segoe_UI,Roboto,Oxygen,Ubuntu,Cantarell,sans-serif]">
      <div className="relative flex min-h-screen w-full max-w-[440px] flex-col bg-[#f4f8fa] pb-16 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] md:max-w-7xl md:pb-0 md:shadow-none">

        {/* Desktop top bar */}
        <header className="hidden items-center justify-between border-b border-gray-100 bg-white px-10 py-4 md:flex">
          <Link to={ROUTES.HOME} className="flex shrink-0 items-center gap-2.5">
            <img src={logo} alt="TrustEats home" className="h-8 w-auto" />
          </Link>

          <nav className="flex items-center gap-1 rounded-full bg-[#f0f8ff] px-1.5 py-1" aria-label="Dashboard navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${
                    isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Icon size={16} aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            to={ROUTES.NOTIFICATIONS}
            aria-label="Notifications"
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-primary/10 hover:text-primary"
          >
            <Bell size={20} aria-hidden="true" />
          </Link>
        </header>

        {/* Main Content */}
        <div className="flex flex-col gap-6 px-5 pb-[15px] pt-12 md:mx-auto md:w-full md:max-w-5xl md:px-10 md:py-10">

          {/* Header */}
          <header className="flex items-start justify-between bg-[#f0f7ff] p-4 md:bg-transparent md:p-0">
            <div className="flex max-w-[280px] flex-col md:max-w-none">
              <h1 className="m-0 text-[1.35rem] font-extrabold leading-[1.2] tracking-[-0.02em] text-[#1f2937]">Welcome back!</h1>
              <p className="mt-2.5 mb-0 text-[0.875rem] font-medium leading-[1.4] text-[#4b5563]">
                Scan a product's QR code to verify its authenticity in seconds.
              </p>
            </div>

            <Link
              to={ROUTES.NOTIFICATIONS}
              aria-label="Notifications"
              className="absolute top-[26px] right-5 z-[1] flex items-center justify-center bg-transparent p-1 text-[#1f2937] md:hidden"
            >
              <Bell size={22} aria-hidden="true" />
            </Link>
          </header>

          <div className="md:grid md:grid-cols-[1.5fr_1fr] md:items-start md:gap-8">
            {/* Left column */}
            <div className="flex flex-col gap-6">
              {/* Banner */}
              <div className="relative flex min-h-[242px] flex-col justify-between overflow-hidden rounded-[20px] bg-[#3C744333] p-5 font-bold leading-8 text-[#292D32]">
                <div className="relative z-[2] max-w-[58%]">
                  <h2 className="m-0 mb-2 text-[1.25rem] font-bold leading-[1.2] text-[#111827]">Verify. Trust. <br /> Eat.</h2>
                  <p className="mt-[38px] h-[88px] w-[166px] text-[0.75rem] font-normal leading-[22px] text-[#292D32]">
                    Scan QR code on food products to know if they are genuine and safe for you and your family.
                  </p>
                </div>

                <Link
                  to={ROUTES.SCAN}
                  className="relative z-[2] mt-4 flex cursor-pointer items-center gap-2 self-start rounded-[12px] bg-[#3C7443] p-2.5 px-4 text-[0.875rem] font-semibold text-white shadow-[0_4px_6px_-1px_rgba(45,106,79,0.2)] hover:bg-[#23533e]"
                >
                  <span>Scan a Product</span>
                  <Scan size={16} aria-hidden="true" />
                </Link>

                <div className="pointer-events-none absolute flex h-[94%] items-end justify-end">
                  <img
                    src={phone}
                    alt="Product verification preview"
                    className="relative bottom-0 left-[169px] h-[242px] w-[229px] object-contain"
                  />
                </div>
              </div>

              {/* Recent Scans */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#2d3748]" style={{ margin: 0 }}>Recent Scan</h3>
                  <Link to={ROUTES.HISTORY} className="text-[0.875rem] font-semibold text-[#2d6a4f] hover:underline">
                    View all
                  </Link>
                </div>

                <div className="flex items-center justify-between rounded-[20px] border border-[#f3f4f6] bg-white p-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center rounded-[12px] border border-[#f3f4f6] bg-[#f9fafb] p-1">
                      <img
                        src={pepper}
                        alt="Gino Pepper & Onion Paste"
                        className="max-h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="m-0 text-[0.875rem] font-bold text-[#111827]">Gino Pepper & Onion Paste</h4>
                      <div className="inline-flex w-fit items-center gap-1 rounded-full border border-[#d1fae5] bg-[#ecfdf5] px-2 py-0.5 text-[0.65rem] font-semibold text-[#008236]">
                        <CheckCircle2 size={12} aria-hidden="true" />
                        <span>Verified</span>
                      </div>
                      <p className="m-0 text-[0.7rem] text-[#9ca3af]">Today, 12:53 PM</p>
                    </div>
                  </div>

                  <ChevronRight size={20} className="cursor-pointer text-[#9ca3af]" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Right column */}
            <div>
              {/* Monthly Scan Summary */}
              <div className="w-full rounded-[16px] bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                <h3 className="mb-4 text-base font-bold text-[#2d3748]">Monthly Scan Summary</h3>

                <div className="grid grid-cols-[1fr_1.5fr] items-center gap-4">
                  {/* Total Scans */}
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[32px] font-extrabold leading-none text-[#2d3748]">10</span>
                    <span className="mt-1.5 text-[13px] font-semibold text-[#4a5568]">Total Scan</span>
                  </div>

                  {/* Status List */}
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between border-b border-[#e2e8f0] py-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        <CheckCircle2 size={16} aria-hidden="true" />
                        <span>Verified</span>
                      </div>
                      <span className="text-[0.875rem] font-bold text-[#111827]">5</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-[#e2e8f0] py-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-[#F59E0B]">
                        <AlertTriangle size={16} aria-hidden="true" />
                        <span>Suspicious</span>
                      </div>
                      <span className="text-[0.875rem] font-bold text-[#111827]">2</span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-[#EF4444]">
                        <XCircle size={16} aria-hidden="true" />
                        <span>Fake</span>
                      </div>
                      <span className="text-[0.875rem] font-bold text-[#111827]">3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation (mobile) */}
        <nav className="fixed bottom-0 z-10 flex w-full max-w-[440px] items-center justify-between border-t border-[#f3f4f6] bg-white px-6 py-3 md:hidden" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex flex-col items-center gap-1 text-[0.75rem] font-medium ${
                  isActive ? "text-[#2d6a4f]" : "text-[#9ca3af]"
                }`}
              >
                <div className={`flex items-center justify-center rounded-lg p-1.5 ${isActive ? "bg-[#2d6a4f] text-white" : ""}`}>
                  <Icon size={20} aria-hidden="true" />
                </div>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

      </div>
    </div>
  );
};

export default Dashboard;
