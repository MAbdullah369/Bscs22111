'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const links = [
  { href: '/projects', label: 'Projects' },
  { href: '/about',    label: 'About'    },
  { href: '/contact',  label: 'Contact'  },
]

export default function Header() {
  const pathname  = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const doc = document.documentElement
      const total = doc.scrollHeight - doc.clientHeight
      setProgress(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* close mobile menu on route change */
  useEffect(() => setOpen(false), [pathname])

  /* lock body scroll while the mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        transition: 'background 0.4s, box-shadow 0.4s, backdrop-filter 0.4s',
        background: scrolled ? 'rgba(11,12,14,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.08)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            color: 'var(--ink)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: 210,
            position: 'relative',
          }}
        >
          <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '2px', background: 'var(--accent)' }} />
          Abdullah Zahid
        </Link>

        {/* Desktop nav */}
        <nav className="desktop-nav" style={{ gap: '1.75rem', alignItems: 'center' }}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-link"
              style={{ color: pathname === href ? 'var(--ink)' : undefined }}
            >
              {pathname === href && <span className="nav-link-dot" />}
              {label}
            </Link>
          ))}
          <button
            className="cmdk-trigger"
            onClick={() => window.dispatchEvent(new Event('open-cmdk'))}
            data-cursor-text="SEARCH"
          >
            Search
            <span className="kbd">⌘K</span>
          </button>
          <a
            href="/Abdullah-resume.pdf"
            download="Abdullah_Zahid_Resume.pdf"
            className="nav-link"
          >
            Resume
          </a>
          <Link href="/contact" className="btn-primary" style={{ padding: '0.55rem 1.3rem' }}>
            Hire me
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`mobile-nav-toggle ${open ? 'open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="mobile-nav-toggle-bars">
            <span /><span /><span />
          </span>
        </button>
      </div>

      {/* Scroll progress hairline */}
      <div className="scroll-progress-track">
        <div className="scroll-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Mobile nav panel */}
      <div className={`mobile-nav-panel ${open ? 'open' : ''}`}>
        {links.map(({ href, label }) => (
          <Link key={href} href={href}>{label}</Link>
        ))}
        <div className="mobile-nav-meta">
          <a href="/Abdullah-resume.pdf" download="Abdullah_Zahid_Resume.pdf">Resume</a>
          <a href="mailto:abdullah.zahid2569@gmail.com">Email</a>
          <a href="https://github.com/MAbdullah369" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/mabdullah79" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </header>
  )
}
