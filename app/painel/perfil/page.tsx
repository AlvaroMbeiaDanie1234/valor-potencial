import { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { requireUserPage } from "@/lib/session"
import { COMPANY } from "@/lib/constants"
import { UserCircle } from "lucide-react"
import { PerfilForm } from "@/components/perfil-form"
import { db } from "@/lib/db"
import { candidateProfiles } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export const metadata: Metadata = {
  title: `Perfil | ${COMPANY.name}`,
}

export default async function PerfilPage() {
  const user = await requireUserPage()
  
  const existingProfile = await db.select().from(candidateProfiles).where(eq(candidateProfiles.userId, user.id))
  const profile = existingProfile[0]

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-secondary/30 pb-20 pt-10">
        <div className="mx-auto w-full max-w-5xl px-5 text-center mb-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UserCircle className="size-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">O Meu Perfil</h1>
              <p className="text-muted-foreground mt-2">
                Atualize as suas informações pessoais e profissionais.
              </p>
            </div>
          </div>
        </div>

        {profile?.verificationStatus === "pendente_verificacao" ? (
          <div className="mx-auto max-w-2xl text-center p-12 border rounded-xl bg-card">
            <div className="inline-flex size-12 items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-4">
              <UserCircle className="size-6" />
            </div>
            <h2 className="text-xl font-bold">Perfil em Análise</h2>
            <p className="text-muted-foreground mt-2">
              O seu perfil e documentos estão neste momento a ser validados pela nossa equipa.
              Por favor, aguarde a aprovação para poder candidatar-se às vagas.
            </p>
          </div>
        ) : profile?.verificationStatus === "verificado" ? (
          <div className="space-y-6 mx-auto max-w-2xl">
            {profile.interviewScheduled && (
              <div className="p-6 border border-emerald-500/30 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-center">
                <div className="inline-flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4 dark:bg-emerald-500/20 dark:text-emerald-400">
                  <UserCircle className="size-6" />
                </div>
                <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">Parabéns! Foi selecionado(a) para Entrevista</h2>
                <p className="text-emerald-600/90 dark:text-emerald-400/90 mt-2">
                  A nossa equipa de recrutamento analisou o seu perfil e selecionou-o(a) para uma entrevista presencial/online. 
                  Fique atento(a) ao seu telemóvel e email, iremos contactá-lo(a) muito em breve com os detalhes.
                </p>
              </div>
            )}
            <div className="text-center p-12 border border-primary/20 rounded-xl bg-primary/5">
              <div className="inline-flex size-12 items-center justify-center rounded-full bg-primary/20 text-primary mb-4">
                <UserCircle className="size-6" />
              </div>
              <h2 className="text-xl font-bold text-primary">Perfil Verificado</h2>
              <p className="text-muted-foreground mt-2">
                Os seus dados estão verificados! Está pronto para se candidatar às nossas ofertas de emprego.
              </p>
            </div>
          </div>
        ) : (
          <PerfilForm />
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
