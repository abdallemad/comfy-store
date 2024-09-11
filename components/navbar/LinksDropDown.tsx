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

const LinksDropDown = () => {
  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className='flex items-center gap-4 max-w-[100px]' variant={'outline'}>
        <LuAlignLeft className='h-6 w-6'/>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='w-40' align='start' sideOffset={10}>
      {links.map(link=>{
        return <DropdownMenuItem key={link.href} asChild>
          <Link href={link.href} className='w-full capitalize'>
          {link.label}
        </Link>
        </DropdownMenuItem>
      })}
    </DropdownMenuContent>
  </DropdownMenu>
}

export default LinksDropDown
