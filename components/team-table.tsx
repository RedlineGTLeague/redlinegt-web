import { Standing } from "@/lib/data"
import { cn } from "@/lib/utils"

interface StandingWithTeam extends Standing {
  name: string
  acronym: string
  color: string
  logo?: string
}

interface TeamTableProps {
  standings: StandingWithTeam[]
  showHeader?: boolean
  tierName?: string
}

export function TeamTable({ standings, showHeader = true, tierName }: TeamTableProps) {
  return (
    <div className="space-y-0.5">
      {showHeader && (
        <div className="mb-2 hidden grid-cols-[4rem_1fr_8rem] gap-4 border-b border-border px-4 pb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground md:grid">
          <span>Pos</span>
          <span>Equipo</span>
          <span className="text-right">Puntos</span>
        </div>
      )}
      {tierName && (
        <div className="mb-2 px-4 text-sm font-medium uppercase tracking-wider text-primary">
          {tierName}
        </div>
      )}
      {standings.map((team) => (
        <div
          key={team.position}
          className="hidden items-center gap-4 rounded bg-secondary/50 px-4 py-2 transition-colors hover:bg-secondary md:grid md:grid-cols-[4rem_1fr_8rem]"
        >
          <span className={cn(
            "flex h-10 w-10 items-center justify-center rounded text-sm font-bold",
            team.position === 1 ? 'bg-primary text-primary-foreground' :
            team.position === 2 ? 'bg-muted-foreground/50 text-foreground' :
            team.position === 3 ? 'bg-orange-700/50 text-foreground' :
            'bg-muted text-muted-foreground'
          )}>
            {team.position}
          </span>
          <div className="flex items-center gap-3 truncate">
            <div className="h-4 w-1 rounded-full flex-shrink-0" style={{ backgroundColor: team.color }} />
            <span className="text-sm font-bold text-foreground">{team.acronym}</span>
            <span className="truncate text-sm text-muted-foreground">{team.name}</span>
          </div>
          <span className="text-right text-sm font-bold text-foreground">{team.points}</span>
        </div>
      ))}
      {/* Mobile Layout */}
      <div className="space-y-0.5 md:hidden">
        {standings.map((team) => (
          <div
            key={team.position}
            className="flex items-center gap-3 rounded bg-secondary/50 px-3 py-1.5 transition-colors hover:bg-secondary"
          >
            <span className={cn(
              "flex h-8 w-8 items-center justify-center rounded text-xs font-bold flex-shrink-0",
              team.position === 1 ? 'bg-primary text-primary-foreground' :
              team.position === 2 ? 'bg-muted-foreground/50 text-foreground' :
              team.position === 3 ? 'bg-orange-700/50 text-foreground' :
              'bg-muted text-muted-foreground'
            )}>
              {team.position}
            </span>
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="h-3 w-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: team.color }} />
              <span className="text-sm font-bold text-foreground">{team.acronym}</span>
              <span className="truncate text-xs text-muted-foreground">{team.name}</span>
            </div>
            <span className="flex-shrink-0 text-sm font-bold text-foreground">{team.points}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
