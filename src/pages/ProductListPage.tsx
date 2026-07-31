import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { ProductList, QrPreviewModal, SelectProductsForQrModal } from "../components/ProductList";
import DashboardPageHeader from "../components/layout/DashboardPageHeader";
import { ManufacturerSidebar } from "../components/manufacturer/ManufacturerSidebar";
import { ManufacturerMobileNav } from "../components/manufacturer/ManufacturerMobileNav";
import { productService } from "../services/products";
import type { Product as ApiProduct } from "../types/product";
import type { Product as ListProduct } from "../types/product.types";
import { Spinner } from "../components/ui";
import { useMediaQuery } from "../hooks/useMediaQuery";

// Demo fallback so the manufacturer flow is testable without a backend.
const DEMO_PRODUCTS: ListProduct[] = [
  {
    id: "demo-1",
    name: "Golden Morn",
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=200&fit=crop",
    nafdacRegNo: "07-8463",
    status: "active",
    qrGenerated: true,
  },
  {
    id: "demo-2",
    name: "Farm Milk",
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=200&fit=crop",
    nafdacRegNo: "04-6231",
    status: "active",
    qrGenerated: false,
  },
  {
    id: "demo-3",
    name: "Tomato Sauce",
    imageUrl: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=200&h=200&fit=crop",
    nafdacRegNo: "09-1120",
    status: "active",
    qrGenerated: false,
  },
];

const IS_DEMO_MODE = !import.meta.env.VITE_API_BASE_URL;

function toListProduct(p: ApiProduct): ListProduct {
  return {
    id: p._id ?? p.id ?? "",
    name: p.name,
    imageUrl: p.imageUrl ?? "",
    nafdacRegNo: "N/A",
    status: "active",
    qrGenerated: p.qrGenerated ?? false,
  };
}

interface ProductListPageProps {
  /** consumer = renders inside the consumer DashboardLayout; manufacturer = renders its own manufacturer sidebar/nav */
  variant?: "consumer" | "manufacturer";
}

export default function ProductListPage({ variant = "consumer" }: ProductListPageProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());
  const [qrProduct, setQrProduct] = useState<ListProduct | null>(null);
  const [qrSelectProducts, setQrSelectProducts] = useState<ListProduct[]>([]);
  const [generatedIds, setGeneratedIds] = useState<Set<string>>(new Set());
  const [announcement, setAnnouncement] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => productService.getAll(),
    staleTime: 60_000,
    retry: 1,
  });

  const isUsingDemo = IS_DEMO_MODE || !!error;

  const sourceProducts = isUsingDemo
    ? DEMO_PRODUCTS
    : data
      ? data.products.map(toListProduct)
      : [];
  const products = sourceProducts
    .filter((p) => !removedIds.has(p.id))
    .map((p) => (generatedIds.has(p.id) ? { ...p, qrGenerated: true } : p));

  const pendingQrProducts = products.filter((p) => !p.qrGenerated);

  const handleGenerateQr = async (product: ListProduct) => {
    await new Promise((r) => setTimeout(r, 700));
    if (product.qrGenerated) {
      setQrProduct(product);
      return;
    }
    // Product exists but no QR code yet -> show the select-all popup
    // where the product card/image would be.
    setQrSelectProducts(pendingQrProducts.length > 0 ? pendingQrProducts : [product]);
  };

  const handleGenerateSelected = async (selected: ListProduct[]) => {
    setGeneratedIds((prev) => {
      const next = new Set(prev);
      selected.forEach((p) => next.add(p.id));
      return next;
    });
    setAnnouncement(
      `QR code generated for ${selected.length} product${selected.length === 1 ? "" : "s"}`,
    );
    setQrSelectProducts([]);
    if (selected.length === 1) {
      setQrProduct(selected[0]);
    }
  };

  const handleRemove = async (product: ListProduct) => {
    await new Promise((r) => setTimeout(r, 500));
    setRemovedIds((prev) => new Set(prev).add(product.id));
    setAnnouncement(`${product.name} removed`);
  };

  const listContent = (
    <div className="px-4 pb-8 md:px-8 md:py-6 max-w-[1000px] mx-auto">
      {isUsingDemo && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-800">
          Showing demo products (no backend connected). Some products have no QR code generated yet —
          tap "Generate QR Code" on one to see the select-all popup.
        </div>
      )}
      <ProductList
        products={products}
        onGenerateQr={handleGenerateQr}
        onRemove={handleRemove}
        announcement={announcement}
      />
    </div>
  );

  const modals = (
    <>
      {qrSelectProducts.length > 0 && (
        <SelectProductsForQrModal
          products={qrSelectProducts}
          onClose={() => setQrSelectProducts([])}
          onGenerate={handleGenerateSelected}
        />
      )}
      {qrProduct && <QrPreviewModal product={qrProduct} onClose={() => setQrProduct(null)} />}
    </>
  );

  if (variant === "manufacturer") {
    if (!isDesktop) {
      return (
        <div className="flex min-h-screen flex-col bg-background">
          <header className="sticky top-0 z-40 flex h-12 items-center bg-primary px-4">
            <button onClick={() => navigate(-1)} className="text-white" aria-label="Go back">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="ml-4 flex-1 text-center text-sm font-bold text-white">Product List</h1>
          </header>

          {isLoading && !error ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : (
            listContent
          )}
          {modals}
          <ManufacturerMobileNav />
        </div>
      );
    }

    return (
      <div className="flex min-h-screen bg-background">
        <ManufacturerSidebar />
        <div className="ml-60 flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center bg-secondary px-8">
            <h1 className="text-lg font-bold text-white">Product List</h1>
          </header>

          {isLoading && !error ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : (
            listContent
          )}
        </div>
        {modals}
      </div>
    );
  }

  return (
    <div>
      <DashboardPageHeader title="Product List (Consumer)" />
      {isLoading && !error ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
        listContent
      )}
      {modals}
    </div>
  );
}
