import { useEffect } from "react";
import { useLocation } from "react-router";

const APP_NAME = "TrustEats";
const DEFAULT_TITLE = "Verify Food Products with a Scan";

// Ordered from most specific to least specific so prefix matches don't collide.
const titleMap: Array<{ match: string; title: string; exact?: boolean }> = [
  { match: "/manufacturer/login", title: "Manufacturer Sign In" },
  { match: "/manufacturer/signup", title: "Manufacturer Sign Up" },
  { match: "/manufacturer/dashboard", title: "Manufacturer Dashboard" },
  { match: "/manufacturer/notifications", title: "Manufacturer Notifications" },
  { match: "/manufacturer/products", title: "My Products" },
  { match: "/admin/login", title: "Admin Sign In" },
  { match: "/admin/", title: "Admin" },
  { match: "/verify-email", title: "Verify Your Email" },
  { match: "/verify/", title: "Verification Result" },
  { match: "/result/", title: "Product Alert" },
  { match: "/forgot-password", title: "Forgot Password" },
  { match: "/check-your-email", title: "Check Your Email" },
  { match: "/product-upload", title: "Add Product" },
  { match: "/scan-confirm", title: "Scan Confirmation" },
  { match: "/dashboard", title: "Dashboard" },
  { match: "/notifications", title: "Notifications" },
  { match: "/products", title: "Product List" },
  { match: "/qr-code", title: "Generate QR Code" },
  { match: "/history", title: "Scan History" },
  { match: "/profile", title: "Profile" },
  { match: "/scan", title: "Scan a Product" },
  { match: "/reports", title: "Report a Product" },
  { match: "/register", title: "Sign Up" },
  { match: "/login", title: "Sign In" },
  { match: "/", title: DEFAULT_TITLE, exact: true },
];

function DocumentTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    const entry = titleMap.find((item) =>
      item.exact ? pathname === item.match : pathname.startsWith(item.match),
    );
    const title = entry?.title ?? DEFAULT_TITLE;
    document.title = `${title} | ${APP_NAME}`;
  }, [pathname]);

  return null;
}

export default DocumentTitle;
