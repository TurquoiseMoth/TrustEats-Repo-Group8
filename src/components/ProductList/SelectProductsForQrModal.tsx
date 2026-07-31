import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "../../types/product.types";

interface SelectProductsForQrModalProps {
  /** Products that do NOT have a QR code generated yet. */
  products: Product[];
  onClose: () => void;
  onGenerate: (selected: Product[]) => void;
}

export function SelectProductsForQrModal({
  products,
  onClose,
  onGenerate,
}: SelectProductsForQrModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set(products.map((p) => p.id)));

  const selectedProducts = useMemo(
    () => products.filter((p) => selectedIds.has(p.id)),
    [products, selectedIds],
  );

  const allSelected = products.length > 0 && selectedProducts.length === products.length;

  useEffect(() => {
    closeBtnRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const toggleProduct = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    setSelectedIds(allSelected ? new Set() : new Set(products.map((p) => p.id)));
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center p-5 z-50" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="select-qr-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[420px] bg-white rounded-[20px] px-6 pt-7 pb-6"
      >
        <button
          type="button"
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-gray-100 text-gray-700 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          ✕
        </button>

        <h2 id="select-qr-modal-title" className="text-lg font-bold text-gray-900 mb-1">
          Generate QR Codes
        </h2>
        <p className="text-xs text-gray-500 mb-5">
          {products.length} product{products.length === 1 ? "" : "s"} awaiting a QR code. Select all or pick individual products.
        </p>

        <div className="max-h-[260px] overflow-y-auto mb-4">
          <label className="flex items-center gap-2.5 px-1 py-2 mb-1 cursor-pointer">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleAll}
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-semibold text-gray-800">Select all</span>
            <span className="ml-auto text-xs text-gray-400">{selectedProducts.length}/{products.length} selected</span>
          </label>

          <ul className="flex flex-col gap-1.5">
            {products.map((product) => {
              const checked = selectedIds.has(product.id);
              return (
                <li key={product.id}>
                  <label className="flex items-center gap-3 px-2 py-2 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleProduct(product.id)}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt=""
                        aria-hidden="true"
                        className="w-9 h-9 rounded-md object-cover bg-gray-100 shrink-0"
                      />
                    ) : (
                      <span className="w-9 h-9 rounded-md bg-gray-100 shrink-0" />
                    )}
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-semibold text-gray-900 truncate">{product.name}</span>
                      <span className="block text-[11px] text-gray-400">NAFDAC Reg. NO. {product.nafdacRegNo}</span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border-[1.5px] border-gray-300 bg-white text-sm font-semibold text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={selectedProducts.length === 0}
            onClick={() => onGenerate(selectedProducts)}
            className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            Generate ({selectedProducts.length})
          </button>
        </div>
      </div>
    </div>
  );
}
