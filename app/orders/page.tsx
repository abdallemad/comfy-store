import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SectionTitle from '@/components/global/SectionTitle';
import { fetchUserOrders } from '@/utils/actions';
import { formatePrice, formatDate } from '@/utils/format';
const page =async () => {
  const orders = await fetchUserOrders();
  if(orders.length == 0) return <SectionTitle text='Your Cart Is Empty' />
  return (
    <>
      <SectionTitle text='Your Orders'/>
      <Table>
        <TableCaption>
          TotalOrders: {orders.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Products</TableHead>
            <TableHead>order Total</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            orders.map(order=>{

              return <TableRow key={order.id}>
                <TableCell>{order.products}</TableCell>
                <TableCell>{formatePrice(order.orderTotal)}</TableCell>
                <TableCell>{formatePrice(order.tax)}</TableCell>
                <TableCell>{formatePrice(order.shipping)}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
              </TableRow>
            })
          }
        </TableBody>
      </Table>
    </>
  )
}

export default page
