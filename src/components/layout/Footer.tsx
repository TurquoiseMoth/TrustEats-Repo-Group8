import { useState } from "react";
import {
  MessageCircle,
  Camera,
  Video,
  Globe,
  Ghost,
  ChevronRight,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

interface SocialIcon {
  icon: LucideIcon;
  href: string;
  label: string;
}

const socialIcons: SocialIcon[] = [
  { icon: Globe, href: "#facebook", label: "Facebook" },
  { icon: MessageCircle, href: "#whatsapp", label: "WhatsApp" },
  { icon: Camera, href: "#instagram", label: "Instagram" },
  { icon: Video, href: "#youtube", label: "YouTube" },
  { icon: Ghost, href: "#snapchat", label: "Snapchat" },
];

// ─── Sub-components ─────────────────────────────────────────────────

interface FooterLinkColumnProps {
  title: string;
  links: FooterLink[];
}

function FooterLinkColumn({ title, links }: FooterLinkColumnProps) {
  return (
    <div className="flex flex-col">
      <h4 className="mb-4 text-[15px] font-bold text-white">{title}</h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-[14px] font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SocialIconsRowProps {
  icons: SocialIcon[];
}

function SocialIconsRow({ icons }: SocialIconsRowProps) {
  return (
    <div className="flex items-center gap-4">
      {icons.map((social) => (
        <a
          key={social.label}
          href={social.href}
          aria-label={social.label}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <social.icon className="h-4 w-4" />
        </a>
      ))}
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

  return (
    <footer className="bg-[#2D5A3D]">
      {/* ── Top: Brand + Social ──────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand column */}
          <div className="flex max-w-sm flex-col gap-4">
            {/* Logo placeholder */}
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/15">
              <span className="text-lg font-bold text-white">TE</span>
            </div>

            <h3 className="text-[22px] font-bold text-white">TrustEats</h3>

            <p className="text-[13px] font-medium leading-relaxed text-white/70">
              Empowering consumers and manufacturers with transparent,
              trustworthy food verification through QR technology.
            </p>

            <SocialIconsRow icons={socialIcons} />
          </div>

          {/* Link columns + Newsletter */}
          <div className="flex flex-1 flex-col gap-10 md:flex-row md:gap-16 lg:gap-24">
            {/* Link columns */}
            <div className="flex gap-12">
              <FooterLinkColumn title="Company" links={companyLinks} />
              <FooterLinkColumn title="Support" links={supportLinks} />
            </div>

            {/* Newsletter */}
            <div className="flex max-w-xs flex-col">
              <h4 className="mb-3 text-[15px] font-bold text-white">
                Stay Updated
              </h4>
              <p className="mb-4 text-[13px] leading-relaxed text-white/70">
                Subscribe to our newsletter for the latest updates on food
                safety and verification.
              </p>

              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl bg-white py-3 pl-4 pr-12 text-[14px] text-gray-800 placeholder-gray-400 outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className={twMerge(
                    clsx(
                      "absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#2D5A3D] text-white transition-colors hover:bg-[#3a7250]",
                    ),
                  )}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ─────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px w-full bg-white/15" />
      </div>

      {/* ── Bottom: Copyright ────────────────────────── */}
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-[#F59E0B]" />
          <span className="text-[13px] text-white/60">
            &copy; {new Date().getFullYear()} TrustEats. All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/privacy"
            className="text-[13px] text-white/60 transition-colors hover:text-white/80"
          >
            Privacy
          </a>
          <a
            href="/terms"
            className="text-[13px] text-white/60 transition-colors hover:text-white/80"
          >
            Terms
          </a>
          <a
            href="/cookies"
            className="text-[13px] text-white/60 transition-colors hover:text-white/80"
          >
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
