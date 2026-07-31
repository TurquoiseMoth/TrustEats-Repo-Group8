import { useState } from "react";
import { ChevronRight } from "lucide-react";
import logo from "../../assets/logo.png";

// ─── Data ───────────────────────────────────────────────────────────
interface FooterLink {
  label: string;
  href: string;
}

const companyLinks: FooterLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "News", href: "/news" },
];

const supportLinks: FooterLink[] = [
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
  { label: "Help Center", href: "/help" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

// ─── Brand SVG Icons ────────────────────────────────────────────────

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const SnapchatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 11a7 7 0 0 1-3.5 6.1c-.5.3-1 .5-1.5.7-.2.1-.3.3-.3.5 0 .3.2.7.5.9.6.4 1.2.6 1.3 1 .1.5-.5 1-1 1H9c-.5 0-1.1-.5-1-1 .1-.4.7-.6 1.3-1 .3-.2.5-.6.5-.9 0-.2-.1-.4-.3-.5-.5-.2-1-.4-1.5-.7A7 7 0 0 1 5 11V8c0-3.9 3.1-5 7-5s7 1.1 7 5v3z" />
  </svg>
);

// ─── Sub-components ─────────────────────────────────────────────────

interface FooterLinkColumnProps {
  title: string;
  links: FooterLink[];
}

function FooterLinkColumn({ title, links }: FooterLinkColumnProps) {
  return (
    <div className="flex flex-col">
      <h4 className="mb-5 text-[16px] font-extrabold text-white">{title}</h4>
      <ul className="flex flex-col gap-3.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-[14px] font-normal text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main Footer ────────────────────────────────────────────────────

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: integrate with newsletter API
    setEmail("");
  };

  const socialIcons = [
    { icon: FacebookIcon, href: "#facebook", label: "Facebook" },
    { icon: WhatsAppIcon, href: "#whatsapp", label: "WhatsApp" },
    { icon: InstagramIcon, href: "#instagram", label: "Instagram" },
    { icon: YouTubeIcon, href: "#youtube", label: "YouTube" },
    { icon: SnapchatIcon, href: "#snapchat", label: "Snapchat" },
  ];

  return (
    <footer className="bg-primary/90">
      {/* ── Top: Brand + Links + Newsletter ─────────────── */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          {/* Brand column */}
          <div className="flex flex-col gap-3">
            <img src={logo} alt="TrustEats" className="h-8 w-auto brightness-0 invert" />
            <p className="text-[15px] font-semibold text-white">Scan, Verify, Shop with Confidence</p>
            <p className="text-[14px] font-normal leading-relaxed text-white/60">
              Empowering consumers and manufacturers with transparent,
              trustworthy food verification through QR technology.
            </p>
            <div className="mt-1 flex items-center gap-3">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center text-white/50 transition-colors hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <FooterLinkColumn title="Company" links={companyLinks} />

          {/* Support links */}
          <FooterLinkColumn title="Support" links={supportLinks} />

          {/* Newsletter */}
          <div className="flex flex-col">
            <h4 className="mb-4 text-[16px] font-extrabold text-white">
              Stay Updated
            </h4>
            <p className="mb-5 text-[14px] leading-relaxed text-white/60">
              Subscribe to our newsletter for the latest updates on food
              safety and verification.
            </p>

            <form onSubmit={handleSubmit} className="relative w-full max-w-xs">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full rounded-2xl bg-white py-3.5 pl-5 pr-14 text-[14px] text-gray-800 placeholder-gray-400 outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary/90"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Divider ─────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="h-0.5 w-full bg-white/20" />
      </div>

      {/* ── Bottom: Copyright ────────────────────────── */}
      <div className="mx-auto flex max-w-7xl items-center justify-center px-6 pb-8 pt-6 lg:px-10">
        <p className="text-center text-[13px] text-white/60">
          &copy; 2026 TrustEat. All Rights Reserved. | Privacy Policy | Terms of Services
        </p>
      </div>
    </footer>
  );
}

export default Footer;
