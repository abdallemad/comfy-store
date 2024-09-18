import { FaStar, FaRegStar } from 'react-icons/fa';

function Rating({rating}:{rating:number}) {
  const starts = Array.from({length:5},(_,i)=>i+1 <=rating)
  return (
    <div className='flex items-center gap-x-1'>
      {
        starts.map((isFilled,index)=>{
          const className = `h-3 w-3 ${isFilled? 'text-primary':'text-gray-400'}`
          return isFilled? <FaStar className={className} key={index}/>:<FaRegStar className={className} key={index}/>
        })
      }
    </div>
  )
}

export default Rating
