import Navbar from "./Navbar"
import Footer from "./Footer"
import {Outlet} from "react-router"
function Layout() {
  return (
    <div>
        <Navbar/>
        <div className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
            <Outlet/>
        </div>
        <div className="mt-20" />
        <Footer/>
    </div>
  )
}

export default Layout