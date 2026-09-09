'use client'
import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useReveal } from '../../hooks/useReveal'

const education = [
  { degree: 'Bachelor of Science in Computer Science', school: 'Information Technology University', period: 'Sept 2022 – June 2026', details: 'Data Structures, Algorithms, AI, Database Management' },
  { degree: 'Intermediate in Pre-Engineering', school: 'Punjab Group of Colleges', period: 'Oct 2020 – June 2022', details: 'Engineering Foundation' },
]

const coursework = [
  'Data Structures',
  'Algorithms Analysis',
  'Operating Systems',
  'Database Management',
  'Artificial Intelligence',
  'Compiler Construction',
]

const skillsSummary = [
  { label: 'Languages', color: 'var(--accent)', items: ['C++', 'C', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS'] },
  { label: 'Frameworks & AI', color: 'var(--accent2)', items: ['React.js', 'Next.js', 'Flutter', 'Node.js', 'Express.js', 'Tailwind CSS', 'TensorFlow Lite', 'Whisper API'] },
  { label: 'Tools & Environments', color: '#9ec97a', items: ['Linux', 'Git', 'Docker', 'GitHub', 'VS Code', 'Visual Studio'] },
]

export default function AboutPage() {
  useReveal()

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <section
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: 'clamp(7rem, 18vw, 10rem) 1.5rem clamp(4rem, 10vw, 7rem)',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}
      >
        {/* Left column */}
        <div>
          <div className="anim-fade" style={{ width: '88px', height: '88px', marginBottom: '2rem' }}>
            <Image
              src="/profile.jpg"
              alt="Abdullah Zahid"
              width={88}
              height={88}
              style={{ borderRadius: '10px', objectFit: 'cover', display: 'block', border: '1px solid var(--line-strong)' }}
              priority
            />
          </div>

          <span className="section-label anim-fade-up">// about-me</span>
          <h1 className="anim-fade-up" style={{ marginBottom: '0.5rem' }}>
            Building software that holds up under real conditions
          </h1>
          <span className="accent-line anim-fade-up" style={{ width: '2.5rem', marginBottom: '1.5rem' }} />

          <p
            className="anim-fade-up anim-fade-up-d1"
            style={{ color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: '1rem', fontSize: '1rem' }}
          >
            I'm a computer science student at Information Technology University with a strong foundation in software engineering, systems programming, and applied artificial intelligence. I build high-performance software across C/C++, Python, and full-stack ecosystems.
          </p>
          <p
            className="anim-fade-up anim-fade-up-d2"
            style={{ color: 'var(--ink-soft)', lineHeight: 1.75, fontSize: '1rem', marginBottom: '1.5rem' }}
          >
            My final year project — an AI-powered Quranic recitation accuracy analyzer — won 1st Position at the ITU Sparkup Innovation Summit 2026. I'm driven by engineering reliable systems, optimizing latency, and solving complex computational problems end to end.
          </p>

          <div className="anim-fade-up anim-fade-up-d3" style={{ marginTop: '2rem' }}>
            <a href="/contact" className="btn-primary">Get in touch</a>
          </div>
        </div>

        {/* Right column */}
        <div>
          <h2 className="reveal" style={{ fontSize: '1.15rem', marginBottom: '1.25rem', color: 'var(--muted)' }}>
            Education
          </h2>

          <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', marginBottom: '2.5rem' }}>
            {education.map(({ degree, school, period, details }, i) => (
              <li
                key={i}
                className="reveal"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '0.5rem 2rem',
                  alignItems: 'start',
                  padding: '1.25rem 0',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: '0.15rem' }}>{degree}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{school}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.35rem' }}>{details}</p>
                </div>
                <span className="tag" style={{ marginTop: '0.1rem', whiteSpace: 'nowrap' }}>{period}</span>
              </li>
            ))}
          </ol>

          <h2 className="reveal" style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--muted)' }}>
            Relevant coursework
          </h2>

          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
            {coursework.map((course) => (
              <span key={course} className="tag">{course}</span>
            ))}
          </div>

          <h2 className="reveal" style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--muted)' }}>
            Technical stack
          </h2>

          <div className="reveal" style={{ display: 'grid', gap: '1.1rem' }}>
            {skillsSummary.map((group) => (
              <div key={group.label}>
                <p style={{ fontSize: '0.78rem', fontWeight: 600, color: group.color, marginBottom: '0.5rem' }}>
                  {group.label}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {group.items.map((item) => (
                    <span key={item} className="tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
