import { Users, Crown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { teams, currentSeason } from "@/lib/data"

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
            {/* Table Header */}
            <div className="mb-3 grid grid-cols-[3rem_1fr_1fr_5rem] gap-4 border-b border-border px-3 pb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              <span>Pos</span>
              <span>Equipo</span>
              <span>Nombre</span>
              <span className="text-right">Puntos</span>
            </div>
            
            {/* Table Body */}
            <div className="space-y-2">
              {teams.map((team) => (
                <div
                  key={team.position}
                  className="grid grid-cols-[3rem_1fr_1fr_5rem] items-center gap-4 rounded-lg bg-secondary/50 px-3 py-3 transition-colors hover:bg-secondary"
                >
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    team.position === 1 ? 'bg-primary text-primary-foreground' : 
                    team.position === 2 ? 'bg-muted-foreground/50 text-foreground' :
                    team.position === 3 ? 'bg-orange-700/50 text-foreground' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {team.position}
                  </span>
                  <div className="flex min-w-[4rem] items-center gap-2">
                    <div className="h-4 w-1 rounded-full flex-shrink-0" style={{ backgroundColor: team.color }} />
                    <span className="min-w-[2.5rem] font-bold text-foreground">{team.acronym}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{team.name}</span>
                  <span className="text-right font-bold text-foreground">{team.points}</span>
                </div>
              ))}
            </div>
            
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
