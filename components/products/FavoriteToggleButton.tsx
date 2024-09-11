import { Button } from "../ui/button"
import {FaHeart} from 'react-icons/fa'
import { cn } from "@/lib/utils"
const FavoriteToggleButton = ({className,productId}:{className?:string,productId:string}) => {
  
  return (
    <Button size={'icon'} variant={'outline'} className={cn("p-2 cursor-pointer",className )}>
      <FaHeart /> <span className="hidden">{productId}</span>
    </Button>
  )
}

export default FavoriteToggleButton
