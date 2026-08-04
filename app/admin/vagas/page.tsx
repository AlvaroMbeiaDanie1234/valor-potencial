import { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { requireAdminPage } from "@/lib/session"
import { COMPANY } from "@/lib/constants"
import { Briefcase, Plus, MoreHorizontal } from "lucide-react"
import { db } from "@/lib/db"
import { jobs } from "@/lib/db/schema"
import { desc } from "drizzle-orm"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: `Gestão de Vagas | Administração | ${COMPANY.name}`,
}

export default async function AdminVagasPage() {
  await requireAdminPage()
  
  const vagas = await db.select().from(jobs).orderBy(desc(jobs.createdAt))

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-secondary/30 pb-20 pt-10">
        <div className="mx-auto w-full max-w-5xl px-5">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Briefcase className="size-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Gestão de Vagas</h1>
                <p className="text-muted-foreground">
                  Acompanhe e gira as ofertas de emprego ativas.
                </p>
              </div>
            </div>
            <Link href="/admin/vagas/nova">
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 size-4" />
                Criar Nova Vaga
              </Button>
            </Link>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Data Criação</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vagas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      Ainda não existem vagas registadas. Clique em "Criar Nova Vaga" para começar.
                    </TableCell>
                  </TableRow>
                ) : (
                  vagas.map((vaga) => (
                    <TableRow key={vaga.id}>
                      <TableCell className="font-medium">{vaga.title}</TableCell>
                      <TableCell>{vaga.category}</TableCell>
                      <TableCell>{vaga.location}</TableCell>
                      <TableCell>
                        <Badge variant={vaga.status === "aberta" ? "default" : "secondary"}>
                          {vaga.status === "aberta" ? "Aberta" : "Encerrada"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(vaga.createdAt).toLocaleDateString("pt-PT")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">Ações</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
