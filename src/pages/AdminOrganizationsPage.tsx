import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "../constants";
import OrganizationsTable from "../components/admin/OrganizationsTable";
import { adminService, type AdminManufacturer } from "../services/admin";
import type { Organization } from "../types/organization.types";

function formatDate(value?: string) {
  if (!value) return "N/A";
  return new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function toOrganization(manufacturer: AdminManufacturer): Organization {
  return {
    id: manufacturer._id,
    name: manufacturer.companyName,
    approvedDate: formatDate(manufacturer.approvedAt ?? manufacturer.updatedAt),
    productCount: manufacturer.productCount ?? 0,
  };
}

export default function AdminOrganizationsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-manufacturers"],
    queryFn: () => adminService.getManufacturers(),
    staleTime: 15_000,
  });

  const organizations = (data?.manufacturers ?? [])
    .filter((manufacturer) => manufacturer.status === "approved")
    .map(toOrganization);

  return (
    <div>
      <div className="hidden bg-secondary px-8 py-6 md:block">
        <h1 className="text-2xl font-bold text-white">Admin Organizations</h1>
      </div>

      <div className="mx-auto max-w-[1680px] px-5 py-6 md:px-8 2xl:px-12">
        {isLoading && <p className="mb-4 text-sm text-gray-500">Loading organizations...</p>}
        {error && <p className="mb-4 text-sm text-red-600">Unable to load organizations.</p>}
        <OrganizationsTable
          organizations={organizations}
          viewAllHrefFor={(org) => `${ROUTES.ADMIN_ORGANIZATIONS}/${org.id}`}
        />
      </div>
    </div>
  );
}
