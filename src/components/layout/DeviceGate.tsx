import { Link } from "react-router";
import { Smartphone, TabletSmartphone } from "lucide-react";
import { ROUTES } from "../../constants";
import { useMediaQuery } from "../../hooks/useMediaQuery";

type DeviceRequirement = "mobile" | "tablet-desktop";

interface DeviceGateProps {
  allow: DeviceRequirement;
  children: React.ReactNode;
}

export function DeviceGate({ allow, children }: DeviceGateProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const allowed = allow === "mobile" ? isMobile : !isMobile;

  if (allowed) return <>{children}</>;

  return <DeviceRestrictionScreen allow={allow} />;
}

function DeviceRestrictionScreen({ allow }: { allow: DeviceRequirement }) {
  const isConsumerOnly = allow === "mobile";
  const Icon = isConsumerOnly ? Smartphone : TabletSmartphone;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f2f7f7] px-5 py-10">
      <section className="w-full max-w-[460px] rounded-2xl border border-green-100 bg-white px-6 py-9 text-center shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-8 w-8" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          {isConsumerOnly
            ? "Mobile Device Required"
            : "Tablet or Desktop Required"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          {isConsumerOnly
            ? "Consumer access is only allowed on a mobile device. Please open TrustEats on your phone to continue."
            : "This workspace is only available on a tablet or desktop device. Please use a larger screen to continue."}
        </p>

        <Link
          to={ROUTES.HOME}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}
