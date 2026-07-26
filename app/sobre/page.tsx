import { Metadata } from "next"
import Image from "next/image"
import { Target, Users, Shield } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { COMPANY } from "@/lib/constants"

export const metadata: Metadata = {
  title: `Sobre Nós | ${COMPANY.name}`,
  description: "Conheça a nossa história e missão no recrutamento para a indústria offshore de Angola.",
}

const VALUES = [
  {
    icon: Target,
    title: "Missão",
    description:
      "Conectar talentos excecionais às melhores oportunidades na indústria offshore e petrolífera de Angola, promovendo o desenvolvimento do capital humano local.",
  },
  {
    icon: Users,
    title: "Visão",
    description:
      "Ser a principal referência em recrutamento especializado, reconhecida pela excelência, transparência e compromisso com o sucesso dos nossos clientes e candidatos.",
  },
  {
    icon: Shield,
    title: "Valores",
    description:
      "Pautamo-nos pela integridade, confidencialidade, inovação e pelo respeito por todos os profissionais que confiam na nossa plataforma.",
  },
]

export default function SobrePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-secondary/30">
        {/* Header */}
        <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
          <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-6 px-5 text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Sobre a {COMPANY.name}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
              {COMPANY.tagline}
            </p>
          </div>
        </section>

        {/* História */}
        <section className="mx-auto w-full max-w-5xl px-5 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-semibold tracking-tight">
                A Nossa História
              </h2>
              <div className="flex flex-col gap-4 leading-relaxed text-muted-foreground">
                <p>
                  A <strong>{COMPANY.name}</strong> nasceu da necessidade de criar uma ponte
                  sólida e confiável entre os talentos nacionais e as operadoras do
                  setor petrolífero e de gás em Angola.
                </p>
                <p>
                  Com anos de experiência e um profundo conhecimento do mercado
                  offshore, compreendemos os desafios únicos do setor. Sabemos que a
                  competência técnica e a segurança são fundamentais, e é por isso
                  que o nosso processo de triagem e seleção é rigoroso.
                </p>
                <p>
                  A nossa plataforma foi desenhada para simplificar o processo de
                  recrutamento, permitindo que os candidatos apresentem o seu perfil
                  de forma profissional e que as empresas encontrem rapidamente as
                  qualificações exatas de que necessitam para as suas operações
                  onshore e offshore.
                </p>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-xl border border-border shadow-sm">
              <Image
                src="/images/hero-offshore.png"
                alt="Plataforma petrolífera offshore ao largo da costa"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="border-y border-border bg-card">
          <div className="mx-auto w-full max-w-5xl px-5 py-20">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-semibold tracking-tight">
                O Nosso Compromisso
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {VALUES.map((value) => (
                <div
                  key={value.title}
                  className="flex flex-col items-center gap-4 text-center"
                >
                  <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <value.icon className="size-8" />
                  </div>
                  <h3 className="text-xl font-medium">{value.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
