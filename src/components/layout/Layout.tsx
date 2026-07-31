import Navbar from "./Navbar";
import Footer from "./Footer";
import BottomNav from "./BottomNav";
import { Outlet, useLocation } from "react-router";
import { ROUTES } from "../../constants";

function Layout() {
  const location = useLocation();

  const isHomePage =
    location.pathname === ROUTES.HOME || location.pathname === "/";

  // Routes that use their own layout (no top Navbar)
  const isDashboardRoute = [
    "/promotions",
    "/dashboard",
    "/dashboard-mnf",
    "/dashboard-mbl",
    "/consumer-reports",
    "/notifications",
    ROUTES.ANALYTICS,
    ROUTES.PRODUCT_UPLOAD,
  ].includes(location.pathname);

  return (
    <div>
      {/* Hide Navbar on dashboard/admin pages */}
      {!isDashboardRoute && <Navbar />}

      <Outlet />

      {/* Show BottomNav on every page except the home page */}
      {!isHomePage && <BottomNav />}

      {/* Show Footer only on the home page */}
      {isHomePage && (
        <>
          <div className="mt-20" />
          <Footer />
        </>
      )}
    </div>
  );
}

export default Layout;