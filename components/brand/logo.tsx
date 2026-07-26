import { cn } from "@/lib/utils"
import { COMPANY } from "@/lib/constants"
import Image from "next/image"

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
      <Image
        src="/logo.png"
        alt={COMPANY.name}
        width={110}
        height={30}
        className={cn(
          "object-contain transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-100",
          isOnDark ? "brightness-0 invert opacity-90" : "opacity-95",
        )}
      />
      <span className="sr-only">{COMPANY.name}</span>
    </span>
  )
}
