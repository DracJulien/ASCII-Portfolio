type ProjectCardProps = {
  title: string
  status: string
  badges: string[]
  description: string
  code: string
  demoUrl?: string
  codeUrl?: string
}

function statusClass(s: string) {
  if (s.toLowerCase().includes("prod")) return "prod"
  if (s.toLowerCase().includes("dev")) return "dev"
  return "rd"
}

export default function ProjectCard({
  title,
  status = "[prod]",
  badges = [],
  description,
  code,
  demoUrl = "#",
  codeUrl = "#",
}: ProjectCardProps) {
  return (
    <article className="project-card">
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
        <span className="project-card-title">{title}</span>
        <span className={`project-card-status ${statusClass(status)}`}>{status}</span>
      </div>

      <div className="project-card-badges">
        {badges.map((b) => (
          <span key={b} className="badge">{b}</span>
        ))}
      </div>

      {description && <p className="project-card-desc">{description}</p>}

      {code && (
        <pre style={{ margin: "0 0 16px" }}>
          <code className="ps" dangerouslySetInnerHTML={{ __html: code }} />
        </pre>
      )}

      <div className="project-card-links">
        <a href={demoUrl}>→ Demo</a>
        <span style={{ color: "var(--surface-border)" }}>·</span>
        <a href={codeUrl}>Code</a>
      </div>
    </article>
  )
}
