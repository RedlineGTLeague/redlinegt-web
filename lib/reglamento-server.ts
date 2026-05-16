import fs from 'fs'
import path from 'path'

export const LANGUAGES = [
  { code: 'es', name: 'Español' },
  { code: 'pt', name: 'Português' },
  { code: 'ca', name: 'Català' },
] as const

export type Lang = typeof LANGUAGES[number]['code']

export interface SectionData {
  title: string
  content: string
}

function getRulebookPath(lang: Lang): string {
  return path.join(process.cwd(), 'redlinegt-rulebook', 'content', 'rules', lang)
}

function parseFrontmatter(content: string): { title: string; body: string } {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/)
  if (match) {
    const yaml = match[1]
    const titleMatch = yaml.match(/^title:\s*(.+)$/m)
    const title = titleMatch ? titleMatch[1].replace(/^['"]|['"]$/g, '') : ''
    return { title, body: content.slice(match[0].length) }
  }
  return { title: '', body: content }
}

function cleanMarkdown(content: string): string {
  let result = content
  
  // Remove the first h1 heading
  result = result.replace(/^#\s+[^\r\n]*[\r\n]+/, '')
  
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

export function getRulebookSections(lang: Lang): Record<string, SectionData> {
  const rulebookPath = getRulebookPath(lang)
  const sections: Record<string, SectionData> = {}

  const files = fs.readdirSync(rulebookPath)
  const mdFiles = files
    .filter(f => f.endsWith('.md') && f !== 'index.md')
    .sort((a, b) => {
      const aKey = a.replace('.md', '')
      const bKey = b.replace('.md', '')
      const aIsNum = /^\d+$/.test(aKey)
      const bIsNum = /^\d+$/.test(bKey)

      if (aIsNum && bIsNum) return parseInt(aKey) - parseInt(bKey)
      if (aIsNum && !bIsNum) return -1
      if (!aIsNum && bIsNum) return 1
      return aKey.localeCompare(bKey)
    })

  for (const file of mdFiles) {
    const key = file.replace('.md', '')
    const filePath = path.join(rulebookPath, file)
    try {
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { title, body } = parseFrontmatter(raw)
      sections[key] = { title, content: cleanMarkdown(body) }
    } catch {
      sections[key] = { title: '', content: '' }
    }
  }

  return sections
}
