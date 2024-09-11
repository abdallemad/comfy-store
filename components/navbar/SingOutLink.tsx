'use client'
import { useToast } from "@/hooks/use-toast"
import {SignOutButton} from '@clerk/nextjs'
import Link from "next/link"
const SingOutLink = () => {
  const {toast} = useToast()
  const handleLogout = ()=>{
    toast({
      description:'log out successful',
      variant:"destructive"
    })
  }
  return (
    <SignOutButton>
      <Link href={'/'} className="w-full text-left capitalize" onClick={handleLogout}>
        sing out
      </Link>
    </SignOutButton>
  )
}

export default SingOutLink
