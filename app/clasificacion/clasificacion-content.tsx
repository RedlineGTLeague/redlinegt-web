"use client"

import { Users, Swords } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { standings, getStandingsWithTeams, currentSeason, tiers, getStandingsByTier, carreraCampeones } from "@/lib/data"
import { TeamTable } from "@/components/team-table"
import { ChampionBanner } from "@/components/champion-banner"
import { CarreraCampeonesCard } from "@/components/carrera-campeones-card"

export function ClasificacionContent() {
  const allTiersWithStandings = tiers.map(tier => ({
    ...tier,
    standings: getStandingsWithTeams(getStandingsByTier(tier.id)),
    hasPoints: getStandingsWithTeams(getStandingsByTier(tier.id)).some(s => s.points > 0)
  }))

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="font-oswald text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Clasificación
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#b0b0b0]">
            Clasificación de la temporada {currentSeason.number} de Redline GT League.
          </p>
        </div>

        <ChampionBanner />

        {/* Carrera de Campeones */}
        {carreraCampeones.enabled && (
          <div className="mb-8">
            <CarreraCampeonesCard showFull={true} />
          </div>
        )}

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <span className="font-oswald text-2xl font-bold uppercase tracking-wide">
                Fase Regular — Clasificación por Splits
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Tables Grid */}
            <div className={`grid gap-6 ${tiers.length > 1 ? 'md:grid-cols-2' : ''}`}>
              {allTiersWithStandings.map((tier) => (
                <div key={tier.id}>
                  {tier.hasPoints ? (
                    <TeamTable standings={tier.standings} showHeader={true} tierName={tier.name} />
                  ) : (
                    <div className="py-12 text-center">
                      <p className="mb-4 text-5xl">🏆</p>
                      <p className="text-lg font-medium text-muted-foreground">
                        {tier.name} - Temporada {currentSeason.number} por comenzar
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground/70">
                        La clasificación se activará tras la primera carrera
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Diferencia de Puntos Grid */}
            {allTiersWithStandings.some(t => t.hasPoints) && (
              <div className={`mt-6 grid gap-6 ${tiers.length > 1 ? 'md:grid-cols-2' : ''}`}>
                {allTiersWithStandings.map((tier) => (
                  <div key={`diff-${tier.id}`}>
                    {tier.hasPoints && (
                      <div className="rounded-lg border border-border bg-secondary/30 p-4">
                        <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                          Diferencia de Puntos - {tier.name}
                        </h3>
                        <div className="space-y-2">
                          {tier.standings.slice(0, -1).map((team, index) => (
                            <div key={team.name} className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                {team.acronym} vs {tier.standings[index + 1].acronym}
                              </span>
                              <span className="font-medium text-primary">
                                +{team.points - tier.standings[index + 1].points} pts
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}