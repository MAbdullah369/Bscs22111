'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

type Item = {
  label: string
  hint: string
  run: (router: ReturnType<typeof useRouter>) => void
}

const items: Item[] = [
  { label: 'Go to Home',        hint: 'Page', run: (r) => r.push('/') },
  { label: 'Go to Projects',    hint: 'Page', run: (r) => r.push('/projects') },
  { label: 'Go to About',       hint: 'Page', run: (r) => r.push('/about') },
  { label: 'Go to Contact',     hint: 'Page', run: (r) => r.push('/contact') },
  { label: 'Download resume',   hint: 'PDF',  run: () => {
      const a = document.createElement('a')
      a.href = '/Abdullah-resume.pdf'
      a.download = 'Abdullah_Zahid_Resume.pdf'
      a.click()
    } },
  { label: 'Email Abdullah',    hint: 'Mail', run: () => { window.location.href = 'mailto:abdullah.zahid2569@gmail.com' } },
  { label: 'Open GitHub',       hint: 'Link', run: () => window.open('https://github.com/MAbdullah369', '_blank') },
  { label: 'Open LinkedIn',     hint: 'Link', run: () => window.open('https://linkedin.com/in/mabdullah79', '_blank') },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const filtered = items.filter((i) =>
    i.label.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    const onOpenEvent = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-cmdk', onOpenEvent)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-cmdk', onOpenEvent)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      requestAnimationFrame(() => inputRef.current?.focus())
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const runItem = (item: Item) => {
    item.run(router)
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="cmdk-overlay" onClick={() => setOpen(false)}>
      <div className="cmdk-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cmdk-input-row">
          <span style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>/</span>
          <input
            ref={inputRef}
            value={query}
            placeholder="Jump to a page or action..."
            onChange={(e) => { setQuery(e.target.value); setActive(0) }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)) }
              if (e.key === 'ArrowUp')   { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
              if (e.key === 'Enter' && filtered[active]) runItem(filtered[active])
            }}
          />
          <span className="kbd">Esc</span>
        </div>
        <div className="cmdk-list">
          {filtered.length === 0 && <div className="cmdk-empty">No matches</div>}
          {filtered.map((item, i) => (
            <div
              key={item.label}
              className={`cmdk-item ${i === active ? 'active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => runItem(item)}
            >
              <span>{item.label}</span>
              <span className="cmdk-item-hint">{item.hint}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
