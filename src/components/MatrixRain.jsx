import { useEffect, useRef } from "react"

export default function MatrixRain({
  density = 10,
  speed = 1,
  trail = 0.08,
  fontSize = 14,
  className = '',
  paused = false,
}) {
  const ref = useRef(null)
  const pausedRef = useRef(paused)

  useEffect(() => { pausedRef.current = paused }, [paused])

  useEffect(() => {
    const cvs = ref.current
    const ctx = cvs.getContext("2d")
    let w, h, cols, yPos, raf
    const dpr = Math.max(1, window.devicePixelRatio || 1)
    const chars = "▒░█▓|/\\*+#$01".split("")

    const readVars = () => {
      const cs = getComputedStyle(document.body)
      const color = (cs.getPropertyValue('--rain-color') || '#7aa2f7').trim()
      const trailRgb = (cs.getPropertyValue('--rain-trail-rgb') || '0,0,0').trim()
      return { color, trailRgb }
    }

    let { color, trailRgb } = readVars()

    const resize = () => {
      const host = cvs.parentElement || document.documentElement
      w = host.clientWidth; h = host.clientHeight
      cvs.width = Math.floor(w * dpr); cvs.height = Math.floor(h * dpr)
      cvs.style.width = w + 'px'; cvs.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.max(1, Math.floor(w / density))
      yPos = Array(cols).fill(0)
      ctx.clearRect(0,0,w,h)
    }
    resize()
    const onResize = () => resize()
    window.addEventListener('resize', onResize, { passive:true })

    const draw = () => {
		({ color, trailRgb } = readVars())

      if (!pausedRef.current) {
        ctx.fillStyle = `rgba(${trailRgb},${trail})`
        ctx.fillRect(0,0,w,h)

        ctx.fillStyle = color
        ctx.font = `${fontSize}px ui-monospace, Menlo, Consolas, monospace`
        const step = Math.max(1, density * speed)
        for (let i=0; i<cols; i++){
          const ch = chars[(Math.random()*chars.length)|0]
          ctx.fillText(ch, i*density, yPos[i])
          yPos[i] = (yPos[i] > h || Math.random() > 0.975) ? 0 : yPos[i] + step
        }
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [density, speed, trail, fontSize])

  return <canvas ref={ref} className={className} />
}
