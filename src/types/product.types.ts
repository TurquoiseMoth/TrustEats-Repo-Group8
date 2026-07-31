export type ProductStatus = "active" | "expired";

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  nafdacRegNo: string;
  status: ProductStatus;
  /** Whether a QR code has already been generated for this product. */
  qrGenerated?: boolean;
}