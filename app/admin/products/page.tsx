import { fetchAdminProduct } from "@/utils/actions"
import { formatePrice } from "@/utils/format"
import EmptyList from "@/components/global/EmptyList"
import Link from "next/link"
import { deleteProductAction } from "@/utils/actions"
import { IconButton } from "@/components/form/Buttons"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import FormContainer from "@/components/form/FormContainer"
import { actionFunction } from "@/utils/types"
import { Icon } from "@radix-ui/react-select"


async function Products() {
  const products = await fetchAdminProduct();
  if(products.length<1){return <EmptyList />}
  return (
  <section>
    <Table>
      <TableCaption className="capitalize">total products: {products.length}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Product Name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id} className="group">
            <TableCell>
              <Link href={`/products/${product.id}`} className="text-muted-foreground group-hover:underline tracking-wide capitalize">
                {product.name}
              </Link>
            </TableCell>
            <TableCell className="font-medium">{product.company}</TableCell>
            <TableCell>{formatePrice(product.price)}</TableCell>
            <TableCell className=" flex item-center gap-x-2 ">
              <Link href={`/admin/products/${product.id}/edit`}>
                <IconButton actionType="edit" />
              </Link>
              <DeleteButton productId={product.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </section>
  )
}

function DeleteButton({productId}:{productId:string}){
  const deleteProduct= deleteProductAction.bind(null,{productId})
  return <FormContainer action={deleteProduct}>
    <IconButton actionType="delete" />
  </FormContainer>
}

export default Products
