// src/components/ScrollReveal.tsx
import { useEffect, useRef, ReactNode } from "react"

type Props = {
  children: ReactNode
  direction?: "up" | "left" | "right" | "scale"
  delay?: number
  className?: string
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  const dirClass =
    direction === "left" ? "from-left" :
    direction === "right" ? "from-right" :
    direction === "scale" ? "from-scale" : ""

  return (
    <div ref={ref} className={`scroll-reveal ${dirClass} ${className}`}>
      {children}
    </div>
  )
}
