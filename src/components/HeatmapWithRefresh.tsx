import { useState } from "react"
import HeatmapCard from "@/components/HeatmapCard.jsx"

export default function HeatmapWithRefresh(){
	const [ts, setTs] = useState(0)
	const [loading, setLoading] = useState(false)

	function refresh(){
		setLoading(true)
		setTs(Date.now())               // change l’URL → re-fetch
		setTimeout(() => setLoading(false), 600)
	}

	return (
		<div>
			<div style={{display:"flex", justifyContent:"flex-end", gap:8, marginBottom:8}}>
				<button className="btn" onClick={refresh} disabled={loading}>
					{loading ? "Fetching…" : "Refresh contributions"}
				</button>
			</div>

			<HeatmapCard
				src={`/gh-contribs.json?t=${ts}`}  // bust cache à chaque clic
				baseVar="--accent"
				className="mt-2"
			/>
		</div>
	)
}
