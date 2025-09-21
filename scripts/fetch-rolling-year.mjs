import fs from "node:fs/promises"

const LOGIN = process.env.LOGIN || "Dracjulien"
const GH_TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN
const to = new Date(); to.setHours(0,0,0,0)
const from = new Date(to); from.setDate(from.getDate() - 365)

const query = `
query($login:String!, $from:DateTime!, $to:DateTime!){
	user(login:$login){
		contributionsCollection(from:$from,to:$to){
			contributionCalendar{
				weeks{
					contributionDays{ date contributionCount }
				}
			}
		}
	}
}`

const res = await fetch("https://api.github.com/graphql", {
	method: "POST",
	headers: {
		"Authorization": `Bearer ${GH_TOKEN}`,
		"Content-Type": "application/json",
		"User-Agent": "gh-heatmap-rolling-year"
	},
	body: JSON.stringify({
		query,
		variables: { login: LOGIN, from: from.toISOString(), to: to.toISOString() }
	})
})

if (!res.ok) throw new Error(`GitHub GraphQL ${res.status} ${await res.text()}`)

const json = await res.json()
const weeksRaw = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks || []
const counts = {}

for (const w of weeksRaw) for (const d of w.contributionDays) counts[d.date.slice(0,10)] = d.contributionCount

/* gen format gh-heatmap.js */
function iso(d){ return d.toISOString().slice(0,10) }
function alignToMonday(date){
	const aligned = new Date(date)
	const day = aligned.getDay()
	const delta = day === 1 ? 0 : (day === 0 ? -6 : 1 - day)
	aligned.setDate(aligned.getDate() + delta)
	aligned.setHours(0,0,0,0)
	return aligned
}
function alignToSunday(date){
	const aligned = new Date(date)
	const day = aligned.getDay()
	const delta = day === 0 ? 0 : 7 - day
	aligned.setDate(aligned.getDate() + delta)
	aligned.setHours(0,0,0,0)
	return aligned
}

const start = alignToMonday(from)
const end = alignToSunday(to)
const weekMs = 7 * 24 * 60 * 60 * 1000
const WEEKS = Math.floor((end - start) / weekMs) + 1

/* contribution level 0..4 */
function level(n){
	if (!n || n<=0) return 0
	if (n >= 10) return 4
	if (n >= 6)  return 3
	if (n >= 3)  return 2
	return 1
}

/* build weeks + months */
const weeks = []
const months = []
let prevMonth = -1
for (let w=0; w<WEEKS; w++){
	const col = []
	for (let d=0; d<7; d++){
		const cur = new Date(start); cur.setDate(start.getDate() + w*7 + d)
		const inRange = cur >= from && cur <= to
		const lvl = inRange ? level(counts[iso(cur)] || 0) : null
		col.push(lvl)
	}
	weeks.push(col)
	const m = new Date(start); m.setDate(start.getDate() + w*7)
	const monthIdx = m.getMonth()
	if (monthIdx !== prevMonth){
		months.push({ index: w, label: m.toLocaleString(undefined,{ month:'short' }) })
		prevMonth = monthIdx
	}
}
/* end gen */
await fs.mkdir("public", {recursive:true})
await fs.writeFile(
	"public/gh-contribs.json",
	JSON.stringify({
		weeks,
		months,
		asOf: iso(to),
		from: iso(from),
		start: iso(start),
		end: iso(end),
		login: LOGIN
	}, null, 2)
)
console.log(`gh-contribs.json generated for ${LOGIN} up to ${iso(to)} — weeks:${weeks.length}`)
