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
    url: "https://legalforge-chi.vercel.app",
    siteName: "LegalForge",
    images: [
      {
        url: "https://legalforge-chi.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "LegalForge — AI Legal Document Generator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LegalForge — AI Legal Document Generator",
    description:
      "Generate tailored Privacy Policies, Terms of Service, and Cookie Policies in 60 seconds.",
    images: ["https://legalforge-chi.vercel.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon-192.png',
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
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-brand-dark text-txt-primary font-body antialiased min-h-screen text-base">
        {children}
      </body>
    </html>
  );
}
