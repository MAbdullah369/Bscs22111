'use client'
import { useMemo, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProjectCard from '../../components/ProjectCard'

type Category = 'All' | 'AI & ML' | 'Core CS' | 'Web'

const projects: {
  title: string
  description: string
  link: string
  tags: string[]
  year: string
  category: Category
  image?: string
  cover?: 'audio' | 'chess' | 'cards' | 'cms' | 'shop'
  featured?: boolean
}[] = [
  {
    title: 'Quran Recitation App (Final Year Project)',
    description: 'Awarded 1st Position in the Computer Science Department at the ITU Sparkup Innovation Summit 2026. Built real-time recitation accuracy feedback using OpenAI\'s Whisper model fine-tuned on custom datasets (+25% error detection) and reduced inference latency from 10s to 1s via INT8 post-training quantization and local TensorFlow Lite deployment.',
    link: 'https://github.com/MAbdullah369',
    tags: ['Flutter', 'Whisper API', 'TensorFlow Lite', 'Python', 'Dart', 'AI / ML'],
    year: '2025 – Present',
    category: 'AI & ML',
    image: '/projects/quran_app.jpg',
    featured: true,
  },
  {
    title: 'Client-Server Communication System',
    description: 'High-performance client-server communication architecture implemented in C using low-level UNIX/POSIX sockets and IPC mechanisms. Designed custom command parsing, multithreaded request-response dispatching, and robust packet validation simulating core OS protocols.',
    link: 'https://github.com/MAbdullah369',
    tags: ['C', 'Operating Systems', 'Sockets / IPC', 'Systems Programming', 'Linux'],
    year: '2024',
    category: 'Core CS',
    image: '/projects/client_server.jpg',
  },
  {
    title: 'TravelHub — Travel & Itinerary Platform',
    description: 'Full-featured travel management and exploration platform enabling dynamic itinerary generation, destination discovery, and multi-tier booking coordination. Integrated RESTful backend services with real-time location mapping, route calculation, and caching layers.',
    link: 'https://github.com/MAbdullah369',
    tags: ['Next.js', 'React.js', 'Node.js', 'MongoDB', 'REST APIs', 'Tailwind CSS'],
    year: '2024',
    category: 'Web',
    image: '/projects/travelhub.jpg',
  },
  {
    title: 'Quran Audio Data Collection Platform',
    description: 'Responsive full-stack data crowdsourcing platform built to collect and catalog 15,000+ high-quality audio recordings for AI model training. Implemented user authentication schemas, automated audio validation workflows, and structured MongoDB metadata pipelines.',
    link: 'https://github.com/MAbdullah369',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'REST APIs'],
    year: '2025 – 2026',
    category: 'AI & ML',
    image: '/projects/audio.jpg',
  },
  {
    title: 'Chess Engine & Interactive Game',
    description: 'Two-player console chess engine implementing standard international chess rules (including castling, en passant, promotion, and checkmate/stalemate detection). Designed using modular object-oriented architecture separating board state, piece behavior, and move validation.',
    link: 'https://github.com/MAbdullah369',
    tags: ['C++', 'OOP', 'Game Engine', 'Algorithms', 'State Machine'],
    year: '2023',
    category: 'Core CS',
    image: '/projects/chess.jpg',
  },
  {
    title: 'Solitaire Card Game Engine',
    description: 'Interactive Solitaire card game engine backed by custom stack and array data structures. Designed pile management algorithms with move validation, deck shuffling, undo/redo state stacks, and automatic win-condition detection.',
    link: 'https://github.com/MAbdullah369',
    tags: ['C++', 'Data Structures', 'Algorithms', 'Game Logic'],
    year: '2023',
    category: 'Core CS',
    image: '/projects/cards.jpg',
  },
  {
    title: 'University Management Portal (CMS)',
    description: 'Comprehensive data-driven content management system enabling multi-tier university workflow scheduling. Implemented secure RBAC middleware supporting Admin, Instructor, and Student roles via JWT, with analytics views and 35% faster query response times.',
    link: 'https://github.com/MAbdullah369',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JWT', 'RBAC'],
    year: '2023',
    category: 'Web',
    image: '/projects/cms.jpg',
  },
  {
    title: 'E-commerce Platform',
    description: 'Commercial-ready storefront with centralized production pipeline, product catalog, shopping cart, and order management. Reduced average server response latency by 40% through optimized MongoDB aggregation pipelines and high-throughput query structures.',
    link: 'https://github.com/MAbdullah369',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs'],
    year: '2025',
    category: 'Web',
    image: '/projects/shop.jpg',
  },
]

const categories: Category[] = ['All', 'AI & ML', 'Core CS', 'Web']

export default function ProjectsPage() {
  const [active, setActive] = useState<Category>('All')

  const counts = useMemo(() => {
    const c: Record<Category, number> = { All: projects.length, 'AI & ML': 0, 'Core CS': 0, Web: 0 }
    projects.forEach((p) => { c[p.category] += 1 })
    return c
  }, [])

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <section
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: 'clamp(7rem, 18vw, 10rem) 1.5rem clamp(4rem, 10vw, 7rem)',
          width: '100%',
        }}
      >
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="section-label anim-fade">// all-projects</span>
          <h1 className="anim-fade-up" style={{ marginBottom: '0.5rem' }}>
            Software projects
          </h1>
          <span className="accent-line" style={{ width: '2.5rem', marginBottom: '1rem' }} />
          <p className="anim-fade-up anim-fade-up-d1" style={{ color: 'var(--ink-soft)', maxWidth: '52ch', lineHeight: 1.7 }}>
            Software engineering projects spanning AI &amp; embedded machine learning, low-level systems programming in C/C++, algorithms &amp; data structures, and production-grade full-stack platforms.
          </p>
        </div>

        <div className="filter-tabs anim-fade-up anim-fade-up-d2" style={{ marginBottom: '2.5rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${active === cat ? 'active' : ''}`}
              onClick={() => setActive(cat)}
              data-cursor-text="FILTER"
            >
              {cat}
              <span className="filter-tab-count">{counts[cat]}</span>
            </button>
          ))}
        </div>

        <div
          key={active}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '1.25rem',
          }}
        >
          {filtered.map((p, i) => (
            <ProjectCard key={p.title} {...p} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ color: 'var(--muted)', padding: '3rem 0', textAlign: 'center' }}>
            Nothing here yet in this category.
          </p>
        )}
      </section>

      <Footer />
    </main>
  )
}
