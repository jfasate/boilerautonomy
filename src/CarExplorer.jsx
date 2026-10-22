import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { hotspots } from './content'

const ease = [0.22, 1, 0.36, 1]
const ZOOM = 1.9
const pad = (n) => String(n).padStart(2, '0')

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

// Translate (in % of the photo) that moves point (px, py) to (tx, ty) after scaling,
// clamped so the photo edges never come into view.
function zoomTo(px, py, tx, ty) {
  const limit = (ZOOM - 1) * 50
  const clamp = (v) => Math.max(-limit, Math.min(limit, v))
  return {
    scale: ZOOM,
    x: `${clamp(tx - 50 - ZOOM * (px - 50))}%`,
    y: `${clamp(ty - 50 - ZOOM * (py - 50))}%`,
  }
}

function DetailCard({ index, onClose, onStep, wide }) {
  const h = hotspots[index]
  const offset = wide ? { x: 40, y: 0 } : { x: 0, y: 24 }

  return (
    <motion.aside
      id="car-detail"
      className="detail"
      aria-live="polite"
      initial={{ opacity: 0, ...offset }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, ...offset }}
      transition={{ duration: 0.5, ease }}
    >
      <div className="detail-top">
        <span className="detail-count">
          {pad(index + 1)} <span>/ {pad(hotspots.length)}</span>
        </span>
        <button className="detail-close" onClick={onClose} aria-label="Close details">
          Close ✕
        </button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease }}
        >
          <p className="detail-tagline">{h.tagline}</p>
          <h3 className="detail-title">{h.title}</h3>
          <dl className="detail-specs">
            {h.specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="detail-body">{h.body}</p>
        </motion.div>
      </AnimatePresence>

      <div className="detail-nav">
        <button onClick={() => onStep(-1)} aria-label="Previous part">← Prev</button>
        <button onClick={() => onStep(1)} aria-label="Next part">Next →</button>
      </div>
    </motion.aside>
  )
}

export default function CarExplorer() {
  const [active, setActive] = useState(null)
  const wide = useMediaQuery('(min-width: 900px)')
  const pins = useRef([])
  const open = active !== null
  const h = open ? hotspots[active] : null

  // Keep the selected point clear of the detail card: left third on desktop, centered on phones.
  const zoom = h ? zoomTo(h.x, h.y, wide ? 30 : 50, 50) : { scale: 1, x: '0%', y: '0%' }

  const close = () => {
    const i = active
    setActive(null)
    if (i !== null) pins.current[i]?.focus()
  }
  const step = (d) => setActive((i) => (i + d + hotspots.length) % hotspots.length)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const card = (
    <AnimatePresence>
      {open && <DetailCard key="card" index={active} onClose={close} onStep={step} wide={wide} />}
    </AnimatePresence>
  )

  return (
    <div className={`explorer ${open ? 'is-open' : ''}`}>
      <div className="explorer-stage">
        <motion.div className="explorer-zoom" animate={zoom} transition={{ duration: 0.9, ease }}>
          <img
            src={`${import.meta.env.BASE_URL}media/car-topdown.webp`}
            alt="Top-down view of the Boiler Autonomy car showing the LiDAR, onboard computer, batteries and wiring"
            loading="lazy"
            width="2000"
            height="1125"
          />
          {hotspots.map((p, i) => {
            const hidden = open && active !== i
            return (
              <motion.button
                key={p.title}
                ref={(el) => (pins.current[i] = el)}
                className={`pin ${active === i ? 'is-active' : ''}`}
                style={{ left: `${p.x}%`, top: `${p.y}%`, pointerEvents: hidden ? 'none' : 'auto' }}
                animate={{ opacity: hidden ? 0 : 1, scale: open ? 1 / ZOOM : 1 }}
                transition={{ duration: 0.5, ease }}
                tabIndex={hidden ? -1 : 0}
                aria-expanded={active === i}
                aria-controls="car-detail"
                aria-label={`${pad(i + 1)} ${p.title}: ${active === i ? 'hide' : 'show'} details`}
                onClick={() => (active === i ? close() : setActive(i))}
              >
                <span className="pin-ring" aria-hidden="true" />
                <span className="pin-icon" aria-hidden="true" />
              </motion.button>
            )
          })}
        </motion.div>
        <div className="explorer-shade" aria-hidden="true" />

        <AnimatePresence>
          {!open && (
            <motion.p
              className="explorer-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="pin-icon pin-icon-static" aria-hidden="true" /> Select a point to explore the car
            </motion.p>
          )}
        </AnimatePresence>

        {wide && card}
      </div>
      {!wide && card}
    </div>
  )
}
