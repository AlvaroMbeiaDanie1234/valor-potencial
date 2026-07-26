import { and, count, desc, eq, ilike, or, sql } from "drizzle-orm"
import { db } from "@/lib/db"
import { applications, jobs } from "@/lib/db/schema"

export type JobFilters = {
  q?: string
  category?: string
  location?: string
  experience?: string
}

/** Public listing — only open vacancies. */
export async function listOpenJobs(filters: JobFilters = {}) {
  const conditions = [eq(jobs.status, "aberta")]

  if (filters.q) {
    const term = `%${filters.q}%`
    const search = or(
      ilike(jobs.title, term),
      ilike(jobs.summary, term),
      ilike(jobs.category, term),
      ilike(jobs.location, term),
    )
    if (search) conditions.push(search)
  }
  if (filters.category) conditions.push(eq(jobs.category, filters.category))
  if (filters.location) conditions.push(eq(jobs.location, filters.location))
  if (filters.experience)
    conditions.push(eq(jobs.experienceLevel, filters.experience))

  return db
    .select()
    .from(jobs)
    .where(and(...conditions))
    .orderBy(desc(jobs.featured), desc(jobs.createdAt))
}

export async function getJobBySlug(slug: string) {
  const [job] = await db.select().from(jobs).where(eq(jobs.slug, slug)).limit(1)
  return job ?? null
}

export async function getJobById(id: number) {
  const [job] = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1)
  return job ?? null
}

/** Distinct filter values from currently open jobs. */
export async function getJobFacets() {
  const rows = await db
    .select({ category: jobs.category, location: jobs.location })
    .from(jobs)
    .where(eq(jobs.status, "aberta"))

  return {
    categories: [...new Set(rows.map((r) => r.category))].sort(),
    locations: [...new Set(rows.map((r) => r.location))].sort(),
  }
}

export async function getPublicStats() {
  const [openJobs] = await db
    .select({ value: count() })
    .from(jobs)
    .where(eq(jobs.status, "aberta"))

  const [totalApplications] = await db
    .select({ value: count() })
    .from(applications)

  const [totalVacancies] = await db
    .select({ value: sql<number>`coalesce(sum(${jobs.vacancies}), 0)::int` })
    .from(jobs)
    .where(eq(jobs.status, "aberta"))

  return {
    openJobs: openJobs?.value ?? 0,
    applications: totalApplications?.value ?? 0,
    vacancies: totalVacancies?.value ?? 0,
  }
}
