import Link from "next/link"
import {
  ArrowUpRight,
  Briefcase,
  CalendarClock,
  MapPin,
  RefreshCw,
  Users,
} from "lucide-react"
import type { Job } from "@/lib/db/schema"
import { formatDate } from "@/lib/constants"

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="group relative flex flex-col gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-primary/8 px-2.5 py-0.5 text-xs font-medium text-primary">
              {job.category}
            </span>
            {job.featured && (
              <span className="inline-flex items-center rounded-full bg-accent/18 px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
                Destaque
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-balance">
            <Link href={`/vagas/${job.slug}`}>
              <span className="absolute inset-0" aria-hidden="true" />
              {job.title}
            </Link>
          </h3>
        </div>
        <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>

      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {job.summary}
      </p>

      <dl className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Localizacao</dt>
          <MapPin className="size-3.5" aria-hidden="true" />
          <dd>{job.location}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Tipo de contrato</dt>
          <Briefcase className="size-3.5" aria-hidden="true" />
          <dd>{job.contractType}</dd>
        </div>
        {job.rotation && (
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Regime de rotacao</dt>
            <RefreshCw className="size-3.5" aria-hidden="true" />
            <dd>{job.rotation}</dd>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Numero de vagas</dt>
          <Users className="size-3.5" aria-hidden="true" />
          <dd>
            {job.vacancies} {job.vacancies === 1 ? "vaga" : "vagas"}
          </dd>
        </div>
        {job.deadline && (
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Prazo de candidatura</dt>
            <CalendarClock className="size-3.5" aria-hidden="true" />
            <dd>Ate {formatDate(job.deadline)}</dd>
          </div>
        )}
      </dl>
    </article>
  )
}
