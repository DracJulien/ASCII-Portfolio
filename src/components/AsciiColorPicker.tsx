import React, { useEffect, useRef, useState } from "react"

const KEY = 'asciiColorLight' as const

type Props = {
  theme: 'light' | 'dark'
}

export default function AsciiColorPicker({ theme }: Props) {
  const [color, setColor] = useState<string>(() =>
    typeof window !== 'undefined'
      ? localStorage.getItem(KEY) ?? '#374151'
      : '#374151'
  )
  const [open, setOpen] = useState<boolean>(false)
  const wrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const el = wrapRef.current
      if (!el) return
      if (!el.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  // Applique la couleur en light
  useEffect(() => {
    if (theme === 'light') {
      document.body.style.setProperty('--ascii-color-light', color)
    }
  }, [theme, color])

  const disabled = theme !== 'light'

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const c = e.target.value
    setColor(c)
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEY, c)
    }
    if (theme === 'light') {
      document.body.style.setProperty('--ascii-color-light', c)
    }
  }

  const panelStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: 8,
    zIndex: 70,
    background: 'var(--card)',
    color: 'var(--fg)',
    border: '1px dashed rgba(255,255,255,.2)',
    borderRadius: 12,
    padding: 12,
    width: 200,
    boxShadow: '0 6px 24px rgba(0,0,0,.25)',
  }

  return (
    <div ref={wrapRef} style={{ position: 'relative', opacity: disabled ? 0.6 : 1 }}>
      <button
        className="btn"
        onClick={() => !disabled && setOpen(o => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        type="button"
      >
        ASCII 🎨
      </button>

      {open && (
        <div style={panelStyle} role="dialog" aria-label="ASCII color picker">
          <div style={{ display: 'grid', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--muted)', fontSize: 12 }}>Light color</span>
              <input
                type="color"
                value={color}
                onChange={onChange}
                style={{
                  width: 28,
                  height: 28,
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
                  cursor: 'pointer',
                }}
              />
            </div>
            <button className="btn" onClick={() => setOpen(false)} style={{ justifyContent: 'center' }} type="button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
