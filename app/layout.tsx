import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import WhatsAppChat from "./components/WhatsAppChat";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Neirah Tech Solution | Intelligent Software Built for Growing Businesses",
  description:
    "Neirah Tech builds high-performance ERP systems, custom AI solutions, POS systems, and cloud infrastructure for retailers, factories, and SMEs.",
  icons: {
    icon: [
      { url: "/images/logo.png", type: "image/png" },
      { url: "/images/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logo.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8FBFF] text-slate-900 font-sans">
        {children}
        <WhatsAppChat />
      </body>
    </html>
  );
}