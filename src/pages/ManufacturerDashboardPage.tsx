import { ManufacturerSidebar } from "../components/manufacturer/ManufacturerSidebar";
import { ManufacturerMobileNav } from "../components/manufacturer/ManufacturerMobileNav";
import DashboardMnf from "./DashboardMnf";
import DashboardMbl from "./DashboardMbl";
import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "../services/analytics";
import { CheckCircle2, Clock3 } from "lucide-react";
import { useState } from "react";

/**
 * The manufacturer dashboard is split across two layouts:
 * - Desktop (min-width: 768px): shared sidebar + DashboardMnf content
 * - Mobile: DashboardMbl content + shared bottom nav
 * Both reuse the same sidebar/bottom nav as the QR code, product upload and
 * notification pages so the layout never shifts when navigating.
 */
function ManufacturerDashboardPage() {
  const [approvedModalDismissed, setApprovedModalDismissed] = useState(false);
  const {
    data: summary,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["manufacturer-dashboard-summary"],
    queryFn: () => analyticsService.getSummary(),
    staleTime: 30_000,
    retry: 1,
    refetchInterval: (query) =>
      query.state.data?.manufacturer?.status === "pending" ? 5000 : false,
  });
  const status = summary?.manufacturer?.status;
  const showPendingModal = status === "pending";
  const showApprovedModal = status === "approved" && !approvedModalDismissed;

  return (
    <>
      {/* Desktop layout */}
      <div className="hidden min-h-screen bg-[#f2f7f7] md:flex">
        <ManufacturerSidebar />
        <div className="ml-60 flex min-w-0 flex-1 flex-col">
          <DashboardMnf
            summary={summary}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex min-h-screen flex-col bg-[#f1f7fa] md:hidden">
        <DashboardMbl
          summary={summary}
          isLoading={isLoading}
          error={error}
        />
        <ManufacturerMobileNav />
      </div>
      {showPendingModal && <VerificationStatusModal status="pending" />}
      {showApprovedModal && (
        <VerificationStatusModal
          status="approved"
          onClose={() => setApprovedModalDismissed(true)}
        />
      )}
    </>
  );
}

function VerificationStatusModal({
  status,
  onClose,
}: {
  status: "pending" | "approved";
  onClose?: () => void;
}) {
  const isApproved = status === "approved";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/35 px-4 backdrop-blur-[1px]">
      <div className="w-full max-w-[430px] rounded-2xl bg-[#eef8ff] px-7 py-10 text-center shadow-2xl">
        <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center">
          {isApproved ? (
            <div className="relative flex h-28 w-28 items-center justify-center">
              <span className="absolute h-24 w-24 rounded-full bg-primary/10" />
              <CheckCircle2 className="relative h-24 w-24 fill-primary text-primary" />
            </div>
          ) : (
            <Clock3 className="h-28 w-28 text-primary" strokeWidth={1.8} />
          )}
        </div>

        <h2 className="text-xl font-bold text-[#292d32]">
          {isApproved
            ? "Documents Verified Successfully"
            : "Your document is being verified"}
        </h2>

        {!isApproved && (
          <>
            <p className="mt-10 text-sm text-[#3f4b45]">This may take a while.</p>
            <div className="mx-auto mt-8 flex w-44 justify-center gap-1">
              {[0, 1, 2, 3, 4].map((item) => (
                <span
                  key={item}
                  className={`h-2 flex-1 rounded-full ${
                    item === 0 ? "bg-primary" : "bg-primary/35"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {isApproved && (
          <button
            type="button"
            onClick={onClose}
            className="mt-9 flex h-12 w-full items-center justify-center rounded-lg bg-primary text-base font-semibold text-white hover:bg-primary/90"
          >
            Go to Dashboard
          </button>
        )}
      </div>
    </div>
  );
}

export default ManufacturerDashboardPage;
