import { Card, CardContent } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
function LoadingContainer() {
  return (
    <div className="pt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({length:3},(_,index)=>{
        return <Card key={index}>
          <CardContent>
          <Skeleton className="w-ful h-48 mt-4"/>
          <Skeleton className="w-3/4 h-4 mt-3"/>
          <Skeleton className="w-1/4 h-4 mt-1"/>
          </CardContent>
        </Card>
      })}
    </div>
  )
}

export default LoadingContainer
