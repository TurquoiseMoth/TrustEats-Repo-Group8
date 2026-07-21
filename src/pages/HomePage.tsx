// import Button from "../components/ui/Button"
// import {Link} from "react-router"
function HomePage() {
    return (
        <section className="flex flex-row items-center justify-between h-88">

            <div className="flex-1">
                <h1 className="text-size-heading font-bold leading-normal">Verify Every Product.</h1>
                <h2 className="text-size-heading font-bold leading-normal text-brand-base">Trust Every Bite.</h2>
                <p>TrustEats helps you verify the authenticity of food products in seconds using a simple QR scan.</p>
            </div>

            <div className="shrink-0 -mt-24">
                <img src="/assets/ketchup-bottle.png" alt="TrustEats scanning a ketchup bottle" className="w-35" />
            </div>

        </section>
    )
}

export default HomePage