import ProductsContainer from "@/components/products/ProductsContainer";
type SearchParams ={
  search?:string,
  layout?:'grid' | 'list'
}
// import { searchProducts } from "@/utils/actions";
const page =async ({searchParams}:{searchParams:SearchParams}) => {
  const layout = searchParams.layout || 'grid';
  const search = searchParams.search || '';

  return <ProductsContainer layout={layout} search={search} />
}

export default page



