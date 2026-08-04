"use client"

import { useState } from "react"
import { consultarBI, submitCandidateProfile } from "@/lib/actions/candidato"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Search, Loader2 } from "lucide-react"

export function PerfilForm() {
  const [isSearching, setIsSearching] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bi, setBi] = useState("")
  const [biData, setBiData] = useState<{name: string, endereco: string, data_de_nascimento: string} | null>(null)

  const handleSearchBI = async () => {
    if (!bi || bi.length < 5) {
      toast.error("Introduza um número de BI válido.")
      return
    }

    setIsSearching(true)
    try {
      const data = await consultarBI(bi)
      if (data.error) {
        toast.error(data.message || "BI não encontrado.")
        setBiData(null)
      } else {
        toast.success("Dados do BI importados com sucesso!")
        setBiData(data)
      }
    } catch (err) {
      toast.error("Erro de comunicação ao consultar BI.")
    } finally {
      setIsSearching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!biData) {
      toast.error("Por favor, valide primeiro o seu BI.")
      return
    }

    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    // Ensure the auto-filled data is in formData since disabled inputs might not be submitted
    formData.set("idNumber", bi)
    formData.set("fullName", biData.name)
    formData.set("address", biData.endereco)
    formData.set("birthDate", biData.data_de_nascimento)

    try {
      await submitCandidateProfile(formData)
      toast.success("Perfil submetido com sucesso! Aguarda aprovação.")
    } catch (err) {
      toast.error("Erro ao submeter o perfil.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card shadow-sm p-6 sm:p-8 space-y-8 text-left max-w-2xl mx-auto">
      
      <div className="space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">1. Validação de Identidade</h2>
        <div className="space-y-2">
          <Label htmlFor="idNumber">Número do Bilhete de Identidade <span className="text-destructive">*</span></Label>
          <div className="flex gap-2">
            <Input 
              id="idNumber" 
              name="idNumber" 
              value={bi}
              onChange={(e) => setBi(e.target.value)}
              placeholder="Ex: 020221207LA055" 
              required 
            />
            <Button type="button" onClick={handleSearchBI} disabled={isSearching || !bi}>
              {isSearching ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4 mr-2" />}
              Pesquisar
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">O preenchimento automático obterá o seu nome, morada e data de nascimento.</p>
        </div>

        {biData && (
          <div className="grid gap-4 sm:grid-cols-2 bg-primary/5 p-4 rounded-lg mt-4 border border-primary/20">
            <div className="space-y-2 sm:col-span-2">
              <Label>Nome Completo</Label>
              <Input value={biData.name} disabled className="bg-background/50" />
            </div>
            <div className="space-y-2">
              <Label>Data de Nascimento</Label>
              <Input value={biData.data_de_nascimento} disabled className="bg-background/50" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Morada</Label>
              <Input value={biData.endereco} disabled className="bg-background/50" />
            </div>
          </div>
        )}
      </div>

      <div className={`space-y-4 transition-opacity duration-300 ${!biData ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        <h2 className="text-lg font-semibold border-b pb-2">2. Dados de Contacto</h2>
        <div className="space-y-2">
          <Label htmlFor="phone">Número de Telefone <span className="text-destructive">*</span></Label>
          <Input id="phone" name="phone" placeholder="Ex: 923 000 000" required={!!biData} />
        </div>
      </div>

      <div className={`space-y-4 transition-opacity duration-300 ${!biData ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        <h2 className="text-lg font-semibold border-b pb-2">3. Documentação Obrigatória</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="foto_perfil">Foto tipo Passe <span className="text-destructive">*</span></Label>
            <Input id="foto_perfil" name="foto_perfil" type="file" accept="image/*" required={!!biData} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bi_doc">Cópia do BI <span className="text-destructive">*</span></Label>
            <Input id="bi_doc" name="bi_doc" type="file" accept=".pdf,image/*" required={!!biData} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="certificado">Certificado de Habilitações <span className="text-destructive">*</span></Label>
            <Input id="certificado" name="certificado" type="file" accept=".pdf,image/*" required={!!biData} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cv">Curriculum Vitae <span className="text-destructive">*</span></Label>
            <Input id="cv" name="cv" type="file" accept=".pdf" required={!!biData} />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button type="submit" disabled={!biData || isSubmitting} className="w-full sm:w-auto">
          {isSubmitting && <Loader2 className="size-4 animate-spin mr-2" />}
          Submeter para Validação
        </Button>
      </div>
    </form>
  )
}
