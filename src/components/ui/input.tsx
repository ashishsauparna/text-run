import type { InputHTMLAttributes } from 'react'

const look = "h-[44px] bg-[#FFFFFF] rounded-[4px] text-[17.2px] leading-[20px] tracking-[-0.39px]" + " placeholder:text-[#000000]"

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={[look, className].filter(Boolean).join(' ')} {...props} />
}
