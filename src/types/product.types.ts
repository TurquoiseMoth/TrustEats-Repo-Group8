export type ProductStatus = "active" | "expired";

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  nafdacRegNo: string;
  status: ProductStatus;
}