import { HiOutlinePlusCircle } from "react-icons/hi";
import type React from "react";

import { HiOutlineQrCode } from "react-icons/hi2";

import phone from "../assets/phone.png";

import { FiCheckCircle } from "react-icons/fi"

import { IoQrCodeOutline } from 'react-icons/io5';

import goldenMorn from '../assets/goldenMorn.png';

import { FileText } from 'lucide-react';

import { Link } from "react-router";

import { ROUTES } from "../constants";
import type { AnalyticsSummary } from "../types";

interface DashboardMnfProps {
  summary?: AnalyticsSummary;
  isLoading?: boolean;
  error?: unknown;
}

interface ActivityItem {
  icon?: React.ReactNode;
  image?: string;
  title: string;
  subtitle: string;
  status?: string;
  time: string;
}

function formatActivityTime(value?: string) {
  if (!value) return "";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

const DashboardMnf = ({ summary, isLoading, error }: DashboardMnfProps) => {
  const status = summary?.manufacturer?.status;
  const companyName = summary?.manufacturer?.companyName ?? "Manufacturer";

  const stats = [
    {
      title: "Total Product",
      value: summary?.totalProducts ?? 0,
    },
    {
      title: "Verified Products",
      value: summary?.scansByResult.genuine ?? 0,
    },
    {
      title: "QR Code Generated",
      value: summary?.totalCodesIssued ?? 0,
    },
  ];

const activities: ActivityItem[] = [
  ...(status
    ? [
        {
          icon: <FileText size={28} />,
          title: "Document Verification",
          subtitle:
            status === "approved"
              ? "Document verified successfully"
              : status === "suspended"
                ? "Manufacturer account suspended"
                : "Submitted for admin review",
          status:
            status === "approved"
              ? "Verified"
              : status === "suspended"
                ? "Suspended"
                : "Pending",
          time: "",
        },
      ]
    : []),
  ...(summary?.recentProducts ?? []).map((product) => ({
    image: product.imageUrl || goldenMorn,
    title: product.name,
    subtitle: "New product added",
    time: formatActivityTime(product.createdAt),
  })),
  ...(summary?.recentFlags ?? []).slice(0, 3).map((flag) => ({
    icon: <IoQrCodeOutline />,
    title:
      flag.result === "fake"
        ? "Fake Scan Flagged"
        : flag.result === "suspicious"
          ? "Suspicious Scan"
          : "Product Verified",
    subtitle: `Product: ${flag.product?.name ?? flag.code}`,
    status: flag.result,
    time: formatActivityTime(flag.scannedAt),
  })),
].slice(0, 5);

  return (
      <main className="flex-1 flex flex-col bg-[#f2f7f7]">

        <header className="sticky top-0 z-30 flex h-14 items-center bg-secondary px-8">
          <h1 className="text-lg font-bold text-white">Manufacturer Dashboard</h1>
        </header>

        {(isLoading || error || status === "pending" || status === "suspended") && (
          <section className="mx-8 mt-8 rounded-lg border border-[#d9e5dc] bg-white px-5 py-4 text-sm text-[#1f3528]">
            {isLoading
              ? "Loading dashboard data..."
              : error
                ? "Unable to load live dashboard data right now."
                : status === "pending"
                  ? `${companyName} is pending admin approval. Product upload and QR generation are available after approval.`
                  : `${companyName} is suspended. Contact an admin before uploading products.`}
          </section>
        )}

        {/* ================= Hero ================= */}

        <section className="m-8 bg-[#3C744333] rounded-[12px] pt-[38px] pb-[38px] px-8 flex justify-between relative h-[429px] text-text-main">

          <div className="max-w-[55%] pl-[18px]">

            <h1 className="text-[30px] text-[#1c2e24] leading-[1.2] mb-3 font-bold">
              Register Product
              <br />
              Generate QR Code
            </h1>

            <p className="text-[13px] text-[#4b5e53] mb-5 leading-[1.4]">
              Register your product by verifying your
              NAFDAC Registration Number and generate
              a unique QR code.
            </p>

            <div className="flex flex-col gap-3 mb-6">

              <div>

                <h4 className="text-[13px] text-[#1c2e24] font-bold">Verify NAFDAC Reg. No.</h4>

                <p className="text-[12px] text-[#4b5e53] border-b border-[#bdceb5] pb-2">
                  Ensure product is verified
                  on our platform.
                </p>

              </div>

              <div>

                <h4 className="text-[13px] text-[#1c2e24] font-bold">Enter Product Details</h4>

                <p className="text-[12px] text-[#4b5e53] border-b border-[#bdceb5] pb-2">
                  Add product information
                  and image.
                </p>

              </div>

              <div>

                <h4 className="text-[13px] text-[#1c2e24] font-bold">Generate QR Code</h4>

                <p className="text-[12px] text-[#4b5e53] border-b border-[#bdceb5] pb-2">
                  Get a unique QR code
                  for each batch.
                </p>

              </div>

            </div>

            <Link to={ROUTES.PRODUCT_UPLOAD} className="bg-primary text-white border-none px-9 py-3 rounded-lg font-semibold text-sm cursor-pointer transition-colors duration-200 w-full inline-block text-center hover:bg-[#325d3e]">
              Register Product
            </Link>

          </div>

          {/* Placeholder Image */}

<div className="flex-1 flex items-end justify-end relative h-full">
      <img src={phone} alt="Phone illustration" className="absolute left-2 -bottom-[38px] h-[430px] w-auto object-contain pointer-events-none" />
    </div>

        </section>

        {/* ================= Stats ================= */}

        <section className="grid grid-cols-3 gap-5 mx-8 mb-8 px-8">

          {stats.map((item, index) => (

            <div
              key={index}
              className="bg-[#d6e5dd] px-5 py-4 rounded-[10px] text-center"
            >

              <small className="block text-[13px] text-text-main mb-[6px] font-semibold">{item.title}</small>

              <h2 className="text-[22px] text-primary font-bold">{item.value}</h2>

            </div>

          ))}

        </section>


                {/* ================= Quick Access ================= */}

        <section className="mx-8 mb-8 px-8">

          <h3 className="text-[16px] text-[#122118] mb-3 font-bold">
            Quick Access
          </h3>

          <div className="grid grid-cols-2 gap-5">

            <Link to={ROUTES.PRODUCT_UPLOAD} className="bg-primary text-white px-6 py-[18px] rounded-[10px] flex items-center gap-4 cursor-pointer transition-all duration-200 hover:bg-[#325d3e] hover:-translate-y-[2px]">

              <div className="text-[32px] flex items-center">
                {<HiOutlinePlusCircle />}
              </div>

              <div>

                <h4 className="text-[15px] mb-1 font-semibold">Add New Product</h4>

                <p className="text-[12px] opacity-90">
                  Verify your product and add it to your
                  product list.
                </p>

              </div>

            </Link>

            <Link to={ROUTES.QR_CODE} className="bg-primary text-white px-6 py-[18px] rounded-[10px] flex items-center gap-4 cursor-pointer transition-all duration-200 hover:bg-[#325d3e] hover:-translate-y-[2px]">

              <div className="text-[32px] flex items-center">
                <HiOutlineQrCode />
              </div>

              <div>

                <h4 className="text-[15px] mb-1 font-semibold">Generate QR Code</h4>

                <p className="text-[12px] opacity-90">
                  Generate a unique QR code for
                  each product batch.
                </p>

              </div>

            </Link>

          </div>

        </section>

        {/* ================= Recent Activities ================= */}

        <section className="mx-8 mb-8 bg-white rounded-[12px] pt-6 pb-6 px-8">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-[16px] text-[#122118] font-bold">Recent Activities</h3>
  </div>

  <div className="flex flex-col gap-3">
    {activities.map((activity, index) => (
      <div key={index} className="bg-[#e5ece8] rounded-lg px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          
          {/* Render image if present, otherwise render the icon */}
          <div className="w-10 h-[38px] text-[24px] text-[#2b4536] rounded-[6px] flex items-center justify-center overflow-hidden shrink-0">
            {activity.image ? (
              <img src={activity.image} alt={activity.title} className="w-full h-full object-cover rounded-[6px]" />
            ) : (
              activity.icon
            )}
          </div>

          <div>
            <h4 className="text-[13px] text-[#1a2a21] mb-[2px]">{activity.title}</h4>
            <p className="text-[11px] text-[#62776a]">{activity.subtitle}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
  {activity.status && (
    <span className="bg-white text-primary border border-primary text-[11px] font-bold px-[10px] py-[3px] rounded-[12px] inline-flex items-center gap-1 whitespace-nowrap">
      <FiCheckCircle size={12} /> {activity.status}
    </span>
  )}
  <small className="text-[10px] text-[#62776a]">{activity.time}</small>
</div>
      </div>
    ))}
    {activities.length === 0 && (
      <div className="bg-[#e5ece8] rounded-lg px-4 py-5 text-center text-sm text-[#62776a]">
        No recent activities yet.
      </div>
    )}
  </div>
</section>

      </main>
  );
};

export default DashboardMnf;
