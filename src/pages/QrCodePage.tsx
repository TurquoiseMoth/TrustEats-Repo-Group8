import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Download, Printer, Share2 } from "lucide-react";
import { ROUTES } from "../constants";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Card } from "../components/ui/Card";
import { ManufacturerSidebar } from "../components/manufacturer/ManufacturerSidebar";
import { ManufacturerMobileNav } from "../components/manufacturer/ManufacturerMobileNav";
import { Spinner } from "../components/ui";
import { productService } from "../services/products";
import type { Batch, GeneratedCode, Product } from "../types";

interface GeneratedBatchResult {
  batch: Batch;
  generatedCodes?: GeneratedCode[];
}

function formatDate(value: string) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString();
}

function getProductId(product: Product) {
  return product._id ?? product.id ?? "";
}

function CornerBrackets() {
  return (
    <>
      <div className="absolute left-0 top-0 h-6 w-6 rounded-tl border-l-2 border-t-2 border-primary" />
      <div className="absolute right-0 top-0 h-6 w-6 rounded-tr border-r-2 border-t-2 border-primary" />
      <div className="absolute bottom-0 left-0 h-6 w-6 rounded-bl border-b-2 border-l-2 border-primary" />
      <div className="absolute bottom-0 right-0 h-6 w-6 rounded-br border-b-2 border-r-2 border-primary" />
    </>
  );
}

function QrHero({ code }: { code?: GeneratedCode }) {
  return (
    <div className="flex flex-col items-center gap-5">
      <h2 className="text-xl font-bold text-gray-900">QR Code Generated</h2>
      <div className="relative flex items-center justify-center p-4">
        <CornerBrackets />
        {code?.qrCodeUrl ? (
          <img src={code.qrCodeUrl} alt="Generated QR Code" className="h-44 w-44 object-contain" />
        ) : (
          <div className="flex h-44 w-44 items-center justify-center bg-gray-50 text-xs font-semibold text-gray-500">
            No QR image returned
          </div>
        )}
      </div>
      {code?.code && <p className="break-all text-center text-xs text-gray-500">Verification code: {code.code}</p>}
    </div>
  );
}

function ProductDetailsCard({ product, batch }: { product: Product; batch: Batch }) {
  const rows = [
    { label: "Product Name", value: product.name },
    { label: "NAFDAC Reg. NO.", value: product.nafdacNumber ?? "N/A" },
    { label: "Batch NO.", value: batch.batchNumber },
    { label: "Manufacturing Date", value: formatDate(batch.manufacturingDate) },
    { label: "Expiry Date", value: formatDate(batch.expiryDate) },
    { label: "Batch Quantity", value: String(batch.quantity) },
  ];

  return (
    <Card className="overflow-hidden p-0">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`flex items-center justify-between gap-4 px-5 py-3.5 ${i % 2 === 1 ? "bg-background" : "bg-white"}`}
        >
          <span className="text-sm text-gray-400">{row.label}</span>
          <span className="text-right text-sm font-bold text-gray-900">{row.value}</span>
        </div>
      ))}
    </Card>
  );
}

function ActionGroup({ qrUrl }: { qrUrl?: string }) {
  const handleShare = async () => {
    if (!qrUrl) return;
    if (navigator.share) {
      await navigator.share({ title: "TrustEats QR Code", url: qrUrl });
      return;
    }
    await navigator.clipboard.writeText(qrUrl);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-4">
        <a
          href={qrUrl}
          download
          target="_blank"
          rel="noreferrer"
          className={`flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition-colors ${
            qrUrl ? "bg-primary hover:bg-primary/90" : "pointer-events-none bg-gray-300"
          }`}
        >
          <Download className="h-4 w-4" />
          Download
        </a>
        <button
          type="button"
          onClick={handleShare}
          disabled={!qrUrl}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-primary text-sm font-semibold text-primary transition-colors hover:bg-primary/5 disabled:border-gray-300 disabled:text-gray-400"
        >
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div>
      <button
        type="button"
        onClick={() => window.print()}
        className="flex h-12 items-center justify-center gap-2 rounded-xl border border-primary text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
      >
        <Printer className="h-4 w-4" />
        Print
      </button>
      <Link to={ROUTES.MANUFACTURER_PRODUCTS} className="mt-2 text-center text-sm font-medium text-gray-400 transition-colors hover:text-gray-600">
        {"<-"} Back to Product List
      </Link>
    </div>
  );
}

function QrSuccessSummary({
  product,
  result,
}: {
  product: Product;
  result: GeneratedBatchResult;
}) {
  const firstCode = result.generatedCodes?.[0];
  return (
    <div className="flex flex-col gap-6">
      <QrHero code={firstCode} />
      <ProductDetailsCard product={product} batch={result.batch} />
      {result.generatedCodes && result.generatedCodes.length > 1 && (
        <Card className="p-4">
          <h3 className="mb-3 text-sm font-bold text-gray-900">Generated Codes</h3>
          <div className="max-h-40 space-y-2 overflow-y-auto">
            {result.generatedCodes.map((code, index) => (
              <a
                key={code.code}
                href={code.qrCodeUrl}
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg border border-gray-100 px-3 py-2 text-xs font-medium text-primary hover:bg-primary/5"
              >
                QR {index + 1}: {code.code}
              </a>
            ))}
          </div>
        </Card>
      )}
      <ActionGroup qrUrl={firstCode?.qrCodeUrl} />
    </div>
  );
}

function QrCodePage() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const [selectedProductId, setSelectedProductId] = useState(searchParams.get("productId") ?? "");
  const [batchNumber, setBatchNumber] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [codeQuantity, setCodeQuantity] = useState("1");
  const [manufacturingDate, setManufacturingDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [generatedResult, setGeneratedResult] = useState<GeneratedBatchResult | null>(null);

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => productService.getAll(1, 50),
    staleTime: 30_000,
    retry: 1,
  });

  const products = productsQuery.data?.products ?? [];
  const selectedProduct = useMemo(
    () => products.find((product) => getProductId(product) === selectedProductId) ?? products[0],
    [products, selectedProductId],
  );
  const effectiveProductId = selectedProduct ? getProductId(selectedProduct) : "";

  const createBatchMutation = useMutation({
    mutationFn: () =>
      productService.createBatch({
        productId: effectiveProductId,
        batchNumber,
        manufacturingDate,
        expiryDate,
        quantity: Number(quantity),
        codeQuantity: Number(codeQuantity),
      }),
    onSuccess: (result) => {
      setGeneratedResult(result);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["analytics-summary"] });
    },
  });

  const errorMessage =
    (createBatchMutation.error as { message?: string } | null)?.message ??
    (productsQuery.error as { message?: string } | null)?.message;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!effectiveProductId || !batchNumber || !manufacturingDate || !expiryDate) return;
    createBatchMutation.mutate();
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {productsQuery.isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : products.length === 0 ? (
        <Card className="p-5 text-center">
          <p className="text-sm font-bold text-gray-900">No products found</p>
          <p className="mt-1 text-xs text-gray-500">Add a product before generating a QR code.</p>
          <Link
            to={ROUTES.PRODUCT_UPLOAD}
            className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white"
          >
            Add Product
          </Link>
        </Card>
      ) : (
        <>
          <Card className="flex items-center gap-4 p-4">
            {selectedProduct?.imageUrl ? (
              <img
                src={selectedProduct.imageUrl}
                alt=""
                aria-hidden="true"
                className="h-16 w-16 flex-shrink-0 rounded-xl object-cover"
              />
            ) : (
              <div className="h-16 w-16 flex-shrink-0 rounded-xl bg-gray-100" />
            )}
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="text-sm font-bold text-gray-900">{selectedProduct?.name}</span>
              <span className="text-xs text-gray-400">NAFDAC Reg. NO. {selectedProduct?.nafdacNumber ?? "N/A"}</span>
            </div>
            <select
              value={effectiveProductId}
              onChange={(event) => setSelectedProductId(event.target.value)}
              className="min-w-0 flex-shrink-0 rounded-lg border border-primary bg-white px-3 py-2 text-xs font-semibold text-primary outline-none"
              aria-label="Change product"
            >
              {products.map((product) => (
                <option key={getProductId(product)} value={getProductId(product)}>
                  {product.name}
                </option>
              ))}
            </select>
          </Card>

          <div className="flex flex-col gap-2">
            <label htmlFor="batch-number" className="text-sm font-semibold text-gray-800">
              Batch Number
            </label>
            <input
              id="batch-number"
              type="text"
              placeholder="e.g. FU-2026-001"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
              className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="quantity" className="text-sm font-semibold text-gray-800">
                Batch Quantity
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                placeholder="e.g. 1000"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="code-quantity" className="text-sm font-semibold text-gray-800">
                QR Codes to Generate
              </label>
              <input
                id="code-quantity"
                type="number"
                min="1"
                max="25"
                value={codeQuantity}
                onChange={(e) => setCodeQuantity(e.target.value)}
                className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="mfg-date" className="text-sm font-semibold text-gray-800">
                Manufacturing Date
              </label>
              <input
                id="mfg-date"
                type="date"
                value={manufacturingDate}
                onChange={(e) => setManufacturingDate(e.target.value)}
                className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="exp-date" className="text-sm font-semibold text-gray-800">
                Expiry Date
              </label>
              <input
                id="exp-date"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {errorMessage && (
            <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={createBatchMutation.isPending || !effectiveProductId}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-70"
          >
            {createBatchMutation.isPending && <Spinner />}
            {createBatchMutation.isPending ? "Generating..." : "Generate QR Code"}
          </button>
        </>
      )}
    </form>
  );

  const title = generatedResult ? "QR Code Generated" : "Generate QR Code";

  if (!isDesktop) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <header className="sticky top-0 z-40 flex h-12 items-center bg-primary px-4">
          <button onClick={() => navigate(-1)} className="text-white" aria-label="Go back">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="ml-4 flex-1 text-center text-sm font-bold text-white">{title}</h1>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6 pb-20">
          {generatedResult && selectedProduct ? (
            <QrSuccessSummary product={selectedProduct} result={generatedResult} />
          ) : (
            formContent
          )}
        </main>

        <ManufacturerMobileNav />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <ManufacturerSidebar />

      <div className="ml-60 flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center bg-secondary px-8">
          <h1 className="text-lg font-bold text-white">{title}</h1>
        </header>

        <main className="flex-1 overflow-y-auto px-8 py-8 2xl:px-12">
          <div className="mx-auto w-full max-w-5xl">
            {generatedResult && selectedProduct ? (
              <QrSuccessSummary product={selectedProduct} result={generatedResult} />
            ) : (
              formContent
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default QrCodePage;
