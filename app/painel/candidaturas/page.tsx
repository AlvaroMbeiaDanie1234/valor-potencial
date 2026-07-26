import { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { requireUserPage } from "@/lib/session"
import { COMPANY } from "@/lib/constants"
import { Briefcase } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: `Candidaturas | ${COMPANY.name}`,
}

export default async function CandidaturasPage() {
  const user = await requireUserPage()

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-secondary/30 pb-20 pt-10">
        <div className="mx-auto w-full max-w-5xl px-5">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Briefcase className="size-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Candidaturas</h1>
              <p className="text-muted-foreground">
                Acompanhe o estado dos processos de recrutamento a que se candidatou.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center shadow-sm">
             <h3 className="text-lg font-medium">Nenhuma candidatura encontrada</h3>
             <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Ainda não submeteu candidaturas. Consulte as nossas oportunidades e candidate-se às vagas adequadas ao seu perfil.
             </p>
             <Link
               href="/vagas"
               className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
             >
               Explorar Vagas
             </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
