# AGENTS.md — TrustEats Project Context

## What This Project Is
TrustEats is a food product verification platform for Nigerian consumers. Users scan QR codes on food products to verify authenticity against NAFDAC records. Built by Group 8.

## Tech Stack
- React 19 + TypeScript + Vite 8
- React Router v7 (unified import from "react-router")
- TanStack React Query v5 (installed, partially wired)
- Tailwind CSS v4 (via @tailwindcss/vite plugin)
- html5-qrcode (QR scanner library, already installed)
- Axios (HTTP client, configured in src/services/api.ts)
- Zod + React Hook Form (installed, not yet used)
- Lucide React (icons)
- clsx + tailwind-merge (class utilities)

## Run Commands
- `npm run dev` — start dev server
- `npm run build` — typecheck (tsc -b) then Vite build
- `npm run lint` — ESLint
- Always run `npm run build` and `npm run lint` after making changes to verify correctness.

## Folder Structure
```
src/
├── main.tsx                    # Entry: BrowserRouter + QueryClientProvider
├── App.tsx                     # Renders <AppRoutes />
├── index.css                   # Tailwind import + custom theme tokens + keyframes
├── constants/
│   ├── routes.ts               # ROUTES object with all path constants
│   ├── colors.ts               # Color palette
│   └── verificationStatus.ts   # Verification status enums
├── types/
│   ├── api.ts                  # ApiResponse<T>, PaginatedResponse<T>, ApiError
│   ├── auth.ts                 # Manufacturer, LoginRequest, AuthResponse, etc.
│   ├── product.ts              # Product, VerificationCode
│   ├── verification.ts         # VerificationResult, VerificationRequest
│   └── analytics.ts            # AnalyticsSummary, RecentFlag
├── services/
│   ├── api.ts                  # Axios instance with auth/error interceptors
│   ├── auth.ts                 # login, register, logout, getCurrentUser
│   ├── products.ts             # CRUD + generateCodes, getCodes, revokeCode
│   ├── verification.ts         # verifyCode, verifyCodeWithContext (mock-aware)
│   ├── mockVerification.ts     # Mock data for demo mode (no backend needed)
│   └── analytics.ts            # getSummary
├── routes/
│   └── index.tsx               # <AppRoutes /> — all route definitions
├── pages/
│   ├── HomePage.tsx            # Landing page (fully built, Tailwind)
│   ├── SignInPage.tsx          # Login form (inline styles)
│   ├── SignUpPage.tsx          # Register form (inline styles)
│   ├── ScanPage.tsx            # QR scanner + manual input (inline styles)
│   ├── ResultPage.tsx          # SUSPICIOUS/FAKE result (inline styles)
│   ├── VerifyPage.tsx          # GENUINE verified product (Tailwind)
│   ├── HistoryPage.tsx         # Scan history list with modal (Tailwind)
│   └── [placeholder pages]     # Dashboard, Product, Analytics, Profile — stubs
├── components/
│   ├── QrScanner.tsx           # Reusable html5-qrcode wrapper
│   ├── NafdacBanner.tsx        # NAFDAC compliance section
│   ├── WhyTrustEatSection.tsx  # Feature grid
│   ├── layout/
│   │   ├── Layout.tsx          # Shell: Navbar + Outlet + Footer + BottomNav
│   │   ├── Navbar.tsx          # Desktop top nav + mobile hamburger
│   │   ├── Footer.tsx          # Footer (home page only)
│   │   └── BottomNav.tsx       # Mobile fixed bottom tab bar (not on home)
│   └── ui/
│       ├── Button.tsx          # Button (forwards all button props)
│       ├── Card.tsx            # Card, CardHeader, CardContent
│       ├── Input.tsx           # Labeled input with error
│       ├── TextArea.tsx        # Labeled textarea with error
│       ├── Badge.tsx           # Status pill (default|success|warning|danger|info)
│       └── Spinner.tsx         # Loading spinner (sm|md|lg)
```

## Routing
- Routes defined in src/routes/index.tsx using constants from src/constants/routes.ts
- Layout wraps most pages via `<Route element={<Layout/>}>`
- /login and /register are OUTSIDE Layout (standalone full-screen pages)
- Route constants: HOME(/), LOGIN, REGISTER, DASHBOARD, SCAN, RESULT(/result/:code), PRODUCT(/product/:id), VERIFY(/verify/:code), ANALYTICS, HISTORY, PROFILE

## Styling — Hybrid Approach (IMPORTANT)
- **Tailwind CSS** — Used in newer pages (HomePage, VerifyPage, HistoryPage, Navbar, Footer, BottomNav, all ui/* components)
- **Inline CSS objects** (`Record<string, React.CSSProperties>`) — Used in SignInPage, SignUpPage, ScanPage, ResultPage (designed to match Figma mockups pixel-perfectly)
- When modifying a file, match its existing styling approach. Do NOT convert inline styles to Tailwind or vice versa unless explicitly asked.
- Custom theme tokens in index.css: --color-brand-base(#3c7443), --color-brand-nav(#7da282), --color-brand-icons(#048340)

## Mock/Demo Mode
- When VITE_API_BASE_URL is not set, the app uses mockVerificationService instead of the real API
- Mock returns fake product data after 1.2s delay — fully testable without a backend
- Scanning any code → GENUINE result; scanning "FAKE" or "000000" → FAKE result; scanning "SUS" or "999999" → SUSPICIOUS result
- To switch to real API, set VITE_API_BASE_URL in .env (see .env.example)

## QR Scanning Flow (End-to-End)
1. User visits /scan → camera permission requested → live camera feed
2. QR detected → verificationService.verifyCode(code) called
3. GENUINE → navigate to /verify/:code (VerifyPage shows product details)
4. SUSPICIOUS/FAKE → navigate to /result/:code (ResultPage shows warning)
5. API error → inline error state with retry option
6. Manual fallback → "Enter NAFDAC Number" button shows text input form

## Verification Data Types
```typescript
interface VerificationResult {
  status: "GENUINE" | "SUSPICIOUS" | "FAKE";
  reason: string;
  product: { id, name, description, category, imageUrl, batchNumber,
             manufactureDate, expiryDate, manufacturer: { name, isVerified },
             verificationCode } | null;
  scanStats?: { scansInWindow, distinctLocationsInWindow, windowHours };
}
```

## Key Architecture Notes
- **No auth flow yet** — Sign-in/sign-up pages only console.log on submit. No auth context, no protected routes.
- **React Query is set up** (QueryClientProvider in main.tsx) but only used in VerifyPage and ResultPage so far. Other pages use hardcoded/dummy data.
- **BottomNav** — in Layout.tsx, shows on all pages except Home. hidden on md+ (desktop). DO NOT add bottom navs inside individual pages — it causes duplicates.
- **Button component** — forwards all standard button HTML props (onClick, disabled, type, etc.)
- **ResultPage** — uses ROUTES.SCAN and ROUTES.HOME (not ROUTES.REPORTS which doesn't exist)

## When Adding Features
1. Read the existing file(s) you'll be modifying to understand their conventions
2. Match the styling approach (Tailwind vs inline) of the file you're editing
3. Use existing UI components from src/components/ui/ when possible
4. Use verificationService from src/services/verification.ts for verification API calls
5. Use React Query (useQuery/useMutation) for any new data fetching
6. Run `npm run build` and `npm run lint` after changes
7. Check for unused imports and remove them
