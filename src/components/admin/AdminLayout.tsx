import { Outlet } from "react-router";
import AdminSidebar from "./AdminSidebar";
import AdminMobileNav from "./AdminMobileNav";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#eef4fc]">
      <AdminSidebar />
      <div className="flex-1 min-w-0">
        <AdminMobileNav />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;