import { Users, Crown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { teams, currentSeason } from "@/lib/data"
import { TeamTable } from "@/components/team-table"

export default function ClasificacionPage() {
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

        {currentSeason.completed && teams[0] && (
          <div className="mx-auto mb-12 max-w-3xl rounded-xl border border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-yellow-500/10 p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-yellow-500">
              <Crown className="h-6 w-6" />
              <span className="font-oswald text-lg font-bold uppercase tracking-wide">Campeón de Temporada {currentSeason.number}</span>
              <Crown className="h-6 w-6" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-4">
              <div className="h-3 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: teams[0].color }} />
              <span className="font-oswald text-3xl font-bold text-yellow-500 md:text-4xl">{teams[0].acronym}</span>
              <span className="text-xl text-amber-200/80">— {teams[0].name}</span>
            </div>
            <p className="mt-2 text-lg font-bold text-yellow-500">{teams[0].points} puntos</p>
          </div>
        )}

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
            <TeamTable teams={teams} showHeader={true} />
            
            {/* Points Gap Section */}
            <div className="mt-8 rounded-lg border border-border bg-secondary/30 p-4">
              <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Diferencia de Puntos
              </h3>
              <div className="space-y-2">
                {teams.slice(0, -1).map((team, index) => (
                  <div key={team.name} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {team.acronym} vs {teams[index + 1].acronym}
                    </span>
                    <span className="font-medium text-primary">
                      +{team.points - teams[index + 1].points} pts
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
