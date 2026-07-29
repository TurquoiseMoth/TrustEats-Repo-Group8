import { useEffect, useRef } from "react";
import type { Product } from "../../types/product.types";

interface QrPreviewModalProps {
  product: Product;
  onClose: () => void;
}

export function QrPreviewModal({ product, onClose }: QrPreviewModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center p-5 z-50" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="qr-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[340px] bg-white rounded-[20px] px-6 pt-7 pb-6 text-center"
      >
        <button
          type="button"
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-gray-100 text-gray-700 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2F6844]"
        >
          ✕
        </button>

        <h2 id="qr-modal-title" className="text-lg font-bold text-gray-900 mb-1">
          QR Code Ready
        </h2>
        <p className="text-xs text-gray-500 mb-5">{product.name}</p>

        <div className="flex justify-center p-4 bg-gray-50 rounded-xl mb-4" aria-label="QR code preview placeholder">
          <PlaceholderQrGraphic />
        </div>

        <p className="text-xs text-gray-500 mb-5">NAFDAC Reg. NO. {product.nafdacRegNo}</p>

        <div className="flex gap-2.5">
          <button
            type="button"
            className="flex-1 px-4 py-2.5 rounded-lg border-[1.5px] border-[#2F6844] bg-white text-[#2F6844] text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2F6844] focus-visible:outline-offset-2"
          >
            Download
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg bg-[#2F6844] text-white text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2F6844] focus-visible:outline-offset-2"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

function PlaceholderQrGraphic() {
  const cells = Array.from({ length: 100 }, (_, i) => (i * 37) % 5 === 0);
  return (
    <svg width="160" height="160" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="#ffffff" />
      {cells.map((filled, i) => {
        const x = (i % 10) * 10;
        const y = Math.floor(i / 10) * 10;
        return filled ? <rect key={i} x={x} y={y} width="10" height="10" fill="#1a1a1a" /> : null;
      })}
      <rect x="0" y="0" width="20" height="20" fill="none" stroke="#1a1a1a" strokeWidth="3" />
      <rect x="80" y="0" width="20" height="20" fill="none" stroke="#1a1a1a" strokeWidth="3" />
      <rect x="0" y="80" width="20" height="20" fill="none" stroke="#1a1a1a" strokeWidth="3" />
    </svg>
  );
}