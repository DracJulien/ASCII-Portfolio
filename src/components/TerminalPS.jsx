export default function TerminalPS(){
  return (
    <div className="ps-terminal">
      <div className="ps-titlebar">
        <span className="ps-dot" style={{background:'#ff5f56'}}></span>
        <span className="ps-dot" style={{background:'#ffbd2e'}}></span>
        <span className="ps-dot" style={{background:'#27c93f'}}></span>
        <span className="ml-2 text-sm text-gray-300">PowerShell</span>
      </div>
      <div className="ps-body">
        <span className="ps-line"><span className="ps-path">PS C:\\Users\\Julien</span>&gt; <span className="ps-cmd">./portfolio.ps1</span></span>
        <span className="ps-line ps-out">Launching ASCII Portfolio ...</span>
        <span className="ps-line"><span className="ps-path">PS C:\\Portfolio</span>&gt; <span className="ps-cmd">Get-Profile</span></span>
        <span className="ps-line ps-out">Name: Julien · Role: Full‑Stack Developer · Location: Paris (FR)</span>
        <span className="ps-line"><span className="ps-path">PS C:\\Portfolio</span>&gt; <span className="ps-cmd">Get-Projects -Top 3</span></span>
        <span className="ps-line ps-out">1. Victor — Pokémon TCG Pocket (NestJS, React, PostgreSQL)</span>
        <span className="ps-line ps-out">2. CI/CD Monorepo (GitHub Actions, Docker)</span>
        <span className="ps-line ps-out">3. Book Microsite (HTML/CSS/JS, slide effect)</span>
      </div>
    </div>
  )
}
