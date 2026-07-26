import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Logo } from "@/components/brand/logo"

const BENEFITS = [
  "Acesso a vagas em empresas petroliferas e operadoras offshore",
  "Um unico perfil para todas as candidaturas",
  "Documentos e habilitacoes guardados em seguranca",
  "Acompanhamento do estado de cada candidatura",
]

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-svh flex-col lg:flex-row">
      {/* Brand panel */}
      <aside className="relative hidden w-full max-w-xl flex-col justify-between overflow-hidden bg-sidebar p-10 lg:flex">
        <Image
          src="/images/hero-offshore.png"
          alt=""
          fill
          sizes="576px"
          className="object-cover opacity-20"
          priority
        />
        <div className="relative">
          <Link href="/" className="inline-flex">
            <Logo variant="dark" />
          </Link>
        </div>

        <div className="relative flex flex-col gap-6">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-sidebar-foreground text-balance">
            A sua carreira offshore comeca com um perfil bem preparado.
          </h2>
          <ul className="flex flex-col gap-3">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 text-sm leading-relaxed text-sidebar-foreground/80"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-sidebar-foreground/60">
          Valor Potencial — Recrutamento e gestao de talento para a
          industria de petroleo e gas em Angola.
        </p>
      </aside>

      {/* Form panel */}
      <div className="flex flex-1 flex-col justify-center px-5 py-12 sm:px-10">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="mb-10 inline-flex lg:hidden">
            <Logo />
          </Link>

          <Link
            href="/"
            className="mb-8 hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground lg:inline-flex"
          >
            <ArrowLeft className="size-4" />
            Voltar ao portal
          </Link>

          <header className="mb-8 flex flex-col gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-balance">
              {title}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          </header>

          {children}
        </div>
      </div>
    </main>
  )
}
