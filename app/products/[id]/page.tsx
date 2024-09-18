import Breadcrumbs from '@/components/single-products/Breadcrumbs';
import { fetchSingleProduct,findExistingReview } from '@/utils/actions';
import Image from 'next/image';
import { formatePrice } from '@/utils/format';
import FavoriteToggleButton from '@/components/products/FavoriteToggleButton';
import AddToCart from '@/components/single-products/AddToCart';
import ProductsRating from '@/components/single-products/ProductRating';
import ShareButton from '@/components/single-products/ShareButton'
import SubmitReview from '@/components/reviews/SubmitReview';
import ProductReviews from '@/components/reviews/ProductReviews';
import { auth } from '@clerk/nextjs/server';

const SingleProduct =async ({params}:{params:{id:string}}) => {
  const {id:productId} = params
  const {userId} = auth();
  const isExist = userId && !(await findExistingReview(userId,productId))
  // console.log(isExist);
  const product = await fetchSingleProduct({id:productId});
  const {name,image,price,company,description} = product;
  const dollarAmount = formatePrice(price);
  return (
    <section >
      <Breadcrumbs productName={name} />
      <div className="grid md:grid-cols-2 gap-y-8 gap-8 lg:gap-x-16 mt-6">
        {/* REMOTE IMAGE */}
        <div className="relative h-full min-h-64 w-full">
          <Image 
            src={image} 
            alt={name}
            fill
            priority
            className='object-cover w-full rounded'
            sizes='(max-width:786px) 100vw, (max-width:1200px) 50vw, 33vw' />
        </div>
        {/* INFO */}
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold">{name}</h1>
            
            <div className="flex gap-4 items-center">
              <FavoriteToggleButton productId={productId} />
              <ShareButton name={product.name} productId={params.id}/>
            </div>
          </div>
          <ProductsRating productId={productId} />
          <h4 className="text-xl mt-2">{company}</h4>
          <p className="mt-3 text-medium text-muted-foreground inline-block p-2 rounded">{dollarAmount}</p>
          <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
          <AddToCart  productId={productId} />
        </div>
      </div>
      <ProductReviews productId={params.id}/>
      {isExist && <SubmitReview productId={params.id} />}
    </section>
  )
}

export default SingleProduct
