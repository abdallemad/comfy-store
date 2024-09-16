'use server';
import db from './db'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server';
import { ZodError} from 'zod'
import { imageSchema, productSchema, validateWithZodSchema, } from './Schemas';
import { deleteImageFromSupabase, uploadImage } from './subapase';
import { revalidatePath } from 'next/cache';
type ProductSchemaType ={
  name: string
    company:string
    featured:boolean
    price:number
    description:string
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
const renderErrorObject = (error)=>{
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