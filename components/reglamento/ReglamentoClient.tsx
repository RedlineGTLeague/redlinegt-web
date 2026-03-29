'use client'

import { FileText, Flag, AlertTriangle, Settings, Users, MessageSquare, MessageCircle, Palette, Scale, Play, Trophy, Truck, Globe, List } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

function VideoEmbed({ url }: { url: string }) {
  return (
    <div className="video-embed my-4">
      <iframe
        src={url}
        width="560"
        height="315"
        allowFullScreen
        loading="lazy"
        className="w-full max-w-[560px] aspect-video rounded"
      />
    </div>
  )
}
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import type { Lang } from "@/lib/reglamento-server"

export const LANGUAGES_CLIENT = [
  { code: 'es', name: 'ES' },
  { code: 'pt', name: 'PT' },
  { code: 'ca', name: 'CA' },
]

export const SECTION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "1": FileText,
  "2": Flag,
  "3": Users,
  "4": Truck,
  "5": Play,
  "6": Settings,
  "7": Trophy,
  "8": AlertTriangle,
  "9": MessageSquare,
  "10": MessageCircle,
  "11": Palette,
  "12": Scale,
}

export const SECTION_TITLES_CLIENT: Record<Lang, Record<string, string>> = {
  es: {
    "1": "Disposiciones Generales",
    "2": "Categoría y Formato General",
    "3": "Elección de Modelo (Draft)",
    "4": "Inscripción de Equipo",
    "5": "Formato Deportivo",
    "6": "Configuración Técnica",
    "7": "Sistema de Puntuación",
    "8": "Sistema de Penalizaciones",
    "9": "Reportes y Reclamaciones",
    "10": "Gestión de Liga en Discord",
    "11": "Requisitos de Diseño",
    "12": "Disposiciones Finales",
  },
  pt: {
    "1": "Disposições Gerais",
    "2": "Categoria e Formato Geral",
    "3": "Escolha de Modelo (Draft)",
    "4": "Inscrição de Equipa",
    "5": "Formato Desportivo",
    "6": "Configuração Técnica",
    "7": "Sistema de Pontuação",
    "8": "Sistema de Penalizações",
    "9": "Relatórios e Reclamações",
    "10": "Gestão da Liga no Discord",
    "11": "Requisitos da Pintura",
    "12": "Disposições Finais",
  },
  ca: {
    "1": "Disposicions Generals",
    "2": "Categoria i Format General",
    "3": "Elecció de Model i Draft",
    "4": "Inscripció d'Equip",
    "5": "Format Esportiu",
    "6": "Configuració Tècnica",
    "7": "Sistema de Puntuació",
    "8": "Sistema de Penalitzacions",
    "9": "Reportes i Reclamacions",
    "10": "Gestió de Lliga a Discord",
    "11": "Requisits de Disseny",
    "12": "Disposicions Finals",
  },
}

interface RuleSectionProps {
  number: string
  title: string
  content: string
}

function RuleSection({ number, title, content }: RuleSectionProps) {
  const Icon = SECTION_ICONS[number] || FileText

  // Split content by video_embed tags to render them in place
  const parts = content.split(/(<video_embed url="[^"]+"><\/video_embed>)/g)

  return (
    <Card id={`seccion-${number}`} className="scroll-mt-24 border-[#2a2a2a] bg-[#181818]">
      <CardHeader className="border-b-2 border-[#e52222] pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e52222]/10">
            <Icon className="h-5 w-5 text-[#e52222]" />
          </div>
          <span className="font-oswald text-xl font-bold uppercase tracking-wide text-white">
            {number}. {title}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="chapter">
          {parts.map((part, i) => {
            const match = part.match(/<video_embed url="([^"]+)"><\/video_embed>/)
            if (match) {
              return (
                <div key={i} className="my-4">
                  <iframe
                    src={match[1]}
                    className="w-full aspect-video rounded"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              )
            }
            return <ReactMarkdown key={i} remarkPlugins={[remarkGfm]}>{part}</ReactMarkdown>
          })}
        </div>
      </CardContent>
    </Card>
  )
}

function IndexNav({ lang, onSelect }: { lang: Lang; onSelect?: () => void }) {
  const titles = SECTION_TITLES_CLIENT[lang]
  
  const handleClick = () => {
    if (onSelect) onSelect()
  }

  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-4 max-h-[70vh] overflow-y-auto">
      <div className="text-xs uppercase tracking-wider text-[#888] mb-3">Índice</div>
      <div className="space-y-1">
        {Object.entries(titles).map(([num, title]) => (
          <a
            key={num}
            href={`#seccion-${num}`}
            onClick={handleClick}
            className="block py-2 px-3 text-sm text-[#888] no-underline rounded hover:bg-[#e52222]/10 hover:text-white hover:border-l-2 hover:border-[#e52222] transition-all"
          >
            {num}. {title}
          </a>
        ))}
      </div>
    </div>
  )
}

interface ReglamentoClientProps {
  lang: Lang
  sections: Record<string, string>
}

export default function ReglamentoClient({ lang, sections }: ReglamentoClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentLang, setCurrentLang] = useState(lang)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showToc, setShowToc] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleLangChange = (newLang: Lang) => {
    setCurrentLang(newLang)
    const params = new URLSearchParams(searchParams.toString())
    params.set('lang', newLang)
    router.push(`/reglamento?${params.toString()}`, { scroll: false })
  }

  const titles = SECTION_TITLES_CLIENT[currentLang]

  return (
    <>
      <div className="flex justify-center gap-2 mb-8">
        {LANGUAGES_CLIENT.map((l) => (
          <Button
            key={l.code}
            variant={currentLang === l.code ? "default" : "outline"}
            size="sm"
            onClick={() => handleLangChange(l.code as Lang)}
            className={`font-bold tracking-wider ${
              currentLang === l.code 
                ? "bg-[#e52222] hover:bg-[#ff3b3b] text-white border-[#e52222]" 
                : "border-[#2a2a2a] text-[#888] hover:border-[#e52222] hover:text-white"
            }`}
          >
            {l.name}
          </Button>
        ))}
      </div>

      <div className="space-y-6 max-w-[750px] mx-auto">
        {/* TOC visible on desktop */}
        <div className="hidden md:block">
          <IndexNav lang={currentLang} />
        </div>

        {Object.entries(sections)
          .sort(([a], [b]) => parseInt(a) - parseInt(b))
          .map(([num, content]) => (
            <RuleSection
              key={num}
              number={num}
              title={titles[num] || `Sección ${num}`}
              content={content}
            />
          ))}
      </div>

      {/* Floating TOC Panel (mobile only) */}
      {showToc && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-[70]"
            onClick={() => setShowToc(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm z-[80]">
            <IndexNav lang={currentLang} onSelect={() => setShowToc(false)} />
          </div>
        </>
      )}

      {/* Floating TOC Toggle Button (mobile only, or when scrolled on desktop) */}
      {isMobile && (
        <button
          onClick={() => setShowToc(!showToc)}
          className={`fixed bottom-6 right-20 w-12 h-12 bg-[#181818] text-white border border-[#2a2a2a] rounded-full cursor-pointer flex items-center justify-center shadow-lg transition-all duration-300 hover:border-[#e52222] hover:text-[#e52222] z-[90] ${showToc ? 'border-[#e52222] text-[#e52222]' : ''}`}
          aria-label={showToc ? "Ocultar índice" : "Mostrar índice"}
        >
          <List className="h-5 w-5" />
        </button>
      )}

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 w-12 h-12 bg-[#e52222] text-white border-none rounded-full cursor-pointer flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-[#ff3b3b] z-[90] ${showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="Volver arriba"
      >
        &#8963;
      </button>
    </>
  )
}
