'use client';
import { Button } from '../ui/button';
import { useState } from 'react';
import SelectProductAmount from './SelectProductAmount';
import { Mode } from './SelectProductAmount';
import FormContainer from '../form/FormContainer';
import { SubmitBtn } from '../form/Buttons';
import { addToCartAction } from '@/utils/actions';
import { useAuth } from '@clerk/nextjs';
import { ProductSignInButton } from '../form/Buttons';
function AddToCart({ productId }: { productId: string }) {
  const [amount, setAmount] = useState(1);
  const {userId} = useAuth()

  return (
    <div className="mt-4">
      <SelectProductAmount mode={Mode.SingleProduct} amount={amount} setAmount={setAmount}/>

      {
        userId?<FormContainer action={addToCartAction}>
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="amount" value={amount} />
          <SubmitBtn size='lg' text='add to cart' className='mt-4'/>
        </FormContainer>:<ProductSignInButton />
      }
    </div>
  );
}
export default AddToCart;
