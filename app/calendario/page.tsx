import { Calendar, Clock, MapPin, CheckCircle, Circle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { races, currentSeason } from "@/lib/data"
import { ChampionBanner } from "@/components/champion-banner"

export default function CalendarioPage() {
  const completedRaces = races.filter(r => r.completed).length
  const totalRaces = races.length
  
  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="font-oswald text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Calendario
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#b0b0b0]">
            Calendario completo de carreras de la temporada {currentSeason.number}.<br />
            {completedRaces} de {totalRaces} rondas completadas.
          </p>
        </div>

        <ChampionBanner />

        {/* Progress Bar */}
        <div className="mx-auto mb-12 max-w-2xl">
          <div className="mb-2 flex justify-between text-sm text-muted-foreground">
            <span>Progreso de la temporada</span>
            <span>{Math.round((completedRaces / totalRaces) * 100)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <div 
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${(completedRaces / totalRaces) * 100}%` }}
            />
          </div>
        </div>

        {/* Calendar Card */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <span className="font-oswald text-2xl font-bold uppercase tracking-wide">
                Temporada {currentSeason.number}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Table Header - Desktop */}
            <div className="mb-4 hidden grid-cols-[4rem_1fr_10rem_8rem_6rem] gap-4 border-b border-border px-4 pb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground md:grid">
              <span>Ronda</span>
              <span>Circuito</span>
              <span>Fecha</span>
              <span>Hora</span>
              <span className="text-center">Estado</span>
            </div>
            
            {/* Race List */}
            <div className="space-y-3">
              {races.map((race) => (
                <div
                  key={race.round}
                  className={`rounded-lg border transition-colors ${
                    race.completed 
                      ? 'border-border bg-secondary/30' 
                      : 'border-primary/30 bg-primary/5'
                  }`}
                >
                  {/* Desktop Layout */}
                  <div className="hidden grid-cols-[4rem_1fr_10rem_8rem_6rem] items-center gap-4 px-4 py-4 md:grid">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${
                      race.completed ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'
                    }`}>
                      R{race.round}
                    </span>
                    <div className="flex items-center gap-3">
                      <MapPin className={`h-4 w-4 ${race.completed ? 'text-muted-foreground' : 'text-primary'}`} />
                      <span className={`font-medium ${race.completed ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {race.circuit}
                      </span>
                    </div>
                    <span className={race.completed ? 'text-muted-foreground' : 'text-foreground'}>
                      {race.date}
                    </span>
                    <div className="flex items-center gap-2">
                      <Clock className={`h-4 w-4 ${race.completed ? 'text-muted-foreground' : 'text-primary'}`} />
                      <span className={race.completed ? 'text-muted-foreground' : 'text-foreground'}>
                        {race.time}
                      </span>
                    </div>
                    <div className="flex justify-center">
                      {race.completed ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                          <CheckCircle className="h-3.5 w-3.5" />
                          Completada
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                          <Circle className="h-3.5 w-3.5" />
                          Pendiente
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Mobile Layout */}
                  <div className="p-4 md:hidden">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${
                          race.completed ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'
                        }`}>
                          R{race.round}
                        </span>
                        <div>
                          <p className={`font-medium ${race.completed ? 'text-muted-foreground' : 'text-foreground'}`}>
                            {race.circuit}
                          </p>
                          {race.completed ? (
                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                              <CheckCircle className="h-3 w-3" />
                              Completada
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs text-primary">
                              <Circle className="h-3 w-3" />
                              Pendiente
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {race.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {race.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="mt-8 rounded-lg border border-border bg-card p-6 text-center">
          <p className="text-muted-foreground">
            Todas las carreras se transmiten en vivo a través de nuestro servidor de Discord. 
            <br className="hidden sm:inline" />
            Las horas están indicadas en horario CET (Centro de Europa).
          </p>
        </div>
      </div>
    </div>
  )
}
