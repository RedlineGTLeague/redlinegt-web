"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { standings, getStandingsWithTeams } from "@/lib/data"
import { TeamTable } from "@/components/team-table"
import { ChampionBanner } from "@/components/champion-banner"
import { isRouteEnabled } from "@/lib/routes"

export default function ClasificacionPage() {
  const router = useRouter()

  useEffect(() => {
    if (!isRouteEnabled("/clasificacion")) {
      router.replace("/")
    }
  }, [router])

  if (!isRouteEnabled("/clasificacion")) {
    return null
  }

  const standingsWithTeams = getStandingsWithTeams(standings)

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="font-oswald text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Clasificación
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#b0b0b0]">
            Clasificación actual de equipos en la temporada 2026 de Redline GT League.
          </p>
        </div>

        <ChampionBanner />

        {/* Team Standings */}
        <Card className="mx-auto max-w-3xl border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <span className="font-oswald text-2xl font-bold uppercase tracking-wide">
                Clasificación de Equipos
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TeamTable standings={standingsWithTeams} showHeader={true} />
            
            {/* Points Gap Section */}
            <div className="mt-8 rounded-lg border border-border bg-secondary/30 p-4">
              <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Diferencia de Puntos
              </h3>
              <div className="space-y-2">
                {standingsWithTeams.slice(0, -1).map((team, index) => (
                  <div key={team.name} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {team.acronym} vs {standingsWithTeams[index + 1].acronym}
                    </span>
                    <span className="font-medium text-primary">
                      +{team.points - standingsWithTeams[index + 1].points} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
