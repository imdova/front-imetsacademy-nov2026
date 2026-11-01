import type { Metadata } from "next";
import { fontDisplay, fontSans } from "@/app/fonts";
import { AppProviders } from "@/providers/app-providers";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Build Business Skills for Real Career Growth`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: "/brand/imets-mark.png",
    shortcut: "/brand/imets-mark.png",
    apple: "/brand/imets-mark.png",
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={cn(fontDisplay.variable, fontSans.variable, "h-full antialiased")}
    >
      <body className="flex min-h-full flex-col bg-surface-alt text-ink">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
