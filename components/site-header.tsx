import Link from "next/link"
import { LayoutDashboard, Menu, ShieldCheck } from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getCurrentUser } from "@/lib/session"

const NAV_LINKS = [
  { href: "/vagas", label: "Vagas" },
  { href: "/sobre", label: "Sobre nos" },
  { href: "/contacto", label: "Contacto" },
]

export async function SiteHeader() {
  const user = await getCurrentUser()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-5">
        <Link href="/" aria-label="Nome Valor Potencial — pagina inicial">
          <Logo />
        </Link>

        <nav
          aria-label="Navegacao principal"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              {user.role === "admin" && (
                <Button asChild variant="ghost" size="sm">
                  <Link href="/admin">
                    <ShieldCheck className="size-4" />
                    Administracao
                  </Link>
                </Button>
              )}
              <Button asChild size="sm">
                <Link href="/painel">
                  <LayoutDashboard className="size-4" />
                  Meu painel
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/entrar">Entrar</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/registar">Criar conta</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" aria-label="Abrir menu">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="text-left">
                <Logo showText={false} />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2 p-4">
              {user ? (
                <>
                  {user.role === "admin" && (
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/admin">Administracao</Link>
                    </Button>
                  )}
                  <Button asChild className="w-full">
                    <Link href="/painel">Meu painel</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/entrar">Entrar</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/registar">Criar conta</Link>
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
