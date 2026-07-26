import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet, useLocation } from "react-router"
import { ROUTES } from "../../constants"

function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === ROUTES.HOME || location.pathname === '/';

  return (
    <div>
        <Navbar/>
        <div className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
            <Outlet/>
        </div>
        
        {isHomePage && (
          <>
            <div className="mt-20" />
            <Footer/>
          </>
        )}
    </div>
  )
}

export default Layout