import { useEffect, useMemo, useState } from "react"

function cssVar(name, fallback="#22c55e"){
  const v = getComputedStyle(document.body).getPropertyValue(name).trim()
  return v || fallback
}
function hexToRgb(hex){
  const m = hex.replace("#","")
  const v = m.length===3 ? m.split("").map(x=>x+x).join("") : m
  const n = parseInt(v,16)
  return { r:(n>>16)&255, g:(n>>8)&255, b:n&255 }
}
function rgba(hex, a){ const {r,g,b} = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }

export default function HeatmapCard({
  src = "/gh-contribs.json",
  baseVar = "--accent",        // ou "--accent-2"
  weeksFallback = 53,
  className = "",
}){
  const [weeks, setWeeks] = useState([])
  const [months, setMonths] = useState([])
  const [tick, setTick] = useState(0) // pour réagir au changement de thème

  useEffect(() => {
    let cancel = false
    fetch(src, { cache: "no-store" })
      .then(r => r.ok ? r.json() : { weeks: [], months: [] })
      .then(j => {
        if (cancel) return
        const w = j.weeks && j.weeks.length ? j.weeks : Array.from({length:weeksFallback},()=>Array(7).fill(0))
        const m = j.months && j.months.length ? j.months : autoMonths(w.length)
        setWeeks(w); setMonths(m)
      })
      .catch(() => {
        if (cancel) return
        setWeeks(Array.from({length:weeksFallback},()=>Array(7).fill(0)))
        setMonths(autoMonths(weeksFallback))
      })
    return () => { cancel = true }
  }, [src, weeksFallback])

  useEffect(() => {
    const mo = new MutationObserver(() => setTick(t => t+1))
    mo.observe(document.body, { attributes:true, attributeFilter:["style","data-theme","class"] })
    return () => mo.disconnect()
  }, [])

  const accent = cssVar(baseVar, "#22c55e") // re-lu à chaque tick
  const palette = useMemo(() => [
    rgba(accent,.15), rgba(accent,.35), rgba(accent,.55), rgba(accent,.78), rgba(accent,1)
  ], [accent, tick])

  const CELL = 12, GAP = 2
  const empty = "var(--gh-empty, rgba(255,255,255,.08))"

  return (
    <div className={className}>
      <div className="gh-card">
        <div className="gh-header">
          <div className="text-sm" style={{opacity:.8}}>Contributions (last year)</div>
          <div className="gh-legend">
            <span>Less</span>
            {[0,1,2,3,4].map(i=>(
              <span key={i} className="cell" style={{background: i===0 ? empty : palette[i]}}/>
            ))}
            <span>More</span>
          </div>
        </div>

        <div className="gh-layout">
          <div className="gh-days">
            <div>Mon</div><div className="spacer" />
            <div>Wed</div><div className="spacer" />
            <div>Fri</div>
          </div>

          <div className="overflow-x-auto">
            <div style={{minWidth: weeks.length*(CELL+GAP)}}>
              <div className="gh-months" style={{display:'grid', gridTemplateColumns:`repeat(${weeks.length},${CELL+GAP}px)`}}>
                {months.map(m => (
                  <div key={m.index} style={{ gridColumnStart: m.index+1 }}>{m.label}</div>
                ))}
              </div>

              <div className="gh-grid">
                {weeks.map((col, ci) => (
                  <div key={ci} className="gh-col">
                    {col.map((lvl, di) => (
                      <div
                        key={di}
                        className="gh-cell"
                        style={{ background: (lvl|0) === 0 ? empty : palette[lvl|0] }}
                        title={`${lvl|0} contributions`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 text-[10px] sm:hidden flex gap-3" style={{opacity:.6}}>
          <span>Mon</span><span>Wed</span><span>Fri</span>
        </div>
      </div>
    </div>
  )
}

function autoMonths(weeks){
  const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const out = []
  for (let i=0;i<weeks;i++){ if (i===0 || i%4===0) out.push({ index:i, label: labels[i%12] }) }
  return out
}
