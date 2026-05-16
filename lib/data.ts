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
  { id: "split-rojo", name: "Split Rojo", teamIds: ["ksm", "tr", "tsr", "bpf", "bpf2"] },
  { id: "split-blanco", name: "Split Blanco", teamIds: ["grt", "srt", "shk", "shkb", "spuk", "erg"] },
]

export const currentSeason: Season = {
  number: 2,
  completed: false,
}

export const drivers: { position: number; name: string; team: string; points: number; teamColor: string }[] = []

export const teams: Team[] = [
  { id: "srt", acronym: "SRT", name: "Speed Racing Team", color: "#ef4444", logo: "/images/team-logos/srt.png", active: true },
  { id: "tsr", acronym: "TSR", name: "Technical Sim Racing", color: "#22d3ee", logo: "/images/team-logos/tsr.jpg", active: true },
  { id: "ksm", acronym: "KSM", name: "Kaishin Motorsport", color: "#f97316", logo: "/images/team-logos/ksm.png", active: true },
  { id: "tr", acronym: "TR", name: "Virtual Racing", color: "#e11d48", logo: "/images/team-logos/tr.png", active: true },
  { id: "grt", acronym: "GRT", name: "Gardening Racing Team", color: "#10b981", logo: "/images/team-logos/grt.png", active: true },
  { id: "hrb", acronym: "HRB", name: "Hispanic Racing Bulls", color: "#8b5cf6", logo: "/images/team-logos/hrb.jpg", active: false },
  { id: "bpf", acronym: "BPF", name: "Brinde Pa Festa", color: "#3b82f6", logo: "/images/team-logos/bpf1.jpg", active: true },
  { id: "shk", acronym: "SHK", name: "Shark Racing Team", color: "#0ea5e9", logo: "/images/team-logos/shk.jpg", active: true },
  { id: "spuk", acronym: "SPUK", name: "SPUK Racing", color: "#d946ef", logo: "/images/team-logos/spuk.png", active: true },
  { id: "erg", acronym: "ERG", name: "Elite Racing Global", color: "#14b8a6", logo: "/images/team-logos/erg.jpg", active: true },
  { id: "bpf2", acronym: "BPF2", name: "Brinde Pa Festa 2", color: "#93c5fd", logo: "/images/team-logos/bpf2.jpg", active: true },
  { id: "shkb", acronym: "SHKB", name: "Shark Racing Team Black", color: "#b91c1c", logo: "/images/team-logos/shkb.jpg", active: true },
  { id: "irt", acronym: "IRT", name: "Iberia Racing Team", color: "#ec4899", logo: "/images/team-logos/irt.png", active: true },  
]

export type RaceStatus = 'pending' | 'completed' | 'postponed'

export interface Race {
  round: number
  circuit: string
  session: string
  date: string
  time: string
  splitStatus: Record<string, RaceStatus>
}

// Simple per-team per-split total points (manually updated)
export const splitPoints: Record<string, Record<string, number>> = {
  "split-rojo": {
    "bpf": 224,
    "tr": 169,
    "ksm": 157,
    "tsr": 136,
    "bpf2": 68,
  },
  "split-blanco": {
    "shkb": 162,
    "grt": 122,
    "srt": 114,
    "spuk": 98,
    "erg": 94,
    "shk": 48,
  },
}

export const getTeamTotalPoints = (teamId: string, splitId?: string): number => {
  if (splitId) {
    return splitPoints[splitId]?.[teamId] ?? 0
  }
  return Object.values(splitPoints).reduce((total, split) => total + (split[teamId] ?? 0), 0)
}

export const getStandingsByTier = (tierId: string): Standing[] => {
  const tier = tiers.find(t => t.id === tierId)
  if (!tier) return []
  return tier.teamIds
    .map((teamId) => ({
      position: 0,
      teamId,
      points: getTeamTotalPoints(teamId, tierId)
    }))
    .sort((a, b) => b.points - a.points)
    .map((s, index) => ({ ...s, position: index + 1 }))
}

export const standings: Standing[] = getStandingsByTier('split-rojo').concat(
  getStandingsByTier('split-blanco')
).map((s, i) => ({ ...s, position: i + 1 }))

// Backward compatibility
export const seasonPoints: Record<string, number> = Object.fromEntries(
  tiers.flatMap(tier =>
    tier.teamIds.map(teamId => [teamId, splitPoints[tier.id]?.[teamId] ?? 0])
  )
)

export const currentTeams = teams.filter(t => t.active).map(t => ({ acronym: t.acronym, name: t.name, logo: t.logo ?? null }))
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
  { round: 1, circuit: "Deep Forest", date: "19 Abril 2026", time: "20:00 CET", session: "Amanecer", splitStatus: { "split-rojo": "completed", "split-blanco": "completed" } },
  { round: 2, circuit: "Monza", date: "26 Abril 2026", time: "20:00 CET", session: "Atardecer", splitStatus: { "split-rojo": "completed", "split-blanco": "postponed" } },
  { round: 3, circuit: "Sardegna A", date: "3 Mayo 2026", time: "20:00 CET", session: "Puesta de sol", splitStatus: { "split-rojo": "completed", "split-blanco": "completed" } },
  { round: 4, circuit: "Dragon Trail", date: "10 Mayo 2026", time: "20:00 CET", session: "Alborada", splitStatus: { "split-rojo": "completed", "split-blanco": "completed" } },
  { round: 5, circuit: "Watkins Glen", date: "17 Mayo 2026", time: "20:00 CET", session: "Amanecer", splitStatus: { "split-rojo": "pending", "split-blanco": "pending" } },
  { round: 6, circuit: "Daytona Road Course", date: "24 Mayo 2026", time: "20:00 CET", session: "Puesta de sol", splitStatus: { "split-rojo": "pending", "split-blanco": "pending" } },
  { round: 7, circuit: "Trial Mountain", date: "31 Mayo 2026", time: "20:00 CET", session: "Amanecer", splitStatus: { "split-rojo": "pending", "split-blanco": "pending" } },
  { round: 8, circuit: "Spa-Francorchamps", date: "7 Junio 2026", time: "20:00 CET", session: "Atardecer", splitStatus: { "split-rojo": "pending", "split-blanco": "pending" } },
]

export const nextRace = races.find(race =>
  Object.values(race.splitStatus).every(status => status === 'pending')
) || races[races.length - 1]

export interface Caster {
  name: string
  twitch?: string
  youtube?: string
}

export const casters: Record<string, Caster | null> = {
  "split-rojo": {
    name: "dihondia",
    twitch: "https://www.twitch.tv/dihondia",
    youtube: "https://www.youtube.com/@dihondia/streams",
  },
  "split-blanco": {
    name: "eliteracing_global",
    twitch: "https://www.twitch.tv/eliteracing_global",
  },
}

export const redlineTv = casters["split-rojo"]!

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
  enabled: false,
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

export const getRaceStatus = (race: Race): RaceStatus => {
  const statuses = Object.values(race.splitStatus)
  if (statuses.every(s => s === 'completed')) return 'completed'
  if (statuses.some(s => s === 'postponed')) return 'postponed'
  return 'pending'
}

export const getCompletedRacesCount = (): number => {
  return races.filter(r => getRaceStatus(r) === 'completed').length
}
