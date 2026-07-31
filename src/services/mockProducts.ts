import type { Product, Batch, CreateBatchPayload } from "../types";

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

const SEED_PRODUCTS: Product[] = [
  {
    _id: "mock-product-1",
    name: "Golden Morn Cereal",
    brand: "Golden Morn",
    description: "Fortified instant cereal made from maize and soya.",
    ingredients: "Maize, Soya, Vitamin A, Vitamin D3",
    storageInfo: "Store in a cool, dry place.",
    countryOfOrigin: "Nigeria",
    category: "cereal",
    imageUrl: "/assets/products/golden-morn-cereal-product-image.png",
    qrGenerated: true,
    isActive: true,
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "mock-product-2",
    name: "Farm Milk",
    brand: "Farm",
    description: "Full cream instant milk powder.",
    ingredients: "Whole milk powder, Vitamins A and D",
    storageInfo: "Keep in a cool dry place. Consume within 3 weeks of opening.",
    countryOfOrigin: "Nigeria",
    category: "dairy",
    imageUrl: "/assets/products/farm-milk-bottle-product-image.png",
    qrGenerated: false,
    isActive: true,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "mock-product-3",
    name: "Pureteast Tomato Sauce",
    brand: "Pureteast",
    description: "Rich tomato paste for cooking.",
    ingredients: "Tomato concentrate, water, salt",
    storageInfo: "Refrigerate after opening.",
    countryOfOrigin: "Nigeria",
    category: "sauce",
    imageUrl: "/assets/products/pureteaste-tomatoes-sauce-product-image.png",
    qrGenerated: false,
    isActive: true,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "mock-product-4",
    name: "Gino Pepper & Onion Paste",
    brand: "Gino",
    description: "Seasoned pepper and onion cooking paste.",
    ingredients: "Pepper, onion, vegetable oil, salt",
    storageInfo: "Refrigerate after opening.",
    countryOfOrigin: "Nigeria",
    category: "seasoning",
    imageUrl: "/assets/products/gino-pepper-and-onion-paste-product-image.png",
    qrGenerated: false,
    isActive: true,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

let products: Product[] = [...SEED_PRODUCTS];

let batches: Batch[] = [
  {
    _id: "mock-batch-1",
    productId: "mock-product-1",
    batchNumber: "QM001240001",
    manufacturingDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    expiryDate: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000).toISOString(),
    quantity: 1000,
    status: "active",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const toProduct = (data: Partial<Product> | FormData): Partial<Product> => {
  if (data instanceof FormData) {
    const out: Record<string, unknown> = {};
    data.forEach((value, key) => {
      out[key] = value;
    });
    return out;
  }
  return data;
};

export const mockProductService = {
  create: async (data: Partial<Product> | FormData): Promise<Product> => {
    await delay();
    const patch = toProduct(data);
    const product: Product = {
      _id: `mock-product-${Date.now()}`,
      name: (patch.name as string) || "Untitled Product",
      brand: (patch.brand as string) || "MockBrand",
      description: (patch.description as string) || "",
      ingredients: (patch.ingredients as string) || "",
      storageInfo: (patch.storageInfo as string) || "",
      countryOfOrigin: (patch.countryOfOrigin as string) || "Nigeria",
      category: (patch.category as string) || "food",
      imageUrl: (patch.imageUrl as string) || "",
      qrGenerated: false,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    products = [product, ...products];
    return product;
  },

  getAll: async (page = 1, limit = 20) => {
    await delay();
    const start = (page - 1) * limit;
    const items = products.slice(start, start + limit);
    return {
      products: items,
      total: products.length,
      page,
      pages: Math.max(1, Math.ceil(products.length / limit)),
    };
  },

  getById: async (id: string): Promise<Product> => {
    await delay();
    const product = products.find((p) => p._id === id || p.id === id);
    if (!product) throw { message: "Product not found" };
    return product;
  },

  update: async (id: string, data: Record<string, unknown>): Promise<Product> => {
    await delay();
    const index = products.findIndex((p) => p._id === id);
    if (index === -1) throw { message: "Product not found" };
    products[index] = { ...products[index], ...data, _id: products[index]._id };
    return products[index];
  },

  createBatch: async (data: CreateBatchPayload) => {
    await delay();
    const batch: Batch = {
      _id: `mock-batch-${Date.now()}`,
      productId: data.productId,
      batchNumber: data.batchNumber,
      manufacturingDate: data.manufacturingDate,
      expiryDate: data.expiryDate,
      quantity: data.quantity,
      status: "active",
      createdAt: new Date().toISOString(),
    };
    batches = [batch, ...batches];
    const count = Math.max(1, Number(data.codeQuantity) || 1);
    const generatedCodes = Array.from({ length: count }, (_, i) => ({
      code: `MOCK-${data.batchNumber}-${String(i + 1).padStart(4, "0")}`,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=MOCK-${data.batchNumber}-${String(i + 1).padStart(4, "0")}`,
    }));
    return { batch, generatedCodes };
  },

  getBatches: async (productId: string): Promise<Batch[]> => {
    await delay();
    return batches.filter((b) => b.productId === productId);
  },
};
