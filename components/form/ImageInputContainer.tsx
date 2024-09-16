'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import FormContainer from './FormContainer';
import ImageInput from './ImageInput';
import { SubmitBtn } from './Buttons';
import { type actionFunction } from '@/utils/types';

type ImageInputContainerProps = {
  image: string;
  name: string;
  action: actionFunction;
  text: string;
  children?: React.ReactNode;
};
const ImageInputContainer = (props:ImageInputContainerProps) => {
  const {name,image,action,text} = props;
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false)
  return (
    <div className='mb-8'>
      <Image 
        src={image} 
        alt={name} 
        width={320} 
        height={320} 
        priority 
        className='object-cover rounded mb-4 w-[200px] h-[200px]' 
        />
      <Button variant='outline' size='sm' onClick={()=> setUpdateFormVisible(prev=>!prev)}>{text}</Button>
      {
      isUpdateFormVisible 
        &&
        <div className='max-w-md mt-4 '>
          <FormContainer action={action}>
            {props.children}
            <ImageInput />
            <SubmitBtn  size='sm' text={text}/>
          </FormContainer>
        </div>
        }
    </div>
  )
}

export default ImageInputContainer
