import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aurum Control Center',
  description: 'Dashboard de control para infraestructura de hosting y servicios de IA',
  manifest: '/manifest.json',
  themeColor: '#FFD700',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Aurum Control'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.className} bg-gradient-cyber min-h-screen`}>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-64 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}