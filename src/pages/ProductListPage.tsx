import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductList, QrPreviewModal } from "../components/ProductList";
import DashboardPageHeader from "../components/layout/DashboardPageHeader";
import { productService } from "../services/products";
import type { Product as ApiProduct } from "../types/product";
import type { Product as ListProduct } from "../types/product.types";
import { Spinner } from "../components/ui";

function toListProduct(p: ApiProduct): ListProduct {
  return {
    id: p._id ?? p.id ?? "",
    name: p.name,
    imageUrl: p.imageUrl ?? "",
    nafdacRegNo: "N/A",
    status: "active",
  };
}

export default function ProductListPage() {
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());
  const [qrProduct, setQrProduct] = useState<ListProduct | null>(null);
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
    await new Promise((r) => setTimeout(r, 700));
    setQrProduct(product);
    setAnnouncement(`QR code generated for ${product.name}`);
  };

  const handleRemove = async (product: ListProduct) => {
    await new Promise((r) => setTimeout(r, 500));
    setRemovedIds((prev) => new Set(prev).add(product.id));
    setAnnouncement(`${product.name} removed`);
  };

  if (error) {
    return (
      <div>
        <DashboardPageHeader title="Product List" />
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-red-500 text-sm mb-4">Failed to load products.</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-primary text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <DashboardPageHeader title="Product List" />
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <DashboardPageHeader title="Product List" />
      <div className="px-4 pb-8 md:px-8 md:py-6 max-w-[1000px] mx-auto">
        <ProductList
          products={products}
          onGenerateQr={handleGenerateQr}
          onRemove={handleRemove}
          announcement={announcement}
        />
      </div>
      {qrProduct && <QrPreviewModal product={qrProduct} onClose={() => setQrProduct(null)} />}
    </div>
  );
}
