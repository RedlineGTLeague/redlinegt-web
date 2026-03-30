"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

interface TeamLogo {
  acronym: string
  name: string
  logo: string | null
}

interface TeamsSectionProps {
  teams: TeamLogo[]
  extraTeams?: TeamLogo[]
  intervalMs?: number
}

function TeamLogoItem({ team }: { team: TeamLogo }) {
  const [imageError, setImageError] = useState(false)
  const hasValidLogo = team.logo && !imageError

  return (
    <div className="flex flex-col items-center justify-center px-2 sm:px-3">
      <div className="relative h-24 w-24 rounded-xl border border-border/50 bg-card/60 p-3 transition-transform duration-300 hover:scale-105 hover:border-primary/50 sm:h-28 sm:w-28 sm:p-4">
        {hasValidLogo ? (
          <Image
            src={team.logo!}
            alt={team.acronym}
            fill
            className="object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-black">
            <span className="font-oswald text-center text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
              {team.acronym}
            </span>
          </div>
        )}
      </div>
      <span className="mt-3 text-center font-oswald text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm">
        {team.acronym}
      </span>
    </div>
  )
}

function EmptySlot() {
  return (
    <div className="flex items-center justify-center px-2 sm:px-3">
      <div className="h-24 w-24 rounded-xl border border-border/20 bg-transparent p-3 sm:h-28 sm:w-28 sm:p-4" />
    </div>
  )
}

export function TeamsSection({ teams, extraTeams = [], intervalMs = 6000 }: Readonly<TeamsSectionProps>) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerSlide, setItemsPerSlide] = useState(4)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const allTeams = [...teams, ...extraTeams]

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 640) setItemsPerSlide(2)
      else if (window.innerWidth < 1024) setItemsPerSlide(3)
      else setItemsPerSlide(4)
    }
    updateItemsPerSlide()
    window.addEventListener("resize", updateItemsPerSlide)
    return () => window.removeEventListener("resize", updateItemsPerSlide)
  }, [])

  const totalSlides = Math.ceil(allTeams.length / itemsPerSlide)
  const remainder = allTeams.length % itemsPerSlide
  const hasLoneItem = remainder === 1

  const paddedTeams = hasLoneItem
    ? [...allTeams, { acronym: "", name: "", logo: null }, { acronym: "", name: "", logo: null }]
    : [...allTeams]

  useEffect(() => {
    setCurrentIndex(0)
  }, [itemsPerSlide])

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, intervalMs)
    return () => clearInterval(interval)
  }, [isPaused, totalSlides, intervalMs])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const minTouchDistance = 50
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > minTouchDistance) {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    } else if (distance < -minTouchDistance) {
      setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
    }
  }

  if (allTeams.length === 0) return null

  const startIdx = currentIndex * itemsPerSlide
  const visibleTeams = paddedTeams.slice(startIdx, startIdx + itemsPerSlide)

  return (
    <section className="border-y border-border/80 bg-card/40 py-12 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="font-oswald mb-10 text-center text-2xl font-bold uppercase tracking-wide text-foreground md:text-3xl">
          Equipos Participantes
        </h2>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {visibleTeams.map((team, idx) =>
              team.acronym ? (
                <TeamLogoItem key={`${team.acronym}-${idx}`} team={team} />
              ) : (
                <EmptySlot key={`empty-${idx}`} />
              )
            )}
          </div>
        </div>

        {totalSlides > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
