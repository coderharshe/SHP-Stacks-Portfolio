import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/ui/command-menu";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { BackgroundWrapper } from "@/components/3d/BackgroundWrapper";
import { CameraMotionProvider } from "@/context/CameraMotionContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SHP Stacks | Engineering Modern Software. Building Businesses.",
    template: "%s | SHP Stacks"
  },
  description: "SHP Stacks is a premium software development company. We build custom software, SaaS products, enterprise applications, AI-powered systems, business automation, dashboards, and high-performance web applications.",
  keywords: [
    "SHP Stacks", 
    "Software Development Company", 
    "Enterprise Software Development", 
    "AI Systems Agency", 
    "SaaS Development", 
    "Warehouse Management Systems", 
    "Custom ERP Development", 
    "Web Application Development",
    "Harsh Agarwal",
    "Shashank",
    "Prasiddh"
  ],
  authors: [{ name: "SHP Stacks" }],
  creator: "SHP Stacks",
  metadataBase: new URL("https://shpstacks.com"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shpstacks.com",
    title: "SHP Stacks | Engineering Modern Software. Building Businesses.",
    description: "SHP Stacks is a premium software development company. We build custom software, SaaS products, enterprise applications, AI-powered systems, business automation, dashboards, and high-performance web applications.",
    siteName: "SHP Stacks",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SHP Stacks - Engineering Modern Software"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SHP Stacks | Engineering Modern Software. Building Businesses.",
    description: "SHP Stacks is a premium software development company. We build custom software, SaaS products, enterprise applications, AI-powered systems, business automation, dashboards, and high-performance web applications.",
    images: ["/og-image.png"],
    creator: "@shpstacks"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&f[]=boska@300,400,500,700,900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-transparent text-foreground antialiased relative">
        <CameraMotionProvider>
          {/* Cinematic 3D Highway WebGL Scene */}
          <BackgroundWrapper />

          {/* Grain overlay */}
          <div className="noise-overlay" />

          {/* Global Nav */}
          <Navbar />

          {/* Home / Section Contents */}
          <div className="flex-grow">
            {children}
          </div>

          {/* Global Footer */}
          <Footer />

          {/* Premium Interactive Addons */}
          <CommandMenu />
          <CustomCursor />
        </CameraMotionProvider>
      </body>
    </html>
  );
}

