'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover'
import { Button } from '../ui/button';
import { LuShare2 } from 'react-icons/lu';

import {
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
} from 'react-share';

function ShareButton({productId,name}:{productId:string,name:string}) {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const remoteUrl  = `${url}/products/${productId}`
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='icon' className='p-2'>
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent side='top' align='end' sideOffset={10} className='flex items-center gap-2 justify-center w-full'>
        <TwitterShareButton url={remoteUrl} name={name}>
          <TwitterIcon size={32} round/>
        </TwitterShareButton>
        <EmailShareButton url={remoteUrl} name={name}>
          <EmailIcon size={32} round/>
        </EmailShareButton>
        <LinkedinShareButton url={remoteUrl} name={name}>
          <LinkedinIcon size={32} round/>
        </LinkedinShareButton>
      </PopoverContent>
    </Popover>
  )
}

export default ShareButton
