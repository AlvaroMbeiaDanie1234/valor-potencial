import { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { requireUserPage } from "@/lib/session"
import { COMPANY } from "@/lib/constants"
import { FileText } from "lucide-react"

export const metadata: Metadata = {
  title: `Documentos | ${COMPANY.name}`,
}

export default async function DocumentosPage() {
  const user = await requireUserPage()

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-secondary/30 pb-20 pt-10">
        <div className="mx-auto w-full max-w-5xl px-5">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FileText className="size-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Documentos</h1>
              <p className="text-muted-foreground">
                Faça a gestão do seu CV, certificados e outra documentação exigida.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center shadow-sm">
            <h2 className="text-xl font-semibold">Em desenvolvimento</h2>
            <p className="mt-2 text-muted-foreground">
              A área de gestão de ficheiros (upload do seu CV e certificados) estará disponível muito em breve!
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
