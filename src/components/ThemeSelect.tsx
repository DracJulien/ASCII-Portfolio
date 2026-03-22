// src/components/ThemeSelect.tsx
import { useEffect, useState } from "react"

const PRESET_KEY = "presetName"

const PRESETS: Record<string, any> = {
  default: {
    label: "Default",
    dark: {
      accent: "#7aa2f7", accent2: "#f7768e",
      rainColor: "#7aa2f7", trailRgb: "6,8,13",
      skull: ["#7aa2f7","#a78bfa","#f472b6","#e0af68","#9ece6a"],
      asciiDark: "#6b7a94",
    },
    light: {
      accent: "#2563eb", accent2: "#dc2660",
      rainColor: "#374151", trailRgb: "240,242,247",
      skull: ["#2563eb","#7c3aed","#dc2660","#d97706","#16a34a"],
      asciiDark: "#4b5563",
    }
  },
  ocean: {
    label: "Ocean",
    dark: {
      accent: "#38bdf8", accent2: "#22d3ee",
      rainColor: "#60a5fa", trailRgb: "0,7,20",
      skull: ["#38bdf8","#60a5fa","#22d3ee","#06b6d4","#14b8a6"],
      asciiDark: "#94a3b8",
    },
    light: {
      accent: "#0ea5e9", accent2: "#06b6d4",
      rainColor: "#0f172a", trailRgb: "240,242,247",
      skull: ["#0ea5e9","#38bdf8","#22d3ee","#06b6d4","#14b8a6"],
      asciiDark: "#475569",
    }
  },
  sunset: {
    label: "Sunset",
    dark: {
      accent: "#fb7185", accent2: "#f59e0b",
      rainColor: "#f472b6", trailRgb: "15,0,5",
      skull: ["#fb7185","#f472b6","#f59e0b","#fbbf24","#fca5a5"],
      asciiDark: "#eab308",
    },
    light: {
      accent: "#e11d48", accent2: "#f97316",
      rainColor: "#111827", trailRgb: "240,242,247",
      skull: ["#e11d48","#ec4899","#f59e0b","#f97316","#ef4444"],
      asciiDark: "#b45309",
    }
  },
  matrix: {
    label: "Matrix",
    dark: {
      accent: "#22c55e", accent2: "#84cc16",
      rainColor: "#22c55e", trailRgb: "0,0,0",
      skull: ["#22c55e","#84cc16","#a3e635","#4ade80","#16a34a"],
      asciiDark: "#86efac",
    },
    light: {
      accent: "#16a34a", accent2: "#65a30d",
      rainColor: "#0f172a", trailRgb: "240,242,247",
      skull: ["#16a34a","#65a30d","#22c55e","#84cc16","#a3e635"],
      asciiDark: "#16a34a",
    }
  },
  vaporwave: {
    label: "Vaporwave",
    dark: {
      accent: "#a78bfa", accent2: "#f472b6",
      rainColor: "#93c5fd", trailRgb: "10,0,25",
      skull: ["#8b5cf6","#a78bfa","#ec4899","#06b6d4","#22d3ee"],
      asciiDark: "#c084fc",
    },
    light: {
      accent: "#8b5cf6", accent2: "#ec4899",
      rainColor: "#1f2937", trailRgb: "240,242,247",
      skull: ["#8b5cf6","#a78bfa","#ec4899","#06b6d4","#22d3ee"],
      asciiDark: "#7e22ce",
    }
  },
  mono: {
    label: "Mono",
    dark: {
      accent: "#cbd5e1", accent2: "#94a3b8",
      rainColor: "#e5e7eb", trailRgb: "0,0,0",
      skull: ["#9ca3af","#a1a1aa","#d4d4d8","#e5e7eb","#94a3b8"],
      asciiDark: "#cbd5e1",
    },
    light: {
      accent: "#334155", accent2: "#64748b",
      rainColor: "#1f2937", trailRgb: "240,242,247",
      skull: ["#374151","#4b5563","#6b7280","#9ca3af","#111827"],
      asciiDark: "#334155",
    }
  },
}

function applyVars(vars: any) {
  const s = document.body.style
  s.setProperty('--accent', vars.accent)
  s.setProperty('--accent-2', vars.accent2)
  s.setProperty('--rain-color', vars.rainColor)
  s.setProperty('--rain-trail-rgb', vars.trailRgb)
  const [c1,c2,c3,c4,c5] = vars.skull
  s.setProperty('--skull-c1', c1)
  s.setProperty('--skull-c2', c2)
  s.setProperty('--skull-c3', c3)
  s.setProperty('--skull-c4', c4)
  s.setProperty('--skull-c5', c5)
  s.setProperty('--ascii-color', vars.asciiDark)
}

const gradientStyle = (colors: string[], w = 60, h = 10) => ({
  width: w, height: h, borderRadius: 999,
  backgroundImage: `linear-gradient(90deg, ${colors.join(',')})`,
  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.15), 0 0 0 1px rgba(0,0,0,.2)'
})

const dot = (c: string) => ({
  width: 10, height: 10, borderRadius: 999, background: c,
  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.2), 0 0 0 1px rgba(0,0,0,.25)'
})

export default function ThemeSelect({ theme }: { theme: string }) {
  const [name, setName] = useState(localStorage.getItem(PRESET_KEY) || 'default')

  useEffect(() => {
    const preset = PRESETS[name] || PRESETS.default
    applyVars(preset[theme])
    localStorage.setItem(PRESET_KEY, name)
  }, [name, theme])

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {Object.entries(PRESETS).map(([key, p]) => {
        const v = (p as any)[theme]
        return (
          <button
            key={key}
            className="btn"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderColor: key === name ? "var(--accent)" : undefined,
            }}
            onClick={() => setName(key)}
            aria-selected={key === name}
          >
            <span>{(p as any).label}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span style={gradientStyle(v.skull)} />
              <span title="Accent" style={dot(v.accent)} />
              <span title="Rain" style={dot(v.rainColor)} />
            </span>
          </button>
        )
      })}
    </div>
  )
}
