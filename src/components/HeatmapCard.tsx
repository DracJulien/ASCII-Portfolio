import { useEffect, useMemo, useState } from "react"

type WeekColumn = Array<number | null>
type WeeksGrid = WeekColumn[]
type MonthLabel = { index: number; label: string }

function alignToMonday(date: Date){
  const aligned = new Date(date)
  const day = aligned.getDay()
  const delta = day === 1 ? 0 : (day === 0 ? -6 : 1 - day)
  aligned.setDate(aligned.getDate() + delta)
  aligned.setHours(0,0,0,0)
  return aligned
}

function alignToSunday(date: Date){
  const aligned = new Date(date)
  const day = aligned.getDay()
  const delta = day === 0 ? 0 : 7 - day
  aligned.setDate(aligned.getDate() + delta)
  aligned.setHours(0,0,0,0)
  return aligned
}

function cssVar(name: string, fallback="#22c55e"){
  const v = getComputedStyle(document.body).getPropertyValue(name).trim()
  return v || fallback
}
function hexToRgb(hex: string){
  const m = hex.replace("#","")
  const v = m.length===3 ? m.split("").map(x=>x+x).join("") : m
  const n = parseInt(v,16)
  return { r:(n>>16)&255, g:(n>>8)&255, b:n&255 }
}
function rgba(hex: string, a: number){ const {r,g,b} = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }

type HeatmapMeta = {
  from?: string
  asOf?: string
  start?: string
  end?: string
}

export default function HeatmapCard({
  src = "/gh-contribs.json",
  baseVar = "--accent",        // ou "--accent-2"
  weeksFallback = 53,
  className = "",
}){
  const [weeks, setWeeks] = useState<WeeksGrid>([])
  const [months, setMonths] = useState<MonthLabel[]>([])
  const [meta, setMeta] = useState<HeatmapMeta>({})
  const [tick, setTick] = useState(0) // pour réagir au changement de thème

  useEffect(() => {
    let cancel = false
    fetch(src, { cache: "no-store" })
      .then(r => r.ok ? r.json() : { weeks: [], months: [] })
      .then(j => {
        if (cancel) return
        let w = j.weeks && j.weeks.length ? j.weeks : Array.from({length:weeksFallback},()=>Array(7).fill(0))
        if (Array.isArray(w) && w.length < weeksFallback){
          const missing = weeksFallback - w.length
          const pad = Array.from({ length: missing }, () => Array(7).fill(null))
          w = [...pad, ...w]
        }
        const m = j.months && j.months.length ? j.months : autoMonths((w as WeeksGrid).length)
        setWeeks(w as WeeksGrid)
        setMonths(m as MonthLabel[])
        setMeta({
          from: typeof j.from === "string" ? j.from : undefined,
          asOf: typeof j.asOf === "string" ? j.asOf : undefined,
          start: typeof j.start === "string" ? j.start : undefined,
          end: typeof j.end === "string" ? j.end : undefined,
        })
      })
      .catch(() => {
        if (cancel) return
        setWeeks(Array.from({length:weeksFallback},()=>Array(7).fill(0)))
        setMonths(autoMonths(weeksFallback))
        setMeta({})
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
  const dateFormatter = useMemo(() => new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }), [])
  const startDate = useMemo(() => {
    if (meta.start){
      const d = new Date(meta.start)
      if (!Number.isNaN(d.getTime())) return alignToMonday(d)
    }
    const endSource = meta.end || meta.asOf
    if (endSource){
      const endDate = new Date(endSource)
      if (!Number.isNaN(endDate.getTime())){
        const alignedEnd = alignToSunday(endDate)
        const start = new Date(alignedEnd)
        start.setDate(start.getDate() - (weeks.length * 7 - 1))
        return alignToMonday(start)
      }
    }
    if (weeks.length){
      const alignedEnd = alignToSunday(new Date())
      const start = new Date(alignedEnd)
      start.setDate(start.getDate() - (weeks.length * 7 - 1))
      return alignToMonday(start)
    }
    return undefined
  }, [meta.start, meta.end, meta.asOf, weeks.length])

  const monthLabels = useMemo(() => {
    if (startDate){
      const out: MonthLabel[] = []
      let prev = -1
      for (let i = 0; i < weeks.length; i++){
        const d = new Date(startDate)
        d.setDate(d.getDate() + i*7)
        const m = d.getMonth()
        if (m !== prev){
          out.push({ index: i, label: d.toLocaleString(undefined,{ month:"short" }) })
          prev = m
        }
      }
      return out
    }
    return months
  }, [startDate, weeks, months])

  const rangeLabel = useMemo(() => {
    if (!meta.from || !meta.asOf) return ""
    const fromDate = new Date(meta.from)
    const toDate = new Date(meta.asOf)
    return `${dateFormatter.format(fromDate)} - ${dateFormatter.format(toDate)}`
  }, [meta.from, meta.asOf, dateFormatter])

  return (
    <div className={className}>
      <div className="gh-card">
        <div className="gh-header">
          <div className="text-sm" style={{opacity:.8}}>Contributions (rolling year)</div>
          {rangeLabel && (
            <div className="text-xs" style={{opacity:.6}}>{rangeLabel}</div>
          )}
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
                {monthLabels.map(m => (
                  <div key={m.index} style={{ gridColumnStart: m.index+1 }}>{m.label}</div>
                ))}
              </div>

              <div className="gh-grid">
                {weeks.map((col, ci) => (
                  <div key={ci} className="gh-col">
                    {col.map((lvl, di) => {
                      const isActive = typeof lvl === "number" && lvl >= 0
                      const level = isActive ? Math.max(0, Math.min(4, lvl|0)) : 0
                      let title = isActive ? `${level} contributions` : "Outside rolling window"
                      if (startDate){
                        const cellDate = new Date(startDate)
                        cellDate.setDate(cellDate.getDate() + ci*7 + di)
                        title = `${dateFormatter.format(cellDate)} · ${title}`
                      }
                      return (
                        <div
                          key={di}
                          className="gh-cell"
                          data-placeholder={isActive ? undefined : "1"}
                          style={{
                            background: level === 0 ? empty : palette[level],
                            opacity: isActive ? 1 : .3,
                            pointerEvents: isActive ? undefined : "none",
                          }}
                          title={title}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function autoMonths(weeks: number){
  const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const out = []
  for (let i=0;i<weeks;i++){ if (i===0 || i%4===0) out.push({ index:i, label: labels[i%12] }) }
  return out
}
