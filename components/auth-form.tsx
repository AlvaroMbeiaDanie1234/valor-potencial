"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

type AuthFormProps = {
  mode: "sign-in" | "sign-up"
  next?: string
}

export function AuthForm({ mode, next }: AuthFormProps) {
  const router = useRouter()
  const isSignUp = mode === "sign-up"

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (isSignUp && password.length < 8) {
      setError("A palavra-passe deve ter pelo menos 8 caracteres.")
      return
    }

    setPending(true)
    try {
      const result = isSignUp
        ? await authClient.signUp.email({ email, password, name })
        : await authClient.signIn.email({ email, password })

      if (result.error) {
        setError(
          isSignUp
            ? "Nao foi possivel criar a conta. Este email pode ja estar registado."
            : "Email ou palavra-passe incorrectos.",
        )
        return
      }

      router.push(next && next.startsWith("/") ? next : "/painel")
      router.refresh()
    } catch {
      setError("Ocorreu um erro de ligacao. Tente novamente.")
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isSignUp && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            placeholder="Ex.: Joao Domingos Ferreira"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="nome@exemplo.co.ao"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Palavra-passe</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete={isSignUp ? "new-password" : "current-password"}
          required
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && (
          <p className="text-xs text-muted-foreground">
            Minimo de 8 caracteres.
          </p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending && <Loader2 className="size-4 animate-spin" />}
        {isSignUp ? "Criar conta" : "Entrar"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {isSignUp ? "Ja tem conta? " : "Ainda nao tem conta? "}
        <Link
          href={isSignUp ? "/entrar" : "/registar"}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          {isSignUp ? "Entrar" : "Registe-se gratuitamente"}
        </Link>
      </p>
    </form>
  )
}
