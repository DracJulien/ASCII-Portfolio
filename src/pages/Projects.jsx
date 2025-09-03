import ProjectCard from '@/components/ProjectCard.jsx'

export default function Projects(){
  const psSnippet1 = `
<span class="path">PS C:\\Victor&gt;</span> <span class="cmd">Invoke-RestMethod</span> -Uri "https://api.example.com/trades?status=open" | ConvertTo-Json
{
  "items": [
    {"id":"TR-8721","want":["Pikachu #25"],"give":["Eevee #133"],"owner":"@julien"}
  ],
  "meta":{"count":1}
}
  `.trim()

  const psSnippet2 = `
<span class="path">PS C:\\CI&gt;</span> <span class="cmd">cat</span> .github/workflows/ci.yml
name: ci
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npm test
  `.trim()

  const psSnippet3 = `
<span class="path">PS C:\\BookSite&gt;</span> <span class="cmd">type</span> styles.css | <span class="cmd">Select-String</span> "scroll-snap"
.container{scroll-snap-type:y mandatory}
section{scroll-snap-align:start}
  `.trim()

  return (
    <section className="py-10 grid gap-4 md:grid-cols-2">
      <ProjectCard
        title="Victor — Pokémon TCG Pocket Exchange"
        status="[prod]"
        badges={['NestJS','PostgreSQL','React','Tailwind','Mobile']}
        description="B2C platform to list, trade and track collections. Multi-repo (front/back), REST API, JWT auth, secure uploads."
        code={psSnippet1}
      />
      <ProjectCard
        title="Book Microsite — Slides & Typo"
        status="[R&D]"
        badges={['HTML/CSS/JS','Slide effect','Minimal']}
        description="Micro-interactions, scroll slides, elegant typography, lightweight bundle."
        code={psSnippet3}
      />
      <ProjectCard
        title="CI/CD — SaaS Monorepo"
        status="[prod]"
        badges={['Turborepo','GitHub Actions','Docker']}
        description="Cache-aware pipelines, build matrices, PR previews, SAST/DAST scans."
        code={psSnippet2}
      />
    </section>
  )
}
