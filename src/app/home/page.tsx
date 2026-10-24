// kalki-frame: 8icukh8m@e78a4609 #0c3f4e32
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Pause } from '@phosphor-icons/react'
import { CaretRightIcon } from '@/components/ui/icons/caret-right'
import { PlayIcon } from '@/components/ui/icons/play'
import { FastForwardIcon } from '@/components/ui/icons/fast-forward'
import { HouseIcon } from '@/components/ui/icons/house'
import { SquaresFourIcon } from '@/components/ui/icons/squares-four'
import { BroadcastIcon } from '@/components/ui/icons/broadcast'
import { MusicNotesSimpleIcon } from '@/components/ui/icons/music-notes-simple'
import { MagnifyingGlassIcon } from '@/components/ui/icons/magnifying-glass'
import { Avatar } from '@/components/ui/avatar'

type Item = { title: string; artist: string; art: string }

const picks = [
  {
    caption: 'Made for You',
    title: 'Late Night Mix',
    artist: 'Nova Lane, Ivy Shore, Kade Moss and more',
    art: 'bg-[linear-gradient(160deg,#5B2C83_0%,#C2185B_55%,#3A0F2E_100%)]',
  },
  {
    caption: 'Featuring Ivy Shore',
    title: 'Morning Calm',
    artist: 'Soft acoustic starts for slow mornings',
    art: 'bg-[linear-gradient(160deg,#0E7C86_0%,#2A9D8F_55%,#0B3B47_100%)]',
  },
]

const recent: Item[] = [
  { title: 'Slow Glow', artist: 'Nova Lane', art: 'bg-[linear-gradient(150deg,#F4A261_0%,#E76F51_60%,#5A1E12_100%)]' },
  { title: 'Paper Tides', artist: 'Ivy Shore', art: 'bg-[linear-gradient(150deg,#8EC5FC_0%,#4A6CF7_60%,#141E46_100%)]' },
  { title: 'Neon Hours', artist: 'Kade Moss', art: 'bg-[linear-gradient(150deg,#B8F2A0_0%,#2E9E5B_60%,#0D2E1A_100%)]' },
]

// Everything on the page, in the order the skip button moves through it.
const queue: Item[] = [...picks, ...recent]

const focusRing = 'outline-none focus-visible:ring-2 focus-visible:ring-[#FFFFFF]'

// Tabs with no screen of their own yet say so instead of leading nowhere.
const laterTabs = [
  { label: 'New', Icon: SquaresFourIcon },
  { label: 'Radio', Icon: BroadcastIcon },
  { label: 'Library', Icon: MusicNotesSimpleIcon },
]

export default function HomePage() {
  // The design shows Slow Glow in the mini player, ready to play.
  const [current, setCurrent] = useState(queue.indexOf(recent[0]))
  const [playing, setPlaying] = useState(false)
  const [showAllRecent, setShowAllRecent] = useState(false)
  const [notice, setNotice] = useState('')
  const track = queue[current]

  // A short message for what this page cannot do yet, read out as well as shown.
  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(''), 2500)
    return () => clearTimeout(timer)
  }, [notice])

  const play = (item: Item) => {
    setCurrent(queue.indexOf(item))
    setPlaying(true)
  }
  const skip = () => setCurrent((i) => (i + 1) % queue.length)

  return (
    <div className="relative mx-auto w-full max-w-[375px] min-h-[812px] overflow-x-hidden">
      <main className="flex flex-col gap-6 pt-[52px] pb-40">
        <header className="flex justify-between items-center gap-4 px-4">
          <h1 className="text-[#FFFFFF] text-[34px] font-bold leading-[41px] tracking-[0.4px]">Home</h1>
          <button type="button" aria-label="Your account" onClick={() => setNotice('Your account isn’t available yet')} className={`shrink-0 cursor-pointer rounded-full ${focusRing}`}>
            <Avatar initials="NL" className="w-[32px]" />
          </button>
        </header>

        <section aria-labelledby="top-picks" className="flex flex-col gap-3">
          <h2 id="top-picks" className="px-4 text-[#FFFFFF] text-[22px] font-bold leading-[28px]">Top Picks for You</h2>
          <ul className="flex gap-3 px-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 [scrollbar-width:none]">
            {picks.map((pick) => (
              <li key={pick.title} className="snap-start shrink-0">
                <button
                  type="button"
                  onClick={() => play(pick)}
                  aria-label={`Play ${pick.title}, ${pick.caption}`}
                  className={`flex flex-col gap-1 justify-end items-start p-4 w-[240px] h-[300px] max-w-[calc(100vw-48px)] rounded-[12px] overflow-hidden text-left cursor-pointer ${focusRing} ${pick.art}`}
                >
                  <span className="text-[#FFFFFFB3] text-[12px] font-semibold leading-[16px]">{pick.caption}</span>
                  <span className="text-[#FFFFFF] text-[22px] font-bold leading-[26px]">{pick.title}</span>
                  <span className="self-stretch text-[#FFFFFFCC] text-[13px] leading-[18px]">{pick.artist}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="recently-played" className="flex flex-col gap-3">
          <h2 className="px-4">
            <button
              type="button"
              id="recently-played"
              onClick={() => setShowAllRecent((s) => !s)}
              aria-expanded={showAllRecent}
              aria-controls="recent-list"
              className={`flex gap-1 items-center text-[#FFFFFF] text-[22px] font-bold leading-[28px] cursor-pointer rounded-[4px] ${focusRing}`}
            >
              Recently Played
              <CaretRightIcon className={`w-[18px] h-[18px] overflow-visible transition-transform ${showAllRecent ? 'rotate-90' : ''}`} />
              <span className="sr-only">{showAllRecent ? ', show as a row' : ', show all'}</span>
            </button>
          </h2>
          <ul
            id="recent-list"
            className={showAllRecent ? 'grid grid-cols-2 gap-3 px-4' : 'flex gap-3 px-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 [scrollbar-width:none]'}
          >
            {recent.map((album) => (
              <li key={album.title} className={showAllRecent ? 'min-w-0' : 'snap-start shrink-0 w-[160px]'}>
                <button type="button" onClick={() => play(album)} aria-label={`Play ${album.title} by ${album.artist}`} className={`flex flex-col gap-0.5 w-full text-left cursor-pointer rounded-[8px] ${focusRing}`}>
                  <span aria-hidden="true" className={`block w-full aspect-square rounded-[8px] ${album.art}`} />
                  <span className="w-full truncate text-[#FFFFFF] text-[13px] font-medium leading-[18px]">{album.title}</span>
                  <span className="w-full truncate text-[#8E8E93] text-[13px] leading-[18px]">{album.artist}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {notice && (
        <p role="status" className="fixed left-1/2 bottom-[160px] -translate-x-1/2 whitespace-nowrap rounded-[16px] bg-[#FFFFFF] px-[16px] py-[8px] text-[#000000] text-[13px] font-medium leading-[16px] shadow-[0px_2px_6px_0px_#00000040]">
          {notice}
        </p>
      )}

      <div className="fixed inset-x-0 bottom-0 z-[50] mx-auto w-full max-w-[375px]">
        <section aria-label="Now playing" className="h-[56px] absolute left-[8px] right-[8px] bottom-[90.33px] bg-[#2C2C2EF2] rounded-[14px] shadow-[0px_8px_24px_0px_#00000066] overflow-hidden">
          <div aria-hidden="true" className={`w-[40px] h-[40px] absolute left-[8px] top-[8px] rounded-[6px] ${track.art}`} />
          <div className="flex flex-col gap-0.5 items-start min-w-0 absolute left-[57.5px] right-[88px] top-[10.25px]">
            <p className="max-w-full truncate text-[#FFFFFF] text-[13px] font-medium leading-[16px]">{track.title}</p>
            <p className="max-w-full truncate text-[#C0C4C8] text-[13px] leading-[16px]">{track.artist}</p>
          </div>
          <button type="button" aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`} aria-pressed={playing} onClick={() => setPlaying((p) => !p)} className={`size-[24px] absolute right-[56px] top-[15px] cursor-pointer rounded-[2px] ${focusRing}`}>
            {playing ? <Pause size={24} weight="fill" color="#FFFFFF" aria-hidden /> : <PlayIcon className="w-[24px] h-[24px] overflow-visible" />}
          </button>
          <button type="button" aria-label={`Next: ${queue[(current + 1) % queue.length].title}`} onClick={skip} className={`size-[24px] absolute right-[16px] top-[16px] cursor-pointer rounded-[2px] ${focusRing}`}>
            <FastForwardIcon className="w-[24px] h-[24px] overflow-visible" />
          </button>
        </section>

        <nav aria-label="Main" className="flex items-start pt-[12.33px] bg-[#161618F2] shadow-[inset_0_0_0_0.5px_#FFFFFF1F] pb-[env(safe-area-inset-bottom)] min-h-[90px]">
          <Link href="/home" aria-current="page" className={`flex flex-col gap-[5px] items-center grow basis-0 min-w-0 min-h-[44px] rounded-[4px] ${focusRing}`}>
            <HouseIcon className="w-[24px] h-[24px] overflow-visible" />
            <span className="whitespace-nowrap text-[#FA2D48] text-[10.8px] font-medium leading-[14px]">Home</span>
          </Link>
          {laterTabs.map(({ label, Icon }) => (
            <button key={label} type="button" onClick={() => setNotice(`${label} isn’t available yet`)} className={`flex flex-col gap-[5px] items-center grow basis-0 min-w-0 min-h-[44px] cursor-pointer rounded-[4px] ${focusRing}`}>
              <Icon className="w-[24px] h-[24px] overflow-visible" />
              <span className="whitespace-nowrap text-[#8E8E93] text-[10.8px] font-medium leading-[14px]">{label}</span>
            </button>
          ))}
          <Link href="/spotify-search" className={`flex flex-col gap-[5px] items-center grow basis-0 min-w-0 min-h-[44px] rounded-[4px] ${focusRing}`}>
            <MagnifyingGlassIcon className="w-[24px] h-[24px] overflow-visible" />
            <span className="whitespace-nowrap text-[#8E8E93] text-[10.8px] font-medium leading-[14px]">Search</span>
          </Link>
        </nav>
        <div aria-hidden="true" className="w-[134px] h-[5px] absolute left-1/2 -translate-x-1/2 bottom-[8px] bg-[#FFFFFF] rounded-[2.5px]" />
      </div>
    </div>
  )
}
