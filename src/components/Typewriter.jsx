import { useEffect, useState } from "react"

export default function Typewriter({
  lines = [],
  speed = 24,		// time in ms by char
  pause = 1000,	// time in ms at end of line
  loop = true,
  className = ""
}){
  const [li, setLi] = useState(0)
  const [chars, setChars] = useState(0)

  useEffect(() => {
    let raf
    const tick = () => {
      if (chars < lines[li].length) {
        setChars(c => c + 1)
        raf = setTimeout(tick, speed)
      } else {
        raf = setTimeout(() => {
          setChars(0)
          setLi(i => {
            const next = i + 1
            return next < lines.length ? next : (loop ? 0 : i)
          })
        }, pause)
      }
    }
    raf = setTimeout(tick, speed)
    return () => clearTimeout(raf)
  }, [chars, li, lines, speed, pause, loop])

  return (
    <span className={`typewriter ${className}`}>
      {lines[li].slice(0, chars)}
      <span className="caret">▌</span>
    </span>
  )
}
