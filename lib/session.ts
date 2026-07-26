import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export type SessionUser = {
  id: string
  name: string
  email: string
  role: string
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return null
  const u = session.user as unknown as SessionUser
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role ?? "candidate",
  }
}

/** Throws for use inside server actions. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser()
  if (!user) throw new Error("Nao autenticado")
  return user
}

export async function requireAdminUser(): Promise<SessionUser> {
  const user = await requireUser()
  if (user.role !== "admin") throw new Error("Acesso restrito a administradores")
  return user
}

/** Redirects for use inside pages. */
export async function requireUserPage(next = "/painel"): Promise<SessionUser> {
  const user = await getCurrentUser()
  if (!user) redirect(`/entrar?next=${encodeURIComponent(next)}`)
  return user
}

export async function requireAdminPage(): Promise<SessionUser> {
  const user = await getCurrentUser()
  if (!user) redirect("/entrar?next=%2Fadmin")
  if (user.role !== "admin") redirect("/painel")
  return user
}
