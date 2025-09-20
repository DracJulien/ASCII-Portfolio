type ProjectCardProps = {
  title: string
  status: string
  badges: string[]
  description: string
  code: string
}

export default function ProjectCard({ title, status='[prod]', badges=[], description, code }: ProjectCardProps){
  return (
    <article className="dashed rounded-xl p-4 bg-card/80">
      <div className="flex items-center gap-2 flex-wrap">
        <strong className="text-white">{title}</strong>
        <span className={status.includes('prod') ? 'text-green-300 text-xs' : 'text-yellow-300 text-xs'}>{status}</span>
      </div>
      <div className="flex flex-wrap gap-2 mt-1 text-gray-400">
        {badges.map(b => <span key={b} className="px-2 py-0.5 rounded-full text-xs dashed">{b}</span>)}
      </div>
      {description && <p className="text-gray-300 mt-2">{description}</p>}
      {code && <pre className="mt-2"><code className="ps" dangerouslySetInnerHTML={{__html: code}}/></pre>}
      <div className="mt-2 text-sm">
        <a className="underline decoration-dashed underline-offset-4" href="#">→ Demo</a> · <a className="underline decoration-dashed underline-offset-4" href="#">Code</a>
      </div>
    </article>
  )
}
