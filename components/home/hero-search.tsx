import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function HeroSearch() {
  return (
    <form
      action="/vagas"
      className="flex w-full flex-col gap-3 rounded-2xl border border-border/50 bg-background/95 p-3 shadow-xl backdrop-blur-xl sm:flex-row sm:items-center sm:rounded-full sm:p-2 max-w-4xl mx-auto mt-8"
    >
      <div className="flex flex-1 items-center gap-2 px-3">
        <Search className="size-5 text-muted-foreground shrink-0" />
        <Input
          id="hero-search"
          name="q"
          placeholder="Cargo, palavra-chave ou empresa"
          className="h-12 border-0 bg-transparent text-base shadow-none focus-visible:ring-0 px-1"
        />
      </div>
      
      <div className="hidden sm:block h-8 w-px bg-border/60 shrink-0" />
      
      <div className="flex flex-1 items-center gap-2 px-3 border-t sm:border-t-0 pt-3 sm:pt-0">
        <MapPin className="size-5 text-muted-foreground shrink-0" />
        <Input
          id="hero-location"
          name="location"
          placeholder="Localização (ex: Luanda)"
          className="h-12 border-0 bg-transparent text-base shadow-none focus-visible:ring-0 px-1"
        />
      </div>
      
      <Button type="submit" size="lg" className="h-12 shrink-0 rounded-xl sm:rounded-full px-8 text-base shadow-md">
        Pesquisar Vagas
      </Button>
    </form>
  )
}
