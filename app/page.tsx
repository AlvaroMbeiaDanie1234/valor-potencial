import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Briefcase,
  Building2,
  HardHat,
  Laptop,
  MapPin,
  Search,
  ShieldCheck,
  Ship,
  Wrench,
  Users,
  Video,
  MonitorSmartphone,
  LineChart,
  Target,
  CheckCircle2,
  Zap,
  HeartHandshake,
  BrainCircuit
} from "lucide-react"
import { JobCard } from "@/components/job-card"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { HeroSearch } from "@/components/home/hero-search"
import { CategoryCard } from "@/components/home/category-card"
import { getPublicStats, listOpenJobs } from "@/lib/queries/jobs"

const TOP_CATEGORIES = [
  { name: "Engenharia e Projetos", icon: HardHat, href: "/vagas?category=Engenharia+e+Projetos" },
  { name: "Operações Offshore", icon: Ship, href: "/vagas?category=Operacoes+Offshore" },
  { name: "Manutenção e Técnica", icon: Wrench, href: "/vagas?category=Manutencao+e+Tecnica" },
  { name: "Tecnologia e TI", icon: Laptop, href: "/vagas?category=Tecnologia+e+TI" },
  { name: "Administração e Finanças", icon: Briefcase, href: "/vagas?category=Administracao+e+Financas" },
  { name: "Saúde e Segurança (HSE)", icon: ShieldCheck, href: "/vagas?category=Saude+e+Seguranca+(HSE)" },
]

export default async function HomePage() {
  const [jobs, stats] = await Promise.all([listOpenJobs(), getPublicStats()])
  const featured = jobs.slice(0, 6)

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />

      <main className="flex-1 bg-background">
        {/* PREMIUM HERO SECTION */}
        <section className="relative overflow-hidden bg-emerald-950 pt-24 pb-32 lg:pt-36 lg:pb-40">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-offshore.png"
              alt="Plataforma petrolífera offshore"
              fill
              priority
              className="object-cover opacity-20 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900/60 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-5 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300 mb-6 backdrop-blur-sm">
              <ShieldCheck className="size-4" />
              O Portal de Emprego Líder no Setor Energético em Angola
            </span>
            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl mb-6 text-balance">
              Encontre o Seu Futuro no <span className="text-emerald-400">Setor Offshore</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-emerald-100/80 mb-10 text-balance">
              Explore milhares de vagas nas principais operadoras petrolíferas e empresas de serviços. Construa uma carreira de sucesso com a Valor Potencial.
            </p>

            <HeroSearch />

            {/* Quick Stats in Hero */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-emerald-100/60 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Briefcase className="size-5 text-emerald-400" />
                <span><strong className="text-white text-base">{stats.openJobs}+</strong> Vagas Abertas</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="size-5 text-emerald-400" />
                <span><strong className="text-white text-base">50+</strong> Empresas Parceiras</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="size-5 text-emerald-400" />
                <span><strong className="text-white text-base">10k+</strong> Candidatos</span>
              </div>
            </div>
          </div>
        </section>

        {/* TOP CATEGORIES */}
        <section className="py-20 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-5">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Categorias Populares</h2>
              <p className="mt-4 text-lg text-muted-foreground">Explore as áreas com maior procura de talento no mercado atual.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TOP_CATEGORIES.map((category) => (
                <CategoryCard
                  key={category.name}
                  title={category.name}
                  icon={category.icon}
                  href={category.href}
                />
              ))}
            </div>
          </div>
        </section>

        {/* LATEST JOBS */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-5">
            <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Oportunidades em Destaque</h2>
                <p className="mt-4 text-lg text-muted-foreground">As vagas mais recentes publicadas pelas nossas empresas parceiras.</p>
              </div>
              <Button asChild variant="outline" size="lg" className="rounded-full shrink-0 group">
                <Link href="/vagas">
                  Ver Todas as Vagas
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {featured.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featured.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-secondary/50 p-16 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <Search className="size-8" />
                </div>
                <h3 className="text-xl font-semibold">Nenhuma vaga publicada de momento</h3>
                <p className="mt-2 text-muted-foreground max-w-md text-balance">
                  As nossas empresas parceiras estão a preparar novas oportunidades. Crie o seu perfil para ser notificado assim que surgirem vagas.
                </p>
                <Button asChild size="lg" className="mt-8 rounded-full">
                  <Link href="/registar">Criar Perfil Grátis</Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* REVOLUTIONARY TOOLS & INTERVIEWS (BENTO GRID) */}
        <section className="py-24 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-5">
            <div className="mb-12 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">O Futuro das Entrevistas e Avaliações</h2>
              <p className="mt-4 text-lg text-muted-foreground">Tecnologia de ponta para conectar os melhores talentos às grandes oportunidades.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 rounded-3xl bg-card border shadow-sm p-8 flex flex-col justify-between overflow-hidden relative group">
                <div className="relative z-10">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-6">
                    <Video className="size-6" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">Entrevistas de trabalho por vídeo</h3>
                  <p className="text-muted-foreground text-lg mb-4 max-w-md">
                    Sem deslocações, sem incómodos. Receba convites online por parte dos empregadores e aceda diretamente à sua entrevista através de um link seguro.
                  </p>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity translate-x-1/4 translate-y-1/4">
                  <Video className="size-64" />
                </div>
              </div>
              
              <div className="rounded-3xl bg-card border shadow-sm p-8 flex flex-col justify-between">
                <div>
                  <div className="flex size-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 mb-6">
                    <MonitorSmartphone className="size-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Desde qualquer dispositivo</h3>
                  <p className="text-muted-foreground">
                    Acompanhe o seu recrutamento onde quer que esteja. Disponível para computador, tablet ou telemóvel.
                  </p>
                </div>
              </div>
              
              <div className="rounded-3xl bg-card border shadow-sm p-8 flex flex-col justify-between">
                <div>
                  <div className="flex size-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 mb-6">
                    <BrainCircuit className="size-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Conheça-se melhor</h3>
                  <p className="text-muted-foreground">
                    Conheça em detalhe os seus pontos fortes e fracos, permitindo-lhe evoluir na sua carreira.
                  </p>
                </div>
              </div>

              <div className="md:col-span-2 rounded-3xl bg-emerald-950 text-white p-8 flex flex-col sm:flex-row gap-8 items-center overflow-hidden relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
                <div className="relative z-10 flex-1">
                  <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 mb-4">
                    Ferramentas de avaliação revolucionárias
                  </span>
                  <h3 className="text-2xl font-semibold mb-3">Testes de Competências</h3>
                  <p className="text-emerald-100/80 text-lg">
                    Agora com a Valor Potencial, os empregadores podem solicitar aos candidatos a realização de testes de competências ou exames psicotécnicos 100% online.
                  </p>
                </div>
                <div className="relative z-10 flex flex-col gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <Target className="size-5 text-emerald-400 shrink-0" />
                    <span className="text-sm font-medium">Melhor correspondência de vagas</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <ShieldCheck className="size-5 text-emerald-400 shrink-0" />
                    <span className="text-sm font-medium">Sistema transparente</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS SIMPLIFICATION SECTION */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                  A Valor Potencial <span className="text-primary">simplifica</span> o processo de recrutamento
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Construímos uma plataforma focada no utilizador, garantindo que o seu talento encontra a oportunidade certa no momento certo.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Target className="size-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Procura adaptada</h4>
                      <p className="text-sm text-muted-foreground mt-1">Totalmente ajustada às suas necessidades.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Zap className="size-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Mais rápido</h4>
                      <p className="text-sm text-muted-foreground mt-1">O recrutamento mais célere do mercado.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="size-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Sistema transparente</h4>
                      <p className="text-sm text-muted-foreground mt-1">Acompanhe cada fase do processo.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <HeartHandshake className="size-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Atenção ao candidato</h4>
                      <p className="text-sm text-muted-foreground mt-1">Serviço de apoio humanizado.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-primary/5 rounded-3xl transform rotate-3 scale-105" />
                <div className="relative bg-card border shadow-xl rounded-3xl p-8">
                  <Image 
                    src="/images/offshore-workers.png" 
                    alt="Trabalhadores offshore Valor Potencial"
                    width={600}
                    height={400}
                    className="rounded-xl w-full object-cover aspect-video mb-6"
                  />
                  <div className="flex items-center gap-4 bg-secondary/50 p-4 rounded-xl">
                    <div className="size-12 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <LineChart className="size-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium">O seu perfil está completo</p>
                      <p className="text-sm text-muted-foreground">Está pronto para as melhores oportunidades.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SPLIT CTA SECTION */}
        <section className="py-24 bg-primary/5">
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Candidate CTA */}
              <div className="relative overflow-hidden rounded-3xl bg-emerald-950 p-10 sm:p-14">
                <div className="relative z-10 flex flex-col h-full items-start">
                  <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 mb-6">
                    Para Candidatos
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
                    Dê o próximo passo na sua carreira
                  </h3>
                  <p className="text-emerald-100/80 mb-10 text-lg">
                    Crie o seu perfil profissional, anexe o seu CV e seja descoberto pelas maiores operadoras e empresas de recrutamento do país.
                  </p>
                  <div className="mt-auto">
                    <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8">
                      <Link href="/registar">Registar Gratuitamente</Link>
                    </Button>
                  </div>
                </div>
                <div className="absolute -bottom-24 -right-24 size-96 rounded-full bg-emerald-800/30 blur-3xl" />
              </div>

              {/* Employer CTA */}
              <div className="relative overflow-hidden rounded-3xl bg-card border shadow-sm p-10 sm:p-14">
                <div className="relative z-10 flex flex-col h-full items-start">
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-6">
                    Para Empresas
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
                    Recrute os melhores talentos de Angola
                  </h3>
                  <p className="text-muted-foreground mb-10 text-lg">
                    Aceda a uma base de dados exclusiva de profissionais qualificados e certificados para o setor energético e industrial.
                  </p>
                  <div className="mt-auto">
                    <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      <Link href="/contacto">Falar com Consultor</Link>
                    </Button>
                  </div>
                </div>
                <div className="absolute -top-24 -right-24 size-96 rounded-full bg-primary/5 blur-3xl" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
