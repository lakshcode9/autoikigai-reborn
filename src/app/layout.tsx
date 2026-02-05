import { Bebas_Neue } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata = {
  title: "Autoikigai — AI Architecture",
  description: "We architect autonomous AI systems that scale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={bebas.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
