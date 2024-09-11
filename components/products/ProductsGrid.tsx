import { Product } from "@prisma/client"
import { formatePrice } from "@/utils/format"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent} from "../ui/card"
import FavoriteToggleButton from "./FavoriteToggleButton"
const ProductsGrid = ({products}:{products:Product[]}) => {
  return (
    <div className="pt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(product=>{
        const {name,image,price} = product
        const productId = product.id
        const formatPrice = formatePrice(price);
        return <article key={productId} className="group relative">
          <FavoriteToggleButton productId={productId} className="absolute top-8 right-8 z-20" />
          <FavoriteToggleButton productId={productId} className="absolute top-4 right-4" />
          <Link href={`/products/${productId}`}>
            <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
              <CardContent className="p-4">
                <div className="relative h-64 md:h-48 rounded overflow-hidden">
                  <Image 
                    src={image} 
                    alt={name} 
                    priority 
                    fill 
                    sizes="(max-width:786px) 100vw, (max-width:1200px) 50vw, 33vw" 
                    className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"/>
                </div>
                <div className="mt-4 text-center">
                  <h2 className="capitalize text-lg">{name}</h2>
                  <p className="text-muted-foreground mt-2">{formatPrice}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </article>
      })}
    </div>
  )
}

export default ProductsGrid
