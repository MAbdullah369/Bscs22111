'use client'
import { useEffect, useRef, useState } from 'react'

type Props = {
  value: number
  prefix?: string
  suffix?: string
  label: string
}

export default function StatCounter({ value, prefix = '', suffix = '', label }: Props) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const duration = 1100
            const start = performance.now()
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration)
              const eased = 1 - Math.pow(1 - t, 3)
              setDisplay(Math.round(eased * value))
              if (t < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <div className="stat-cell reveal" ref={ref}>
      <div className="stat-value">
        {prefix}{display.toLocaleString()}{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}
