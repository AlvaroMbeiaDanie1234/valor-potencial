import Link from "next/link"
import { LucideIcon } from "lucide-react"

interface CategoryCardProps {
  title: string
  icon: LucideIcon
  jobCount?: number
  href: string
}

export function CategoryCard({ title, icon: Icon, jobCount, href }: CategoryCardProps) {
  return (
    <Link 
      href={href}
      className="group flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex size-16 items-center justify-center rounded-full bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-8" strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{title}</h3>
        {jobCount !== undefined && (
          <p className="mt-1 text-sm text-muted-foreground">
            {jobCount} {jobCount === 1 ? "vaga" : "vagas"}
          </p>
        )}
      </div>
    </Link>
  )
}
