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
    <footer className="relative z-10 border-t border-white/5 bg-black">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-8">
        {/* Main row: logo — links — social */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Logo + copyright */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/autoikigai-logo.png"
                alt="AutoIkigai"
                width={28}
                height={28}
                className="rounded-full"
              />
            </Link>
            <span className="text-xs text-white/40 font-bebas tracking-widest">
              &copy; {new Date().getFullYear()} AUTOIKIGAI
            </span>
          </div>

          {/* Center: Navigation links */}
          <div className="flex items-center gap-6">
            {FOOTER_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/50 font-bebas tracking-wider hover:text-[#00E0FF] transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs text-white/50 font-bebas tracking-wider hover:text-[#00E0FF] transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Right: Status indicator */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00E0FF] animate-pulse" />
            <span className="text-xs font-bebas text-[#00E0FF]/70 tracking-widest">
              SYSTEMS ONLINE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
