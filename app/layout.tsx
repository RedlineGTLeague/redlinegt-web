import type { Metadata } from 'next'
import { Inter, Oswald } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { BackgroundSlideshow } from '@/components/background-slideshow'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const oswald = Oswald({ 
  subsets: ["latin"],
  variable: '--font-oswald'
})

export const metadata: Metadata = {
  title: 'Redline GT League | Campeonato Gran Turismo 7',
  description: 'Liga competitiva de sim racing en Gran Turismo 7. Carreras, clasificaciones, equipos y pilotos.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} ${oswald.variable} font-sans antialiased text-foreground min-h-screen flex flex-col relative`}>
        <BackgroundSlideshow />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
