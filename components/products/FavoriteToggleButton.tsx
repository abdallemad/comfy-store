import { Button } from "../ui/button"
import {FaHeart,FaRegHeart} from 'react-icons/fa'
import { cn } from "@/lib/utils"
import { auth } from "@clerk/nextjs/server"
import { CardSingInButton } from "../form/Buttons"
import { fetchFavoriteId } from "@/utils/actions"
import FavoriteToggleForm from "./FavoriteToggleForm"
const FavoriteToggleButton = async ({className,productId}:{className?:string,productId:string}) => {

  const {userId} = auth();
  
  if(!userId) return <CardSingInButton className={className}/>
  const favoriteId =await fetchFavoriteId({productId})
  return (
    <FavoriteToggleForm favoriteId={favoriteId} productId={productId} className={className}>
    </FavoriteToggleForm>
  )
}

export default FavoriteToggleButton
