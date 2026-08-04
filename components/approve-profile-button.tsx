"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { approveCandidateProfile } from "@/lib/actions/candidato"
import { toast } from "sonner"

export function ApproveProfileButton({ candidateId }: { candidateId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const handleApprove = async (withInterview: boolean) => {
    setIsPending(true)
    try {
      await approveCandidateProfile(candidateId)
      setIsOpen(false)
      
      if (withInterview) {
        toast.success("Perfil aprovado! Lembre-se de contactar o candidato para agendar a entrevista.")
      } else {
        toast.success("Perfil aprovado com sucesso.")
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao aprovar o perfil.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2">
          <CheckCircle className="size-4" /> Aprovar Perfil
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Aprovar Candidato</DialogTitle>
          <DialogDescription>
            O perfil deste candidato passará a estar <strong>Verificado</strong> e ele poderá candidatar-se às vagas.
            <br /><br />
            <strong>Nota:</strong> Pretende chamar este candidato para uma entrevista em breve?
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex-col sm:flex-row gap-2 sm:justify-between mt-4">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => handleApprove(false)}
          >
            Apenas Aprovar
          </Button>
          <Button
            type="button"
            disabled={isPending}
            onClick={() => handleApprove(true)}
          >
            Aprovar e Agendar Entrevista
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
