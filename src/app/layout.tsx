import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata = {
  title: "Autoikigai — AI Architecture",
  description: "We architect autonomous AI systems that scale.",
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
    <html lang="en" className={bebas.variable}>
      <body className="antialiased bg-black text-white" suppressHydrationWarning>
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
