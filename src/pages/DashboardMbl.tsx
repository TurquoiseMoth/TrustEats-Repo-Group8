import React from 'react';
import { Scan, QrCode, FileText, CheckCircle2 } from 'lucide-react';

import { Link } from "react-router";

import { ROUTES } from "../constants";

import { DEFAULT_UNREAD_COUNT } from "../constants/notifications";

import { NotificationBell } from "../components/ui/NotificationBell";

import phone from "../assets/phone.png";

import goldenMorn from "../assets/goldenMorn.png";

const DashboardMbl: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f1f7fa] font-[system-ui,-apple-system,BlinkMacSystemFont,Segoe_UI,Roboto,sans-serif] text-[#1e293b] pb-20 max-w-[440px] mx-auto relative shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] rounded-[24px] overflow-hidden border border-[#e2e8f0]">
      
      {/* Top Header */}
      <header className="flex justify-between items-start px-[20px] pt-[32px] pb-[16px]">
        <h1 className="text-[1.5rem] font-bold leading-[1.25] text-[#0f172a] m-0 mt-[30px]">
          Welcome,<br />Greenfoods LTD!
        </h1>
        <Link to={ROUTES.MANUFACTURER_NOTIFICATIONS} className="bg-transparent border-none p-2 rounded-full cursor-pointer text-[#334155] transition-colors duration-200 absolute top-[11px] left-[380px] mt-[20px] hover:bg-[rgba(203,213,225,0.5)]" aria-label="Notifications">
          <NotificationBell count={DEFAULT_UNREAD_COUNT} iconClassName="h-6 w-6" />
        </Link>
      </header>

      <main className="px-[20px] flex flex-col gap-6">

        {/* Hero Banner Card */}
        <section className="relative flex bg-[#dce7e1] rounded-[16px] p-[20px] overflow-hidden shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
          <div className="w-[181px] flex flex-col gap-3 z-10 relative">
            <h2 className="text-[1.25rem] font-bold leading-[1.25] text-[#0f172a] m-0 pb-[20px]">
              Register Product<br />Generate QR Code
            </h2>
            <p className="text-[0.75rem] text-text-main leading-[1.5] m-0 pt-[30px]">
              Register your product by verifying your NAFDAC Reg NO. and other details to generate a unique QR code.
            </p>

            {/* Steps List */}
            <div className="flex flex-col gap-2 pt-1 text-[11px]">
              <div className="border-b border-[#cbd5e1] pb-1">
                <p className="font-semibold text-[#0f172a] m-0">Verify NAFDAC Reg. NO.</p>
                <p className="text-text-main font-normal text-[10px] m-0 leading-none">Ensure product is verified on our Platform</p>
              </div>
              <div className="border-b border-[#cbd5e1] pb-1">
                <p className="font-semibold text-[#0f172a] m-0">Enter Product Details</p>
                <p className="text-text-main font-normal text-[10px] m-0 leading-none">Add product info. date and image.</p>
              </div>
              <div className="border-b-0 pb-1">
                <p className="font-semibold text-[#0f172a] m-0">Generate QR Code</p>
                <p className="text-text-main font-normal text-[10px] m-0 leading-none">Get a unique QR code for each batch.</p>
              </div>
            </div>

            <Link to={ROUTES.PRODUCT_UPLOAD} className="mt-2 bg-[#336841] text-white text-[0.75rem] font-semibold px-4 py-2.5 rounded-[12px] border-none cursor-pointer shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-colors duration-200 w-full text-center inline-block hover:bg-[#285333]">Register Product</Link>
          </div>

          <div className="absolute flex items-end pointer-events-none opacity-90 w-[290px] h-[292px] top-[107px] right-[144px]">
  <img 
    src={phone} 
    alt="Scanning Product" 
    className="object-cover h-[99.333333%] w-full"
  />
</div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-3 gap-3">
          <div className="bg-[#d5e4dc] p-3 rounded-[16px] text-center shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
            <p className="text-[11px] font-medium text-[#475569] m-0">Total Product</p>
            <p className="text-[1.25rem] font-bold text-[#0f172a] m-0 mt-1">5</p>
          </div>
          <div className="bg-[#d5e4dc] p-3 rounded-[16px] text-center shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
            <p className="text-[11px] font-medium text-[#475569] m-0">Verified Products</p>
            <p className="text-[1.25rem] font-bold text-[#0f172a] m-0 mt-1">4</p>
          </div>
          <div className="bg-[#d5e4dc] p-3 rounded-[16px] text-center shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
            <p className="text-[11px] font-medium text-[#475569] m-0">QR Code Generated</p>
            <p className="text-[1.25rem] font-bold text-[#0f172a] m-0 mt-1">4</p>
          </div>
        </section>

        {/* Quick Access Section */}
        <section>
          <h3 className="text-base font-bold text-[#0f172a] m-0 mb-3">Quick Access</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link to={ROUTES.PRODUCT_UPLOAD} className="bg-[#336841] text-white p-[14px] rounded-[16px] flex items-center gap-3 text-left border-none cursor-pointer shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-colors duration-200 hover:bg-[#285333]">
              <div className="p-2 border border-white/30 rounded-[8px] flex items-center justify-center">
                <Scan size={20} />
              </div>
              <div>
                <p className="text-[0.75rem] font-bold leading-[1.25] m-0">Add New Product</p>
                <p className="text-[10px] text-[#ecfdf5] mt-0.5 leading-[1.25]">Verify product authenticity</p>
              </div>
            </Link>

            <Link to={ROUTES.QR_CODE} className="bg-[#336841] text-white p-[14px] rounded-[16px] flex items-center gap-3 text-left border-none cursor-pointer shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-colors duration-200 hover:bg-[#285333]">
              <div className="p-2 border border-white/30 rounded-[8px] flex items-center justify-center">
                <QrCode size={20} />
              </div>
              <div>
                <p className="text-[0.75rem] font-bold leading-[1.25] m-0">Generate QR Code</p>
                <p className="text-[10px] text-[#ecfdf5] mt-0.5 leading-[1.25]">Create a QR code for a product batch</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Recent Activities Section */}
        <section>
          <h3 className="text-base font-bold text-[#0f172a] m-0 mb-3">Recent Activities</h3>
          <div className="flex flex-col gap-3">

            {/* Item 1 */}
            <div className="bg-[#d1e2db] px-4 py-[14px] rounded-[18px] flex items-center justify-between border-none shadow-none">
              <div className="flex items-center gap-[14px]">
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  <FileText size={28} />
                </div>
                <div>
                  <p className="text-[0.875rem] font-bold text-[#1e293b] m-0 mb-0.5 leading-[1.2]">Document Verification</p>
                  <p className="text-[0.75rem] text-[#475569] m-0 leading-[1.2]">Document verified successfully</p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between gap-[10px]">
                <span className="inline-flex items-center gap-1 px-[10px] py-1 rounded-full bg-white text-[0.75rem] font-semibold text-green-600">
                  <CheckCircle2 size={12} />
                  <span>Verified</span>
                </span>
                <p className="text-[0.75rem] font-medium text-[#475569] m-0">9:30 AM</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="bg-[#d1e2db] px-4 py-[14px] rounded-[18px] flex items-center justify-between border-none shadow-none">
  <div className="flex items-center gap-[14px]">
        <img src={goldenMorn} style={{ width: 24, height: 24, }} alt="Golden Morn" />
    <div>
      <p className="text-[0.875rem] font-bold text-[#1e293b] m-0 mb-0.5 leading-[1.2]">Golden Morn</p>
      <p className="text-[0.75rem] text-[#475569] m-0 leading-[1.2]">New product added</p>
    </div>
  </div>
  <div className="flex flex-col items-end justify-between gap-[10px]">
    <p className="text-[0.75rem] font-medium text-[#475569] m-0">10:30 PM</p>
  </div>
</div>

            {/* Item 3 */}
            <div className="bg-[#d1e2db] px-4 py-[14px] rounded-[18px] flex items-center justify-between border-none shadow-none">
              <div className="flex items-center gap-[14px]">
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  <QrCode size={24} />
                </div>
                <div>
                  <p className="text-[0.875rem] font-bold text-[#1e293b] m-0 mb-0.5 leading-[1.2]">QR Code Generated</p>
                  <p className="text-[0.75rem] text-[#475569] m-0 leading-[1.2]">Product: Golden Morn</p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between gap-[10px]">
                <p className="text-[0.75rem] font-medium text-[#475569] m-0">12:01 PM</p>
              </div>
            </div>

          </div>
        </section>

      </main>

    </div>
  );
};

export default DashboardMbl;
