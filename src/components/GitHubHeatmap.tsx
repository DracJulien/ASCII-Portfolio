import { useMemo } from "react"

function cssVar(name, fallback="#22c55e"){
  if (typeof window === "undefined") return fallback
  const v = getComputedStyle(document.body).getPropertyValue(name).trim()
  return v || fallback
}
function hexToRgb(hex){
  const m = hex.replace('#','')
  const v = m.length===3 ? m.split('').map(x=>x+x).join('') : m
  const n = parseInt(v,16)
  return { r:(n>>16)&255, g:(n>>8)&255, b:n&255 }
}
function rgba(hex, a){ const {r,g,b} = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
function iso(d){ return d.toISOString().slice(0,10) }

export default function GitHubHeatmap({
  data,
  dates,
  weeks = 53,
  maxPerDay = 10,
  base = "accent",         // "accent" | "accent-2"
  className = "",
}) {
  const rawCounts = useMemo(() => {
    if (data && Object.keys(data).length) return data
    if (dates && dates.length){
      const map = {}
      dates.forEach(d => { const k = d.slice(0,10); map[k] = (map[k]||0) + 1 })
      return map
    }
    // fallback demo si aucune donnée fournie
    const now = new Date(); now.setHours(0,0,0,0)
    const map = {}
    for (let i=0;i<220;i++){
      const d = new Date(now)
      d.setDate(now.getDate() - Math.floor(Math.random()*365))
      const k = iso(d)
      map[k] = (map[k]||0) + (Math.random()<.7 ? 1 : Math.floor(Math.random()*4)+1)
    }
    return map
  }, [data, dates])

  const CELL = 12
  const GAP  = 2

  const { grid, monthLabels } = useMemo(() => {
    const end = new Date(); end.setHours(0,0,0,0)
    const start = new Date(end); start.setDate(start.getDate() - (weeks*7 - 1))
    const day = start.getDay()
    start.setDate(start.getDate() + (day===0 ? -6 : 1 - day)) // aligne sur lundi

    const g = []
    const months = []
    let prevMonth = -1
    for (let w=0; w<weeks; w++){
      const col = []
      for (let d=0; d<7; d++){
        const cur = new Date(start); cur.setDate(start.getDate() + w*7 + d); col.push(cur)
      }
      g.push(col)
      const m = col[0].getMonth()
      if (m !== prevMonth){
        months.push({ index:w, label: col[0].toLocaleString(undefined, { month:'short' }) })
        prevMonth = m
      }
    }
    return { grid:g, monthLabels:months }
  }, [weeks])

  const counts = useMemo(() => rawCounts, [rawCounts])

  const accent = cssVar(base === "accent-2" ? "--accent-2" : "--accent")
  const palette = useMemo(() => [
    rgba(accent, .15), rgba(accent, .35), rgba(accent, .55), rgba(accent, .78), rgba(accent, 1)
  ], [accent])

  const scale = (n) => {
    if (!n || n<=0) return 0
    if (n >= maxPerDay) return 4
    if (n >= Math.ceil(maxPerDay*0.75)) return 3
    if (n >= Math.ceil(maxPerDay*0.40)) return 2
    return 1
  }

  const emptyColor = 'var(--gh-empty, rgba(255,255,255,.06))'

  return (
    <div className={className}>
      <div
        className="rounded-xl border border-dashed p-3"
        style={{ background:'var(--surface-bg)', borderColor:'var(--panel-border-color)', boxShadow:'var(--panel-shadow)' }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm" style={{opacity:.8}}>Contributions (last year)</div>
          <div className="flex items-center gap-2 text-xs" style={{opacity:.8}}>
            <span>Less</span>
            <div className="flex items-center gap-[3px]">
              {[0,1,2,3,4].map(i=>(
                <span key={i} className="h-3 w-3 rounded-[3px]"
                      style={{background: i===0 ? emptyColor : palette[i]}}/>
              ))}
            </div>
            <span>More</span>
          </div>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-x-2">
          <div className="text-[10px] leading-4 select-none pt-6 hidden sm:block" style={{opacity:.7}}>
            <div className="h-3.5">Mon</div>
            <div className="h-3.5 mt-3.5">Wed</div>
            <div className="h-3.5 mt-3.5">Fri</div>
          </div>

          <div className="overflow-x-auto">
            <div className="inline-block">
              {/* rangée des mois alignée par grid */}
              <div
                className="h-4 text-[10px] opacity-70 select-none"
                style={{
                  display:'grid',
                  gridTemplateColumns: `repeat(${grid.length}, ${CELL+GAP}px)`
                }}
              >
                {monthLabels.map(m => (
                  <div key={m.index} style={{ gridColumnStart: m.index + 1 }}>{m.label}</div>
                ))}
              </div>

              {/* grille des jours */}
              <div className="grid grid-flow-col auto-cols-max gap-[2px] mt-1">
                {grid.map((col, ci) => (
                  <div key={ci} className="grid gap-[2px]">
                    {col.map((date, di) => {
                      const d = iso(date)
                      const cnt = counts[d] || 0
                      const lvl = scale(cnt)
                      const label = `${cnt} contribution${cnt===1?'':'s'} on ${date.toLocaleDateString()}`
                      return (
                        <div
                          key={di}
                          title={label}
                          aria-label={label}
                          className="h-3 w-3 rounded-[3px]"
                          style={{ background: lvl===0 ? emptyColor : palette[lvl] }}
                        />
                      )
                    })}
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
