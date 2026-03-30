import Link from "next/link"
import Image from "next/image"
import { Trophy, Calendar, FileText, AlertTriangle, ChevronRight, Clock, MapPin, Tv, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { standings, getStandingsWithTeams, currentTeams, pastTeams, nextRace, redlineTv, currentSeason, races } from "@/lib/data"
import { TeamTable } from "@/components/team-table"
import { TeamsSection } from "@/components/teams-section"

export default function HomePage() {
  const hasUpcomingRace = races.some(race => !race.completed)
  const standingsWithTeams = getStandingsWithTeams(standings)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <div className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${
              currentSeason.completed 
                ? 'border-yellow-500/50 bg-yellow-500/10 text-yellow-500' 
                : 'border-primary/30 bg-primary/10 text-primary'
            }`}>
              {currentSeason.completed ? (
                <>
                  <Crown className="h-4 w-4" />
                  Temporada {currentSeason.number} completada
                </>
              ) : (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                  </span>
                  Temporada {currentSeason.number} en curso
                </>
              )}
            </div>
            
            <Image
              src="/images/redlinegt-logo-full.svg"
              alt="Redline GT League"
              width={600}
              height={180}
              className="mx-auto h-28 w-auto md:h-36 lg:h-48"
              priority
            />
            
            <p className="mx-auto mt-6 max-w-2xl text-base text-[#b0b0b0] md:text-lg">
              Campeonato competitivo de Gran Turismo 7. Donde la velocidad, la estrategia y la habilidad se unen para coronar al mejor piloto virtual.
            </p>
            
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/clasificacion">
                  <Trophy className="h-5 w-5" />
                  Ver Clasificación
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/calendario">
                  <Calendar className="h-5 w-5" />
                  Calendario
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {currentSeason.completed && standingsWithTeams[0] && (
        <section className="border-y border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-yellow-500/10 py-10">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 text-yellow-500">
              <Crown className="h-5 w-5" />
              <span className="font-oswald text-sm font-bold uppercase tracking-wide">Campeón de Temporada {currentSeason.number}</span>
              <Crown className="h-5 w-5" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-4">
              <div className="h-3 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: standingsWithTeams[0].color }} />
              <span className="font-oswald text-2xl font-bold text-yellow-500 md:text-3xl">{standingsWithTeams[0].acronym}</span>
              <span className="text-amber-200/80 md:text-2xl">— {standingsWithTeams[0].name}</span>
            </div>
            <p className="mt-1 font-bold text-yellow-500">{standingsWithTeams[0].points} puntos</p>
          </div>
        </section>
      )}

      {hasUpcomingRace && (
        <section className="border-y border-border/80 bg-card/60 py-12 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
              <div className="text-center lg:text-left">
                <p className="text-sm font-medium uppercase tracking-wider text-primary">Próxima Carrera</p>
                <h2 className="font-oswald mt-2 text-3xl font-bold uppercase text-foreground md:text-4xl">
                  Ronda {nextRace.round}: {nextRace.circuit}
                </h2>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>{nextRace.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>{nextRace.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Gran Turismo 7</span>
                </div>
              </div>
            </div>
            {/* Redline TV – Watch live stream */}
            <div className="mt-8 flex flex-col items-center gap-4 border-t border-border pt-8">
              <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-primary">
                <Tv className="h-5 w-5" />
                {redlineTv.name}
              </p>
              <p className="text-center text-sm text-muted-foreground">
                Ver las carreras en directo con nuestro caster
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button asChild variant="default" size="lg" className="gap-2">
                  <a href={redlineTv.twitch} target="_blank" rel="noopener noreferrer">
                    <Tv className="h-5 w-5" />
                    Ver en Twitch
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <a href={redlineTv.youtube} target="_blank" rel="noopener noreferrer">
                    <Tv className="h-5 w-5" />
                    Ver en YouTube
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {/* Team Standings */}
          <Card className="mx-auto max-w-2xl border-border/80 bg-card/70 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-oswald text-xl font-bold uppercase tracking-wide">
                Clasificación de Equipos
              </CardTitle>
              <Link href="/clasificacion" className="flex items-center gap-1 text-sm text-primary hover:underline">
                Ver todo <ChevronRight className="h-4 w-4" />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <TeamTable standings={standingsWithTeams} showHeader={false} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Teams on the Grid */}
      <TeamsSection teams={currentTeams} extraTeams={pastTeams} />

      {/* Quick Links Section */}
      <section className="border-t border-border/80 bg-card/60 py-16 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="font-oswald mb-10 text-center text-2xl font-bold uppercase tracking-wide text-foreground md:text-3xl">
            Acceso Rápido
          </h2>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Link href="/clasificacion" className="group">
              <Card className="h-full border-border/80 bg-card/50 backdrop-blur-sm transition-all hover:border-primary hover:bg-card/70">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <Trophy className="mb-3 h-10 w-10 text-primary transition-transform group-hover:scale-110" />
                  <span className="font-medium text-foreground">Clasificación</span>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/calendario" className="group">
              <Card className="h-full border-border/80 bg-card/50 backdrop-blur-sm transition-all hover:border-primary hover:bg-card/70">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <Calendar className="mb-3 h-10 w-10 text-primary transition-transform group-hover:scale-110" />
                  <span className="font-medium text-foreground">Calendario</span>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/reglamento" className="group">
              <Card className="h-full border-border/80 bg-card/50 backdrop-blur-sm transition-all hover:border-primary hover:bg-card/70">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <FileText className="mb-3 h-10 w-10 text-primary transition-transform group-hover:scale-110" />
                  <span className="font-medium text-foreground">Reglamento</span>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/reportar-incidente" className="group">
              <Card className="h-full border-border/80 bg-card/50 backdrop-blur-sm transition-all hover:border-primary hover:bg-card/70">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <AlertTriangle className="mb-3 h-10 w-10 text-primary transition-transform group-hover:scale-110" />
                  <span className="font-medium text-foreground">Reportar Incidente</span>
                </CardContent>
              </Card>
            </Link>
            
            <a href="https://discord.gg/bybcwHPQ3" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="h-full border-border/80 bg-card/50 backdrop-blur-sm transition-all hover:border-primary hover:bg-card/70">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <svg className="mb-3 h-10 w-10 text-primary transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>
                  <span className="font-medium text-foreground">Discord</span>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
