type Variant = 'audio' | 'chess' | 'cards' | 'cms' | 'shop'

function Base({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 400 190" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`glow-${id}`} cx="50%" cy="0%" r="90%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`floor-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--surface3)" />
          <stop offset="100%" stopColor="var(--surface2)" />
        </linearGradient>
        <pattern id={`dots-${id}`} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.06)" />
        </pattern>
      </defs>
      <rect width="400" height="190" fill={`url(#floor-${id})`} />
      <rect width="400" height="190" fill={`url(#dots-${id})`} />
      <rect width="400" height="190" fill={`url(#glow-${id})`} />
      {children}
    </svg>
  )
}

/* Small macOS-style window chrome, used for the real web-app projects
   so the illustration reads as "this is a product", not a decoration. */
function AppChrome({ label }: { label: string }) {
  return (
    <g>
      <rect x="16" y="14" width="368" height="26" rx="6" fill="var(--surface)" opacity="0.55" />
      <circle cx="30" cy="27" r="3.5" fill="#ff5f56" opacity="0.8" />
      <circle cx="42" cy="27" r="3.5" fill="#ffbd2e" opacity="0.8" />
      <circle cx="54" cy="27" r="3.5" fill="#27c93f" opacity="0.8" />
      <text x="200" y="31" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--muted)">
        {label}
      </text>
    </g>
  )
}

function AudioCover() {
  const id = 'audio'
  const heights = [6, 11, 8, 16, 22, 14, 28, 34, 20, 38, 46, 30, 50, 40, 52, 36, 44, 26, 32, 18, 24, 14, 20, 10, 16, 8, 12, 6]
  const cx = 200, cy = 118
  return (
    <Base id={id}>
      <AppChrome label="recorder.quranaudio.app" />
      <g transform={`translate(${cx - heights.length * 6.2},${cy})`}>
        {heights.map((h, i) => (
          <rect
            key={i}
            x={i * 12.4}
            y={-h}
            width="5"
            height={h * 2}
            rx="2.5"
            fill={i % 4 === 0 ? 'var(--accent)' : 'var(--accent2)'}
            opacity={0.55 + (h / 52) * 0.45}
            className="cover-eq-bar"
            style={{ animationDelay: `${i * 0.045}s` }}
          />
        ))}
      </g>
      <line x1="30" y1={cy} x2="370" y2={cy} stroke="rgba(255,255,255,0.08)" strokeDasharray="2 5" />

      <g transform="translate(200,150)">
        <circle r="14" fill="var(--accent)" />
        <path d="M-4 -6 L7 0 L-4 6 Z" fill="var(--accent-ink)" />
      </g>
      <text x="200" y="176" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--muted)">
        00:42 / clip_00913.wav
      </text>
      <circle cx="356" cy="27" r="3" fill="#ff5f56" className="cover-blink" />
      <text x="345" y="30" textAnchor="end" fontFamily="var(--font-mono)" fontSize="8" fill="var(--muted)">REC</text>
    </Base>
  )
}

function ChessCover() {
  const id = 'chess'
  const size = 15.5
  const cols = 8, rows = 8
  const offsetX = 200 - (size * cols) / 2
  const offsetY = 95 - (size * rows) / 2
  const cells = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={offsetX + c * size}
          y={offsetY + r * size}
          width={size}
          height={size}
          fill={(r + c) % 2 === 0 ? 'var(--surface2)' : 'var(--surface)'}
        />
      )
    }
  }
  return (
    <Base id={id}>
      <g style={{ filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.45))' }}>
        {cells}
        <rect x={offsetX} y={offsetY} width={size * cols} height={size * rows} fill="none" stroke="var(--line-strong)" />
      </g>

      {/* king */}
      <g transform={`translate(${offsetX + size * 3.1},${offsetY + size * 2.2}) scale(1.15)`} className="cover-sway">
        <defs>
          <linearGradient id={`king-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="#b06f27" />
          </linearGradient>
        </defs>
        <rect x="12" y="-2" width="4" height="9" fill={`url(#king-${id})`} />
        <rect x="9" y="-5" width="10" height="3" rx="1" fill={`url(#king-${id})`} />
        <path d="M5 7 C5 -2 23 -2 23 7 L26 26 C26 30 2 30 2 26 Z" fill={`url(#king-${id})`} />
        <rect x="-1" y="26" width="30" height="7" rx="2" fill={`url(#king-${id})`} />
        <ellipse cx="14" cy="14" rx="7" ry="4" fill="rgba(255,255,255,0.14)" />
      </g>

      {/* knight */}
      <g transform={`translate(${offsetX + size * 5},${offsetY + size * 3}) scale(1.05)`} className="cover-sway" style={{ animationDelay: '0.5s' }}>
        <defs>
          <linearGradient id={`knight-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent2)" />
            <stop offset="100%" stopColor="#4c6870" />
          </linearGradient>
        </defs>
        <path d="M6 26 C4 14 4 8 12 2 C18 -2 24 2 22 8 C20 12 16 10 16 14 C20 15 22 18 22 22 L24 26 Z" fill={`url(#knight-${id})`} />
        <rect x="0" y="26" width="26" height="6" rx="2" fill={`url(#knight-${id})`} />
        <circle cx="17" cy="7" r="1.3" fill="var(--surface)" />
      </g>

      <text x="200" y="176" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--muted)">
        chess --engine --two-player
      </text>
    </Base>
  )
}

function CardsCover() {
  const id = 'cards'
  const suits: { s: string; c: string }[] = [
    { s: '♠', c: 'var(--ink-soft)' },
    { s: '♥', c: 'var(--accent)' },
    { s: '♦', c: 'var(--accent)' },
    { s: '♣', c: 'var(--ink-soft)' },
  ]

  return (
    <Base id={id}>
      <defs>
        <linearGradient id={`back-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent2)" />
          <stop offset="100%" stopColor="#3f5a63" />
        </linearGradient>
      </defs>

      {/* face-down tableau piles */}
      <g transform="translate(46,40)">
        {[0, 1, 2, 3].map((pile) => (
          <g key={pile} transform={`translate(${pile * 40}, 0)`}>
            {[0, 1, 2].map((depth) => (
              <rect
                key={depth}
                x={0}
                y={depth * 5}
                width="34"
                height="46"
                rx="4"
                fill={`url(#back-${id})`}
                stroke="var(--surface)"
                strokeWidth="1.5"
                opacity={0.55 + depth * 0.15}
              />
            ))}
          </g>
        ))}
      </g>

      {/* fanned face-up cards, foreground */}
      {suits.map((suit, i) => (
        <g
          key={i}
          transform={`translate(${205 + i * 32}, 78) rotate(${(i - 1.5) * 9})`}
          className="cover-float"
          style={{ animationDelay: `${i * 0.22}s` }}
        >
          <rect x="0" y="0" width="52" height="72" rx="5" fill="var(--surface2)" stroke="var(--line-strong)" style={{ filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.4))' }} />
          <text x="7" y="18" fontSize="11" fontFamily="var(--font-mono)" fill={suit.c}>{i + 1}{suit.s}</text>
          <text x="26" y="46" fontSize="22" textAnchor="middle" fill={suit.c}>{suit.s}</text>
        </g>
      ))}

      <text x="200" y="176" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--muted)">
        solitaire --new-game
      </text>
    </Base>
  )
}

function CmsCover() {
  const id = 'cms'
  const bars = [26, 46, 34, 58, 40, 52, 30]
  return (
    <Base id={id}>
      <AppChrome label="admin.university-portal.edu" />

      {/* sidebar */}
      <rect x="16" y="48" width="70" height="126" rx="6" fill="var(--surface)" opacity="0.5" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="26" y={62 + i * 22} width={i === 0 ? 50 : 40} height="8" rx="2" fill={i === 0 ? 'var(--accent)' : 'var(--line-strong)'} opacity={i === 0 ? 0.9 : 0.6} />
      ))}

      {/* bar chart card */}
      <rect x="96" y="48" width="150" height="126" rx="8" fill="var(--surface)" opacity="0.45" />
      <g transform="translate(112,152)">
        {bars.map((h, i) => (
          <rect
            key={i}
            x={i * 18}
            y={-h}
            width="10"
            height={h}
            rx="2"
            fill={i === 3 ? 'var(--accent)' : 'var(--accent2)'}
            opacity="0.85"
            className="cover-grow"
            style={{ animationDelay: `${i * 0.08}s`, transformOrigin: `${i * 18 + 5}px 0px` }}
          />
        ))}
        <line x1="-6" y1="0" x2="128" y2="0" stroke="var(--line-strong)" />
      </g>

      {/* progress ring card */}
      <rect x="256" y="48" width="128" height="126" rx="8" fill="var(--surface)" opacity="0.45" />
      <g transform="translate(320,100)">
        <circle r="24" fill="none" stroke="var(--line-strong)" strokeWidth="6" />
        <circle r="24" fill="none" stroke="var(--accent)" strokeWidth="6" strokeDasharray="98 151" strokeLinecap="round" transform="rotate(-90)" />
        <text textAnchor="middle" y="5" fontFamily="var(--font-mono)" fontSize="12" fill="var(--ink)">65%</text>
      </g>
      <rect x="286" y="140" width="68" height="7" rx="2" fill="var(--line-strong)" opacity="0.6" />
      <rect x="286" y="152" width="46" height="7" rx="2" fill="var(--line-strong)" opacity="0.6" />
    </Base>
  )
}

function ShopCover() {
  const id = 'shop'
  return (
    <Base id={id}>
      <AppChrome label="checkout.storefront.app" />

      {/* product grid */}
      <g transform="translate(28,50)">
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => {
            const active = row === 1 && col === 2
            return (
              <g key={`${row}-${col}`} transform={`translate(${col * 42}, ${row * 38})`}>
                <rect width="34" height="30" rx="5" fill={active ? 'var(--accent)' : 'var(--surface)'} opacity={active ? 1 : 0.55} />
                {active && <circle cx="17" cy="15" r="5" fill="var(--accent-ink)" opacity="0.5" />}
              </g>
            )
          })
        )}
      </g>

      {/* cart summary card */}
      <rect x="256" y="48" width="128" height="126" rx="8" fill="var(--surface)" opacity="0.5" />
      <g transform="translate(272,68)" stroke="var(--accent2)" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 0 h6 l6 24 h26 l6 -16 h-32" />
        <circle cx="10" cy="32" r="3" fill="var(--accent2)" stroke="none" />
        <circle cx="30" cy="32" r="3" fill="var(--accent2)" stroke="none" />
      </g>
      <rect x="272" y="112" width="96" height="6" rx="2" fill="var(--line-strong)" opacity="0.6" />
      <rect x="272" y="126" width="72" height="6" rx="2" fill="var(--line-strong)" opacity="0.6" />
      <rect x="272" y="146" width="96" height="16" rx="4" fill="var(--accent)" />
      <text x="320" y="157" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--accent-ink)">CHECKOUT</text>

      <rect className="cover-scan" x="0" y="0" width="70" height="190" fill="var(--accent)" opacity="0.05" />
    </Base>
  )
}

export default function ProjectCover({ variant }: { variant: Variant }) {
  switch (variant) {
    case 'audio': return <AudioCover />
    case 'chess': return <ChessCover />
    case 'cards': return <CardsCover />
    case 'cms':   return <CmsCover />
    case 'shop':  return <ShopCover />
    default: return null
  }
}
