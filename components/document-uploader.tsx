"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { uploadSingleDocument } from "@/lib/actions/candidato"
import { toast } from "sonner"
import { FileText, Loader2, UploadCloud } from "lucide-react"

export function DocumentUploader({ docType, existingDoc }: { docType: string, existingDoc?: { fileName: string, pathname: string } }) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error("O ficheiro não deve exceder 5MB.")
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append("docType", docType)
    formData.append("file", file)

    try {
      const res = await uploadSingleDocument(formData)
      if (res.error) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
      }
    } catch (error) {
      toast.error("Erro ao enviar o ficheiro.")
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border bg-card">
      <div className="flex items-center gap-4 w-full">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <FileText className="size-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm">{docType}</p>
          {existingDoc ? (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-100 dark:bg-emerald-500/20 px-2 py-0.5 rounded-full">Anexado</span>
              <p className="text-xs text-muted-foreground truncate" title={existingDoc.fileName}>
                {existingDoc.fileName}
              </p>
            </div>
          ) : (
             <span className="inline-block mt-1 text-xs text-amber-600 dark:text-amber-400 font-medium bg-amber-100 dark:bg-amber-500/20 px-2 py-0.5 rounded-full">Pendente</span>
          )}
        </div>
      </div>
      
      <div className="flex gap-2 w-full sm:w-auto shrink-0">
        {existingDoc && (
          <Button variant="outline" size="sm" className="w-full sm:w-auto" asChild>
            <a href={`/api/docs?url=${encodeURIComponent(existingDoc.pathname)}`} target="_blank" rel="noopener noreferrer">
              Ver Ficheiro
            </a>
          </Button>
        )}
        <Button 
          variant={existingDoc ? "secondary" : "default"} 
          size="sm" 
          className="w-full sm:w-auto gap-2"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? <Loader2 className="size-4 animate-spin" /> : <UploadCloud className="size-4" />}
          {existingDoc ? "Substituir" : "Carregar"}
        </Button>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange} 
          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
        />
      </div>
    </div>
  )
}
