import { useState } from 'react'
import HeatmapCard from '@/components/HeatmapCard.jsx'

export default function HeatmapWithRefresh() {
  const [timestamp, setTimestamp] = useState(Date.now())
  const [loading, setLoading] = useState(false)

  function refresh() {
    setLoading(true)
    setTimestamp(Date.now())
    setTimeout(() => setLoading(false), 600)
  }

  return (
    <div className="heatmap-wrapper">
      <div className="heatmap-actions">
        <button className="btn" onClick={refresh} disabled={loading}>
          {loading ? 'Fetching...' : 'Refresh contributions'}
        </button>
      </div>
      <HeatmapCard
        src={`/gh-contribs.json?t=${timestamp}`}
        baseVar="--accent"
        className="heatmap-card"
      />
    </div>
  )
}
