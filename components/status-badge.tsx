import { cn } from "@/lib/utils"
import { statusLabel } from "@/lib/constants"

const APPLICATION_TONES: Record<string, string> = {
  recebida: "bg-secondary text-secondary-foreground border-border",
  em_analise: "bg-accent/15 text-accent-foreground border-accent/30",
  entrevista: "bg-primary/10 text-primary border-primary/25",
  aprovada: "bg-success/12 text-success border-success/30",
  rejeitada: "bg-destructive/10 text-destructive border-destructive/25",
}

const DOC_TONES: Record<string, string> = {
  pendente: "bg-accent/15 text-accent-foreground border-accent/30",
  validado: "bg-success/12 text-success border-success/30",
  rejeitado: "bg-destructive/10 text-destructive border-destructive/25",
}

const JOB_TONES: Record<string, string> = {
  aberta: "bg-success/12 text-success border-success/30",
  fechada: "bg-destructive/10 text-destructive border-destructive/25",
  rascunho: "bg-secondary text-muted-foreground border-border",
}

const DOC_LABELS: Record<string, string> = {
  pendente: "Pendente",
  validado: "Validado",
  rejeitado: "Rejeitado",
}

const JOB_LABELS: Record<string, string> = {
  aberta: "Aberta",
  fechada: "Fechada",
  rascunho: "Rascunho",
}

function Pill({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        className,
      )}
    >
      {children}
    </span>
  )
}

export function ApplicationStatusBadge({ status }: { status: string }) {
  return (
    <Pill className={APPLICATION_TONES[status] ?? APPLICATION_TONES.recebida}>
      {statusLabel(status)}
    </Pill>
  )
}

export function DocumentStatusBadge({ status }: { status: string }) {
  return (
    <Pill className={DOC_TONES[status] ?? DOC_TONES.pendente}>
      {DOC_LABELS[status] ?? status}
    </Pill>
  )
}

export function JobStatusBadge({ status }: { status: string }) {
  return (
    <Pill className={JOB_TONES[status] ?? JOB_TONES.rascunho}>
      {JOB_LABELS[status] ?? status}
    </Pill>
  )
}
