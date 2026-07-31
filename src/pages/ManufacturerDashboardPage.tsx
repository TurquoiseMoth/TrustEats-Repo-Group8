import { ManufacturerSidebar } from "../components/manufacturer/ManufacturerSidebar";
import { ManufacturerMobileNav } from "../components/manufacturer/ManufacturerMobileNav";
import DashboardMnf from "./DashboardMnf";
import DashboardMbl from "./DashboardMbl";

/**
 * The manufacturer dashboard is split across two layouts:
 * - Desktop (min-width: 768px): shared sidebar + DashboardMnf content
 * - Mobile: DashboardMbl content + shared bottom nav
 * Both reuse the same sidebar/bottom nav as the QR code, product upload and
 * notification pages so the layout never shifts when navigating.
 */
function ManufacturerDashboardPage() {
  return (
    <>
      {/* Desktop layout */}
      <div className="hidden min-h-screen bg-[#f2f7f7] md:flex">
        <ManufacturerSidebar />
        <div className="ml-60 flex min-w-0 flex-1 flex-col">
          <DashboardMnf />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex min-h-screen flex-col bg-[#f1f7fa] md:hidden">
        <DashboardMbl />
        <ManufacturerMobileNav />
      </div>
    </>
  );
}

export default ManufacturerDashboardPage;
