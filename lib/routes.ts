import { Trophy, Calendar, FileText, AlertTriangle, Flag } from "lucide-react"

export const navItems = [
  { href: "/", label: "Inicio", icon: Flag, enabled: true },
  { href: "/clasificacion", label: "Clasificación", icon: Trophy, enabled: true },
  { href: "/calendario", label: "Calendario", icon: Calendar, enabled: true },
  { href: "/reglamento", label: "Reglamento", icon: FileText, enabled: true },
  { href: "/reportar-incidente", label: "Reportar Incidente", icon: AlertTriangle, enabled: false },
]

export function isRouteEnabled(pathname: string): boolean {
  const item = navItems.find((item) => item.href === pathname)
  return item?.enabled !== false
}
