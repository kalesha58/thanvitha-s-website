import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { SiteShell } from "@/components/site-shell";
import { siteMetadata } from "@/data/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: siteMetadata.title,
    template: "%s | Thanvinta’s Fit Fuel Kitchen",
  },
  description: siteMetadata.description,
  robots: { index: true, follow: true },
  openGraph: {
    title: siteMetadata.title,
    description: "High-protein salads & fresh weekly bowls. Clean ingredients, real macros, freshly prepared daily in Mangalagiri.",
    siteName: "Thanvita's FitFuel Kitchen",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: "High-protein salads & fresh weekly bowls. Clean ingredients, real macros, freshly prepared daily in Mangalagiri.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full" suppressHydrationWarning>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
