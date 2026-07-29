import { useMemo, useState } from "react";
import type { Product, ProductStatus } from "../../types/product.types";
import { ProductCard } from "./ProductCard";

type FilterValue = "all" | ProductStatus;

interface ProductListProps {
  products: Product[];
  onGenerateQr: (product: Product) => Promise<void> | void;
  onRemove: (product: Product) => Promise<void> | void;
  announcement?: string;
}

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "expired", label: "Expired" },
];

export function ProductList({ products, onGenerateQr, onRemove, announcement }: ProductListProps) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const filteredProducts = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.status === filter);
  }, [products, filter]);

  const activeCount = useMemo(() => products.filter((p) => p.status === "active").length, [products]);
  const expiredCount = useMemo(() => products.filter((p) => p.status === "expired").length, [products]);

  const countFor = (value: FilterValue) =>
    value === "all" ? products.length : value === "active" ? activeCount : expiredCount;

  return (
    <div className="w-full">
      {products.length > 0 && (
        <div className="flex gap-2 mb-4 overflow-x-auto" role="tablist" aria-label="Filter products by status">
          {FILTERS.map((f) => {
            const isActive = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(f.value)}
                className={[
                  "flex items-center gap-1.5 px-3.5 py-2 rounded-full border-[1.5px] text-xs font-semibold whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2F6844] focus-visible:outline-offset-2",
                  isActive
                    ? "bg-[#2F6844] border-[#2F6844] text-white"
                    : "bg-white border-gray-200 text-gray-500",
                ].join(" ")}
              >
                {f.label}
                <span className="text-[11px] font-bold opacity-80">{countFor(f.value)}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>

      {products.length === 0 ? (
        <EmptyState variant="noProducts" />
      ) : filteredProducts.length === 0 ? (
        <EmptyState variant="noMatches" />
      ) : (
        <ul className="flex flex-col gap-3.5 md:gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onGenerateQr={onGenerateQr} onRemove={onRemove} />
          ))}
        </ul>
      )}
    </div>
  );
}

function EmptyState({ variant }: { variant: "noProducts" | "noMatches" }) {
  return (
    <div className="flex flex-col items-center text-center py-14 px-5 bg-white rounded-2xl">
      <div className="mb-3.5" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="14" width="32" height="26" rx="4" stroke="#9CA3AF" strokeWidth="2.5" />
          <path d="M8 20 H40" stroke="#9CA3AF" strokeWidth="2.5" />
          <path d="M18 14 L18 10 A6 6 0 0 1 30 10 L30 14" stroke="#9CA3AF" strokeWidth="2.5" />
        </svg>
      </div>
      {variant === "noProducts" ? (
        <>
          <p className="text-sm font-bold text-gray-900 mb-1">No products yet</p>
          <p className="text-xs text-gray-500 max-w-[260px]">Add your first product to start generating QR codes.</p>
        </>
      ) : (
        <>
          <p className="text-sm font-bold text-gray-900 mb-1">No products match this filter</p>
          <p className="text-xs text-gray-500 max-w-[260px]">Try a different tab to see more products.</p>
        </>
      )}
    </div>
  );
}