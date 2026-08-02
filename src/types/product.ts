export interface Product {
  _id: string;
  id?: string;
  manufacturerId?: string;
  name: string;
  brand?: string;
  description?: string;
  ingredients?: string;
  storageInfo?: string;
  countryOfOrigin?: string;
  nafdacNumber?: string;
  category?: string;
  imageUrl?: string;
  qrGenerated?: boolean;
  isActive?: boolean;
  createdAt?: string;
}

export interface Batch {
  _id: string;
  productId: string;
  batchNumber: string;
  manufacturingDate: string;
  expiryDate: string;
  quantity: number;
  status: "active" | "recalled" | "expired";
  createdAt?: string;
}

export interface GeneratedCode {
  code: string;
  qrCodeUrl: string;
}

export interface CreateBatchPayload {
  productId: string;
  batchNumber: string;
  manufacturingDate: string;
  expiryDate: string;
  quantity: number;
  codeQuantity: number;
}
