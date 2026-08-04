"use server"

import { requireAdminUser } from "@/lib/session"
import { db } from "@/lib/db"
import { jobs } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createJob(formData: FormData) {
  const admin = await requireAdminUser()

  const title = formData.get("title") as string
  const category = formData.get("category") as string
  const location = formData.get("location") as string
  const contractType = formData.get("contractType") as string
  const salaryRange = formData.get("salaryRange") as string
  const experienceLevel = formData.get("experienceLevel") as string
  const vacancies = Number(formData.get("vacancies") || 1)
  const summary = formData.get("summary") as string
  const description = formData.get("description") as string
  const requirements = formData.get("requirements") as string
  const benefits = formData.get("benefits") as string
  const featured = formData.get("featured") === "on"

  // Generates a slug from the title
  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    + "-" + Math.random().toString(36).substring(2, 6)

  await db.insert(jobs).values({
    title,
    slug,
    category,
    location,
    contractType,
    salaryRange,
    experienceLevel,
    vacancies,
    summary,
    description,
    requirements,
    benefits,
    featured,
    status: "aberta",
    createdBy: admin.id,
  })

  revalidatePath("/admin/vagas")
  redirect("/admin/vagas")
}

export async function deleteJob(id: number) {
  await requireAdminUser()
  await db.delete(jobs).where(eq(jobs.id, id))
  revalidatePath("/admin/vagas")
}

export async function toggleJobStatus(id: number, currentStatus: string) {
  await requireAdminUser()
  const newStatus = currentStatus === "aberta" ? "encerrada" : "aberta"
  await db.update(jobs).set({ status: newStatus }).where(eq(jobs.id, id))
  revalidatePath("/admin/vagas")
}

import { requireUser } from "@/lib/session"
import { applications, candidateProfiles } from "@/lib/db/schema"
import { and } from "drizzle-orm"

export async function applyToJob(jobId: number) {
  const user = await requireUser()

  // Verify if candidate profile is verified
  const existingProfiles = await db.select().from(candidateProfiles).where(eq(candidateProfiles.userId, user.id))
  if (existingProfiles.length === 0 || existingProfiles[0].verificationStatus !== "verificado") {
    return { error: true, message: "O seu perfil ainda não foi verificado. Apenas perfis validados podem submeter candidaturas." }
  }

  // Verify if already applied
  const existingApp = await db.select().from(applications).where(and(eq(applications.userId, user.id), eq(applications.jobId, jobId)))
  if (existingApp.length > 0) {
    return { error: true, message: "Já submeteu candidatura para esta vaga." }
  }

  await db.insert(applications).values({
    jobId,
    userId: user.id,
    status: "recebida",
  })
  
  revalidatePath("/painel/candidaturas")
  revalidatePath(`/vagas`)
  return { error: false, message: "Candidatura submetida com sucesso!" }
}
