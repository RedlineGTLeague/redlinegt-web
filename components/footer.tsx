import Link from "next/link"
import Image from "next/image"

const footerLinks = [
  { href: "/", label: "Inicio", enabled: true },
  { href: "/clasificacion", label: "Clasificación", enabled: true },
  { href: "/calendario", label: "Calendario", enabled: true },
  { href: "/reglamento", label: "Reglamento", enabled: true },
]

// Disable items by setting enabled: false

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/redline_logo_iso1_bicolor_white_bg_gt_plain_whiteline_v2.svg"
              alt="Redline GT League"
              width={280}
              height={280}
              className="w-[280px] h-auto"
            />
          </Link>
          
          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            {footerLinks.filter(link => link.enabled !== false).map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
          
          <p className="text-sm text-muted-foreground">
            2026 Redline GT League
          </p>
        </div>
      </div>
    </footer>
  )
}
