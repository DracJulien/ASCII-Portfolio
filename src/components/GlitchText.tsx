// src/components/GlitchText.tsx
import { useEffect, useState, useCallback } from "react"

type Props = {
  text: string
  className?: string
  glitchOnHover?: boolean
  autoGlitch?: boolean
  interval?: number
}

const GLITCH_CHARS = "▓▒░█╬╠╣╩╦╗╔║─┼┤├┘└┐┌@#$%&"

export default function GlitchText({
  text,
  className = "",
  glitchOnHover = true,
  autoGlitch = false,
  interval = 4000,
}: Props) {
  const [display, setDisplay] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)

  const doGlitch = useCallback(() => {
    if (isGlitching) return
    setIsGlitching(true)

    let iteration = 0
    const maxIterations = text.length * 2

    const timer = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " "
            if (i < iteration / 2) return text[i]
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          })
          .join("")
      )

      iteration++
      if (iteration > maxIterations) {
        clearInterval(timer)
        setDisplay(text)
        setIsGlitching(false)
      }
    }, 30)

    return () => clearInterval(timer)
  }, [text, isGlitching])

  useEffect(() => {
    setDisplay(text)
  }, [text])

  useEffect(() => {
    if (!autoGlitch) return
    const id = setInterval(doGlitch, interval)
    return () => clearInterval(id)
  }, [autoGlitch, interval, doGlitch])

  return (
    <span
      className={`glitch-text ${className}`}
      onMouseEnter={glitchOnHover ? doGlitch : undefined}
    >
      {display}
    </span>
  )
}
