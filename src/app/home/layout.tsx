import type { Metadata, Viewport } from 'next'
import { Rethink_Sans } from 'next/font/google'

const rethinkSans = Rethink_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: "Home",
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' }

export default function HomeLayout({ children }: LayoutProps<'/home'>) {
  return <div className={`${rethinkSans.className} min-h-screen bg-[#000000]`}>{children}</div>
}
