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

/**
 * JSON attendu par défaut :
 * { weeks: number[7][], months: [{index:number,label:string}] }
 * - weeks = colonnes, chaque colonne = 7 niveaux 0..4 (Mon→Sun)
 * - months optionnel : si absent, il est calculé automatiquement
 */
export async function initGHHeatmap({
  root,
  src = "/gh-contribs.json",
  baseVar = "--accent",        // ou "--accent-2"
  weeksFallback = 53           // si src non dispo
}){
  const el = typeof root === "string" ? document.querySelector(root) : root
  if (!el) return () => {}

  let json
  try{
    const r = await fetch(src, { cache:"no-store" })
    if (!r.ok) throw new Error(r.statusText)
    json = await r.json()
  }catch{
    // fallback vide si pas de fichier
    json = { weeks: Array.from({length:weeksFallback},()=>Array(7).fill(0)), months: [] }
  }

  const CELL = 12, GAP = 2
  const weeks = json.weeks || []
  const months = (json.months && json.months.length)
    ? json.months
    : autoMonths(weeks.length)

  const monthRow = `<div class="gh-months" style="display:grid;grid-template-columns:repeat(${weeks.length},${CELL+GAP}px)">
    ${months.map(m=>`<div style="grid-column-start:${m.index+1}">${m.label}</div>`).join("")}
  </div>`

  let html = `
    <div class="gh-card">
      <div class="gh-header">
        <div class="text-sm" style="opacity:.8">Contributions (last year)</div>
        <div class="gh-legend">
          <span>Less</span>
          <span class="cell" data-lvl="0"></span>
          <span class="cell" data-lvl="1"></span>
          <span class="cell" data-lvl="2"></span>
          <span class="cell" data-lvl="3"></span>
          <span class="cell" data-lvl="4"></span>
          <span>More</span>
        </div>
      </div>

      <div class="gh-layout">
        <div class="gh-days">
          <div>Mon</div>
          <div class="spacer"></div>
          <div>Wed</div>
          <div class="spacer"></div>
          <div>Fri</div>
        </div>

        <div>
          ${monthRow}
          <div class="gh-grid">
            ${weeks.map(col => `
              <div class="gh-col">
                ${col.map(lvl => `<div class="gh-cell" data-level="${lvl|0}"></div>`).join("")}
              </div>`).join("")}
          </div>
        </div>
      </div>
    </div>`

  el.classList.add("gh-wrap")
  el.innerHTML = html

  function paint(){
    const accent = cssVar(baseVar, "#22c55e")
    const palette = [rgba(accent,.15), rgba(accent,.35), rgba(accent,.55), rgba(accent,.78), rgba(accent,1)]
    el.querySelectorAll(".gh-cell").forEach(cell => {
      const lvl = +cell.dataset.level || 0
      cell.style.background = lvl === 0 ? "var(--gh-empty)" : palette[lvl]
    })
    const legend = el.querySelectorAll(".gh-legend .cell")
    legend.forEach((c,i)=>{
      if (i===0) c.style.background = "var(--gh-empty)"
      else c.style.background = palette[i]
    })
  }

  paint()

  const mo = new MutationObserver(paint)
  mo.observe(document.body, { attributes:true, attributeFilter:["style","data-theme","class"] })

  return () => mo.disconnect()
}

function autoMonths(weeks){
  const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const out = []

  for (let i=0;i<weeks;i++){
    if (i===0 || i%4===0) out.push({ index:i, label: labels[i%12] })
  }
  return out
}
