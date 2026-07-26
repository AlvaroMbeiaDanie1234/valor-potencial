import { cn } from "@/lib/utils"
import { COMPANY } from "@/lib/constants"

type LogoProps = {
  className?: string
  /** "dark" renders light-coloured text for use on dark backgrounds */
  variant?: "light" | "dark"
  showText?: boolean
}

export function Logo({
  className,
  variant = "light",
  showText = true,
}: LogoProps) {
  const isOnDark = variant === "dark"

  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-md font-mono text-sm font-bold tracking-tight",
          isOnDark
            ? "bg-accent text-accent-foreground"
            : "bg-primary text-primary-foreground",
        )}
      >
        NVP
      </span>
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "text-sm font-semibold tracking-tight",
              isOnDark ? "text-sidebar-foreground" : "text-foreground",
            )}
          >
            Nome Valor Potencial
          </span>
          <span
            className={cn(
              "mt-0.5 text-[11px] font-medium uppercase tracking-widest",
              isOnDark ? "text-accent" : "text-muted-foreground",
            )}
          >
            Recrutamento Offshore
          </span>
        </span>
      )}
      <span className="sr-only">{COMPANY.name}</span>
    </span>
  )
}
