'use client'
import { LuUser2 } from "react-icons/lu"
import { useUser } from "@clerk/nextjs"
const UserIcon = () => {
  const {user,isLoaded} = useUser();
  // console.log(user?.imageUrl)
  if(!isLoaded){
    return null
  }
  if(user?.imageUrl) return <img src={user?.imageUrl} alt="some text" className="h-6 w-6 object-cover rounded-full"/>

  else return <LuUser2 className="h-6 w-6 bg-primary text-white rounded-full text-sm"/>
}

export default UserIcon
