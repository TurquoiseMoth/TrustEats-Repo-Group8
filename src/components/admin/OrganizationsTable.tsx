import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router";
import type { Organization } from "../../types/organization.types";
import Pagination from "./Pagination";

interface OrganizationsTableProps {
  organizations: Organization[];
  pageSize?: number;
  viewAllHrefFor: (org: Organization) => string;
}

function OrganizationsTable({ organizations, pageSize = 10, viewAllHrefFor }: OrganizationsTableProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!search.trim()) return organizations;
    const q = search.trim().toLowerCase();
    return organizations.filter(
      (org) => org.name.toLowerCase().includes(q) || org.id.toLowerCase().includes(q)
    );
  }, [organizations, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
        <h2 className="text-lg font-bold text-gray-900">Companies &amp; Brands</h2>
        <div className="relative w-full sm:w-64">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search organizations…"
            aria-label="Search organizations"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F6844]"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500 py-10 text-center">
          No organizations match &quot;{search}&quot;.
        </p>
      ) : (
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 text-xs font-semibold uppercase tracking-wide">
                <th scope="col" className="px-2 pb-3">ID</th>
                <th scope="col" className="px-2 pb-3">Organization</th>
                <th scope="col" className="px-2 pb-3">Approved</th>
                <th scope="col" className="px-2 pb-3">Product</th>
                <th scope="col" className="px-2 pb-3 sr-only">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((org) => (
                <tr key={org.id} className="border-t border-gray-100">
                  <td className="px-2 py-4 font-bold text-gray-900 whitespace-nowrap">{org.id}</td>
                  <td className="px-2 py-4 text-gray-700 whitespace-nowrap">{org.name}</td>
                  <td className="px-2 py-4 text-gray-600 whitespace-nowrap">{org.approvedDate}</td>
                  <td className="px-2 py-4 text-gray-600 whitespace-nowrap">{org.productCount}</td>
                  <td className="px-2 py-4 text-right whitespace-nowrap">
                    <Link
                      to={viewAllHrefFor(org)}
                      className="text-blue-600 font-semibold hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2F6844] rounded"
                    >
                      View all
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="flex items-center justify-between gap-4 flex-wrap pt-5 mt-2 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Showing {start + 1} to {Math.min(start + pageSize, filtered.length)} of {filtered.length}{" "}
            organizations
          </p>
          <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}

export default OrganizationsTable;