import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { ProductList } from "../components/ProductList";
import DashboardPageHeader from "../components/layout/DashboardPageHeader";
import { ManufacturerSidebar } from "../components/manufacturer/ManufacturerSidebar";
import { ManufacturerMobileNav } from "../components/manufacturer/ManufacturerMobileNav";
import { productService } from "../services/products";
import type { Product as ApiProduct } from "../types/product";
import type { Product as ListProduct } from "../types/product.types";
import { Spinner } from "../components/ui";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { ROUTES } from "../constants";

function toListProduct(p: ApiProduct): ListProduct {
  return {
    id: p._id ?? p.id ?? "",
    name: p.name,
    imageUrl: p.imageUrl ?? "",
    nafdacRegNo: p.nafdacNumber ?? "N/A",
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
  const [announcement, setAnnouncement] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => productService.getAll(),
    staleTime: 60_000,
    retry: 1,
  });

  const sourceProducts = data ? data.products.map(toListProduct) : [];
  const products = sourceProducts.filter((p) => !removedIds.has(p.id));

  const handleGenerateQr = async (product: ListProduct) => {
    navigate(`${ROUTES.QR_CODE}?productId=${encodeURIComponent(product.id)}`);
  };

  const handleRemove = async (product: ListProduct) => {
    await new Promise((r) => setTimeout(r, 500));
    setRemovedIds((prev) => new Set(prev).add(product.id));
    setAnnouncement(`${product.name} removed`);
  };

  const listContent = (
    <div className="px-4 pb-8 md:px-8 md:py-6 max-w-[1000px] mx-auto">
      {error && (
        <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          Products are unavailable until your manufacturer account is approved.
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
    </div>
  );
}
