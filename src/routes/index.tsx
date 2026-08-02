import { Routes, Route } from "react-router";

import { ROUTES } from "../constants";
import Layout from "../components/layout/Layout";
import DashboardLayout from "../components/layout/DashboardLayout";
import ConsumerDashboardLayout from "../components/layout/ConsumerDashboardLayout";
import {
  DeviceGate,
} from "../components/layout/DeviceGate";
import AdminLayout from "../components/admin/AdminLayout";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/SignUpPage";
import LoginPage from "../pages/SignInPage";
import ManufacturerLoginPage from "../pages/ManufacturerLoginPage";
import ManufacturerSignUpPage from "../pages/ManufacturerSignUpPage";
import ScanPage from "../pages/ScanPage";
import VerifyPage from "../pages/VerifyPage";
import VerifyEmailPage from "../pages/VerifyEmailPage";
import AdminSignInPage from "../pages/AdminSignInPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import AdminOrganizationsPage from "../pages/AdminOrganizationsPage";
import AdminOrganizationDetailPage from "../pages/AdminOrganizationDetailPage";
import AdminApplicationsPage from "../pages/AdminApplicationsPage";
import AdminApplicationDetailPage from "../pages/AdminApplicationDetailPage";
import AdminConsumerReportsPage from "../pages/AdminConsumerReportsPage";
import AdminPromotionTipsPage from "../pages/AdminPromotionTipsPage";
import AdminNotificationsPage from "../pages/AdminNotificationsPage";
import ResultPage from "../pages/ResultPage";
import HistoryPage from "../pages/HistoryPage";
import ProfilePage from "../pages/ProfilePage";
import NotificationsPage from "../pages/NotificationPage";
import ProductListPage from "../pages/ProductListPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import CheckYourEmailPage from "../pages/CheckYourEmailPage";
import ProductUploadPage from "../pages/ProductUploadPage";
import ManufacturerDashboardPage from "../pages/ManufacturerDashboardPage";
import QrCodePage from "../pages/QrCodePage";
import Dashboard from "../pages/Dashboard";
import ScanConfirmPage from "../pages/ScanConfirmPage";
import ReportPage from "../pages/ReportPage";
import ManufacturerNotificationPage from "../pages/ManufacturerNotificationPage";

// Legacy self-contained pages introduced by the DevINI PR (own nav)
import ConsumerReports from "../pages/ConsumerReports";
import Promotions from "../pages/Promotions";

function ProductPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Product Details</h1></div>;
}

function AnalyticsPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Analytics</h1></div>;
}

export function AppRoutes() {
  return (
    <Routes>
      {/* No layout */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.MANUFACTURER_LOGIN} element={<ManufacturerLoginPage />} />
      <Route path={ROUTES.MANUFACTURER_SIGNUP} element={<ManufacturerSignUpPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      <Route path={ROUTES.CHECK_YOUR_EMAIL} element={<CheckYourEmailPage />} />
      <Route path={ROUTES.PRODUCT_UPLOAD} element={<DeviceGate allow="tablet-desktop"><ProductUploadPage /></DeviceGate>} />
      <Route path={ROUTES.VERIFY} element={<DeviceGate allow="mobile"><VerifyPage /></DeviceGate>} />
      <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmailPage />} />
      <Route path={ROUTES.ADMIN_LOGIN} element={<AdminSignInPage />} />
      <Route path={ROUTES.MANUFACTURER_DASHBOARD} element={<DeviceGate allow="tablet-desktop"><ManufacturerDashboardPage /></DeviceGate>} />
      <Route path={ROUTES.MANUFACTURER_NOTIFICATIONS} element={<DeviceGate allow="tablet-desktop"><ManufacturerNotificationPage /></DeviceGate>} />
      <Route path={ROUTES.MANUFACTURER_PRODUCTS} element={<DeviceGate allow="tablet-desktop"><ProductListPage variant="manufacturer" /></DeviceGate>} />
      <Route path={ROUTES.QR_CODE} element={<DeviceGate allow="tablet-desktop"><QrCodePage /></DeviceGate>} />
      <Route path={ROUTES.RESULT} element={<DeviceGate allow="mobile"><ResultPage /></DeviceGate>} />
      <Route path={ROUTES.SCAN_CONFIRM} element={<DeviceGate allow="mobile"><ScanConfirmPage /></DeviceGate>} />
      <Route path={ROUTES.REPORTS} element={<DeviceGate allow="mobile"><ReportPage /></DeviceGate>} />

      {/* Legacy self-contained pages (own nav) */}
      <Route path="/dashboard-mnf" element={<DeviceGate allow="tablet-desktop"><ManufacturerDashboardPage /></DeviceGate>} />
      <Route path="/dashboard-mbl" element={<DeviceGate allow="tablet-desktop"><ManufacturerDashboardPage /></DeviceGate>} />
      <Route path="/consumer-reports" element={<DeviceGate allow="mobile"><ConsumerReports /></DeviceGate>} />
      <Route path="/promotions" element={<DeviceGate allow="mobile"><Promotions /></DeviceGate>} />

      {/* With consumer layout (top navbar) */}
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.PRODUCT} element={<ProductPage />} />
      </Route>

      {/* With consumer dashboard layout (dashboard navbar + bottom nav) */}
      <Route element={<DeviceGate allow="mobile"><ConsumerDashboardLayout /></DeviceGate>}>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.SCAN} element={<ScanPage />} />
        <Route path={ROUTES.HISTORY} element={<HistoryPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />
      </Route>

      {/* With dashboard layout (sidebar / bottom nav) */}
      <Route element={<DeviceGate allow="mobile"><DashboardLayout /></DeviceGate>}>
        <Route path={ROUTES.PRODUCT_LIST} element={<ProductListPage />} />
        <Route path={ROUTES.ANALYTICS} element={<AnalyticsPage />} />
      </Route>

      {/* With admin layout (admin sidebar) */}
      <Route element={<DeviceGate allow="tablet-desktop"><AdminLayout /></DeviceGate>}>
        <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboardPage />} />
        <Route path={ROUTES.ADMIN_ORGANIZATIONS} element={<AdminOrganizationsPage />} />
        <Route path={ROUTES.ADMIN_ORGANIZATION_DETAIL} element={<AdminOrganizationDetailPage />} />
        <Route path={ROUTES.ADMIN_APPLICATIONS} element={<AdminApplicationsPage />} />
        <Route path={ROUTES.ADMIN_APPLICATION_DETAIL} element={<AdminApplicationDetailPage />} />
        <Route path={ROUTES.ADMIN_CONSUMER_REPORTS} element={<AdminConsumerReportsPage />} />
        <Route path={ROUTES.ADMIN_PROMOTION_TIPS} element={<AdminPromotionTipsPage />} />
        <Route path={ROUTES.ADMIN_NOTIFICATIONS} element={<AdminNotificationsPage />} />
      </Route>
    </Routes>
  );
}
