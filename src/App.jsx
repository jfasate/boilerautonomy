import { useRef, useState } from 'react'
import {
  motion,
  MotionConfig,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from 'motion/react'
import { site, nav, people, hero, mission, specs, stack, progress, teams } from './content'
import CarExplorer from './CarExplorer'
import JoinForm from './JoinForm'
import useApplyOpen from './useApplyOpen'
import './App.css'

const media = (file) => `${import.meta.env.BASE_URL}media/${file}`
const ease = [0.22, 1, 0.36, 1]

const mailto = (subject) =>
  `mailto:${site.emails.join(',')}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`

function Reveal({ children, delay = 0, className, as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </Tag>
  )
}

function Label({ children }) {
  return <p className="label">{children}</p>
}

function Logo() {
  return (
    <a href="#top" className="logo" aria-label={`${site.name} home`}>
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path d="M3 18 L12 4 L21 18 Z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M8 18 L12 11.5 L16 18" fill="currentColor" />
      </svg>
      <span>Boiler Autonomy</span>
    </a>
  )
}

function Header() {
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setSolid(y > 40))

  return (
    <header className={`header ${solid || open ? 'is-solid' : ''}`}>
      <div className="header-inner">
        <div className="brand">
          {site.universityLogo && (
            <>
              <img className="brand-university" src={media(site.universityLogo)} alt={site.school} width="648" height="120" />
              <span className="brand-divider" aria-hidden="true" />
            </>
          )}
          <Logo />
        </div>
        <nav className="nav-desktop" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <a className="btn btn-small btn-gold nav-cta" href="#apply">Join the team</a>
        <button
          className="menu-btn"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            className="nav-mobile"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            {[...nav, { label: 'Join the team', href: '#apply' }].map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="hero" id="top">
      <motion.div className="hero-media" style={{ scale }}>
        <video
          src={media('hero.mp4')}
          poster={media('hero-poster.webp')}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      </motion.div>
      <div className="hero-shade" />
      <motion.div className="hero-content container" style={{ opacity: fade }}>
        <motion.p
          className="label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {hero.eyebrow}
        </motion.p>
        <h1 className="hero-title">
          {hero.title.map((line, i) => (
            <span className="line-mask" key={line}>
              <motion.span
                className="line"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease, delay: 0.3 + i * 0.12 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          className="hero-body"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.7 }}
        >
          {hero.body}
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.85 }}
        >
          <a className="btn btn-gold" href="#apply">Join the team</a>
          <a className="btn btn-ghost" href="#racing">Watch it drive</a>
        </motion.div>
      </motion.div>
      <motion.a
        href="#mission"
        className="scroll-cue"
        aria-label="Scroll to mission"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span />
      </motion.a>
    </section>
  )
}

function Mission() {
  return (
    <section className="section" id="mission">
      <div className="container">
        <Label>{mission.label}</Label>
        <Reveal as="h2" className="statement">{mission.statement}</Reveal>
        <div className="story">
          {mission.story.map((p, i) => (
            <Reveal as="p" key={i} delay={i * 0.1}>{p}</Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Specs() {
  return (
    <section className="specs" aria-label="Car specifications">
      <div className="container specs-grid">
        {specs.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="spec">
            <p className="spec-value">{s.value}</p>
            <p className="spec-label">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Platform() {
  return (
    <section className="section" id="platform">
      <div className="container">
        <div className="section-head">
          <Label>Platform</Label>
          <Reveal as="h2" className="h2">The car.</Reveal>
          <Reveal as="p" className="lede" delay={0.1}>
            A 1/10-scale race chassis carrying a full self-driving stack. Everything it needs to see and decide rides on board.
          </Reveal>
        </div>

        <Reveal>
          <CarExplorer />
        </Reveal>

        <div className="gallery">
          <Reveal className="gallery-item">
            <img src={media('car-side.webp')} alt="Three-quarter side view of the car on a lab bench" loading="lazy" width="2000" height="1125" />
          </Reveal>
          <Reveal className="gallery-item" delay={0.1}>
            <img src={media('car-angle-top.webp')} alt="Angled top view of the car showing the compute module and LiDAR" loading="lazy" width="2000" height="1125" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Autonomy() {
  return (
    <section className="section section-alt" id="autonomy">
      <div className="container">
        <div className="section-head">
          <Label>Autonomy stack</Label>
          <Reveal as="h2" className="h2">Sense. Think. Drive.</Reveal>
          <Reveal as="p" className="lede" delay={0.1}>
            Every lap is a loop of four problems, solved many times a second on the car itself.
          </Reveal>
        </div>
        <div className="stack">
          {stack.map((s, i) => (
            <Reveal key={s.n} className="stack-item" delay={i * 0.08}>
              <span className="stack-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <motion.span
                className="stack-bar"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease, delay: 0.3 + i * 0.15 }}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Racing() {
  return (
    <section className="section" id="racing">
      <div className="container">
        <div className="section-head">
          <Label>Racing</Label>
          <Reveal as="h2" className="h2">From the lab track to the race floor.</Reveal>
          <Reveal as="p" className="lede" delay={0.1}>
            We test on tube-lined tracks we build ourselves, then bring the car to F1TENTH events to race against teams from other universities.
          </Reveal>
        </div>
        <div className="racing">
          <Reveal className="video-card">
            <video
              src={media('lab-track.mp4')}
              poster={media('lab-track-poster.webp')}
              controls
              preload="none"
              playsInline
            />
            <p className="caption">Autonomous laps on our test track</p>
          </Reveal>
          <Reveal className="video-card" delay={0.1}>
            <img src={media('race-venue.webp')} alt="The car on a staging table beside a large F1TENTH race track lined with orange and yellow tubes" loading="lazy" width="2000" height="1125" />
            <p className="caption">Ready to run at a race venue</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Progress() {
  return (
    <section className="section section-alt" id="progress">
      <div className="container">
        <div className="section-head">
          <Label>Where we are</Label>
          <Reveal as="h2" className="h2">{progress.title}</Reveal>
          <Reveal as="p" className="lede" delay={0.1}>{progress.lede}</Reveal>
        </div>
        <ol className="roadmap">
          {progress.items.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 0.08} className={`road ${r.status === 'Now' ? 'is-now' : ''}`}>
              <div className="road-top">
                <span className="road-phase">{String(i + 1).padStart(2, '0')}</span>
                <span className="road-status">{r.status}</span>
              </div>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Team() {
  return (
    <section className="section" id="team">
      <div className="container">
        <div className="section-head">
          <Label>Team</Label>
          <Reveal as="h2" className="h2">The people behind the car.</Reveal>
        </div>
        {[
          ['Principal Investigators', people.filter((p) => p.role === 'Principal Investigator')],
          ['Student team', people.filter((p) => p.role !== 'Principal Investigator')],
        ].map(([groupLabel, group]) => (
          <div className="people-group" key={groupLabel}>
            <p className="people-label">{group.length === 1 ? groupLabel.replace(/s$/, '') : groupLabel}</p>
            <ul className="people">
              {group.map((p, i) => (
                <Reveal as="li" key={p.name} delay={i * 0.08} className="person">
                  <p className="person-role">{p.role}</p>
                  <h3>{p.name}</h3>
                  {(p.email || p.linkedin) && (
                    <div className="person-links">
                      {p.email && <a href={`mailto:${p.email}`}>{p.email}</a>}
                      {p.linkedin && (
                        <a href={p.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
                      )}
                    </div>
                  )}
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function Join() {
  return (
    <section className="section join" id="join">
      <div className="container">
        <div className="join-head">
          <div>
            <Label>Join</Label>
            <Reveal as="h2" className="h2">Build the future of autonomy with us.</Reveal>
            <Reveal as="p" className="lede" delay={0.1}>
              No experience with self-driving cars needed. If you like code, circuits, math or making things go fast, there is a seat for you.
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <a className="btn btn-gold btn-large" href="#apply">Apply to join</a>
          </Reveal>
        </div>
        <ul className="teams">
          {teams.map((t, i) => (
            <Reveal as="li" key={t.title} delay={i * 0.06} className="team">
              <h3>{t.title}</h3>
              <p>{t.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Support() {
  return (
    <section className="support">
      <div className="container support-inner">
        <Reveal as="h2" className="h2">Support the team.</Reveal>
        <Reveal as="p" className="lede" delay={0.1}>
          Sponsors fund the hardware, travel and competition fees that turn students into autonomy engineers. Partner with us and meet them early.
        </Reveal>
        <Reveal delay={0.2}>
          <a className="btn btn-ghost" href={mailto('Sponsoring Boiler Autonomy')}>Become a sponsor</a>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  const socials = Object.entries(site.social).filter(([, url]) => url)
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Logo />
            <p className="footer-note">
              A student autonomous racing team at {site.school}, {site.location}.
            </p>
            {site.universityLogo && (
              <img className="footer-university" src={media(site.universityLogo)} alt={site.school} />
            )}
          </div>
          <nav className="footer-links" aria-label="Footer">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
            <a href={mailto()}>Contact</a>
            {socials.map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noreferrer">{name}</a>
            ))}
          </nav>
        </div>
        <p className="wordmark" aria-hidden="true">BOILER AUTONOMY</p>
        <p className="copyright">© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
}

export default function App() {
  const [applyOpen, closeApply] = useApplyOpen()

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#mission">Skip to content</a>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Mission />
        <Specs />
        <Platform />
        <Autonomy />
        <Racing />
        <Progress />
        <Team />
        <Join />
        <Support />
      </main>
      <Footer />
      <JoinForm open={applyOpen} onClose={closeApply} />
    </MotionConfig>
  )
}
