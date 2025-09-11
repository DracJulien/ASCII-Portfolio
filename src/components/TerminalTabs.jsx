import { useState } from "react"
import TerminalPS from "./TerminalPS.jsx"
import TerminalSH from "./TerminalSH.jsx"

export default function TerminalTabs(){
  const [tab, setTab] = useState('ps')
  return (
    <div className="card-surface" style={{padding:0}}>
      <div className="term-tabs">
        <button className={`btn ${tab==='ps'?'active':''}`} onClick={()=>setTab('ps')}>PowerShell</button>
        <button className={`btn ${tab==='sh'?'active':''}`} onClick={()=>setTab('sh')}>Bash</button>
      </div>
      <div className="term-body">
        {tab==='ps' ? <TerminalPS/> : <TerminalSH/>}
      </div>
    </div>
  )
}