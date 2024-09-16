import { fetchUserFavorites } from "@/utils/actions"
import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
const page =async  () => {
  const products = await fetchUserFavorites();
  if(products.length == 0) return <SectionTitle text="you have no favorite yet" />
  return <div>
  <SectionTitle text="Favorite" />
  <ProductsGrid products={products} />
  </div>
}

export default page
