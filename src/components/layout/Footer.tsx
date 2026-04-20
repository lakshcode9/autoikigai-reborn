import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Reactivation", href: "/reactivation" },
  { label: "Work", href: "/#case-studies" },
  { label: "Contact", href: "https://cal.com/ラクシュ-9q0fjl/intro-meeting-for-businesses", external: true },
];

export function Footer() {
  return (
    <footer
      className="px-6 md:px-10 py-6"
      style={{ borderTop: "1px dashed var(--border-default)" }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/autoikigai-logo.png"
              alt="Autoikigai"
              width={20}
              height={20}
              className="rounded-full"
            />
          </Link>
          <span
            className="text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            &copy; {new Date().getFullYear()} Autoikigai
          </span>
        </div>

        {/* Right: Links */}
        <div className="flex items-center gap-5">
          {FOOTER_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-link"
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.label} href={link.href} className="mono-link">
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
