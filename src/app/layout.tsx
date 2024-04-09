import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LayoutProps } from '@/types/types'
import Header from '@/components/shared/Header'
import { cn } from '@/lib/utils'
import Footer from '@/components/shared/Footer'
import { Toaster } from "@/components/ui/toaster"
import StoreProvider from '@/components/shared/StoreProvider'
import Favicon from '/public/favicon.png';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: "Largest IT job in India",
    template: `%s | Largest IT job in India`,
  },
  description: 'largest it job in India.',
  icons: [{ rel: 'icon', url: Favicon.src }],

}


export default function RootLayout({
  children,
}: LayoutProps) {
  return (
    <html lang="en">

      <body className={cn(inter.className, "bg-bgColor")}>
        <StoreProvider>
          <div className="root">
            <Header />
          </div>
          <div className="">{children}</div>
          <div className="">
            <Footer />
          </div>
          <Toaster />
        </StoreProvider>
      </body >
    </html >
  )
}
