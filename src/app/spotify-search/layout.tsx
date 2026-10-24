import type { Metadata } from 'next'
import { Rethink_Sans } from 'next/font/google'

const rethinkSans = Rethink_Sans({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata: Metadata = {
  title: "Spotify / Search",
}

export default function SpotifySearchLayout({ children }: LayoutProps<'/spotify-search'>) {
  return <div className={`${rethinkSans.className} min-h-screen bg-[#121212]`}>{children}</div>
}
