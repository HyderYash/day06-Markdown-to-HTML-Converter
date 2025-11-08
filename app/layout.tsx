import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Markdown to HTML Converter - Free Online Tool',
    template: '%s | Markdown to HTML Converter',
  },
  description: 'Convert Markdown to HTML instantly with our free, secure, and beautiful online converter. Live preview, syntax highlighting, and export options. No signup required.',
  keywords: [
    'markdown to html',
    'markdown converter',
    'html converter',
    'markdown editor',
    'html generator',
    'markdown preview',
    'md to html',
    'markdown parser',
    'online markdown converter',
    'free markdown tool',
  ],
  authors: [{ name: 'Yash Sharma', url: 'https://github.com/HyderYash' }],
  creator: 'Yash Sharma',
  publisher: 'Yash Sharma',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Markdown to HTML Converter - Free Online Tool',
    description: 'Convert Markdown to HTML instantly with live preview, syntax highlighting, and export options. Clean, safe, and beautiful.',
    siteName: 'Markdown to HTML Converter',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Markdown to HTML Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markdown to HTML Converter - Free Online Tool',
    description: 'Convert Markdown to HTML instantly with live preview and export options.',
    creator: '@HyderYash',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MD to HTML',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/icon-192x192.png',
  },
  other: {
    'theme-color': '#007AFF',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'MD to HTML',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Markdown to HTML Converter',
    description: 'Free online tool to convert Markdown to HTML with live preview and export options',
    url: siteUrl,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'Yash Sharma',
      url: 'https://github.com/HyderYash',
    },
    featureList: [
      'Live Markdown to HTML conversion',
      'Real-time preview',
      'HTML sanitization',
      'Export to HTML/Markdown',
      'Syntax highlighting',
      'Multiple templates',
      'Keyboard shortcuts',
      'Dark mode support',
    ],
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

