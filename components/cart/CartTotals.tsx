import { Card, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatePrice } from '@/utils/format';
import { createOrderAction } from '@/utils/actions';
import FormContainer from '../form/FormContainer';
import { SubmitBtn } from '../form/Buttons';
import { Cart } from '@prisma/client';

function CartTotals({cart}:{cart:Cart}) {
  const {cartTotal,orderTotal,shipping,tax} = cart
  return (
    <div>
      <Card className='bg-muted rounded-lg p-8'>
        <CartTotalRow amount={cartTotal} label='Sub Total'/>
        <CartTotalRow amount={shipping} label='Shipping'/>
        <CartTotalRow amount={tax} label='Tax'/>
        <CardTitle className='mt-8'>
          <CartTotalRow amount={orderTotal} label='Order Total' lastRow/>
        </CardTitle>
      </Card>
      <FormContainer action={createOrderAction}>
        <SubmitBtn text='Place Order' className='w-full mt-8'/>
      </FormContainer>
    </div>
  )
}
function CartTotalRow({label,amount,lastRow}:{label:string,amount:number,lastRow?:boolean}){
  return <>
    <p className="flex justify-between items-center text-sm">
      <span>{label}</span>
      {formatePrice(amount)}
    </p>
    {
      !lastRow && <Separator className='my-2' />
    }
  </>
}
export default CartTotals
