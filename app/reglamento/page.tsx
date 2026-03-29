import { Suspense } from 'react'
import { getRulebookSections, LANGUAGES, type Lang } from '@/lib/reglamento-server'
import ReglamentoClient from '@/components/reglamento/ReglamentoClient'

interface PageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function ReglamentoPage({ searchParams }: PageProps) {
  const params = await searchParams
  const lang = (params.lang as Lang) || 'es'
  
  if (!LANGUAGES.some(l => l.code === lang)) {
    return { redirect: { destination: '/reglamento?lang=es', permanent: false } }
  }

  const sections = getRulebookSections(lang)

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="font-oswald text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Reglamento
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#b0b0b0]">
            Normativa oficial de la liga Redline GT. Todos los participantes deben conocer y respetar estas reglas.
          </p>
        </div>

        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        }>
          <ReglamentoClient lang={lang} sections={sections} />
        </Suspense>
      </div>
    </div>
  )
}
