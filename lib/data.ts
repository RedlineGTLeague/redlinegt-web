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

export interface Tier {
  id: string
  name: string
  teamIds: string[]
}

export const tiers: Tier[] = [
  { id: "redline-rojo", name: "Unico", teamIds: ["srt", "tsr", "ksm", "tr", "grt", "hrb"] },
]

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
  { id: "srt", acronym: "SRT", name: "Speed Racing Team", color: "#ef4444", logo: "/images/team-logos/srt.png", active: true },
  { id: "tsr", acronym: "TSR", name: "Technical Sim Racing", color: "#22d3ee", logo: "/images/team-logos/tsr.jpg", active: true },   // cyan (was purple)
  { id: "ksm", acronym: "KSM", name: "Kaishin Motorsport", color: "#f97316", logo: "/images/team-logos/ksm.png", active: true },      // lime (distinct from green)
  { id: "tr", acronym: "TR", name: "Virtual Racing", color: "#e11d48", logo: "/images/team-logos/tr.png", active: true },
  { id: "grt", acronym: "GRT", name: "Gardening Racing Team", color: "#10b981", logo: "/images/team-logos/grt.png", active: true },
  { id: "hrb", acronym: "HRB", name: "Hispanic Racing Bulls", color: "#8b5cf6", logo: "/images/team-logos/hrb.jpg", active: true },
  { id: "bpf", acronym: "BPF", name: "Brinde Pa Festa", color: "#3b82f6", logo: "/images/team-logos/bpf1.jpg", active: false },
  { id: "shk", acronym: "SHK", name: "Shark Racing Team", color: "#0ea5e9", logo: "/images/team-logos/shk.jpg", active: false },
  { id: "spuk", acronym: "SPUK", name: "SPUK Racing", color: "#d946ef", logo: "/images/team-logos/spuk.png", active: false },
  { id: "erg", acronym: "ERG", name: "Elite Racing Global", color: "#14b8a6", logo: "/images/team-logos/erg.jpg", active: false },   // rose/red (new identity)
  { id: "bpf2", acronym: "BPF2", name: "Brinde Pa Festa 2", color: "#93c5fd", logo: "/images/team-logos/bpf2.jpg", active: false },
  { id: "shkb", acronym: "SHKB", name: "Shark Racing Team Black", color: "#b91c1c", logo: "/images/team-logos/shkb.jpg", active: false }, // amber (not purple anymore)
]

export const standings: Standing[] = [
  { position: 1, teamId: "srt", points: 247 },
  { position: 2, teamId: "tsr", points: 201 },
  { position: 3, teamId: "ksm", points: 173 },
  { position: 4, teamId: "tr", points: 154 },
  { position: 5, teamId: "grt", points: 124 },
  { position: 6, teamId: "hrb", points: 59 },
]

export const currentTeams = teams.filter(t => t.active).map(t => ({ acronym: t.acronym, name: t.name, logo: t.logo ?? null }))
export const pastTeams = teams.filter(t => !t.active).map(t => ({ acronym: t.acronym, name: t.name, logo: t.logo ?? null }))

export const getTeamById = (id: string) => teams.find((t) => t.id === id)

export const getStandingsByTier = (tierId: string): Standing[] => {
  const tier = tiers.find(t => t.id === tierId)
  if (!tier) return standings
  
  return tier.teamIds
    .map((teamId, index) => {
      const standing = standings.find(s => s.teamId === teamId)
      return {
        position: index + 1,
        teamId,
        points: standing?.points ?? 0,
      }
    })
    .sort((a, b) => b.points - a.points)
    .map((s, index) => ({ ...s, position: index + 1 }))
}

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

export const discordLink = "https://discord.gg/wFUpgjbKhM" as const

export interface PreQualyPosition {
  position: number
  teamId: string
  time: string
  car?: string
}

export interface PreQualy {
  enabled: boolean
  showPositions: boolean
  showModel: boolean
  title: string
  date: string
  time: string
  description: string
  circuit: string | null
  car: string | null
  positions: PreQualyPosition[]
}

export const preQualy: PreQualy = {
  enabled: true,
  showPositions: true,
  showModel: true,
  title: "REDLINE GT PreQualy Temporada 2",
  date: "12 Abril 2026",
  time: "20:00 CET",
  description: "Piloto único por equipo.\nLas posiciones determinan el orden de elección de modelo para la temporada.",
  circuit: "Kyoto Yamagiwa",
  car: "VW Beetle Gr3",
  positions: [
    { position: 1, teamId: "ksm", time: "1:32.980", car: "Ferrari 296 GT3 '23" },
    { position: 2, teamId: "tr", time: "1:33.215", car: "Audi R8 LMS Evo '19" },
    { position: 3, teamId: "tsr", time: "1:33.321", car: "Porsche 911 RSR (991) '17" },
    { position: 4, teamId: "bpf", time: "1:33.381", car: "Mazda RX-VISION GT3" },
    { position: 5, teamId: "bpf2", time: "1:33.442", car: "BMW M6 GT3 Sprint Model '16" },
    { position: 6, teamId: "grt", time: "1:33.498", car: "Peugeot RCZ Gr.3" },
    { position: 7, teamId: "srt", time: "1:33.504", car: "BMW M6 GT3 Endurance Model '16" },
    { position: 8, teamId: "shk", time: "1:33.736", car: "Citroën Race Car (Gr.3)" },
    { position: 9, teamId: "shkb", time: "1:33.811", car: "Ferrari 458 Italia GT3 '13" },
    { position: 10, teamId: "spuk", time: "1:33.956", car: "Subaru WRX Gr.3" },
    { position: 11, teamId: "erg", time: "1:34.358", car: "Nissan GT-R NISMO GT3 '18" },
  ],
}

export const tierNames = tiers.map((t) => t.name)
export const isMultiTier = tiers.length > 1
