import type { ManufacturerProfile, SubmitManufacturerProfileInput } from "./manufacturers";

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

const DEFAULT_PROFILE: ManufacturerProfile = {
  _id: "mock-manufacturer-profile-1",
  userId: "mock-mfr-1",
  companyName: "Golden Foods Ltd",
  napamsEmail: "info@goldenfoods.ng",
  cacNumber: "RC1234567",
  nafdacCofRNumber: "NAFDAC-COF-2024-008",
  contactPhone: "+2348034567890",
  address: "7 Trans-Amadi Industrial Layout, Port Harcourt",
  country: "Nigeria",
  logoUrl: "/assets/trusteats-logo.png",
  status: "approved",
  termsAcceptedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
};

export const mockManufacturerService = {
  submitProfile: async (data: SubmitManufacturerProfileInput): Promise<ManufacturerProfile> => {
    await delay();
    const profile: ManufacturerProfile = {
      ...DEFAULT_PROFILE,
      companyName: data.companyName,
      napamsEmail: data.napamsEmail,
      cacNumber: data.cacNumber,
      nafdacCofRNumber: data.nafdacCofRNumber ?? DEFAULT_PROFILE.nafdacCofRNumber,
      contactPhone: data.contactPhone,
      address: data.address,
      country: data.country,
      status: "approved",
      termsAcceptedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem("mock_manufacturer_profile", JSON.stringify(profile));
    } catch {
      // ignore storage errors
    }
    return profile;
  },

  getProfile: async (): Promise<ManufacturerProfile> => {
    await delay(150);
    try {
      const raw = localStorage.getItem("mock_manufacturer_profile");
      if (raw) return JSON.parse(raw) as ManufacturerProfile;
    } catch {
      // fall through to default
    }
    return DEFAULT_PROFILE;
  },
};
