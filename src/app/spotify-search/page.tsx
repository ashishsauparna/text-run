// kalki-frame: z5dc86v2@43bc8851 #4b251177
'use client'

import { useEffect, useId, useState } from 'react'
import { Books, House, MagnifyingGlass, Pause, SpotifyLogo, X } from '@phosphor-icons/react'
import { CameraIcon } from '@/components/ui/icons/camera'
import { DevicesIcon } from '@/components/ui/icons/devices'
import { PlayIcon } from '@/components/ui/icons/play'
import { CellularIcon } from '@/components/ui/icons/cellular'
import { WiFiIcon } from '@/components/ui/icons/wi-fi'
import { BatteryIcon } from '@/components/ui/icons/battery'
import { BatteryOutlineIcon } from '@/components/ui/icons/battery-outline'
import { Input } from '@/components/ui/ui/input'
import { Tabs } from '@/components/ui/ui/tabs'

// Each genre's name is split into the lines it is set on in the design.
const genres = [
  { lines: ['Podcasts'], color: 'bg-[#E23200]', art: 'bg-[linear-gradient(150deg,#7B3FE4_0%,#E0418C_100%)]' },
  { lines: ['Audiobooks'], color: 'bg-[#273FA3]', art: 'bg-[linear-gradient(150deg,#7FE3D3_0%,#3A2BD9_100%)]' },
  { lines: ['Live Events'], color: 'bg-[#7358FF]', art: 'bg-[linear-gradient(150deg,#B44CE0_0%,#3A1F8C_100%)]' },
  { lines: ['Made For', 'You'], color: 'bg-[#1E3264]', art: 'bg-[linear-gradient(150deg,#8FB6E8_0%,#C25A6A_100%)]' },
  { lines: ['New', 'releases'], color: 'bg-[#E8105B]', art: 'bg-[linear-gradient(150deg,#F4E9D8_0%,#5A44C9_100%)]' },
  { lines: ['Hip-Hop'], color: 'bg-[#BC5800]', art: 'bg-[linear-gradient(150deg,#2A2A2A_0%,#E3C9A4_100%)]' },
  { lines: ['Pop'], color: 'bg-[#118B05]', art: 'bg-[linear-gradient(150deg,#9C7BD6_0%,#F2D648_100%)]' },
  { lines: ['Country'], color: 'bg-[#D84000]', art: 'bg-[linear-gradient(150deg,#24356B_0%,#E8463A_100%)]' },
  { lines: ['Charts'], color: 'bg-[#8E5C1D]', art: 'bg-[linear-gradient(150deg,#3A3A3A_0%,#B08A5A_100%)]' },
  { lines: ['Mood'], color: 'bg-[#5A436F]', art: 'bg-[linear-gradient(150deg,#C8A2E8_0%,#2A1F3A_100%)]' },
].map((genre) => ({ ...genre, name: genre.lines.join(' ') }))

const track = { title: 'Slow Glow', artist: 'Nova Lane', length: 200 }

const tabIcons = [
  (selected: boolean) => <House size={24} weight={selected ? 'fill' : 'regular'} aria-hidden />,
  (selected: boolean) => <MagnifyingGlass size={24} weight={selected ? 'bold' : 'regular'} aria-hidden />,
  (selected: boolean) => <Books size={24} weight={selected ? 'fill' : 'regular'} aria-hidden />,
  (selected: boolean) => (
    <span className="relative size-[24px]">
      <SpotifyLogo size={24} weight={selected ? 'fill' : 'regular'} aria-hidden />
      <span className="absolute left-[15.2px] top-[1px] size-[6px] rounded-full bg-[#0C70E8]" />
    </span>
  ),
]

export default function SpotifySearchPage() {
  const [query, setQuery] = useState('')
  const [playing, setPlaying] = useState(false)
  // Where the track is, in seconds; the design shows it about two fifths in.
  const [elapsed, setElapsed] = useState(79)
  const [notice, setNotice] = useState('')
  const searchId = useId()

  const matches = genres.filter((genre) => genre.name.toLowerCase().includes(query.trim().toLowerCase()))

  useEffect(() => {
    if (!playing) return
    const timer = setInterval(() => setElapsed((s) => (s + 1) % track.length), 1000)
    return () => clearInterval(timer)
  }, [playing])

  // A short message for what this page cannot do yet, read out as well as shown.
  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(''), 2500)
    return () => clearTimeout(timer)
  }, [notice])

  const time = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <div className="relative mx-auto w-full max-w-[375px] min-h-[812px] pb-[160px]">
      <div aria-hidden="true" className="h-[44px] absolute left-0 right-0 top-0">
        <p className="absolute left-[31.5px] top-[12.78px] whitespace-nowrap text-[#FFFFFF] font-[ui-sans-serif,system-ui,sans-serif] text-[15.6px] font-semibold leading-[20px] tracking-[-0.2px]">9:41</p>
        <CellularIcon className="w-[16.99px] h-[10.67px] absolute right-[64px] top-[17.67px] overflow-visible" />
        <WiFiIcon className="w-[14.88px] h-[10.93px] absolute right-[43.9px] top-[17.35px] overflow-visible" />
        <BatteryIcon className="w-[17.98px] h-[7.32px] absolute right-[18.68px] top-[19.34px] overflow-visible" />
        <BatteryOutlineIcon className="w-[24.35px] h-[11.33px] absolute right-[14.33px] top-[17.33px] overflow-visible" />
      </div>

      <header className="px-[16px] pt-[73px] bg-[#121212]">
        <div className="flex items-center justify-between">
          <h1 className="-ml-[0.5px] text-[#FFFFFF] text-[24.5px] font-bold leading-[30px] tracking-[-0.75px]">Search</h1>
          <button type="button" aria-label="Search with your camera" onClick={() => setNotice('Camera search isn’t available yet')} className="size-[24px] cursor-pointer rounded-[2px] outline-none focus-visible:ring-2 focus-visible:ring-[#FFFFFF]">
            <CameraIcon className="w-[24px] h-[24px] overflow-visible" />
          </button>
        </div>
        <form role="search" onSubmit={(e) => e.preventDefault()} className="relative mt-[13px]">
          <label htmlFor={searchId} className="sr-only">Search Spotify</label>
          <MagnifyingGlass size={24} weight="bold" color="#000000" aria-hidden className="pointer-events-none absolute left-[15.8px] top-[10px]" />
          <Input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
            placeholder="What do you want to listen to?"
            autoComplete="off"
            aria-controls="genres"
            className="w-full pl-[47.5px] pr-[44px] text-[#000000] outline-none focus-visible:ring-2 focus-visible:ring-[#FFFFFF] [&::-webkit-search-cancel-button]:appearance-none"
          />
          {query && (
            <button type="button" aria-label="Clear search" onClick={() => setQuery('')} className="absolute right-[10px] top-[10px] size-[24px] flex items-center justify-center cursor-pointer text-[#000000]">
              <X size={20} weight="bold" aria-hidden />
            </button>
          )}
        </form>
      </header>

      <main>
        <section aria-labelledby="browse-all" className="pt-[25px]">
          <h2 id="browse-all" className="pl-[16.5px] text-[#FFFFFF] text-[16.85px] font-bold leading-[20px]">Browse all</h2>
          <p role="status" className="sr-only">
            {query ? `${matches.length} ${matches.length === 1 ? 'genre' : 'genres'} found` : ''}
          </p>
          {matches.length > 0 ? (
            <ul id="genres" className="mt-[24.73px] grid grid-cols-2 gap-x-[15.33px] gap-y-[15.41px] pl-[15.67px] pr-[16.66px]">
              {matches.map((genre) => (
                <li key={genre.name}>
                  <button
                    type="button"
                    onClick={() => setQuery(genre.name)}
                    aria-label={`Show ${genre.name}`}
                    className={`relative block w-full h-[92.67px] overflow-hidden rounded-[4px] text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#FFFFFF] ${genre.color}`}
                  >
                    <span className="absolute left-[12.5px] top-[8.53px] whitespace-nowrap text-[#FFFFFF] text-[19.5px] font-bold leading-[25px]">
                      {genre.lines.map((line, i) => (
                        <span key={line} className="block">{line}{i < genre.lines.length - 1 ? ' ' : ''}</span>
                      ))}
                    </span>
                    <span aria-hidden="true" className={`w-[61px] h-[61px] absolute right-[-13.83px] top-[22.8px] rounded-[4px] shadow-[0px_2px_6px_0px_#00000040] rotate-[25deg] ${genre.art}`} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div id="genres" className="mt-[48px] px-[16px] text-center">
              <p className="text-[#FFFFFF] text-[16.85px] font-bold leading-[20px]">No genres match “{query.trim()}”</p>
              <p className="mt-[8px] text-[#C0C4C8] text-[13px] leading-[16px]">Check the spelling, or try another word.</p>
            </div>
          )}
        </section>
      </main>

      {notice && (
        <p role="status" className="fixed left-1/2 bottom-[160px] -translate-x-1/2 whitespace-nowrap rounded-[16px] bg-[#FFFFFF] px-[16px] py-[8px] text-[#000000] text-[13px] font-medium leading-[16px] shadow-[0px_2px_6px_0px_#00000040]">
          {notice}
        </p>
      )}

      <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-[375px]">
        <section aria-label="Now playing" className="h-[56px] absolute left-[8px] right-[8px] bottom-[90.33px] bg-[#363E41] rounded-[6px] overflow-hidden">
          <div aria-hidden="true" className="w-[40px] h-[40px] absolute left-[8px] top-[8px] bg-[linear-gradient(150deg,#3A2A22_0%,#1A120F_60%,#0F0F11_100%)] rounded-[2px]" />
          <div className="flex flex-col gap-0.5 items-start min-w-0 absolute left-[57.5px] right-[97px] top-[10.25px]">
            <p className="max-w-full truncate text-[#FFFFFF] text-[13px] font-medium leading-[16px]">{track.title}</p>
            <p className="max-w-full truncate text-[#C0C4C8] text-[13px] leading-[16px]">{track.artist}</p>
          </div>
          <button type="button" aria-label="Connect to a device" onClick={() => setNotice('Playing on this phone')} className="size-[24px] absolute right-[65px] top-[15px] cursor-pointer rounded-[2px] outline-none focus-visible:ring-2 focus-visible:ring-[#FFFFFF]">
            <DevicesIcon className="w-[24px] h-[24px] overflow-visible" />
          </button>
          <button type="button" aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`} aria-pressed={playing} onClick={() => setPlaying((p) => !p)} className="size-[24px] absolute right-[16px] top-[15px] cursor-pointer rounded-[2px] outline-none focus-visible:ring-2 focus-visible:ring-[#FFFFFF]">
            {playing ? <Pause size={24} weight="fill" color="#FFFFFF" aria-hidden /> : <PlayIcon className="w-[24px] h-[24px] overflow-visible" />}
          </button>
          <div
            role="progressbar"
            aria-label="Track progress"
            aria-valuemin={0}
            aria-valuemax={track.length}
            aria-valuenow={elapsed}
            aria-valuetext={`${time(elapsed)} of ${time(track.length)}`}
            className="h-[2px] absolute left-[9px] right-[9.33px] top-[52.67px] bg-[#FFFFFF33] rounded-[1px] overflow-hidden"
          >
            <div className="h-full bg-[#FFFFFF] rounded-[1px]" style={{ width: `${(elapsed / track.length) * 100}%` }} />
          </div>
        </section>
        <nav aria-label="Main">
          <Tabs items={["Home", "Search", "Your Library", "Premium"]} icons={tabIcons} label="Main" defaultIndex={1} className="h-[90px]" />
        </nav>
        <div aria-hidden="true" className="w-[134px] h-[5px] absolute left-1/2 -translate-x-1/2 bottom-[8px] bg-[#FFFFFF] rounded-[2.5px]" />
      </div>
    </div>
  )
}
