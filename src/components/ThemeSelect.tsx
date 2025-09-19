// src/components/ThemeSelect.jsx
import { useEffect, useState } from "react"

const PRESET_KEY = "presetName"

const PRESETS = {
  default: {
    label: "Default",
    dark: {
      accent: "#7aa2f7", accent2: "#f7768e",
      rainColor: "#7aa2f7", trailRgb: "0,0,0",
      skull: ["#7aa2f7","#a78bfa","#f472b6","#f59e0b","#34d399"],
      asciiDark: "#9aa0a6",
      asciiLight: "#374151",
    },
    light: {
      accent: "#3a72ff", accent2: "#d14b73",
      rainColor: "#1f2937", trailRgb: "255,255,255",
      skull: ["#0ea5e9","#8b5cf6","#ec4899","#f59e0b","#10b981"],
      asciiDark: "#6b7280",
      asciiLight: "#374151",
    }
  },
  ocean: {
    label: "Ocean",
    dark: {
      accent: "#38bdf8", accent2: "#22d3ee",
      rainColor: "#60a5fa", trailRgb: "0,7,20",
      skull: ["#38bdf8","#60a5fa","#22d3ee","#06b6d4","#14b8a6"],
      asciiDark: "#94a3b8",
      asciiLight: "#0f172a",
    },
    light: {
      accent: "#0ea5e9", accent2: "#06b6d4",
      rainColor: "#0f172a", trailRgb: "255,255,255",
      skull: ["#0ea5e9","#38bdf8","#22d3ee","#06b6d4","#14b8a6"],
      asciiDark: "#475569",
      asciiLight: "#0f172a",
    }
  },
  sunset: {
    label: "Sunset",
    dark: {
      accent: "#fb7185", accent2: "#f59e0b",
      rainColor: "#f472b6", trailRgb: "15,0,5",
      skull: ["#fb7185","#f472b6","#f59e0b","#fbbf24","#fca5a5"],
      asciiDark: "#eab308",
      asciiLight: "#3f1d0b",
    },
    light: {
      accent: "#e11d48", accent2: "#f97316",
      rainColor: "#111827", trailRgb: "255,255,255",
      skull: ["#e11d48","#ec4899","#f59e0b","#f97316","#ef4444"],
      asciiDark: "#b45309",
      asciiLight: "#3f1d0b",
    }
  },
  matrix: {
    label: "Matrix",
    dark: {
      accent: "#22c55e", accent2: "#84cc16",
      rainColor: "#22c55e", trailRgb: "0,0,0",
      skull: ["#22c55e","#84cc16","#a3e635","#4ade80","#16a34a"],
      asciiDark: "#86efac",
      asciiLight: "#065f46",
    },
    light: {
      accent: "#16a34a", accent2: "#65a30d",
      rainColor: "#0f172a", trailRgb: "255,255,255",
      skull: ["#16a34a","#65a30d","#22c55e","#84cc16","#a3e635"],
      asciiDark: "#16a34a",
      asciiLight: "#065f46",
    }
  },
  vaporwave: {
    label: "Vaporwave",
    dark: {
      accent: "#a78bfa", accent2: "#f472b6",
      rainColor: "#93c5fd", trailRgb: "10,0,25",
      skull: ["#8b5cf6","#a78bfa","#ec4899","#06b6d4","#22d3ee"],
      asciiDark: "#c084fc",
      asciiLight: "#6b21a8",
    },
    light: {
      accent: "#8b5cf6", accent2: "#ec4899",
      rainColor: "#1f2937", trailRgb: "255,255,255",
      skull: ["#8b5cf6","#a78bfa","#ec4899","#06b6d4","#22d3ee"],
      asciiDark: "#7e22ce",
      asciiLight: "#6b21a8",
    }
  },
  mono: {
    label: "Mono",
    dark: {
      accent: "#cbd5e1", accent2: "#94a3b8",
      rainColor: "#e5e7eb", trailRgb: "0,0,0",
      skull: ["#9ca3af","#a1a1aa","#d4d4d8","#e5e7eb","#94a3b8"],
      asciiDark: "#cbd5e1",
      asciiLight: "#374151",
    },
    light: {
      accent: "#334155", accent2: "#64748b",
      rainColor: "#1f2937", trailRgb: "255,255,255",
      skull: ["#374151","#4b5563","#6b7280","#9ca3af","#111827"],
      asciiDark: "#334155",
      asciiLight: "#374151",
    }
  },
}

function applyVars(vars, mode){
  document.body.style.setProperty('--accent', vars.accent)
  document.body.style.setProperty('--accent-2', vars.accent2)
  document.body.style.setProperty('--rain-color', vars.rainColor)
  document.body.style.setProperty('--rain-trail-rgb', vars.trailRgb)
  const [c1,c2,c3,c4,c5] = vars.skull
  document.body.style.setProperty('--skull-c1', c1)
  document.body.style.setProperty('--skull-c2', c2)
  document.body.style.setProperty('--skull-c3', c3)
  document.body.style.setProperty('--skull-c4', c4)
  document.body.style.setProperty('--skull-c5', c5)
  if (mode === 'light') {
    document.body.style.setProperty('--ascii-color-light', vars.asciiLight)
    document.body.style.setProperty('--ascii-color', vars.asciiLight)
  } else {
    document.body.style.setProperty('--ascii-color', vars.asciiDark)
  }
}

const gradientStyle = (colors, w=60, h=10) => ({
  width: w, height: h, borderRadius: 999,
  backgroundImage: `linear-gradient(90deg, ${colors.join(',')})`,
  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.15), 0 0 0 1px rgba(0,0,0,.2)'
})
const dot = (c) => ({
  width: 10, height: 10, borderRadius: 999, background: c,
  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.2), 0 0 0 1px rgba(0,0,0,.25)'
})

export default function ThemeSelect({ theme }){
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(localStorage.getItem(PRESET_KEY) || 'default')

  useEffect(() => {
    const preset = PRESETS[name] || PRESETS.default
    applyVars(preset[theme], theme)
    localStorage.setItem(PRESET_KEY, name)
  }, [name, theme])

  const current = (PRESETS[name] || PRESETS.default)[theme]

  const panelStyle = {
    position:'absolute', right:0, top:'100%', marginTop:8, zIndex:60,
    background:'var(--card)', color:'var(--fg)',
    border:'1px dashed rgba(255,255,255,.2)', borderRadius:12, padding:10, width:260,
    boxShadow:'0 6px 24px rgba(0,0,0,.25)'
  }
  const row = { display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }

  return (
    <div style={{position:'relative'}}>
      {/* === Bouton avec preview (dégradé skull + pastilles accent/rain) === */}
      <button className="btn" onClick={()=>setOpen(o=>!o)} aria-haspopup="listbox" aria-expanded={open}>
        🎨 Theme
        <span style={{display:'inline-flex', alignItems:'center', gap:8, marginLeft:8}}>
          <span style={gradientStyle(current.skull, 56, 8)} />
          <span style={dot(current.accent)} />
          <span style={dot(current.rainColor)} />
        </span>
        ▾
      </button>

      {open && (
        <div style={panelStyle} role="listbox" aria-label="Theme presets">
          {Object.entries(PRESETS).map(([key, p]) => {
            const v = p[theme]
            return (
              <button
                key={key}
                className="btn"
                style={{ ...row, width:'100%', marginBottom:6, borderColor: key===name ? 'var(--accent)' : 'rgba(255,255,255,.2)' }}
                onClick={() => { setName(key); setOpen(false) }}
                aria-selected={key===name}
              >
                <span>{p.label}</span>
                <span style={{display:'inline-flex', alignItems:'center', gap:8}}>
                  <span style={gradientStyle(v.skull)} />
                  <span title="Accent" style={dot(v.accent)} />
                  <span title="Rain" style={dot(v.rainColor)} />
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
