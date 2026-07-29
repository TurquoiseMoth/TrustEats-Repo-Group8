import { CheckCheckIcon, User, Landmark, PackagePlus, QrCode, ScanLine, BadgeCheck, Scan, Factory, ArrowRight } from "lucide-react"
import { Link } from "react-router"
import { Card, RoleCard, Button } from "../components/ui"
import { WhyTrustEatSection } from "../components/WhyTrustEatSection"
import { NafdacBanner } from "../components/NafdacBanner"
import { ROUTES } from "../constants"

const features = [
    { icon: CheckCheckIcon, label: "Authentic Products" },
    { icon: User, label: "Consumer Safety" },
    { icon: Landmark, label: "NAFDAC Aligned" },
]

function HomePage() {
    return (
        <section>
            {/* ── Hero Section ─────────────────────────── */}
            <header>
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-14 md:flex-row md:items-center md:justify-between md:gap-16 md:px-12 md:py-20 lg:py-24">
                    {/* Left column — text content */}
                    <div className="flex min-w-0 flex-1 flex-col">
                        <h1 className="text-4xl font-bold leading-[1.1] text-[#2E3137] sm:text-[42px] md:text-[46px] lg:text-[52px]">
                            Verify Every Product.<br />
                            <span className="text-[#2E7D32]">Trust Every Bite.</span>
                        </h1>

                        <p className="mt-6 max-w-md text-base leading-relaxed text-[#6B7280] md:mt-7 md:text-lg">
                            TrustEats helps you verify the authenticity of food products in seconds using a simple QR scan.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-9 md:gap-4">
                            <Link to={ROUTES.SCAN}>
                                <Button className="rounded-2xl bg-[#14833B] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:px-8 md:py-3.5 md:text-[15px]">
                                    Scan a Product
                                    <ArrowRight className="ml-2 inline h-4 w-4" />
                                </Button>
                            </Link>
                            <Link to={ROUTES.SCAN}>
                                <Button className="rounded-2xl border border-[#E5E7EB] bg-white px-6 py-3 text-sm font-semibold text-[#2F3437] transition-colors hover:bg-gray-50 md:px-8 md:py-3.5 md:text-[15px]">
                                    Verify with NAFDAC NO.
                                </Button>
                            </Link>
                        </div>

                        {/* Feature cards */}
                        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4 md:mt-10 md:gap-5">
                            {features.map((feature) => (
                                <div
                                    key={feature.label}
                                    className="flex flex-col items-center rounded-2xl bg-white px-3 py-4 text-center shadow-sm md:rounded-3xl md:px-5 md:py-7 md:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                                >
                                    <feature.icon className="h-6 w-6 text-[#14833B] md:h-8 md:w-8" />
                                    <p className="mt-2 text-xs font-semibold leading-snug text-[#2F3437] md:mt-3 md:text-sm lg:text-[15px]">
                                        {feature.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right column — product image */}
                    <div className="flex w-full shrink-0 items-center justify-center sm:w-3/5 md:w-2/5 md:justify-end">
                        <img
                            src="/assets/ketchup-bottle.png"
                            alt="TrustEats verifying a food product"
                            className="w-full max-w-[200px] object-contain md:max-w-[300px] lg:max-w-[360px]"
                        />
                    </div>
                </div>
            </header>

            {/* ── How TrustEats Works ──────────────────── */}
            <div className="relative mt-16 md:mt-24">
                <div className="absolute left-1/2 top-0 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 bg-[#f0f8ff] px-5">
                    <span className="h-0.5 w-8 bg-[#9AA8B4]" />
                    <h2 className="whitespace-nowrap text-[22px] font-bold text-[#2F3437] md:text-[26px]">
                        How <span className="text-[#14833B]">TrustEats</span> Works
                    </h2>
                </div>

                <div className="mx-auto max-w-275 rounded-[30px] border-[1.5px] border-[#A9B8C5] px-6 pt-20 pb-14 md:px-12">
                    <div className="grid grid-cols-1 justify-items-center gap-12 sm:grid-cols-2 md:grid-cols-2 md:gap-x-20 md:gap-y-16 lg:grid-cols-4">
                        <div className="flex w-50 flex-col items-center text-center">
                            <div className="mb-3.5 flex h-16 w-16 items-center justify-center rounded-full bg-[#CFE9E3]">
                                <PackagePlus className="h-7 w-7 text-[#14833B]" />
                            </div>
                            <p className="mb-2.5 text-[16px] font-medium text-[#2F3437]">1.</p>
                            <div className="h-15">
                                <p className="text-[17px] font-medium leading-[1.35] text-[#2F3437]">
                                    Manufacturer<br />Register Product &<br />Batch
                                </p>
                            </div>
                        </div>

                        <div className="flex w-50 flex-col items-center text-center">
                            <div className="mb-3.5 flex h-16 w-16 items-center justify-center rounded-full bg-[#CFE9E3]">
                                <QrCode className="h-7 w-7 text-[#14833B]" />
                            </div>
                            <p className="mb-2.5 text-[16px] font-medium text-[#2F3437]">2.</p>
                            <div className="h-15">
                                <p className="text-[17px] font-medium leading-[1.35] text-[#2F3437]">
                                    Unique QR Code<br />Generated for Each<br />Batch
                                </p>
                            </div>
                        </div>

                        <div className="flex w-50 flex-col items-center text-center">
                            <div className="mb-3.5 flex h-16 w-16 items-center justify-center rounded-full bg-[#CFE9E3]">
                                <ScanLine className="h-7 w-7 text-[#14833B]" />
                            </div>
                            <p className="mb-2.5 text-[16px] font-medium text-[#2F3437]">3.</p>
                            <div className="h-15">
                                <p className="text-[17px] font-medium leading-[1.35] text-[#2F3437]">
                                    Consumer Scans QR<br />Code on Product
                                </p>
                            </div>
                        </div>

                        <div className="flex w-50 flex-col items-center text-center">
                            <div className="mb-3.5 flex h-16 w-16 items-center justify-center rounded-full bg-[#CFE9E3]">
                                <BadgeCheck className="h-7 w-7 text-[#14833B]" />
                            </div>
                            <p className="mb-2.5 text-[16px] font-medium text-[#2F3437]">4.</p>
                            <div className="h-15">
                                <p className="text-[17px] font-medium leading-[1.35] text-[#2F3437]">
                                    Get Instant Verification<br />Result
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Be A TrustEats Member ────────────────── */}
            <div className="mt-16 flex flex-col items-center md:mt-24">
                <h2 className="text-[28px] font-bold leading-tight text-[#2F3437]">
                    Be A <span className="text-brand-base">TrustEats</span> Member
                </h2>
                <p className="mt-4 text-[15px] font-medium text-[#9CA3AF]">
                    Choose your role to get started
                </p>

                <div className="mt-10 grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
                    <RoleCard
                        icon={Scan}
                        title="I'm a Consumer"
                        description="Scan QR codes on products and verify authenticity instantly"
                        accentColor="text-[#14833B]"
                        backgroundColor="bg-[#F0FDF4]"
                        buttonBgColor="bg-[#16A34A]"
                        buttonText="Register as a User →"
                        buttonHref={ROUTES.REGISTER}
                        loginPrefix="Already have an account?"
                        loginText="Log in"
                        loginHref={ROUTES.LOGIN}
                    />
                    <RoleCard
                        icon={Factory}
                        title="I'm a Manufacturer"
                        description="Register products, generate QR codes, and build consumer trust"
                        accentColor="text-[#7C3AED]"
                        backgroundColor="bg-[#F5F3FF]"
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
            <Card className="mt-16 border border-[#E5E7EB] bg-[#F8FAFC] rounded-4xl px-6 pt-12 pb-14 shadow-[0_3px_10px_rgba(0,0,0,0.06)] md:mt-24 md:px-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="order-1">
                        <h2 className="text-[28px] font-bold leading-tight text-[#2F3437]">
                            About <span className="text-brand-base">Us</span>
                        </h2>

                        <p className="mt-5 max-w-130 text-[16px] font-medium leading-[1.7] text-[#6B7280]">
                            TrustEats was built to fight counterfeit food products across Nigeria. We partner with manufacturers, regulators, and consumers to create a transparent supply chain where every product can be traced back to its source.
                        </p>

                        <div className="mt-8 flex flex-col gap-5">
                            {[
                                "Verified by NAFDAC and regulatory bodies",
                                "Trusted by thousands of Nigerian families",
                                "100% authentic product guarantee",
                                "Real-time QR code verification",
                            ].map((point) => (
                                <div key={point} className="flex items-start gap-3">
                                    <CheckCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#14833B]" />
                                    <p className="text-[15px] font-medium text-[#374151]">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="order-2 w-full overflow-hidden rounded-2xl border border-[#E5E7EB]">
                        <img
                            src="/assets/happyfamily.png"
                            alt="Happy family trusting verified food products"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </Card>

            {/* ── Why TrustEat ─────────────────────────── */}
            <WhyTrustEatSection />

            {/* ── NAFDAC Banner ────────────────────────── */}
            <NafdacBanner />
        </section>

    )
}

export default HomePage
