// src/App.tsx
import { JSX, useEffect, useState } from "react"
import { Settings, Printer, Github, Mail, Linkedin, MapPin, ChevronDown } from "lucide-react"

import useTheme from "@/hooks/useTheme"
import Footer from "@/components/Footer"
import ProjectCard from "@/components/ProjectCard"
import VersionBadge from "@/components/VersionBadge"
import TerminalTabs from "@/components/TerminalTabs"
import CloneMeButton from "@/components/CloneMeButton"
import BackgroundRain from "@/components/BackgroundRain"
import HeatmapWithRefresh from "@/components/HeatmapWithRefresh"
import ScrollReveal from "@/components/ScrollReveal"
import GlitchText from "@/components/GlitchText"
import SettingsDrawer from "@/components/SettingsDrawer"

type SectionId = "about" | "projects" | "cv" | "contact"

export default function App(): JSX.Element {
  const { theme, toggleTheme } = useTheme()

  const [active, setActive] = useState<SectionId>("about")
  const [rainEnabled, setRainEnabled] = useState<boolean>(true)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  /* ── ASCII art ── */
  const ascii_skull: string = [
    "                  :::!~!!!!!:.",
    "             .xUHWH!! !!?M88WHX:.",
    "           .X*#M@$!!  !X!M$$$$$$WWx:.",
    "          :!!!!!!?H! :!$!$$$$$$$$$$8X:",
    "          !!~  ~:~!! :~!$!#$$$$$$$$$$8X:",
    "         :!~::!H!<   ~.U$X!?R$$$$$$$$MM!",
    "          ~!~!!!!~~ .:XW$$$U!!?$$$$$$RMM!",
    "          !:~~~ .:!M\"T#$$$$WX??#MRRMMM!",
    "          ~?WuxiW*`   `\"#$$$$8!!!!??!!!",
    "        :X- M$$$$       `\"T#$T~!8$WUXU~",
    "        :%`  ~#$$$m:        ~!~ ?$$$$$$",
    "      :!`.-   ~T$$$$8xx.  .xWW- ~\"\"*\".",
    "     ~~!    T#$$@@W@M$$$$.*?$$     /",
    "     .!~~ !!     .:XUW$W!~ `\"~:    :",
    "      `!!  !H:   !WM$$$$Ti.: .!WUn+!`",
    "     X~ .: ?H.!u \"$$$$$!W:U!T$$M~",
    "      !.-~   ?@WTWo(\"*$$$W$TH$! `",
    "      -~    : ?$$$B$Wu(\"**$RM!",
    "          :   ~$$$$$B$$en:`",
    "        :     ~\"##*$$$$M~",
  ].join("\n")

  /* ── Intersection Observer for active nav ── */
  useEffect(() => {
    const ids: SectionId[] = ["about", "projects", "cv", "contact"]
    const obs = new IntersectionObserver(
      (entries) => {
        const v = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (v) setActive(v.target.id as SectionId)
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.1, 0.3, 0.5] }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const navTo = (id: SectionId) => {
    setMobileMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="app-root">
      {rainEnabled && <BackgroundRain paused={false} density={22} speed={0.8} />}

      {/* ═══ NAVIGATION ═══ */}
      <header className="nav-bar">
        <nav className="nav-inner">
          <div className="logo">
            <GlitchText text="[JULIEN·DRAC]" autoGlitch interval={6000} />
          </div>

          <button
            className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>

          <div className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
            {(["about", "projects", "cv", "contact"] as SectionId[]).map((id) => (
              <button
                key={id}
                className={`nav-link ${active === id ? "active" : ""}`}
                onClick={() => navTo(id)}
              >
                {id === "about" ? "About" : id === "projects" ? "Projects" : id === "cv" ? "CV" : "Contact"}
              </button>
            ))}
            <button className="nav-link" onClick={() => window.print()}>
              <Printer size={14} /> CV
            </button>
            <button
              className="nav-icon-btn"
              onClick={() => setSettingsOpen(true)}
              aria-label="Settings"
            >
              <Settings size={16} />
            </button>
          </div>
        </nav>
      </header>

      <SettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        theme={theme}
        toggleTheme={toggleTheme}
        rainEnabled={rainEnabled}
        setRainEnabled={setRainEnabled}
      />

      <main>
        {/* ═══════════════════════════════════════════
            HERO / ABOUT
        ═══════════════════════════════════════════ */}
        <section id="about" className="hero">
          <div className="hero-content">
            <div className="hero-left">
              <p className="hero-tag">
                PORTFOLIO / ASCII ART <VersionBadge />
              </p>

              <h1 className="hero-title">
                Full-Stack<br />Developer
              </h1>

              <p className="hero-subtitle">
                I love making systems elegant, reliable, and fun to use.
                From scalable backends to refined frontends, I design end-to-end.
              </p>

              <div className="hero-cta">
                <button className="btn btn-primary" onClick={() => navTo("projects")}>
                  View Projects →
                </button>
                <button className="btn btn-ghost" onClick={() => navTo("contact")}>
                  <Mail size={16} /> Contact
                </button>
                <CloneMeButton repo="https://github.com/Dracjulien/ascii-portfolio" />
              </div>

              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-value">3+</div>
                  <div className="hero-stat-label">Projects</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-value">2+</div>
                  <div className="hero-stat-label">Years XP</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-value">∞</div>
                  <div className="hero-stat-label">Curiosity</div>
                </div>
              </div>
            </div>

            <div className="hero-right">
              <div className="ascii-combo">
                <pre className="ascii-multi" style={{ whiteSpace: "pre", margin: 0, fontSize: 12, lineHeight: 1.2 }}>
                  {ascii_skull}
                </pre>
              </div>
              <div style={{ marginTop: 16 }}>
                <TerminalTabs />
              </div>
            </div>
          </div>

          <div className="scroll-indicator no-print">
            <span>scroll</span>
            <ChevronDown size={20} className="scroll-indicator-arrow" />
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            GITHUB HEATMAP
        ═══════════════════════════════════════════ */}
        <ScrollReveal>
          <HeatmapWithRefresh />
        </ScrollReveal>

        {/* ═══════════════════════════════════════════
            PROJECTS
        ═══════════════════════════════════════════ */}
        <section id="projects" className="section">
          <ScrollReveal>
            <h2 className="section-title">Selected Projects</h2>
          </ScrollReveal>

          <div className="cards-grid">
            <ScrollReveal delay={100}>
              <ProjectCard
                title="Pokémon TCG Pocket Exchange"
                status="[dev]"
                badges={["NestJS", "PostgreSQL", "React", "Tailwind", "Mobile"]}
                description="B2C platform to list, trade and track collections. Multi-repo, REST API, JWT auth, secure uploads."
                code={`
<span class="ps-path">PS C:\\\\Victor&gt;</span> <span class="ps-cmd">Invoke-RestMethod</span> -Uri "https://api.example.com/trades?status=open" | ConvertTo-Json
{
  "items": [{"id":"TR-8721","want":["Pikachu #25"],"give":["Eevee #133"],"owner":"@julien"}],
  "meta":{"count":1}
}`.trim()}
              />
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <ProjectCard
                title="Book Microsite — Slides & Typo"
                status="[R&D]"
                badges={["HTML/CSS/JS", "Slide effect", "Minimal"]}
                description="Micro-interactions, scroll slides, elegant typography, lightweight bundle."
                code={`
<span class="ps-path">PS C:\\\\BookSite&gt;</span> <span class="ps-cmd">type</span> styles.css | <span class="ps-cmd">Select-String</span> "scroll-snap"
.container{scroll-snap-type:y mandatory}
section{scroll-snap-align:start}`.trim()}
              />
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <ProjectCard
                title="CI/CD — SaaS Monorepo"
                status="[prod]"
                badges={["Turborepo", "GitHub Actions", "Docker"]}
                description="Cache-aware pipelines, build matrices, PR previews, SAST/DAST scans."
                code={`
<span class="ps-path">PS C:\\\\CI&gt;</span> <span class="ps-cmd">cat</span> .github/workflows/ci.yml
name: ci
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npm test`.trim()}
              />
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            CV / EXPERIENCE
        ═══════════════════════════════════════════ */}
        <section id="cv" className="section">
          <ScrollReveal>
            <h2 className="section-title">Curriculum Vitae</h2>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <div>
              <ScrollReveal delay={100}>
                <h3 style={{ fontSize: ".85rem", fontWeight: 600, color: "var(--accent)", marginBottom: 16, letterSpacing: ".04em" }}>
                  ├── Experience
                </h3>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-date">2024 — Present</div>
                    <div className="timeline-title">Freelance Developer</div>
                    <div className="timeline-desc">
                      SaaS B2B, e-commerce, mobile apps. End-to-end from architecture to deployment.
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-date">2022 — 2024</div>
                    <div className="timeline-title">Software Engineer</div>
                    <div className="timeline-desc">
                      Data platforms & APIs. Node.js microservices, PostgreSQL, CI/CD pipelines.
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <h3 style={{ fontSize: ".85rem", fontWeight: 600, color: "var(--accent)", marginBottom: 16, marginTop: 32, letterSpacing: ".04em" }}>
                  ├── Education
                </h3>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-date">Continuous</div>
                    <div className="timeline-title">Software Engineering</div>
                    <div className="timeline-desc">
                      Self-learning, open-source contributions, tech communities.
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div>
              <ScrollReveal delay={150}>
                <h3 style={{ fontSize: ".85rem", fontWeight: 600, color: "var(--accent)", marginBottom: 16, letterSpacing: ".04em" }}>
                  ├── Key Skills
                </h3>
                <div className="skills-grid">
                  {["TypeScript", "Node.js", "NestJS", "React", "PostgreSQL", "Docker", "AWS", "CI/CD", "REST APIs", "Git", "TailwindCSS", "Vite"].map((s) => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={250}>
                <h3 style={{ fontSize: ".85rem", fontWeight: 600, color: "var(--accent)", marginBottom: 16, marginTop: 32, letterSpacing: ".04em" }}>
                  ├── Notable Projects
                </h3>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-title">Pokémon TCG Exchange</div>
                    <div className="timeline-desc">REST API, React, Mobile — Full-stack trading platform</div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-title">CI/CD Monorepo</div>
                    <div className="timeline-desc">Cache-aware pipelines, auto deployments, SAST/DAST</div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-title">Book Microsite</div>
                    <div className="timeline-desc">Minimal HTML/CSS/JS with scroll-snap slide effects</div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div style={{ marginTop: 24 }}>
                  <button className="btn no-print" onClick={() => window.print()}>
                    <Printer size={16} /> Print CV
                  </button>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <style>{`
            @media (max-width: 768px) {
              #cv > div > div:first-child + div { margin-top: 0; }
              #cv > div { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>

        {/* ═══════════════════════════════════════════
            CONTACT
        ═══════════════════════════════════════════ */}
        <section id="contact" className="section">
          <ScrollReveal>
            <h2 className="section-title">Contact</h2>
          </ScrollReveal>

          <div className="contact-grid">
            <ScrollReveal delay={100}>
              <div className="card-surface">
                <p style={{ fontSize: ".85rem", color: "var(--fg-2)", marginBottom: 20 }}>
                  Use the form or reach out directly. I respond quickly.
                </p>
                <form
                  method="POST"
                  action="https://formspree.io/f/yourFormID"
                  className="contact-form"
                >
                  <div className="form-field">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input id="name" name="name" required className="form-input" placeholder="Your name" />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" required className="form-input" placeholder="you@mail.com" />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows={5} required className="form-input" placeholder="Tell me about your project..." />
                  </div>
                  <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                  <button className="btn btn-primary" type="submit">
                    Send Message →
                  </button>
                </form>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="contact-info-card">
                <pre className="ascii-multi" style={{ whiteSpace: "pre", margin: "0 0 20px", fontSize: 11, lineHeight: 1.2 }}>
{`╔═══════════════════════════╗
║   Let's build something   ║
║       amazing together     ║
╚═══════════════════════════╝`}
                </pre>

                <a className="contact-link" href="mailto:juliendrac@pm.me">
                  <span className="contact-link-icon"><Mail size={18} /></span>
                  <span>juliendrac@pm.me</span>
                </a>
                <a className="contact-link" href="https://github.com/Dracjulien" target="_blank" rel="noopener noreferrer">
                  <span className="contact-link-icon"><Github size={18} /></span>
                  <span>github.com/Dracjulien</span>
                </a>
                <a className="contact-link" href="https://linkedin.com/in/julien-drac" target="_blank" rel="noopener noreferrer">
                  <span className="contact-link-icon"><Linkedin size={18} /></span>
                  <span>linkedin.com/in/julien-drac</span>
                </a>
                <div className="contact-link" style={{ cursor: "default" }}>
                  <span className="contact-link-icon"><MapPin size={18} /></span>
                  <span>Aix-en-Provence, France</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
