import { Suspense } from "react"
import { ClasificacionContent } from "./clasificacion-content"
import { isRouteEnabled } from "@/lib/routes"

export default function ClasificacionPage() {
  if (!isRouteEnabled("/clasificacion")) {
    return null
  }

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ClasificacionContent />
    </Suspense>
  )
}