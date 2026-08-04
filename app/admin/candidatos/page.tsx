import { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { requireAdminPage } from "@/lib/session"
import { COMPANY } from "@/lib/constants"
import { Users, Search, ChevronRight } from "lucide-react"
import { db } from "@/lib/db"
import { user, candidateProfiles } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: `Gestão de Candidatos | Administração | ${COMPANY.name}`,
}

export default async function AdminCandidatosPage() {
  await requireAdminPage()

  const candidatos = await db.select({
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    createdAt: user.createdAt,
    status: candidateProfiles.verificationStatus,
  })
  .from(user)
  .leftJoin(candidateProfiles, eq(user.id, candidateProfiles.userId))
  .where(eq(user.role, "candidate"))
  .orderBy(desc(user.createdAt))

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-secondary/30 pb-20 pt-10">
        <div className="mx-auto w-full max-w-5xl px-5">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users className="size-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Candidatos</h1>
                <p className="text-muted-foreground">
                  Análise de perfis e aprovação de candidatos.
                </p>
              </div>
            </div>
            
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Procurar candidato..." className="w-full pl-8" />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Perfil</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidatos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                      Ainda não existem candidatos registados na plataforma.
                    </TableCell>
                  </TableRow>
                ) : (
                  candidatos.map((candidato) => (
                    <TableRow key={candidato.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={candidato.image || ""} alt={candidato.name} />
                            <AvatarFallback>{candidato.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span>{candidato.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{candidato.email}</TableCell>
                      <TableCell>
                        {!candidato.status || candidato.status === "incompleto" ? (
                          <Badge variant="secondary">Incompleto</Badge>
                        ) : candidato.status === "pendente_verificacao" ? (
                          <Badge className="bg-amber-500 text-white hover:bg-amber-600">Pendente</Badge>
                        ) : candidato.status === "verificado" ? (
                          <Badge variant="default">Verificado</Badge>
                        ) : (
                          <Badge variant="destructive">Rejeitado</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/admin/candidatos/${candidato.id}`}>
                          <Button variant="ghost" size="sm" className="font-medium text-primary">
                            Analisar
                            <ChevronRight className="ml-1 size-4" />
                          </Button>
                        </Link>
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
