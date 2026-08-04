import { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { requireAdminPage } from "@/lib/session"
import { COMPANY } from "@/lib/constants"
import { BarChart, Users, Briefcase, FileText } from "lucide-react"
import { db } from "@/lib/db"
import { user, jobs, applications } from "@/lib/db/schema"
import { eq, sql } from "drizzle-orm"

export const metadata: Metadata = {
  title: `Estatísticas | Administração | ${COMPANY.name}`,
}

export default async function AdminEstatisticasPage() {
  await requireAdminPage()

  const [totalCandidatos] = await db.select({ count: sql<number>`cast(count(*) as integer)` }).from(user).where(eq(user.role, "candidate"))
  const [totalVagas] = await db.select({ count: sql<number>`cast(count(*) as integer)` }).from(jobs)
  const [vagasAbertas] = await db.select({ count: sql<number>`cast(count(*) as integer)` }).from(jobs).where(eq(jobs.status, "aberta"))
  const [totalCandidaturas] = await db.select({ count: sql<number>`cast(count(*) as integer)` }).from(applications)

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-secondary/30 pb-20 pt-10">
        <div className="mx-auto w-full max-w-5xl px-5">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <BarChart className="size-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Estatísticas e Visão Geral</h1>
              <p className="text-muted-foreground">
                Dados globais e relatórios da plataforma.
              </p>
            </div>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col gap-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="size-4" />
                <span className="text-sm font-medium">Total de Candidatos</span>
              </div>
              <div className="text-3xl font-bold text-foreground">
                {totalCandidatos?.count || 0}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col gap-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="size-4" />
                <span className="text-sm font-medium">Total de Vagas</span>
              </div>
              <div className="text-3xl font-bold text-foreground">
                {totalVagas?.count || 0}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <Briefcase className="size-4" />
                <span className="text-sm font-medium">Vagas Abertas</span>
              </div>
              <div className="text-3xl font-bold text-primary">
                {vagasAbertas?.count || 0}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col gap-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="size-4" />
                <span className="text-sm font-medium">Candidaturas Submetidas</span>
              </div>
              <div className="text-3xl font-bold text-foreground">
                {totalCandidaturas?.count || 0}
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
