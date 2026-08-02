import { useState, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  ImageIcon,
  X,
  CheckCircle2,
  PartyPopper,
} from "lucide-react";
import { ROUTES } from "../constants";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { ManufacturerSidebar } from "../components/manufacturer/ManufacturerSidebar";
import { ManufacturerMobileNav } from "../components/manufacturer/ManufacturerMobileNav";
import { Spinner } from "../components/ui";

function ProductUploadPage() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [nafdacNo, setNafdacNo] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isNafdacValid = /^\d{2}-\d{4,}$/.test(nafdacNo);

  const isValid =
    productName.trim().length > 0 &&
    isNafdacValid &&
    files.length > 0;

  const previewUrls = useMemo(
    () => files.map((f) => URL.createObjectURL(f)),
    [files],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = Array.from(e.dataTransfer.files).filter(
      (f) => ["image/jpeg", "image/png"].includes(f.type) && f.size <= 5 * 1024 * 1024,
    );
    setFiles((prev) => [...prev, ...dropped]);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files).filter(
      (f) => ["image/jpeg", "image/png"].includes(f.type) && f.size <= 5 * 1024 * 1024,
    );
    setFiles((prev) => [...prev, ...selected]);
    e.target.value = "";
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const formatNafdac = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  };

  const handleNafdacChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNafdacNo(formatNafdac(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    // Build FormData for upload
    const form = new FormData();
    form.append("name", productName);
    form.append("brand", productName);
    form.append(
      "description",
      `Product submitted with NAFDAC registration number ${nafdacNo}.`,
    );
    form.append("category", "food");
    form.append("countryOfOrigin", "Nigeria");
    form.append("nafdacNumber", nafdacNo);
    // backend expects field name "image" for single product image
    if (files.length > 0) form.append("image", files[0], files[0].name);

    try {
      setIsSubmitting(true);
      // Use productService.create to send FormData
      const { productService } = await import("../services/products");
      await productService.create(form);
      // Show success toast
      window.dispatchEvent(new CustomEvent("trusteats:notify", { detail: { type: "success", message: "Product uploaded successfully" } }));
      setSubmitSuccess(true);
    } catch (err: unknown) {
      console.error("product upload failed", err);
      // show a toast via the global event so user sees the error
      const message = err instanceof Error ? err.message : "Upload failed";
      window.dispatchEvent(new CustomEvent("trusteats:notify", { detail: { type: "error", message } }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadingOverlay = isSubmitting ? (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/35 px-4 backdrop-blur-[1px]">
      <div className="flex w-full max-w-[300px] flex-col items-center rounded-2xl bg-white px-8 py-9 text-center shadow-2xl">
        <Spinner size="lg" />
        <p className="mt-5 text-base font-bold text-gray-900">Uploading product</p>
        <p className="mt-1 text-sm text-gray-500">Please wait...</p>
      </div>
    </div>
  ) : null;

  /* ── Success View ──────────────────────────────── */
  const successContent = (
    <div className="flex flex-col items-center text-center">
      {/* Confetti + Checkmark Badge */}
      <div className="relative mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-12 w-12 text-primary" />
        </div>
        <PartyPopper className="absolute -top-2 -right-2 h-8 w-8 text-warning" />
      </div>

      {/* Headline */}
      <h2 className="text-xl font-bold text-gray-900">
        Product Uploaded Successfully!
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        Your product has been verified against NAFDAC registration{" "}
        <span className="font-semibold text-primary">{nafdacNo}</span>.
      </p>

      {/* Product Summary Card */}
      <div className="mt-8 w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
        <div className="flex items-start gap-4">
          {previewUrls[0] && (
            <img
              src={previewUrls[0]}
              alt={productName}
              className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
            />
          )}
          <div className="flex flex-1 flex-col gap-1.5">
            <h3 className="text-sm font-bold text-gray-900">{productName}</h3>
            <p className="text-xs text-gray-500">
              NAFDAC: <span className="font-medium text-gray-700">{nafdacNo}</span>
            </p>
            <span className="mt-1 inline-flex w-fit items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              Uploaded
            </span>
          </div>
        </div>
      </div>

      {/* Microcopy */}
      <p className="mt-6 text-sm text-gray-500">
        You can now generate QR code for this product.
      </p>

      {/* Action Buttons */}
      <div className="mt-6 flex w-full max-w-sm flex-col gap-3">
        <Link
          to={ROUTES.QR_CODE}
          className="flex h-12 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          Generate QR Code
        </Link>
        <Link
          to={ROUTES.MANUFACTURER_PRODUCTS}
          className="flex h-12 items-center justify-center rounded-xl border-2 border-primary text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
        >
          View Product List
        </Link>
      </div>
    </div>
  );

  /* ── Form View ──────────────────────────────────── */
  const formContent = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Instructional Banner */}
      <div className="rounded-xl bg-primary px-5 py-4">
        <p className="text-sm leading-relaxed text-white">
          To upload your product, enter the NAFDAC Registration Number and upload
          a clear image of your product or its packaging.
        </p>
      </div>

      {/* Product Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="product-name" className="text-sm font-semibold text-gray-800">
          Product Name
        </label>
        <input
          id="product-name"
          type="text"
          placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            disabled={isSubmitting}
            className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* NAFDAC Number */}
      <div className="flex flex-col gap-2">
        <label htmlFor="nafdac-no" className="text-sm font-semibold text-gray-800">
          Enter NAFDAC NO.
        </label>
        <div className="relative">
          <input
            id="nafdac-no"
            type="text"
            placeholder="XX-XXXX"
            value={nafdacNo}
            onChange={handleNafdacChange}
            maxLength={9}
            disabled={isSubmitting}
            className={`h-12 w-full rounded-lg border bg-white px-4 pr-10 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:ring-1 focus:ring-primary ${
              nafdacNo.length > 0
                ? isNafdacValid
                  ? "border-primary"
                  : "border-red-400 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-primary"
            }`}
          />
          {nafdacNo.length > 0 && isNafdacValid && (
            <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
          )}
        </div>
        <p className="text-xs text-gray-500">Strict alphanumeric format: XX-XXXX</p>
      </div>

      {/* File Upload Dropzone */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-800">
          Upload Product Image
        </label>

        {/* Thumbnail preview (above dropzone when files exist) */}
        {files.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {files.map((file, idx) => (
              <div
                key={`${file.name}-${idx}`}
                className="relative h-24 w-24 overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                {previewUrls[idx] && (
                  <img
                    src={previewUrls[idx]}
                    alt={file.name}
                    className="h-full w-full object-cover"
                  />
                )}
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  disabled={isSubmitting}
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-primary/40 bg-primary/5"
          }`}
        >
          <ImageIcon className="mb-3 h-10 w-10 text-primary/50" />
          <p className="text-sm font-medium text-gray-700">Add photo</p>
          <p className="mt-1 text-xs text-gray-500">JPG, PNG up to 5MB each</p>
          <p className="mt-1 text-xs text-gray-400">
            Add photo of the product, packaging or any other evidence.
          </p>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            multiple
            onChange={handleFileSelect}
            disabled={isSubmitting}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors ${
            isValid && !isSubmitting
              ? "bg-primary text-white hover:bg-primary/90"
              : "cursor-not-allowed bg-gray-200 text-white"
          }`}
        >
          {isSubmitting && <Spinner size="sm" className="border-white/50 border-t-white" />}
          {isSubmitting ? "Adding Product..." : "Add Product"}
        </button>
        <Link
          to={ROUTES.MANUFACTURER_PRODUCTS}
          aria-disabled={isSubmitting}
          className={`flex h-12 flex-1 items-center justify-center rounded-xl border-2 border-primary text-sm font-semibold text-primary transition-colors hover:bg-primary/5 ${
            isSubmitting ? "pointer-events-none opacity-60" : ""
          }`}
        >
          View Product List
        </Link>
      </div>
    </form>
  );

  /* ── MOBILE VIEW ──────────────────────────────── */
  if (!isDesktop) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 flex h-12 items-center bg-primary px-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="ml-4 flex-1 text-center text-sm font-bold text-white">
            {submitSuccess ? "Product Uploaded" : "Add Product"}
          </h1>
        </header>

        {/* Mobile Content */}
        <main className="flex-1 overflow-y-auto px-4 py-6 pb-20">
          {submitSuccess ? successContent : formContent}
        </main>

        <ManufacturerMobileNav />
        {loadingOverlay}
      </div>
    );
  }

  /* ── DESKTOP VIEW ─────────────────────────────── */
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ManufacturerSidebar />

      {/* Main Content */}
      <div className="ml-60 flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-14 items-center bg-secondary px-8">
          <h1 className="text-lg font-bold text-white">Add Product</h1>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-8 py-8">
          <div className="mx-auto max-w-xl">
            {submitSuccess ? successContent : formContent}
          </div>
        </main>
      </div>
      {loadingOverlay}
    </div>
  );
}

export default ProductUploadPage;
