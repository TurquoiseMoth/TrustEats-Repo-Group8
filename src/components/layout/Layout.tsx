import Navbar from "./Navbar";
import Footer from "./Footer";
import BottomNav from "./BottomNav";
import { Outlet, useLocation } from "react-router";
import { ROUTES } from "../../constants";

function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === ROUTES.HOME || location.pathname === "/";
  
  // List routes that have their own sidebar/header layout and shouldn't display the top Navbar
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
      {/* Only render Navbar if we are NOT on a dashboard/admin page */}
      {!isDashboardRoute && <Navbar />}

      <div>
        <Outlet />
      </div>

      {!isHomePage && !isDashboardRoute && <BottomNav />}

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