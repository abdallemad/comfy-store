import db from './db'
import { redirect } from 'next/navigation'
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