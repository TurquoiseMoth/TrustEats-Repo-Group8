import type { ScanEvent } from "../types";

export const MOCK_VERIFICATIONS: ScanEvent[] = [
  { _id: "1", code: "ABC123", status: "genuine", message: "Mock — genuine", scannedAt: new Date().toISOString(), productName: "Indomie", brand: "Dufil" },
  { _id: "2", code: "DEF456", status: "fake", message: "Mock — fake", scannedAt: new Date().toISOString(), productName: "Power Oil", brand: "Dansa" },
  { _id: "3", code: "GHI789", status: "suspicious", message: "Mock — suspicious", scannedAt: new Date().toISOString(), productName: "Peak Milk", brand: "FrieslandCampina" },
];
