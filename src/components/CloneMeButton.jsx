import { useState } from "react"
import { Github, Clipboard, ClipboardCheck } from "lucide-react"

export default function CloneMeButton({ repo = "https://github.com/DracJulien/ASCII-Portfolio", showCopy = true }) {
  const [copied, setCopied] = useState(false)
  const cmd = `git clone ${repo.endsWith(".git") ? repo : `${repo}.git`}`

  async function copy(e){
    e.preventDefault()   // n’ouvre pas le lien
    e.stopPropagation()
    try{
      await navigator.clipboard.writeText(cmd)
      setCopied(true)
      setTimeout(()=>setCopied(false), 1200)
    }catch{}
  }

  return (
    <div style={{ display:'inline-flex', gap:8, alignItems:'center' }}>
      <a
        className="btn"
        href={repo}
        target="_blank"
        rel="noopener noreferrer"
        title={repo}
      >
        <Github size={16}/> Clone me on Git
      </a>

      {showCopy && (
        <button
          className="btn"
          onClick={copy}
          title={cmd}
          aria-label="Copy git clone command"
        >
          {copied ? <ClipboardCheck size={16}/> : <Clipboard size={16}/>}
        </button>
      )}
    </div>
  )
}
