"use client"

import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth-client"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function LogoutButton({ variant = "ghost", className }: { variant?: any, className?: string }) {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    toast.success("Sessão terminada com sucesso.")
    router.push("/")
    router.refresh()
  }

  return (
    <Button 
      variant={variant} 
      size="sm" 
      onClick={handleLogout}
      className={cn("w-full justify-start md:justify-center md:w-auto", className)}
    >
      <LogOut className="size-4 mr-2" />
      Sair
    </Button>
  )
}
