import { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { requireAdminPage } from "@/lib/session"
import { COMPANY } from "@/lib/constants"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { createJob } from "@/lib/actions/vagas"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const metadata: Metadata = {
  title: `Nova Vaga | Administração | ${COMPANY.name}`,
}

export default async function NovaVagaPage() {
  await requireAdminPage()

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-secondary/30 pb-20 pt-10">
        <div className="mx-auto w-full max-w-3xl px-5">
          <div className="mb-8">
            <Link href="/admin/vagas" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-4">
              <ChevronLeft className="mr-1 size-4" />
              Voltar à Gestão de Vagas
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Criar Nova Vaga</h1>
            <p className="text-muted-foreground">
              Preencha os detalhes abaixo para publicar uma nova oportunidade.
            </p>
          </div>

          <form action={createJob} className="rounded-xl border border-border bg-card shadow-sm p-6 sm:p-8 space-y-8">
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">Informações Básicas</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Título da Vaga <span className="text-destructive">*</span></Label>
                  <Input id="title" name="title" required placeholder="Ex: Engenheiro de Petróleos" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria <span className="text-destructive">*</span></Label>
                  <Select name="category" required defaultValue="Engenharia">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engenharia">Engenharia</SelectItem>
                      <SelectItem value="Operações">Operações</SelectItem>
                      <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="Administrativo">Administrativo</SelectItem>
                      <SelectItem value="Saúde e Segurança">Saúde e Segurança</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Localização <span className="text-destructive">*</span></Label>
                  <Input id="location" name="location" required placeholder="Ex: Luanda, Angola (Offshore)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vacancies">Número de Vagas</Label>
                  <Input id="vacancies" name="vacancies" type="number" min="1" defaultValue="1" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">Detalhes Contratuais</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="contractType">Tipo de Contrato</Label>
                  <Select name="contractType" defaultValue="Tempo integral">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tempo integral">Tempo integral</SelectItem>
                      <SelectItem value="Meio tempo">Meio tempo</SelectItem>
                      <SelectItem value="Contrato">Contrato por Obra</SelectItem>
                      <SelectItem value="Estágio">Estágio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experiência</Label>
                  <Select name="experienceLevel" defaultValue="Intermediario">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Júnior">Júnior</SelectItem>
                      <SelectItem value="Intermediario">Pleno / Intermédio</SelectItem>
                      <SelectItem value="Sénior">Sénior</SelectItem>
                      <SelectItem value="Liderança">Liderança / Direção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salaryRange">Faixa Salarial</Label>
                  <Input id="salaryRange" name="salaryRange" placeholder="Ex: 500,000 - 800,000 AOA" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">Descrição e Requisitos</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="summary">Resumo Curto <span className="text-destructive">*</span></Label>
                  <Textarea id="summary" name="summary" required placeholder="Uma breve descrição (1-2 frases) que aparecerá nos cartões de pesquisa." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição Completa <span className="text-destructive">*</span></Label>
                  <Textarea id="description" name="description" required className="min-h-[150px]" placeholder="Descreva as responsabilidades, a empresa e o ambiente de trabalho..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requirements">Requisitos Técnicos e Perfil</Label>
                  <Textarea id="requirements" name="requirements" className="min-h-[100px]" placeholder="Liste as competências obrigatórias e valorizadas..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefícios (Opcional)</Label>
                  <Textarea id="benefits" name="benefits" placeholder="Plano de saúde, bónus, transporte..." />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 rounded-lg border p-4 bg-muted/50">
              <Checkbox id="featured" name="featured" value="on" />
              <div className="space-y-1">
                <Label htmlFor="featured" className="font-medium cursor-pointer">Destacar esta Vaga</Label>
                <p className="text-sm text-muted-foreground">
                  As vagas destacadas aparecem no topo das pesquisas e na página inicial.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <Link href="/admin/vagas">
                <Button variant="outline" type="button">Cancelar</Button>
              </Link>
              <Button type="submit">Publicar Vaga</Button>
            </div>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
