import { createPortal } from 'react-dom'
import MatrixRain from './MatrixRain.jsx'

export default function BackgroundRain({ paused = false, density = 18, speed = 1 }){
  const denseBack = Math.max(6, density * 1.3)
  const denseFront = Math.max(6, density)
  return createPortal(
    <div className="bg-layer">
      {/* Parallax : slow & speed */}
      <MatrixRain
        className="bg-rain layer-1"
        density={denseBack}
        speed={speed * 0.55}
        trail={0.07}
        fontSize={13}
        paused={paused}
      />
      <MatrixRain
        className="bg-rain layer-2"
        density={denseFront}
        speed={speed}
        trail={0.08}
        fontSize={14}
        paused={paused}
      />
      <div className="bg-vignette" />
    </div>,
    document.body
  )
}
