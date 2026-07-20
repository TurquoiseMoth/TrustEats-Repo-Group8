import { Routes, Route } from "react-router";
import { ROUTES } from "../constants";

function HomePage() {
  return <div className="p-8 text-center"><h1 className="text-2xl font-bold">TrustEats</h1><p className="mt-2 text-gray-600">Scan. Verify. Trust.</p></div>;
}

function LoginPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Login</h1></div>;
}

function RegisterPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Register</h1></div>;
}

function DashboardPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Dashboard</h1></div>;
}

function ScanPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Scan</h1></div>;
}

function ResultPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Scan Result</h1></div>;
}

function ProductPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Product Details</h1></div>;
}

function VerifyPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Verification</h1></div>;
}

function ReportsPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Reports</h1></div>;
}

function HistoryPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">History</h1></div>;
}

function ProfilePage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Profile</h1></div>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
      <Route path={ROUTES.SCAN} element={<ScanPage />} />
      <Route path={ROUTES.RESULT} element={<ResultPage />} />
      <Route path={ROUTES.PRODUCT} element={<ProductPage />} />
      <Route path={ROUTES.VERIFY} element={<VerifyPage />} />
      <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
      <Route path={ROUTES.HISTORY} element={<HistoryPage />} />
      <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
    </Routes>
  );
}
