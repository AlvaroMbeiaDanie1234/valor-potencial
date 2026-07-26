import { Metadata } from "next"
import { Mail, MapPin, Phone } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { COMPANY } from "@/lib/constants"

export const metadata: Metadata = {
  title: `Contacto | ${COMPANY.name}`,
  description: "Fale connosco para qualquer dúvida ou assistência.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-secondary/30 pb-20 pt-10">
        <div className="mx-auto w-full max-w-5xl px-5">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Fale Connosco
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Estamos aqui para ajudar com qualquer dúvida sobre o processo de
              recrutamento ou sobre a nossa plataforma.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="flex flex-col gap-8 rounded-xl border border-border bg-card p-8 shadow-sm">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  Informação de Contacto
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Entre em contacto através dos nossos canais oficiais. A nossa
                  equipa responderá com a maior brevidade possível.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="size-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">Email</span>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone className="size-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">Telefone</span>
                    <a
                      href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {COMPANY.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="size-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">Sede</span>
                    <span className="text-sm text-muted-foreground">
                      {COMPANY.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-8 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                Envie uma Mensagem
              </h2>
              <form className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" placeholder="O seu nome" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nome@exemplo.com"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input id="subject" placeholder="Em que podemos ajudar?" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    placeholder="Escreva a sua mensagem aqui..."
                    className="min-h-[120px] resize-y"
                  />
                </div>
                <Button type="button" className="mt-2 w-full">
                  Enviar mensagem
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
