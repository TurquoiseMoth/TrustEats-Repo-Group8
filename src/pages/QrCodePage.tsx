import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  LayoutDashboard,
  QrCode,
  PackagePlus,
  Package,
  Bell,
  Settings,
  Home,
  ShieldCheck,
  Download,
  Share2,
  Printer,
} from "lucide-react";
import { ROUTES } from "../constants";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Card } from "../components/ui/Card";

const sidebarLinks = [
  { label: "Dashboard", href: ROUTES.MANUFACTURER_DASHBOARD, icon: LayoutDashboard },
  { label: "QR Code", href: ROUTES.QR_CODE, icon: QrCode, active: true },
  { label: "Add Product", href: ROUTES.PRODUCT_UPLOAD, icon: PackagePlus },
  { label: "Product List", href: ROUTES.PRODUCT_LIST, icon: Package },
  { label: "Notification", href: ROUTES.NOTIFICATIONS, icon: Bell },
];

const mobileTabs = [
  { label: "Home", href: ROUTES.HOME, icon: Home },
  { label: "QR Code", href: ROUTES.QR_CODE, icon: QrCode, active: true },
  { label: "Product", href: ROUTES.PRODUCT_UPLOAD, icon: Package },
  { label: "Profile", href: ROUTES.PROFILE, icon: Settings },
];

interface ProductData {
  name: string;
  imageUrl: string;
  nafdacNo: string;
  batchNumber: string;
  manufacturingDate: string;
  expiryDate: string;
}

const product = {
  name: "Golden Morn",
  imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=200&fit=crop",
  nafdacNo: "07-8463",
};

function CornerBrackets() {
  return (
    <>
      <div className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-[#3F7A46] rounded-tl" />
      <div className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-[#3F7A46] rounded-tr" />
      <div className="absolute bottom-0 left-0 h-6 w-6 border-l-2 border-b-2 border-[#3F7A46] rounded-bl" />
      <div className="absolute bottom-0 right-0 h-6 w-6 border-r-2 border-b-2 border-[#3F7A46] rounded-br" />
    </>
  );
}

function QrHero() {
  return (
    <div className="flex flex-col items-center gap-5">
      <h2 className="text-xl font-bold text-gray-900">QR Code Generated</h2>
      <div className="relative flex items-center justify-center p-4">
        <CornerBrackets />
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=TRUSTEATS-07-8463-QM001240001"
          alt="Generated QR Code"
          className="h-44 w-44"
        />
      </div>
    </div>
  );
}

function ProductDetailsCard({ product }: { product: ProductData }) {
  const rows = [
    { label: "Product Name", value: product.name },
    { label: "NAFDAC Reg. NO.", value: product.nafdacNo },
    { label: "Batch NO.", value: product.batchNumber },
    { label: "Manufacturing Date", value: product.manufacturingDate },
    { label: "Expiry Date", value: product.expiryDate },
  ];

  return (
    <Card className="overflow-hidden p-0">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`flex items-center justify-between px-5 py-3.5 ${i % 2 === 1 ? "bg-[#F4F7F9]" : "bg-white"}`}
        >
          <span className="text-sm text-gray-400">{row.label}</span>
          <span className="text-sm font-bold text-gray-900">{row.value}</span>
        </div>
      ))}
    </Card>
  );
}

function ActionGroup() {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-4">
        <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#3F7A46] text-sm font-semibold text-white transition-colors hover:bg-[#2E6B3E]">
          <Download className="h-4 w-4" />
          Download
        </button>
        <button className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#3F7A46] text-sm font-semibold text-[#3F7A46] transition-colors hover:bg-[#F0FDF4]">
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div>
      <button className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#3F7A46] text-sm font-semibold text-[#3F7A46] transition-colors hover:bg-[#F0FDF4]">
        <Printer className="h-4 w-4" />
        Print
      </button>
      <Link
        to={ROUTES.PRODUCT_LIST}
        className="mt-2 text-center text-sm font-medium text-gray-400 transition-colors hover:text-gray-600"
      >
        {"<-"} Back to Product List
      </Link>
    </div>
  );
}

function QrSuccessSummary({ product }: { product: ProductData }) {
  return (
    <div className="flex flex-col gap-6">
      <QrHero />
      <ProductDetailsCard product={product} />
      <ActionGroup />
    </div>
  );
}

function QrCodePage() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [batchNumber, setBatchNumber] = useState("");
  const [quantity, setQuantity] = useState("");
  const [manufacturingDate, setManufacturingDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchNumber || !manufacturingDate || !expiryDate) return;
    setSubmitSuccess(true);
  };

  const submittedProduct: ProductData = {
    name: product.name,
    imageUrl: product.imageUrl,
    nafdacNo: product.nafdacNo,
    batchNumber,
    manufacturingDate,
    expiryDate,
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Card className="flex items-center gap-4 p-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-16 w-16 flex-shrink-0 rounded-xl object-cover"
        />
        <div className="flex flex-1 flex-col gap-0.5">
          <span className="text-sm font-bold text-gray-900">{product.name}</span>
          <span className="text-xs text-gray-400">NAFDAC Reg. NO. {product.nafdacNo}</span>
        </div>
        <button
          type="button"
          className="flex-shrink-0 rounded-lg border border-[#3F7A46] px-4 py-2 text-xs font-semibold text-[#3F7A46] transition-colors hover:bg-[#F0FDF4]"
        >
          Change Product
        </button>
      </Card>

      <div className="flex flex-col gap-2">
        <label htmlFor="batch-number" className="text-sm font-semibold text-gray-800">
          Batch Number
        </label>
        <input
          id="batch-number"
          type="text"
          placeholder="XXXXXXXXXXXX"
          value={batchNumber}
          onChange={(e) => setBatchNumber(e.target.value)}
          className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-[#3F7A46] focus:ring-1 focus:ring-[#3F7A46]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="quantity" className="text-sm font-semibold text-gray-800">
          Quantity
        </label>
        <input
          id="quantity"
          type="text"
          placeholder="eg. 1000"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-[#3F7A46] focus:ring-1 focus:ring-[#3F7A46]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="mfg-date" className="text-sm font-semibold text-gray-800">
          Manufacturing Date
        </label>
        <input
          id="mfg-date"
          type="text"
          placeholder="DD/MM/YY"
          value={manufacturingDate}
          onChange={(e) => setManufacturingDate(e.target.value)}
          className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-[#3F7A46] focus:ring-1 focus:ring-[#3F7A46]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="exp-date" className="text-sm font-semibold text-gray-800">
          Expiry Date
        </label>
        <input
          id="exp-date"
          type="text"
          placeholder="DD/MM/YY"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-[#3F7A46] focus:ring-1 focus:ring-[#3F7A46]"
        />
      </div>

      <button
        type="submit"
        className="flex h-12 w-full items-center justify-center rounded-xl bg-[#3F7A46] text-sm font-semibold text-white transition-colors hover:bg-[#2E6B3E]"
      >
        Generate QR Code
      </button>
    </form>
  );

  if (!isDesktop) {
    return (
      <div className="flex min-h-screen flex-col bg-[#EEF2F5]">
        <header className="sticky top-0 z-40 flex h-12 items-center bg-[#3F7A46] px-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="ml-4 flex-1 text-center text-sm font-bold text-white">
            {submitSuccess ? "QR Code Generated" : "Generate QR Code"}
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6 pb-20">
          {submitSuccess ? <QrSuccessSummary product={submittedProduct} /> : formContent}
        </main>

        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white md:hidden">
          <div className="flex h-14 items-center justify-around">
            {mobileTabs.map(({ label, href, icon: Icon, active }) => (
              <Link
                key={label}
                to={href}
                className="flex w-full flex-col items-center justify-center gap-0.5"
              >
                <Icon
                  size={20}
                  strokeWidth={active ? 2.5 : 1.8}
                  className={active ? "text-[#3F7A46]" : "text-gray-400"}
                />
                <span
                  className={`text-xs font-medium ${
                    active ? "text-[#3F7A46]" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#EEF2F5]">
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-gray-200 bg-white">
        <div className="flex items-center gap-2 px-5 py-5">
          <ShieldCheck className="h-7 w-7 text-[#3F7A46]" />
          <span className="text-lg font-bold text-[#3F7A46]">TrustEats</span>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {sidebarLinks.map(({ label, href, icon: Icon, active }) => (
            <Link
              key={label}
              to={href}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-[#3F7A46] text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-3 pb-5">
          <Link
            to={ROUTES.SETTINGS}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </aside>

      <div className="ml-60 flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center bg-[#689F78] px-8">
          <h1 className="text-lg font-bold text-white">
            {submitSuccess ? "QR Code Generated" : "Generate QR Code"}
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto px-8 py-8">
          <div className="mx-auto max-w-2xl">
            {submitSuccess ? <QrSuccessSummary product={submittedProduct} /> : formContent}
          </div>
        </main>
      </div>
    </div>
  );
}

export default QrCodePage;
