import { Link } from "react-router";
import type { Application } from "../../types/application.types";
import { ROUTES } from "../../constants";
import StatusBadge from "./StatusBadge";

interface RecentApplicationsTableProps {
  applications: Application[];
}

function RecentApplicationsTable({ applications }: RecentApplicationsTableProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-gray-900">Recent Applications</h3>
        <Link
          to={ROUTES.ADMIN_APPLICATIONS}
          className="text-sm font-semibold text-primary hover:text-primary/80 hover:underline underline-offset-2"
        >
          View All
        </Link>
      </div>

      {applications.length === 0 ? (
        <p className="text-sm text-gray-500 py-8 text-center">No applications yet.</p>
      ) : (
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 text-xs font-semibold uppercase tracking-wide">
                <th scope="col" className="px-2 pb-3">ID</th>
                <th scope="col" className="px-2 pb-3">Organization</th>
                <th scope="col" className="px-2 pb-3">Type</th>
                <th scope="col" className="px-2 pb-3">Submitted</th>
                <th scope="col" className="px-2 pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-t border-gray-100">
                  <td className="px-2 py-3.5 font-bold text-gray-900 whitespace-nowrap">{app.id}</td>
                  <td className="px-2 py-3.5 text-gray-700 whitespace-nowrap">{app.organization}</td>
                  <td className="px-2 py-3.5 text-gray-600 whitespace-nowrap">{app.type}</td>
                  <td className="px-2 py-3.5 text-gray-600 whitespace-nowrap">{app.submittedDate}</td>
                  <td className="px-2 py-3.5">
                    <StatusBadge status={app.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RecentApplicationsTable;