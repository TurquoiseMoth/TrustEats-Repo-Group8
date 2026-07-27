import { Routes, Route } from "react-router";
import { ROUTES } from "../constants";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/SignUpPage";
import LoginPage from "../pages/SignInPage";
import ScanPage from "../pages/ScanPage";
import VerifyPage from "../pages/VerifyPage";
import ResultPage from "../pages/ResultPage";
import HistoryPage from "../pages/HistoryPage";
import ProfilePage from "../pages/ProfilePage";
import NotificationsPage from "../pages/NotificationPage";

function DashboardPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Dashboard</h1></div>;
}

function ProductPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Product Details</h1></div>;
}

function ReportsPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Reports</h1></div>;
}

function AnalyticsPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Analytics</h1></div>;
}

export function AppRoutes() {
  return (
    <Routes>
      {/* No layout */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.VERIFY} element={<VerifyPage />} />
      <Route path={ROUTES.RESULT} element={<ResultPage />} />

      {/* With layout */}
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.SCAN} element={<ScanPage />} />
        <Route path={ROUTES.PRODUCT} element={<ProductPage />} />
        <Route path={ROUTES.ANALYTICS} element={<AnalyticsPage />} />
        <Route path={ROUTES.HISTORY} element={<HistoryPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />
      </Route>
    </Routes>
  );
}