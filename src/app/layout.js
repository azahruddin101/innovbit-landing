import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { SITE } from "@/config/site";
import "./globals.css";

// Body and data in Geist; headlines in Bricolage Grotesque, a grotesk with optical sizes, so big type gets tighter and small type opens up.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const display = Bricolage_Grotesque({ variable: "--font-display-face", subsets: ["latin"], axes: ["opsz"] });

const description =
  "SolarDesy runs a solar installation business end to end: leads from Meta and Google Ads, 3D roof design, branded proposals, GST billing, stock with serial numbers, installation tasks, loans, subsidies, maintenance and a portal for every client.";

export const metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description,
  openGraph: { title: `${SITE.name} — ${SITE.tagline}`, description, type: "website", siteName: SITE.name },
  twitter: { card: "summary_large_image", title: `${SITE.name} — ${SITE.tagline}`, description },
};

export const viewport = { themeColor: "#f4f7fc", colorScheme: "light", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
