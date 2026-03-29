// Mock data for Redline GT League

export interface Season {
  /** Sequential season number within the league (1, 2, 3, ...) */
  number: number
}

export interface Driver {
  position: number
  name: string
  team: string
  points: number
  teamColor: string
}

export interface Team {
  position: number
  name: string
  points: number
  color: string
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
}

export const drivers: Driver[] = [
  { position: 1, name: "Carlos Mendoza", team: "Velocity Racing", points: 187, teamColor: "#dc2626" },
  { position: 2, name: "Miguel Fernández", team: "Storm Esports", points: 165, teamColor: "#2563eb" },
  { position: 3, name: "Alejandro Ruiz", team: "Apex Motorsport", points: 152, teamColor: "#16a34a" },
  { position: 4, name: "Pablo García", team: "Velocity Racing", points: 141, teamColor: "#dc2626" },
  { position: 5, name: "Diego Martínez", team: "Thunder GT", points: 128, teamColor: "#eab308" },
  { position: 6, name: "Andrés López", team: "Storm Esports", points: 115, teamColor: "#2563eb" },
  { position: 7, name: "Javier Sánchez", team: "Apex Motorsport", points: 98, teamColor: "#16a34a" },
  { position: 8, name: "Luis Rodríguez", team: "Phoenix Racing", points: 87, teamColor: "#ea580c" },
  { position: 9, name: "Fernando Torres", team: "Thunder GT", points: 76, teamColor: "#eab308" },
  { position: 10, name: "Roberto Herrera", team: "Phoenix Racing", points: 65, teamColor: "#ea580c" },
]

export const teams: Team[] = [
  { position: 1, name: "Velocity Racing", points: 328, color: "#dc2626" },
  { position: 2, name: "Storm Esports", points: 280, color: "#2563eb" },
  { position: 3, name: "Apex Motorsport", points: 250, color: "#16a34a" },
  { position: 4, name: "Thunder GT", points: 204, color: "#eab308" },
  { position: 5, name: "Phoenix Racing", points: 152, color: "#ea580c" },
]

export const races: Race[] = [
  { round: 1, circuit: "Circuito de Tokio", date: "15 Enero 2026", time: "21:00 CET", completed: true },
  { round: 2, circuit: "Nürburgring Nordschleife", date: "29 Enero 2026", time: "21:00 CET", completed: true },
  { round: 3, circuit: "Circuito de Spa-Francorchamps", date: "12 Febrero 2026", time: "21:00 CET", completed: true },
  { round: 4, circuit: "Laguna Seca", date: "26 Febrero 2026", time: "21:00 CET", completed: true },
  { round: 5, circuit: "Mount Panorama", date: "12 Marzo 2026", time: "21:00 CET", completed: false },
  { round: 6, circuit: "Circuito de Suzuka", date: "26 Marzo 2026", time: "21:00 CET", completed: false },
  { round: 7, circuit: "Interlagos", date: "9 Abril 2026", time: "21:00 CET", completed: false },
  { round: 8, circuit: "Monza", date: "23 Abril 2026", time: "21:00 CET", completed: false },
  { round: 9, circuit: "Le Mans", date: "7 Mayo 2026", time: "21:00 CET", completed: false },
  { round: 10, circuit: "Circuito de las Américas", date: "21 Mayo 2026", time: "21:00 CET", completed: false },
]

export const nextRace = races.find(race => !race.completed) || races[races.length - 1]

/** Redline TV – live stream (caster: dihondia) */
export const redlineTv = {
  name: "Redline TV",
  twitch: "https://www.twitch.tv/dihondia",
  youtube: "https://www.youtube.com/@dihondia/streams",
} as const
