type ProjectCardProps = {
  title: string
  status: string
  badges: string[]
  description: string
  code: string
}

export default function ProjectCard({ title, status = '[prod]', badges = [], description, code }: ProjectCardProps) {
  return (
    <article className="card-surface">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <strong style={{ color: 'var(--fg)' }}>{title}</strong>
        <span style={{
          color: status.includes('prod') ? 'var(--accent)' : 'var(--accent-2)',
          fontSize: '0.75rem'
        }}>{status}</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4, color: 'var(--muted)' }}>
        {badges.map(b => (
          <span key={b} className="dashed" style={{
            padding: '2px 6px',
            borderRadius: 999,
            fontSize: '0.75rem'
          }}>{b}</span>
        ))}
      </div>

      {description && <p style={{ color: 'var(--muted)', marginTop: 8, fontSize: '0.9rem' }}>{description}</p>}

      {code && (
        <pre style={{ marginTop: 8 }}>
          <code className="ps" dangerouslySetInnerHTML={{ __html: code }} />
        </pre>
      )}

      <div style={{ marginTop: 8, fontSize: '0.875rem' }}>
        <a className="dashed-link" href="#">→ Demo</a>
        <span style={{ margin: '0 4px', color: 'var(--muted)' }}>·</span>
        <a className="dashed-link" href="#">Code</a>
      </div>
    </article>
  )
}
