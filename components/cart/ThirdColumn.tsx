'use client';
import { useState } from 'react';
import SelectProductAmount from '../single-products/SelectProductAmount';
import { Mode } from '../single-products/SelectProductAmount';
import FormContainer from '../form/FormContainer';
import { SubmitBtn } from '../form/Buttons';
import { removeCartItemAction, updateCartItemAction } from '@/utils/actions';
import { useToast } from '@/hooks/use-toast';

function ThirdColumn({id,quantity}:{id:string,quantity:number}) {
  const [amount, setAmount] = useState(quantity);
  const [isLoading,setIsLoading] = useState(false);
  const {toast} = useToast();
  const handleAmountChange = async(value:number) =>{
    setIsLoading(true)
    toast({
      description:'calculating...'
    })
    const result = await  updateCartItemAction({amount:value,cartItemId:id})
    setIsLoading(false);
    setAmount(value)
    toast({
      description:result.message
    })
  }
  return (
    <div className='md:ml-8'>
      <SelectProductAmount 
        amount={amount}  
        setAmount={handleAmountChange} 
        mode={Mode.CartItem} 
        isLoading={isLoading}/>
        <FormContainer action={removeCartItemAction}>
          <input type="hidden" name="id" value={id} />
          <SubmitBtn size='sm' className='mt-4' text='remove'/>
        </FormContainer>
    </div>
  )
}

export default ThirdColumn
