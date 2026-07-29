import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#eef4fc]">
      <Sidebar />
      <div className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}

export default DashboardLayout;