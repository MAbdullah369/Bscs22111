'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useReveal } from '../../hooks/useReveal'

export default function ContactPage() {
  useReveal()
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    /*
      Wire up your preferred email service here
      (Resend, SendGrid, Formspree, etc.)
    */
    setSent(true)
  }

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
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}
      >
        {/* Left */}
        <div>
          <span className="section-label anim-fade">// get-in-touch</span>
          <h1 className="anim-fade-up" style={{ marginBottom: '0.5rem' }}>
            Let's talk
          </h1>
          <span className="accent-line" style={{ width: '2.5rem', marginBottom: '1.5rem' }} />

          <p className="anim-fade-up anim-fade-up-d1" style={{ color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: '2rem' }}>
            Whether you have a project in mind, a job opportunity, or just want to say hello — my inbox is always open.
          </p>

          <div className="anim-fade-up anim-fade-up-d2" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a
              href="mailto:abdullah.zahid2569@gmail.com"
              className="nav-link"
              style={{ fontWeight: 600, color: 'var(--accent)', fontSize: '1rem', width: 'fit-content' }}
            >
              abdullah.zahid2569@gmail.com
            </a>
            <a
              href="tel:+923034232979"
              className="nav-link"
              style={{ fontWeight: 500, color: 'var(--ink-soft)', fontSize: '0.95rem', width: 'fit-content' }}
            >
              +92 303 4232979
            </a>
          </div>
        </div>

        {/* Right — form */}
        <div className="reveal">
          {sent ? (
            <div style={{ padding: '2.5rem', border: '1px solid var(--line)', borderRadius: '10px', background: 'var(--surface2)', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>
                Message sent
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                I'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }} noValidate>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '0.4rem' }}>
                    Name
                  </label>
                  <input className="field" placeholder="Your name" required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '0.4rem' }}>
                    Email
                  </label>
                  <input className="field" type="email" placeholder="you@example.com" required />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '0.4rem' }}>
                  Subject
                </label>
                <input className="field" placeholder="What's this about?" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '0.4rem' }}>
                  Message
                </label>
                <textarea className="field" placeholder="Tell me about your project..." rows={5} style={{ resize: 'vertical' }} required />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Send message
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
