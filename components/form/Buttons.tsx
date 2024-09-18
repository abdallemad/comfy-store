'use client';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SignInButton } from '@clerk/nextjs';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { LuTrash2, LuPenSquare } from 'react-icons/lu';

type btnSize = 'default' | 'lg' | 'sm';

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};

export function SubmitBtn({className ='', text ='submit',size ='lg'}:SubmitButtonProps){
  const {pending} = useFormStatus();
  return <Button type='submit' disabled={pending} className={cn('capitalize',className)}>
    {pending?<>
    <ReloadIcon className='mr-2 h-4 w-4 animate-spin'/>
    please wait...
    </>:text
    }
  </Button>
}

type ActionType = 'edit' | 'delete';

export function IconButton({actionType}:{actionType:ActionType}){
  const {pending} = useFormStatus();
  const renderIcon= ()=>{
    switch(actionType){
      case 'delete':
        return <LuTrash2  className='h-6 w-6'/>
      case 'edit':
        return <LuPenSquare className='h-6 w-6'/>
      default:
        const never:never = actionType
        throw new Error(`invalid type: ${never}`)
    }
  }

  return <Button type='submit' size='icon' variant='link' className='p-2 cursor-pointer' disabled={pending}>
    {pending?<ReloadIcon className='animate-spin'/>:renderIcon()}
  </Button>
}


export const CardSingInButton = ({className}:{className?:string})=>{
  return <SignInButton mode='modal'>
    <Button type='submit' size='icon' variant='outline' asChild className={cn('p-2 cursor-pointer',className)}>
      <FaRegHeart />
    </Button>
  </SignInButton>
}
export const CardSubmitButton = ({isFavorite,className}:{isFavorite:boolean,className:string})=>{
  const {pending} = useFormStatus()
  return <Button type='submit' size='icon' variant='outline' className={cn('p-2 cursor-pointer',className)}>
    {
      pending?<ReloadIcon className='animate-spin'/>
      :isFavorite?<FaHeart />
      :<FaRegHeart />
    }
  </Button>
}
export const ProductSignInButton = () => {
  return (
    <SignInButton mode='modal'>
      <Button type='button' size='default' className='mt-8 capitalize'>
        Sign In
      </Button>
    </SignInButton>
  );
};