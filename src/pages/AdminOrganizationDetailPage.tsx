import { Link, useParams } from "react-router";
import { ArrowLeft, Building2, Package } from "lucide-react";
import { ROUTES } from "../constants";

export default function AdminOrganizationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const organizationId = id ?? "Unknown";

  return (
    <div>
      <div className="hidden md:flex items-center gap-3 bg-secondary px-8 py-6">
        <Link
          to={ROUTES.ADMIN_ORGANIZATIONS}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-white/90 hover:bg-white/10"
          aria-label="Back to organizations"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Organization Details</h1>
      </div>

      <div className="mx-auto max-w-[1680px] px-5 py-6 md:px-8 2xl:px-12">
        <div className="rounded-2xl bg-white p-6 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Organization</h2>
              <p className="text-sm text-gray-500">{organizationId}</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            Product and application details for this organization will appear here
            once the backend is connected.
          </p>

          <Link
            to={ROUTES.ADMIN_ORGANIZATIONS}
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
          >
            <Package className="h-4 w-4" aria-hidden="true" />
            Back to Organizations
          </Link>
        </div>
      </div>
    </div>
  );
}
