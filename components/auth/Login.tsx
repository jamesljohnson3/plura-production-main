import Link from "next/link"
import { cn } from "../../lib/utils"
import { buttonVariants, type ButtonProps } from "../ui/button"

interface LoginProps {
  variant: ButtonProps["variant"]
  size: ButtonProps["size"]
}

export default function Login({ variant, size }: LoginProps) {
  return (
    <Link
      href="/login"
      className={cn(
        buttonVariants({
          variant,
          size,
        }),
      )}
    >
      Log In
    </Link>
  )
}
