// Mock data for Redline GT League

export interface Season {
  /** Sequential season number within the league (1, 2, 3, ...) */
  number: number
  /** Whether the season has finished and a champion has been crowned */
  completed: boolean
}

export interface Team {
  position: number
  acronym: string
  name: string
  points: number
  color: string
  logo?: string
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
  completed: false,
}

// Placeholder - drivers not used in current season
export const drivers: { position: number; name: string; team: string; points: number; teamColor: string }[] = []

export const teams: Team[] = [
  { position: 1, acronym: "SRT", name: "Speed Racing Team", points: 211, color: "#e52222", logo: "/images/team-logos/srt.png" },
  { position: 2, acronym: "TSR", name: "Technical Sim Racing", points: 173, color: "#2563eb", logo: "/images/team-logos/tsr.jpg" },
  { position: 3, acronym: "KSM", name: "Kaishin Motorsport", points: 151, color: "#16a34a", logo: "/images/team-logos/ksm.png" },
  { position: 4, acronym: "TR", name: "Virtual Racing", points: 131, color: "#eab308", logo: "/images/team-logos/tr.png" },
  { position: 5, acronym: "GRT", name: "Gardening Racing Team", points: 115, color: "#ea580c", logo: "/images/team-logos/grt.png" },
  { position: 6, acronym: "HRB", name: "Hispanic Racing Bulls", points: 59, color: "#9333ea", logo: "/images/team-logos/hrb.jpg" },
]

export const extraTeams: Team[] = [
  { position: 0, acronym: "BPF", name: "Brinde Pa Festa", points: 0, color: "#ffffff", logo: "/images/team-logos/bpf.png" },
  { position: 0, acronym: "SHK", name: "Shark Racing Team", points: 0, color: "#ffffff", logo: "/images/team-logos/shk.jpg" },
  { position: 0, acronym: "SPUK", name: "SPUK Racing", points: 0, color: "#ffffff", logo: "/images/team-logos/spuk.jpg" },
]

export const currentTeams = teams.map(t => ({ acronym: t.acronym, name: t.name, logo: t.logo ?? null }))
export const pastTeams = extraTeams.map(t => ({ acronym: t.acronym, name: t.name, logo: t.logo ?? null }))

export const races: Race[] = [
  { round: 1, circuit: "Tokyo Expressway", date: "8 Febrero 2026", time: "19:30 CET", completed: true },
  { round: 2, circuit: "Circuit de Barcelona-Catalunya", date: "15 Febrero 2026", time: "19:30 CET", completed: true },
  { round: 3, circuit: "Road Atlanta", date: "22 Febrero 2026", time: "19:30 CET", completed: true },
  { round: 4, circuit: "Nürburgring", date: "1 Marzo 2026", time: "19:30 CET", completed: true },
  { round: 5, circuit: "Circuit de Spa-Francorchamps", date: "8 Marzo 2026", time: "19:30 CET", completed: true },
  { round: 6, circuit: "Interlagos", date: "15 Marzo 2026", time: "19:30 CET", completed: true },
  { round: 7, circuit: "Fuji International Speedway", date: "22 Marzo 2026", time: "19:30 CET", completed: true },
  { round: 8, circuit: "Suzuka Circuit", date: "29 Marzo 2026", time: "19:30 CET", completed: false },
]

export const nextRace = races.find(race => !race.completed) || races[races.length - 1]

/** Redline TV – live stream (caster: dihondia) */
export const redlineTv = {
  name: "Redline TV",
  twitch: "https://www.twitch.tv/dihondia",
  youtube: "https://www.youtube.com/@dihondia/streams",
} as const
