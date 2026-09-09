const socials = [
  { label: 'GitHub',   href: 'https://github.com/MAbdullah369'      },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/mabdullah79' },
  { label: 'Email',    href: 'mailto:abdullah.zahid2569@gmail.com'  },
]

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--line)',
        background: 'var(--surface)',
        padding: '3rem 0 2rem',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--ink)', marginBottom: '0.3rem' }}>
            Abdullah Zahid
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
            Software developer building AI-assisted and systems-level applications.
          </p>
        </div>

        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          {socials.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="nav-link"
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div
        style={{
          maxWidth: '72rem',
          margin: '2rem auto 0',
          padding: '1.5rem 1.5rem 0',
          borderTop: '1px solid var(--line)',
          fontSize: '0.78rem',
          color: 'var(--muted)',
        }}
      >
        <span>Designed and built by Abdullah Zahid — {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
