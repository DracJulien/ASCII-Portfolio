import { createPortal } from "react-dom"
import MatrixRain from "./MatrixRain.jsx"

export default function BackgroundRain(){
	return createPortal(
		<div className="bg-layer">
			{/* Parallax : slow & speed */}
			<MatrixRain className="bg-rain layer-1" density={24} speed={0.6} trail={0.07} fontSize={13}/>
			<MatrixRain className="bg-rain layer-2" density={18} speed={1.0} trail={0.08} fontSize={14}/>
			<div className="bg-vignette" />
		</div>,
		document.body
	)
}
