// src/components/SettingsDrawer.tsx
import { Sun, Moon, X, Droplets } from "lucide-react"
import ThemeSelect from "./ThemeSelect"

type Props = {
  open: boolean
  onClose: () => void
  theme: string
  toggleTheme: () => void
  rainEnabled: boolean
  setRainEnabled: (v: boolean) => void
}

export default function SettingsDrawer({
  open,
  onClose,
  theme,
  toggleTheme,
  rainEnabled,
  setRainEnabled,
}: Props) {
  return (
    <>
      <div
        className={`settings-overlay ${open ? "open" : ""}`}
        onClick={onClose}
      />
      <div className={`settings-drawer ${open ? "open" : ""}`}>
        <div className="settings-title">
          <span>⚙ Settings</span>
          <button className="nav-icon-btn" onClick={onClose} aria-label="Close settings">
            <X size={16} />
          </button>
        </div>

        <div className="settings-section">
          <div className="settings-label">Mode</div>
          <button className="btn" onClick={toggleTheme} style={{ width: "100%" }}>
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            {theme === "light" ? "Switch to Dark" : "Switch to Light"}
          </button>
        </div>

        <div className="settings-section">
          <div className="settings-label">Color Theme</div>
          <ThemeSelect theme={theme} />
        </div>

        <div className="settings-section">
          <div className="settings-label">Background</div>
          <button
            className="btn"
            onClick={() => setRainEnabled(!rainEnabled)}
            style={{ width: "100%" }}
          >
            <Droplets size={16} />
            {rainEnabled ? "Rain: ON" : "Rain: OFF"}
          </button>
        </div>
      </div>
    </>
  )
}
