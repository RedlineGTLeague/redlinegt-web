import { FileText, Flag, Award, AlertTriangle, FileWarning, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ReglamentoPage() {
  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="font-oswald text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Reglamento
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Normativa oficial de la liga Redline GT. Todos los participantes deben conocer y respetar estas reglas.
          </p>
        </div>

        {/* Table of Contents */}
        <Card className="mb-8 border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <span className="font-oswald text-xl font-bold uppercase tracking-wide">
                Índice
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <a href="#formato" className="flex items-center gap-2 rounded-lg bg-secondary/50 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                <Flag className="h-4 w-4 text-primary" />
                Formato Deportivo
              </a>
              <a href="#puntuacion" className="flex items-center gap-2 rounded-lg bg-secondary/50 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                <Award className="h-4 w-4 text-primary" />
                Sistema de Puntuación
              </a>
              <a href="#penalizaciones" className="flex items-center gap-2 rounded-lg bg-secondary/50 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                <AlertTriangle className="h-4 w-4 text-primary" />
                Sistema de Penalizaciones
              </a>
              <a href="#reportes" className="flex items-center gap-2 rounded-lg bg-secondary/50 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                <FileWarning className="h-4 w-4 text-primary" />
                Procedimiento de Reportes
              </a>
            </nav>
          </CardContent>
        </Card>

        {/* Regulation Sections */}
        <div className="space-y-8">
          {/* Formato Deportivo */}
          <Card id="formato" className="scroll-mt-24 border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Flag className="h-5 w-5 text-primary" />
                </div>
                <span className="font-oswald text-2xl font-bold uppercase tracking-wide">
                  Formato Deportivo
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <div className="space-y-6 text-foreground">
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">Estructura del Campeonato</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>La temporada consta de 10 rondas distribuidas a lo largo del calendario.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>Cada ronda incluye una sesión de clasificación y una carrera principal.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>Las carreras se celebran en diferentes circuitos del juego Gran Turismo 7.</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">Requisitos de Participación</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>Todos los participantes deben estar registrados en el servidor de Discord oficial.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>Es obligatorio utilizar los ajustes de vehículo establecidos por la organización.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>Los pilotos deben conectarse al lobby al menos 15 minutos antes de la clasificación.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">Duración de las Carreras</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>Clasificación: 15 minutos de sesión libre para marcar el mejor tiempo.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>Carrera: Variable según el circuito, generalmente entre 20-30 vueltas.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sistema de Puntuación */}
          <Card id="puntuacion" className="scroll-mt-24 border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <span className="font-oswald text-2xl font-bold uppercase tracking-wide">
                  Sistema de Puntuación
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-foreground">Puntos por Posición en Carrera</h3>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                    {[
                      { pos: "1º", pts: 25 },
                      { pos: "2º", pts: 18 },
                      { pos: "3º", pts: 15 },
                      { pos: "4º", pts: 12 },
                      { pos: "5º", pts: 10 },
                      { pos: "6º", pts: 8 },
                      { pos: "7º", pts: 6 },
                      { pos: "8º", pts: 4 },
                      { pos: "9º", pts: 2 },
                      { pos: "10º", pts: 1 },
                    ].map((item) => (
                      <div key={item.pos} className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
                        <span className="font-medium text-foreground">{item.pos}</span>
                        <span className="font-bold text-primary">{item.pts} pts</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <h3 className="mb-3 text-lg font-semibold text-foreground">Puntos Adicionales</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span><strong className="text-foreground">Pole Position:</strong> +3 puntos al piloto que consiga la pole en clasificación.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span><strong className="text-foreground">Vuelta Rápida:</strong> +1 punto al piloto que marque la vuelta más rápida de la carrera (debe terminar en el Top 10).</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sistema de Penalizaciones */}
          <Card id="penalizaciones" className="scroll-mt-24 border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
                <span className="font-oswald text-2xl font-bold uppercase tracking-wide">
                  Sistema de Penalizaciones
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-foreground">Tipos de Infracciones</h3>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-border bg-secondary/50 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-semibold text-foreground">Infracción Leve</span>
                        <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-500">Aviso</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Contactos menores sin consecuencias significativas, salidas de pista leves que no afecten a otros pilotos.</p>
                    </div>
                    
                    <div className="rounded-lg border border-border bg-secondary/50 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-semibold text-foreground">Infracción Media</span>
                        <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs font-medium text-orange-500">-5 puntos</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Contactos que causen pérdida de posiciones, maniobras peligrosas, ignorar banderas azules repetidamente.</p>
                    </div>
                    
                    <div className="rounded-lg border border-border bg-secondary/50 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-semibold text-foreground">Infracción Grave</span>
                        <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">-15 puntos o Descalificación</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Contactos deliberados, conducta antideportiva, accidentes que causen abandono de otros pilotos.</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Sistema de Acumulación</h3>
                  <p className="text-muted-foreground">
                    3 avisos equivalen a una infracción media. 3 infracciones medias en una temporada resultan en una carrera de suspensión.
                    Las infracciones graves pueden resultar en expulsión inmediata de la liga.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Procedimiento de Reportes */}
          <Card id="reportes" className="scroll-mt-24 border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileWarning className="h-5 w-5 text-primary" />
                </div>
                <span className="font-oswald text-2xl font-bold uppercase tracking-wide">
                  Procedimiento de Reportes
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">Cómo Reportar un Incidente</h3>
                  <ol className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">1</span>
                      <span className="text-muted-foreground">Accede al formulario de reporte de incidentes en esta web.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">2</span>
                      <span className="text-muted-foreground">Proporciona toda la información solicitada: ronda, vuelta, pilotos involucrados.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">3</span>
                      <span className="text-muted-foreground">Adjunta el vídeo del incidente (obligatorio para que el reporte sea válido).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">4</span>
                      <span className="text-muted-foreground">Los comisarios revisarán el caso y emitirán un veredicto en un plazo de 48 horas.</span>
                    </li>
                  </ol>
                </div>

                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Plazo de Presentación</h3>
                  <p className="text-muted-foreground">
                    Los reportes deben presentarse dentro de las 24 horas posteriores a la finalización de la carrera.
                    Reportes fuera de plazo no serán considerados salvo circunstancias excepcionales.
                  </p>
                </div>

                <div className="flex justify-center">
                  <Button asChild size="lg" className="gap-2">
                    <Link href="/reportar-incidente">
                      <FileWarning className="h-5 w-5" />
                      Reportar Incidente
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
