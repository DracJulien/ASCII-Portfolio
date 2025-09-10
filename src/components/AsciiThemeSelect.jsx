import { useEffect, useRef, useState } from "react"

const KEY_NAME  = "asciiThemeLightName"
const KEY_COLOR = "asciiColorLight"

/* Thèmes proposés pour la couleur des blocs ASCII (mode light) */
const PRESETS = {
	slate:    { label: "Slate",    color: "#374151" }, // slate-700
	graphite: { label: "Graphite", color: "#111827" }, // gray-900
	sepia:    { label: "Sepia",    color: "#7c5a3a" },
	forest:   { label: "Forest",   color: "#166534" }, // green-800
	royal:    { label: "Royal",    color: "#1d4ed8" }, // blue-700
	teal:     { label: "Teal",     color: "#0f766e" }, // teal-700
	candy:    { label: "Candy",    color: "#db2777" }, // pink-600
	mono:     { label: "Mono",     color: "#4b5563" }, // gray-600
}

export default function AsciiThemeSelect({ theme }){
	const [open, setOpen] = useState(false)
	const [name, setName] = useState(localStorage.getItem(KEY_NAME) || "slate")
	const wrapRef = useRef(null)

	// Fermer le menu au clic extérieur
	useEffect(() => {
		const onDocClick = (e) => {
			if (!wrapRef.current) return
			if (!wrapRef.current.contains(e.target)) setOpen(false)
		}
		document.addEventListener("mousedown", onDocClick)
		return () => document.removeEventListener("mousedown", onDocClick)
	}, [])

	// Applique la couleur choisie (uniquement en light)
	const applyColor = (hex) => {
		document.body.style.setProperty("--ascii-color-light", hex)
		localStorage.setItem(KEY_COLOR, hex)
	}

	// Au montage / changement de mode, réappliquer la dernière valeur
	useEffect(() => {
		if (theme === "light") {
			const stored = localStorage.getItem(KEY_COLOR)
			const hex = stored || PRESETS[name]?.color || "#374151"
			applyColor(hex)
		}
	}, [theme]) // (le changement via select() ci-dessous applique déjà la couleur)

	const select = (key) => {
		setName(key)
		localStorage.setItem(KEY_NAME, key)
		if (theme === "light") applyColor(PRESETS[key].color)
		setOpen(false)
	}

	const disabled = theme !== "light"

	const panelStyle = {
		position:"absolute", top:"100%", right:0, marginTop:8, zIndex:80,
		background:"var(--card)", color:"var(--fg)",
		border:"1px dashed rgba(255,255,255,.2)", borderRadius:12, padding:12, width:220,
		boxShadow:"0 6px 24px rgba(0,0,0,.25)"
	}
	const rowStyle = { display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }
	const swatch = (c) => ({
		width:18, height:18, borderRadius:6, background:c,
		border:"1px solid rgba(0,0,0,.25)", boxShadow:"inset 0 0 0 1px rgba(255,255,255,.15)"
	})

	return (
		<div ref={wrapRef} style={{ position:"relative", opacity: disabled ? .6 : 1 }}>
			<button
				className="btn"
				onClick={() => !disabled && setOpen(o=>!o)}
				aria-haspopup="listbox"
				aria-expanded={open}
				title={disabled ? "Active en mode clair" : "Choisir un thème ASCII (light)"}
			>
				ASCII Theme ▾
			</button>

			{open && (
				<div style={panelStyle} role="listbox" aria-label="ASCII themes">
					{Object.entries(PRESETS).map(([key, preset]) => (
						<button
							key={key}
							className="btn"
							onClick={() => select(key)}
							style={{
								...rowStyle, width:"100%", marginBottom:6,
								borderColor: key === name ? "var(--accent)" : "rgba(255,255,255,.2)"
							}}
							aria-selected={key === name}
						>
							<span>{preset.label}</span>
							<span style={swatch(preset.color)} />
						</button>
					))}
					<div style={{ fontSize:12, color:"var(--muted)", marginTop:4 }}>
						S’applique en <b>mode clair</b> sur tous les <code>.ascii-box</code>.
					</div>
				</div>
			)}
		</div>
	)
}
