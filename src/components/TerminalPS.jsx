import { useEffect, useState } from "react"
import Typewriter from "./Typewriter.jsx"

const script = [
  { type: "cmd",  text: "PS C:\\Users\\Julien> ./portfolio.ps1" },
  { type: "out",  text: "Launching ASCII Portfolio ..." },
  { type: "cmd",  text: "PS C:\\Portfolio> Get-Profile" },
  { type: "out",  text: "Name: Julien · Role: Full-Stack Developer · Location: Paris (FR)" },
  { type: "cmd",  text: "PS C:\\Portfolio> Get-Projects -Top 3" },
  { type: "out",  text: "1. Pokémon TCG Pocket (NestJS, React, PostgreSQL)" },
  { type: "out",  text: "2. CI/CD Monorepo (GitHub Actions, Docker)" },
  { type: "out",  text: "3. Book showcase (HTML/CSS/JS, slide effect)" },
]

export default function TerminalPS(){
  const [shown, setShown] = useState([])

  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      setShown(s => [...s, script[i]])
      i++
      if (i >= script.length) clearInterval(t)
    }, 900)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="ps-terminal">
      <div className="ps-titlebar">
        <span className="ps-dot" style={{background:'#ff5f56'}}></span>
        <span className="ps-dot" style={{background:'#ffbd2e'}}></span>
        <span className="ps-dot" style={{background:'#27c93f'}}></span>
        <span className="ml-2 text-sm" style={{color:'var(--muted)'}}>PowerShell</span>
      </div>
      <div className="ps-body">
        {shown.map((line, idx) => (
          <span className="ps-line" key={idx}>
            {line.type === 'cmd' ? (
              <>
                <span className="ps-path">{line.text.split('>')[0]}&gt;</span>{" "}
                <span className="ps-cmd">{line.text.split('> ')[1]}</span>
              </>
            ) : (
              <span className="ps-out">{line.text}</span>
            )}
          </span>
        ))}
        {/* ligne courante animée */}
        {shown.length < script.length && (
          <span className="ps-line">
            <span className="ps-path">PS C:\\Portfolio&gt;</span>{" "}
            <Typewriter lines={[" _ "]} speed={120} pause={500} />
          </span>
        )}
      </div>
    </div>
  )
}
