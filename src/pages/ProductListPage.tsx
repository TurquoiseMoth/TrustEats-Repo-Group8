import { useState } from "react";
import { ProductList, QrPreviewModal } from "../components/ProductList";
import DashboardPageHeader from "../components/layout/DashboardPageHeader";
import type { Product } from "../types/product.types";

const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "Golden Morn", imageUrl: "https://placehold.co/96x96/f4c542/ffffff?text=GM", nafdacRegNo: "07-8463", status: "active" },
  { id: "2", name: "PureTeaste Tomatoes sauce", imageUrl: "https://placehold.co/96x96/a83232/ffffff?text=TS", nafdacRegNo: "07-8463", status: "active" },
  { id: "3", name: "Gino Pepper & Onion Paste", imageUrl: "https://placehold.co/96x96/c0392b/ffffff?text=GP", nafdacRegNo: "07-8463", status: "active" },
  { id: "4", name: "Golden Morn Cleaner", imageUrl: "https://placehold.co/96x96/6ba3c9/ffffff?text=GM", nafdacRegNo: "07-8463", status: "expired" },
  { id: "5", name: "Golden Morn", imageUrl: "https://placehold.co/96x96/f4c542/ffffff?text=GM", nafdacRegNo: "07-8463", status: "expired" },
];

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [qrProduct, setQrProduct] = useState<Product | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const handleGenerateQr = async (product: Product) => {
    await new Promise((r) => setTimeout(r, 700));
    setQrProduct(product);
    setAnnouncement(`QR code generated for ${product.name}`);
  };

  const handleRemove = async (product: Product) => {
    await new Promise((r) => setTimeout(r, 500));
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
    setAnnouncement(`${product.name} removed`);
  };

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