import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { COMPANY } from "@/lib/constants"
import { getJobBySlug } from "@/lib/queries/jobs"
import { ApplyButton } from "@/components/apply-button"
import { Button } from "@/components/ui/button"
import { ChevronLeft, MapPin, Briefcase, CalendarClock, Users, FileText } from "lucide-react"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug)
  if (!job) return { title: `Vaga não encontrada | ${COMPANY.name}` }
  
  return {
    title: `${job.title} | ${COMPANY.name}`,
    description: job.summary,
  }
}

export default async function VagaDetalhePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug)

  if (!job) {
    notFound()
  }

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-secondary/30 pb-20 pt-10">
        <div className="mx-auto w-full max-w-4xl px-5 space-y-8">
          
          <div>
            <Link href="/vagas" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6">
              <ChevronLeft className="mr-1 size-4" />
              Voltar para Vagas
            </Link>
            
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {job.category}
              </span>
              {job.featured && (
                <span className="inline-flex items-center rounded-full bg-accent/20 px-3 py-1 text-sm font-semibold text-accent-foreground">
                  Destaque
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{job.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{job.summary}</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-border">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background border">
                <MapPin className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Localização</p>
                <p className="font-medium">{job.location}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background border">
                <Briefcase className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Contrato</p>
                <p className="font-medium">{job.contractType}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background border">
                <Users className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Vagas</p>
                <p className="font-medium">{job.vacancies} disponíveis</p>
              </div>
            </div>

            {job.salaryRange && (
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background border">
                  <FileText className="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Salário</p>
                  <p className="font-medium">{job.salaryRange}</p>
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-10 pt-4">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Descrição da Função</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {job.description}
                </div>
              </section>

              {job.requirements && (
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Requisitos</h2>
                  <div className="prose prose-gray dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {job.requirements}
                  </div>
                </section>
              )}

              {job.benefits && (
                <section>
                  <h2 className="text-2xl font-semibold mb-4">O que oferecemos</h2>
                  <div className="prose prose-gray dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {job.benefits}
                  </div>
                </section>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border bg-card p-6 shadow-sm sticky top-24">
                <h3 className="font-semibold text-lg mb-2">Interessado nesta vaga?</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Certifique-se de que o seu perfil está verificado e contém toda a documentação atualizada antes de se candidatar.
                </p>
                
                {job.status === "aberta" ? (
                  <ApplyButton jobId={job.id} />
                ) : (
                  <Button disabled variant="secondary" className="w-full">
                    Candidaturas Encerradas
                  </Button>
                )}
                
                <div className="mt-6 pt-6 border-t text-sm text-muted-foreground space-y-3">
                  <div className="flex justify-between">
                    <span>Nível Exigido:</span>
                    <span className="font-medium text-foreground">{job.experienceLevel}</span>
                  </div>
                  {job.rotation && (
                    <div className="flex justify-between">
                      <span>Regime:</span>
                      <span className="font-medium text-foreground">{job.rotation}</span>
                    </div>
                  )}
                  {job.deadline && (
                    <div className="flex justify-between items-center text-amber-600 dark:text-amber-500 font-medium">
                      <span className="flex items-center gap-1"><CalendarClock className="size-4" /> Prazo:</span>
                      <span>{job.deadline.toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
