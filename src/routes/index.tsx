import { Routes, Route } from "react-router";
// Trigger recompile

import { ROUTES } from "../constants";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/HomePage";
<<<<<<< HEAD
import RegisterPage from "../pages/SignUpPage";
import LoginPage from "../pages/SignInPage";
import ScanPage from "../pages/ScanPage";
import VerifyPage from '../pages/VerifyPage';
import ResultPage from "../pages/ResultPage";
=======
import HistoryPage from "../pages/HistoryPage";
import VerifyPage from "../pages/VerifyPage";
function LoginPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Login</h1></div>;
}

function RegisterPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Register</h1></div>;
}
>>>>>>> b052239b5b3dc9cd345a4e11f7b9d1e078b1506f

function DashboardPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Dashboard</h1></div>;
}

function ProductPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Product Details</h1></div>;
}

<<<<<<< HEAD
function ReportsPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Reports</h1></div>;
}
=======

>>>>>>> b052239b5b3dc9cd345a4e11f7b9d1e078b1506f

function AnalyticsPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Analytics</h1></div>;
}

function ProfilePage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Profile</h1></div>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
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
      </Route>
    </Routes>
  );
}