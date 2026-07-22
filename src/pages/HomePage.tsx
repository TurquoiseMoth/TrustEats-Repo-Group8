import { CheckCheckIcon, User, Landmark, PackagePlus, QrCode, ScanLine, BadgeCheck, Scan, Factory } from "lucide-react"
import { Card, RoleCard } from "../components/ui"
import { WhyTrustEatSection } from "../components/WhyTrustEatSection"
function HomePage() {
    return (
        <section>
            <header className="flex flex-row items-center justify-between h-88">
                <div className="flex-1">
                    <h1 className="text-size-heading font-bold leading-tight">Verify Every Product.</h1>
                    <h2 className="text-size-heading font-bold leading-tight text-brand-base">Trust Every Bite.</h2>
                    <p>TrustEats helps you verify the authenticity of food products in seconds using a simple QR scan.</p>
                </div>
                <div className="shrink-0 -mt-24">
                    <img src="/assets/ketchup-bottle.png" alt="TrustEats scanning a ketchup bottle" className="w-35" />
                </div>
            </header>

            <div className="flex flex-row gap-4">
                <Card className="border-0 bg-white rounded-[20px] shadow-[0_3px_10px_rgba(0,0,0,0.12)] flex flex-col items-center gap-4 px-4 py-8">
                    <CheckCheckIcon className="w-9.5 h-9.5 text-[#14833B]" />
                    <p className="font-semibold text-[18px] text-[#2F3437] text-center leading-[1.15]">Authentic Products</p>
                </Card>
                <Card className="border-0 bg-white rounded-[20px] shadow-[0_3px_10px_rgba(0,0,0,0.12)] flex flex-col items-center gap-4 px-4 py-8">
                    <User className="w-9.5 h-9.5 text-[#14833B]" fill="currentColor" />
                    <p className="font-semibold text-[18px] text-[#2F3437] text-center leading-[1.15]">Consumer Safety</p>
                </Card>
                <Card className="border-0 bg-white rounded-[20px] shadow-[0_3px_10px_rgba(0,0,0,0.12)] flex flex-col items-center gap-4 px-4 py-8">
                    <Landmark className="w-9.5 h-9.5 text-[#14833B]" fill="currentColor" />
                    <p className="font-semibold text-[18px] text-[#2F3437] text-center leading-[1.15]">NAFDAC Aligned</p>
                </Card>
            </div>

            <div className="relative mt-16">
                <div className="absolute left-1/2 top-0 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 bg-[#f0f8ff] px-5">
                    <span className="h-[2px] w-8 bg-[#9AA8B4]" />
                    <h2 className="whitespace-nowrap text-[26px] font-bold text-[#2F3437]">
                        How <span className="text-[#14833B]">TrustEats</span> Works
                    </h2>
                </div>

                <div className="mx-auto max-w-[1100px] rounded-[30px] border-[1.5px] border-[#A9B8C5] px-12 pt-20 pb-14">
                    <div className="grid grid-cols-2 justify-items-center gap-x-20 gap-y-16">
                        <div className="flex w-[200px] flex-col items-center text-center">
                            <div className="mb-3.5 flex h-16 w-16 items-center justify-center rounded-full bg-[#CFE9E3]">
                                <PackagePlus className="h-7 w-7 text-[#14833B]" />
                            </div>
                            <p className="mb-2.5 text-[16px] font-medium text-[#2F3437]">1.</p>
                            <div className="h-[60px]">
                                <p className="text-[17px] font-medium leading-[1.35] text-[#2F3437]">
                                    Manufacturer<br />Register Product &<br />Batch
                                </p>
                            </div>
                        </div>

                        <div className="flex w-[200px] flex-col items-center text-center">
                            <div className="mb-3.5 flex h-16 w-16 items-center justify-center rounded-full bg-[#CFE9E3]">
                                <QrCode className="h-7 w-7 text-[#14833B]" />
                            </div>
                            <p className="mb-2.5 text-[16px] font-medium text-[#2F3437]">2.</p>
                            <div className="h-[60px]">
                                <p className="text-[17px] font-medium leading-[1.35] text-[#2F3437]">
                                    Unique QR Code<br />Generated for Each<br />Batch
                                </p>
                            </div>
                        </div>

                        <div className="flex w-[200px] flex-col items-center text-center">
                            <div className="mb-3.5 flex h-16 w-16 items-center justify-center rounded-full bg-[#CFE9E3]">
                                <ScanLine className="h-7 w-7 text-[#14833B]" />
                            </div>
                            <p className="mb-2.5 text-[16px] font-medium text-[#2F3437]">3.</p>
                            <div className="h-[60px]">
                                <p className="text-[17px] font-medium leading-[1.35] text-[#2F3437]">
                                    Consumer Scans QR<br />Code on Product
                                </p>
                            </div>
                        </div>

                        <div className="flex w-[200px] flex-col items-center text-center">
                            <div className="mb-3.5 flex h-16 w-16 items-center justify-center rounded-full bg-[#CFE9E3]">
                                <BadgeCheck className="h-7 w-7 text-[#14833B]" />
                            </div>
                            <p className="mb-2.5 text-[16px] font-medium text-[#2F3437]">4.</p>
                            <div className="h-[60px]">
                                <p className="text-[17px] font-medium leading-[1.35] text-[#2F3437]">
                                    Get Instant Verification<br />Result
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-20 flex flex-col items-center">
                <h2 className="text-[28px] font-bold leading-tight text-[#2F3437]">
                    Be A <span className="text-brand-base">TrustEats</span> Member
                </h2>
                <p className="mt-4 text-[15px] font-medium text-[#9CA3AF]">
                    Choose your role to get started
                </p>

                <div className="mt-10 flex flex-col gap-7">
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

            <Card className="mt-20 border border-[#E5E7EB] bg-[#F8FAFC] rounded-[32px] px-10 pt-12 pb-14 shadow-[0_3px_10px_rgba(0,0,0,0.06)]">
                <h2 className="text-[28px] font-bold leading-tight text-[#2F3437]">
                    About <span className="text-brand-base">Us</span>
                </h2>

                <p className="mt-5 max-w-[520px] text-[16px] font-medium leading-[1.7] text-[#6B7280]">
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

                <div className="mt-12 w-full overflow-hidden rounded-[24px] border border-[#E5E7EB]">
                    <img
                        src="/assets/happyfamily.png"
                        alt="Happy family trusting verified food products"
                        className="h-auto w-full object-cover"
                    />
                </div>
            </Card>

            <WhyTrustEatSection />
        </section>

    )
}

export default HomePage
