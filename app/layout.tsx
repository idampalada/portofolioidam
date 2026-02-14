import type { Metadata } from "next";
import { Sora } from "next/font/google";
import Script from "next/script";
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
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TW2Y8FVSK6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TW2Y8FVSK6');
          `}
        </Script>
      </head>

      <body
        className={`
          ${sora.variable}
          font-sans
          bg-[#14062B]
          text-white
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
