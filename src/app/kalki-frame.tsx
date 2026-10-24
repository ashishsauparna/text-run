'use client'

/*
 * Made by kalki.design. While the app runs in development inside kalki's App
 * frame, this tells kalki which page it is on, and goes to a screen chosen
 * there, back or forward. In production, and anywhere else, it does nothing.
 */
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const KALKI = /^(https:\/\/([a-z0-9-]+\.)*kalki\.design|http:\/\/(localhost|127\.0\.0\.1)(:\d+)?)$/

export function KalkiFrame() {
  const path = usePathname()
  const router = useRouter()
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development' || window.parent === window) return
    const parent = window.location.ancestorOrigins?.[0]
    if (parent && KALKI.test(parent)) window.parent.postMessage({ kalki: 'route', path }, parent)
  }, [path])
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development' || window.parent === window) return
    const go = (e: MessageEvent) => {
      const data = e.data as { kalki?: unknown; path?: unknown } | null
      if (e.source !== window.parent || !KALKI.test(e.origin)) return
      if (data?.kalki === 'go' && typeof data.path === 'string' && data.path.startsWith('/')) router.push(data.path)
      else if (data?.kalki === 'back') router.back()
      else if (data?.kalki === 'forward') router.forward()
    }
    window.addEventListener('message', go)
    return () => window.removeEventListener('message', go)
  }, [router])
  return null
}
