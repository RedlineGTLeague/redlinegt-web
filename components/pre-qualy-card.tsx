import { Calendar, Clock, MapPin, Car, Tv, Flag } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PreQualyCardProps {
  title: string
  date: string
  time: string
  description: string
  circuit: string | null
  car: string | null
}

export function PreQualyCard({ title, date, time, description, circuit, car }: PreQualyCardProps) {
  return (
    <section className="border-y border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 py-6 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <Card className="mx-auto max-w-2xl bg-card/95 backdrop-blur-sm shadow-[0_0_30px_rgba(229,34,34,0.15)] dark:shadow-[0_0_30px_rgba(229,34,34,0.25)]">
          <div className="relative overflow-hidden rounded-lg border-2 border-primary/50 p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
            
            <div className="relative">
              <div className="mb-4 flex flex-col items-center gap-4 sm:flex-row">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/20 shadow-lg">
                  <Flag className="h-8 w-8 text-primary" />
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Evento Pre-Temporada</span>
                  </div>
                  <h2 className="font-oswald text-2xl font-bold uppercase tracking-wide text-foreground md:text-3xl">
                    {title}
                  </h2>
                </div>
              </div>
              
              <div className="mb-4 text-center sm:text-left">
                <p className="text-sm leading-relaxed text-muted-foreground" style={{ whiteSpace: "pre-line" }}>
                  {description}
                </p>
              </div>
              
              <div className="mb-4 flex flex-wrap items-center justify-center gap-4 text-sm sm:justify-start sm:gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">{date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">{time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className={circuit ? "font-medium text-foreground" : "text-muted-foreground"}>
                    {circuit ?? "Circuito por anunciar"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-primary" />
                  <span className={car ? "font-medium text-foreground" : "text-muted-foreground"}>
                    {car ?? "Coche por anunciar"}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button asChild variant="default" size="lg" className="gap-2">
                  <a href="https://www.twitch.tv/dihondia" target="_blank" rel="noopener noreferrer">
                    <Tv className="h-5 w-5" />
                    Ver en Twitch
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <a href="https://www.youtube.com/@dihondia/streams" target="_blank" rel="noopener noreferrer">
                    <Tv className="h-5 w-5" />
                    Ver en YouTube
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
