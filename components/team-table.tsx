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
}

export function TeamTable({ standings, showHeader = true }: TeamTableProps) {
  return (
    <div className="space-y-2">
      {showHeader && (
        <div className="mb-3 flex items-center gap-4 border-b border-border px-3 pb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          <span className="w-7 md:w-8">Pos</span>
          <span className="hidden md:block min-w-[4rem]">Equipo</span>
          <span className="flex-1">Equipo</span>
          <span className="text-right">Puntos</span>
        </div>
      )}
      {standings.map((team) => (
        <div
          key={team.position}
          className="flex items-center gap-2 md:gap-4 rounded-lg bg-secondary/50 px-2 md:px-3 py-2 transition-colors hover:bg-secondary"
        >
          <span className={cn(
            "flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full text-xs md:text-sm font-bold flex-shrink-0",
            team.position === 1 ? 'bg-primary text-primary-foreground' : 
            team.position === 2 ? 'bg-muted-foreground/50 text-foreground' :
            team.position === 3 ? 'bg-orange-700/50 text-foreground' :
            'bg-muted text-muted-foreground'
          )}>
            {team.position}
          </span>
          <div className="hidden md:flex min-w-[4rem] items-center gap-2 flex-shrink-0">
            <div className="h-4 w-1 rounded-full" style={{ backgroundColor: team.color }} />
            <span className="text-sm font-bold text-foreground">{team.acronym}</span>
          </div>
          <span className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground truncate flex-1 min-w-0">
            <span className="md:hidden h-2 w-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: team.color }} />
            <span className="truncate">
              <span className="md:hidden font-bold text-foreground">[{team.acronym}] </span>
              {team.name}
            </span>
          </span>
          <span className="ml-auto flex-shrink-0 text-xs md:text-sm font-bold text-foreground">{team.points}</span>
        </div>
      ))}
    </div>
  )
}
