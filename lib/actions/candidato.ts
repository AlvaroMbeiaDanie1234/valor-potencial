"use server"

import { requireUser } from "@/lib/session"
import { db } from "@/lib/db"
import { candidateProfiles, documents } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import { put } from "@vercel/blob"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function consultarBI(bi: string) {
  try {
    const res = await fetch(`https://consulta.edgarsingui.ao/consultar/${bi}`)
    if (!res.ok) {
      return { error: true, message: "Não foi possível consultar este BI." }
    }
    const data = await res.json()
    return data
  } catch (error) {
    return { error: true, message: "Erro de ligação ao consultar o BI." }
  }
}

export async function submitCandidateProfile(formData: FormData) {
  const user = await requireUser()

  const idNumber = formData.get("idNumber") as string
  const fullName = formData.get("fullName") as string
  const address = formData.get("address") as string
  const birthDate = formData.get("birthDate") as string
  const phone = formData.get("phone") as string

  // Handle files
  const fileUploads = [
    { type: "foto_perfil", file: formData.get("foto_perfil") as File },
    { type: "bi_doc", file: formData.get("bi_doc") as File },
    { type: "certificado", file: formData.get("certificado") as File },
    { type: "cv", file: formData.get("cv") as File },
  ]

  // Update or insert candidate profile
  const existingProfile = await db
    .select()
    .from(candidateProfiles)
    .where(eq(candidateProfiles.userId, user.id))

  let profileId = 0
  if (existingProfile.length > 0) {
    const [updated] = await db
      .update(candidateProfiles)
      .set({
        idNumber,
        fullName,
        address,
        birthDate,
        phone,
        verificationStatus: "pendente_verificacao",
      })
      .where(eq(candidateProfiles.userId, user.id))
      .returning()
    profileId = updated.id
  } else {
    const [inserted] = await db
      .insert(candidateProfiles)
      .values({
        userId: user.id,
        idNumber,
        fullName,
        address,
        birthDate,
        phone,
        verificationStatus: "pendente_verificacao",
      })
      .returning()
    profileId = inserted.id
  }

  // Upload files and save document records
  for (const { type, file } of fileUploads) {
    if (file && file.size > 0) {
      const blob = await put(`${user.id}-${type}-${file.name}`, file, {
        access: 'private',
      })
      
      await db.insert(documents).values({
        userId: user.id,
        docType: type,
        fileName: file.name,
        pathname: blob.url,
        contentType: file.type,
        size: file.size,
        status: "pendente"
      })
    }
  }

  revalidatePath("/painel/perfil")
  redirect("/painel/perfil")
}

export async function approveCandidateProfile(userId: string, withInterview: boolean = false) {
  await requireAdminUser()
  await db
    .update(candidateProfiles)
    .set({ 
      verificationStatus: "verificado",
      interviewScheduled: withInterview 
    })
    .where(eq(candidateProfiles.userId, userId))
  revalidatePath(`/admin/candidatos/${userId}`)
  revalidatePath(`/admin/candidatos`)
}

export async function rejectCandidateProfile(userId: string) {
  await db.update(candidateProfiles).set({ verificationStatus: "rejeitado" }).where(eq(candidateProfiles.userId, userId))
  revalidatePath(`/admin/candidatos/${userId}`)
  revalidatePath(`/admin/candidatos`)
}

export async function uploadSingleDocument(formData: FormData) {
  const user = await requireUser()
  const docType = formData.get("docType") as string
  const file = formData.get("file") as File

  if (!file || file.size === 0) {
    return { error: true, message: "Nenhum ficheiro selecionado." }
  }

  try {
    const blob = await put(`${user.id}-${docType}-${file.name}`, file, {
      access: 'private',
    })

    // Check if document of this type already exists
    const existing = await db.select().from(documents).where(and(eq(documents.userId, user.id), eq(documents.docType, docType)))
    
    if (existing.length > 0) {
      await db.update(documents).set({
        fileName: file.name,
        pathname: blob.url,
        contentType: file.type,
        size: file.size,
        createdAt: new Date(),
      }).where(eq(documents.id, existing[0].id))
    } else {
      await db.insert(documents).values({
        userId: user.id,
        docType: docType,
        fileName: file.name,
        pathname: blob.url,
        contentType: file.type,
        size: file.size,
      })
    }

    revalidatePath("/painel/documentos")
    return { error: false, message: "Documento guardado com sucesso!" }
  } catch (err) {
    return { error: true, message: "Erro ao guardar documento." }
  }
}
