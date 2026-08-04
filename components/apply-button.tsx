"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { applyToJob } from "@/lib/actions/vagas"
import { toast } from "sonner"
import { Loader2, Briefcase } from "lucide-react"

export function ApplyButton({ jobId }: { jobId: number }) {
  const [isPending, setIsPending] = useState(false)

  const handleApply = async () => {
    setIsPending(true)
    try {
      const res = await applyToJob(jobId)
      if (res.error) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao submeter a sua candidatura.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Button onClick={handleApply} disabled={isPending} size="lg" className="w-full sm:w-auto font-medium">
      {isPending ? (
        <Loader2 className="mr-2 size-5 animate-spin" />
      ) : (
        <Briefcase className="mr-2 size-5" />
      )}
      Candidatar-me a esta vaga
    </Button>
  )
}
