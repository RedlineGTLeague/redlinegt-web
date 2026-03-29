import Link from "next/link"
import Image from "next/image"

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
            <Link href="/" className="transition-colors hover:text-foreground">
              Inicio
            </Link>
            <Link href="/clasificacion" className="transition-colors hover:text-foreground">
              Clasificación
            </Link>
            <Link href="/calendario" className="transition-colors hover:text-foreground">
              Calendario
            </Link>
            <Link href="/reglamento" className="transition-colors hover:text-foreground">
              Reglamento
            </Link>
          </nav>
          
          <p className="text-sm text-muted-foreground">
            2026 Redline GT League
          </p>
        </div>
      </div>
    </footer>
  )
}
