import { cn } from "@/lib/utils"

type ContainerProps = {
  children:React.ReactNode,
  className?:string,
}
const Container = ({children,className}:ContainerProps) => {
  return (
    <div className={cn('max-w-6xl mx-auto px-8 xl:max-w-7xl ',className)}>
      {children}
    </div>
  )
}

export default Container
