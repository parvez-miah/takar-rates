import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "আজকের টাকার রেট - সকল দেশের মুদ্রার হার | Ajker Takar Rate",
  description:
    "আজকের টাকার রেট দেখুন সকল দেশের মুদ্রার সাথে। লাইভ এক্সচেঞ্জ রেট, ডলার, ইউরো, পাউন্ড, রুপি সহ সব মুদ্রার আপডেট রেট। Currency converter এবং exchange rate calculator।",
  keywords:
    "আজকের টাকার রেট, টাকার রেট, ডলারের রেট, ইউরোর রেট, পাউন্ডের রেট, মুদ্রার হার, এক্সচেঞ্জ রেট, currency rate, exchange rate, ajker takar rate, dollar rate, euro rate",
  authors: [{ name: "আজকের টাকার রেট" }],
  creator: "আজকের টাকার রেট",
  publisher: "আজকের টাকার রেট",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://ajkertakarrate.com",
    title: "আজকের টাকার রেট - সকল দেশের মুদ্রার হার",
    description: "আজকের টাকার রেট দেখুন সকল দেশের মুদ্রার সাথে। লাইভ এক্সচেঞ্জ রেট এবং currency converter।",
    siteName: "আজকের টাকার রেট",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "আজকের টাকার রেট - সকল দেশের মুদ্রার হার",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "আজকের টাকার রেট - সকল দেশের মুদ্রার হার",
    description: "আজকের টাকার রেট দেখুন সকল দেশের মুদ্রার সাথে। লাইভ এক্সচেঞ্জ রেট এবং currency converter।",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://ajkertakarrate.com",
    languages: {
      "bn-BD": "https://ajkertakarrate.com",
      "en-US": "https://ajkertakarrate.com/en",
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn-BD" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "আজকের টাকার রেট",
              alternateName: "Ajker Takar Rate",
              description: "আজকের টাকার রেট দেখুন সকল দেশের মুদ্রার সাথে। লাইভ এক্সচেঞ্জ রেট এবং currency converter।",
              url: "https://ajkertakarrate.com",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "BDT",
              },
              author: {
                "@type": "Organization",
                name: "আজকের টাকার রেট",
              },
              publisher: {
                "@type": "Organization",
                name: "আজকের টাকার রেট",
                logo: {
                  "@type": "ImageObject",
                  url: "https://ajkertakarrate.com/logo.png",
                },
              },
              inLanguage: "bn-BD",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://ajkertakarrate.com/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
