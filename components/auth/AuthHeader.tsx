"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AuthHeader() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-10 w-full border-b border-slate6 bg-slate1/80 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
       
      </div>
    </header>
  )
}
