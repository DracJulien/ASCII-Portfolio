export default function CV(){
  return (
    <section className="py-10 space-y-4">
      <h2 className="text-xl font-bold">Curriculum Vitae — Julien Drac</h2>
      <div className="dashed rounded-xl p-4">
        <pre className="ascii-box">
+--------------------------------------------------+
|  Full‑Stack Developer —                          |
|  Email: julienDrac@protonmail.com · (FR)         |
|  GitHub: github.com/Dracjulien                   |
+--------------------------------------------------+
        </pre>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="dashed rounded-xl p-4">
          <h3 className="font-semibold">Experience</h3>
          <ul className="list-disc ml-5">
            <li>2024–2025 · Freelance — SaaS B2B, e‑commerce, apps</li>
            <li>2022–2024 · Software Engineer — Data platforms & APIs</li>
          </ul>
        </div>
        <div className="dashed rounded-xl p-4">
          <h3 className="font-semibold">Key Skills</h3>
          <div className="flex flex-wrap gap-2 text-gray-300">
            {['TypeScript','NestJS','PostgreSQL','React','Docker','AWS','CI/CD'].map(b =>
              <span key={b} className="px-2 py-0.5 rounded-full text-xs dashed">{b}</span>
            )}
          </div>
        </div>
      </div>

      <div className="dashed rounded-xl p-4">
        <h3 className="font-semibold">Notable Projects</h3>
        <ul className="list-disc ml-5">
          <li><b>Victor</b> — Pokémon TCG Pocket exchange · REST API, React, Mobile</li>
          <li><b>CI/CD Monorepo</b> — Cache-aware pipelines, auto deployments</li>
          <li><b>Book microsite</b> — Minimal HTML/CSS/JS with slide effects</li>
        </ul>
      </div>

      <div className="dashed rounded-xl p-4">
        <h3 className="font-semibold">Education</h3>
        <p>Software engineering · Continuous self-learning · Open-source contributions</p>
      </div>

      <div className="dashed rounded-xl p-4">
        <h3 className="font-semibold">Links</h3>
        <p>Portfolio: julien.dev · GitHub: github.com/DracJulien · LinkedIn: linkedin.com/in/julien-drac</p>
        <button className="px-3 py-2 border border-dashed rounded-lg mt-2 no-print" onClick={()=>window.print()}>Print this CV</button>
      </div>
    </section>
  )
}
