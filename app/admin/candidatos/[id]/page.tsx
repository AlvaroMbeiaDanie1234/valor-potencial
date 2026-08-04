import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { requireAdminPage } from "@/lib/session"
import { COMPANY } from "@/lib/constants"
import { ChevronLeft, CheckCircle, XCircle, FileText, User } from "lucide-react"
import { db } from "@/lib/db"
import { user, candidateProfiles, documents } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { approveCandidateProfile, rejectCandidateProfile } from "@/lib/actions/candidato"
import { ApproveProfileButton } from "@/components/approve-profile-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: `Análise de Candidato | Administração | ${COMPANY.name}`,
}

export default async function AdminCandidatoDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdminPage()

  const { id: rawId } = await params
  const id = decodeURIComponent(rawId)

  const candidatoList = await db.select().from(user).where(eq(user.id, id))
  if (candidatoList.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1>Candidato não encontrado.</h1>
        <p>ID procurado: {id}</p>
      </div>
    )
  }
  const candidatoData = candidatoList[0]

  const profilesList = await db.select().from(candidateProfiles).where(eq(candidateProfiles.userId, id))
  const profile = profilesList[0] || null

  const candidateDocs = await db.select().from(documents).where(eq(documents.userId, id))

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-secondary/30 pb-20 pt-10">
        <div className="mx-auto w-full max-w-5xl px-5 space-y-8">
          
          <div className="flex items-center gap-4">
            <Link href="/admin/candidatos">
              <Button variant="outline" size="icon">
                <ChevronLeft className="size-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Análise de Candidato</h1>
              <p className="text-muted-foreground">Analise os dados e documentação antes de aprovar.</p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-8">
              
              <div className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={candidatoData.image || ""} />
                      <AvatarFallback className="text-xl">{candidatoData.name.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-semibold">{profile?.fullName || candidatoData.name}</h2>
                      <p className="text-muted-foreground">{candidatoData.email}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-sm">
                    {profile?.verificationStatus === 'pendente_verificacao' ? 'Pendente' : 
                     profile?.verificationStatus === 'verificado' ? 'Verificado' : 
                     profile?.verificationStatus === 'rejeitado' ? 'Rejeitado' : 'Incompleto'}
                  </Badge>
                </div>

                {profile && (
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Nº Bilhete Identidade</p>
                      <p className="font-medium">{profile.idNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Telefone</p>
                      <p className="font-medium">{profile.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Data Nascimento</p>
                      <p className="font-medium">{profile.birthDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Morada</p>
                      <p className="font-medium">{profile.address}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <FileText className="size-5 text-primary" /> Documentos Anexados
                </h3>
                {candidateDocs.length === 0 ? (
                  <p className="text-muted-foreground">Nenhum documento anexado.</p>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {candidateDocs.map(doc => (
                      <a key={doc.id} href={`/api/docs?url=${encodeURIComponent(doc.pathname)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors">
                        <FileText className="size-8 text-primary/70" />
                        <div className="overflow-hidden">
                          <p className="font-medium truncate">{doc.docType}</p>
                          <p className="text-xs text-muted-foreground truncate">{doc.fileName}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
                <h3 className="font-semibold text-lg">Aprovação</h3>
                <p className="text-sm text-muted-foreground">
                  Verifique se o BI e os documentos enviados estão corretos. Ao aprovar, o candidato poderá candidatar-se às vagas abertas.
                </p>

                {profile?.verificationStatus === "pendente_verificacao" ? (
                  <div className="flex flex-col gap-3 pt-4 border-t">
                    <ApproveProfileButton candidateId={id} />
                    <form action={async () => {
                      "use server";
                      await rejectCandidateProfile(id)
                    }}>
                      <Button variant="destructive" className="w-full gap-2">
                        <XCircle className="size-4" /> Rejeitar
                      </Button>
                    </form>
                  </div>
                ) : (
                  <div className="pt-4 border-t">
                    <Badge variant="outline" className="w-full justify-center py-2 text-sm bg-muted/50">
                      Ação Indisponível (Perfil {profile?.verificationStatus})
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
