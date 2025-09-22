import { useEffect, useMemo, useState } from 'react'

function cssVar(name, fallback = '#22c55e') {
  const value = getComputedStyle(document.body).getPropertyValue(name).trim()
  return value || fallback
}

function hexToRgb(hex) {
  const input = hex.replace('#', '')
  const expanded = input.length === 3 ? input.split('').map(char => char + char).join('') : input
  const parsed = parseInt(expanded, 16)
  return { r: (parsed >> 16) & 255, g: (parsed >> 8) & 255, b: parsed & 255 }
}

function rgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex)
  return `rgba(${r},${g},${b},${alpha})`
}

const CELL = 12
const GAP = 2
const EMPTY_COLOR = 'var(--gh-empty, rgba(255,255,255,.08))'

export default function HeatmapCard({
  src = '/gh-contribs.json',
  baseVar = '--accent',
  weeksFallback = 53,
  className = '',
}) {
  const [weeks, setWeeks] = useState([])
  const [months, setMonths] = useState([])
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let cancel = false

    fetch(src, { cache: 'no-store' })
      .then(response => (response.ok ? response.json() : { weeks: [], months: [] }))
      .then(payload => {
        if (cancel) return
        const safeWeeks = payload.weeks && payload.weeks.length
          ? payload.weeks
          : Array.from({ length: weeksFallback }, () => Array(7).fill(0))
        const safeMonths = payload.months && payload.months.length
          ? payload.months
          : autoMonths(safeWeeks.length)
        setWeeks(safeWeeks)
        setMonths(safeMonths)
      })
      .catch(() => {
        if (cancel) return
        setWeeks(Array.from({ length: weeksFallback }, () => Array(7).fill(0)))
        setMonths(autoMonths(weeksFallback))
      })

    return () => { cancel = true }
  }, [src, weeksFallback])

  useEffect(() => {
    const observer = new MutationObserver(() => setTick(value => value + 1))
    observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'data-theme', 'class'] })
    return () => observer.disconnect()
  }, [])

  const accent = cssVar(baseVar, '#22c55e')
  const palette = useMemo(() => [
    rgba(accent, 0.15),
    rgba(accent, 0.35),
    rgba(accent, 0.55),
    rgba(accent, 0.78),
    rgba(accent, 1),
  ], [accent, tick])

  return (
    <div className={className}>
      <div className="gh-card">
        <div className="gh-header">
          <div className="gh-subtitle">Contributions (last year)</div>
          <div className="gh-legend">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((index) => (
              <span
                key={index}
                className="cell"
                style={{ background: index === 0 ? EMPTY_COLOR : palette[index] }}
              />
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

          <div className="gh-scroll">
            <div style={{ minWidth: weeks.length * (CELL + GAP) }}>
              <div
                className="gh-months"
                style={{ display: 'grid', gridTemplateColumns: `repeat(${weeks.length},${CELL + GAP}px)` }}
              >
                {months.map(month => (
                  <div key={month.index} style={{ gridColumnStart: month.index + 1 }}>{month.label}</div>
                ))}
              </div>

              <div className="gh-grid">
                {weeks.map((column, columnIndex) => (
                  <div key={columnIndex} className="gh-col">
                    {column.map((level, dayIndex) => {
                      const normalized = level | 0
                      const paletteIndex = Math.min(palette.length - 1, Math.max(0, normalized))
                      const color = normalized === 0 ? EMPTY_COLOR : palette[paletteIndex]
                      return (
                        <div
                          key={dayIndex}
                          className="gh-cell"
                          style={{ background: color }}
                          title={`${normalized} contributions`}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="gh-mobile-legend">
          <span>Mon</span><span>Wed</span><span>Fri</span>
        </div>
      </div>
    </div>
  )
}

function autoMonths(weeks) {
  const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const result = []
  for (let index = 0; index < weeks; index += 1) {
    if (index === 0 || index % 4 === 0) {
      result.push({ index, label: labels[index % 12] })
    }
  }
  return result
}
