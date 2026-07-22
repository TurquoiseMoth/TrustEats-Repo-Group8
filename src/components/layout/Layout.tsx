import Navbar from "./Navbar"
import Footer from "./Footer"
import {Outlet} from "react-router"
function Layout() {
  return (
    <div >
        <Navbar/>
        <div className="mx-4">

      <Outlet/>
        </div>
        <div className="mt-20" />
        <Footer/>
    </div>
  )
}

export default Layout