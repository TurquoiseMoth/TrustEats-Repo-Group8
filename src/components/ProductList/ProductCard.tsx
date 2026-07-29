import { useState } from "react";
import type { Product } from "../../types/product.types";

interface ProductCardProps {
  product: Product;
  onGenerateQr: (product: Product) => Promise<void> | void;
  onRemove: (product: Product) => Promise<void> | void;
}

export function ProductCard({ product, onGenerateQr, onRemove }: ProductCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [confirmingRemove, setConfirmingRemove] = useState(false);

  const isExpired = product.status === "expired";

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await onGenerateQr(product);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleConfirmRemove = async () => {
    setIsRemoving(true);
    try {
      await onRemove(product);
    } finally {
      setIsRemoving(false);
      setConfirmingRemove(false);
    }
  };

  return (
    <li className="list-none bg-white rounded-2xl p-4 md:p-6 shadow-sm">
      <div className="flex items-start md:items-center gap-3 mb-4">
        <img src={product.imageUrl} alt="" aria-hidden="true" className="w-12 h-12 rounded-lg object-cover bg-gray-100 shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-900 break-words">{product.name}</h3>
          <p className="text-xs text-gray-500">NAFDAC Reg. NO. {product.nafdacRegNo}</p>
        </div>
        <span
          className={[
            "inline-flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap",
            isExpired ? "bg-red-50 text-red-700" : "bg-green-50 text-[#2F6844]",
          ].join(" ")}
        >
          <span
            className={["w-1.5 h-1.5 rounded-full", isExpired ? "bg-red-600" : "bg-[#2F6844]"].join(" ")}
            aria-hidden="true"
          />
          {isExpired ? "Expired" : "Active"}
        </span>
      </div>

      {confirmingRemove ? (
        <div
          role="alertdialog"
          aria-label={`Remove ${product.name}?`}
          className="flex items-center justify-between gap-3 px-3.5 py-2.5 bg-red-50 rounded-lg flex-wrap"
        >
          <span className="text-sm font-semibold text-red-800">Remove {product.name}?</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setConfirmingRemove(false)}
              disabled={isRemoving}
              className="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-semibold text-gray-700 disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2F6844]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmRemove}
              disabled={isRemoving}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-red-600 text-sm font-semibold text-white disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2F6844]"
            >
              {isRemoving && <Spinner />}
              {isRemoving ? "Removing…" : "Yes, remove"}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            aria-label={`Generate QR code for ${product.name}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#2F6844] text-white text-sm font-semibold hover:bg-[#265436] disabled:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2F6844] focus-visible:outline-offset-2"
          >
            {isGenerating && <Spinner />}
            {isGenerating ? "Generating…" : "Generate QR Code"}
          </button>
          <button
            type="button"
            onClick={() => setConfirmingRemove(true)}
            aria-label={`Remove ${product.name}`}
            className="flex-1 px-4 py-2.5 rounded-lg border-[1.5px] border-red-600 bg-white text-red-600 text-sm font-semibold hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2F6844] focus-visible:outline-offset-2"
          >
            Remove
          </button>
        </div>
      )}
    </li>
  );
}

function Spinner() {
  return (
    <span
      className="w-3.5 h-3.5 rounded-full border-2 border-white/50 border-t-white animate-spin shrink-0"
      aria-hidden="true"
    />
  );
}