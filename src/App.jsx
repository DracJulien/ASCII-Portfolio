import { Github, Instagram, Linkedin, Menu, Moon, Mountain, Printer, Sun, Twitter, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import BackgroundRain from '@/components/BackgroundRain.jsx'
import CloneMeButton from '@/components/CloneMeButton.jsx'
import Footer from '@/components/Footer.jsx'
import HeatmapWithRefresh from '@/components/HeatmapWithRefresh.jsx'
import ProjectCard from '@/components/ProjectCard.jsx'
import TerminalTabs from '@/components/TerminalTabs.jsx'
import AsciiSkull from '@/components/AsciiSkull.jsx'
import ThemeSelect from '@/components/ThemeSelect.jsx'
import useTheme from '@/hooks/useTheme.js'

import pkg from '../package.json' with { type: 'json' }

const APP_VERSION = pkg.version || '0.0.0'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'activity', label: 'Activity' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const SOCIAL_LINKS = [
  { href: 'https://instagram.com/juliendrac', label: 'Instagram', icon: Instagram },
  { href: 'https://twitter.com/juliendrac', label: 'Twitter', icon: Twitter },
  { href: 'https://github.com/Dracjulien', label: 'GitHub', icon: Github },
  { href: 'https://www.linkedin.com/in/julien-drac', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://www.strava.com/athletes/juliendrac', label: 'Strava', icon: Mountain },
]

const SOCIAL_FRAME_PADDING = 18
const SOCIAL_FRAME_WIDTH = Math.max(12, SOCIAL_LINKS.reduce((max, { label }) => Math.max(max, label.length), 0) + SOCIAL_FRAME_PADDING)
const SOCIAL_FRAME_TOP = `┌${'─'.repeat(SOCIAL_FRAME_WIDTH)}┐`
const SOCIAL_FRAME_BOTTOM = `└${'─'.repeat(SOCIAL_FRAME_WIDTH)}┘`

const HERO_BANNER = String.raw`
+-------------------------------------------+
|  JULIEN DRAC // full-stack engineer       |
|  ascii-native product & platform builder  |
+-------------------------------------------+
`

const FOCUS_CARDS = [
  {
    title: 'Platform',
    ascii: String.raw`
  .----.
 / __  \   release engineering
| |  | |   observability hooks
| |  | |   api-first workflows
| |__| |   automation loops
 \____/`,
    bullets: [
      'Design REST and event-driven APIs with contracts that last.',
      'Automate CI/CD paths, infrastructure, and runtime diagnostics.',
    ],
  },
  {
    title: 'Front-end',
    ascii: String.raw`
  .--------.
 |  <>  <> |
 |  []  [] |
 |    --   |
  '--------'
     |  |
     '--'`,
    bullets: [
      'Ship responsive React apps that stay fast on any device.',
      'Blend design systems with ASCII flair and accessibility.',
    ],
  },
  {
    title: 'Collaboration',
    ascii: String.raw`
[ team link ]
| pair    |
| mentor  |
| document|
'---------`,
    bullets: [
      'Lead discovery workshops, align architecture, and mentor devs.',
      'Turn ideas into living documentation and iterative delivery.',
    ],
  },
]

const ASCII_ACTIVITY_LEGEND = String.raw`
.------------------------.
| activity key           |
| [##] shipping features |
| [==] pairing & reviews |
| [..] discovery & docs  |
'------------------------'
`

const ASCII_RAIN_HEADER = String.raw`
.---------------------.
| matrix rain console |
'---------------------'
`

const ASCII_CONTACT_CARD = String.raw`
.-------------------------------.
| contact                       |
| email: juliendrac@pm.me       |
| github: github.com/Dracjulien |
| linkedin: /in/julien-drac     |
| location: Aix-en-Provence FR  |
'-------------------------------'
`

const PROJECT_ASCII = String.raw`
[ build -> iterate -> ship ]
`

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function getStepPrecision(step) {
  const parts = step.toString().split('.')
  return parts[1] ? parts[1].length : 0
}

function snapToStep(raw, min, max, step) {
  const precision = getStepPrecision(step)
  const clamped = clamp(raw, min, max)
  const steps = Math.round((clamped - min) / step)
  const snapped = min + steps * step
  return parseFloat(snapped.toFixed(precision))
}

function AsciiSlider({ label, value, min, max, step, onChange, display }) {
  const range = max - min || 1
  const ratio = clamp((value - min) / range, 0, 1)
  const width = 12
  const filled = Math.round(ratio * width)
  const empty = Math.max(0, width - filled)
  const percent = Math.round(ratio * 100)

  const updateFromRatio = useCallback((nextRatio) => {
    const bounded = clamp(nextRatio, 0, 1)
    const raw = min + bounded * range
    const snapped = snapToStep(raw, min, max, step)
    onChange(snapped)
  }, [min, max, step, range, onChange])

  const handlePointer = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const clientX = event.clientX
    if (typeof clientX !== 'number' || rect.width === 0) return
    const nextRatio = (clientX - rect.left) / rect.width
    updateFromRatio(nextRatio)
  }, [updateFromRatio])

  const handlePointerDown = useCallback((event) => {
    event.preventDefault()
    event.currentTarget.focus()
    if (event.pointerId !== undefined) {
      event.currentTarget.setPointerCapture?.(event.pointerId)
    }
    handlePointer(event)
  }, [handlePointer])

  const handlePointerMove = useCallback((event) => {
    if (event.buttons === 0) return
    event.preventDefault()
    handlePointer(event)
  }, [handlePointer])

  const handlePointerUp = useCallback((event) => {
    event.currentTarget.releasePointerCapture?.(event.pointerId)
  }, [])

  const handleKeyDown = useCallback((event) => {
    let next = value
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      next = value - step
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      next = value + step
    } else if (event.key === 'PageDown') {
      next = value - step * 5
    } else if (event.key === 'PageUp') {
      next = value + step * 5
    } else if (event.key === 'Home') {
      next = min
    } else if (event.key === 'End') {
      next = max
    } else {
      return
    }

    event.preventDefault()
    const snapped = snapToStep(next, min, max, step)
    onChange(snapped)
  }, [value, min, max, step, onChange])

  return (
    <div className="ascii-slider">
      <div className="ascii-slider-header">
        <span>{label}</span>
        <span className="ascii-slider-value">{display(value)}</span>
      </div>
      <button
        type="button"
        className="ascii-meter-button"
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={Number(value.toFixed(getStepPrecision(step)))}
        aria-valuetext={display(value)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
      >
        <span className="meter-bracket" aria-hidden="true">[</span>
        <span className="meter-fill" aria-hidden="true">{'#'.repeat(filled)}</span>
        <span className="meter-empty" aria-hidden="true">{'.'.repeat(empty)}</span>
        <span className="meter-bracket" aria-hidden="true">]</span>
        <span className="meter-percent" aria-hidden="true">{percent}%</span>
        <span className="sr-only">{display(value)}</span>
      </button>
    </div>
  )
}

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const [navOpen, setNavOpen] = useState(false)
  const [active, setActive] = useState('about')
  const [panelOpacity, setPanelOpacity] = useState(0.52)
  const [rainSpeed, setRainSpeed] = useState(1.0)
  const [rainPaused, setRainPaused] = useState(false)
  const [rainDensity, setRainDensity] = useState(18)
  const [rainEnabled, setRainEnabled] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--card-alpha', panelOpacity.toString())
    const asciiAlpha = Math.max(0.004, Math.min(0.08, (panelOpacity - 0.2) * 0.08))
    root.style.setProperty('--ascii-alpha', asciiAlpha.toFixed(3))
  }, [panelOpacity])

  useEffect(() => {
    const ids = NAV_ITEMS.map(item => item.id)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-20% 0px -60% 0px', threshold: [0.25, 0.5, 0.75] })

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!navOpen) return
    function handleResize() {
      if (window.innerWidth > 900) setNavOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [navOpen])

  return (
    <div className="app-root">
      {rainEnabled && (
        <BackgroundRain paused={rainPaused} density={rainDensity} speed={rainSpeed} />
      )}

      <header className="nav-bar">
        <nav className="nav-inner">
          <div className="brand">
            <button
              type="button"
              className="btn nav-toggle"
              onClick={() => setNavOpen(value => !value)}
              aria-expanded={navOpen}
              aria-controls="main-menu"
            >
              {navOpen ? <X size={18} /> : <Menu size={18} />}
              <span className="sr-only">Toggle navigation</span>
            </button>
            <div className="logo">
              [ASCII?PORTFOLIO]
            </div>
            <span className="version-tag">v{APP_VERSION}</span>
          </div>

          <div className={`nav-links ${navOpen ? 'open' : ''}`} id="main-menu">
            <div className="nav-primary">
              {NAV_ITEMS.map(item => (
                <a
                  key={item.id}
                  className={`btn ${active === item.id ? 'active' : ''}`}
                  href={`#${item.id}`}
                  onClick={() => setNavOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="nav-utilities">
              <button onClick={() => window.print()} className="btn">
                <Printer size={16} />
                Print CV
              </button>
              <button onClick={toggleTheme} className="btn">
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                {theme === 'light' ? 'Dark' : 'Light'}
              </button>
              <ThemeSelect theme={theme} />
              <button
                className="btn"
                onClick={() => setRainEnabled(value => !value)}
                aria-pressed={rainEnabled}
              >
                {rainEnabled ? 'Hide rain' : 'Show rain'}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="snap-container">
        <section id="about" className="section snap-section hero-section">
          <div className="card-surface hero-top">
            <div className="hero-top-text">
              <h1 className="hero-title">Julien Drac</h1>
              <p className="hero-top-sub muted">ASCII-native product & platform builder</p>
            </div>
            <div className="hero-top-actions">
              <CloneMeButton repo="https://github.com/Dracjulien/ascii-portfolio" />
            </div>
          </div>
          <div className="hero-grid">
            <article className="hero-main card-surface">
              <p className="muted">Portfolio // ASCII interface</p>
              <pre className="ascii-banner" aria-hidden="true">
                {HERO_BANNER}
              </pre>
              <p className="hero-summary">
                I build resilient web platforms where developer experience, product value,
                and ASCII storytelling meet. From architecture to release, I keep teams shipping
                calm, legible systems.
              </p>
              <div className="hero-actions">
                <a className="btn" href="#projects">See projects</a>
                <a className="btn" href="#contact">Start a conversation</a>
              </div>

              <div className="focus-grid">
                {FOCUS_CARDS.map(card => (
                  <article key={card.title} className="focus-card">
                    <pre className="focus-ascii" aria-hidden="true">
                      {card.ascii}
                    </pre>
                    <h3>{card.title}</h3>
                    <ul>
                      {card.bullets.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </article>

            <aside className="hero-side">
              <div className="card-surface hero-side-card">
                <div className="ascii-skull-wrap" aria-hidden="true">
                  <AsciiSkull />
                </div>
                <div className="hero-side-social">
                  <pre className="hero-side-frame" aria-hidden="true">{SOCIAL_FRAME_TOP}</pre>
                  <div className="hero-social-list">
                    {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                      <div className="hero-social-row" key={label}>
                        <span className="hero-social-bar">│</span>
                        <a
                          className="btn hero-social-link"
                          href={href}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          <Icon size={16} />
                          <span>{label}</span>
                        </a>
                        <span className="hero-social-bar">│</span>
                      </div>
                    ))}
                  </div>
                  <pre className="hero-side-frame" aria-hidden="true">{SOCIAL_FRAME_BOTTOM}</pre>
                </div>
                <TerminalTabs />
              </div>
            </aside>
          </div>
        </section>

        <section id="activity" className="section snap-section activity-section">
          <div className="section-heading">
            <pre className="ascii-box section-ascii" aria-hidden="true">
              {ASCII_ACTIVITY_LEGEND}
            </pre>
            <div>
              <h2>Activity pulse</h2>
              <p className="muted">
                GitHub cadence, pairing time, and discovery work all in one glance.
              </p>
            </div>
          </div>

          <div className="activity-grid">
            <div className="card-surface activity-card">
              <HeatmapWithRefresh />
            </div>
            <div className="card-surface activity-card rain-card">
              <pre className="ascii-box section-ascii" aria-hidden="true">
                {ASCII_RAIN_HEADER}
              </pre>
              <p className="muted">
                Control the Matrix rain background to match your focus level.
              </p>

              <AsciiSlider
                label="Speed"
                value={rainSpeed}
                min={0.5}
                max={2}
                step={0.1}
                display={value => `${value.toFixed(1)}x`}
                onChange={setRainSpeed}
              />

              <AsciiSlider
                label="Opacity"
                value={panelOpacity}
                min={0.2}
                max={0.85}
                step={0.01}
                display={value => `${Math.round(value * 100)}%`}
                onChange={setPanelOpacity}
              />

              <AsciiSlider
                label="Density"
                value={rainDensity}
                min={6}
                max={30}
                step={1}
                display={value => `${Math.round(value)}`}
                onChange={setRainDensity}
              />

              <div className="rain-actions">
                <button className="btn" onClick={() => setRainPaused(value => !value)}>{rainPaused ? 'Resume rain' : 'Pause rain'}</button>
                <button className="btn" onClick={() => setRainEnabled(value => !value)}>{rainEnabled ? 'Disable rain' : 'Enable rain'}</button>
              </div>

              <small className="muted">
                Rain values persist for your session and keep the hero readable on any screen.
              </small>
            </div>
          </div>
        </section>

        <section id="projects" className="section snap-section projects-section">
          <div className="section-heading">
            <pre className="ascii-box section-ascii" aria-hidden="true">
              {PROJECT_ASCII}
            </pre>
            <div>
              <h2>Selected projects</h2>
              <p className="muted">
                A few highlights that mix platform reliability with front-end delight.
              </p>
            </div>
          </div>

          <div className="cards-grid">
            <ProjectCard
              title="Pokemon TCG Pocket Exchange"
              status="[dev]"
              badges={['NestJS', 'PostgreSQL', 'React', 'Tailwind', 'Mobile']}
              description="B2C platform to list, trade, and track collections. Multi-repo setup with REST API, JWT auth, secure uploads."
              code={`
<span class="path">PS C:\Victor&gt;</span> <span class="cmd">Invoke-RestMethod</span> -Uri "https://api.example.com/trades?status=open" | ConvertTo-Json
{
  "items": [{"id":"TR-8721","want":["Pikachu #25"],"give":["Eevee #133"],"owner":"@julien"}],
  "meta":{"count":1}
}
              `.trim()}
            />
            <ProjectCard
              title="Book Microsite // Slides & Typo"
              status="[R&D]"
              badges={['HTML/CSS/JS', 'Scroll snaps', 'Minimal']}
              description="Micro-interactions, scroll slides, elegant typography, lightweight bundle."
              code={`
<span class="path">PS C:\BookSite&gt;</span> <span class="cmd">type</span> styles.css | <span class="cmd">Select-String</span> "scroll-snap"
.container{scroll-snap-type:y mandatory}
section{scroll-snap-align:start}
              `.trim()}
            />
            <ProjectCard
              title="CI/CD // SaaS Monorepo"
              status="[prod]"
              badges={['Turborepo', 'GitHub Actions', 'Docker']}
              description="Cache-aware pipelines, build matrices, PR previews, and continuous security scans."
              code={`
<span class="path">PS C:\CI&gt;</span> <span class="cmd">cat</span> .github/workflows/ci.yml
name: ci
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npm test
              `.trim()}
            />
          </div>
        </section>

        <section id="contact" className="section snap-section contact-section">
          <div className="section-heading">
            <h2>Contact</h2>
            <p className="muted">
              Use the form or the direct links below to start a project or chat.
            </p>
          </div>

          <div className="contact-grid">
            <pre className="ascii-box contact-ascii" aria-hidden="true">
              {ASCII_CONTACT_CARD}
            </pre>

            <div className="card-surface contact-form">
              <form method="POST" action="https://formspree.io/f/yourFormID">
                <div className="form-grid">
                  <label>
                    Name
                    <input name="name" required className="input" />
                  </label>
                  <label>
                    Email
                    <input type="email" name="email" required className="input" />
                  </label>
                  <label className="form-full">
                    Message
                    <textarea name="message" rows={5} required className="input" />
                  </label>
                  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />
                  <div className="contact-actions">
                    <button className="btn" type="submit">Send message</button>
                    <a className="btn" href="mailto:juliendrac@pm.me">Open mail app</a>
                    <button type="button" className="btn" onClick={() => window.print()}>
                      <Printer size={16} />
                      Print CV
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
