import Image from 'next/image'

const look = "flex flex-col justify-center items-center w-[32px] h-[32px] bg-[linear-gradient(135deg,#FF6A88_0%,#FA2D48_100%)] rounded-[16px] whitespace-nowrap text-[#FFFFFF] text-[13px] font-semibold leading-[16px] inline-grid place-items-center overflow-hidden object-cover"

export interface AvatarProps {
  src?: string
  alt?: string
  initials?: string
  className?: string
}

export function Avatar({ src, alt = '', initials, className }: AvatarProps) {
  if (src) return <Image src={src} alt={alt} width={32} height={32} className={[look, className].filter(Boolean).join(' ')} />
  return <span className={[look, className].filter(Boolean).join(' ')}>{initials}</span>
}
