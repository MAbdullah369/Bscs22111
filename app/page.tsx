'use client'
import { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProjectCard from '../components/ProjectCard'
import StatCounter from '../components/StatCounter'
import { useReveal } from '../hooks/useReveal'
import Image from 'next/image'

const featured = [
  {
    title: 'Quran Recitation App (Final Year Project)',
    description: 'Awarded 1st Position in the Computer Science Department at ITU Sparkup Innovation Summit 2026. Built real-time recitation accuracy feedback using OpenAI\'s Whisper model fine-tuned on custom datasets (+25% error detection) and reduced inference latency from 10s to 1s via INT8 quantization & local TensorFlow Lite deployment.',
    link: 'https://github.com/MAbdullah369',
    tags: ['Flutter', 'Whisper API', 'TensorFlow Lite', 'Python', 'Dart'],
    year: '2025 – Present',
    image: '/projects/quran_app.jpg',
    featured: true,
  },
  {
    title: 'TravelHub — Travel & Itinerary Platform',
    description: 'Full-featured travel management and exploration platform enabling dynamic itinerary generation, destination discovery, and multi-tier booking coordination. Integrated RESTful backend services with real-time location mapping, route calculation, and caching layers.',
    link: 'https://github.com/MAbdullah369',
    tags: ['Next.js', 'React.js', 'Node.js', 'MongoDB', 'REST APIs', 'Tailwind CSS'],
    year: '2024',
    image: '/projects/travelhub.jpg',
  },
  {
    title: 'Client-Server Communication System',
    description: 'Engineered high-performance client-server architecture in C utilizing low-level UNIX/POSIX sockets and IPC mechanisms. Implemented custom command parsing, multithreaded request-response handling, and robust packet validation simulating core OS protocols.',
    link: 'https://github.com/MAbdullah369',
    tags: ['C', 'Operating Systems', 'Sockets / IPC', 'Systems Programming', 'Linux'],
    year: '2024',
    image: '/projects/client_server.jpg',
  },
]

const stats = [
  { value: 25, suffix: '%', label: 'improvement in recitation-error detection after fine-tuning Whisper on a custom dataset' },
  { value: 10, suffix: 'x', label: 'faster inference — cut response time from 10s to 1s via INT8 quantization' },
  { value: 15000, suffix: '+', label: 'crowdsourced audio recordings collected for AI model training' },
  { value: 1, prefix: '#', label: 'place, ITU Sparkup Innovation Summit 2026' },
]

const toolkit = [
  { label: 'Languages', items: ['C++', 'C', 'Python', 'TypeScript', 'SQL'] },
  { label: 'AI / ML', items: ['Whisper API', 'TensorFlow Lite', 'Model Quantization', 'Data Pipelines'] },
  { label: 'Systems & Web', items: ['Linux', 'Sockets / IPC', 'Next.js', 'Node.js', 'MongoDB', 'Docker'] },
]

const focusAreas = [
  { label: 'SYSTEMS', text: 'Deepening expertise in operating systems, low-level networking, and performance-critical C/C++ programming.' },
  { label: 'AI / ML', text: 'Optimizing and deploying machine learning models for real-time, resource-constrained environments.' },
  { label: 'OPPORTUNITIES', text: 'Actively looking for full-time software engineering roles where I can help ship reliable, high-impact systems.' },
]

const roles = ['Software Developer', 'Systems Programmer', 'AI / ML Engineer']

function RoleTypewriter() {
  const [text, setText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    const speed = deleting ? 32 : 68

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1)
        setText(next)
        if (next === current) setTimeout(() => setDeleting(true), 1500)
      } else {
        const next = current.slice(0, text.length - 1)
        setText(next)
        if (next === '') {
          setDeleting(false)
          setRoleIndex((i) => (i + 1) % roles.length)
        }
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [text, deleting, roleIndex])

  return (
    <span className="hero-typewriter-text">
      {text}
      <span className="hero-typewriter-cursor" />
    </span>
  )
}

export default function Home() {
  useReveal()
  const heroRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = heroRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--mx', `${x}%`)
    el.style.setProperty('--my', `${y}%`)

    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    if (leftColRef.current) leftColRef.current.style.transform = `translate(${px * -8}px, ${py * -5}px)`
    if (rightColRef.current) rightColRef.current.style.transform = `translate(${px * 12}px, ${py * 8}px)`
  }

  const resetParallax = () => {
    if (leftColRef.current) leftColRef.current.style.transform = ''
    if (rightColRef.current) rightColRef.current.style.transform = ''
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        className="hero-wrapper"
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={resetParallax}
        style={{ overflow: 'hidden' }}
      >
        <div className="hero-grid-bg-base" />
        <div className="hero-grid-bg-spot" />
        <div className="hero-ambient-orb" />

        <div className="hero-grid">
          {/* Left Column */}
          <div ref={leftColRef} style={{ transition: 'transform 0.35s var(--ease-out-expo)' }}>
            <div className="hero-salutation anim-fade-up">
              <span className="hero-status-dot" />
              <span>Available for software roles</span>
            </div>

            <h1 className="hero-name-title">
              <span className="hero-word">Abdullah</span>{' '}
              <span className="hero-word" style={{ animationDelay: '0.12s' }}>Zahid</span>
            </h1>

            <div className="hero-typewriter-row anim-fade-up anim-fade-up-d1">
              <span className="accent-line" style={{ width: '1.5rem', marginBottom: 0 }} />
              <RoleTypewriter />
            </div>

            <p
              className="anim-fade-up anim-fade-up-d2"
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                color: 'var(--ink-soft)',
                maxWidth: '46ch',
                lineHeight: 1.75,
                marginBottom: '1.75rem',
              }}
            >
              I build intelligent software systems and high-performance applications — spanning low-level systems programming, embedded AI/ML models, and full-stack architectures.
            </p>

            <div className="hero-chips-grid anim-fade-up anim-fade-up-d2">
              <span className="hero-chip">
                <svg className="hero-chip-icon" viewBox="0 0 16 16" fill="none">
                  <path d="M5 3 1 8l4 5M11 3l4 5-4 5" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                AI &amp; Whisper ML optimization
              </span>
              <span className="hero-chip">
                <svg className="hero-chip-icon" viewBox="0 0 16 16" fill="none">
                  <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="var(--accent2)" strokeWidth="1.4" />
                  <path d="M8 1v2.4M8 12.6V15M1 8h2.4M12.6 8H15" stroke="var(--accent2)" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                Systems &amp; low-level (C / C++)
              </span>
              <span className="hero-chip">
                <svg className="hero-chip-icon" viewBox="0 0 16 16" fill="none">
                  <rect x="1.5" y="9.5" width="4.5" height="5" rx="1" stroke="#9ec97a" strokeWidth="1.3" />
                  <rect x="6.75" y="6" width="4.5" height="8.5" rx="1" stroke="#9ec97a" strokeWidth="1.3" />
                  <rect x="10.75" y="2.5" width="4.5" height="12" rx="1" stroke="#9ec97a" strokeWidth="1.3" />
                </svg>
                Scalable full-stack software
              </span>
            </div>

            <div
              className="anim-fade-up anim-fade-up-d3"
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <a href="/projects" className="btn-primary" style={{ padding: '0.85rem 2rem' }}>
                View projects
              </a>
              <a href="/contact" className="btn-secondary" style={{ padding: '0.8rem 1.85rem' }}>
                Get in touch
              </a>
            </div>
          </div>

          {/* Right Column: Engineering console */}
          <div ref={rightColRef} className="anim-fade anim-fade-d2" style={{ position: 'relative', transition: 'transform 0.35s var(--ease-out-expo)' }}>
            <div className="hero-float-badge" style={{ top: '-16px', right: '4%' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 0 3px rgba(34,197,94,0.18)' }} />
              <span style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--ink)' }}>1st place — ITU Summit '26</span>
            </div>

            <div className="hero-console-card" data-cursor="view" data-cursor-text="ABOUT">
              <div className="hero-console-header">
                <div className="hero-traffic-dots">
                  <span className="hero-traffic-dot red" />
                  <span className="hero-traffic-dot yellow" />
                  <span className="hero-traffic-dot green" />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Image
                    src="/profile.jpg"
                    alt="Abdullah Zahid"
                    width={20}
                    height={20}
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span style={{ fontSize: '0.74rem', color: 'var(--ink-soft)', fontFamily: 'var(--font-mono)' }}>
                    abdullah.config.ts
                  </span>
                </div>

                <span style={{ fontSize: '0.68rem', color: 'var(--accent)', fontWeight: 600 }}>
                  ACTIVE
                </span>
              </div>

              <div className="hero-console-body">
                <p><span className="token-kw">const</span> <span className="token-fn">softwareEngineer</span> = &#123;</p>
                <p style={{ paddingLeft: '1.25rem' }}>
                  <span className="token-key">name:</span> <span className="token-str">'Abdullah Zahid'</span>,
                </p>
                <p style={{ paddingLeft: '1.25rem' }}>
                  <span className="token-key">role:</span> <span className="token-str">'Software Developer &amp; Engineer'</span>,
                </p>
                <p style={{ paddingLeft: '1.25rem' }}>
                  <span className="token-key">education:</span> <span className="token-str">'BS CS @ ITU (2022–2026)'</span>,
                </p>
                <p style={{ paddingLeft: '1.25rem' }}>
                  <span className="token-key">languages:</span> [
                </p>
                <p style={{ paddingLeft: '2.25rem' }}>
                  <span className="token-str">'C++'</span>, <span className="token-str">'C'</span>, <span className="token-str">'Python'</span>, <span className="token-str">'TypeScript'</span>, <span className="token-str">'SQL'</span>
                </p>
                <p style={{ paddingLeft: '1.25rem' }}>],</p>
                <p style={{ paddingLeft: '1.25rem' }}>
                  <span className="token-key">specialties:</span> [
                </p>
                <p style={{ paddingLeft: '2.25rem' }}>
                  <span className="token-str">'AI &amp; ML (Whisper / TFLite)'</span>,
                </p>
                <p style={{ paddingLeft: '2.25rem' }}>
                  <span className="token-str">'Systems &amp; IPC / Sockets'</span>,
                </p>
                <p style={{ paddingLeft: '2.25rem' }}>
                  <span className="token-str">'Scalable Full-Stack Architecture'</span>
                </p>
                <p style={{ paddingLeft: '1.25rem' }}>],</p>
                <p style={{ paddingLeft: '1.25rem' }}>
                  <span className="token-key">openToWork:</span> <span className="token-kw">true</span>
                </p>
                <p>&#125;;</p>
              </div>

              <div className="hero-console-footer">
                <span>ITU Sparkup Innovation Award — 1st place</span>
                <span style={{ color: 'var(--accent)' }}>8+ projects shipped</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll-cue">
          <span>Scroll</span>
          <div className="hero-scroll-cue-track" />
        </div>
      </section>

      {/* ── Impact ─────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '0 1.5rem clamp(3rem, 8vw, 5rem)',
          width: '100%',
        }}
      >
        <div className="reveal" style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
          <span className="section-label" style={{ display: 'inline-block', marginBottom: '0.5rem' }}>// fyp-impact</span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>Quran Recitation App Performance</h2>
        </div>
        <div className="stat-grid">
          {stats.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* ── Toolkit ────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '0 1.5rem clamp(3rem, 8vw, 5rem)',
          width: '100%',
        }}
      >
        <div className="reveal" style={{ marginBottom: '1.75rem' }}>
          <span className="section-label">// what-i-work-with</span>
          <h2>Toolkit</h2>
        </div>

        <div className="toolkit-grid reveal">
          {toolkit.map((group) => (
            <div key={group.label} className="toolkit-cell">
              <span className="toolkit-cell-label">{group.label}</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {group.items.map((item) => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Projects ──────────────────────────────────── */}
      <section
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: 'clamp(2rem, 6vw, 3rem) 1.5rem clamp(4rem, 10vw, 7rem)',
          width: '100%',
        }}
      >
        <div
          className="reveal"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '2.5rem',
            gap: '1rem',
          }}
        >
          <div>
            <span className="section-label">// featured-work</span>
            <h2>Selected projects</h2>
          </div>
          <a href="/projects" className="nav-link" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent)', whiteSpace: 'nowrap' }}>
            All projects
          </a>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '1.25rem',
          }}
        >
          {featured.map((p, i) => (
            <ProjectCard key={p.title} {...p} index={i} />
          ))}
        </div>
      </section>

      {/* ── Currently focused on ─────────────────────────────────── */}
      <section
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '0 1.5rem clamp(4rem, 10vw, 6rem)',
          width: '100%',
        }}
      >
        <div className="reveal" style={{ marginBottom: '1.75rem' }}>
          <span className="section-label">// currently</span>
          <h2>What I'm focused on right now</h2>
        </div>

        <div className="focus-grid reveal">
          {focusAreas.map((f) => (
            <div key={f.label} className="focus-card">
              <span className="focus-card-label">{f.label}</span>
              <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', lineHeight: 1.65 }}>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Band ──────────────────────────────────────────── */}
      <section
        className="reveal"
        style={{
          background: 'var(--surface2)',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
          padding: 'clamp(3rem, 8vw, 5rem) 1.5rem',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.4rem, 4vw, 2.4rem)',
            marginBottom: '1.5rem',
            maxWidth: '20ch',
            margin: '0 auto 1.5rem',
            color: 'var(--ink)',
          }}
        >
          Have a project in mind?
        </p>
        <a href="/contact" className="btn-primary" style={{ display: 'inline-flex' }}>
          Let's work together
        </a>
      </section>

      <Footer />
    </main>
  )
}
