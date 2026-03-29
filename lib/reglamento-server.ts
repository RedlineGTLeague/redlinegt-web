import fs from 'fs'
import path from 'path'

export const LANGUAGES = [
  { code: 'es', name: 'Español' },
  { code: 'pt', name: 'Português' },
  { code: 'ca', name: 'Català' },
] as const

export type Lang = typeof LANGUAGES[number]['code']

export const SECTION_TITLES: Record<Lang, Record<string, string>> = {
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

function getRulebookPath(lang: Lang): string {
  return path.join(process.cwd(), 'redlinegt-rulebook', 'content', 'rules', lang)
}

function cleanMarkdown(content: string): string {
  let result = content
  
  // Strip YAML frontmatter (---...---)
  result = result.replace(/^---[\s\S]*?---[\r\n]*/, '')
  
  // Remove the first h1 heading and following content until first real paragraph
  result = result.replace(/^#\s+\d+\.\s+[^\r\n]*[\r\n]+/, '')
  
  // Extract images from divs and convert to markdown image syntax
  result = result.replace(/<div[^>]*>\s*<img src="([^"]+)"[^>]*>\s*<\/div>/gi, (_, src) => {
    const fixedSrc = src.replace(/^media\//, '/media/')
    return `\n![image](${fixedSrc})\n`
  })
  
  // Extract YouTube iframes from divs and convert to responsive video embed
  // Match iframe tag attributes first, then any content between opening and closing tags
  result = result.replace(/<div[^>]*>\s*<iframe([^>]*)>([\s\S]*?)<\/iframe>\s*<\/div>/gi, (_, attrs, inner) => {
    const srcMatch = attrs.match(/src="([^"]+)"/) || inner.match(/src="([^"]+)"/)
    if (srcMatch) {
      return `\n\n<video_embed url="${srcMatch[1]}"></video_embed>\n\n`
    }
    return ''
  })
  
  // Remove remaining div/img/iframe blocks
  result = result.replace(/<div[^>]*>[\s\S]*?<\/div>[\r\n]*/gi, '\n')
  result = result.replace(/<iframe[\s\S]*?<\/iframe>[\r\n]*/gi, '')
  result = result.replace(/<img[^>]+>[\r\n]*/gi, '')
  
  // Convert literal bullet points (•) to proper markdown lists
  result = result.replace(/^[\t ]*• /gm, '- ')
  
  // Normalize newlines: preserve paragraph breaks (blank lines) but clean up
  result = result.replace(/\r\n/g, '\n')  // Normalize line endings
  result = result.replace(/\n{3,}/g, '\n\n')  // Max 2 newlines
  
  // Remove leading/trailing whitespace
  result = result.trim()
  
  return result
}

export function getRulebookSections(lang: Lang): Record<string, string> {
  const rulebookPath = getRulebookPath(lang)
  const sections: Record<string, string> = {}

  for (let i = 1; i <= 12; i++) {
    const filePath = path.join(rulebookPath, `${i}.md`)
    try {
      const content = fs.readFileSync(filePath, 'utf-8')
      sections[String(i)] = cleanMarkdown(content)
    } catch {
      sections[String(i)] = ''
    }
  }

  return sections
}
