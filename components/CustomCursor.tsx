'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const haloRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  const [cursorText, setCursorText] = useState<string>('')
  const [cursorState, setCursorState] = useState<'default' | 'pointer' | 'text' | 'view' | 'hidden'>('hidden')
  const [isClicking, setIsClicking] = useState(false)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  useEffect(() => {
    // Check if device has a fine pointer (desktop mouse/trackpad)
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouchDevice) return

    let mouseX = -100
    let mouseY = -100
    let haloX = -100
    let haloY = -100
    let glowX = -100
    let glowY = -100
    let isVisible = false
    let animationFrameId: number

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const render = () => {
      if (isVisible) {
        // Dot follows cursor immediately
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
        }

        // Halo trails with smooth spring/lerp interpolation
        haloX = lerp(haloX, mouseX, 0.16)
        haloY = lerp(haloY, mouseY, 0.16)
        if (haloRef.current) {
          haloRef.current.style.transform = `translate3d(${haloX}px, ${haloY}px, 0) translate(-50%, -50%)`
        }

        // Ambient glow trails with even softer interpolation
        glowX = lerp(glowX, mouseX, 0.08)
        glowY = lerp(glowY, mouseY, 0.08)
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!isVisible) {
        isVisible = true
        haloX = mouseX
        haloY = mouseY
        glowX = mouseX
        glowY = mouseY
        setCursorState('default')
      }

      // Check hovered element
      const target = e.target as HTMLElement | null
      if (!target) return

      // Custom cursor text or view trigger
      const cursorTextEl = target.closest('[data-cursor-text]') as HTMLElement | null
      const cursorCardEl = target.closest('.project-card, [data-cursor="view"]') as HTMLElement | null
      const clickableEl = target.closest('a, button, input[type="submit"], input[type="button"], [role="button"], .btn-primary, .nav-link, .tag') as HTMLElement | null
      const textInputEl = target.closest('input[type="text"], input[type="email"], textarea, .field') as HTMLElement | null
      const textContentEl = target.closest('p, h1, h2, h3, h4, h5, h6, blockquote, li') as HTMLElement | null

      if (cursorTextEl) {
        setCursorText(cursorTextEl.getAttribute('data-cursor-text') || '')
        setCursorState('view')
      } else if (cursorCardEl && !target.closest('a, button')) {
        setCursorText('VIEW')
        setCursorState('view')
      } else if (clickableEl) {
        setCursorText('')
        setCursorState('pointer')
      } else if (textInputEl) {
        setCursorText('')
        setCursorState('text')
      } else if (textContentEl) {
        setCursorText('')
        setCursorState('text')
      } else {
        setCursorText('')
        setCursorState('default')
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true)
      const rippleId = Date.now()
      setRipples((prev) => [...prev.slice(-3), { id: rippleId, x: e.clientX, y: e.clientY }])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== rippleId))
      }, 600)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    const handleMouseLeave = () => {
      isVisible = false
      setCursorState('hidden')
    }

    const handleMouseEnter = () => {
      isVisible = true
      setCursorState('default')
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      {/* Ambient background glow */}
      <div
        ref={glowRef}
        className={`custom-cursor-glow ${cursorState === 'hidden' ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* Outer Halo Ring */}
      <div
        ref={haloRef}
        className={`custom-cursor-halo cursor-${cursorState} ${isClicking ? 'cursor-clicked' : ''}`}
      >
        {cursorState === 'view' && (
          <span ref={labelRef} className="custom-cursor-label">
            {cursorText || 'VIEW'}
          </span>
        )}
      </div>

      {/* Central Precision Dot */}
      <div
        ref={dotRef}
        className={`custom-cursor-dot cursor-${cursorState} ${isClicking ? 'cursor-clicked' : ''}`}
      />

      {/* Ripple shockwaves on click */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="custom-cursor-ripple"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
          }}
        />
      ))}
    </div>
  )
}
