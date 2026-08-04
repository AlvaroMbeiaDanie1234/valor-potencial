import Link from "next/link"
import { Mail, MapPin, Phone, FileText } from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { COMPANY } from "@/lib/constants"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-sidebar-border bg-sidebar">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="flex flex-col gap-4 md:col-span-2">
          <Logo variant="dark" />
          <p className="max-w-sm text-sm leading-relaxed text-sidebar-foreground/70">
            Empresa angolana especializada no recrutamento e selecao de
            profissionais para operadoras petroliferas, plataformas offshore e
            empresas de servicos da industria de petroleo e gas.
          </p>
        </div>

        <nav aria-label="Portal" className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-accent">
            Portal
          </h3>
          {[
            { href: "/vagas", label: "Vagas disponiveis" },
            { href: "/registar", label: "Criar conta" },
            { href: "/entrar", label: "Entrar" },
            { href: "/sobre", label: "Sobre nos" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-sidebar-foreground/70 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-accent">
            Contactos
          </h3>
          <a
            href={`mailto:${COMPANY.email}`}
            className="flex items-start gap-2 text-sm text-sidebar-foreground/70 transition-colors hover:text-accent"
          >
            <Mail className="mt-0.5 size-4 shrink-0" />
            <span className="break-all">{COMPANY.email}</span>
          </a>
          <a
            href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-sm text-sidebar-foreground/70 transition-colors hover:text-accent"
          >
            <Phone className="size-4 shrink-0" />
            {COMPANY.phone}
          </a>
          <p className="flex items-center gap-2 text-sm text-sidebar-foreground/70">
            <MapPin className="size-4 shrink-0" />
            {COMPANY.address}
          </p>
          {COMPANY.nif && (
            <p className="flex items-center gap-2 text-sm text-sidebar-foreground/70">
              <FileText className="size-4 shrink-0" />
              NIF: {COMPANY.nif}
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-sidebar-border px-5 py-6">
        <p className="mx-auto max-w-6xl text-xs text-sidebar-foreground/50">
          © {new Date().getFullYear()} {COMPANY.name}. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  )
}
