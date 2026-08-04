import Link from "next/link"
import { LayoutDashboard, Menu, ShieldCheck } from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"

import { LogoutButton } from "@/components/logout-button"

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
        <Link href="/" aria-label="Valor Potencial — pagina inicial">
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
                <Link href="/admin" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                  <ShieldCheck className="size-4 mr-2" />
                  Administração
                </Link>
              )}
              <Link href="/painel" className={buttonVariants({ size: "sm" })}>
                <LayoutDashboard className="size-4 mr-2" />
                Meu painel
              </Link>
              <LogoutButton variant="ghost" />
            </>
          ) : (
            <>
              <Link href="/entrar" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                Entrar
              </Link>
              <Link href="/registar" className={buttonVariants({ size: "sm" })}>
                Criar conta
              </Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <Sheet>
          <SheetTrigger className={cn(buttonVariants({ variant: "outline", size: "icon" }), "md:hidden")} aria-label="Abrir menu">
            <Menu className="size-4" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="text-left">
                <Logo showText={false} />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4 mt-6">
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
                    <Link href="/admin" className={buttonVariants({ variant: "outline", className: "w-full" })}>
                      Administração
                    </Link>
                  )}
                  <Link href="/painel" className={buttonVariants({ className: "w-full" })}>
                    Meu painel
                  </Link>
                  <LogoutButton variant="outline" className="w-full" />
                </>
              ) : (
                <>
                  <Link href="/entrar" className={buttonVariants({ variant: "outline", className: "w-full" })}>
                    Entrar
                  </Link>
                  <Link href="/registar" className={buttonVariants({ className: "w-full" })}>
                    Criar conta
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
