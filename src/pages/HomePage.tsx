import { ShieldCheck, User, Landmark } from "lucide-react"
import { Card } from "../components/ui"
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
                <Card className="border-0 bg-[#FEFEFE] shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] flex flex-col items-center gap-2 py-6">
                    <ShieldCheck className="w-8 h-8 text-brand-icons" fill="currentColor" />
                    <p className="font-[590] align-center">Authentic Products</p>
                </Card>
                <Card className="border-0 bg-[#FEFEFE] shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] flex flex-col items-center gap-2 py-6">
                    <User className="w-8 h-8 text-brand-icons" fill="currentColor" />
                    <p className="font-[590] align-center">Consumer Safety</p>
                </Card>
                <Card className="border-0 bg-[#FEFEFE] shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] flex flex-col items-center gap-2 py-6">
                    <Landmark className="w-8 h-8 text-brand-icons" fill="currentColor" />
                    <p className="font-[590] align-center">NAFDAC Aligned</p>
                </Card>
            </div>
        </section>

    )
}

export default HomePage