import { ROUTES } from "../constants";
import OrganizationsTable from "../components/admin/OrganizationsTable";
import type { Organization } from "../types/organization.types";

const PLACEHOLDER_ORGANIZATIONS: Organization[] = [
  { id: "APP-5522", name: "Sahel Frozen Foods", approvedDate: "17 Jul, 2026", productCount: 0 },
  { id: "APP-5523", name: "Naija Crunch Foods Ltd", approvedDate: "15 Jul, 2026", productCount: 10 },
  { id: "APP-5524", name: "AquaPure Table Water", approvedDate: "12 Jul, 2026", productCount: 3 },
  { id: "APP-5525", name: "Delta Palm Products", approvedDate: "10 Jul, 2026", productCount: 1 },
  { id: "APP-5526", name: "SunHarvet Ltd", approvedDate: "10 Jul, 2026", productCount: 2 },
  { id: "APP-5527", name: "Colgate Inc", approvedDate: "10 Jul, 2026", productCount: 4 },
  { id: "APP-5528", name: "African MariGold", approvedDate: "10 Jul, 2026", productCount: 1 },
  { id: "APP-5529", name: "Gino", approvedDate: "10 Jul, 2026", productCount: 7 },
  { id: "APP-5530", name: "Beleuxe", approvedDate: "10 Jul, 2026", productCount: 5 },
  { id: "APP-5531", name: "Kaduna Millers", approvedDate: "9 Jul, 2026", productCount: 6 },
  { id: "APP-5532", name: "Lagos Bakehouse", approvedDate: "8 Jul, 2026", productCount: 2 },
  { id: "APP-5533", name: "Niger Delta Oils", approvedDate: "8 Jul, 2026", productCount: 3 },
  { id: "APP-5534", name: "Abuja Dairy Co", approvedDate: "7 Jul, 2026", productCount: 8 },
  { id: "APP-5535", name: "Ibadan Fresh Farms", approvedDate: "7 Jul, 2026", productCount: 1 },
  { id: "APP-5536", name: "Enugu Spice Works", approvedDate: "6 Jul, 2026", productCount: 4 },
  { id: "APP-5537", name: "Kano Grain Traders", approvedDate: "6 Jul, 2026", productCount: 2 },
  { id: "APP-5538", name: "Port Harcourt Seafoods", approvedDate: "5 Jul, 2026", productCount: 5 },
  { id: "APP-5539", name: "Jos Highland Produce", approvedDate: "5 Jul, 2026", productCount: 3 },
  { id: "APP-5540", name: "Benin Herbal Co", approvedDate: "4 Jul, 2026", productCount: 1 },
  { id: "APP-5541", name: "Ilorin Sweets Ltd", approvedDate: "4 Jul, 2026", productCount: 6 },
  { id: "APP-5542", name: "Warri Beverages", approvedDate: "3 Jul, 2026", productCount: 2 },
  { id: "APP-5543", name: "Owerri Snacks Co", approvedDate: "3 Jul, 2026", productCount: 4 },
  { id: "APP-5544", name: "Calabar Palm Oils", approvedDate: "2 Jul, 2026", productCount: 3 },
];

export default function AdminOrganizationsPage() {
  return (
    <div>
      <div className="hidden md:block bg-secondary px-8 py-6">
        <h1 className="text-2xl font-bold text-white">Admin Organizations</h1>
      </div>

      <div className="mx-auto max-w-[1680px] px-5 py-6 md:px-8 2xl:px-12">
        <OrganizationsTable
          organizations={PLACEHOLDER_ORGANIZATIONS}
          viewAllHrefFor={(org) => `${ROUTES.ADMIN_ORGANIZATIONS}/${org.id}`}
        />
      </div>
    </div>
  );
}
