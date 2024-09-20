'use client'
import { Card } from '@/components/ui/card';
import { FirstColumn, SecondColumn, FourthColumn } from './CartItemsColumn';
import ThirdColumn from './ThirdColumn';
import { CartItemWithProduct } from '@/utils/types';
// import { formatePrice } from '@/utils/format';

function CartItemsList({cartItems}:{cartItems:CartItemWithProduct[]}) {
  return (
    <div>
      {
        cartItems.map(item=>{
          const {id,amount,product:{price,image,name,id:productId,company}} = item
          return <Card key={id} className='flex flex-col md:flex-row gap-y-4 flex-wrap p-6 mb-8 gap-x-4'>
            <FirstColumn image={image} name={name} />
            <SecondColumn company={company} name={name} productId={productId} />
            <ThirdColumn id={id} quantity={amount}/>
            <FourthColumn price={price} />
          </Card>
        })
      }
    </div>
  )
}

export default CartItemsList
