'use client'

import { useState, type KeyboardEvent, type ReactNode } from 'react'

const list = "flex items-start pt-[12.33px] pr-0 pb-0 pl-0 bg-[linear-gradient(180deg,#12121200_0%,#121212F2_35%,#121212_100%)]"
const activeTab = "flex flex-1 flex-col gap-[5px] items-center h-fit min-w-0 whitespace-nowrap text-[#FFFFFF] text-[10.8px] font-medium leading-[14px] cursor-pointer outline-none focus-visible:underline"
const idleTab = "flex flex-1 flex-col gap-[5px] items-center h-fit min-w-0 whitespace-nowrap text-[#B3B3B3] text-[10.8px] font-medium leading-[14px] cursor-pointer outline-none hover:text-[#FFFFFF] focus-visible:underline"

export interface TabsProps {
  items: string[]
  /** One icon per item, drawn above its label; told whether its tab is selected. */
  icons?: ((selected: boolean) => ReactNode)[]
  label?: string
  defaultIndex?: number
  onChange?: (index: number) => void
  className?: string
}

export function Tabs({ items, icons, label, defaultIndex = 0, onChange, className }: TabsProps) {
  const [active, setActive] = useState(defaultIndex)
  const choose = (index: number) => {
    setActive(index)
    onChange?.(index)
  }
  // The arrow keys move between tabs, as a tab list's do, and take the focus with them.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (active + (e.key === 'ArrowRight' ? 1 : items.length - 1)) % items.length
    choose(next)
    ;(e.currentTarget.children[next] as HTMLElement | undefined)?.focus()
  }
  return (
    <div role="tablist" aria-label={label} className={[list, className].filter(Boolean).join(' ')} onKeyDown={onKeyDown}>
      {items.map((item, i) => (
        <button key={item} type="button" role="tab" aria-selected={i === active} tabIndex={i === active ? 0 : -1} onClick={() => choose(i)} className={i === active ? activeTab : idleTab}>
          {icons?.[i]?.(i === active)}
          {item}
        </button>
      ))}
    </div>
  )
}
