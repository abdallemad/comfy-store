'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { adminLinks } from "@/utils/links"
import { cn } from "@/lib/utils"
const Sidebar = ({className}:{className?:string}) => {
  const pathname = usePathname()

  return (
    <aside className={cn(className)}>
      {adminLinks.map(link=>{
        const isActive = pathname === link.href
        return <Button key={link.href} variant={isActive?'default':'ghost'} asChild className="w-full mb-2 capitalize font-normal">
          <Link href={link.href}>{link.label}</Link>
        </Button>
      })}
    </aside>
  )
}

export default Sidebar
