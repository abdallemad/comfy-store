'use server'
import Link from "next/link"
import { Button } from "../ui/button"
import {LuShoppingCart} from 'react-icons/lu'
const CartButton = async () => {
  //temp
  const numItemInCart = 9

  return <Button asChild variant={'outline'} size={'icon'} className="gird place-items-center relative">
    <Link href={'/cart'}>
      <LuShoppingCart />
      <span className="absolute -top-3 -right-3 bg-primary text-white rounded-full h-6 w-6 grid place-items-center">
        {numItemInCart}
      </span>
    </Link>
  </Button>
}

export default CartButton
