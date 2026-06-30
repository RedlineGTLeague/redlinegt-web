import { Crown, Trophy } from "lucide-react"
import { getStandingsWithTeams, standings, currentSeason, carreraCampeones, getCarreraChampionTeam, getCarreraTotalPoints } from "@/lib/data"

interface ChampionBannerProps {
  className?: string
}

export function ChampionBanner({ className = "" }: ChampionBannerProps) {
  if (!currentSeason.completed) return null

  // If Carrera de Campeones is enabled and completed, use its champion
  if (carreraCampeones.enabled && carreraCampeones.completed && carreraCampeones.championTeamId) {
    const champion = getCarreraChampionTeam()
    const totalPoints = getCarreraTotalPoints(carreraCampeones.championTeamId!)
    if (!champion) return null

    return (
      <div className={`mx-auto mb-12 max-w-3xl rounded-xl border border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-yellow-500/10 p-6 text-center ${className}`}>
        <div className="flex items-center justify-center gap-2 text-yellow-500">
          <Crown className="h-6 w-6" />
          <span className="font-oswald text-lg font-bold uppercase tracking-wide">Campeón de Temporada {currentSeason.number}</span>
          <Crown className="h-6 w-6" />
        </div>
        <div className="mt-1 text-sm font-medium uppercase tracking-wider text-yellow-400/70">
          Carrera de Campeones
        </div>
        <div className="mt-3 flex items-center justify-center gap-4">
          <div className="h-3 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: champion.color }} />
          <span className="font-oswald text-3xl font-bold text-yellow-500 md:text-4xl">{champion.acronym}</span>
          <span className="text-xl text-amber-200/80">— {champion.name}</span>
        </div>
        <p className="mt-2 text-lg font-bold text-yellow-500">{totalPoints} puntos</p>
      </div>
    )
  }

  // Legacy: champion from regular season standings
  const standingsWithTeams = getStandingsWithTeams(standings)
  const champion = standingsWithTeams[0]
  
  if (!champion) return null
  
  return (
    <div className={`mx-auto mb-12 max-w-3xl rounded-xl border border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-yellow-500/10 p-6 text-center ${className}`}>
      <div className="flex items-center justify-center gap-2 text-yellow-500">
        <Crown className="h-6 w-6" />
        <span className="font-oswald text-lg font-bold uppercase tracking-wide">Campeón de Temporada {currentSeason.number}</span>
        <Crown className="h-6 w-6" />
      </div>
      <div className="mt-3 flex items-center justify-center gap-4">
        <div className="h-3 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: champion.color }} />
        <span className="font-oswald text-3xl font-bold text-yellow-500 md:text-4xl">{champion.acronym}</span>
        <span className="text-xl text-amber-200/80">— {champion.name}</span>
      </div>
      <p className="mt-2 text-lg font-bold text-yellow-500">{champion.points} puntos</p>
    </div>
  )
}
