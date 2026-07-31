import { Routes, Route, Navigate } from "react-router-dom";

import { ROUTES } from "./constants";
import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/SignUpPage";
import LoginPage from "./pages/SignInPage";
import ManufacturerLoginPage from "./pages/ManufacturerLoginPage";
import ManufacturerSignUpPage from "./pages/ManufacturerSignUpPage";
import ScanPage from "./pages/ScanPage";
import VerifyPage from "./pages/VerifyPage";
import ResultPage from "./pages/ResultPage";
import HistoryPage from "./pages/HistoryPage";
import ProfilePage from "./pages/ProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import CheckYourEmailPage from "./pages/CheckYourEmailPage";
import ProductUploadPage from "./pages/ProductUploadPage";

import Dashboard from "./pages/Dashboard";
import VerifyEmail from "./pages/VerifyEmail";
import DashboardMnf from "./pages/DashboardMnf";
import DashboardMbl from "./pages/DashboardMbl";
import ConsumerReports from "./pages/CustomerReports";
import Notifications from "./pages/Notifications";
import Promotions from "./pages/Promotions";

function ProductPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Product Details</h1>
    </div>
  );
}

function AnalyticsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Analytics</h1>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Pages WITHOUT Layout */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route
        path={ROUTES.MANUFACTURER_LOGIN}
        element={<ManufacturerLoginPage />}
      />
      <Route
        path={ROUTES.MANUFACTURER_SIGNUP}
        element={<ManufacturerSignUpPage />}
      />
      <Route
        path={ROUTES.FORGOT_PASSWORD}
        element={<ForgotPasswordPage />}
      />
      <Route
        path={ROUTES.CHECK_YOUR_EMAIL}
        element={<CheckYourEmailPage />}
      />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* Dashboard Pages - No Layout */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard-mnf" element={<DashboardMnf />} />
      <Route path="/dashboard-mbl" element={<DashboardMbl />} />
      <Route path="/consumer-reports" element={<ConsumerReports />} />
      <Route path="/notifications" element={<Notifications />} />

      {/* Pages WITH Layout */}
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.SCAN} element={<ScanPage />} />
        <Route path={ROUTES.VERIFY} element={<VerifyPage />} />
        <Route path={ROUTES.RESULT} element={<ResultPage />} />
        <Route path={ROUTES.HISTORY} element={<HistoryPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.PRODUCT_UPLOAD} element={<ProductUploadPage />} />
        <Route path={ROUTES.PRODUCT} element={<ProductPage />} />
        <Route path={ROUTES.ANALYTICS} element={<AnalyticsPage />} />
        <Route path="/promotions" element={<Promotions />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return <AppRoutes />;
}