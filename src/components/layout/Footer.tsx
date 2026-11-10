import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Problem", href: "/#problem" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/#about" },
  { label: "Apply", href: "/book-a-call" },
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
          <span
            className="text-xs hidden sm:inline"
            style={{ color: "var(--text-muted)", opacity: 0.8 }}
          >
            &mdash; Done-for-you B2B lead generation
          </span>
        </div>

        {/* Right: Links */}
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-center md:justify-start">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="mono-link">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
