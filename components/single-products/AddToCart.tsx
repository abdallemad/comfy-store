import { Button } from '../ui/button';

function AddToCart({ productId }: { productId: string }) {
  return (
    <Button className='capitalize mt-8' size='lg'>
      add to cart <span className='hidden'>{productId}</span>
    </Button>
  );
}
export default AddToCart;
