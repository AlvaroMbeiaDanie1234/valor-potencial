import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { AuthForm } from "@/components/auth-form"
import { AuthShell } from "@/components/auth-shell"
import { getCurrentUser } from "@/lib/session"

export const metadata: Metadata = {
  title: "Entrar",
  description:
    "Acesse a sua conta no portal de recrutamento da Valor Potencial.",
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const { next } = await searchParams
  const user = await getCurrentUser()

  if (user) redirect(user.role === "admin" ? "/admin" : "/painel")

  return (
    <AuthShell
      title="Entrar na sua conta"
      subtitle="Acesse o seu perfil para submeter candidaturas e acompanhar os processos em curso."
    >
      <AuthForm mode="sign-in" next={next} />
    </AuthShell>
  )
}
