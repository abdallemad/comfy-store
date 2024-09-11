import Link from "next/link"
import { Button } from "../ui/button"
import HeroCarousel from "./HeroCarousel"

function Hero() {
  return (
    <div className="grid lg:grid-cols-2 gap-24 items-center ">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
          we are changing the way people shop
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground  leading-8">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia eum assumenda omnis delectus doloremque a. Cumque harum accusamus quo vel expedita, corporis molestias voluptatibus consequuntur dolores molestiae cupiditate, repudiandae provident.
        </p>
        <Button asChild size={'lg'} className="mt-10 capitalize">
          <Link href={'/products'}>
          our products
          </Link>
        </Button>
      </div>
      <HeroCarousel />
    </div>
  )
}

export default Hero
