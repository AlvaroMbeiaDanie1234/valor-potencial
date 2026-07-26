import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ClipboardCheck,
  FileCheck2,
  Search,
  ShieldCheck,
  UserPlus,
} from "lucide-react"
import { JobCard } from "@/components/job-card"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { JOB_CATEGORIES } from "@/lib/constants"
import { getPublicStats, listOpenJobs } from "@/lib/queries/jobs"

const STEPS = [
  {
    icon: UserPlus,
    title: "Crie a sua conta",
    text: "Registe-se em poucos minutos e construa o seu perfil profissional completo.",
  },
  {
    icon: FileCheck2,
    title: "Envie os documentos",
    text: "Anexe o CV, bilhete de identidade, certificados de habilitacoes e formacoes tecnicas.",
  },
  {
    icon: Search,
    title: "Candidate-se as vagas",
    text: "Consulte as vagas abertas e submeta a candidatura com um unico clique.",
  },
  {
    icon: ClipboardCheck,
    title: "Acompanhe o processo",
    text: "Veja em tempo real o estado da sua candidatura, da triagem a entrevista.",
  },
]

export default async function HomePage() {
  const [jobs, stats] = await Promise.all([listOpenJobs(), getPublicStats()])
  const featured = jobs.slice(0, 6)

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-sidebar">
          <Image
            src="/images/hero-offshore.png"
            alt="Plataforma petrolifera offshore ao largo da costa de Angola"
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-25"
          />
          <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-20 md:py-28">
            <div className="flex max-w-3xl flex-col gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-accent/12 px-3 py-1 text-xs font-medium text-accent">
                <ShieldCheck className="size-3.5" />
                Recrutamento certificado para petroleo e gas
              </span>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-sidebar-foreground text-balance md:text-5xl lg:text-6xl">
                O seu talento na industria offshore de Angola
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-sidebar-foreground/80 md:text-lg">
                A Valor Potencial liga profissionais qualificados as maiores
                operadoras petroliferas e empresas de servicos offshore do pais.
                Candidate-se online e acompanhe todo o processo num so lugar.
              </p>
            </div>

            {/* Search */}
            <form
              action="/vagas"
              className="flex w-full max-w-2xl flex-col gap-3 rounded-lg border border-sidebar-border bg-background/95 p-3 backdrop-blur sm:flex-row"
            >
              <label htmlFor="hero-search" className="sr-only">
                Pesquisar vagas por cargo, area ou localizacao
              </label>
              <Input
                id="hero-search"
                name="q"
                placeholder="Cargo, area ou localizacao"
                className="h-11 border-0 bg-transparent shadow-none focus-visible:ring-0"
              />
              <Button type="submit" size="lg" className="shrink-0">
                <Search className="size-4" />
                Procurar vagas
              </Button>
            </form>

            {/* Stats */}
            <dl className="flex flex-wrap gap-x-12 gap-y-6 border-t border-sidebar-border pt-8">
              {[
                { label: "Vagas abertas", value: stats.openJobs },
                { label: "Posicoes disponiveis", value: stats.vacancies },
                { label: "Candidaturas recebidas", value: stats.applications },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <dd className="text-3xl font-semibold tracking-tight text-accent">
                    {stat.value}
                  </dd>
                  <dt className="text-sm text-sidebar-foreground/70">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Featured jobs */}
        <section className="mx-auto w-full max-w-6xl px-5 py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-semibold tracking-tight text-balance">
                Vagas em destaque
              </h2>
              <p className="text-muted-foreground">
                Oportunidades recentes nas nossas empresas parceiras.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/vagas">
                Ver todas as vagas
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          {featured.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-secondary/40 px-6 py-16 text-center">
              <h3 className="text-lg font-medium">
                Ainda nao existem vagas publicadas
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Crie a sua conta e prepare o seu perfil para se candidatar assim
                que as primeiras oportunidades forem anunciadas.
              </p>
              <Button asChild className="mt-6">
                <Link href="/registar">Criar conta de candidato</Link>
              </Button>
            </div>
          )}
        </section>

        {/* How it works */}
        <section className="border-y border-border bg-secondary/40">
          <div className="mx-auto w-full max-w-6xl px-5 py-20">
            <div className="mb-12 flex max-w-2xl flex-col gap-2">
              <h2 className="text-3xl font-semibold tracking-tight text-balance">
                Como funciona o processo
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Um percurso simples e transparente, da inscricao a colocacao na
                plataforma.
              </p>
            </div>

            <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, index) => (
                <li
                  key={step.title}
                  className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-md bg-primary/8 text-primary">
                      <step.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span
                      className="font-mono text-2xl font-semibold text-border"
                      aria-hidden="true"
                    >
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold tracking-tight">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Areas */}
        <section className="mx-auto w-full max-w-6xl px-5 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-semibold tracking-tight text-balance">
                Areas em que recrutamos
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Trabalhamos com operadoras e prestadoras de servicos em toda a
                cadeia de valor do petroleo e gas, do upstream offshore as
                operacoes de apoio em terra.
              </p>
              <ul className="flex flex-wrap gap-2">
                {JOB_CATEGORIES.map((category) => (
                  <li key={category}>
                    <Link
                      href={`/vagas?category=${encodeURIComponent(category)}`}
                      className="inline-flex rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-4/3 overflow-hidden rounded-lg border border-border">
              <Image
                src="/images/offshore-workers.png"
                alt="Equipa de tecnicos offshore em equipamento de protecao a analisar documentacao na plataforma"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-primary">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold tracking-tight text-primary-foreground text-balance md:text-3xl">
                Pronto para dar o proximo passo na sua carreira?
              </h2>
              <p className="max-w-xl leading-relaxed text-primary-foreground/80">
                Crie o seu perfil de candidato gratuitamente e mantenha os seus
                documentos sempre prontos para novas oportunidades.
              </p>
            </div>
            <Button asChild size="lg" variant="secondary" className="shrink-0">
              <Link href="/registar">
                Comecar agora
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
