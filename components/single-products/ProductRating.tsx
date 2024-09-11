import { FaStar } from "react-icons/fa"
const ProductsRating = ({productId}:{productId:string}) => {
  //hard codeing
  const ratting = 4.3;
  const count =5;
  const className = `flex gap-1 items-center  text-md mt-1 mb-4`;
  const countValue = `${count} reviews`
  return (
    <span className={className}>
      <FaStar className="w-3 h-3"/>
      {ratting} {countValue} <span className="hidden">{productId}</span>
    </span>
  )
}

export default ProductsRating
