import { Routes, Route } from "react-router";

import { ROUTES } from "../constants";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/HomePage";
import HistoryPage from "../pages/HistoryPage";
import VerifyPage from "../pages/VerifyPage";
import ScanPage from "../pages/ScanPage";
import ResultPage from "../pages/ResultPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import ReportPage from "../pages/ReportPage";

function DashboardPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Dashboard</h1></div>;
}

function ProductPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Product Details</h1></div>;
}


function AnalyticsPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Analytics</h1></div>;
}

function ProfilePage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Profile</h1></div>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<SignInPage />} />
      <Route path={ROUTES.REGISTER} element={<SignUpPage />} />
      <Route element={<Layout/>}>

      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
      <Route path={ROUTES.SCAN} element={<ScanPage />} />
      <Route path={ROUTES.RESULT} element={<ResultPage />} />
      <Route path={ROUTES.PRODUCT} element={<ProductPage />} />
      <Route path={ROUTES.VERIFY} element={<VerifyPage />} />
      <Route path={ROUTES.ANALYTICS} element={<AnalyticsPage />} />
      <Route path={ROUTES.HISTORY} element={<HistoryPage />} />
      <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
      <Route path={ROUTES.REPORT} element={<ReportPage />} />
      </Route>
    </Routes>
  );
}