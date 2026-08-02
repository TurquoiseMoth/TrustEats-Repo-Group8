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
    <li className="flex min-w-0 flex-col gap-5 rounded-2xl bg-white p-5 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] lg:flex-row lg:items-center lg:justify-between lg:p-6">
      <div className="flex min-w-0 flex-1 items-start gap-4 lg:items-center">
        <img src={product.imageUrl} alt="" aria-hidden="true" className="h-16 w-16 shrink-0 rounded-xl bg-gray-100 object-cover lg:h-20 lg:w-20" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold text-gray-900">{product.name}</h3>
          <p className="mt-1 truncate text-sm text-gray-500">NAFDAC Reg. NO. {product.nafdacRegNo}</p>
        </div>
        <span
          className={[
            "inline-flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap",
            isExpired ? "bg-red-50 text-red-700" : "bg-green-50 text-primary",
          ].join(" ")}
        >
          <span
            className={["w-1.5 h-1.5 rounded-full", isExpired ? "bg-red-600" : "bg-primary"].join(" ")}
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
              className="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-semibold text-gray-700 disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmRemove}
              disabled={isRemoving}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-red-600 text-sm font-semibold text-white disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              {isRemoving && <Spinner />}
              {isRemoving ? "Removing…" : "Yes, remove"}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 lg:w-[420px] lg:shrink-0">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            aria-label={`Generate QR code for ${product.name}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 disabled:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            {isGenerating && <Spinner />}
            {isGenerating ? "Generating…" : "Generate QR Code"}
          </button>
          <button
            type="button"
            onClick={() => setConfirmingRemove(true)}
            aria-label={`Remove ${product.name}`}
            className="flex-1 px-4 py-2.5 rounded-lg border-[1.5px] border-red-600 bg-white text-red-600 text-sm font-semibold hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
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
