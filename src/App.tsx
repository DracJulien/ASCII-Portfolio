// src/App.tsx
import { JSX, useEffect, useState } from "react"
import { Sun, Moon, Printer } from "lucide-react"

import useTheme from "@/hooks/useTheme"
import Footer from "@/components/Footer"
import ThemeSelect from "@/components/ThemeSelect"
import HeatmapCard from "@/components/HeatmapCard"
import ProjectCard from "@/components/ProjectCard"
import VersionBadge from "@/components/VersionBadge"
import TerminalTabs from "@/components/TerminalTabs"
import CloneMeButton from "@/components/CloneMeButton"
import CopyButton from "@/components/CopyButton"
import BackgroundRain from "@/components/BackgroundRain"


type SectionId = "about" | "projects" | "cv" | "contact"

type ProjectCardProps = {
  title: string
  status: string
  badges: string[]
  description: string
  code: string
}

export default function App(): JSX.Element {
  const { theme, toggleTheme } = useTheme()

  const [active, setActive] = useState<SectionId>("about")
  const [rainSpeed, setRainSpeed] = useState<number>(1.0)
  const [rainPaused, setRainPaused] = useState<boolean>(false)
  const [rainDensity, setRainDensity] = useState<number>(18)
  const [rainEnabled, setRainEnabled] = useState<boolean>(true)
  const [effects, setEffects] = useState<string[]>([])

  const ascii_text: string = [
    "┌────────────────────────────────────────────────────┐",
    "│    “I love making systems elegant, reliable,       │",
    "│      and fun to use. From scalable backends to     │",
    "│      refined frontends, I design end-to-end.”      │",
    "├────────────────────────────────────────────────────┤",
    "│                                                    │",
    "                      :::!~!!!!!:.                   │",
    "│                 .xUHWH!! !!?M88WHX:.               │",
    "               .X*#M@$!!  !X!M$$$$$$WWx:.            │",
    "│              :!!!!!!?H! :!$!$$$$$$$$$$8X:          │",
    "              !!~  ~:~!! :~!$!#$$$$$$$$$$8X:         │",
    "│             :!~::!H!<   ~.U$X!?R$$$$$$$$MM!        │",
    "              ~!~!!!!~~ .:XW$$$U!!?$$$$$$RMM!        │",
    "│              !:~~~ .:!M\"T#$$$$WX??#MRRMMM!         │",
    "│              ~?WuxiW*`   `\"#$$$$8!!!!??!!!         │",
    "│            :X- M$$$$       `\"T#$T~!8$WUXU~         │",
    "│            :%`  ~#$$$m:        ~!~ ?$$$$$$         │",
    "│          :!`.-   ~T$$$$8xx.  .xWW- ~\"\"*\".          │",
    "│         ~~!    T#$$@@W@M$$$$.*?$$     /            │",
    "│         .!~~ !!     .:XUW$W!~ `\"~:    :            │",
    "│          `!!  !H:   !WM$$$$Ti.: .!WUn+!`           │",
    "│         X~ .: ?H.!u \"$${B}$$!W:U!T$$M~             │",
    "│          !.-~   ?@WTWo(\"*$$$W$TH$! `               │",
    "│          -~    : ?$$$B$Wu(\"**$RM!                  │",
    "│              :   ~$$$$$B$$en:`                     │",
    "│            :     ~\"##*$$$$M~                       │",
    "│                                                    │",
    "└────────────────────────────────────────────────────┘",
  ].join("\n")

  const ascii_contact: string = [
    "┌────────────────────────────────────────────────────┐",
    "     Full-Stack Developer — Node.js / React           ",
    "     Email: julien@seagle.io · Aix en Provence (FR)   ",
    "     GitHub: github.com/Dracjulien                    ",
    "     LinkedIn: linkedin.com/in/julien-drac            ",
    "└────────────────────────────────────────────────────┘",
  ].join("\n")

  useEffect(() => {
    const ids: SectionId[] = ["about", "projects", "cv", "contact"]
    const obs = new IntersectionObserver(
      (entries) => {
        const v = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (v) setActive(v.target.id as SectionId)
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.25, 0.5, 0.75] }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <div className="app-root">
      {rainEnabled && (
        <BackgroundRain paused={rainPaused} density={rainDensity} speed={rainSpeed} />
      )}

      <header className="nav-bar">
        <nav className="nav-inner">
          <div className="logo">[JULIEN DRAC]</div>
          <div className="nav-links">
            <a className={`btn ${active === "about" ? "active" : ""}`} href="#about">
              About
            </a>
            <a className={`btn ${active === "projects" ? "active" : ""}`} href="#projects">
              Projects
            </a>
            <a className={`btn ${active === "cv" ? "active" : ""}`} href="#cv">
              CV
            </a>
            <a className={`btn ${active === "contact" ? "active" : ""}`} href="#contact">
              Contact
            </a>
            <button onClick={() => window.print()} className="btn">
              <Printer size={16} />
              CV
            </button>
            <button onClick={toggleTheme} className="btn">
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              {theme === "light" ? "Dark" : "Light"}
            </button>
            <ThemeSelect theme={theme} />
            <button
              className="btn"
              onClick={() => setRainEnabled((v) => !v)}
              aria-pressed={rainEnabled}
            >
              {rainEnabled ? "🌧️ Rain On" : "⛱️ Rain Off"}
            </button>
          </div>
        </nav>
      </header>

      <main className="snap-container">
        <section id="about" className="section snap-section">
          <div className="hero-grid">
            <div>
              <p className="muted">
                PORTFOLIO / ASCII ART <VersionBadge />
              </p>

              <div className="title-row">
                <h1 style={{ fontSize: "2.2rem", margin: "8px 0" }}>Full-Stack Developer</h1>
                <div className="title-cta">
                  <CloneMeButton repo="https://github.com/Dracjulien/ascii-portfolio" />
                </div>
              </div>

              <div className="ascii-combo">
                <div className="ascii-combo-grid">
                  <pre className="ascii-multi" style={{ whiteSpace: "pre", margin: 0 }}>
                    {ascii_text}
                  </pre>
                  <pre style={{ whiteSpace: "pre", margin: 0, lineHeight: 1.3 }}>
                    {ascii_contact}
                  </pre>
                </div>
              </div>

              <HeatmapCard className="mt-2" />

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                <a className="btn" href="#projects">
                  View Projects →
                </a>
                <a className="btn" href="#contact">
                  Contact ✉︎
                </a>
              </div>
            </div>

            <TerminalTabs />
          </div>
        </section>

        <section id="projects" className="section snap-section">
          <h2 style={{ fontSize: "1.25rem", margin: "0 0 10px" }}>Selected Projects</h2>
          <div className="cards-grid">
            <ProjectCard
              title="Pokémon TCG Pocket Exchange"
              status="[dev]"
              badges={["NestJS", "PostgreSQL", "React", "Tailwind", "Mobile"]}
              description="B2C platform to list, trade and track collections. Multi-repo, REST API, JWT auth, secure uploads."
              code={`
<span class="path">PS C:\\\\Victor&gt;</span> <span class="cmd">Invoke-RestMethod</span> -Uri "https://api.example.com/trades?status=open" | ConvertTo-Json
{
  "items": [{"id":"TR-8721","want":["Pikachu #25"],"give":["Eevee #133"],"owner":"@julien"}],
  "meta":{"count":1}
}
              `.trim()}
            />
            <ProjectCard
              title="Book Microsite — Slides & Typo"
              status="[R&D]"
              badges={["HTML/CSS/JS", "Slide effect", "Minimal"]}
              description="Micro-interactions, scroll slides, elegant typography, lightweight bundle."
              code={`
<span class="path">PS C:\\\\BookSite&gt;</span> <span class="cmd">type</span> styles.css | <span class="cmd">Select-String</span> "scroll-snap"
.container{scroll-snap-type:y mandatory}
section{scroll-snap-align:start}
              `.trim()}
            />
            <ProjectCard
              title="CI/CD — SaaS Monorepo"
              status="[prod]"
              badges={["Turborepo", "GitHub Actions", "Docker"]}
              description="Cache-aware pipelines, build matrices, PR previews, SAST/DAST scans."
              code={`
<span class="path">PS C:\\\\CI&gt;</span> <span class="cmd">cat</span> .github/workflows/ci.yml
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

        <h2 style={{ fontSize: "1.25rem", margin: "0 0 10px" }}>
          Curriculum Vitae — Julien
        </h2>

        <pre className="ascii-box ascii-multi">{ascii_contact}</pre>

        <section id="contact" className="section snap-section">
          <h2 style={{ fontSize: "1.25rem", margin: "0 0 10px" }}>Contact</h2>
          <div className="card-surface">
            <p>Use the form (Formspree) or email me directly.</p>
            <form
              method="POST"
              action="https://formspree.io/f/yourFormID"
              className="section"
              style={{ margin: "12px 0 0", padding: 0 }}
            >
              <div style={{ display: "grid", gap: 10, maxWidth: 680 }}>
                <label>
                  Name
                  <br />
                  <input name="name" required className="btn" style={{ width: "100%" }} />
                </label>
                <label>
                  Email
                  <br />
                  <input
                    type="email"
                    name="email"
                    required
                    className="btn"
                    style={{ width: "100%" }}
                  />
                </label>
                <label>
                  Message
                  <br />
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="btn"
                    style={{ width: "100%" }}
                  />
                </label>
                <input
                  type="text"
                  name="_gotcha"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <button className="btn" type="submit">
                    Send
                  </button>
                  <CopyButton text="julien@seagle.io" />
                  <a className="btn" href="mailto:julien@seagle.io">
                    Open Mail
                  </a>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
