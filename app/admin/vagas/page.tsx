import { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { requireAdminPage } from "@/lib/session"
import { COMPANY } from "@/lib/constants"
import { Briefcase } from "lucide-react"

export const metadata: Metadata = {
  title: `Gestão de Vagas | Administração | ${COMPANY.name}`,
}

export default async function AdminVagasPage() {
  await requireAdminPage()

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
              <h1 className="text-3xl font-bold tracking-tight">Gestão de Vagas</h1>
              <p className="text-muted-foreground">
                Área reservada para a publicação e gestão de oportunidades de emprego.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center shadow-sm">
            <h2 className="text-xl font-semibold">Módulo em Desenvolvimento</h2>
            <p className="mt-2 text-muted-foreground">
              A listagem e formulário de criação de vagas estarão disponíveis em breve.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
