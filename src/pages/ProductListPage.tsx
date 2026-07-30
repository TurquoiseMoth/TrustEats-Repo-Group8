import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductList, QrPreviewModal } from "../components/ProductList";
import DashboardPageHeader from "../components/layout/DashboardPageHeader";
import { productService } from "../services/products";
import type { Product as ApiProduct } from "../types/product";
import type { Product as ListProduct } from "../types/product.types";
import { Spinner } from "../components/ui";

const MOCK_PRODUCTS: ListProduct[] = [
  { id: "1", name: "Golden Morn", imageUrl: "https://placehold.co/96x96/f4c542/ffffff?text=GM", nafdacRegNo: "07-8463", status: "active" },
  { id: "2", name: "PureTeaste Tomatoes sauce", imageUrl: "https://placehold.co/96x96/a83232/ffffff?text=TS", nafdacRegNo: "07-8463", status: "active" },
  { id: "3", name: "Gino Pepper & Onion Paste", imageUrl: "https://placehold.co/96x96/c0392b/ffffff?text=GP", nafdacRegNo: "07-8463", status: "active" },
  { id: "4", name: "Golden Morn Cleaner", imageUrl: "https://placehold.co/96x96/6ba3c9/ffffff?text=GM", nafdacRegNo: "07-8463", status: "expired" },
  { id: "5", name: "Golden Morn", imageUrl: "https://placehold.co/96x96/f4c542/ffffff?text=GM", nafdacRegNo: "07-8463", status: "expired" },
];

function toListProduct(p: ApiProduct): ListProduct {
  return {
    id: p.id,
    name: p.name,
    imageUrl: p.imageUrl ?? "",
    nafdacRegNo: p.batchNumber ?? "N/A",
    status: "active",
  };
}

export default function ProductListPage() {
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());
  const [qrProduct, setQrProduct] = useState<ListProduct | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => productService.getAll(),
    staleTime: 60_000,
    retry: 1,
  });

  const sourceProducts = data ? data.map(toListProduct) : MOCK_PRODUCTS;
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

  if (isLoading && !data) {
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
