"use client"

import { useState } from "react"
import Image from "next/image"
import { type ActiveEvent } from "@/lib/data"

function EventItem({ event }: { event: ActiveEvent }) {
  const [imageError, setImageError] = useState(false)
  const hasImage = Boolean(event.image) && !imageError

  return (
    <div className="flex flex-col items-center justify-center px-2 sm:px-3">
      <div className="relative h-24 w-24 rounded-xl border border-border/50 bg-card/60 p-3 transition-transform duration-300 hover:scale-105 hover:border-primary/50 sm:h-28 sm:w-28 sm:p-4">
        {hasImage ? (
          <Image
            src={event.image}
            alt={event.name}
            fill
            className="object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-black p-1">
            <span className="font-oswald text-center text-xs font-bold uppercase leading-tight tracking-wide text-white sm:text-sm">
              {event.name}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

interface EventosActivosSectionProps {
  events: ActiveEvent[]
}

export function EventosActivosSection({ events }: Readonly<EventosActivosSectionProps>) {
  if (events.length === 0) return null

  return (
    <section className="border-y border-border/80 bg-card/40 py-12 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="font-oswald mb-10 text-center text-2xl font-bold uppercase tracking-wide text-foreground md:text-3xl">
          Eventos Activos
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
          {events.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}
