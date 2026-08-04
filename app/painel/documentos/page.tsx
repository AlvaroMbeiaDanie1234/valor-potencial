import { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { requireUserPage } from "@/lib/session"
import { COMPANY } from "@/lib/constants"
import { FileText, ShieldAlert } from "lucide-react"
import { db } from "@/lib/db"
import { documents } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { DocumentUploader } from "@/components/document-uploader"

export const metadata: Metadata = {
  title: `Documentos | ${COMPANY.name}`,
}

const REQUIRED_DOCS = [
  "Bilhete de Identidade",
  "Certificado de Habilitações",
  "Curriculum Vitae",
  "Fotografia (Tipo Passe)"
]

export default async function DocumentosPage() {
  const user = await requireUserPage()

  const userDocs = await db.select().from(documents).where(eq(documents.userId, user.id))
  
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-secondary/30 pb-20 pt-10">
        <div className="mx-auto w-full max-w-4xl px-5">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FileText className="size-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Gestão de Documentos</h1>
              <p className="text-muted-foreground mt-1">
                Mantenha o seu CV e documentos atualizados para se destacar nas candidaturas.
              </p>
            </div>
          </div>
          
          <div className="grid gap-8">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-start gap-3 mb-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-500/20">
                <ShieldAlert className="size-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800 dark:text-amber-400">
                  <p className="font-semibold mb-1">Documentação Obrigatória</p>
                  <p>Para o seu perfil ser verificado e poder submeter candidaturas, necessita de anexar todos os documentos abaixo solicitados. Apenas são aceites formatos PDF, JPG, PNG e DOCX (máx 5MB).</p>
                </div>
              </div>

              <div className="space-y-4">
                {REQUIRED_DOCS.map(docType => {
                  const existingDoc = userDocs.find(d => d.docType === docType)
                  return (
                    <DocumentUploader 
                      key={docType} 
                      docType={docType} 
                      existingDoc={existingDoc ? { fileName: existingDoc.fileName, pathname: existingDoc.pathname } : undefined} 
                    />
                  )
                })}
              </div>
            </div>
            
            {userDocs.some(d => !REQUIRED_DOCS.includes(d.docType)) && (
              <div className="rounded-xl border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Outros Documentos</h3>
                <div className="space-y-4">
                  {userDocs.filter(d => !REQUIRED_DOCS.includes(d.docType)).map(doc => (
                    <DocumentUploader 
                      key={doc.id} 
                      docType={doc.docType} 
                      existingDoc={{ fileName: doc.fileName, pathname: doc.pathname }} 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
