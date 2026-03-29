"use client"

import { useEffect, useState, useRef } from "react"
import { BG_IMAGES, BG_CYCLE_MS, BG_TRANSITION_MS } from "@/lib/backgrounds"

function Slide({ src, opacity, zIndex }: { src: string; opacity: number; zIndex: number }) {
  return (
    <div
      className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
      style={{
        opacity,
        zIndex,
        willChange: "opacity",
      }}
    >
      <div
        className="absolute -inset-[20%] bg-cover bg-center"
        style={{
          backgroundImage: `url(${src})`,
          filter: "blur(2px)",
        }}
      />
    </div>
  )
}

export function BackgroundSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleSlot, setVisibleSlot] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const total = BG_IMAGES.length
  const nextIdx = (i: number) => (i + 1) % total
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Slot 0 and 1 alternate: one shows current image, the other shows next. We never change the visible slide's src at transition end.
  const slot0ImageIndex = visibleSlot === 0 ? currentIndex : nextIdx(currentIndex)
  const slot1ImageIndex = visibleSlot === 1 ? currentIndex : nextIdx(currentIndex)

  const advance = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((i) => nextIdx(i))
      setVisibleSlot((s) => 1 - s)
      setIsTransitioning(false)
      timeoutRef.current = null
    }, BG_TRANSITION_MS)
  }

  useEffect(() => {
    const interval = setInterval(advance, BG_CYCLE_MS)
    return () => {
      clearInterval(interval)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    BG_IMAGES.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  // During transition: the slot we're fading in (1 - visibleSlot) is on top and goes to opacity 1; the visible slot fades to 0.
  const slot0Visible = !isTransitioning ? visibleSlot === 0 : visibleSlot === 1
  const slot1Visible = !isTransitioning ? visibleSlot === 1 : visibleSlot === 0

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      <div className="absolute inset-0 z-10 bg-black/50" />
      <div className="absolute inset-0 z-0">
        <Slide
          src={BG_IMAGES[slot0ImageIndex]}
          opacity={slot0Visible ? 1 : 0}
          zIndex={slot0Visible ? 2 : 1}
        />
        <Slide
          src={BG_IMAGES[slot1ImageIndex]}
          opacity={slot1Visible ? 1 : 0}
          zIndex={slot1Visible ? 2 : 1}
        />
      </div>
    </div>
  )
}
