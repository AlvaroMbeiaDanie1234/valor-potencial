import { Metadata } from "next"
import Link from "next/link"
import { Briefcase, ChevronRight, FileText, UserCircle } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { COMPANY } from "@/lib/constants"
import { requireUserPage } from "@/lib/session"
import { db } from "@/lib/db"
import { candidateProfiles } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export const metadata: Metadata = {
  title: `Painel do Candidato | ${COMPANY.name}`,
}

export default async function PainelPage() {
  const user = await requireUserPage()
  
  const existingProfile = await db.select().from(candidateProfiles).where(eq(candidateProfiles.userId, user.id))
  const profile = existingProfile[0]

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-secondary/30 pb-20 pt-10">
        <div className="mx-auto w-full max-w-5xl px-5">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight">
              Olá, {user.name}
            </h1>
            <p className="mt-2 text-muted-foreground">
              Bem-vindo ao seu painel de candidato da {COMPANY.name}.
            </p>
          </div>

          {profile?.interviewScheduled && (
            <div className="mb-8 rounded-xl border border-emerald-500/30 bg-emerald-50 p-6 dark:bg-emerald-500/10 flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                <Briefcase className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400">Parabéns! Foi selecionado(a) para uma Entrevista.</h3>
                <p className="mt-1 text-emerald-600/90 dark:text-emerald-400/90">
                  O seu perfil destacou-se e a nossa equipa gostaria de conversar consigo. 
                  Esteja atento(a) ao seu telefone e email cadastrados no perfil, pois entraremos em contacto em breve com os detalhes da marcação.
                </p>
              </div>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-3">
            {/* Perfil */}
            <Link
              href="/painel/perfil"
              className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div>
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UserCircle className="size-6" />
                </div>
                <h2 className="text-xl font-semibold">O Meu Perfil</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Complete ou atualize as suas informações pessoais e
                  profissionais.
                </p>
              </div>
              <div className="mt-6 flex items-center text-sm font-medium text-primary">
                Gerir perfil
                <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Candidaturas */}
            <Link
              href="/painel/candidaturas"
              className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div>
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Briefcase className="size-6" />
                </div>
                <h2 className="text-xl font-semibold">Candidaturas</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Acompanhe o estado dos processos de recrutamento a que se
                  candidatou.
                </p>
              </div>
              <div className="mt-6 flex items-center text-sm font-medium text-primary">
                Ver estado
                <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Documentos */}
            <Link
              href="/painel/documentos"
              className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div>
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FileText className="size-6" />
                </div>
                <h2 className="text-xl font-semibold">Documentos</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Faça a gestão do seu CV, certificados e outra documentação
                  exigida.
                </p>
              </div>
              <div className="mt-6 flex items-center text-sm font-medium text-primary">
                Gerir documentos
                <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>

          <div className="mt-12 rounded-xl border border-border bg-card p-8 text-center shadow-sm">
            <h3 className="text-lg font-semibold tracking-tight">
              Procura a sua próxima oportunidade?
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Temos novas vagas publicadas regularmente pelas principais operadoras e empresas de serviços do país.
            </p>
            <Link
              href="/vagas"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Explorar vagas abertas
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
