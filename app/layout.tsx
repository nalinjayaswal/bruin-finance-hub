import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "@native/ui/styles";
import "./globals.css";
import "./force-barlow.css";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "@/contexts/user-context";
import { ErrorBoundary } from "@/components/error-boundary";
import { ServiceWorkerRegister } from "@/components/sw-register";

const barlow = Barlow({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Native Dashboard",
  description: "iOS-inspired refined minimalism dashboard",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={barlow.variable} style={{ fontFamily: 'var(--font-barlow), Barlow, sans-serif' }}>
      <body className={`${barlow.className} antialiased`} style={{ fontFamily: 'var(--font-barlow), Barlow, sans-serif' }}>
        <ErrorBoundary>
          <ThemeProvider>
            <UserProvider>
              {children}
              <ServiceWorkerRegister />
            </UserProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
