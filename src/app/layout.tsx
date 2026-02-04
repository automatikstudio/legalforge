import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LegalForge — AI Legal Document Generator",
  description:
    "Generate tailored Privacy Policies, Terms of Service, and Cookie Policies in 60 seconds. AI scans your website and creates legally-sound documents automatically.",
  keywords: [
    "privacy policy generator",
    "terms of service generator",
    "cookie policy generator",
    "legal document generator",
    "AI legal",
    "GDPR compliance",
    "website compliance",
  ],
  openGraph: {
    title: "LegalForge — AI Legal Document Generator",
    description:
      "Generate tailored Privacy Policies, Terms of Service, and Cookie Policies in 60 seconds.",
    type: "website",
    siteName: "LegalForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "LegalForge — AI Legal Document Generator",
    description:
      "Generate tailored Privacy Policies, Terms of Service, and Cookie Policies in 60 seconds.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Sora:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white font-outfit antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
