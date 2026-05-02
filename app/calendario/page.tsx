"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Clock, MapPin, CheckCircle, Circle, Sun, Tv, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { races, currentSeason, tiers, casters, getCompletedRacesCount } from "@/lib/data"
import { ChampionBanner } from "@/components/champion-banner"
import { isRouteEnabled } from "@/lib/routes"

export default function CalendarioPage() {
  const router = useRouter()
  const splitsWithCasters = tiers.map(tier => ({
    ...tier,
    caster: casters[tier.id],
  })).filter(s => s.caster)

  useEffect(() => {
    if (!isRouteEnabled("/calendario")) {
      router.replace("/")
    }
  }, [router])

  if (!isRouteEnabled("/calendario")) {
    return null
  }

  const completedRaces = getCompletedRacesCount()
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
            <div className="mb-4 hidden grid-cols-[4rem_1fr_8rem_6rem_6rem_6rem] gap-4 border-b border-border px-4 pb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground md:grid">
              <span>Ronda</span>
              <span>Circuito</span>
              <span>Sesión</span>
              <span>Fecha</span>
              <span>Hora</span>
              <span className="text-center">Estado</span>
            </div>

            {/* Race List */}
            <div className="space-y-3">
            {races.map((race) => {
                 const allCompleted = Object.values(race.splitStatus).every(s => s === 'completed')
                 const allPending = Object.values(race.splitStatus).every(s => s === 'pending')
                 const hasPostponed = Object.values(race.splitStatus).some(s => s === 'postponed')

                 const statusEntries = Object.entries(race.splitStatus)
                 const displayEntries = hasPostponed
                   ? statusEntries.filter(([, s]) => s === 'postponed')
                   : statusEntries

                 const rowClass = allCompleted
                   ? 'border-border bg-secondary/30'
                   : hasPostponed
                     ? 'border-yellow-500/30 bg-yellow-500/5'
                     : 'border-red-500/30 bg-red-500/5'

                 return (
                   <div
                     key={race.round}
                     className={`rounded-lg border transition-colors ${rowClass}`}
                   >
                     {/* Desktop Layout */}
                     <div className="hidden grid-cols-[4rem_1fr_8rem_6rem_6rem_6rem] items-center gap-4 px-4 py-4 md:grid">
                       <span className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${
                         allCompleted ? 'bg-muted text-muted-foreground' : hasPostponed ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'
                       }`}>
                         R{race.round}
                       </span>
                       <div className="flex items-center gap-3">
                         <MapPin className={`h-4 w-4 ${allCompleted ? 'text-muted-foreground' : hasPostponed ? 'text-yellow-500' : 'text-red-500'}`} />
                         <span className={`font-medium ${allCompleted ? 'text-muted-foreground' : hasPostponed ? 'text-yellow-500' : 'text-foreground'}`}>
                           {race.circuit}
                         </span>
                       </div>
                       <span className={`text-sm ${allCompleted ? 'text-muted-foreground' : hasPostponed ? 'text-yellow-500' : 'text-foreground'}`}>
                         {race.session}
                       </span>
                       <span className={allCompleted ? 'text-muted-foreground' : hasPostponed ? 'text-yellow-500' : 'text-foreground'}>
                         {race.date}
                       </span>
                       <div className="flex items-center gap-2">
                         <Clock className={`h-4 w-4 ${allCompleted ? 'text-muted-foreground' : hasPostponed ? 'text-yellow-500' : 'text-red-500'}`} />
                         <span className={allCompleted ? 'text-muted-foreground' : hasPostponed ? 'text-yellow-500' : 'text-foreground'}>
                           {race.time}
                         </span>
                       </div>
                      <div className="flex justify-center">
                         {allCompleted ? (
                           <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                             <CheckCircle className="h-3.5 w-3.5" />
                             Completada
                           </span>
                         ) : allPending ? (
                           <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-500">
                             <Circle className="h-3.5 w-3.5" />
                             Pendiente
                           </span>
                         ) : (
                           <div className="flex flex-col gap-1">
                             {displayEntries.map(([splitId, status]) => {
                               const tier = tiers.find(t => t.id === splitId)
                               return (
                                 <span key={splitId} className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                                   status === 'completed' ? 'bg-muted text-muted-foreground' :
                                   status === 'postponed' ? 'bg-yellow-500/20 text-yellow-500' :
                                   'bg-red-500/20 text-red-500'
                                 }`}>
                                   {status === 'completed' ? <CheckCircle className="h-3 w-3" /> :
                                    status === 'postponed' ? <AlertCircle className="h-3 w-3" /> :
                                    <Circle className="h-3 w-3" />}
                                   {tier?.name?.replace('Split ', '')}: {status === 'completed' ? 'Completada' : status === 'postponed' ? 'Pospuesta' : 'Pendiente'}
                                 </span>
                               )
                             })}
                           </div>
                         )}
                       </div>
                    </div>

                      {/* Mobile Layout */}
                     <div className="p-4 md:hidden">
                       <div className="mb-3 flex items-start justify-between">
                         <div className="flex items-center gap-3">
                           <span className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${
                             allCompleted ? 'bg-muted text-muted-foreground' : hasPostponed ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'
                           }`}>
                             R{race.round}
                           </span>
                           <div>
                             <p className={`font-medium ${allCompleted ? 'text-muted-foreground' : hasPostponed ? 'text-yellow-500' : 'text-foreground'}`}>
                               {race.circuit}
                             </p>
                             <div className="flex flex-col gap-1 mt-1">
                               {allCompleted ? (
                                 <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                   <CheckCircle className="h-3 w-3" />
                                   Completada
                                 </span>
                               ) : allPending ? (
                                 <span className="inline-flex items-center gap-1 text-xs text-red-500">
                                   <Circle className="h-3 w-3" />
                                   Pendiente
                                 </span>
                               ) : (
                                 displayEntries.map(([splitId, status]) => {
                                   const tier = tiers.find(t => t.id === splitId)
                                   return (
                                     <span key={splitId} className={`inline-flex items-center gap-1 text-xs ${
                                       status === 'completed' ? 'text-muted-foreground' :
                                       status === 'postponed' ? 'text-yellow-500' :
                                       'text-red-500'
                                     }`}>
                                       {status === 'completed' ? <CheckCircle className="h-3 w-3" /> :
                                        status === 'postponed' ? <AlertCircle className="h-3 w-3" /> :
                                        <Circle className="h-3 w-3" />}
                                       {tier?.name?.replace('Split ', '')}: {status === 'completed' ? 'Completada' : status === 'postponed' ? 'Pospuesta' : 'Pendiente'}
                                     </span>
                                   )
                                 })
                               )}
                             </div>
                           </div>
                         </div>
                       </div>
                       <div className={`flex flex-wrap gap-4 text-sm ${allCompleted ? 'text-muted-foreground' : hasPostponed ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                         <span className="flex items-center gap-1.5">
                           <Sun className={`h-4 w-4 ${allCompleted ? 'text-muted-foreground' : hasPostponed ? 'text-yellow-500' : 'text-primary'}`} />
                           {race.session}
                         </span>
                         <span className="flex items-center gap-1.5">
                           <Calendar className={`h-4 w-4 ${allCompleted ? 'text-muted-foreground' : hasPostponed ? 'text-yellow-500' : 'text-primary'}`} />
                           {race.date}
                         </span>
                         <span className="flex items-center gap-1.5">
                           <Clock className={`h-4 w-4 ${allCompleted ? 'text-muted-foreground' : hasPostponed ? 'text-yellow-500' : 'text-primary'}`} />
                           {race.time}
                         </span>
                       </div>
                     </div>
                  </div>
                )})}
            </div>
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="mt-8 space-y-4">
          {splitsWithCasters.length > 0 && (
            <Card className="mx-auto max-w-2xl border-border/80 bg-card/70">
              <CardHeader>
                <CardTitle className="font-oswald text-xl font-bold uppercase tracking-wide flex items-center gap-2">
                  <Tv className="h-5 w-5" />
                  Mira las carreras en directo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {splitsWithCasters.map(split => (
                    <div key={split.id} className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card/50 p-4 text-center">
                      <p className="text-sm font-medium uppercase tracking-wider text-primary">
                        {split.name}
                      </p>
                      <p className="text-lg font-bold text-foreground">
                        <span className="text-muted-foreground">Caster: </span>
                        {split.caster!.name}
                      </p>
                      <div className="flex gap-2">
                        {split.caster!.twitch && (
                          <Button asChild variant="default" size="sm" className="gap-1.5">
                            <a href={split.caster!.twitch} target="_blank" rel="noopener noreferrer">
                              <Tv className="h-3.5 w-3.5" />
                              Twitch
                            </a>
                          </Button>
                        )}
                        {split.caster!.youtube && (
                          <Button asChild variant="outline" size="sm" className="gap-1.5">
                            <a href={split.caster!.youtube} target="_blank" rel="noopener noreferrer">
                              <Tv className="h-3.5 w-3.5" />
                              YouTube
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          <p className="rounded-lg border border-border bg-card p-4 text-center text-muted-foreground">
            Las horas están indicadas en horario CET (Centro de Europa).
          </p>
        </div>
      </div>
    </div>
  )
}
