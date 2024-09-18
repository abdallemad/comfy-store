'use server';
import db from './db'
import { redirect } from 'next/navigation'
import { auth, currentUser, getAuth } from '@clerk/nextjs/server';
import { ZodError} from 'zod'
import { imageSchema, productSchema, reviewSchema, validateWithZodSchema, } from './Schemas';
import { deleteImageFromSupabase, uploadImage } from './subapase';
import { revalidatePath } from 'next/cache';
import { Cart } from '@prisma/client';
type ProductSchemaType ={
  name: string
    company:string
    featured:boolean
    price:number
    description:string
}
type ReviewType = {
  productId: string;
  authorName: string;
  authorImageUrl: string;
  rating: number;
  comment: string;
}
// helper functions..
const getAuthUser = async ()=>{
  const user = await currentUser();
  if(!user) redirect('/');
  return user
}
const getAdminUser = async ()=>{
  const user = await getAuthUser()
  if(user.id !== process.env.ADMIN_USER_ID) redirect('/');
  return user
}
const renderErrorObject = (error:any)=>{
  // console.log(error)
  let message;
  if(error instanceof ZodError) {message = error.errors[0].message; console.log(error.errors)}
  else if(error instanceof Error) message = error.message;
  else message = 'some thing wrong'
  return {
    message:message
  }
}

export async function fetchFeaturedProducts(){
  const products = await db.product.findMany({
    where:{
      featured:true
    }
  })
  return products
}

export const fetchAllProducts = async ({search=''}:{search?:string})=>{
  const products = await db.product.findMany({
    where:{
      OR:[
        {name:{contains:search ,mode:'insensitive'}},
        {company:{contains:search ,mode:'insensitive'}}
      ]
    },
    orderBy:{
      createdAt:'desc'
    }
  })
  return products
}

export const fetchSingleProduct = async ({id}:{id:string})=>{
  const product = await db.product.findUnique({
    where:{
      id: id
    }
  })
  if(!product) redirect('/')
  return product;
}

export const createProductAction = async(prevState:any,formData:FormData):Promise<{message:string}>=>{
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = validateWithZodSchema(productSchema,rawData) as ProductSchemaType;
    const file = formData.get('image') as File;
    const validatedFile = validateWithZodSchema(imageSchema,{image:file}) as {image:File}
    const fullPath = await uploadImage(validatedFile.image)
    await db.product.create({
      data:{
        ...validatedFields,
        image:fullPath,
        clerkId:user.id
      }
    })
  } catch (error) {
    return renderErrorObject(error)
  }
  redirect('/admin/products')
}

export const fetchAdminProduct = async ()=>{
  await getAdminUser();
  const products = await db.product.findMany({
    orderBy:{
      createdAt:'desc'
    }
  })
  return products
}

export const deleteProductAction = async(prevState:{productId:string},formData:FormData)=>{
  await getAdminUser();
  try {
    const product = await db.product.delete({
      where:{
        id:prevState.productId
      }
    })
    await deleteImageFromSupabase(product.image)
    revalidatePath('/admin/products')
    return {message:'product deleted!'}
  } catch (error) {
    renderErrorObject(error)
  }
}

export const fetchProductAdminDetails = async(id:string)=>{
  await getAdminUser();
  const product = await db.product.findFirst({
    where:{
      id:id
    }
  });
  if(!product) redirect('/admin/products');
  return product
}

export const updateProductAction = async(prevState:any,formData:FormData)=>{
  await getAdminUser();
  try {
    const productId = formData.get('id') as string
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(productSchema,rawData) as ProductSchemaType
    await db.product.update({
      where:{
        id:productId
      },data:{
        ...validatedFields
      }
    })
    revalidatePath(`/admin/products/${productId}/edit`)
    return {message:"product updated successfully"}
  } catch (error) {
    return renderErrorObject(error);
  }
}

export const updateImageProductAction = async(prevState:any,formData:FormData)=>{
  await getAdminUser();
  try {
    const image = formData.get('image') as File
    const productId = formData.get('id') as string
    const oldImage = formData.get('url') as string
    // validate file
    const validateFile = validateWithZodSchema(imageSchema,{image:image}) as {image:File}
    const fullPath =await  uploadImage(validateFile.image);
    // product name.
    const oldImageName = oldImage.split('/').pop();
    // delete and update product
    await deleteImageFromSupabase(oldImageName);
    await db.product.update({
      where:{
        id:productId
      },
      data:{
        image:fullPath
      }
    })
    revalidatePath(`/admin/products/${productId}/edit`)
    return {message:'product image updated successfully.'}
  } catch (error) {
    return renderErrorObject(error);
  }
}
export const fetchFavoriteId = async({productId}:{productId:string})=>{
  const user =await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where:{
      productId:productId,
      clerkId:user.id  // this is the current user
    },select:{
      id:true
    }
  })
  return favorite?.id || null
}
export const toggleFavoriteAction = async(prevState:{
  productId:string,
  favoriteId:string | null,
  pathname:string,
},formData:FormData)=>{
  const user = await getAuthUser();
  const {productId,favoriteId,pathname} = prevState;

  try {
    if(favoriteId) await db.favorite.delete({
      where:{
        id:favoriteId,
      }
    })
    else await db.favorite.create({
      data:{
        clerkId:user.id,
        productId:productId
      }
    })
    revalidatePath(pathname)
    return {message:favoriteId?'removed from favorite':'add to favorite'}
  } catch (error) {
    return renderErrorObject(error);
  }
}
export const fetchUserFavorites = async ()=>{
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where:{
      clerkId:user.id,
    },include:{
      product:true,
    }
  })
  return favorites.map(fav=>fav.product);
}

export const createReviewAction = async (prevState:any,formData:FormData)=>{
  try {
    const user = await getAuthUser()
    const rawData = Object.fromEntries(formData)
    const validatedFields = validateWithZodSchema(reviewSchema,rawData) as ReviewType
    await db.review.create({
      data:{
        ...validatedFields,
        clerkId:user.id
      }
    })
    revalidatePath(`/products/${validatedFields.productId}`)
    return {message:'review submitted successfully'}
  } catch (error) {
    return renderErrorObject(error)
  }
}

export const fetchProductReview =async (productId:string)=>{
  const reviews = await db.review.findMany({
    where:{
      productId:productId,
    },
    orderBy:{
      createdAt:'desc'
    }
  })
  return reviews;
}

export const fetchProductRating =async (productId:string)=>{
  const result = await db.review.groupBy({
    by:['productId'],
    _avg:{
      rating:true
    },
    _count:{
      rating:true
    },
    where:{
      productId:productId,
    }
  })
  return {
    rating:result[0]?._avg.rating?.toFixed(2) ?? 0,
    count:result[0]?._count.rating ?? 0
  }
}
export const fetchProductReviewByUser =async ()=>{
  const user = await getAuthUser();
  const reviews = await db.review.findMany({
    where:{
      clerkId:user.id
    },
    select:{
      rating:true,
      id:true,
      comment:true,
      product:{
        select:{
          image:true,
          name:true
        }
      }
    }
  })
  return reviews
}
export const deleteReviewAction =async (prevState:{reviewId:string})=>{
  const {reviewId} = prevState;
  const user = await getAuthUser();
  try {
    await db.review.delete({
      where:{
        id:reviewId,
      }
    })
    revalidatePath('/reviews')
    return {message:'review has been removed.'}
  } catch (error) {
    return renderErrorObject(error);
  }
}
export const findExistingReview =async (userId:string,productId:string)=>{
  return db.review.findFirst({
    where:{
      clerkId:userId,
      productId:productId
    }
  })
}
export const fetchCartItems = async () => {
  const {userId} = auth()
  if (userId){
  const cart = await db.cart.findFirst({
    where:{
      clerkId:userId,
    },
    select:{
      numItemsInCart:true
    }
  })
  return cart?.numItemsInCart || 0
  }
  return 0;
};

const fetchProduct = async (productId:string) => {
  const product = await db.product.findUnique({
    where:{
      id:productId
    }
  })
  if(!product) throw new Error('three is not product match this')
  return product
};
const includeProductClause = {
  cartItems:{
    include:{
      product:true,
    }
  }
}

export const fetchOrCreateCart = async ({userId,errorOnFailure= false}:{userId:string,errorOnFailure?:boolean}) => {
  // let cart:any;
  let cart = await db.cart.findFirst({
    where:{
      clerkId:userId,
    },
    include:includeProductClause
  })
  // console.log(cart)
  if(!cart && errorOnFailure) throw new Error('there is no cart')
  if(!cart){
    cart = await db.cart.create({
      data:{
        clerkId:userId,
      },
      include:includeProductClause
    })
  }
  return cart
};

const updateOrCreateCartItem = async ({productId,cartId,amount}:{productId:string, cartId:string, amount:number}) => {
  let cartItem= await db.cartItem.findFirst({
    where:{
      id:productId,
      cartId:cartId,
    }
  })
  if(cartItem) cartItem = await db.cartItem.update({
    where:{
      id:cartItem.id
    },
    data:{
      amount:cartItem.amount + amount
    }
  })
  else cartItem = await db.cartItem.create({
    data:{
      productId:productId,
      cartId,
      amount
    }
  })
};

export const updateCart = async (cart:Cart) => {
  const cartItems =await  db.cartItem.findMany({
    where:{
      cartId:cart.id,
    },
    include:{
      product:true
    }
  })
  let numItemsInCart = 0;
  let cartTotal = 0;
  for (const item of cartItems){
    numItemsInCart += item.amount
    cartTotal  += item.amount * item.product.price
  }
  const tax = cart.taxRate * cartTotal
  const shipping = cartTotal?cart.shipping: 0;
  const orderTotal = cartTotal + tax + shipping;
  const currentCart = await db.cart.update({
    where:{
      id:cart.id,
    },
    data:{
      numItemsInCart,
      orderTotal,
      cartTotal,
      tax
    },include:includeProductClause
  })
  return currentCart
};

export const addToCartAction = async (prevState:any,formData:FormData) => {
  const user = await getAuthUser();
  const productId = formData.get('productId') as string
  const amount = + formData.get('amount');
  try {
    await fetchProduct(productId);
    const cart =await  fetchOrCreateCart({userId:user.id})
    await updateOrCreateCartItem({productId,cartId:cart.id,amount})
    await updateCart(cart)
  } catch (error) {
    return renderErrorObject(error)
  }
  redirect('/cart')
};

export const removeCartItemAction = async () => {};

export const updateCartItemAction = async () => {};

export const createOrderAction = async (prevState:any,formData:FormData)=>{
  return {message:'order is placed'}
}