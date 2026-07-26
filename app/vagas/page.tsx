import { Suspense } from "react"
import { Metadata } from "next"
import { JobCard } from "@/components/job-card"
import { JobFilters } from "@/components/job-filters"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { COMPANY } from "@/lib/constants"
import { getJobFacets, listOpenJobs } from "@/lib/queries/jobs"

export const metadata: Metadata = {
  title: `Vagas Disponíveis | ${COMPANY.name}`,
  description: "Consulte as vagas abertas e submeta a sua candidatura.",
}

export default async function VagasPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const q = typeof searchParams.q === "string" ? searchParams.q : undefined
  const category =
    typeof searchParams.category === "string"
      ? searchParams.category
      : undefined
  const location =
    typeof searchParams.location === "string"
      ? searchParams.location
      : undefined
  const experience =
    typeof searchParams.experience === "string"
      ? searchParams.experience
      : undefined

  const [jobs, facets] = await Promise.all([
    listOpenJobs({ q, category, location, experience }),
    getJobFacets(),
  ])

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-secondary/30 pb-20 pt-10">
        <div className="mx-auto w-full max-w-7xl px-5">
          <div className="mb-8 flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Vagas Disponíveis
            </h1>
            <p className="text-muted-foreground">
              Encontramos {jobs.length} {jobs.length === 1 ? "vaga" : "vagas"}{" "}
              abertas.
            </p>
          </div>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-4">
            <div className="lg:sticky lg:top-24 lg:col-span-1">
              <Suspense fallback={<div className="h-96 rounded-lg border border-border bg-card p-5" />}>
                <JobFilters
                  categories={facets.categories}
                  locations={facets.locations}
                />
              </Suspense>
            </div>
            <div className="lg:col-span-3">
              {jobs.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-card p-12 text-center">
                  <h3 className="text-lg font-medium">Nenhuma vaga encontrada</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Tente ajustar os seus filtros de pesquisa para encontrar mais
                    resultados.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
