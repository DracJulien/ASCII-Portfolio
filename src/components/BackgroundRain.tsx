// src/components/BackgroundRain.tsx
import React from "react"
import { createPortal } from "react-dom"
import MatrixRain from "./MatrixRain"

type Props = { paused?: boolean; density?: number; speed?: number }

export default function BackgroundRain({
  paused = false,
  density = 18,
  speed = 1.0,
}: Props): React.ReactPortal {   // <-- au lieu de JSX.Element
  const d1 = Math.max(4, Math.round(density * 1.33))
  const s1 = Math.max(0.05, speed * 0.6)
  const d2 = density
  const s2 = speed

  return createPortal(
    <div className="bg-layer">
      <MatrixRain className="bg-rain layer-1" density={d1} speed={s1} trail={0.07} fontSize={13} paused={paused} />
      <MatrixRain className="bg-rain layer-2" density={d2} speed={s2} trail={0.08} fontSize={14} paused={paused} />
      <div className="bg-vignette" />
    </div>,
    document.body
  )
}
