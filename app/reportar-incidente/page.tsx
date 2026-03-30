"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AlertTriangle, Upload, Info, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { drivers, races, teams } from "@/lib/data"
import { isRouteEnabled } from "@/lib/routes"

export default function ReportarIncidentePage() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!isRouteEnabled("/reportar-incidente")) {
      router.replace("/")
    }
  }, [router])

  if (!isRouteEnabled("/reportar-incidente")) {
    return null
  }
  const [formData, setFormData] = useState({
    equipoReporta: "",
    pilotoReportado: "",
    ronda: "",
    vuelta: "",
    descripcion: "",
    videoUrl: "",
    timestamp: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the data to an API
    console.log("Form submitted:", formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-2xl border-border bg-card">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h2 className="font-oswald text-2xl font-bold uppercase text-foreground">
                Reporte Enviado
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Tu reporte de incidente ha sido recibido correctamente. Los comisarios lo revisarán y emitirán un veredicto en un plazo de 48 horas.
              </p>
              <Button 
                onClick={() => {
                  setSubmitted(false)
                  setFormData({
                    equipoReporta: "",
                    pilotoReportado: "",
                    ronda: "",
                    vuelta: "",
                    descripcion: "",
                    videoUrl: "",
                    timestamp: "",
                  })
                }}
                className="mt-8"
              >
                Enviar Otro Reporte
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="font-oswald text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Reportar Incidente
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#b0b0b0]">
            Utiliza este formulario para reportar incidentes ocurridos durante las carreras de la liga.
          </p>
        </div>

        {/* Warning Notice */}
        <div className="mx-auto mb-8 max-w-3xl">
          <div className="flex items-start gap-4 rounded-lg border border-primary/30 bg-primary/5 p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">Importante: Evidencia de vídeo obligatoria</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Para que un reporte sea válido, debes incluir un enlace a un vídeo (YouTube, Streamable, etc.) que muestre claramente el incidente.
                Los reportes sin evidencia de vídeo serán descartados automáticamente.
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="mx-auto max-w-3xl border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <AlertTriangle className="h-5 w-5 text-primary" />
              </div>
              <span className="font-oswald text-xl font-bold uppercase tracking-wide">
                Formulario de Reporte
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Team reporting / Pilot reported */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="equipoReporta">Equipo que reporta *</Label>
                  <Select 
                    value={formData.equipoReporta} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, equipoReporta: value }))}
                    required
                  >
                    <SelectTrigger id="equipoReporta" className="w-full">
                      <SelectValue placeholder="Selecciona tu equipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.name} value={team.name}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pilotoReportado">Piloto reportado *</Label>
                  <Select 
                    value={formData.pilotoReportado} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, pilotoReportado: value }))}
                    required
                  >
                    <SelectTrigger id="pilotoReportado" className="w-full">
                      <SelectValue placeholder="Selecciona el piloto" />
                    </SelectTrigger>
                    <SelectContent>
                      {drivers.map((driver) => (
                        <SelectItem key={driver.name} value={driver.name}>
                          {driver.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Race and Lap */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ronda">Ronda / Carrera *</Label>
                  <Select 
                    value={formData.ronda} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, ronda: value }))}
                    required
                  >
                    <SelectTrigger id="ronda" className="w-full">
                      <SelectValue placeholder="Selecciona la ronda" />
                    </SelectTrigger>
                    <SelectContent>
                      {races.filter(r => r.completed).map((race) => (
                        <SelectItem key={race.round} value={`R${race.round}: ${race.circuit}`}>
                          R{race.round}: {race.circuit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vuelta">Vuelta *</Label>
                  <Input
                    id="vuelta"
                    type="number"
                    min="1"
                    placeholder="Ej: 15"
                    value={formData.vuelta}
                    onChange={(e) => setFormData(prev => ({ ...prev, vuelta: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción del incidente *</Label>
                <Textarea
                  id="descripcion"
                  placeholder="Describe detalladamente lo que ocurrió, incluyendo la curva o zona del circuito, las circunstancias previas al incidente y las consecuencias..."
                  className="min-h-32 resize-y"
                  value={formData.descripcion}
                  onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
                  required
                />
              </div>

              {/* Video link (YouTube, etc.) */}
              <div className="space-y-2">
                <Label htmlFor="videoUrl" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Enlace al vídeo del incidente *
                </Label>
                <Input
                  id="videoUrl"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=... o enlace de Streamable, etc."
                  value={formData.videoUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Sube el vídeo a YouTube (o Streamable, etc.) y pega aquí el enlace.
                </p>
              </div>

              {/* Timestamp */}
              <div className="space-y-2">
                <Label htmlFor="timestamp">Timestamp en el vídeo (opcional)</Label>
                <Input
                  id="timestamp"
                  type="text"
                  placeholder="Ej: 1:23 o 0:45"
                  value={formData.timestamp}
                  onChange={(e) => setFormData(prev => ({ ...prev, timestamp: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground">
                  Indica el momento exacto del vídeo donde ocurre el incidente.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col gap-4 border-t border-border pt-6">
                <p className="text-sm text-muted-foreground">
                  Al enviar este formulario, confirmas que la información proporcionada es veraz y que tienes evidencia de vídeo del incidente.
                </p>
                <Button type="submit" size="lg" className="w-full gap-2 sm:w-auto">
                  <AlertTriangle className="h-4 w-4" />
                  Enviar Reporte
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
