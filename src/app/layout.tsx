import { IBM_Plex_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/layout/LenisProvider";

const ibmPlex = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Autoikigai \u2014 AI Employees for Agencies",
  description:
    "We build AI employees for agencies \u2014 systems that handle outreach, follow-ups, onboarding, and reporting. 24/7, no salary, no sick days.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlex.variable} ${GeistMono.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <LenisProvider>
          <div className="page">
            <div className="frame">
              <Navbar />
              <div className="flex-grow">{children}</div>
              <Footer />
            </div>
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
