import '../styles/globals.css'
import { Metadata } from 'next'
import CustomCursor from '../components/CustomCursor'
import CommandPalette from '../components/CommandPalette'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://abdullah-zahid.netlify.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Abdullah Zahid — Software Developer',
    template: '%s | Abdullah Zahid',
  },
  description:
    'Portfolio of Abdullah Zahid — Software Developer specializing in AI/ML systems, systems programming, and scalable full-stack applications.',
  keywords: [
    'software developer',
    'software engineer',
    'C++',
    'C',
    'Python',
    'React',
    'Next.js',
    'TensorFlow Lite',
    'Whisper AI',
    'Operating Systems',
    'Data Structures',
    'full-stack developer',
  ],
  authors: [{ name: 'Abdullah Zahid', url: BASE_URL }],
  creator: 'Abdullah Zahid',

  openGraph: {
    title: 'Abdullah Zahid — Software Developer',
    description:
      'Portfolio of Abdullah Zahid — Software Developer specializing in AI/ML systems, systems programming, and scalable full-stack software.',
    url: BASE_URL,
    siteName: 'Abdullah Zahid',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/profile.jpg`,
        width: 800,
        height: 800,
        alt: 'Abdullah Zahid',
      },
    ],
  },

  twitter: {
    card: 'summary',
    title: 'Abdullah Zahid — Software Developer',
    description:
      'Portfolio of Abdullah Zahid — Software Developer specializing in AI/ML systems, systems programming, and scalable full-stack software.',
    images: [`${BASE_URL}/profile.jpg`],
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

  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },

  alternates: {
    canonical: BASE_URL,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Abdullah Zahid',
              url: BASE_URL,
              sameAs: [
                'https://github.com/MAbdullah369',
                'https://linkedin.com/in/mabdullah79',
              ],
              jobTitle: 'Software Developer & Engineer',
              description:
                'Software Developer specializing in AI/ML systems, systems programming, and scalable full-stack applications.',
            }),
          }}
        />
      </head>
      <body>
        <CustomCursor />
        <CommandPalette />
        {children}
      </body>
    </html>
  )
}
