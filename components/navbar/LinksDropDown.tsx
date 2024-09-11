'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  // DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { LuAlignLeft } from 'react-icons/lu';
import Link from 'next/link';
import { Button } from '../ui/button';
import { links } from '@/utils/links';
import UserIcon from './UserIcon';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import SingOutLink from './SingOutLink';

const LinksDropDown = () => {
  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className='flex items-center gap-4 max-w-[100px]' variant={'outline'}>
        <LuAlignLeft className='h-6 w-6'/>
        <UserIcon />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='w-40' align='start' sideOffset={10}>
      {/* LINKS WHERE THERE IS NO USER */}
      <SignedOut>
        <DropdownMenuItem>
          <SignInButton mode="modal">
            <button className="w-full text-left">login</button>
          </SignInButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SignUpButton>
            <button className="w-full text-left">Register</button>
          </SignUpButton>
        </DropdownMenuItem>
      </SignedOut>
      {/* LINKS WHERE THERE IS USER */}
      <SignedIn>
        {links.map(link=>{
          return <DropdownMenuItem key={link.href} asChild>
            <Link href={link.href} className='w-full capitalize'>
            {link.label}
          </Link>
          </DropdownMenuItem>
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SingOutLink />
        </DropdownMenuItem>
      </SignedIn>
    </DropdownMenuContent>
  </DropdownMenu>
}

export default LinksDropDown
