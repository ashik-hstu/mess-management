import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'HSTU Mess Finder',
  description: 'Find and manage mess accommodations near HSTU campus.',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['HSTU', 'mess', 'accommodation', 'students', 'hostel', 'bangladesh'],
  authors: [
    { name: 'Ashik Hentai' },
  ],
  creator: 'Ashik Hentai',
  publisher: 'HSTU Mess Finder',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hstu-mess-finder.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'HSTU Mess Finder',
    description: 'Find and manage mess accommodations near HSTU campus.',
    siteName: 'HSTU Mess Finder',
    images: [
      {
        url: '/placeholder-logo.png',
        width: 512,
        height: 512,
        alt: 'HSTU Mess Finder Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HSTU Mess Finder',
    description: 'Find and manage mess accommodations near HSTU campus.',
    images: ['/placeholder-logo.png'],
  },
  icons: {
    icon: '/placeholder-logo.png',
    shortcut: '/placeholder-logo.png',
    apple: '/placeholder-logo.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'HSTU Mess Finder',
    startupImage: '/placeholder-logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ea580c' },
    { media: '(prefers-color-scheme: dark)', color: '#ea580c' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
