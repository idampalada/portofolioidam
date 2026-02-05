import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Idam Palada | Fullstack Developer",
  description:
    "Personal portfolio of Idam Palada — Fullstack Developer specializing in scalable, high-performance web applications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${sora.variable}
          font-sans
          bg-[#0B0614]
          text-white
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
