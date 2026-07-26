import { CheckCheckIcon, User, Landmark, PackagePlus, QrCode, ScanLine, BadgeCheck, Scan, Factory, ArrowRight } from "lucide-react"
import { Card, RoleCard, Button } from "../components/ui"
import { WhyTrustEatSection } from "../components/WhyTrustEatSection"
import { NafdacBanner } from "../components/NafdacBanner"
function HomePage() {
    return (
        <section>
            {/* ── Hero Section ─────────────────────────── */}
            <header className="flex flex-col items-center gap-8 py-12 md:flex-row md:items-center md:justify-between md:gap-12 md:py-20 lg:py-24">
                <div className="flex-1">
                    <h1 className="text-size-heading font-bold leading-tight md:text-[40px] lg:text-[48px]">Verify Every Product.</h1>
                    <h2 className="text-size-heading font-bold leading-tight text-brand-base md:text-[40px] lg:text-[48px]">Trust Every Bite.</h2>
                    <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#6B7280] md:text-[16px]">
                        TrustEats helps you verify the authenticity of food products in seconds using a simple QR scan.
                    </p>
                    <div className="mt-8 flex flex-row gap-4">
                        <Button className="cursor-pointer rounded-2xl bg-[#14833B] px-7 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90">
                            Scan a Product
                            <ArrowRight className="ml-2 inline h-4 w-4" />
                        </Button>
                        <Button className="cursor-pointer rounded-2xl border border-[#E5E7EB] bg-white px-7 py-3 text-[15px] font-semibold text-[#2F3437] transition-colors hover:bg-gray-50">
                            Verify with NAFDAC NO.
                        </Button>
                    </div>
                    <div className="mt-8 flex flex-row flex-wrap gap-4">
                        {[
                            { icon: CheckCheckIcon, label: "Authentic Products" },
                            { icon: User, label: "Consumer Safety" },
                            { icon: Landmark, label: "NAFDAC Aligned" },
                        ].map((badge) => (
                            <div key={badge.label} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-[0_2px_6px_rgba(0,0,0,0.08)] text-[#374151]">
                                <badge.icon className="h-4 w-4 text-[#14833B]" />
                                <span>{badge.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative flex w-full justify-center lg:w-1/2 lg:justify-end">
                    <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-[#E8F5E9] blur-3xl opacity-60" />
                    <img
                        src="/assets/ketchup-bottle.png"
                        alt="TrustEats scanning a ketchup bottle"
                        className="w-full max-w-lg object-contain"
                    />
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
                        loginPrefix="Already have an account?"
                        loginText="Log in"
                    />
                    <RoleCard
                        icon={Factory}
                        title="I'm a Manufacturer"
                        description="Register products, generate QR codes, and build consumer trust"
                        accentColor="text-[#7C3AED]"
                        backgroundColor="bg-[#F5F3FF]"
                        buttonBgColor="bg-[#7C3AED]"
                        buttonText="Register as Manufacturer →"
                        loginPrefix="Already have an account?"
                        loginText="Log in"
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
