import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { AuthForm } from "@/components/auth-form"
import { AuthShell } from "@/components/auth-shell"
import { getCurrentUser } from "@/lib/session"

export const metadata: Metadata = {
  title: "Criar conta",
  description:
    "Registe-se no portal da Nome Valor Potencial e candidate-se a vagas offshore em Angola.",
}

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const { next } = await searchParams
  const user = await getCurrentUser()

  if (user) redirect(user.role === "admin" ? "/admin" : "/painel")

  return (
    <AuthShell
      title="Criar a sua conta de candidato"
      subtitle="Registe-se para construir o seu perfil profissional, enviar documentos e candidatar-se as vagas disponiveis."
    >
      <AuthForm mode="sign-up" next={next} />
    </AuthShell>
  )
}
