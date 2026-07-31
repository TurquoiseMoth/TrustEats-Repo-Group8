import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  Download,
  Share2,
  Printer,
} from "lucide-react";
import { ROUTES } from "../constants";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Card } from "../components/ui/Card";
import { ManufacturerSidebar } from "../components/manufacturer/ManufacturerSidebar";
import { ManufacturerMobileNav } from "../components/manufacturer/ManufacturerMobileNav";

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
      <div className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-primary rounded-tl" />
      <div className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-primary rounded-tr" />
      <div className="absolute bottom-0 left-0 h-6 w-6 border-l-2 border-b-2 border-primary rounded-bl" />
      <div className="absolute bottom-0 right-0 h-6 w-6 border-r-2 border-b-2 border-primary rounded-br" />
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
          className={`flex items-center justify-between px-5 py-3.5 ${i % 2 === 1 ? "bg-background" : "bg-white"}`}
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
        <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary/90">
          <Download className="h-4 w-4" />
          Download
        </button>
        <button className="flex h-12 items-center justify-center gap-2 rounded-xl border border-primary text-sm font-semibold text-primary transition-colors hover:bg-primary/5">
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div>
      <button className="flex h-12 items-center justify-center gap-2 rounded-xl border border-primary text-sm font-semibold text-primary transition-colors hover:bg-primary/5">
        <Printer className="h-4 w-4" />
        Print
      </button>
      <Link
        to={ROUTES.MANUFACTURER_PRODUCTS}
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
          className="flex-shrink-0 rounded-lg border border-primary px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/5"
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
          className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
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
          className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
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
          className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
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
          className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <button
        type="submit"
        className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary/90"
      >
        Generate QR Code
      </button>
    </form>
  );

  if (!isDesktop) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <header className="sticky top-0 z-40 flex h-12 items-center bg-primary px-4">
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

        <ManufacturerMobileNav />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <ManufacturerSidebar />

      <div className="ml-60 flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center bg-secondary px-8">
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
