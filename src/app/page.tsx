import { redirect } from 'next/navigation'

// The app opens on its first screen.
export default function Home() {
  redirect('/spotify-search')
}
