import { CheckCheckIcon, User, Landmark, PackagePlus, QrCode, ScanLine, BadgeCheck, FlaskConical, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import { Card, RoleCard, Button } from "../components/ui"
import { WhyTrustEatSection } from "../components/WhyTrustEatSection"
import { NafdacBanner } from "../components/NafdacBanner"
import { ROUTES } from "../constants"
import { isMockMode, setMockMode } from "../services/mockMode"
import { MOCK_ACCOUNTS } from "../services/mockAuth"

const ConsumerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M29.2167 12.9499C29.1001 12.9333 28.9834 12.9333 28.8667 12.9499C26.2834 12.8666 24.2334 10.7499 24.2334 8.14992C24.2334 5.49992 26.3834 3.33325 29.0501 3.33325C31.7001 3.33325 33.8667 5.48325 33.8667 8.14992C33.8501 10.7499 31.8001 12.8666 29.2167 12.9499Z" fill="#FEFEFE"/>
    <path d="M34.6501 24.4999C32.7834 25.7499 30.1667 26.2166 27.7501 25.8999C28.3834 24.5333 28.7167 23.0166 28.7334 21.4166C28.7334 19.7499 28.3667 18.1666 27.6667 16.7833C30.1334 16.4499 32.7501 16.9166 34.6334 18.1666C37.2667 19.8999 37.2667 22.7499 34.6501 24.4999Z" fill="#FEFEFE"/>
    <path d="M10.7334 12.9499C10.8501 12.9333 10.9668 12.9333 11.0834 12.9499C13.6668 12.8666 15.7168 10.7499 15.7168 8.14992C15.7168 5.48325 13.5668 3.33325 10.9001 3.33325C8.2501 3.33325 6.1001 5.48325 6.1001 8.14992C6.1001 10.7499 8.1501 12.8666 10.7334 12.9499Z" fill="#FEFEFE"/>
    <path d="M10.9166 21.4167C10.9166 23.0333 11.2666 24.5667 11.9 25.95C9.54995 26.2 7.09995 25.7 5.29995 24.5167C2.66662 22.7667 2.66662 19.9167 5.29995 18.1667C7.08328 16.9667 9.59995 16.4833 11.9666 16.75C11.2833 18.15 10.9166 19.7333 10.9166 21.4167Z" fill="#FEFEFE"/>
    <path d="M20.2 26.45C20.0667 26.4333 19.9167 26.4333 19.7667 26.45C16.7 26.35 14.25 23.8333 14.25 20.7333C14.2667 17.5667 16.8167 15 20 15C23.1667 15 25.7333 17.5667 25.7333 20.7333C25.7167 23.8333 23.2833 26.35 20.2 26.45Z" fill="#FEFEFE"/>
    <path d="M14.7833 29.8999C12.2666 31.5832 12.2666 34.3499 14.7833 36.0166C17.6499 37.9332 22.3499 37.9332 25.2166 36.0166C27.7333 34.3332 27.7333 31.5666 25.2166 29.8999C22.3666 27.9832 17.6666 27.9832 14.7833 29.8999Z" fill="#FEFEFE"/>
  </svg>
)

const ManufacturerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M17.6666 6.91659C17.6666 7.23325 17.3999 7.49992 17.0833 7.49992H15.1999C11.5999 7.49992 8.66658 10.4333 8.66658 14.0333V29.4166C8.66658 29.7333 8.39992 29.9999 8.08325 29.9999H6.91659C4.93325 29.9999 3.33325 28.3999 3.33325 26.4166V6.91659C3.33325 4.93325 4.93325 3.33325 6.91659 3.33325H14.0833C16.0666 3.33325 17.6666 4.93325 17.6666 6.91659Z" fill="#FEFEFE"/>
    <path d="M36.6666 6.91659V26.4166C36.6666 28.3999 35.0666 29.9999 33.0833 29.9999H32.0333C31.7166 29.9999 31.4499 29.7333 31.4499 29.4166V14.0333C31.4499 10.4333 28.5166 7.49992 24.9166 7.49992H22.9166C22.5999 7.49992 22.3333 7.23325 22.3333 6.91659C22.3333 4.93325 23.9333 3.33325 25.9166 3.33325H33.0833C35.0666 3.33325 36.6666 4.93325 36.6666 6.91659Z" fill="#FEFEFE"/>
    <path d="M24.9167 10H15.2001C12.9667 10 11.1667 11.8 11.1667 14.0333V32.6333C11.1667 34.8667 12.9667 36.6667 15.2001 36.6667H17.9167C18.3834 36.6667 18.7501 36.3 18.7501 35.8333V31.6667C18.7501 30.9833 19.3167 30.4167 20.0001 30.4167C20.6834 30.4167 21.2501 30.9833 21.2501 31.6667V35.8333C21.2501 36.3 21.6167 36.6667 22.0834 36.6667H24.9334C27.1501 36.6667 28.9501 34.8667 28.9501 32.65V14.0333C28.9501 11.8 27.1501 10 24.9167 10ZM23.3334 24.5833H16.6667C15.9834 24.5833 15.4167 24.0167 15.4167 23.3333C15.4167 22.65 15.9834 22.0833 16.6667 22.0833H23.3334C24.0167 22.0833 24.5834 22.65 24.5834 23.3333C24.5834 24.0167 24.0167 24.5833 23.3334 24.5833ZM23.3334 19.5833H16.6667C15.9834 19.5833 15.4167 19.0167 15.4167 18.3333C15.4167 17.65 15.9834 17.0833 16.6667 17.0833H23.3334C24.0167 17.0833 24.5834 17.65 24.5834 18.3333C24.5834 19.0167 24.0167 19.5833 23.3334 19.5833Z" fill="#FEFEFE"/>
  </svg>
)

const features = [
    { icon: CheckCheckIcon, label: "Authentic Products" },
    { icon: User, label: "Consumer Safety" },
    { icon: Landmark, label: "NAFDAC Aligned" },
]

const faqs = [
    {
        q: "What is TrustEats?",
        a: "TrustEats is a food product verification platform that lets Nigerian consumers confirm the authenticity of packaged food products by scanning QR codes linked to NAFDAC records.",
    },
    {
        q: "How do I verify a product?",
        a: "Tap \"Scan a Product\" on the home page and point your camera at the QR code on the product label. You can also enter the NAFDAC number manually using the fallback option.",
    },
    {
        q: "What do the verification results mean?",
        a: "GENUINE means the product passed all checks. SUSPICIOUS means the batch is expired or flagged for review. FAKE means the code could not be verified and may be counterfeit.",
    },
    {
        q: "Who can use TrustEats?",
        a: "Consumers can scan and verify products, manufacturers can register products and generate QR codes, and administrators can monitor reports and platform activity.",
    },
]

function HomePage() {
    const [mockOn, setMockOn] = useState<boolean>(isMockMode())
    const [openFaq, setOpenFaq] = useState<string | null>(faqs[0].q)

    useEffect(() => {
        const sync = () => setMockOn(isMockMode())
        window.addEventListener("trusteats:mock-mode", sync)
        return () => window.removeEventListener("trusteats:mock-mode", sync)
    }, [])

    const toggleMockMode = () => {
        setMockMode(!isMockMode())
    }

    return (
        <section>
            {/* ── Hero Section ─────────────────────────── */}
            <header>
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 pt-5 pb-14 md:flex-row md:items-center md:justify-between md:gap-16 md:pt-8 md:pb-20 lg:px-10 lg:pt-12 lg:pb-24">
                    {/* Left column — text content */}
                    <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start gap-4 md:block">
                            <div className="ml-4 flex min-h-[240px] w-[210px] shrink-0 flex-col md:ml-0 md:h-auto md:w-auto md:min-w-0">
                                <h1 className="text-4xl font-bold leading-[1.1] text-text-main sm:text-[42px] md:text-[46px] lg:text-[52px]">
                                    Verify Every Product.<br />
                                    <span className="text-primary">Trust Every Bite.</span>
                                </h1>

                                <p className="mt-2 max-w-md text-base leading-relaxed text-gray-500 md:mt-7 md:text-lg">
                                    TrustEats helps you verify the authenticity of food products in seconds using a simple QR scan.
                                </p>
                            </div>

                            <div className="relative flex h-[158px] w-[190px] shrink-0 items-center justify-center md:hidden">
                                <svg
                                    viewBox="0 0 200 200"
                                    aria-hidden="true"
                                    className="absolute left-1/2 top-1/2 h-56 w-48 -translate-x-1/2 -translate-y-1/2 sm:h-64 sm:w-56"
                                >
                                    <path
                                        fill="rgba(4,131,64,0.20)"
                                        d="M143.7 39.3c11.4 8.4 18.2 22.1 23 36.1 4.8 14 7.6 28.4 4.8 42.1-2.8 13.7-11.2 26.7-22.7 36.1-11.5 9.4-26.1 15.2-40.9 16.1-14.8.9-29.8-3.1-42.6-11.5-12.8-8.4-23.4-21.2-28.7-35.8-5.3-14.6-5.3-31 0.3-44.9 5.6-13.9 16.7-25.3 29-33.6 12.3-8.3 25.8-13.5 39-14.8 13.2-1.3 27.4 1.7 38.8 10.2z"
                                    />
                                </svg>
                                <img
                                    src="/assets/ketchup-bottle.png"
                                    alt="TrustEats verifying a food product"
                                    className="relative h-full w-full object-contain"
                                />
                            </div>
                        </div>

                        <div className="mt-8 hidden flex-col gap-3 sm:flex-row md:mt-9 md:flex md:gap-4">
                            <Link to={ROUTES.SCAN}>
                                <Button className="rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:px-8 md:py-3.5 md:text-[15px]">
                                    Scan a Product
                                    <QrCode className="ml-2 inline h-4 w-4" />
                                </Button>
                            </Link>
                            <Link to={ROUTES.SCAN}>
                                <Button className="rounded-2xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-text-main transition-colors hover:bg-gray-50 md:px-8 md:py-3.5 md:text-[15px]">
                                    Verify with NAFDAC NO.
                                </Button>
                            </Link>
                        </div>

                        {/* Feature cards */}
                        <div className="mx-4 mt-8 grid grid-cols-3 gap-3 sm:gap-4 md:mx-0 md:mt-10 md:gap-5">
                            {features.map((feature) => (
                                <div
                                    key={feature.label}
                                    className="flex flex-col items-center rounded-2xl bg-white px-3 py-4 text-center shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] md:rounded-3xl md:px-5 md:py-7 md:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                                >
                                    <feature.icon className="h-6 w-6 text-text-secondary md:h-8 md:w-8" />
                                    <p className="mt-2 text-xs font-semibold leading-snug text-text-main md:mt-3 md:text-sm lg:text-[15px]">
                                        {feature.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right column — product image */}
                    <div className="relative hidden w-full shrink-0 items-center justify-center sm:w-3/5 md:flex md:w-2/5 md:justify-end">
                        <div className="relative">
                            <svg
                                viewBox="0 0 200 200"
                                aria-hidden="true"
                                className="absolute left-1/2 top-1/2 h-[440px] w-[400px] -translate-x-1/2 -translate-y-1/2 md:h-[500px] md:w-[440px] lg:h-[600px] lg:w-[540px] xl:h-[640px] xl:w-[580px]"
                            >
                                <path
                                    fill="rgba(4,131,64,0.20)"
                                    d="M143.7 39.3c11.4 8.4 18.2 22.1 23 36.1 4.8 14 7.6 28.4 4.8 42.1-2.8 13.7-11.2 26.7-22.7 36.1-11.5 9.4-26.1 15.2-40.9 16.1-14.8.9-29.8-3.1-42.6-11.5-12.8-8.4-23.4-21.2-28.7-35.8-5.3-14.6-5.3-31 0.3-44.9 5.6-13.9 16.7-25.3 29-33.6 12.3-8.3 25.8-13.5 39-14.8 13.2-1.3 27.4 1.7 38.8 10.2z"
                                />
                            </svg>
                            <img
                                src="/assets/ketchup-bottle.png"
                                alt="TrustEats verifying a food product"
                                className="relative w-[280px] md:w-[360px] lg:w-[460px] xl:w-[500px]"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* ── How TrustEats Works ──────────────────── */}
            <div className="relative mx-auto mt-8 w-full max-w-7xl px-6 md:mt-24 lg:px-10">
                <div className="absolute left-1/2 top-0 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 bg-background px-5">
                    <span className="h-0.5 w-8 bg-gray-400" />
                    <h2 className="whitespace-nowrap text-[22px] font-bold text-text-main md:text-[26px]">
                        How <span className="text-primary">TrustEats</span> Works
                    </h2>
                </div>

                <div className="w-full rounded-[30px] border-[1.5px] border-gray-400 px-6 pt-20 pb-14 lg:px-10">
                    <div className="grid grid-cols-1 justify-items-center gap-12 sm:grid-cols-2 md:grid-cols-2 md:gap-x-20 md:gap-y-16 lg:grid-cols-4">
                        <div className="flex w-50 flex-col items-center text-center">
                            <div className="mb-3.5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                                <PackagePlus className="h-7 w-7 text-text-secondary" />
                            </div>
                            <p className="mb-2.5 text-[16px] font-medium text-text-main">1.</p>
                            <div className="h-15">
                                <p className="text-[17px] font-medium leading-[1.35] text-text-main">
                                    Manufacturer<br />Register Product &<br />Batch
                                </p>
                            </div>
                        </div>

                        <div className="flex w-50 flex-col items-center text-center">
                            <div className="mb-3.5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                                <QrCode className="h-7 w-7 text-text-secondary" />
                            </div>
                            <p className="mb-2.5 text-[16px] font-medium text-text-main">2.</p>
                            <div className="h-15">
                                <p className="text-[17px] font-medium leading-[1.35] text-text-main">
                                    Unique QR Code<br />Generated for Each<br />Batch
                                </p>
                            </div>
                        </div>

                        <div className="flex w-50 flex-col items-center text-center">
                            <div className="mb-3.5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                                <ScanLine className="h-7 w-7 text-text-secondary" />
                            </div>
                            <p className="mb-2.5 text-[16px] font-medium text-text-main">3.</p>
                            <div className="h-15">
                                <p className="text-[17px] font-medium leading-[1.35] text-text-main">
                                    Consumer Scans QR<br />Code on Product
                                </p>
                            </div>
                        </div>

                        <div className="flex w-50 flex-col items-center text-center">
                            <div className="mb-3.5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                                <BadgeCheck className="h-7 w-7 text-text-secondary" />
                            </div>
                            <p className="mb-2.5 text-[16px] font-medium text-text-main">4.</p>
                            <div className="h-15">
                                <p className="text-[17px] font-medium leading-[1.35] text-text-main">
                                    Get Instant Verification<br />Result
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Be A TrustEats Member ────────────────── */}
            <div className="mx-auto mt-16 flex w-full max-w-7xl flex-col items-center px-6 md:mt-24 lg:px-10">
                <h2 className="text-[28px] font-bold leading-tight text-text-main">
                    Be A <span className="text-brand-base">TrustEats</span> Member
                </h2>
                <p className="mt-4 text-[15px] font-medium text-gray-400">
                    Choose your role to get started
                </p>

                <div className="mt-10 grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
                    <RoleCard
                        customIcon={<ConsumerIcon />}
                        title="I'm a Consumer"
                        description="Scan QR codes on products and verify authenticity instantly"
                        accentColor="text-primary"
                        backgroundColor="bg-[rgba(60,116,67,0.20)]"
                        buttonBgColor="bg-primary"
                        buttonText="Register as a User →"
                        buttonHref={ROUTES.REGISTER}
                        loginPrefix="Already have an account?"
                        loginText="Log in"
                        loginHref={ROUTES.LOGIN}
                    />
                    <RoleCard
                        customIcon={<ManufacturerIcon />}
                        title="I'm a Manufacturer"
                        description="Register products, generate QR codes, and build consumer trust"
                        accentColor="text-[#7C3AED]"
                        backgroundColor="bg-[rgba(60,116,67,0.20)]"
                        buttonBgColor="bg-[#7C3AED]"
                        buttonText="Register as Manufacturer →"
                        buttonHref={ROUTES.MANUFACTURER_SIGNUP}
                        loginPrefix="Already have an account?"
                        loginText="Log in"
                        loginHref={ROUTES.MANUFACTURER_LOGIN}
                    />
                </div>
            </div>

            {/* ── About Us ─────────────────────────────── */}
            <div id="about" className="mx-auto mt-16 w-full max-w-7xl px-6 md:mt-24 lg:px-10">
            <Card className="border border-gray-200 bg-gray-50 rounded-4xl pt-12 pb-14 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="order-1">
                        <h2 className="text-[28px] font-bold leading-tight text-text-main">
                            About <span className="text-brand-base">Us</span>
                        </h2>

                        <p className="mt-5 max-w-130 text-[16px] font-medium leading-[1.7] text-gray-500">
                            TrustEats is a digital platform dedicated to building trust in food supply chain. We empower manufacturers to increase product transparency and enable consumers to make informed, and safe choices.
                        </p>

                        <div className="mt-8 flex flex-col gap-5">
                            {[
                                "Aligned with NAFDAC standard",
                                "Promoting consumer safety",
                                "Fostering transparency",
                                "Building a safer food ecosystem",
                            ].map((point) => (
                                <div key={point} className="flex items-start gap-3">
                                    <CheckCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-text-secondary" />
                                    <p className="text-[15px] font-medium text-text-main">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="order-2 w-full overflow-hidden rounded-2xl border border-gray-200">
                        <img
                            src="/assets/happyfamily.png"
                            alt="Happy family trusting verified food products"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </Card>
            </div>

            {/* ── Why TrustEats ─────────────────────────── */}
            <div id="why-us">
            <WhyTrustEatSection />
            </div>

            {/* ── NAFDAC Banner ────────────────────────── */}
            <NafdacBanner />

            {/* ── FAQ ──────────────────────────────────── */}
            <div id="faq" className="mx-auto mt-16 w-full max-w-7xl px-6 md:mt-24 lg:px-10">
                <h2 className="text-center text-[28px] font-bold leading-tight text-text-main">
                    Frequently Asked <span className="text-brand-base">Questions</span>
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-10">
                    <div className="space-y-4">
                        {faqs.map((faq) => {
                            const open = openFaq === faq.q;
                            return (
                                <div key={faq.q} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(open ? null : faq.q)}
                                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                                        aria-expanded={open}
                                    >
                                        <span className="text-[15px] font-semibold text-text-main">{faq.q}</span>
                                        <ChevronDown
                                            className={`h-5 w-5 shrink-0 text-primary transition-transform ${
                                                open ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>
                                    {open && (
                                        <p className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-500">
                                            {faq.a}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Mock Mode Toggle (dev/demo) ─────────── */}
            <div className="mx-auto mt-16 w-full max-w-7xl px-6 pb-8 md:mt-20 lg:px-10">
                <div className="flex flex-col items-center gap-4 rounded-[30px] border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                        <FlaskConical className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-[20px] font-bold text-text-main">Demo Mode</h3>
                    <p className="max-w-md text-sm leading-relaxed text-gray-500">
                        Run the entire app on local mock data — no backend needed. Scan any QR code, log in,
                        or explore the dashboard with sample data.
                    </p>

                    <Button
                        onClick={toggleMockMode}
                        className={`mt-2 rounded-2xl px-8 py-3 text-sm font-semibold transition-colors ${
                            mockOn
                                ? "border border-gray-300 bg-white text-text-main hover:bg-gray-100"
                                : "bg-primary text-white hover:opacity-90"
                        }`}
                    >
                        {mockOn ? "Disable Mock Data" : "Enable Mock Data"}
                    </Button>

                    {mockOn && (
                        <div className="mt-4 w-full max-w-xl rounded-2xl bg-white p-5 text-left shadow-sm">
                            <p className="text-sm font-semibold text-text-main">Demo accounts</p>
                            <ul className="mt-3 space-y-2">
                                {MOCK_ACCOUNTS.map((account) => (
                                    <li key={account.email} className="flex flex-col gap-0.5 rounded-xl bg-gray-50 px-4 py-3">
                                        <span className="text-sm font-medium capitalize text-text-main">
                                            {account.user.role} — {account.email}
                                        </span>
                                        <span className="text-xs text-gray-500">{account.password}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-4 text-xs leading-relaxed text-gray-400">
                                Mock verification codes: anything scans as GENUINE. Use <span className="font-semibold">FAKE</span>,
                                <span className="font-semibold"> 000000</span>, <span className="font-semibold">SUS</span> or{" "}
                                <span className="font-semibold">999999</span> to test warning results.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>

    )
}

export default HomePage
