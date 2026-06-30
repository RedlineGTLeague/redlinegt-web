"use client"

import { Crown, MapPin, Calendar, Clock, Trophy, Users, Medal, Flag, Swords } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  carreraCampeones,
  getCarreraChampionTeam,
  getCarreraTotalPoints,
  getCarreraStandings,
  getTeamById,
  currentSeason,
} from "@/lib/data"

interface CarreraCampeonesCardProps {
  className?: string
  showFull?: boolean
}

function SegmentTable({ results, title }: { results: { position: number; teamId: string; points: number }[]; title: string }) {
  if (results.length === 0) return null
  const sorted = [...results].sort((a, b) => a.position - b.position)

  return (
    <div className="mt-4">
      <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h4>
      <div className="space-y-1">
        {sorted.map((r) => {
          const team = getTeamById(r.teamId)
          return (
            <div key={r.teamId} className="flex items-center gap-3 rounded bg-secondary/40 px-3 py-1.5">
              <span className={cn(
                "flex h-6 w-6 items-center justify-center rounded text-xs font-bold",
                r.position === 1 ? "bg-yellow-500 text-black" :
                r.position === 2 ? "bg-neutral-400 text-black" :
                r.position === 3 ? "bg-amber-700 text-white" :
                "bg-muted text-muted-foreground"
              )}>
                {r.position}
              </span>
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: team?.color ?? '#666' }} />
              <span className="text-sm font-medium">{team?.acronym ?? r.teamId}</span>
              <span className="ml-auto text-sm font-bold text-foreground">{r.points} pts</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function CarreraCampeonesCard({ className = "", showFull = false }: CarreraCampeonesCardProps) {
  if (!carreraCampeones.enabled) return null

  const championTeam = carreraCampeones.completed ? getCarreraChampionTeam() : null
  const overallStandings = carreraCampeones.completed ? getCarreraStandings() : []

  return (
    <Card className={cn("border-yellow-500/30 border-2", className)}>
      <CardHeader className="bg-gradient-to-r from-yellow-500/5 via-amber-500/5 to-yellow-500/5 pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/15">
            <Swords className="h-5 w-5 text-yellow-500" />
          </div>
          <div>
            <span className="font-oswald text-xl font-bold uppercase tracking-wide text-yellow-500">
              Carrera de Campeones
            </span>
            <p className="text-xs font-medium text-muted-foreground">
              Temporada {carreraCampeones.seasonNumber}
            </p>
          </div>
          <Badge variant={carreraCampeones.completed ? "default" : "secondary"} className="ml-auto text-xs">
            {carreraCampeones.completed ? "Finalizada" : "Pendiente"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {/* Event info */}
        {carreraCampeones.circuit && (
          <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-yellow-500" />
              {carreraCampeones.circuit}
            </span>
            {carreraCampeones.date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-yellow-500" />
                {carreraCampeones.date}
              </span>
            )}
            {carreraCampeones.time && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-yellow-500" />
                {carreraCampeones.time}
              </span>
            )}
            {carreraCampeones.session && (
              <span className="flex items-center gap-1.5">
                <Flag className="h-4 w-4 text-yellow-500" />
                {carreraCampeones.session}
              </span>
            )}
          </div>
        )}

        {/* Champion */}
        {championTeam && (
          <div className="mb-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-yellow-500">
              <Crown className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Campeón</span>
              <Crown className="h-4 w-4" />
            </div>
            <div className="mt-1 flex items-center justify-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: championTeam.color }} />
              <span className="font-oswald text-xl font-bold text-yellow-500">{championTeam.acronym}</span>
              <span className="text-sm text-amber-200/70">— {championTeam.name}</span>
            </div>
            <p className="mt-0.5 text-xs font-bold text-yellow-500/80">
              {getCarreraTotalPoints(carreraCampeones.championTeamId!)} puntos
            </p>
          </div>
        )}

        {/* Qualified Teams */}
        <div>
          <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Users className="h-4 w-4" />
            Equipos Clasificados
          </h4>
          <div className="space-y-1">
            {carreraCampeones.qualifiedTeams.map((qt) => {
              const team = getTeamById(qt.teamId)
              return (
                <div key={qt.teamId} className="flex items-center gap-3 rounded bg-secondary/30 px-3 py-1.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded text-xs font-bold bg-muted text-muted-foreground">
                    {qt.position}
                  </span>
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: team?.color ?? '#666' }} />
                  <span className="text-sm font-medium">{team?.acronym ?? qt.teamId}</span>
                  <span className="text-xs text-muted-foreground ml-1">{team?.name}</span>
                  <Badge variant={qt.qualificationType === 'wildcard' ? 'outline' : 'secondary'} className="ml-auto text-[10px] px-1.5 py-0">
                    {qt.qualificationType === 'wildcard' ? 'Wildcard' : qt.splitId === 'split-rojo' ? 'Rojo' : 'Blanco'}
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>

        {/* Full results */}
        {showFull && carreraCampeones.completed && (
          <div className="mt-6 space-y-4">
            <div className="border-t border-border pt-4">
              <h4 className="mb-3 flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <Trophy className="h-4 w-4" />
                Clasificación Final
              </h4>
              {overallStandings.length > 0 && (
                <div className="space-y-1">
                  {overallStandings.map((s) => (
                    <div key={s.teamId} className="flex items-center gap-3 rounded bg-secondary/40 px-3 py-1.5">
                      <span className={cn(
                        "flex h-6 w-6 items-center justify-center rounded text-xs font-bold",
                        s.position === 1 ? "bg-yellow-500 text-black" :
                        s.position === 2 ? "bg-neutral-400 text-black" :
                        s.position === 3 ? "bg-amber-700 text-white" :
                        "bg-muted text-muted-foreground"
                      )}>
                        {s.position}
                      </span>
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-sm font-medium">{s.acronym}</span>
                      <span className="ml-auto text-sm font-bold text-foreground">{s.points} pts</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <SegmentTable results={carreraCampeones.qualifyingResults} title="Clasificación" />
            <SegmentTable results={carreraCampeones.sprintResults} title="Sprint" />
            <SegmentTable results={carreraCampeones.mainRaceResults} title="Carrera Principal" />
          </div>
        )}

        {!carreraCampeones.completed && (
          <div className="mt-4 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/20 p-4 text-center">
            <Medal className="mx-auto mb-1 h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              La Carrera de Campeones está por disputarse.
            </p>
            <p className="text-xs text-muted-foreground/60">
              Los equipos clasificados competirán por el título de campeón de la temporada.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}