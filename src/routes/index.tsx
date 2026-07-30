import { Routes, Route } from "react-router";
import { ROUTES } from "../constants";
import Layout from "../components/layout/Layout";
import DashboardLayout from "../components/layout/DashboardLayout";
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
import ConsumerDashboardPage from "../pages/ConsumerDashboardPage";
import ScanConfirmPage from "../pages/ScanConfirmPage";
import ReportPage from "../pages/ReportPage";
import ManufacturerNotificationPage from "../pages/ManufacturerNotificationPage";

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
      <Route path={ROUTES.PRODUCT_UPLOAD} element={<ProductUploadPage />} />
      <Route path={ROUTES.VERIFY} element={<VerifyPage />} />
      <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmailPage />} />
      <Route path={ROUTES.ADMIN_LOGIN} element={<AdminSignInPage />} />
      <Route path={ROUTES.MANUFACTURER_DASHBOARD} element={<ManufacturerDashboardPage />} />
      <Route path={ROUTES.MANUFACTURER_ORGANIZATIONS} element={<ManufacturerDashboardPage />} />
      <Route path={ROUTES.MANUFACTURER_APPLICATIONS} element={<ManufacturerDashboardPage />} />
      <Route path={ROUTES.MANUFACTURER_CONSUMER_REPORTS} element={<ManufacturerDashboardPage />} />
      <Route path={ROUTES.MANUFACTURER_PROMOTION_TIPS} element={<ManufacturerDashboardPage />} />
      <Route path={ROUTES.MANUFACTURER_NOTIFICATIONS} element={<ManufacturerNotificationPage />} />
      <Route path={ROUTES.QR_CODE} element={<QrCodePage />} />
      <Route path={ROUTES.RESULT} element={<ResultPage />} />
      <Route path={ROUTES.SCAN_CONFIRM} element={<ScanConfirmPage />} />
      <Route path={ROUTES.REPORTS} element={<ReportPage />} />

      {/* With consumer layout (top navbar) */}
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.SCAN} element={<ScanPage />} />
        <Route path={ROUTES.PRODUCT} element={<ProductPage />} />
        <Route path={ROUTES.HISTORY} element={<HistoryPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />
      </Route>

      {/* With dashboard layout (sidebar / bottom nav) */}
      <Route element={<DashboardLayout />}>
        <Route path={ROUTES.DASHBOARD} element={<ConsumerDashboardPage />} />
        <Route path={ROUTES.PRODUCT_LIST} element={<ProductListPage />} />
        <Route path={ROUTES.ANALYTICS} element={<AnalyticsPage />} />
      </Route>

      {/* With admin layout (admin sidebar) */}
      <Route element={<AdminLayout />}>
        <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboardPage />} />
        <Route path={ROUTES.ADMIN_ORGANIZATIONS} element={<AdminOrganizationsPage />} />
        <Route path={ROUTES.ADMIN_APPLICATIONS} element={<AdminApplicationsPage />} />
        <Route path={ROUTES.ADMIN_APPLICATION_DETAIL} element={<AdminApplicationDetailPage />} />
        <Route path={ROUTES.ADMIN_CONSUMER_REPORTS} element={<AdminConsumerReportsPage />} />
        <Route path={ROUTES.ADMIN_PROMOTION_TIPS} element={<AdminPromotionTipsPage />} />
        <Route path={ROUTES.ADMIN_NOTIFICATIONS} element={<AdminNotificationsPage />} />
      </Route>
    </Routes>
  );
}