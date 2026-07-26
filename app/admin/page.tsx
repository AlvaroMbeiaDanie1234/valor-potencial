import { Metadata } from "next"
import Link from "next/link"
import { Users, Briefcase, BarChart, ChevronRight } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { COMPANY } from "@/lib/constants"
import { requireAdminPage } from "@/lib/session"

export const metadata: Metadata = {
  title: `Administração | ${COMPANY.name}`,
}

export default async function AdminPage() {
  const user = await requireAdminPage()

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-secondary/30 pb-20 pt-10">
        <div className="mx-auto w-full max-w-5xl px-5">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight">
              Painel de Administração
            </h1>
            <p className="mt-2 text-muted-foreground">
              Bem-vindo, {user.name}. Faça a gestão de vagas, candidaturas e
              utilizadores da plataforma.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Gestão de Vagas */}
            <Link
              href="/admin/vagas"
              className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div>
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Briefcase className="size-6" />
                </div>
                <h2 className="text-xl font-semibold">Gestão de Vagas</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Publique, edite e acompanhe todas as vagas ativas e
                  encerradas.
                </p>
              </div>
              <div className="mt-6 flex items-center text-sm font-medium text-primary">
                Gerir vagas
                <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Candidatos */}
            <Link
              href="/admin/candidatos"
              className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div>
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Users className="size-6" />
                </div>
                <h2 className="text-xl font-semibold">Candidatos</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Analise perfis, consulte CVs e atualize o estado dos
                  candidatos.
                </p>
              </div>
              <div className="mt-6 flex items-center text-sm font-medium text-primary">
                Ver candidatos
                <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Estatísticas */}
            <Link
              href="/admin/estatisticas"
              className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div>
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BarChart className="size-6" />
                </div>
                <h2 className="text-xl font-semibold">Estatísticas</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Consulte relatórios e dados globais sobre o recrutamento.
                </p>
              </div>
              <div className="mt-6 flex items-center text-sm font-medium text-primary">
                Ver relatórios
                <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
