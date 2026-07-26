"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EXPERIENCE_LEVELS } from "@/lib/constants"

const ALL = "__all__"

export function JobFilters({
  categories,
  locations,
}: {
  categories: string[]
  locations: string[]
}) {
  const router = useRouter()
  const params = useSearchParams()

  const q = params.get("q") ?? ""
  const category = params.get("category") ?? ""
  const location = params.get("location") ?? ""
  const experience = params.get("experience") ?? ""
  const hasFilters = Boolean(q || category || location || experience)

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString())
    if (!value || value === ALL) next.delete(key)
    else next.set(key, value)
    router.push(`/vagas?${next.toString()}`)
  }

  function onSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = new FormData(event.currentTarget).get("q")
    update("q", typeof value === "string" ? value : "")
  }

  return (
    <aside
      aria-label="Filtros de pesquisa"
      className="flex flex-col gap-6 rounded-lg border border-border bg-card p-5"
    >
      <form onSubmit={onSearch} className="flex flex-col gap-2">
        <Label htmlFor="filter-q">Pesquisar</Label>
        <div className="flex gap-2">
          <Input
            id="filter-q"
            name="q"
            defaultValue={q}
            placeholder="Cargo ou palavra-chave"
          />
          <Button type="submit" size="icon" aria-label="Pesquisar vagas">
            <Search className="size-4" />
          </Button>
        </div>
      </form>

      <div className="flex flex-col gap-2">
        <Label htmlFor="filter-category">Area profissional</Label>
        <Select
          value={category || ALL}
          onValueChange={(value) => update("category", value)}
        >
          <SelectTrigger id="filter-category" className="w-full">
            <SelectValue placeholder="Todas as areas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Todas as areas</SelectItem>
            {categories.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="filter-location">Localizacao</Label>
        <Select
          value={location || ALL}
          onValueChange={(value) => update("location", value)}
        >
          <SelectTrigger id="filter-location" className="w-full">
            <SelectValue placeholder="Todas as localizacoes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Todas as localizacoes</SelectItem>
            {locations.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="filter-experience">Nivel de experiencia</Label>
        <Select
          value={experience || ALL}
          onValueChange={(value) => update("experience", value)}
        >
          <SelectTrigger id="filter-experience" className="w-full">
            <SelectValue placeholder="Todos os niveis" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Todos os niveis</SelectItem>
            {EXPERIENCE_LEVELS.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasFilters && (
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push("/vagas")}
        >
          <X className="size-4" />
          Limpar filtros
        </Button>
      )}
    </aside>
  )
}
