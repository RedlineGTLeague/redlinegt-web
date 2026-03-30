// Mock data for Redline GT League

export interface Season {
  /** Sequential season number within the league (1, 2, 3, ...) */
  number: number
  /** Whether the season has finished and a champion has been crowned */
  completed: boolean
}

export interface Team {
  id: string
  acronym: string
  name: string
  color: string
  logo?: string
  active: boolean
}

export interface Standing {
  position: number
  teamId: string
  points: number
}

export interface Race {
  round: number
  circuit: string
  date: string
  time: string
  completed: boolean
}

/** Current active season for the website */
export const currentSeason: Season = {
  number: 1,
  completed: true,
}

// Placeholder - drivers not used in current season
export const drivers: { position: number; name: string; team: string; points: number; teamColor: string }[] = []

export const teams: Team[] = [
  { id: "srt", acronym: "SRT", name: "Speed Racing Team", color: "#e52222", logo: "/images/team-logos/srt.png", active: true },
  { id: "tsr", acronym: "TSR", name: "Technical Sim Racing", color: "#2563eb", logo: "/images/team-logos/tsr.jpg", active: true },
  { id: "ksm", acronym: "KSM", name: "Kaishin Motorsport", color: "#16a34a", logo: "/images/team-logos/ksm.png", active: true },
  { id: "tr", acronym: "TR", name: "Virtual Racing", color: "#eab308", logo: "/images/team-logos/tr.png", active: true },
  { id: "grt", acronym: "GRT", name: "Gardening Racing Team", color: "#ea580c", logo: "/images/team-logos/grt.png", active: true },
  { id: "hrb", acronym: "HRB", name: "Hispanic Racing Bulls", color: "#9333ea", logo: "/images/team-logos/hrb.jpg", active: true },
  { id: "bpf", acronym: "BPF", name: "Brinde Pa Festa", color: "#ffffff", logo: "/images/team-logos/bpf.png", active: false },
  { id: "shk", acronym: "SHK", name: "Shark Racing Team", color: "#ffffff", logo: "/images/team-logos/shk.jpg", active: false },
  { id: "spuk", acronym: "SPUK", name: "SPUK Racing", color: "#ffffff", logo: "/images/team-logos/spuk.jpg", active: false },
]

export const standings: Standing[] = [
  { position: 1, teamId: "srt", points: 247 },
  { position: 2, teamId: "tsr", points: 201 },
  { position: 3, teamId: "ksm", points: 173 },
  { position: 4, teamId: "tr", points: 154 },
  { position: 5, teamId: "grt", points: 124 },
  { position: 6, teamId: "hrb", points: 59 },
]

export const currentTeams = teams.map(t => ({ acronym: t.acronym, name: t.name, logo: t.logo ?? null }))
export const pastTeams = teams.filter(t => !t.active).map(t => ({ acronym: t.acronym, name: t.name, logo: t.logo ?? null }))

export const getTeamById = (id: string) => teams.find((t) => t.id === id)

export const getStandingsWithTeams = (standings: Standing[]) =>
  standings.map((s) => {
    const team = getTeamById(s.teamId)
    return {
      position: s.position,
      teamId: s.teamId,
      points: s.points,
      name: team?.name ?? "",
      acronym: team?.acronym ?? "",
      logo: team?.logo,
      color: team?.color ?? "#000000",
    }
  })

export const teamsSelection = [
  ...teams.filter((t) => t.active),
  ...teams.filter((t) => !t.active),
]

export const races: Race[] = [
  { round: 1, circuit: "Tokyo Expressway", date: "8 Febrero 2026", time: "19:30 CET", completed: true },
  { round: 2, circuit: "Circuit de Barcelona-Catalunya", date: "15 Febrero 2026", time: "19:30 CET", completed: true },
  { round: 3, circuit: "Road Atlanta", date: "22 Febrero 2026", time: "19:30 CET", completed: true },
  { round: 4, circuit: "Nürburgring", date: "1 Marzo 2026", time: "19:30 CET", completed: true },
  { round: 5, circuit: "Circuit de Spa-Francorchamps", date: "8 Marzo 2026", time: "19:30 CET", completed: true },
  { round: 6, circuit: "Interlagos", date: "15 Marzo 2026", time: "19:30 CET", completed: true },
  { round: 7, circuit: "Fuji International Speedway", date: "22 Marzo 2026", time: "19:30 CET", completed: true },
  { round: 8, circuit: "Suzuka Circuit", date: "29 Marzo 2026", time: "19:30 CET", completed: true },
]

export const nextRace = races.find(race => !race.completed) || races[races.length - 1]

/** Redline TV – live stream (caster: dihondia) */
export const redlineTv = {
  name: "Redline TV",
  twitch: "https://www.twitch.tv/dihondia",
  youtube: "https://www.youtube.com/@dihondia/streams",
} as const
