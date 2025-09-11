import { useEffect, useState } from "react"

const script = [
  { type: "cmd",  text: "julien@ascii:~$ ./deploy.sh --prod" },
  { type: "out",  text: "→ building app…" },
  { type: "out,slow", text: "✓ build complete" },
  { type: "cmd",  text: "julien@ascii:~/app$ curl -s https://api.example.com/health | jq .status" },
  { type: "out",  text: "\"ok\"" },
  { type: "cmd",  text: "julien@ascii:~/app$ sh tools/seed.sh --count 3" },
  { type: "out",  text: "inserted 3 records" },
]

function renderTokens(str){
  return str.split(/(\s+)/).map((tok, i) => {
    if (/^\s+$/.test(tok)) return tok
    if (/^".*"$|^'.*'$/.test(tok)) return <span className="sh-str" key={i}>{tok}</span>
    if (/^\$[A-Za-z_][\w]*$|^\$\{[^}]+\}$/.test(tok)) return <span className="sh-var" key={i}>{tok}</span>
    if (/^-{1,2}[A-Za-z][\w-]*/.test(tok)) return <span className="sh-flag" key={i}>{tok}</span>
    if (/^\.\/|^\.\.|^\/|~\//.test(tok)) return <span className="sh-path" key={i}>{tok}</span>
    if (/^\d+$/.test(tok)) return <span className="sh-num" key={i}>{tok}</span>
    if (/^[a-z][\w-]*$/.test(tok)) return <span className="sh-cmd" key={i}>{tok}</span>
    return <span key={i}>{tok}</span>
  })
}

export default function TerminalSH(){
  const [shown, setShown] = useState([])

  useEffect(() => {
    let i = 0, cancel = false
    const step = () => {
      if (cancel || i >= script.length) return
      setShown(s => [...s, script[i++]])
      if (i < script.length) setTimeout(step, 800)
    }
    const t = setTimeout(step, 300)
    return () => { cancel = true; clearTimeout(t) }
  }, [])

  return (
    <div className="sh-terminal">
      <div className="sh-titlebar">
        <span className="ps-dot" style={{background:'var(--accent)'}}></span>
        <span className="ps-dot" style={{background:'var(--accent-2)'}}></span>
        <span className="ps-dot" style={{background:'var(--fg)', opacity:.75}}></span>
        <span style={{marginLeft:8, fontSize:12, color:'var(--sh-muted)'}}>bash</span>
      </div>
      <div className="ps-body">
        {shown.map((line, idx) => {
          if (line.type === 'cmd') {
            const m = line.text.match(/^([^$]+)\$\s*(.*)$/)
            const prompt = m ? m[1] : 'julien@ascii:~'
            const rest = m ? m[2] : line.text
            const [userHost, pathPart=''] = prompt.split(':')
            const [user, host] = userHost.split('@')
            return (
              <span className="ps-line" key={idx}>
                <span className="sh-user">{user}</span>
                <span>@</span>
                <span className="sh-host">{host}</span>
                <span>:</span>
                <span className="sh-path">{pathPart}</span>
                <span>$ </span>
                {renderTokens(rest)}
              </span>
            )
          }
          return (
            <span className="ps-line" key={idx}>
              <span className="ps-out">{line.text}</span>
            </span>
          )
        })}
      </div>
    </div>
  )
}
