import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants, type ButtonProps } from "@/components/ui/button"

interface ContactProps {
  variant: ButtonProps["variant"]
  size: ButtonProps["size"]
}

export default function Contact({ variant, size }: ContactProps) {
  return (
    <Link
      href="/"
      className={cn(
        buttonVariants({
          variant,
          size,
        }),
      )}
    >
      Contact
    </Link>
  )
}
