'use client'
import { useRef } from 'react'
import Image from 'next/image'
import ProjectCover from './ProjectCover'

type CoverVariant = 'audio' | 'chess' | 'cards' | 'cms' | 'shop'

type Props = {
  title: string
  description: string
  link?: string
  tags?: string[]
  year?: string
  index?: number
  image?: string
  cover?: CoverVariant
  featured?: boolean
}

export default function ProjectCard({ title, description, link, tags = [], year, index = 0, image, cover, featured }: Props) {
  const cardRef = useRef<HTMLElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(800px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 4).toFixed(2)}deg) translateY(-4px)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = ''
  }

  return (
    <article
      ref={cardRef}
      className="project-card card-enter"
      style={{
        animationDelay: `${Math.min(index, 8) * 0.07}s`,
        transition: 'transform 0.25s var(--ease-out-expo), border-color 0.3s',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="view"
    >
      {featured && <span className="project-featured-flag">Award-winning</span>}

      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '190px',
          marginBottom: '1.25rem',
          borderRadius: '6px',
          overflow: 'hidden',
          border: '1px solid var(--line)',
          background: 'var(--surface)',
        }}
      >
        {image ? (
          <>
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover', transition: 'transform 0.5s var(--ease-out-expo)' }}
              className="project-image-hover"
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(11,12,14,0.85) 0%, transparent 55%)',
                pointerEvents: 'none',
              }}
            />
          </>
        ) : cover ? (
          <div className="project-image-hover" style={{ width: '100%', height: '100%', transition: 'transform 0.5s var(--ease-out-expo)' }}>
            <ProjectCover variant={cover} />
          </div>
        ) : null}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.6rem' }}>
        {year && <span className="tag">{year}</span>}
      </div>

      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '0.65rem', color: 'var(--ink)' }}>
        {title}
      </h3>

      <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: '1.65', marginBottom: '1.25rem' }}>
        {description}
      </p>

      {tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
          {tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      )}

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="nav-link"
          style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent)' }}
        >
          View project
        </a>
      )}
    </article>
  )
}
