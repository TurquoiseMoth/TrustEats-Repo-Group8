import Navbar from "./Navbar"
import Footer from "./Footer"
import BottomNav from "./BottomNav"
import { Outlet, useLocation } from "react-router"
import { ROUTES } from "../../constants"

function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === ROUTES.HOME || location.pathname === '/';

  return (
    <div>
      <Navbar/>
      <div>
        <Outlet/>
      </div>

      {!isHomePage && <BottomNav />}

      {isHomePage && (
        <>
          <div className="mt-20" />
          <Footer/>
        </>
      )}

      {!isHomePage && <BottomNav />}
    </div>
  )
}

export default Layout